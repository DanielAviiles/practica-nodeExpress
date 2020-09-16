const hbs = require('hbs');

hbs.registerHelper('valorTotalPedido', (valor, cantidad) => {
  let multiplicacion = valor * cantidad;
  return multiplicacion;
});

hbs.registerHelper('math', function (lvalue, operator, rvalue) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue,
  }[operator];
});
