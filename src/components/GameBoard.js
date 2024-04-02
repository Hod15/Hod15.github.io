// import { useRef } from "react";
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
function GameBoard({ level, changeDifficulty, handleMoves, movesLeft, reset, found, handleFoundCard }) {
    const [game, setGame] = useState([]);
    const [cards, setCards] = useState([]);
    const [revealedCards, setRevealedCards] = useState([]);

    const [last_clicked_card, setLastClickedCard] = useState(-1);
    const [clicked_card, setClickedCard] = useState(-1);

    const [time, setTime] = useState(0);
    const [game_start, setGameStart] = useState(false);
    const [game_over, setGameOver] = useState(false);

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
    }, [level]);

    useEffect(() => {
        setGameOver(movesLeft === 0);
    }, [movesLeft]);

    const handleReset = () => {
        setGame(Array.from({ length: (level.rows * level.cols) }, () => "f"));
        setTimeout(() => init(), 500);
        
        reset();
        
        if (game_start)
            setGameStart(false);

        if (game_over)
            setGameOver(false);
        
        setClickedCard(-1);
        setLastClickedCard(-1);

        setTime(0);
    }

    const handleChangeDifficulty = () => {
        localStorage.removeItem("gameboard");
        localStorage.removeItem("level");
        localStorage.removeItem("played_cards");
        changeDifficulty(null);
    }

    useEffect(() => {

        if(game_over)
            return;

        if(clicked_card !== -1)
        {
            let played_cards = revealedCards;
            played_cards[clicked_card] = true;
            setRevealedCards(played_cards);

            if(!game_start)
                setGameStart(true)
        }

        if(last_clicked_card !== -1)
        {
            if(game[last_clicked_card] !== game[clicked_card])
            {
                let played_cards = [...revealedCards];
                played_cards[clicked_card] = false;
                played_cards[last_clicked_card] = false;

                setTimeout(() => setRevealedCards(played_cards), 500);
                handleMoves(movesLeft - 1);
            }
            else
            {
                localStorage.setItem("played_cards", JSON.stringify(revealedCards));
                handleFoundCard(found + 1);
            }

            setLastClickedCard(-1);
            setClickedCard(-1);

            setGameOver(doesUserWin());
        }
        else
            setLastClickedCard(clicked_card);

    }, [clicked_card]);

    // return true if every cards has been revealed
    const doesUserWin = () => {
        return  revealedCards.reduce(
            (win, currentValue) => win && currentValue,
            true,
        );
    }

    useEffect(() => {
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
        // <div className="flex flex-col lg:flex-row justify-center">
            <div className={`mx-auto relative`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10  flex space-x-1 mb-2">
                    <button className="px-6 py-2 bg-red-300" onClick={ handleReset }>reset</button>
                    <div className="px-6 py-2 bg-red-300">{ displayTime(time) }</div>
                    <button className="px-6 py-2 bg-red-300" onClick={ handleChangeDifficulty }>change level</button>
                </div>
                <div className={`grid cols-${level.cols} rows-${level.rows} justify-center gap-2`}>
                    {game.map((value, index) => (
                        <Card
                            key={index}
                            id={index}
                            content={EMOJIS[game[index]]}
                            reveal={ setClickedCard }
                            hasBeenRevealed={revealedCards[index]}
                        />
                    ))}
                </div>
            </div>
        // </div>
    )
}
export default GameBoard;