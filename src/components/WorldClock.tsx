interface WorldClockProps {
    props: { id: string; city: string; cityTime: number };
    onDelete: (id: string) => void;
}

function WorldClock({ props, onDelete }: WorldClockProps) {
    const now = new Date(props.cityTime);
    const hoursAngle = now.getHours()* 15;
    const minutesAngle = now.getMinutes() * 6;
    const secondsAngle = now.getSeconds() * 6;


    return (
        <div className="clock">
            <h3 className="clock-header">{props.city}</h3>
            <button onClick={() => onDelete(props.id)} className="delete-button">
                    ×
            </button>
            <div className="clock-face">
                <div className="hour-hand" style={{ transform: `rotate(${hoursAngle}deg)` }}></div>
                <div className="minute-hand" style={{ transform: `rotate(${minutesAngle}deg)` }}></div>
                <div className="second-hand" style={{ transform: `rotate(${secondsAngle}deg)` }}></div>
            </div>
        </div>
    );
}

export default WorldClock;
