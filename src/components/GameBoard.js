import { useRef } from "react";
import { useEffect, useState } from "react";
import Card from "./Card";

/* Game ringtones */
const ringtones = {
    bomb: './ringtones/Bomb.mp3',
    win: './ringtones/Applause.mp3',
}

const EMOJIS = {
    'c1'  : '🌟',
    'c2'  : '🎯',
    'c3'  : '🚀',
    'c4'  : '🏆',
    'c5'  : '🎲',
    'c6'  : '🛡️',
    'c7'  : '⚔️',
    'c8'  : '🧙‍♂️',
    'c9'  : '🗝️',
    'c10' : '🌌',
    'c11' : '🏹',
    'c12' : '🌈',
    'c13' : '🌋',
    'c14' : '🕹️',
    'c15' : '🏰',
    'c16' : '🌲',
    'c17' : '💎',
    'c18' : '🌠',
    'c19' : '🧚‍♀️',
    'c20' : '🕷️',
    'c21' : '🌊',
    'c22' : '🎭',
    'c23' : '🗡️',
    'c24' : '🧟‍♂️',
    'c25' : '😊',
    'c26' : '😍',
    'c27' : '😎',
    'c28' : '😜',
    'c29' : '😇',
    'c30' : '😂',
    'c31' : '😬',
    'c32' : '😌',
    'c33' : '😢',
    'c34' : '😔' 
};


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
  
/**
 * GameBoard component
 * @returns JSX
 */
function GameBoard({ level, changeDifficulty }) {
    const [game, setGame] = useState([]);
    const [cards, setCards] = useState([]);
    const [time, setTime] = useState(0);
    // const [game_start, setGameStart] = useState(false);
    // const [game_pause, setGamePause] = useState(false);
    // const [game_over, setGameOver] = useState(false);
    // const [flags, setFlags] = useState(0);
    // const [buttons_key, setGamePlayed] = useState(0)


    // const audioElement = useRef();
    // const revealedRef = useRef([]);
    // revealedRef.current = [];

    const init = () => {
        let required_length  = (level.rows * level.cols) / 2;
        const EMOJIS_KEYS = Object.keys(EMOJIS);
        let emojis = EMOJIS_KEYS.slice(0, required_length );

        let current_length = emojis.length;
        while(current_length < required_length)
        {
            emojis = emojis.concat(EMOJIS_KEYS.slice(0, required_length - current_length));
            current_length = emojis.length;
        }
        
        emojis = shuffle(emojis.concat(emojis));
        setGame(emojis);
        localStorage.setItem("gameboard", JSON.stringify(emojis));
    }

    useEffect(() => {
        // document.querySelector(':root').style.setProperty('--gap', '2px')
        let storedGame = JSON.parse(localStorage.getItem('gameboard'));
        if(storedGame)
            setGame(storedGame);
        else
            init();
    }, [level]);

    useEffect(() => {
        create_buttons();
    }, [game]);

    const handleReset = () => {
        setGame(new Array(level.rows * level.cols))
        setTimeout(() => init(), 500)
        
        // if (game_start)
        //     setGameStart(false);

        // if (game_over)
        //     setGameOver(false);

        setTime(0);
    }

    const handleChangeDifficulty = () => {
        localStorage.removeItem("gameboard");
        localStorage.removeItem("level");
        changeDifficulty(null);
    }

    /**
     * 
     * @param {*} id (Number): the id to reveal
     */
    // const handleReveal = (id) => {
    //     reveal(id);
    // }

    // const handlePause = () => {
    //     let rootStyle = document.querySelector(':root').style

    //     if (!game_pause)
    //     {
    //         rootStyle.setProperty('--gap', '0px')
    //         for (let i = 0; i < game.length; i++) {
    //             if (!revealedRef.current[i].classList.contains('revealed')){
    //                 revealedRef.current[i].setAttribute('disabled', true)
    //             }
    //             continue;
    //         }
    //         setGamePause(true)
    //     }
    //     else{
    //         rootStyle.setProperty('--gap', '2px')
    //         for (let i = 0; i < game.length; i++) {
    //             if (!revealedRef.current[i].classList.contains('revealed')){
    //                 revealedRef.current[i].removeAttribute('disabled')
    //             }
    //             continue;
    //         }
    //         setGamePause(false)
    //     }
    // }

    // const click = (id) => {
    //     setTimeout(() => {
    //         revealedRef.current[id].click();
    //     }, 10);
    // }

    // useEffect(() => {
    //     const interval_id = (game_start && !game_pause && !game_over) && setInterval(() => setTime(time + 1), 1000);
    //     return () => clearInterval(interval_id);
    // }, [time, game_start, game_pause, game_over]);

    const displayTime = (time) => {
        // calculate time spent
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;

        return `${minutes < 10 ? '0' + minutes.toString() : minutes} : ${seconds < 10 ? '0' + seconds.toString() : seconds}`
    }

    const create_buttons = () => {
        let buttons = [];

        for (let i = 0; i < game.length; i++) {
            buttons.push(<Card key={i} content={EMOJIS[game[i]]}/>)
        }

        setCards(buttons);
    }

    return (
        // <div className="flex flex-col lg:flex-row justify-center">
            <div className={`mx-auto relative`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10  flex space-x-1 mb-2">
                    <button className="px-6 py-2 bg-red-300" onClick={ handleReset }>reset</button>
                    <div className="px-6 py-2 bg-red-300">{ displayTime(time) }</div>
                    <button className="px-6 py-2 bg-red-300" onClick={ handleChangeDifficulty }>change</button>
                </div>
                <div className={`grid cols-${level.cols} rows-${level.rows} justify-center gap-2`}>
                    { cards }
                </div>
            </div>
        // </div>
    )
}
export default GameBoard;