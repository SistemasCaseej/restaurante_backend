const createDefaultAdmin = async () => {
    const Usuario = require('../models/user_model');
    const bcrypt = require('bcrypt');
  
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminSenha = process.env.ADMIN_SENHA;
    const adminNome = process.env.ADMIN_NOME || 'Administrador';
  
    if (!adminEmail || !adminSenha) {
      console.warn("Informações do administrador padrão não configuradas no .env.");
      return;
    }
  
    try {
      const existingAdmin = await Usuario.findOne({ email: adminEmail, isAdmin: true });
  
      if (!existingAdmin) {
        const hash = await bcrypt.hash(adminSenha, 10);
        const adminUser = new Usuario({
          nome: adminNome,
          email: adminEmail,
          senha: hash,
          isAdmin: true,
        });
  
        await adminUser.save();
        console.log("Conta de administrador padrão criada com sucesso.");
      } else {
        console.log("Conta de administrador padrão já existe.");
      }
    } catch (error) {
      console.error("Erro ao criar conta de administrador padrão:", error);
    }
  };

  module.exports = {createDefaultAdmin};