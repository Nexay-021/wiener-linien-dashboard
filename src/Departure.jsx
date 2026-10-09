const Departure = ({ countdown, delay }) => {
    let delayClass;

    if (delay === null) {
        delayClass = "unknown";
    } else if (delay > 1) {
        delayClass = "delayed";
    } else if (delay < -1) {
        delayClass = "early";
    } else {
        delayClass = "on-time";
    }
    return (
        <>
            <span className="countdown">{countdown} min</span>

            <span className={delayClass}>
                {delay === null ? "-" : delay > 0 ? `+${delay}` : delay}
            </span>
        </>
    );
};

export default Departure;
