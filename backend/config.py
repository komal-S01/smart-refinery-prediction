import os

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

DATASET_PATH = os.path.join(
    BASE_DIR,
    "data",
    "IOCL_Refinery_Engineered_Features.csv"
)

MODEL_PATHS = {
    "energy": os.path.join(
        BASE_DIR,
        "models",
        "energy",
        "energy_model.pkl"
    ),

    "throughput": os.path.join(
        BASE_DIR,
        "models",
        "throughput",
        "throughput_model.pkl"
    ),

    "efficiency": os.path.join(
        BASE_DIR,
        "models",
        "efficiency",
        "equipment_efficiency_model.pkl"
    )
}