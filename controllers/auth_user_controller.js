const Usuario = require("../models/user_model");
const Item = require('../models/item_model');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.list_user = (req, res) => {
  res.status(200).json(req.user);
};
