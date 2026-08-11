import joblib

from backend.config import MODEL_PATHS
from backend.preprocess import preprocess_input


# Load trained models
energy_model = joblib.load(
    MODEL_PATHS["energy"]
)

throughput_model = joblib.load(
    MODEL_PATHS["throughput"]
)

efficiency_model = joblib.load(
    MODEL_PATHS["efficiency"]
)


def predict(data):

    energy_X = preprocess_input(
        data,
        energy_model
    )

    throughput_X = preprocess_input(
        data,
        throughput_model
    )

    efficiency_X = preprocess_input(
        data,
        efficiency_model
    )

    energy_prediction = energy_model.predict(
        energy_X
    )[0]

    throughput_prediction = throughput_model.predict(
        throughput_X
    )[0]

    efficiency_prediction = efficiency_model.predict(
        efficiency_X
    )[0]

    return {
        "Energy_Consumption_MWh": round(
            float(energy_prediction), 2
        ),

        "Unit_Throughput_BPH": round(
            float(throughput_prediction), 2
        ),

        "Equipment_Efficiency_pct": round(
            float(efficiency_prediction), 2
        )
    }