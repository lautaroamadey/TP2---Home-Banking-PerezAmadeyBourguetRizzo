let movementsId = 1;

class Movement{
    constructor(thirdPartyName, amount, cuotes) {
        this.id = movementsId;
        movementsId++;

        this.date = new Date();
        this.thirdPartyName = thirdPartyName;
        this.amount = amount;
        if(cuotes >= 1)
            this.cuotes = cuotes;
    }
}

//Caso gasto de débito
new Movement("COTO", 1000);
//Caso gasto de crédito
new Movement("CompraGamer", 200000, 3);

// Movimientos para "fran" (cliente 0)
// Caja ARS
clients[0].savingsBanks[0].movements.push(new Movement("COTO", 12000));
clients[0].savingsBanks[0].movements.push(new Movement("YPF", 8000));
// Caja USD
clients[0].savingsBanks[1].movements.push(new Movement("Amazon", 300, 2));

// Movimientos para "beto" (cliente 1)
// Caja ARS
clients[1].savingsBanks[0].movements.push(new Movement("Jumbo", 15000));
clients[1].savingsBanks[0].movements.push(new Movement("Shell", 9500));
clients[1].savingsBanks[0].movements.push(new Movement("Frávega", 60000, 6));
// Caja USD
clients[1].savingsBanks[1].movements.push(new Movement("eBay", 120, 3));
clients[1].savingsBanks[1].movements.push(new Movement("AliExpress", 75));

// Movimientos para "toto" (cliente 2)
// Caja ARS
clients[2].savingsBanks[0].movements.push(new Movement("Carrefour", 5000));
clients[2].savingsBanks[0].movements.push(new Movement("Farmacity", 2500));
// Caja USD
clients[2].savingsBanks[1].movements.push(new Movement("Nike", 180));
clients[2].savingsBanks[1].movements.push(new Movement("BestBuy", 220, 4));

// Movimientos para "lauti" (cliente 3)
// Caja ARS
clients[3].savingsBanks[0].movements.push(new Movement("Disco", 3000));
clients[3].savingsBanks[0].movements.push(new Movement("Garbarino", 20000, 3));
// Caja USD
clients[3].savingsBanks[1].movements.push(new Movement("Steam", 60, 1));
clients[3].savingsBanks[1].movements.push(new Movement("Spotify", 10));
