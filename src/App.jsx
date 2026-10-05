import { useState, useEffect } from "react";
import { line1PrhToStf, line1StfToPrh } from "./data/line1Route.js";
import Direction from "./Direction.jsx";

const App = () => {
    const [departures, setDepartures] = useState({});

    useEffect(() => {
        function fetchDepartures() {
            fetch(`/api/ogd_realtime/monitor?${queryString}`)
                .then((response) => response.json())
                .then((data) => {
                    const monitors = data.data.monitors;

                    const results = {};

                    monitors.forEach((monitor) => {
                        const stopId =
                            monitor.locationStop.properties.attributes.rbl;

                        const stopDepartures =
                            monitor.lines[0].departures.departure;

                        const departuresInfo = (stopDepartures ?? [])
                            .slice(0, 3)
                            .map((departure) => {
                                return {
                                    countdown:
                                        departure.departureTime.countdown,
                                    delay: calculateDelay(
                                        departure.departureTime.timePlanned,
                                        departure.departureTime.timeReal,
                                    ),
                                };
                            });
                        results[stopId] = departuresInfo;
                    });
                    setDepartures(results);
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
        const plannedTime = new Date(planned);
        const realTime = new Date(real);

        const difference = realTime - plannedTime;

        return Math.ceil(difference / 1000 / 60);
    }

    return (
        <>
            <div className="dashboard-header">
                <div className="project-information">
                    <span>LINE 1 LIVE DASHBOARD</span>
                    <span>Realtime departures · Wiener Linien</span>
                </div>
                <div className="legend">
                    <span>DEPARTURE INFO</span>
                    <span>3 min = departs in 3 min</span>
                    <span>+3 = 3 min delay</span>
                    <span>0 = on time</span>
                </div>
            </div>
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
        </>
    );
};

export default App;
