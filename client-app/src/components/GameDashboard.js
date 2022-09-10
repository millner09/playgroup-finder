import GamesList from "./GamesList";
import React, { useEffect, useState } from "react";
import gameService from "../services/gameService";

const GameDashboard = () => {
  const [games, setGames] = useState([]);

  const fetchData = async () => {
    const res = await gameService.getAll();
    setGames(res);
  };

  const handleGameUpdate = async (updatedGame) => {
    setGames(
      games.map((game) => (game.id !== updatedGame.id ? game : updatedGame))
    );

    const res = await gameService.update(updatedGame);
    console.log(JSON.stringify(res));
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

  return (
    <GamesList
      games={games}
      handleGameUpdate={handleGameUpdate}
      handleGameDelete={handleGameDelete}
    />
  );
};

export default GameDashboard;
