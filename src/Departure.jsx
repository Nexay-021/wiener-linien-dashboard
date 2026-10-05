const Departure = ({ countdown, delay }) => {
    return (
        <>
            <span>{countdown} min</span>

            <span>{delay > 0 ? `+${delay}` : delay}</span>
        </>
    );
};

export default Departure;
