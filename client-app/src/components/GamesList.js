import Game from "./Game";

const GamesList = ({ games, handleGameUpdate, handleGameDelete }) => {
  const listStyle = {
    display: "flex",
    ["flexDirection"]: "column ",
  };

  return (
    <>
      <h2>Games List</h2>
      <div style={listStyle}>
        {games.map((game) => (
          <div key={game.id}>
            <Game
              game={game}
              handleGameUpdate={handleGameUpdate}
              handleGameDelete={handleGameDelete}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GamesList;
