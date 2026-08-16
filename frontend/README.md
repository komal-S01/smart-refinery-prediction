# REFINEX — Smart Refinery Frontend

A completely redesigned vanilla HTML/CSS/JS frontend for the Smart Refinery Prediction project.

## Design direction

This version intentionally does NOT copy the earlier reference website. It uses a dark industrial control-room aesthetic:

- deep graphite/navy background
- electric cyan + amber + violet accents
- refinery radar visualization
- animated scanline/grid
- telemetry cards
- industrial condensed typography
- responsive mobile layout
- prediction + optimization workspaces

## Backend

Expected FastAPI base URL:

`http://127.0.0.1:8000`

Used endpoints:

- `GET /health`
- `POST /predict`
- `POST /optimize`

The payload field names match the existing Smart Refinery backend.

## Run

From the project root:

```powershell
python -m http.server 5500 --directory frontend
```

Open:

`http://127.0.0.1:5500`

Or keep using your existing `main.py` launcher that starts both servers.
