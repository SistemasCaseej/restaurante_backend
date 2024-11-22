const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Usuario = require('../models/user_model');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'senha' }, async (email, senha, done) => {
      try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
          return done(null, false, { message: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(senha, usuario.senha);
        if (!isMatch) {
          return done(null, false, { message: 'Senha incorreta' });
        }

        return done(null, usuario);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const usuario = await Usuario.findById(id);
      done(null, usuario);
    } catch (err) {
      done(err);
    }
  });
};
