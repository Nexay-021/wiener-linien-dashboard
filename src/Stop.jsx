import Departure from "./Departure.jsx";

const Stop = ({ name, departures }) => {
    return (
        <>
            <div className="stop">
                <span className="stop-marker">●</span>

                <div className="stop-name">{name}</div>

                <div className="departures">
                    {(departures ?? []).map((departure) => {
                        return (
                            <div
                                className="departure"
                                key={departure.countdown}
                            >
                                <Departure
                                    countdown={departure.countdown}
                                    delay={departure.delay}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Stop;
