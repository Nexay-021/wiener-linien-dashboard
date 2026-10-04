import Stop from "./Stop.jsx";

const Direction = ({ title, stops }) => {
    return (
        <>
            <div className="direction-header">
                <span>{title}</span>
            </div>

            <div className="direction">
                {stops.map((stop) => {
                    return (
                        <Stop
                            name={stop.name}
                            stopId={stop.stopId}
                            key={stop.stopId}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Direction;
