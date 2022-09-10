import { useState } from "react";
import GameForm from "./GameForm";

const Game = ({ game, handleGameUpdate, handleGameDelete }) => {
  const [edit, setEdit] = useState(false);

  const handleGameFormSubmission = (game) => {
    setEdit(false);
    handleGameUpdate(game);
  };

  return (
    <div>
      {!edit && (
        <>
          <h3>{game.name}</h3>
          <p>Publisher: {game.publisher}</p>
          <button
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit Game
          </button>
          <button onClick={() => handleGameDelete(game.id)}>Delete Game</button>
        </>
      )}

      {edit && (
        <GameForm
          inputGame={game}
          handleGameUpdate={handleGameFormSubmission}
        />
      )}
    </div>
  );
};

export default Game;
