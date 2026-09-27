const Departure = ({ countdown, planned, real, delay }) => {
    return (
        <>
            <div className="departure">
                <p>Next Departure: {countdown} minutes</p>
                <p>Planned Next Departure: {planned} </p>
                <p>Real Next Departure: {real}</p>
                <p>Delay: {delay > 0 ? `+${delay}` : delay}</p>
            </div>
        </>
    );
};

export default Departure;
