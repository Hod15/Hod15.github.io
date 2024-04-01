const LEVELS = [
    {
        "name": "beginner",
        "col": 3,
        "row": 4,
    },
    {
        "name": "intermediate",
        "col": 6,
        "row": 8,
    },
    {
        "name": "advanced",
        "col": 6,
        "row": 9,
    }
];


function Level({ handleLevel }) {
    const getMoves = (level) => { return ((level.col * level.row) / 2) + 2 }
    let setLevel = (level) => {
        level.moves = getMoves(level);
        console.log(level)
        handleLevel(level)
        // localStorage.setItem('level', JSON.stringify(level));
    }
    return (
        <div className="">
            <div className="grid gap-3 px-4">
                {LEVELS.map((level) => (
                    <button onClick={() => setLevel(level)} key={level.name} className="p-2 bg-black backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-lg shadow-md">
                        <h5 className="font-towards text-center capitalize text-lg lg:text-2xl font-bold text-white">{level.name}</h5>
                        <div className="flex justify-center text-white"> { getMoves(level) } Moves </div>
                    </button>
                ))}
            </div>
        </div>
    );
  }
  
  export default Level;
  