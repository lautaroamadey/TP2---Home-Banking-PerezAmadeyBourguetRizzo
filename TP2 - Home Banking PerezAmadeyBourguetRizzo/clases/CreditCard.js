let creditCardIds = 1;

class CreditCard {
    constructor(provider, emitionDate, securityCode, displayedName, closeDate, expiresBalanceDate) {
        this.id = creditCardIds;
        creditCardIds++;

        this.number = cardNumbers;
        cardNumbers++;

        // VISA, American Express, CABAL, MasterCard...
        this.provider = provider;

        //Esto para que podamos poner distintas fechas de vencimiento.
        this.expireDate = emitionDate;
        this.expireDate.setFullYear(this.expireDate.getFullYear() + 5);

        this.securityCode = securityCode;
        // Ej: NICOLAS AGUST FACON o NICOLAS A FACON
        this.displayedName = displayedName;

        this.consumptions = [];

        this.balance = 0;
        //Esto no es la realidad, es por simplificar
        //Si el cliente usa el pago mínimo o paga menos del total
        //Vamos a modificar este valor
        //Si solo pagaron totales = balance * interes (1) = balance
        //Si hicieron algún pago menor = balance * interes (1,algo)
        this.interest = 1;

        //Lo vamos a usar solo a título informativo

        //Cuando cierra tu "mes", hasta los gastos de qué día tenes que pagar este mes
        this.closeDate = closeDate;
        //Cuando tenes que pagar.
        this.expiresBalanceDate = expiresBalanceDate;
    }

    registrarMovimiento(thirdPartyName, amount, date, cuotes = 1) {
        if (!thirdPartyName || typeof amount !== "number" || !(date instanceof Date)) return false;
        if (this.expireDate < new Date()) return false;

        const movimiento = new Movement(thirdPartyName, amount, cuotes);
        movimiento.date = date;
        this.consumptions.push(movimiento);
        this.balance += amount;
        return true;
    }

    registrarPago(monto) {
        if (typeof monto !== "number" || monto <= 0) return -1;

        let pagoMinimo = this.balance * 0.10;

        if (monto < pagoMinimo) {
            return -1; // Pago menor al mínimo
        }

        this.balance -= monto;

        if (this.balance <= 0) {
            this.balance = 0;
            return 1; // Pago total o superior
        }

        return 0; // Pago parcial pero válido
    }
}



clients[0].creditCards.push(new CreditCard("VISA",new Date("05/19/2025"), 111, "FRANCISCO PEREZ", 28, 5))
clients[0].creditCards.push(new CreditCard("MASTERCARD", new Date("07/19/2025"), 222, "FRANCISCO PEREZ", 28, 5));

clients[1].creditCards.push(new CreditCard("VISA",new Date("06/19/2025"), 333, "BAUTISTA RIZZO", 28, 5))
clients[1].creditCards.push(new CreditCard("MASTERCARD", new Date("08/19/2025"), 444, "BAUTISTA RIZZO", 28, 5));

clients[2].creditCards.push(new CreditCard("MASTERCARD", new Date("04/19/2025"), 444,"TOMAS BOURGUET", 28, 5))
clients[2].creditCards.push(new CreditCard("VISA", new Date("09/19/2025"), 555, "TOMAS BOURGUET", 28, 5));


clients[3].creditCards.push(new CreditCard("VISA", new Date("03/19/2025"), 777,"LAUTARO AMADEY", 28, 5))
clients[3].creditCards.push(new CreditCard("MASTERCARD", new Date("10/19/2025"), 888, "LAUTARO AMADEY", 28, 5));


/*ejemplos de uso
let tarjeta = clients[0].creditCards[0]; // VISA Francisco Pérez
tarjeta.balance = 100000;

console.log(tarjeta.registrarPago(9000));  // -1 → menor al 10%
console.log(tarjeta.registrarPago(10000)); // 0 → justo el mínimo
console.log(tarjeta.registrarPago(90000)); // 0 → aún queda saldo
console.log(tarjeta.registrarPago(100000)); // 1 → pago total
*/


