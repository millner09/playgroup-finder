const express = require("express");
const cors = require("cors");
const Game = require("./models/game")
const morganConfig = require("./morganConfig");
var ObjectId = require('mongoose').Types.ObjectId;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morganConfig);

const port = process.env.PORT || 3001;
const gamesEndpoint = "/api/games";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(gamesEndpoint, (req, res) => {
  Game.find({})
    .then((games) => {
      res.json(games);
    })
});

app.get(`${gamesEndpoint}/:id`, (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Invalid Id"
    })
  }
  Game.findById(req.params.id)
    .then((game) => {
      if (game) {
        res.json(game);
      }

      res.status(404).end();
    })
});

app.post(gamesEndpoint, (req, res) => {
  const body = req.body;

  if (!body.name || !body.publisher) {
    return res.status(400).json({
      error: "Provide name and publisher",
    });
  }

  const newGame = new Game({
    name: body.name,
    publisher: body.publisher
  });

  newGame.save()
    .then((savedGame) => {
      res.json(savedGame)
    })
});

app.put(`${gamesEndpoint}/:id`, (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Invalid Id"
    })
  }

  if (!body.name || !body.publisher) {
    return res.status(400).json({
      error: "Provide name and publisher",
    });
  }

  Game.findByIdAndUpdate(id, { ...body }, { returnDocument: 'after' })
    .then((updatedGame) => {
      res.json(updatedGame)
    })
});

app.delete(`${gamesEndpoint}/:id`, (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Invalid Id"
    })
  }

  Game.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
