REFINEX — Smart Refinery Prediction & Optimization Platform

AI-powered decision support for refinery throughput, energy consumption, equipment efficiency, and operating setpoint optimization.

REFINEX combines a FastAPI backend, trained ML models, feature engineering, a setpoint optimization engine, and a modern industrial control-center frontend.

✨ Core Capabilities

🔮 Prediction

Given the current refinery operating scenario, REFINEX predicts:

Unit Throughput — BPH

Equipment Efficiency — %

Energy Consumption — MWh

⚙️ Optimization

The optimizer searches combinations of:

Furnace Temperature

Reflux Ratio

Column Pressure

The current objective weights are:

Objective

Weight

Throughput

40%

Equipment Efficiency

40%

Energy

20%

Lower energy consumption contributes positively to the score.

🧠 Architecture

                    REFINEX FRONTEND
                 HTML / CSS / JavaScript
                           |
                      REST API
                           |
                    +------+------+
                    |   FastAPI   |
                    |   backend/  |
                    +------+------+
                           |
             +-------------+-------------+
             |                           |
          /predict                   /optimize
             |                           |
             v                           v
     Feature Engineering        Setpoint Search
             |                 8 x 8 x 8 = 512
             +-------------+-------------+
                           |
                    +------+------+
                    | 3 ML Models |
                    |             |
                    | Throughput  |
                    | Efficiency  |
                    | Energy      |
                    +------+------+
                           |
                    Decision KPIs
                    + Recommended
                      Setpoints

🏗️ Project Structure

smart-refinery-prediction/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── predict.py
│   ├── preprocess.py
│   └── optimization/
│       └── optimizer.py
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── README.md
│
├── data/
├── models/
│   ├── energy/
│   ├── efficiency/
│   └── throughput/
│
├── main.py
├── .gitignore
└── README.md

🚀 Technology Stack

Backend

Python

FastAPI

Uvicorn

Pandas

NumPy

Joblib

Machine Learning

Trained regression models

Feature engineering

Batch inference

Multi-objective setpoint search

Frontend

HTML5

CSS3

Vanilla JavaScript

REST API integration

Responsive industrial dashboard

Animated refinery telemetry/radar interface

🔌 API

Health Check

GET /health

Used to verify that the backend is available.

Prediction

POST /predict

Returns throughput, equipment efficiency, and energy predictions for the submitted operating scenario.

Optimization

POST /optimize

Searches candidate process setpoints and returns a recommended operating point with expected performance and the combined score.

🎛️ Prediction Inputs

Feed & Crude

Crude Flow

API Gravity

Feed Sulfur

Feed Temperature

Diesel Sulfur

Crude Type

Process Setpoints

Furnace Temperature

Column Pressure

Reflux Ratio

Catalyst Activity

Equipment & Operations

Pump Vibration

Heat Exchanger Efficiency

Fuel Gas Consumption

Electricity Consumption

Maintenance Days

Operator Experience

⚙️ Optimization Engine

The current dashboard searches:

8 furnace values
× 8 reflux values
× 8 pressure values
= 512 candidates

Each candidate is evaluated by the trained models.

The objective is:

Score =
    0.40 × normalized throughput
  + 0.40 × normalized efficiency
  + 0.20 × normalized energy benefit

The optimizer uses batch model inference to avoid making separate prediction calls for every candidate.

▶️ Running the Project

Clone

git clone https://github.com/komal-S01/smart-refinery-prediction.git
cd smart-refinery-prediction

Virtual environment

Windows:

python -m venv venv
venv\Scripts\activate

Linux/macOS:

python -m venv venv
source venv/bin/activate

Dependencies

If the repository contains a requirements file:

pip install -r requirements.txt

Otherwise install the backend packages:

pip install fastapi uvicorn pandas numpy joblib

Start the complete application

python main.py

Expected services:

Backend  → http://127.0.0.1:8000
Frontend → http://127.0.0.1:5500

The frontend can also be served separately:

python -m http.server 5500 --directory frontend

🖥️ Frontend

The REFINEX interface is designed as an industrial AI control center rather than a conventional business dashboard.

It includes:

Live API connection indicator

Animated refinery radar

Prediction workspace

Model output cards

Inference pipeline visualization

Setpoint optimization console

Recommended operating point

Expected performance KPIs

System architecture map

Responsive layout

📊 Decision Flow

Prediction

Operating Scenario
       ↓
Feature Engineering
       ↓
3 Trained Models
       ↓
Throughput + Efficiency + Energy
       ↓
Dashboard KPIs

Optimization

Current Scenario
       ↓
Generate Candidate Setpoints
       ↓
512 Candidate Combinations
       ↓
Batch ML Predictions
       ↓
Weighted Scoring
       ↓
Best Setpoint Combination
       ↓
Recommended Operating Point

🎯 Product Vision

A refinery does not only need predictions. It needs decisions.

REFINEX follows:

OBSERVE → PREDICT → COMPARE → OPTIMIZE → ACT

The platform is intended to provide decision support for understanding current process performance and exploring better operating conditions.

🛣️ Future Improvements

Real-time refinery sensor streaming

Historical prediction tracking

Prediction confidence intervals

Time-series forecasting

Constraint-aware optimization

Scenario comparison

Operator alerts

Model monitoring and drift detection

Authentication and role-based access

Cloud deployment

Explainable AI

👥 Contributors

Smart Refinery Prediction Team

Repository:

https://github.com/komal-S01/smart-refinery-prediction

🔐 Project Notes

Keep credentials and secrets outside Git.

Do not commit local virtual environments or Python cache files.

Model files and datasets should follow the team's repository/storage policy.

Recommended setpoints should be validated against real plant constraints before operational use.