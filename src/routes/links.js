const express = require('express');
const router = express.Router();
const pool = require('../database');

// RENDERIZACION DE TABLAS/TABLEDATA
router.get('/usuarios', async (req, res) => {
  const user = await pool.query('SELECT * FROM usuarios');
  res.render('links/usuarios', { tituloTable: 'USUARIOS', user });
});

router.get('/docentes',  async (req, res) => {
  const user = await pool.query('SELECT usuarios.id, usuarios.nombre, usuarios.usuario, usuarios.paswd, usuarios.edad FROM usuarios WHERE usuarios.rol_id=1');
  res.render('links/docentes', {tituloTable:'DOCENTES',user});
});

router.get('/estudiantes', async (req, res) => {
  const user = await pool.query('SELECT usuarios.id, usuarios.nombre, usuarios.usuario, usuarios.paswd, usuarios.edad FROM usuarios WHERE usuarios.rol_id=2');
  res.render('links/estudiantes', {tituloTable:'ESTUDIANTES',user});
});

// Modificaciones de la DATA en la tableDATA
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const user = await pool.query('DELETE FROM usuarios WHERE id=?', [id]);
  res.redirect(req.headers.referer);
});

router.post('/editar-info/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { nombremodal, usuariomodal, paswdmodal, edadmodal } = req.body;
  const userUpdate = {
    usuario: usuariomodal,
    paswd: paswdmodal,
    nombre: nombremodal,
    edad: edadmodal
  };
  await pool.query('UPDATE usuarios SET ? WHERE usuarios.id=?', [userUpdate, user_id]);
  res.redirect('/links/usuarios');
});

module.exports = router;