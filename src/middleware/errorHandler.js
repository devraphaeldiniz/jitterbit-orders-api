module.exports = (err, req, res, next) => {
  console.error("í´¥ ERRO REAL:", err);

  res.status(500).json({
    message: "Erro interno do servidor",
    error: err.message,
    stack: err.stack
  });
};
