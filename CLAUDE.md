**Role:** Act as a Senior Full-Stack Architect.
**Context:** I am building a POC for a "What-If" Hypothesis platform ($30M impact) for a food distribution company. We have recently pivoted our architecture: all standard operational reporting (SE/SM and BDM level) is now handled via **Power BI Embeds**. The React application is now strictly reserved for high-performance **Ad-Hoc Search** and **Predictive Hypothesis Modeling**.
**Core Objective:** Implement a "Region Split" scenario POC where a user can select an existing sales territory, simulate splitting it, and view the resulting revenue impact instantly via a Polymorphic UI. The API must be designed generically to support future, unknown hypothesis scenarios.

Below is the updated `claude.md` defining our project standards and architecture. Please read it carefully.

---

# Moco Food Analytics — Hypothesis & Search POC

## Project Overview

A desktop-only SPA focusing on high-speed data discovery and predictive modeling. Standard reporting is offloaded to Power BI. This React application demonstrates **Spec-Driven Development (SDD)** and a **Stateless Proxy** architecture, providing a "Shape-Shifting" UI for complex business simulations (e.g., Region Splitting).

## Tech Stack

| Layer     | Technologies                                                                                                                                              |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend  | React 19, Vite, TypeScript, TanStack Table v8, TanStack Router, TanStack Query v5, Tailwind CSS, shadcn/ui, react-leaflet + leaflet, powerbi-client-react |
| Backend   | Node.js, Express 5, TypeScript, tsx, swagger-jsdoc + swagger-ui-express                                                                                   |
| Database  | Postgres 16 (local Docker - 2 instances/schemas: Fast Cache & Slow Warehouse)                                                                             |
| Dev Tools | docker-compose, @hey-api/openapi-ts (type generation)                                                                                                     |

## Architecture

Three-pillar architecture:

1. **Power BI Embeds:** Handles all static/historical reporting (BDM/SE metrics).
2. **React Hypothesis Engine (Fast/Slow Path):** - _Fast Path:_ Real-time search and UI state.
   - _Slow Path:_ Complex spatial splits and AI metrics mimic Snowflake with a hard-coded 1.5s `setTimeout` latency.
3. **Stateless Node Proxy:** Node maintains NO database state for polling. It forwards simulation requests generically. React (via TanStack Query) manages the polling interval and job status UI.

## Database (see `.specs/DB_SCHEMA.md`)

_Data is assumed to be pre-fed into the warehouse for this POC._
| Table | Purpose | Key Fields |
| ------------------- | -------------------------------- | --------------------------------------------------------------- |
| `clients_search` | Fast search cache | id, name, business_type, priority, upside_value, lat, lng |
| `territories` | **NEW:** Boundary polygons | id, name, owner_id, boundary (GeoJSON/PostGIS geometry) |
| `warehouse_details` | Slow warehouse drilldown (1.5s) | client_id, sku_gaps, purchase_trends (JSONB) |
| `simulation_jobs` | Job tracking for polling | id, scenario_type, status, result_payload (JSONB) |

## Generic Simulation API

To support future scenarios without changing the API layer, simulations use a generic payload.
**POST `/api/simulations`**

```json
{
  "scenario_type": "REGION_SPLIT",
  "parameters": {
    "target_id": "uuid-of-territory",
    "split_method": "longitude_bisect"
  }
}
```
