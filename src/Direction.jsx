import Stop from "./Stop.jsx";

const Direction = ({ title, stops, departures }) => {
    return (
        <div className="direction-container">
            <div className="direction-header">
                <span>{title}</span>
            </div>

            <div className="direction">
                {stops.map((stop) => {
                    return (
                        <Stop
                            name={stop.name}
                            departures={departures[stop.stopId]}
                            key={stop.stopId}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Direction;
