const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/api/games`;

const getAll = async () => {
  const response = await fetch(baseUrl, {
    method: "GET",
    mode: "cors",
  });

  return response.json();
};

const create = async (newGame) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGame),
  });

  if (response.ok) {
    return response.json();
  } else {
    var body = await response.json();
    console.log(body);
    return null;
  }
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
  create,
};
