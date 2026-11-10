# ENERGIA

ENERGIA is an energy-access intelligence platform for Nigeria, designed to expand across Africa. It is intended to help public institutions, development partners, analysts, and project developers assess energy needs and plan interventions using transparent, sourced information.

> **Development status:** Stages 1–2 complete. The frontend has a responsive dashboard with fictional demo examples; the API exposes a liveness endpoint. No external data source is connected, and no energy statistics or project estimates are presented as verified facts.

## Project structure

```text
frontend/       React, TypeScript, Vite, and Tailwind CSS
backend/        FastAPI application and Python project configuration
docker-compose.yml
.env.example
```

## Requirements

- Node.js 20 LTS or later and npm
- Python 3.11 or later
- Docker Desktop with Docker Compose (optional; for PostgreSQL/PostGIS)

## Run the frontend

In PowerShell, from the project root:

```powershell
Set-Location .\frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Run the API

In a second PowerShell window, from the project root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -e ".\backend[dev]"
python -m uvicorn app.main:app --reload --app-dir backend
```

The API liveness endpoint is `http://localhost:8000/health`; interactive API documentation is at `http://localhost:8000/docs`.

## Run API and PostgreSQL/PostGIS with Docker

Copy `.env.example` to `.env`, replace the local placeholder password, then run:

```powershell
Copy-Item .env.example .env
# Edit .env and set POSTGRES_PASSWORD and the matching password in DATABASE_URL.
docker compose up --build
```

The API is available at `http://localhost:8000`, and PostgreSQL/PostGIS is available on port `5432`. The current health endpoint checks that the API process responds; it does not yet verify database connectivity. Database access, schema migrations, and persistent domain models are planned for later stages.

To stop the services, press Ctrl+C and run `docker compose down`. To also remove the local database volume, run `docker compose down --volumes`; this permanently deletes its stored data.

## Development stages

1. **Foundation:** repository layout, frontend and API scaffolds, local configuration. Complete.
2. **Dashboard:** responsive application navigation and executive dashboard. Complete; all displayed figures and example records are explicitly marked as fictional demo data.
3. **API and database:** domain models, PostgreSQL/PostGIS integration, and migrations.
4. **Geospatial data:** sourced boundaries and interactive maps.
5. **Priority scoring:** transparent, reproducible MCDA with missing-data handling.
6. **Citizen reporting:** private submissions, moderation, and verification.
7. **Planning and impact:** configurable preliminary cost estimates and projected impact.
8. **Project tracking and reports:** monitoring, CSV/PDF exports, and printable reports.
9. **Security and offline support:** authentication, authorization, privacy, and carefully scoped offline workflows.
10. **Verification and deployment:** testing, documentation, and deployment preparation.

Each milestone must keep demonstration data clearly identified, record dataset provenance, and distinguish projections from measured outcomes. No real-world statistic, integration, or geographic boundary should be represented as verified without a credible source.

## Original Streamlit prototype

The original prototype is preserved in [`app.py`](./app.py) for reference and defense demonstrations. Run it from the project root with:

```powershell
python -m pip install -r requirements-prototype.txt
python -m streamlit run app.py
```

**Data caveat:** This archived prototype contains hard-coded example figures and broad source labels. The underlying figures and their source attribution have not been independently verified. Do not present them as verified national statistics. The React dashboard separately labels all sample data as demo data.
