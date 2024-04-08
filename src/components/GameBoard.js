import { useEffect, useState, useRef } from "react";
// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Card from "./Card";

/* Game ringtones */
const ringtones = {
    lose: './ringtones/lose.wav',
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
    // const [cards, setCards] = useState([]);
    const [revealedCards, setRevealedCards] = useState([]);

    const [last_clicked_card, setLastClickedCard] = useState(-1);
    // const [clicked_card, setClickedCard] = useState(-1);

    const [time, setTime] = useState(0);
    const [game_start, setGameStart] = useState(false);
    const [game_over, setGameOver] = useState(false);

    const [ moves, setMoves ] = useState(0);
    const [ found, setFound ] = useState(0);

    const audioElement = useRef();

    // init the game and the revealed cards
    const init = () => {
        let array_size = level.rows * level.cols;
        let required_length  = array_size / 2;
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

        let played_cards = Array.from({ length: array_size }, () => false);
        setRevealedCards(played_cards);
        localStorage.setItem("gameboard", JSON.stringify(emojis));
        localStorage.setItem("played_cards", JSON.stringify(played_cards));
    }

    useEffect(() => {
        let storedGame = JSON.parse(localStorage.getItem('gameboard'));
        let storedGamePlay = JSON.parse(localStorage.getItem('played_cards'));
        if(storedGame)
        {
            setGame(storedGame);
            setRevealedCards(storedGamePlay);
        }
        else
            init();
    }, []);

    useEffect(() => {
        if(level)
          setMoves(level.moves)
        else
          setMoves(0);
      }, [level]);

    useEffect(() => {
        setGameOver(moves === 0);
    }, [moves]);

    // reset gameboard to allow user to play another game
    const handleReset = () => {
        setGame(Array.from({ length: (level.rows * level.cols) }, () => "f"));
        setTimeout(() => init(), 500);
        
        if (game_start)
            setGameStart(false);

        if (game_over)
            setGameOver(false);
        
        // setClickedCard(-1);
        setLastClickedCard(-1);

        setMoves(level.moves);
        setFound(0);

        setTime(0);
    }

    const handleChangeDifficulty = () => {
        localStorage.removeItem("gameboard");
        localStorage.removeItem("level");
        localStorage.removeItem("played_cards");
        changeDifficulty(null);
    }

    const playSound = () => {
        audioElement.current.src = doesUserWin() ? ringtones.win : ringtones.lose;
        audioElement.current.currentTime = 0;
        audioElement.current.play();

        // setTimeout(() => { sound.stop() }, 1000);
    }

    const handleClick = (clicked_card) => {
        if(game_over)
            return;

        let played_cards = revealedCards;
        played_cards[clicked_card] = true;
        setRevealedCards(played_cards);

        if(!game_start)
            setGameStart(true)

        if(last_clicked_card !== -1)
        {
            if(game[last_clicked_card] !== game[clicked_card])
            {
                let played_cards = [...revealedCards];
                played_cards[clicked_card] = false;
                played_cards[last_clicked_card] = false;

                setTimeout(() => setRevealedCards(played_cards), 500);
                setMoves(moves - 1);
            }
            else
            {
                localStorage.setItem("played_cards", JSON.stringify(revealedCards));
                setFound(found + 1);
            }

            setLastClickedCard(-1);

            setGameOver(doesUserWin());
        }
        else
            setLastClickedCard(clicked_card);
    }

    // return true if every cards has been revealed
    const doesUserWin = () => {
        return  revealedCards.reduce(
            (win, currentValue) => win && currentValue,
            true,
        );
    }

    // timer setinterval
    useEffect(() => {
        if(game_over && game_start)
            playSound();
        const interval_id = (game_start && !game_over) && setInterval(() => setTime(time + 1), 1000);
        return () => clearInterval(interval_id);
    }, [time, game_start, game_over]);

    const displayTime = (time) => {
        // calculate time spent
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;

        return `${minutes < 10 ? '0' + minutes.toString() : minutes} : ${seconds < 10 ? '0' + seconds.toString() : seconds}`
    }

    return (
        <>
            <audio ref={audioElement} />
            { (game_over && doesUserWin()) && <Confetti />}

            <div className="mx-auto relative flex flex-col lg:flex-row justify-center">
                <div className="lg:order-2 mb-4 lg:mb-0 lg:ml-4 rounded-md bg-black bg-opacity-60 backdrop-filter backdrop-blur-xl px-4 py-4 text-center text-white flex flex-col">
                    <div className="lg:flex-grow flex flex-col justify-center">
                        <div className="px-6 py-2 text-xl md:text-4xl">{ displayTime(time) }</div>
                        <div className="mb-4">
                            <span> Moves left : { moves } ,</span>
                            <span> Found: { found }  </span>
                        </div>
                        <div className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2 justify-center mb-2">
                            <button className="px-6 py-2 lg:w-full bg-black" onClick={ handleReset }>reset</button>
                            <button className="px-2 py-2 lg:w-full bg-black" onClick={ handleChangeDifficulty }>change level</button>
                        </div>
                    </div>
                    <p className="">
                        Powered by <a href="https://github.com/josiashod" target="_blank" rel="noopener noreferrer" className="text-blue-300">@josiashod</a>
                    </p>
                </div>
                <div className={`grid cols-${level.cols} rows-${level.rows} justify-center gap-2`}>
                    {game.map((value, index) => (
                        <Card
                            key={index}
                            id={index}
                            content={EMOJIS[game[index]]}
                            reveal={ handleClick }
                            hasBeenRevealed={revealedCards[index]}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
export default GameBoard;