let savingsBanksId = 1;
// Es un número único de 22 dígitos que identifica la cuenta
let cbuCounter = 1000000000000000000000;

class SavingsBank {
    constructor(currency, alias, limit) {
        this.id = savingsBanksId;
        savingsBanksId++;
        this.currency = currency;
        this.balance = 0;

        if (currency === "ARS") {
            this.limit = limit;
            this.overdraft = 0;
        }

        this.debitCards = [];
        this.movements = [];
        this.alias = alias;
        this.cbu = cbuCounter;
        cbuCounter++;
    }

    //18 Método para extraer dinero
    extraer(monto) {
        if (monto <= 0) return false;

        if (this.currency === "USD") {
            // Solo si hay saldo suficiente
            if (this.balance >= monto) {
                this.balance -= monto;
                return true;
            } else {
                return false;
            }
        }

        if (this.currency === "ARS") {
            // i. Hay saldo suficiente
            if (this.balance >= monto) {
                this.balance -= monto;
                return true;
            }

            // ii. Se puede usar descubierto
            let descubiertoDisponible = this.limit - this.overdraft;
            if (this.balance + descubiertoDisponible >= monto) {
                let faltante = monto - this.balance;
                this.balance = 0;
                this.overdraft += faltante;
                return true;
            }

            return false;
        }

        return false; // Moneda no válida
    }

    //19 Método para ingresar dinero
    ingresar(monto) {
        if (monto <= 0) return -1;

        if (this.currency === "ARS") {
            if (this.overdraft > 0) {
                // Primero salda el descubierto
                if (monto >= this.overdraft) {
                    monto -= this.overdraft;
                    this.overdraft = 0;
                } else {
                    this.overdraft -= monto;
                    monto = 0;
                }
            }
            this.balance += monto;
            return this.balance;
        }

        if (this.currency === "USD") {
            this.balance += monto;
            return this.balance;
        }

        return -1; // Moneda no válida
    }

    //21
    registrarMovimiento(tercero, monto, fecha) {
    this.movements.push({ fecha, tercero, monto });
    return true; // Siempre devolver true si se guarda el movimiento
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


