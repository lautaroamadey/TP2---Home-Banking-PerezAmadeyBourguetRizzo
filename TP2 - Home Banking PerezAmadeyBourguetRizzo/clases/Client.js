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
        // this.savingsBanks = [new SavingsBank("ARS", "AliasDefault", 50000)];
    }

    // 20) Método para realizar compra/venta de dólares entre cajas de ahorro
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

        // Variables para controlar el éxito de extracción e ingreso
        let exitoExtraccion = false;
        let exitoIngreso = false;

        // Venta de dólares (extraer USD, ingresar ARS)
        if (cajaOrigen.currency === "USD" && cajaDestino.currency === "ARS") {
            exitoExtraccion = cajaOrigen.extraer(monto);
            if (exitoExtraccion) {
                const equivalente = monto * COTIZACION_DOLAR;
                exitoIngreso = cajaDestino.ingresar(equivalente);
            }
        }
        // Compra de dólares (extraer ARS, ingresar USD)
        else if (cajaOrigen.currency === "ARS" && cajaDestino.currency === "USD") {
            exitoExtraccion = cajaOrigen.extraer(monto);
            if (exitoExtraccion) {
                const equivalente = monto / COTIZACION_DOLAR;
                exitoIngreso = cajaDestino.ingresar(equivalente);
            }
        }
        // Si las monedas son iguales o no reconocidas, operación inválida
        else {
            return false;
        }

        // Devuelve true si ambos procesos (extracción e ingreso) fueron exitosos
        return exitoExtraccion && exitoIngreso;
    }
}



 const clients = [];
 clients.push(new Client (48588205, "aa", "Francisco", "Perez Stefan"))
 clients.push(new Client (48680134, "bb", "Bautista", "Rizzo"))
 clients.push(new Client (48316998, "cc", "Tomas", "Bourguet"))
 clients.push(new Client (47477890, "dd", "Lautaro", "Amadey"))





