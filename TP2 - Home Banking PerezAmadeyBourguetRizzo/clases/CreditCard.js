let creditCardIds = 1;

class CreditCard {
    constructor(provider, emitionDate, securityCode, displayedName, closeDate, expiresBalanceDate) {
        this.id = creditCardIds;
        creditCardIds++;

        this.number = cardNumbers;
        cardNumbers++;

        // VISA, American Express, CABAL, MasterCard...
        this.provider = provider;

        // Esto para que podamos poner distintas fechas de vencimiento.
        this.expireDate = new Date(emitionDate);
        this.expireDate.setFullYear(this.expireDate.getFullYear() + 5);

        this.securityCode = securityCode;

        // Ej: NICOLAS AGUST FACON o NICOLAS A FACON
        this.displayedName = displayedName;

        this.consumptions = [];

        this.balance = 10000;

        // Esto no es la realidad, es por simplificar
        // Si el cliente usa el pago mínimo o paga menos del total
        // Vamos a modificar este valor
        // Si solo pagaron totales = balance * interes (1) = balance
        // Si hicieron algún pago menor = balance * interes (1,algo)
        this.interest = 1;

        // Lo vamos a usar solo a título informativo

        // Cuando cierra tu "mes", hasta los gastos de qué día tenes que pagar este mes
        this.closeDate = closeDate;

        // Cuando tenes que pagar.
        this.expiresBalanceDate = expiresBalanceDate;
    }

    // 21) Registrar movimiento en la tarjeta de crédito
    registrarMovimiento(tercero, monto, fecha, cuotes) {
        if (this.expireDate > fecha) {
            this.balance += monto;  // Sumo el monto al balance (deuda)
            this.consumptions.push({ fecha, tercero, monto, cuotes }); // Guardo el movimiento como objeto
            return true;
        } else {
            return false;
        }
    }

    // 22) Registrar pago del saldo de la tarjeta
    registrarPago(monto) {
        console.log(`Balance actual antes de pago: ${this.balance}, monto a pagar: ${monto}`);

        const pagoMinimo = this.balance * 0.10;

        if (monto > this.balance) {
            console.log("❌ No se puede pagar más del saldo actual.");
            return -2; // Pago inválido (mayor al saldo)
        } else if (monto < pagoMinimo) {
            console.log("❌ Pago menor al mínimo requerido.");
            return -1; // Pago menor al mínimo
        } else if (monto === this.balance) {
            this.balance = 0;
            console.log("✅ Pago total realizado.");
            return 1; // Pago total exacto
        } else {
            this.balance -= monto;
            console.log("✅ Pago parcial realizado.");
            return 0; // Pago válido, pero aún queda saldo
        }
    }
}






clients[0].creditCards.push(new CreditCard("VISA",new Date("05/19/2025"), 333, "FRANCISCO PEREZ", 28, 5))
clients[0].creditCards.push(new CreditCard("MASTERCARD", new Date("07/19/2025"), 444, "FRANCISCO PEREZ", 28, 5));

clients[1].creditCards.push(new CreditCard("VISA",new Date("06/19/2025"), 333, "BAUTISTA RIZZO", 28, 5))
clients[1].creditCards.push(new CreditCard("MASTERCARD", new Date("08/19/2025"), 444, "BAUTISTA RIZZO", 28, 5));

clients[2].creditCards.push(new CreditCard("MASTERCARD", new Date("04/19/2025"), 444,"TOMAS BOURGUET", 28, 5))
clients[2].creditCards.push(new CreditCard("VISA", new Date("09/19/2025"), 555, "TOMAS BOURGUET", 28, 5));


clients[3].creditCards.push(new CreditCard("VISA", new Date("03/19/2025"), 777,"LAUTARO AMADEY", 28, 5))
clients[3].creditCards.push(new CreditCard("MASTERCARD", new Date("10/19/2025"), 888, "LAUTARO AMADEY", 28, 5));

