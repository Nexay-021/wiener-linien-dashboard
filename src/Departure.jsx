import { useState, useEffect } from "react";

const Departure = ({
    stationName,
    line,
    direction,
    countdown,
    planned,
    real,
    delay,
}) => {
    return (
        <>
            <p>Station Name:{stationName}</p>
            <p>Line: {line}</p>
            <p>Direction: {direction}</p>
            <p>Next Departure: {countdown} minutes</p>
            <p>Planned Next Departure: {planned} </p>
            <p>Real Next Departure: {real}</p>
            <p>Delay: {delay}</p>
        </>
    );
};

export default Departure;
