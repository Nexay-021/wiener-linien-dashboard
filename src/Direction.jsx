import Stop from "./Stop.jsx";

const Direction = ({ title, stops, departures }) => {
    return (
        <div className="direction-container">
            <div className="direction-header">
                <span>{title}</span>
            </div>

            <div className="direction">
                {stops.map((stop, index) => {
                    return (
                        <Stop
                            name={stop.name}
                            departures={departures[stop.stopId]}
                            key={stop.stopId}
                            isTerminal={index === stops.length - 1}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Direction;
