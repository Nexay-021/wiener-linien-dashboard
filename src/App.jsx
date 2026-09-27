import { useState, useEffect } from "react";
import Departure from "./Departure.jsx";

const App = () => {
    const [data, setData] = useState(null);
    const [departure, setDeparture] = useState([]);

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
                setDeparture(departuresInfo);
            });
    }, []);

    const stationName = data?.data.monitors[0].locationStop.properties.title;
    const line = data?.data.monitors[0].lines[0].name;
    const direction = data?.data.monitors[0].lines[0].towards;

    function getFormattedTime(timestamp) {
        timestamp = new Date(timestamp);

        const hours = timestamp.getHours();
        const minutes = timestamp.getMinutes();

        return `${hours}:${minutes.toString().padStart(2, "0")}`;
    }

    function calculateDelay(planned, real) {
        const plannedTime = new Date(planned);
        const realTime = new Date(real);

        const difference = realTime - plannedTime;

        return Math.ceil(difference / 1000 / 60);
    }

    return (
        <>
            <p>Station Name = {stationName}</p>
            <p>Line = {line}</p>
            <p>Direction = {direction}</p>
            {departure.map((departure) => (
                <Departure
                    key={departure.planned}
                    countdown={departure.countdown}
                    planned={getFormattedTime(departure.planned)}
                    real={getFormattedTime(departure.real)}
                    delay={departure.delay}
                />
            ))}
        </>
    );
};

export default App;
