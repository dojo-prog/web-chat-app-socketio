import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "production" ? "/" : "http://localhost:3000";

const socket = io(BASE_URL, {
  withCredentials: true,
  autoConnect: false,
});

export { socket };
