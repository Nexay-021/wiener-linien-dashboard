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
        console.log(queryString);

        fetchDepartures();

        // const timer = setInterval(fetchAllDepartures, 60000);

        // return () => clearInterval(timer);
    }, []);

    function calculateDelay(planned, real) {
        const plannedTime = new Date(planned);
        const realTime = new Date(real);

        const difference = realTime - plannedTime;

        return Math.ceil(difference / 1000 / 60);
    }

    return (
        <>
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
        </>
    );
};

export default App;
