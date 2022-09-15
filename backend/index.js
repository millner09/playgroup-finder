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

app.get(gamesEndpoint, (req, res, next) => {
  Game.find({})
    .then((games) => {
      res.json(games);
    })
    .catch(error => next(error))
});

app.get(`${gamesEndpoint}/:id`, (req, res, next) => {
  Game.findById(req.params.id)
    .then((game) => {
      if (game) {
        res.json(game);
      }

      res.status(404).end();
    })
    .catch(error => next(error))
});

app.post(gamesEndpoint, (req, res, next) => {
  const body = req.body;

  const newGame = new Game({
    name: body.name,
    publisher: body.publisher
  });

  newGame.save()
    .then((savedGame) => {
      res.json(savedGame)
    })
    .catch(error => next(error))
});

app.put(`${gamesEndpoint}/:id`, (req, res, next) => {
  const id = req.params.id;
  const { name, publisher } = req.body

  Game.findByIdAndUpdate(id, { name, publisher }, {
    new: true,
    runValidators: true, context: "query"
  })
    .then((updatedGame) => {
      res.json(updatedGame)
    })
    .catch(error => next(error))
});

app.delete(`${gamesEndpoint}/:id`, (req, res, next) => {
  const id = req.params.id;

  Game.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch(error => next(error))
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') { return res.status(400).json({ error: error.message }) }

  next(error)
}
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
