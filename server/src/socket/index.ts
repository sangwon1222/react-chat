import { Server } from "socket.io";

const origin = "*";

export class ChatSocket {
  private mSocket: Server;

  constructor(http: any) {
    this.mSocket = new Server(http, {
      cors: { origin, credentials: false },
    });
  }

  connect() {
    this.mSocket.on("connect", async (socket) => {
      console.log("socket");
      const userInfo = async () => {
        const sockets = await this.mSocket.fetchSockets();
        return sockets.map(({ id }) => ({ socketId: id }));
      };

      socket.emit("welcome", {
        socketId: socket.id,
        users: userInfo(),
        clientsCount: (await userInfo()).length,
      });

      socket.on(
        "incoming-user-name",
        async ({ userName }: { userName: string }) => {
          socket.emit("incoming", {
            clientsCount: (await userInfo()).length,
            userName,
          });
          socket.broadcast.emit("incoming", {
            clientsCount: (await userInfo()).length,
            userName,
          });
        }
      );

      socket.on(
        "send-message",
        ({ id, message }: { id: string; message: string }) => {
          socket.emit("receive-message", { id, message });
          socket.broadcast.emit("receive-message", { id, message });
        }
      );

      socket.on("disconnect", async () => {
        socket.broadcast.emit("leave-user", {
          clientsCount: (await userInfo()).length,
        });
      });
    });

    this.mSocket.listen(3000);
  }
}
