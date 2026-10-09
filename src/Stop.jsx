import Departure from "./Departure.jsx";

const Stop = ({ name, departures }) => {
    return (
        <>
            <div className="stop">
                <span className="stop-marker">●</span>

                <div className="stop-name">{name}</div>

                <div className="departures">
                    {departures?.length > 0 ? (
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
                    ) : (
                        <span className="no-departures">No departures</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default Stop;
