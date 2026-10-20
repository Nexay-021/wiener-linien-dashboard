# Wiener Linien – Line 1 Live Dashboard

A React dashboard displaying live departure information for Vienna’s tram line 1 in both directions between Prater Hauptallee and Stefan-Fadinger-Platz.

The application fetches departure data from the Wiener Linien Open Government Data (OGD) API and refreshes automatically every 30 seconds.

## Screenshots

### Dashboard and departure legend

![Dashboard title and colour-coded departure legend](docs/images/dashboard-header.png)

### Departure cards

![Departure countdowns for Prater Hauptallee and Wittelsbachstraße](docs/images/dashboard-departures.png)

## Features

- Both directions displayed with stops in route order
- Up to three upcoming departures per stop
- Departure countdowns in minutes
- Colour-coded indicators for on-time, delayed, early, and unavailable delay information
- Automatic refresh every 30 seconds
- Responsive layout with two columns on desktop and one on smaller screens
- Initial loading indicator, error messages, and basic API response validation

## Technologies

- React
- JavaScript
- CSS
- Vite
- Wiener Linien OGD API

## Getting Started

### Requirements

- A Node.js version compatible with the project's Vite and ESLint versions
- npm
- Internet access to retrieve live departure data

### Installation

Clone this repository and open its folder:

    git clone https://github.com/Nexay-021/wiener-linien-dashboard.git
    cd wiener-linien-dashboard

Install dependencies using the included lockfile:

    npm ci

Start the development server:

    npm run dev

Open the local URL shown in the terminal.

### Available Commands

| Command           | Purpose                              |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build in `dist`  |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint checks                    |

## How It Works

### Route Data

Stop information for both directions is stored in `src/data/line1Route.js`.

The original Wiener Linien CSV datasets were used to prepare this route data. They are excluded from the repository and are not needed to run the application.

### Live Departures

The application builds a request using the stop IDs from the route data. It selects tram line 1 from the returned monitor information and displays up to three departures with valid countdown values per stop.

### Delay Indicators

Delay is calculated as the difference between the API's real-time and planned departure timestamps, rounded upward to whole minutes.

| Displayed delay    | Status                        |
| ------------------ | ----------------------------- |
| −1 to +1 minutes   | On time                       |
| +2 minutes or more | Delayed                       |
| −2 minutes or less | Early                         |
| `-`                | Delay information unavailable |

These categories are display rules used by this project.

## API Routing and Hosting

During development, the Vite proxy forwards requests beginning with `/api` to `https://www.wienerlinien.at`, removing the `/api` prefix.

For example:

    /api/ogd_realtime/monitor?...
    → https://www.wienerlinien.at/ogd_realtime/monitor?...

This development proxy is not included in the generated production files. A deployed version needs equivalent server-side routing or a backend proxy for live data requests.

Building the project alone does not configure production API access.

## Limitations

- Only tram line 1 is supported.
- Live information depends on the availability and accuracy of the Wiener Linien API.
- Refreshes happen every 30 seconds, rather than continuously.
- If a refresh fails, previously loaded departures remain visible alongside an error message.
- “No departures” can indicate an empty departure list or unavailable stop data.
- Delay rounding is asymmetric because values are rounded upward.
- This is an independent learning project, not an official Wiener Linien application.

## Project Background

I built this project to practise React, JavaScript, API integration, and responsive frontend development, with AI assistance for guidance, debugging, and parts of the implementation.

## Possible Future Improvements

- Show when departure data was last successfully updated
- Distinguish unavailable data from stops with no upcoming departures
- Support additional tram lines
- Display service disruptions
- Add filtering and further visualisations

## Data Source

Live departure information and the source route datasets come from Wiener Linien Open Government Data.
