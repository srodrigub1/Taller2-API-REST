export const errorHandler = (err, req, res, next) => {
  console.error("[ERROR]", err?.message || err);
  const status = err?.response?.status || err?.status || 500;
  const payload = err?.response?.data || { message: err?.message || "Error interno" };
  res.status(status).json(payload);
};