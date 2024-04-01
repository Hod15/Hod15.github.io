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
function GameBoard({ level }) {
    const [game, setGame] = useState([]);
    // const [time, setTime] = useState(0);
    // const [game_start, setGameStart] = useState(false);
    // const [game_pause, setGamePause] = useState(false);
    // const [game_over, setGameOver] = useState(false);
    // const [flags, setFlags] = useState(0);
    // const [buttons_key, setGamePlayed] = useState(0)


    // const audioElement = useRef();
    // const revealedRef = useRef([]);
    // revealedRef.current = [];

    const init = () => {
        let required_length  = (level.row * level.col) / 2;
        const EMOJIS_KEYS = Object.keys(EMOJIS);
        let emojis = EMOJIS_KEYS.slice(0, required_length );

        let current_length = emojis.length;
        while(current_length < required_length)
        {
            emojis = emojis.concat(EMOJIS_KEYS.slice(0, required_length - current_length));
            current_length = emojis.length;
            console.log(current_length);
        }
        
        emojis = shuffle(emojis.concat(emojis));
        setGame(emojis);
        // localStorage.setItem("gameboard", JSON.stringify(emojis));
    }

    useEffect(() => {
        // document.querySelector(':root').style.setProperty('--gap', '2px')
        let storedGame = JSON.parse(localStorage.getItem('gameboard'));
        if(storedGame)
            setGame(storedGame);
        else
            init();
    }, [level]);

    // const reset = () => {
    //     setGame(constructGame(board));
    //     setGamePlayed(buttons_key + game.length)

    //     if (game_start)
    //         setGameStart(false);
    //     if (game_pause)
    //         setGamePause(false);
    //     if (game_over)
    //         setGameOver(false);

    //     setTime(0);
    //     setFlags(0);
    //     revealedRef.current = []
    // }

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

    // const timer = (time) => {
    //     // calculate time spent
    //     const minutes = Math.floor(time / 60);
    //     const seconds = time - minutes * 60;

    //     return `${minutes < 10 ? '0' + minutes.toString() : minutes} : ${seconds < 10 ? '0' + seconds.toString() : seconds}`
    // }

    const create_buttons = () => {
        let buttons = [];

        for (let i = 0; i < game.length; i++) {
            buttons.push(<Card key={i} content={EMOJIS[game[i]]}/>)
        }

        return (buttons)
    }

    const getClassname = () => {
        return ("grid board-" + level.col + " gap-2");
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center">
            <div className={`mx-auto lg:mx-0 rounded-md`}>
                <div className={getClassname()}>{ create_buttons() }</div>
            </div>
            <div className="self-center mx-auto lg:mx-0 lg:ml-20 mt-10 lg:mt-0 flex flex-col">
                {/* <div className="mb-4 flex-grow">
                    <div className="text-white flex flex-col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="self-center w-14 h-14" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                        </svg>
                        <span className="self-center text-2xl">{timer(time)} {game_pause && "⏸️"}</span>
                    </div>
                </div> */}

                {/* <button type="button" onClick={() => reset()} disabled={!game_start} className={`bg-opacity-10 px-6 py-3 mb-5 bg-slate-200 backdrop-blur-xl rounded-md border shadow-md ${game_start ? 'text-white' : 'cursor-not-allowed bg-opacity-5 text-gray-600 border-gray-600'}`}>
                    <h5 className="font-poppins text-center text-md lg:text-lg font-light">Start over</h5>
                </button>

                <button type="button" onClick={() => startOver(null)} className="bg-opacity-10 px-6 py-3 mb-5 bg-slate-200 backdrop-blur-xl rounded-md border shadow-md">
                    <h5 className="font-poppins text-center text-md lg:text-lg font-light text-white">Change the difficulty </h5>
                </button>

                <button type="button" onClick={() => handlePause()} disabled={!game_start && (game_over)} className={`bg-opacity-10 px-6 py-3 mb-5 bg-slate-200 backdrop-blur-xl rounded-md border shadow-md ${(game_start && !(game_over)) ? 'text-white' : 'cursor-not-allowed bg-opacity-5 text-gray-600 border-gray-600'}`}>
                    <h5 className="font-poppins text-center text-md lg:text-lg font-light">{game_pause ? 'Take over' : 'Pause'}</h5>
                </button> */}
            </div>
        </div>
    )
}
export default GameBoard;