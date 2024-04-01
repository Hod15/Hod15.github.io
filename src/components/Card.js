import { useEffect, useState } from "react";

const Card = ({content}) => {
    const [revealed, setRevealed] = useState(false);
    const [clicked, setClicked] = useState(false);
    // const [flaged,  setFlaged] = useState(false);

    // useEffect(() => {
    //     const interval_id = (revealed && !gameIsOver) && setInterval(() => setClicked(false), 1000)
    //     return () => clearInterval(interval_id);
    // }, [revealed, gameIsOver]);

    const handleClick = (e) => {

        // setRevealed(true)

        // if (!gameHasStart)
        //     handleGameStart(true);

        // if (gameIsOver)
        //     return;

        // if (char === "*")
        //     triggerBomb();

        // if (char === " " && !revealed)
        //     reveal();

        setClicked(true)
        // setTimeout(() => checksForWin(), 10);
    }

    const getClassname = () => {

        return (clicked || revealed) ? " revealed" : "";
    }

    return (
        <button type="button" className={"relative " + getClassname()} onClick = { handleClick }>
            <div className="h-full w-full bg-black front rounded-md"></div>
            <div className="h-full w-full mt-[-100%] back bg-green-400 text-center rounded-md flex justify-center items-center">
                <p>{ content }</p>
            </div>
        </button>
    );
}

export default Card;
