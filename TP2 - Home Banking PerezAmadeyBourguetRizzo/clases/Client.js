let clientsId = 1;

class Client {
    constructor(dni, password, name, lastName) {
        this.id = clientsId;
        clientsId++;
        this.dni = dni;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.creditCards = [];
        this.savingsBanks = [];
        // Otra opción es crear la primer caja de ahorro acá directamente...
        // this.savingsBanks = [new SavingsBanks("ARS", 50000, "FIRMA.TIPO.ALIAS")];
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

        const COTIZACION_DOLAR = 1100; // Ejemplo: 1 USD = 1100 ARS

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
