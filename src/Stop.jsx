import Departure from "./Departure.jsx";

const Stop = ({ name, departures }) => {
    return (
        <div className="stop">
            <span className="stop-marker">●</span>

            <div className="stop-name">{name}</div>

            <div className="departures">
                {!Array.isArray(departures) ? (
                    <span className="no-departures">
                        No realtime data available
                    </span>
                ) : departures.length === 0 ? (
                    <span className="no-departures">
                        No upcoming departures reported
                    </span>
                ) : (
                    departures.map((departure) => {
                        return (
                            <div
                                className="departure"
                                key={departure.timePlanned}
                            >
                                <Departure
                                    countdown={departure.countdown}
                                    delay={departure.delay}
                                />
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Stop;
