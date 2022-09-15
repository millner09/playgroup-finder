import GamesList from "./GamesList";
import React, { useEffect, useState } from "react";
import gameService from "../services/gameService";
import GameForm from "./GameForm";

const GameDashboard = () => {
  const [games, setGames] = useState([]);
  const [showNewGameForm, setShowNewGameForm] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");

  const fetchData = async () => {
    const res = await gameService.getAll();
    setGames(res);
  };

  const handleGameUpdate = async (updatedGame) => {
    setGames(
      games.map((game) => (game.id !== updatedGame.id ? game : updatedGame))
    );

    const res = await gameService.update(updatedGame);
  };

  const handleGameDelete = async (id) => {
    const res = await gameService.deleteGame(id);
    if (res) {
      setGames(games.filter((game) => game.id !== id));
    } else {
      console.log(`Failed to delete: ${id}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const container = {
    padding: "10px",
    margin: "10px",
  };

  const handleGameCreate = async (game) => {
    setShowNewGameForm(false);
    var res = await gameService.create(game);
    if (res) {
      setGames(games.concat(res));
    } else {
      console.log("Failed to create game");
    }
  };

  return (
    <div style={container}>
      <h1>Game Dashboard</h1>
      <span>{errorMsg}</span>
      <button
        onClick={() => {
          setShowNewGameForm(true);
        }}
      >
        Add Game
      </button>
      {showNewGameForm && (
        <GameForm mode={"new"} handleGameUpdate={handleGameCreate} />
      )}
      <GamesList
        games={games}
        handleGameUpdate={handleGameUpdate}
        handleGameDelete={handleGameDelete}
      />
    </div>
  );
};

export default GameDashboard;
