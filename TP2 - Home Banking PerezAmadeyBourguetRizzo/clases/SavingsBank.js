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
        if(currency == "ARS") {
            this.limit = limit;
            this.overdraft = 0;
        }
        this.debitCards = [];
        this.movements = [];
        this.alias = alias;
        //Lo tratamos como ID para que no se repitan.
        this.cbu = cbuCounter;
        cbuCounter++;
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
