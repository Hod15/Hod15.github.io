const LEVELS = [
    {
        "name": "beginner",
        "cols": 4,
        "rows": 4,
    },
    {
        "name": "intermediate",
        "cols": 6,
        "rows": 8,
    },
    // {
    //     "name": "advanced",
    //     "cols": 6,
    //     "rows": 9,
    // }
];


function Level({ handleLevel }) {
    const getMoves = (level) => {
        let mv = (level.cols * level.rows) / 2;
        mv += mv / 4;
        return Math.ceil(mv);
    }
    let setLevel = (level) => {
        level.moves = getMoves(level);
        handleLevel(level)
        localStorage.setItem('level', JSON.stringify(level));
    }
    return (
        <div className="md:max-w-md mx-auto">
            <div className="grid gap-3 px-4">
                {LEVELS.map((level) => (
                    <button onClick={() => setLevel(level)} key={level.name} className="p-2 bg-black backdrop-filter backdrop-blur-lg bg-opacity-50 rounded-lg shadow-md">
                        <h5 className="font-towards text-center capitalize text-lg lg:text-2xl font-bold text-white">{level.name}</h5>
                        <div className="flex justify-center text-white"> { getMoves(level) } Moves </div>
                    </button>
                ))}
            </div>
        </div>
    );
  }
  
  export default Level;
  