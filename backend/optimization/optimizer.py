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


# ============================================================
# CONTROLLABLE VARIABLES
# ============================================================

CONTROLLABLE = [
    "Furnace_Temperature_C",
    "Reflux_Ratio",
    "Column_Pressure_bar"
]


# ============================================================
# PREPARE MULTIPLE CANDIDATES FOR A MODEL
# ============================================================

def prepare_candidates(candidates, model):
    """
    Prepare all candidate setpoints at once.

    This performs feature engineering in batch instead of
    repeatedly creating a DataFrame for every candidate.
    """

    data = candidates.copy()

    # --------------------------------------------------------
    # Feature engineering
    # --------------------------------------------------------

    data["fuel_per_electricity"] = (
        data["Fuel_Gas_Consumption"]
        / data["Electricity_kWh"].replace(0, 1e-10)
    )

    data["temp_differential"] = (
        data["Furnace_Temperature_C"]
        - data["Feed_Temperature_C"]
    )

    data["maintenance_per_exp"] = (
        data["Maintenance_Days"]
        / data["Operator_Experience_yrs"].replace(0, 1e-10)
    )

    # --------------------------------------------------------
    # Use exactly the features expected by this model
    # --------------------------------------------------------

    required_features = list(model.feature_names_in_)

    return data[required_features]


# ============================================================
# PREDICT ALL SETPOINT COMBINATIONS AT ONCE
# ============================================================

def score_setpoints_batch(candidates):
    """
    Predict throughput, efficiency and energy for all
    candidate setpoints in a single batch.
    """

    # Prepare inputs for each model
    throughput_X = prepare_candidates(
        candidates,
        throughput_model
    )

    efficiency_X = prepare_candidates(
        candidates,
        efficiency_model
    )

    energy_X = prepare_candidates(
        candidates,
        energy_model
    )

    # --------------------------------------------------------
    # Batch predictions
    # --------------------------------------------------------

    throughput_predictions = throughput_model.predict(
        throughput_X
    )

    efficiency_predictions = efficiency_model.predict(
        efficiency_X
    )

    energy_predictions = energy_model.predict(
        energy_X
    )

    return (
        throughput_predictions,
        efficiency_predictions,
        energy_predictions
    )


# ============================================================
# FIND BEST SETPOINTS
# ============================================================

def find_best_setpoints(
    base_row,
    weights=(0.4, 0.4, 0.2),
    n_steps=8
):
    """
    Find the best combination of:

        Furnace Temperature
        Reflux Ratio
        Column Pressure

    using batch ML prediction.

    n_steps=8 gives:

        8 × 8 × 8 = 512 combinations
    """

    # ========================================================
    # GENERATE REALISTIC SEARCH RANGES
    # ========================================================

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


    # ========================================================
    # GENERATE ALL COMBINATIONS
    # ========================================================

    combinations = []

    for furnace_temp in furnace_range:

        for reflux_ratio in reflux_range:

            for column_pressure in pressure_range:

                candidate = base_row.copy()

                candidate["Furnace_Temperature_C"] = furnace_temp
                candidate["Reflux_Ratio"] = reflux_ratio
                candidate["Column_Pressure_bar"] = column_pressure

                combinations.append(candidate)


    # Convert all candidates into ONE DataFrame
    candidates_df = pd.DataFrame(combinations)


    print(
        f"Optimizing {len(candidates_df)} "
        f"setpoint combinations..."
    )


    # ========================================================
    # BATCH ML PREDICTION
    # ========================================================

    (
        throughput_predictions,
        efficiency_predictions,
        energy_predictions
    ) = score_setpoints_batch(
        candidates_df
    )


    # ========================================================
    # NORMALIZATION
    # ========================================================

    thr_min = df["Unit_Throughput_BPH"].min()
    thr_max = df["Unit_Throughput_BPH"].max()

    eff_min = df["Equipment_Efficiency_pct"].min()
    eff_max = df["Equipment_Efficiency_pct"].max()

    en_min = df["Energy_Consumption_MWh"].min()
    en_max = df["Energy_Consumption_MWh"].max()


    # Prevent division by zero
    thr_range = max(thr_max - thr_min, 1e-10)
    eff_range = max(eff_max - eff_min, 1e-10)
    en_range = max(en_max - en_min, 1e-10)


    # ========================================================
    # NORMALIZED SCORES
    # ========================================================

    throughput_score = (
        throughput_predictions - thr_min
    ) / thr_range


    efficiency_score = (
        efficiency_predictions - eff_min
    ) / eff_range


    # Lower energy is better
    energy_score = 1 - (
        (energy_predictions - en_min)
        / en_range
    )


    # ========================================================
    # COMBINED SCORE
    # ========================================================

    scores = (
        weights[0] * throughput_score
        + weights[1] * efficiency_score
        + weights[2] * energy_score
    )


    # ========================================================
    # FIND BEST COMBINATION
    # ========================================================

    best_index = np.argmax(scores)

    best_row = candidates_df.iloc[best_index]

    best_combo = (
        best_row["Furnace_Temperature_C"],
        best_row["Reflux_Ratio"],
        best_row["Column_Pressure_bar"],
        throughput_predictions[best_index],
        efficiency_predictions[best_index],
        energy_predictions[best_index]
    )

    best_score = scores[best_index]


    return best_combo, best_score


# ============================================================
# GENERATE RECOMMENDATION REPORT
# ============================================================

def generate_recommendation_report(
    n_scenarios=5,
    n_steps=8
):
    """
    Run optimization across multiple real scenarios.
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

        (
            ft,
            rr,
            cp,
            thr,
            eff,
            en
        ) = best_combo


        # Determine crude type
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


    # ========================================================
    # OPTIMIZATION TEST
    # ========================================================

    print("\nStarting optimization...")

    best_combo, best_score = find_best_setpoints(
        base_row,
        n_steps=8
    )


    (
        ft,
        rr,
        cp,
        thr,
        eff,
        en
    ) = best_combo


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