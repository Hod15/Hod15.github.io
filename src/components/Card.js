import { useEffect, useState } from "react";

const Card = ({id, content, reveal, hasBeenRevealed}) => {
    const [revealed, setRevealed] = useState(false);

    // useEffect(() => {
    //     const interval_id = (revealed && !gameIsOver) && setInterval(() => setClicked(false), 1000)
    //     return () => clearInterval(interval_id);
    // }, [revealed, gameIsOver]);

    useEffect(() => {
        setRevealed(hasBeenRevealed)
    }, [hasBeenRevealed]);

    useEffect(() => {
        setRevealed(false);
    }, [content]);

    const handleClick = (e) => {
        if(revealed)
            return;
        reveal(id)
    }

    return (
        <button type="button" className={"relative text-5xl " + ((revealed) ? "revealed" : "")} onClick = { () => handleClick() }>
            <div className="h-full w-full bg-black front rounded-md"></div>
            <div className="h-full w-full back bg-green-400 text-center rounded-md flex justify-center items-center">
                <p>{ content }</p>
            </div>
        </button>
    );
}

export default Card;
