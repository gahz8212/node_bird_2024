const { Server } = require("socket.io");
function onlyForHandshake(middleware) {
  return (req, res, next) => {
    const isHandshake = req._query.sid === undefined;
    if (isHandshake) {
      middleware(req, res, next);
    } else {
      next();
    }
  };
}
module.exports = (app, server, sessionMiddleware, passport) => {
  const io = new Server(server);
  app.set("io", io);

  io.engine.use(onlyForHandshake(sessionMiddleware));
  io.engine.use(onlyForHandshake(passport.session()));
  io.engine.use(
    onlyForHandshake((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.writeHead(401);
        res.end();
      }
    })
  );

  const room = io.of("/room");
  const chat = io.of("/chat");

  room.on("connection", (socket) => {
    console.log("room 네임스페이스에 연결됨.");
    socket.on("disconnect", () => {
      console.log("room 네임스페이스에서 해제 됨.");
    });
  });
  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스에 연결됨.");
    const req = socket.request;
    console.log(req.user.id);
    const {
      headers: { referer },
    } = req;
    const roomId = referer
      .split("/")
      [referer.split("/").length - 1].replace(/\?.+/, "");
    socket.join(roomId);

    socket.broadcast.emit("chat", {
      message: `${req.user.name}님이 입장 했습니다.`,
      user: "system",
    });
    socket.on("disconnect", () => {
      console.log("chat 네임스페이스에서 해제 됨.");
      // socket.leave(roomId);
      socket.broadcast.emit("chat", {
        message: `${req.user.name}님이 퇴장 했습니다.`,
        user: "system",
      });
    });
  });
};
