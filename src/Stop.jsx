import Departure from "./Departure.jsx";

function getFormattedTime(timestamp) {
    timestamp = new Date(timestamp);

    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();

    return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

const Stop = ({ stationName, line, direction, departures }) => {
    return (
        <>
            <div>
                <p>Station Name = {stationName}</p>
                <p>Line = {line}</p>
                <p>Direction = {direction}</p>
            </div>
            <div>
                {departures.slice(0, 3).map((departure) => (
                    <Departure
                        key={departure.planned}
                        countdown={departure.countdown}
                        planned={getFormattedTime(departure.planned)}
                        real={getFormattedTime(departure.real)}
                        delay={departure.delay}
                    />
                ))}
            </div>
        </>
    );
};

export default Stop;
