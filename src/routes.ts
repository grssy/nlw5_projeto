import { Router } from "express";
import { SettingsController } from "./controller/SettingsController";

const routes = Router();

const settingsController = new SettingsController();

routes.post("/settings", settingsController.create);

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
