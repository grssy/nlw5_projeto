import express from "express"; // express para executar os métodos http
import "./database"; // importando o index do database
import { routes } from "./routes";

const app = express();

/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Deletar
 * PATCH = Alterar uma informação específica
 */

app.use(express.json()); // Permite jSON como request 

app.use(routes);

// Definindo a porta do nosso servidor
app.listen(3333, () => console.log("Server is running on port 3333"));
