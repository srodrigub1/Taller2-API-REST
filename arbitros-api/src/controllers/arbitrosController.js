import * as service from "../services/arbitrosService.js";

export const register = async (req, res, next) => {
  try {
    const result = await service.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await service.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const list = async (req, res, next) => {
  try {
    const result = await service.list(req.headers);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const detail = async (req, res, next) => {
  try {
    const result = await service.detail(req.params.id, req.headers);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const partidos = async (req, res, next) => {
  try {
    const result = await service.partidos(req.params.id, req.headers);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const asignaciones = async (req, res, next) => {
  try {
    const result = await service.asignaciones(req.params.id, req.headers);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const liquidaciones = async (req, res, next) => {
  try {
    const result = await service.liquidaciones(req.params.id, req.headers);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const listImages = async (req, res, next) => {
  try {
    const imgs = await service.listImages();
    res.json(imgs);
  } catch (err) {
    next(err);
  }
};