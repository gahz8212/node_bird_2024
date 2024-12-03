const { Server } = require("socket.io");
const userList = new Set();
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
  // const chat = io.of("/chat");
  room.on("connection", (socket) => {
    socket.join("chat");
    socket.on("login", (data) => {
      userList.add(data);
      console.log(userList);
      // const clientId = socket.id;
      // console.log(Array.from(userList.values()));
      // console.log("client:", app.get("client"));
      socket.to("chat").emit("login_response", Array.from(userList.values()));
    });
  });
};
//     const req = socket.request;
//     // console.log(`${req.user.name}이 room 네임스페이스에 연결됨.`);
//     // console.log("req.session:", req.session);
//     // socket.on("logout", (name) => {
//     //   const array = Array.from(userList.values());
//     //   const index = array.findIndex((value) => value === name);
//     //   const clientId = array[index];
//     //   // const keys = Object.keys(array);
//     //   // const values = Object.values(array);
//     //   // console.log("keys[index]", keys[index]);

//     //   userList.delete(clientId);
//     //   socket.broadcast.emit("logout_response", Array.from(userList));
//     //   // console.log(Object.fromEntries([...userList]));
//     // });
//     // socket.on("req_login", () => {
//     //   socket.broadcast.emit(
//     //     "login_response",
//     //     Object.values(Array.from(userList.values()))
//     //   );
//     // });
//     socket.on("disconnect", () => {
//       // console.log(`${req.user.name} 네임스페이스에서 해제 됨.`);
//       // socket.on("logout", (name) => {
//       //   const array = Array.from(userList.values());
//       //   const index = array.findIndex((value) => value === name);
//       //   const clientId = array[index];
//       //   // const keys = Object.keys(array);
//       //   // const values = Object.values(array);
//       //   // console.log("keys[index]", keys[index]);
//       //   // const clientId = socket.id;
//       //   //   // const obj = Object.fromEntries(userList);
//       //   //   // const keys = Object.keys(obj);
//       //   //   // const values = Object.values(obj);
//       //   //   // const index = values.findIndex((value) => value === name);
//       //   //   // console.log("keys[index]", keys[index]);
//       //   //   // const clientId = keys[index];
//       //   //   console.log(Object.fromEntries(userList));
//       //   userList.delete(clientId);
//       //   socket.broadcast.emit("logout_response", Array.from(userList.values()));
//       });
//       // socket.leave();
//       // console.log(room.users);
//       // socket.emit("userList", room.users);
//     // });
//   // });
//   // chat.on("connection", (socket) => {
//   //   console.log("chat 네임스페이스에 연결됨.");
//   //   const req = socket.request;
//   //   console.log(req.user.id);
//   //   const {
//   //     headers: { referer },
//   //   } = req;
//   //   const roomId = referer
//   //     .split("/")
//   //     [referer.split("/").length - 1].replace(/\?.+/, "");
//   //   socket.join(roomId);

//   //   socket.broadcast.emit("chat", {
//   //     chat: `${req.user.name}님이 입장 했습니다.`,
//   //     name: "system",
//   //   });
//   //   socket.on("disconnect", () => {
//   //     console.log("chat 네임스페이스에서 해제 됨.");
//   //     socket.leave(roomId);
//   //     socket.broadcast.emit("chat", {
//   //       chat: `${req.user.name}님이 퇴장 했습니다.`,
//   //       name: "system",
//   //     });
//   //   });
//   // });
// }
