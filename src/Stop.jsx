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
            <div className="stop-header">
                <span>Line {line}</span>
                <span>Station Name {stationName}</span>
                <span>Direction {direction}</span>
            </div>
            <div className="departures">
                <div className="departure-header">
                    <span>Due:</span>
                    <span>Scheduled:</span>
                    <span>Actual:</span>
                    <span>Delay:</span>
                </div>
                {departures.slice(0, 3).map((departure) => (
                    <div className="departure" key={departure.planned}>
                        <Departure
                            countdown={departure.countdown}
                            planned={getFormattedTime(departure.planned)}
                            real={getFormattedTime(departure.real)}
                            delay={departure.delay}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Stop;
