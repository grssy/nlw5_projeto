import { Router } from "express";
import { MessagesController } from "./controller/MessagesController";
import { SettingsController } from "./controller/SettingsController";
import { UsersController } from "./controller/UsersController";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUsername);
routes.put("/settings/:username", settingsController.update);


routes.post("/users", usersController.create);

routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);

routes.delete("/messages/:id", messagesController.delete);

export { routes };


/**
 * Tipos de parâmetros
 * Routers Params => Parâmetros de rota
 * http://localhost:3333/settings/1
 * Query Params => Filtros e Buscas
 * http://localhost:3333/settings/1?search=algumacoisa
 * Body Params => Objetos dentro das requisições
 * {
 *
 * }
 */
