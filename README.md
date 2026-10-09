# Wiener Linien – Line 1 Live Dashboard

A responsive web application that displays live departure information for Vienna's tram line 1 in both directions, from Prater Hauptallee to Stefan-Fadinger-Platz and vice versa.

The dashboard uses the public Wiener Linien Open Government Data (OGD) API to retrieve departure countdowns and calculate delays. Data refreshes automatically every 30 seconds.

This project was developed independently as a practical exercise in React, JavaScript, API integration, and frontend development.

## Features

- Live departure information for tram line 1 in both directions
- Up to three upcoming departures per stop
- Delay indicators with color-coded statuses
- Automatic data refresh every 30 seconds
- Responsive layout for desktop and mobile
- Loading indicators, error handling, and basic API data validation

## Technologies

- **React** – component-based user interface
- **JavaScript** – data processing and application logic
- **CSS** – layout, styling, and responsive design
- **Vite** – development server and production builds
- **Wiener Linien OGD API** – public transport departure data

## Getting Started

### Requirements

- Node.js
- npm

### Installation

1. Clone the repository.
2. Open the project directory.
3. Install dependencies:

    `npm install`

4. Start the development server:

    `npm run dev`

5. Open the local URL displayed in the terminal.

### Production Build

Create an optimized production build:

`npm run build`

Preview the generated build locally:

`npm run preview`

## Limitations

- Currently supports only tram line 1.
- Departure information depends on the availability and accuracy of the Wiener Linien OGD API.
- The project is an independent prototype and is not an official Wiener Linien application.
- Production hosting requires a working API routing configuration.

## Future Improvements

- Support for additional tram lines
- Service disruptions and traffic notifications
- Scheduled and actual departure interval analysis
- Additional filtering and visualization options

## Data Source

Departure data is provided by the public Wiener Linien Open Government Data API.
