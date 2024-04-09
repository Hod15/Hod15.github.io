import { useEffect, useState } from "react";

const Card = ({id, content, reveal, hasBeenRevealed}) => {
    const [revealed, setRevealed] = useState(false);

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
        <button type="button" className={"relative text-xl md:text-5xl " + ((revealed) ? "revealed" : "")} onClick = { () => handleClick() }>
            <div className="h-full w-full bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg front rounded-md"></div>
            <div className="h-full w-full back bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg text-center rounded-md flex justify-center items-center">
                <p>{ content }</p>
            </div>
        </button>
    );
}

export default Card;
