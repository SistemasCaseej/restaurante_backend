function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Você precisa estar logado para acessar esta rota' });
}

function ensureAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ message: 'Acesso negado: apenas administradores podem acessar esta rota' });
}

module.exports = { ensureAuthenticated, ensureAdmin };
