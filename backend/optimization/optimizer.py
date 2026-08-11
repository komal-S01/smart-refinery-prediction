import pandas as pd
import numpy as np
import joblib
import os


# ============================================================
# PROJECT ROOT
# ============================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)


# ============================================================
# LOAD TRAINED MODELS
# ============================================================

energy_model = joblib.load(
    os.path.join(
        BASE_DIR,
        "models",
        "energy",
        "energy_model.pkl"
    )
)

efficiency_model = joblib.load(
    os.path.join(
        BASE_DIR,
        "models",
        "efficiency",
        "equipment_efficiency_model.pkl"
    )
)

throughput_model = joblib.load(
    os.path.join(
        BASE_DIR,
        "models",
        "throughput",
        "throughput_model.pkl"
    )
)


# ============================================================
# LOAD ENGINEERED DATASET
# ============================================================

df = pd.read_csv(
    os.path.join(
        BASE_DIR,
        "data",
        "IOCL_Refinery_Engineered_Features.csv"
    )
)


CONTROLLABLE = [
    "Furnace_Temperature_C",
    "Reflux_Ratio",
    "Column_Pressure_bar"
]


# ============================================================
# BUILD MODEL INPUT
# ============================================================

def build_row_for_model(base_row, model):
    """
    Given a base feature row and a model,
    return a 1-row DataFrame containing exactly
    the features required by that model.
    """

    needed = list(model.feature_names_in_)

    row = {}

    for col in needed:
        row[col] = base_row[col]

    return pd.DataFrame([row])


# ============================================================
# PREDICT FOR GIVEN SETPOINTS
# ============================================================

def score_setpoints(
    base_row,
    furnace_temp,
    reflux_ratio,
    column_pressure,
    weights=(0.4, 0.4, 0.2)
):
    """
    Predict Throughput, Efficiency and Energy
    for a candidate setpoint combination.
    """

    candidate = base_row.copy()

    candidate["Furnace_Temperature_C"] = furnace_temp
    candidate["Reflux_Ratio"] = reflux_ratio
    candidate["Column_Pressure_bar"] = column_pressure

    thr_pred = throughput_model.predict(
        build_row_for_model(candidate, throughput_model)
    )[0]

    eff_pred = efficiency_model.predict(
        build_row_for_model(candidate, efficiency_model)
    )[0]

    energy_pred = energy_model.predict(
        build_row_for_model(candidate, energy_model)
    )[0]

    return thr_pred, eff_pred, energy_pred


# ============================================================
# FIND BEST SETPOINTS
# ============================================================

def find_best_setpoints(
    base_row,
    weights=(0.4, 0.4, 0.2),
    n_steps=15
):
    """
    Grid search over realistic ranges of the
    three controllable setpoints.
    """

    furnace_range = np.linspace(
        df["Furnace_Temperature_C"].quantile(0.05),
        df["Furnace_Temperature_C"].quantile(0.95),
        n_steps
    )

    reflux_range = np.linspace(
        df["Reflux_Ratio"].quantile(0.05),
        df["Reflux_Ratio"].quantile(0.95),
        n_steps
    )

    pressure_range = np.linspace(
        df["Column_Pressure_bar"].quantile(0.05),
        df["Column_Pressure_bar"].quantile(0.95),
        n_steps
    )

    # Normalize target values
    thr_min = df["Unit_Throughput_BPH"].min()
    thr_max = df["Unit_Throughput_BPH"].max()

    eff_min = df["Equipment_Efficiency_pct"].min()
    eff_max = df["Equipment_Efficiency_pct"].max()

    en_min = df["Energy_Consumption_MWh"].min()
    en_max = df["Energy_Consumption_MWh"].max()

    best_score = -np.inf
    best_combo = None

    for ft in furnace_range:

        for rr in reflux_range:

            for cp in pressure_range:

                thr, eff, en = score_setpoints(
                    base_row,
                    ft,
                    rr,
                    cp
                )

                thr_norm = (
                    (thr - thr_min) /
                    (thr_max - thr_min)
                )

                eff_norm = (
                    (eff - eff_min) /
                    (eff_max - eff_min)
                )

                # Lower energy is better
                en_norm = 1 - (
                    (en - en_min) /
                    (en_max - en_min)
                )

                score = (
                    weights[0] * thr_norm
                    + weights[1] * eff_norm
                    + weights[2] * en_norm
                )

                if score > best_score:

                    best_score = score

                    best_combo = (
                        ft,
                        rr,
                        cp,
                        thr,
                        eff,
                        en
                    )

    return best_combo, best_score


# ============================================================
# GENERATE RECOMMENDATION REPORT
# ============================================================

def generate_recommendation_report(
    n_scenarios=5,
    n_steps=8
):
    """
    Run optimization across multiple real scenarios
    from the engineered dataset.
    """

    sample_rows = df.sample(
        n=n_scenarios,
        random_state=42
    )

    records = []

    for idx, row in sample_rows.iterrows():

        base_row = row.to_dict()

        best_combo, best_score = find_best_setpoints(
            base_row,
            n_steps=n_steps
        )

        ft, rr, cp, thr, eff, en = best_combo

        crude = "Heavy Sour"

        if row["Crude_Type_Light Sweet"]:
            crude = "Light Sweet"

        elif row["Crude_Type_Medium"]:
            crude = "Medium"

        records.append({

            "Row_ID": idx,

            "Crude_Type": crude,

            "Current_Furnace_Temp":
                row["Furnace_Temperature_C"],

            "Recommended_Furnace_Temp":
                round(ft, 1),

            "Current_Reflux_Ratio":
                row["Reflux_Ratio"],

            "Recommended_Reflux_Ratio":
                round(rr, 2),

            "Current_Column_Pressure":
                row["Column_Pressure_bar"],

            "Recommended_Column_Pressure":
                round(cp, 2),

            "Current_Throughput":
                row["Unit_Throughput_BPH"],

            "Predicted_Throughput":
                round(thr, 1),

            "Current_Efficiency":
                row["Equipment_Efficiency_pct"],

            "Predicted_Efficiency":
                round(eff, 1),

            "Current_Energy":
                row["Energy_Consumption_MWh"],

            "Predicted_Energy":
                round(en, 2)
        })

    return pd.DataFrame(records)


# ============================================================
# QUICK TEST
# ============================================================

if __name__ == "__main__":

    print("Models loaded successfully.")
    print("Dataset shape:", df.shape)

    base_row = df.iloc[0].to_dict()

    # Test prediction using current setpoints
    thr, eff, en = score_setpoints(
        base_row,
        base_row["Furnace_Temperature_C"],
        base_row["Reflux_Ratio"],
        base_row["Column_Pressure_bar"]
    )

    print("\n--- Test Prediction ---")

    print(
        f"Throughput: {thr:.2f}"
    )

    print(
        f"Efficiency: {eff:.2f}"
    )

    print(
        f"Energy: {en:.2f}"
    )

    # Find optimized setpoints
    best_combo, best_score = find_best_setpoints(
        base_row,
        n_steps=8
    )

    ft, rr, cp, thr, eff, en = best_combo

    print("\n--- Best Setpoint Recommendation ---")

    print(
        f"Furnace Temperature: {ft:.1f}"
    )

    print(
        f"Reflux Ratio: {rr:.2f}"
    )

    print(
        f"Column Pressure: {cp:.2f}"
    )

    print(
        f"Predicted Throughput: {thr:.1f}"
    )

    print(
        f"Predicted Efficiency: {eff:.1f}"
    )

    print(
        f"Predicted Energy: {en:.2f}"
    )

    print(
        f"Combined Score: {best_score:.4f}"
    )