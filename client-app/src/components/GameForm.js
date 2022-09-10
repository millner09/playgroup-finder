import { useState } from "react";

const GameForm = ({ inputGame, handleGameUpdate }) => {
  const [game, setGame] = useState(inputGame);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const gameUpdate = {
      ...game,
      [name]: value,
    };

    setGame(gameUpdate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGameUpdate(game);
  };

  const formStyle = {
    display: "flex",
    ["flexDirection"]: "column ",
    gap: "10px",
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={formStyle}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={game.name}
            onChange={handleChange}
          />
          <label>Publisher: </label>

          <input
            type="text"
            name="publisher"
            value={game.publisher}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
};

export default GameForm;
