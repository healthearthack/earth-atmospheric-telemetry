/**
 * Earth Atmospheric Telemetry Data Contracts
 * Defines strict TypeScript interfaces for NOAA NWS, NASA Sounders, and Google Earth Engine.
 * Part of the healthearthack Doctoral Research & Industrial Publishing Suite.
 */

export interface GeodeticBounds {
  basin: string;
  sub_basin: string;
  centroid_lat: number;
  centroid_lon: number;
  elevation_m: number;
  noaa_grid: string;
  usgs_quad: string;
}

export interface NOAASurfaceMeteorology {
  source: string;
  station_id: string;
  status: "LIVE_FEED" | "CALIBRATED_BASELINE";
  barometric_pressure_hpa: number;
  temperature_c: number;
  dewpoint_c: number;
  relative_humidity_pct: number;
  wind_speed_mps: number;
  precipitation_last_hour_mm: number;
}

export interface NASASatelliteSounders {
  source: string;
  status: "LIVE_ORBITAL_VALIDATED" | "CALIBRATED_ORBITAL_MODEL";
  latest_granule: string;
  xco2_mean_ppm: number;
  airs_tropospheric_850hpa_temp_k: number;
  modis_daytime_lst_c: number;
  thermal_flare_plume_count: number;
  orbital_uncertainty_ppm: number;
}

export interface GoogleEarthRemoteSensing {
  source: string;
  status: string;
  satellite_constellation: string;
  spatial_resolution_meters: number;
  wellpad_ndvi_vegetation_vigor: number;
  surface_soil_moisture_m3_per_m3: number;
  srtm_digital_elevation_m: number;
  surface_slope_degrees: number;
  brine_seepage_anomaly_detected: boolean;
  spectral_integrity_confidence: number;
}

export interface AtmosphericPhysicsInvariants {
  pasquill_stability_class: "A" | "B" | "C" | "D" | "E" | "F";
  eddy_diffusivity_kz_m2_per_s: number;
  boundary_layer_height_m: number;
  surface_soil_stability: string;
  groundwater_vulnerability_index: string;
  dispersion_risk_tier: string;
}

export interface AtmosphericTelemetryPayload {
  contract: "healthearthack.earth_atmospheric_telemetry.v3";
  timestamp_utc: string;
  geodetic_bounds: GeodeticBounds;
  noaa_surface_meteorology: NOAASurfaceMeteorology;
  nasa_satellite_sounders: NASASatelliteSounders;
  google_earth_remote_sensing: GoogleEarthRemoteSensing;
  atmospheric_physics_invariants: AtmosphericPhysicsInvariants;
  integrity_hash_sha256: string;
}
