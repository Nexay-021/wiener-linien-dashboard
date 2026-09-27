import { useState, useEffect } from "react";
import Stop from "./Stop.jsx";

const App = () => {
    const [data, setData] = useState(null);
    const [departures, setDepartures] = useState([]);

    useEffect(() => {
        fetch("/api/ogd_realtime/monitor?stopId=1877")
            .then((response) => response.json())
            .then((data) => {
                setData(data);

                const departures =
                    data?.data.monitors[0].lines[0].departures.departure;
                const departuresInfo = departures.map((departure) => {
                    return {
                        countdown: departure.departureTime.countdown,
                        planned: departure.departureTime.timePlanned,
                        real: departure.departureTime.timeReal,
                        delay: calculateDelay(
                            departure.departureTime.timePlanned,
                            departure.departureTime.timeReal,
                        ),
                    };
                });
                setDepartures(departuresInfo);
            });
    }, []);

    const stationName = data?.data.monitors[0].locationStop.properties.title;
    const line = data?.data.monitors[0].lines[0].name;
    const direction = data?.data.monitors[0].lines[0].towards;

    function calculateDelay(planned, real) {
        const plannedTime = new Date(planned);
        const realTime = new Date(real);

        const difference = realTime - plannedTime;

        return Math.ceil(difference / 1000 / 60);
    }

    return (
        <>
            <div className="wrapper">
                <Stop
                    stationName={stationName}
                    line={line}
                    direction={direction}
                    departures={departures}
                />
            </div>
        </>
    );
};

export default App;
