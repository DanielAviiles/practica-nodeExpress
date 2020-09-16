const express = require('express');
const router = express.Router();
const pool = require('../database');

// RENDERIZACION DE TABLAS/TABLEDATA
router.get('/listadoproductos', async (req, res) => {
  const productos = await pool.query('SELECT * FROM productos');
  res.render('links/productos', { tituloTable: 'PRODUCTOS', productos }); 
});

router.post('/listadoproductos', async (req, res) => {
  // console.log('Cuerpo del add: ', req.body);
  const { nombre, codigo, valor } = req.body;
  const newProduct = { nombre, codigo, valor };

  await pool.query('INSERT INTO productos SET ?', [newProduct]);
  res.redirect('/products/listadoproductos');
});

router.get('/delete-product/:product_id', async (req, res) => {
  const { product_id } = req.params;
  await pool.query('DELETE FROM productos WHERE productos.id=?', [product_id]);
  res.redirect(req.headers.referer);
});

router.post('/editar-producto/:product_id', async (req, res) => {
  const { product_id } = req.params;
  const { nombreProducto, codigoProducto, valorProducto } = req.body;
  const productUpdate = {
    nombre: nombreProducto,
    codigo: codigoProducto,
    valor: valorProducto
  };
  await pool.query('UPDATE productos SET ? WHERE productos.id=?', [productUpdate, product_id]);
  res.redirect('/products/listadoproductos');
});

module.exports = router;