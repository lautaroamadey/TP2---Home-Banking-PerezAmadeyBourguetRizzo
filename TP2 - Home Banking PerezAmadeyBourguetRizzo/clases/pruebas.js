let hoy = new Date();

// Registrar consumo con fecha real
clients[3].creditCards[0].registrarMovimiento("Garbarino", 25000, hoy, 3); // true

//------------------------------------------------------------------------

let tarjeta = clients[0].creditCards[0]; // VISA Francisco Pérez

// Balance inicial
tarjeta.balance = 100000;

console.log(tarjeta.registrarPago(9000));    // ❌ menor al 10% → -1
tarjeta.balance = 100000;                    // Reinicio balance para la siguiente prueba

console.log(tarjeta.registrarPago(10000));   // ✅ justo el 10% → 0
tarjeta.balance = 100000;

console.log(tarjeta.registrarPago(90000));   // ✅ aún queda saldo → 0
tarjeta.balance = 100000;

console.log(tarjeta.registrarPago(100000));  // ✅ pago total → 1
tarjeta.balance = 100000;

console.log(tarjeta.registrarPago(150000));  // ❌ más que el saldo actual → -2


// Tarjeta de débito
clients[1].savingsBanks[0].debitCards[0].registrarMovimiento("McDonald's", -1200, hoy
); // true


//--------------------------------------------------------------------------------

//======================
// 🔹 CONVERSIÓN DE MONEDA ENTRE CAJAS (Venta y Compra)
//======================
// Ejemplo de prueba con Francisco (clients[0])
let fran = clients[0];
let cajaARS = fran.savingsBanks[0].id;
let cajaUSD = fran.savingsBanks[1].id;

fran.savingsBanks[0].balance = 110000; // ARS
fran.savingsBanks[1].balance = 100;    // USD

console.log(fran.convertirMoneda(100, cajaUSD, cajaARS));      // Venta 100 USD → ARS, espera true
console.log(fran.convertirMoneda(110000, cajaARS, cajaUSD));   // Compra 110000 ARS → USD, espera true

//======================
// 🔹 EXTRACCIONES DE CAJA EN PESOS (con y sin descubierto)
//======================
let cajaFranPesos = fran.savingsBanks[0];
let cajaFranDolares = fran.savingsBanks[1];

cajaFranPesos.balance = 500;     // Se carga saldo inicial
cajaFranPesos.limit = 1000;      // Límite de descubierto
cajaFranPesos.overdraft = 0;     // Sin descubierto usado

console.log(cajaFranPesos.extraer(400));  // ✅ true → saldo suficiente
console.log(cajaFranPesos.extraer(700));  // ✅ true → usa $600 de descubierto
console.log(cajaFranPesos.overdraft);     // 🔸 600 → usado del descubierto
console.log(cajaFranPesos.extraer(1000)); // ❌ false → no alcanza descubierto restante

//======================
// 🔹 EXTRACCIONES DE CAJA EN DÓLARES (sin descubierto)
//======================
cajaFranDolares.balance = 100;

console.log(cajaFranDolares.extraer(90));  // ✅ true → saldo suficiente
console.log(cajaFranDolares.extraer(20));  // ❌ false → saldo insuficiente

//======================
// 🔹 INGRESO DE DINERO EN PESOS (con descubierto activo)
//======================
let caja = fran.savingsBanks[0]; // ARS

caja.balance = 0;
caja.limit = 1000;
caja.overdraft = 600; // Tiene $600 de descubierto activo

console.log(caja.ingresar(300)); // 🔸 Salda parcialmente → overdraft = 300, balance = 0
console.log(caja.ingresar(500)); // 🔸 Salda restante → overdraft = 0, balance = 200

//======================
// 🔹 INGRESO DE DINERO EN USD
//======================
let cajaUSDD = fran.savingsBanks[1];

cajaUSDD.balance = 100;

console.log(cajaUSDD.ingresar(50));  // 🔸 balance = 150

//======================
// 🔹 REGISTRO DE MOVIMIENTOS EN CAJAS DE AHORRO
//======================
caja.registrarMovimiento("Transferencia", 30000, hoy); // ARS
cajaUSDD.registrarMovimiento("Venta", 150, hoy);        // USD


//--------------------------------------------------------------






