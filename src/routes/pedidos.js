const express = require('express');
const router = express.Router();
const pool = require('../database');

// RENDERIZACION DE TABLAS/TABLEDATA
router.get('/listadepedidos', async (req, res) => {
  // SELECT productos.nombre, usuarios.nombre, productos.valor FROM usuarios, productos
  const productos = await pool.query('SELECT id, nombre FROM productos');
  const usuarios = await pool.query('SELECT id, nombre FROM usuarios');

  const pedidos = await pool.query('SELECT pedidos.id, productos.nombre nombreproducto, usuarios.nombre nombreusuario, pedidos.cantidad, productos.valor FROM usuarios, productos, pedidos WHERE pedidos.usuario_id = usuarios.id AND pedidos.product_id = productos.id');
  // console.log('Pedidos: ', pedidos);
  res.render('links/pedidos', { tituloTable: 'PEDIDOS', productos, usuarios, pedidos }); 
});

router.post('/listadepedidos', async (req, res) => {
  // console.log('Cuerpo del add pedido: ', req.body);
  const { productoPedido, usuarioPedido, cantidadPedido } = req.body;
  const newPedido = {
    product_id: productoPedido,
    usuario_id: usuarioPedido,
    cantidad: cantidadPedido
  };

  await pool.query('INSERT INTO pedidos SET ?', [newPedido]);
  res.redirect('/pedidos/listadepedidos');
});

router.post('editar-pedido/:id_product', async (req, res) => {
  console.log('Cuerpo: ', req.body);
  
  res.redirect('/pedidos/listadepedidos');
});

module.exports = router;