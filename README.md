# 🛰️ Earth Atmospheric Telemetry (`earth-atmospheric-telemetry`)
**Unified NOAA Surface Hydrology & NASA Remote Sensing Data Extraction Engine**
*Part of the 6-Repository Cyber-Physical Energy Research Suite (`@healthearthack`)*

[![CI/CD Telemetry Pipeline](https://github.com/healthearthack/earth-atmospheric-telemetry/actions/workflows/ingest_cron.yml/badge.svg)](https://github.com/healthearthack/earth-atmospheric-telemetry/actions)
[![Data Contract: v2.4](https://img.shields.io/badge/Data%20Contract-v2.4%20(Parquet%2FJSON)-blue.svg)](data/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🔬 Purpose & Scope
This repository serves as **Puzzle Piece #1** in the automated research ecosystem. It pulls, harmonizes, and validates macro-atmospheric and meso-surface environmental data covering critical energy extraction zones (specifically the Upper Jurassic Smackover Formation across Arkansas, Texas, and Louisiana):

1. **NOAA National Weather Service (`api.weather.gov`)**:
   - Surface barometric pressure ($P_{surface}$ in hPa)
   - Ambient dry-bulb temperature ($T_{ambient}$) and dew point ($T_{dew}$)
   - Precipitation accumulation and surface hydrology (critical for flood-plain injection monitoring)
   - Wind vectors ($u, v$) for surface dispersion modeling
2. **NASA Earth Science (Earthdata API)**:
   - **OCO-2 / OCO-3**: High-precision column-averaged carbon dioxide ($XCO_2$) dry-air mole fractions (ppm) to track baseline emissions and flare displacement.
   - **Aqua / AIRS**: Atmospheric Infrared Sounder mid-tropospheric thermal profiles and water vapor channels.
   - **Terra & Aqua / MODIS**: Land Surface Temperature (LST) and thermal anomaly hotspot detection.

---

## 🔄 Automated CI/CD Data Pipeline

Every 6 hours (`0 */6 * * *`), GitHub Actions executes `ingest_telemetry.py`:
1. Queries NOAA grid points (`LZK` / `SHV` radar bounds).
2. Queries NASA Earthdata OpenSearch for intersecting orbit swaths.
3. Computes the **Atmospheric Dispersion Coefficient ($K_z$)** and **Surface Saturation Deficit ($\Delta e$)**.
4. Packages clean JSON and Parquet artifacts into `data/`.
5. Emits a signed `repository_dispatch` event to `healthearthack/smackover-oil-lithium-energy` to drive downstream downhole thermodynamic calculations.

```
┌─────────────────────────┐     ┌─────────────────────────┐
│ NOAA api.weather.gov    │     │ NASA Earthdata OCO-2/3  │
└────────────┬────────────┘     └────────────┬────────────┘
             │                               │
             ▼                               ▼
       ┌───────────────────────────────────────────┐
       │     ingest_telemetry.py (ETL & QA/QC)     │
       └─────────────────────┬─────────────────────┘
                             │
                             ▼
       ┌───────────────────────────────────────────┐
       │   data/atmospheric_surface_latest.json    │
       │   data/atmospheric_surface_latest.parquet │
       └─────────────────────┬─────────────────────┘
                             │ repository_dispatch
                             ▼
       ┌───────────────────────────────────────────┐
       │   smackover-oil-lithium-energy (Repo 2)   │
       └───────────────────────────────────────────┘
```

---

## 📊 Data Contract Specification (`atmospheric_surface_latest.json`)

```json
{
  "contract_version": "2.4.0",
  "timestamp_utc": "2026-09-20T00:00:00Z",
  "coordinates": {
    "basin": "Smackover Formation",
    "centroid_lat": 33.2104,
    "centroid_lon": -92.6663,
    "elevation_m": 76.2
  },
  "noaa_surface": {
    "barometric_pressure_hpa": 1014.2,
    "temperature_c": 22.4,
    "relative_humidity_pct": 68.5,
    "wind_speed_mps": 3.6,
    "precipitation_last_24h_mm": 0.0
  },
  "nasa_sounders": {
    "xco2_mean_ppm": 421.8,
    "airs_tropospheric_temp_k": 268.4,
    "modis_lst_c": 24.1,
    "thermal_flare_count": 0
  },
  "dispersion_metrics": {
    "atmospheric_stability_class": "C",
    "surface_dispersion_kz": 14.8
  }
}
```

---

## 🛠️ Local Development & Quickstart

```bash
# Clone the repository
git clone https://github.com/healthearthack/earth-atmospheric-telemetry.git
cd earth-atmospheric-telemetry

# Install dependencies
pip install requests pandas pyarrow

# Run manual ingestion
python ingest_telemetry.py --mock-fallback
```

---

## 📜 Citation & Provenance
```bibtex
@dataset{healthearthack_atmospheric_2026,
  author = {healthearthack},
  title = {Multi-Scale Macro/Meso Atmospheric & Remote Sensing Telemetry Engine},
  year = {2026},
  publisher = {thepolka.cloud},
  url = {https://github.com/healthearthack/earth-atmospheric-telemetry}
}
```
