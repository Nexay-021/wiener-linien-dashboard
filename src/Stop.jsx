import Departure from "./Departure.jsx";

function getFormattedTime(timestamp) {
    timestamp = new Date(timestamp);

    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();

    return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

const Stop = ({ name, stopId }) => {
    return (
        <>
            <div className="stop">
                <span className="stop-marker">●</span>

                <div className="stop-name">{name}</div>

                <div className="departures">
                    <div className="departure">
                        <span>3 min</span>
                        <span>+3</span>
                    </div>

                    <div className="departure">
                        <span>8 min</span>
                        <span>+1</span>
                    </div>

                    <div className="departure">
                        <span>14 min</span>
                        <span>+0</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stop;
