const Departure = ({ countdown, planned, real, delay }) => {
    return (
        <>
            <span>{countdown} min</span>

            <span>{planned}</span>

            <span>{real}</span>

            <span>{delay > 0 ? `+${delay}` : delay}</span>
        </>
    );
};

export default Departure;
