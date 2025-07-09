let clientsId = 1;
const COTIZACION_DOLAR = 1100; // Ejemplo: 1 USD = 1100 ARS

class Client {
    constructor(nombre, email, password) {
        this.id = clientId;
        clientId++;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.savingsBanks = [];
        this.creditCards = [];
    }

    // Método de compra/venta de dólares
    convertirMoneda(monto, idCajaOrigen, idCajaDestino) {
        let cajaOrigen = null;
        let cajaDestino = null;

        // Buscar ambas cajas de ahorro por ID entre las del cliente
        for (let i = 0; i < this.savingsBanks.length; i++) {
            if (this.savingsBanks[i].id === idCajaOrigen) {
                cajaOrigen = this.savingsBanks[i];
            }
            if (this.savingsBanks[i].id === idCajaDestino) {
                cajaDestino = this.savingsBanks[i];
            }
        }

        // Validación básica
        if (!cajaOrigen || !cajaDestino || monto <= 0) {
            return false;
        }

        // Determinar operación: venta o compra
        let exitoExtraccion = false;
        let exitoIngreso = false;

        if (cajaOrigen.currency === "USD" && cajaDestino.currency === "ARS") {
            // Venta de dólares
            exitoExtraccion = cajaOrigen.extraer(monto);
            if (exitoExtraccion) {
                let equivalente = monto * COTIZACION_DOLAR;
                exitoIngreso = cajaDestino.ingresar(equivalente);
            }
        } else if (cajaOrigen.currency === "ARS" && cajaDestino.currency === "USD") {
            // Compra de dólares
            let equivalente = monto / COTIZACION_DOLAR;
            exitoExtraccion = cajaOrigen.extraer(monto);
            if (exitoExtraccion) {
                exitoIngreso = cajaDestino.ingresar(equivalente);
            }
        } else {
            // Las cajas deben ser de monedas diferentes
            return false;
        }

        return exitoExtraccion && exitoIngreso;
    }
}



 const clients = [];
 clients.push(new Client (48588205, "aa", "Francisco", "Perez Stefan"))
 clients.push(new Client (48680134, "bb", "Bautista", "Rizzo"))
 clients.push(new Client (48316998, "cc", "Tomas", "Bourguet"))
 clients.push(new Client (47477890, "dd", "Lautaro", "Amadey"))


/*ejemplos de uso
// Supongamos que clients[0] es Fran
let fran = clients[0];

let cajaARS = fran.savingsBanks[0].id;
let cajaUSD = fran.savingsBanks[1].id;

// Venta de 100 USD → pasa a ARS
console.log(fran.convertirMoneda(100, cajaUSD, cajaARS)); // true

// Compra de 110000 ARS → pasa a USD
console.log(fran.convertirMoneda(110000, cajaARS, cajaUSD)); // true
*/