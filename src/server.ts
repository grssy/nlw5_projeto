import { http } from "./http";
import "./websocket/client";

// Definindo a porta do nosso servidor
http.listen(3333, () => console.log("Server is running on port 3333"));
