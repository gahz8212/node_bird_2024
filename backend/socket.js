const { Server } = require("socket.io");
// const users = [];
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
  const io = new Server(server, {
    path: "/my-custom-path/",
  });
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
    // room.users = [];
    const req = socket.request;
    console.log(`${req.user.name}이 room 네임스페이스에 연결됨.`);
    console.log(room.users);
    socket.emit("userList", room.users);
    // const set = new Set(room.adapter.rooms.values());
    // for (let i of set) {
    //   console.log(Array.from(i)[0]);
    // }
    // console.log(room.users);
    // room.users = users;
    // if (!room.users.includes(req.user.name)) {
    //   room.users.push(req.user.name);
    // }
    // socket.emit("userList", room.users);
    socket.on("disconnect", () => {
      console.log("room 네임스페이스에서 해제 됨.");
      // socket.leave();
      // console.log(room.users);
      // socket.emit("userList", room.users);
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
      chat: `${req.user.name}님이 입장 했습니다.`,
      name: "system",
    });
    socket.on("disconnect", () => {
      console.log("chat 네임스페이스에서 해제 됨.");
      socket.leave(roomId);
      socket.broadcast.emit("chat", {
        chat: `${req.user.name}님이 퇴장 했습니다.`,
        name: "system",
      });
    });
  });
};
