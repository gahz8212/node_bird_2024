const { Server } = require("socket.io");
module.exports = (app, server, sessionMiddleware) => {
  const io = new Server(server);
  app.set("io", io);
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.response, next);
  });
  const room = io.of("/room");
  // const chat = io.of("/chat");
  room.on("connection", (socket) => {
    console.log("room 네임스페이스에 연결됨.");
    socket.on("disconnect", () => {
      console.log("room 네임스페이스에서 해제 됨.");
    });
  });
  // chat.on("connection", (socket) => {
  //   console.log("chat 네임스페이스에 연결됨.");
  //   const req = socket.request;
  // const {
  //   headers: { referer },
  // } = req;
  // const roomId = referer
  //   .split("/")
  //   [referer.split("/").length - 1].replace(/\?.+/, "");
  // socket.join(roomId);
  // console.log(roomId);
  // socket.on("chat", (data) => {
  //   console.log(data);
  // });
  // console.log("req", req);

  //   socket.on("disconnect", () => {
  //     console.log("room 네임스페이스에서 해제 됨.");
  //   });
  // });
};
