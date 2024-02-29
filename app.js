var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const moveGenServer = require("./gRPCClient");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const crypto = require("crypto");
var app = express();

class GameState {
  constructor(fen) {
    this.fen = fen;
  }
}

function withGameState(req, res, onGameState) {
  if (req.app.locals["ongoingGames"] === undefined)
    req.app.locals["ongoingGames"] = [];
  let games = req.app.locals["ongoingGames"];

  let gameState = undefined;
  let gameSessionCookie = req.cookies["gameSession"];
  console.log("games", games);

  if (gameSessionCookie && gameSessionCookie in games) {
    gameState = games[gameSessionCookie];
  } else {
    let gameSessionCookie = crypto.randomUUID();
    let cookieOptions = { httpOnly: true, maxAge: 1000 * 60 * 60 * 3 };
    gameState = new GameState(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
    games[gameSessionCookie] = gameState;
    res.cookie("gameSession", gameSessionCookie, cookieOptions);
  }
  let onSend = onGameState(gameState);
  console.log("req.app.locals", req.app.locals);
  req.app.locals["ongoingGames"][gameSessionCookie] = gameState;
  onSend();
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.post("/possible/:id", (req, res) => {
  const { fenString } = req.body;
  moveGenServer.GetPossibleMoves(
    { from: req.params.id, current_board: { fen: fenString } },
    (err, response) => {
      res.json({ response });
    }
  );
});
app.post("/move/:id", (req, res) => {
  const move = req.body;

  withGameState(req, res, (gameState) => {
    console.log("gameState", gameState);

    return () => {
      moveGenServer.Play(
        { current_board: { fen: move.board_after_move.fen } },
        (err, response) => {
          gameState.fen = response.move_made.board_after_move.fen;
          res.json({ response });
        }
      );
    };
  });
});
app.get("/validate", function (req, res, next) {
  // let from = req.query.from;
  // let to = req.query.to;
  // withGameState(req, res, (gameState) => {
  //   let validatedBoard = validation(gameState); // Call Validation here;
  //   if (validatedBoard) {
  //     return () => res.json({ valid: true, boardAfterMove: validatedBoard });
  //   } else {
  //     return () => res.json({ valid: false });
  //   }
  // });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
