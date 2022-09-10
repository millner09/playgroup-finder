const baseUrl = "http://localhost:3001/api/games";

const getAll = async () => {
  const response = await fetch(baseUrl, {
    method: "GET",
    mode: "cors",
  });

  return response.json();
};

const update = async (updatedGame) => {
  const response = await fetch(`${baseUrl}/${updatedGame.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(updatedGame),
  });

  return response.json();
};

const deleteGame = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (response.status !== 204) {
    const body = await response.json();
    console.log(body);
    return false;
  }
  return true;
};

export default {
  getAll,
  update,
  deleteGame,
};
