import axios from "axios";

const API_BASE = process.env.SPRING_API_BASE || "http://localhost:8080/api";

// Helper para inyectar Authorization en cascada
const client = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

const authHeaders = (incomingHeaders) => {
  const h = {};
  const incomingAuth = incomingHeaders?.authorization || incomingHeaders?.Authorization;
  if (incomingAuth) h["Authorization"] = incomingAuth;
  const apiKey = process.env.SPRING_API_KEY;
  if (apiKey) h["x-api-key"] = apiKey;
  return h;
};

export const register = async (payload) => {
  // Ajusta la ruta según tu Spring Boot
  const { data } = await client.post("/auth/register", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await client.post("/auth/login", payload);
  return data;
};

export const list = async (incomingHeaders) => {
  const { data } = await client.get("/arbitros", { headers: authHeaders(incomingHeaders) });
  return data;
};

export const detail = async (id, incomingHeaders) => {
  const { data } = await client.get(`/arbitros/${id}`, { headers: authHeaders(incomingHeaders) });
  return data;
};

export const partidos = async (id, incomingHeaders) => {
  const { data } = await client.get(`/arbitros/${id}/partidos`, { headers: authHeaders(incomingHeaders) });
  return data;
};

export const asignaciones = async (id, incomingHeaders) => {
  const { data } = await client.get(`/arbitros/${id}/asignaciones`, { headers: authHeaders(incomingHeaders) });
  return data;
};

export const liquidaciones = async (id, incomingHeaders) => {
  const { data } = await client.get(`/arbitros/${id}/liquidaciones`, { headers: authHeaders(incomingHeaders) });
  return data;
};

// Simples URLs públicas desde ENV, en un caso real vendrían de BD/Spring
export const listImages = async () => {
  const raw = process.env.S3_PUBLIC_IMAGES || "";
  const urls = raw.split(",").map(s => s.trim()).filter(Boolean);
  return { count: urls.length, urls };
};