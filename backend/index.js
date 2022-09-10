const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const morganConfig = require("./morganConfig");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morganConfig);

const port = 3001;
const gamesEndpoint = "/api/games";
let games = [
  {
    id: "84490d14-0802-48d2-8286-66628e8844b0",
    name: "Flesh and Blood",
    publisher: "Legend Story Studioes",
  },
  {
    id: "18248771-23b7-4eb0-8df2-51de1611bf69",
    name: "Android: Netrunner",
    publisher: "Fantasy Flight Games",
  },
  {
    id: "7c20da7e-c4ef-47df-b494-05489dc4e15c",
    name: "Harry Potter: Death Eaters Rising",
    publisher: "The Op",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(gamesEndpoint, (req, res) => {
  res.json(games);
});

app.get(`${gamesEndpoint}/:id`, (req, res) => {
  const game = games.find((x) => x.id === req.params.id);
  if (game) {
    res.json(game);
  } else {
    res.status(404).end();
  }
});

app.post(gamesEndpoint, (req, res) => {
  const body = req.body;

  if (!body.name || !body.publisher) {
    return res.status(400).json({
      error: "Provide name and publisher",
    });
  }

  const newGame = {
    id: uuidv4(),
    ...body,
  };

  games = games.concat(newGame);

  res.json(newGame);
});

app.put(`${gamesEndpoint}/:id`, (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!body.name || !body.publisher) {
    return res.status(400).json({
      error: "Provide name and publisher",
    });
  }

  const game = games.find((x) => x.id === id);
  if (!game) {
    return res.status(404).end();
  }

  const updatedGame = {
    id,
    ...body,
  };

  games = games.map((game) => (game.id !== id ? game : updatedGame));

  res.json(updatedGame);
});

app.delete(`${gamesEndpoint}/:id`, (req, res) => {
  const id = req.params.id;
  const game = games.find((x) => x.id === id);

  if (!game) {
    return res.status(400).json({ error: `Game ${id} not found1` });
  }

  games = games.filter((x) => x.id !== id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
