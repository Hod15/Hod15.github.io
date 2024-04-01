import { useState, useEffect } from "react";
import Level from "../components/Level";
import GameBoard from "../components/GameBoard";

function App() {
  const [level, setLevel] = useState(null)

  useEffect(() => {
    let lvl = localStorage.getItem('level');
    if(lvl)
      setLevel(JSON.parse(lvl))
  }, []);

  // bg-[url('../public/img/bg.jpg')]
  return (
    <>
      {/* <div className="w-full h-screen bg-black bg-opacity-10"> */}
        <header className="bg-black px-4 py-4 text-white mb-10 flex flex-col justify-center md:flex-row md:justify-between">
          <h1 className="inline-block text-2xl text-center font-pressStart">Keep it</h1>

          <div className="text-center">
            <span> Moves: 10 ,</span>
            <span> Found: 10 </span>
          </div>
        </header>

        <div className="w-full md:max-w-md lg:max-w-xl mx-auto">
          {!level ? <Level handleLevel={setLevel} /> : <GameBoard level={level}/>}
        </div>

        <footer className="absolute bottom-0 px-9 py-4 w-full bg-black bg-opacity-20 backdrop-filter backdrop-blur-xl flex justify-between text-white font-thin">
          <div>
            <button className="border bg-red-500 p-3 rounded-lg" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-music-note-beamed" viewBox="0 0 16 16">
                <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/>
                <path fillRule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"/>
                <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"/>
              </svg>
            </button>
          </div>
          <div>Powered by <a href="https://github.com/josiashod" target="_blank" rel="noopener noreferrer" className="text-orange-300">@josiashod</a></div>
        </footer>
      {/* </div> */}
    </>
  );
}

export default App;
