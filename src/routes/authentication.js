const express = require('express');
const router = express.Router();
const pool = require('../database');

// Vistas de Inicios de sesion y registro junto con DATA en la DB

router.get(['/', '/login'], async (req, res) => {
  res.render('links/ingresar');
});

router.get('/add', async (req, res) => {
  const roles = await pool.query('SELECT * FROM roles');
  res.render('links/add', {roles});
});

router.post(['/', '/login'], async (req, res) => {
  const { usuario, paswd } = req.body;
  // const login = await pool.query('SELECT * FROM usuarios where usuario=? AND paswd=?', [usuario, paswd]);
  const login = await pool.query('SELECT COUNT(*) cuenta FROM usuarios WHERE usuario=? AND paswd=?', [usuario, paswd]);
  let arrayLogin = Object.values(JSON.parse(JSON.stringify(login)));
  // console.log('Cuenta: ', arrayLogin[0].cuenta);

  if (arrayLogin[0].cuenta == 1)
    res.redirect('/home');
  else
    res.redirect('/login');
});

router.post('/add', async (req, res) => {
  // console.log('Cuerpo del add: ', req.body);
  const { usuario, paswd, rol_id, nombre, edad } = req.body;
  const newUser = { usuario, paswd, rol_id, nombre, edad };

  await pool.query('INSERT INTO usuarios SET ?', [newUser]);
  res.redirect('/login');
});

// reenderizar Roles


module.exports = router;