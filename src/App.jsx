import { useState, useEffect } from "react";
import { line1PrhToStf, line1StfToPrh } from "./data/line1Route.js";
import Direction from "./Direction.jsx";

const App = () => {
    const [departures, setDepartures] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        function fetchDepartures() {
            fetch(`/api/ogd_realtime/monitor?${queryString}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP ${response.status}: ${response.statusText || "Unknown error"}`,
                        );
                    }

                    return response.json();
                })
                .then((data) => {
                    const monitors = data?.data?.monitors;

                    if (!Array.isArray(monitors)) {
                        throw new Error(
                            "Invalid API response: monitors missing",
                        );
                    }

                    const results = {};

                    monitors.forEach((monitor) => {
                        const stopId =
                            monitor.locationStop?.properties?.attributes?.rbl;

                        if (stopId == null) {
                            return;
                        }

                        if (!Array.isArray(monitor.lines)) {
                            return;
                        }

                        const line1 = monitor.lines.find(
                            (line) => line.name === "1",
                        );

                        if (!line1) {
                            return;
                        }

                        const stopDepartures =
                            line1.departures?.departure ?? [];

                        if (!Array.isArray(stopDepartures)) {
                            return;
                        }

                        const departuresInfo = stopDepartures
                            .filter((departure) =>
                                Number.isFinite(
                                    departure?.departureTime?.countdown,
                                ),
                            )
                            .slice(0, 3)
                            .map((departure) => {
                                return {
                                    countdown:
                                        departure.departureTime.countdown,
                                    delay: calculateDelay(
                                        departure.departureTime.timePlanned,
                                        departure.departureTime.timeReal,
                                    ),
                                    timePlanned:
                                        departure.departureTime.timePlanned,
                                };
                            });
                        results[stopId] = departuresInfo;
                    });
                    setDepartures(results);
                    setError(null);
                })
                .catch((error) => {
                    console.error("Failed to fetch departures:", error);
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        const allStops = [...line1StfToPrh, ...line1PrhToStf];

        const stopQueries = allStops.map((stop) => `stopId=${stop.stopId}`);

        const queryString = stopQueries.join("&");

        fetchDepartures();

        const timer = setInterval(fetchDepartures, 30000);

        return () => clearInterval(timer);
    }, []);

    function calculateDelay(planned, real) {
        if (planned == null || real == null) {
            return null;
        }
        const plannedTime = new Date(planned);
        const realTime = new Date(real);

        if (
            Number.isNaN(plannedTime.getTime()) ||
            Number.isNaN(realTime.getTime())
        ) {
            return null;
        }

        const difference = realTime - plannedTime;

        return Math.ceil(difference / 1000 / 60);
    }

    return (
        <>
            <div className="dashboard-header">
                <div className="project-information">
                    <span className="header-title">LINE 1 LIVE DASHBOARD</span>
                    <span>Realtime departures · Wiener Linien</span>
                </div>
                <div className="legend">
                    <span className="header-title">DEPARTURE LEGEND</span>
                    <span>3 min = Departure in 3 minutes</span>
                    <span className="on-time">0 / ±1 = On time</span>
                    <span className="delayed">+2 or more = Delayed</span>
                    <span className="early">-2 or less = Early</span>
                    <span className="unknown">
                        - = Delay information unavailable
                    </span>
                </div>
            </div>
            <div className="route-container">
                <div className="route-notice">
                    <span className="route-title">Service Notice</span>
                    <span>This dashboard displays Line 1's regular route.</span>
                    <span>
                        Temporary diversions may affect displayed stops and
                        departures.
                    </span>
                </div>
            </div>
            {loading && (
                <p className="loading-message">Loading departures...</p>
            )}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && Object.keys(departures).length > 0 && (
                <div className="wrapper">
                    <Direction
                        title="Prater Hauptallee → Stefan Fadinger Platz"
                        stops={line1PrhToStf}
                        departures={departures}
                    />
                    <Direction
                        title="Stefan Fadinger Platz → Prater Hauptallee"
                        stops={line1StfToPrh}
                        departures={departures}
                    />
                </div>
            )}
        </>
    );
};

export default App;
