import pandas as pd


def preprocess_input(data, model):
    """
    Prepare input data using exactly the features
    expected by the trained model.
    """

    df = pd.DataFrame([data])

    # Feature engineering
    df["fuel_per_electricity"] = (
        df["Fuel_Gas_Consumption"]
        / df["Electricity_kWh"].replace(0, 1e-10)
    )

    df["temp_differential"] = (
        df["Furnace_Temperature_C"]
        - df["Feed_Temperature_C"]
    )

    df["maintenance_per_exp"] = (
        df["Maintenance_Days"]
        / df["Operator_Experience_yrs"].replace(0, 1e-10)
    )

    # Use exactly the features expected by this model
    required_features = list(model.feature_names_in_)

    return df[required_features]