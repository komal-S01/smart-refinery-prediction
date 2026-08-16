import subprocess
import sys
import time
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FRONTEND = ROOT / "frontend"

backend_process = None
frontend_process = None

try:
    print("=" * 60)
    print("       SMART REFINERY - STARTING APPLICATION")
    print("=" * 60)

    # ---------------------------------------------------------
    # 1. START FASTAPI BACKEND
    # ---------------------------------------------------------
    print("\n[1/2] Starting FastAPI backend...")
    print("      http://127.0.0.1:8000")

    backend_process = subprocess.Popen(
        [
            sys.executable,
            "-m",
            "uvicorn",
            "backend.app:app",
            "--reload",
            "--host",
            "127.0.0.1",
            "--port",
            "8000",
        ],
        cwd=ROOT,
    )

    # Give backend some time to start
    time.sleep(3)

    # ---------------------------------------------------------
    # 2. START FRONTEND
    # ---------------------------------------------------------
    print("\n[2/2] Starting frontend...")
    print("      http://127.0.0.1:5500")

    frontend_process = subprocess.Popen(
        [
            sys.executable,
            "-m",
            "http.server",
            "5500",
            "--bind",
            "127.0.0.1",
        ],
        cwd=FRONTEND,
    )

    time.sleep(2)

    # ---------------------------------------------------------
    # 3. OPEN FRONTEND AUTOMATICALLY
    # ---------------------------------------------------------
    print("\n" + "=" * 60)
    print("       SMART REFINERY IS RUNNING")
    print("=" * 60)
    print("\nBackend : http://127.0.0.1:8000")
    print("Health  : http://127.0.0.1:8000/health")
    print("Frontend: http://127.0.0.1:5500")
    print("\nPress CTRL+C to stop both servers.")
    print("=" * 60)

    webbrowser.open("http://127.0.0.1:5500")

    # Keep main process alive
    while True:
        time.sleep(1)

except KeyboardInterrupt:
    print("\n\nStopping Smart Refinery...")

finally:
    if backend_process:
        backend_process.terminate()

    if frontend_process:
        frontend_process.terminate()

    print("Both servers stopped.")