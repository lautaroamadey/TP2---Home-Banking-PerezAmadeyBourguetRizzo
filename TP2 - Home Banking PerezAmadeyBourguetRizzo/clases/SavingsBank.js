let savingsBanksId = 1;
//Es un número único de 22 dígitos que identifica la cuenta
let cbuCounter = 1000000000000000000000;

class SavingsBank{
    //Ponemos el límite como último parámetro para no tener que ingresarlo si está en USD.
    //Pero si le pasamos 0 no hay problema.
constructor(currency, alias, limit) {
        this.id = savingsBanksId;
        savingsBanksId++;
        this.currency = currency;
        this.balance = 0;

        if (currency == "ARS") {
            this.limit = limit;       // Límite del descubierto
            this.overdraft = 0;      // Monto del descubierto ya utilizado
        }

        this.debitCards = [];
        this.movements = [];
        this.alias = alias;
        this.cbu = cbuCounter;
        cbuCounter++;
    }

    extract(monto) {
        // 🟦 Si es una caja en USD
        if (this.currency === "USD") {
            if (this.balance >= monto) {
                this.balance -= monto;
                return true;
            } else {
                return false;
            }
        }

        // 🟥 Si es una caja en ARS
        if (this.currency === "ARS") {
            // i. Hay saldo suficiente
            if (this.balance >= monto) {
                this.balance -= monto;
                return true;
            }
            // ii. Saldo + descubierto disponible
            let descubiertoDisponible = this.limit - this.overdraft;
            if (this.balance + descubiertoDisponible >= monto) {
                let faltante = monto - this.balance;
                this.balance = 0;
                this.overdraft += faltante;
                return true;
            }

            return false;
        }

        return false; // Por si llega a haber una moneda no reconocida
    }
    ingresar(monto) {
    // Validación: no se puede ingresar un monto negativo o cero
    if (monto <= 0) {
        return -1;
    }

    // Caja en ARS: puede tener descubierto
    if (this.currency === "ARS") {
        if (this.overdraft > 0) {
            // Se paga el descubierto primero
            if (monto >= this.overdraft) {
                monto -= this.overdraft;
                this.overdraft = 0;
            } else {
                this.overdraft -= monto;
                monto = 0;
            }
        }
        // Lo que sobre va al balance
        this.balance += monto;
        return this.balance;
    }

    // Caja en USD: simplemente se suma al balance
    if (this.currency === "USD") {
        this.balance += monto;
        return this.balance;
    }

    // Si la moneda no es reconocida
    return -1;
    }

    
    registrarMovimiento(thirdPartyName, amount, date) {
        if (!thirdPartyName || typeof amount !== "number" || !(date instanceof Date)) {
            return false;
        }

        const movimiento = new Movement(thirdPartyName, amount);
        movimiento.date = date;
        this.movements.push(movimiento);
        this.balance += amount;
        return true;
    }
}





clients[0].savingsBanks.push(new SavingsBank("ARS","fran", 100000));
clients[0].savingsBanks.push(new SavingsBank("USD","fran.usd"));

clients[1].savingsBanks.push(new SavingsBank("ARS","beto", 100000));
clients[1].savingsBanks.push(new SavingsBank("USD","beto.usd"));

clients[2].savingsBanks.push(new SavingsBank("ARS","toto", 100000));
clients[2].savingsBanks.push(new SavingsBank("USD","toto.usd"));

clients[3].savingsBanks.push(new SavingsBank("ARS","lauti", 100000));
clients[3].savingsBanks.push(new SavingsBank("USD","lauti.usd"));


/*ejemplos de uso
let cajaFranPesos = clients[0].savingsBanks[0]; // ARS
let cajaFranDolares = clients[0].savingsBanks[1]; // USD

cajaFranPesos.balance = 500;
cajaFranPesos.limit = 1000;
cajaFranPesos.overdraft = 0;

console.log(cajaFranPesos.extraer(400)); // ✅ true (hay saldo suficiente)
console.log(cajaFranPesos.extraer(700)); // ✅ true (usa descubierto)
console.log(cajaFranPesos.overdraft);    // Debería haber usado 600 de descubierto
console.log(cajaFranPesos.extraer(1000)); // ❌ false (no hay suficiente descubierto)

cajaFranDolares.balance = 100;
console.log(cajaFranDolares.extraer(90)); // ✅ true
console.log(cajaFranDolares.extraer(20)); // ❌ false
*/