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




//------------------------------------------------




// CLIENTE 0 - FRAN
// Caja ARS - Tarjeta VISA
clients[0].savingsBanks[0].debitCards[0].consumptions.push(new Movement("McDonalds", 3000));
clients[0].savingsBanks[0].debitCards[0].consumptions.push(new Movement("Easy", 7000));

// Caja USD - Tarjeta MASTERCARD
clients[0].savingsBanks[1].debitCards[0].consumptions.push(new Movement("Steam", 50, 2));
clients[0].savingsBanks[1].debitCards[0].consumptions.push(new Movement("Epic Games", 100));

// Caja USD - Tarjeta BBVA
clients[0].savingsBanks[1].debitCards[1].consumptions.push(new Movement("AliExpress", 75));
clients[0].savingsBanks[1].debitCards[1].consumptions.push(new Movement("eBay", 120, 3));


// CLIENTE 1 - BETO
// Caja ARS - Tarjeta VISA
clients[1].savingsBanks[0].debitCards[0].consumptions.push(new Movement("Grido", 2500));
clients[1].savingsBanks[0].debitCards[0].consumptions.push(new Movement("Open 25", 1200));

// Caja USD - Tarjeta MASTERCARD
clients[1].savingsBanks[1].debitCards[0].consumptions.push(new Movement("Netflix", 150));
clients[1].savingsBanks[1].debitCards[0].consumptions.push(new Movement("HBO Max", 200));

// Caja USD - Tarjeta BBVA
clients[1].savingsBanks[1].debitCards[1].consumptions.push(new Movement("Amazon", 90));
clients[1].savingsBanks[1].debitCards[1].consumptions.push(new Movement("Spotify", 10));


// CLIENTE 2 - TOTO
// Caja ARS - Tarjeta VISA
clients[2].savingsBanks[0].debitCards[0].consumptions.push(new Movement("Subway", 4000));
clients[2].savingsBanks[0].debitCards[0].consumptions.push(new Movement("Farmacity", 2300));

// Caja USD - Tarjeta MASTERCARD
clients[2].savingsBanks[1].debitCards[0].consumptions.push(new Movement("Google Play", 100, 1));
clients[2].savingsBanks[1].debitCards[0].consumptions.push(new Movement("Apple Store", 60));

// Caja USD - Tarjeta BBVA
clients[2].savingsBanks[1].debitCards[1].consumptions.push(new Movement("Nike", 180));
clients[2].savingsBanks[1].debitCards[1].consumptions.push(new Movement("BestBuy", 220, 4));


// CLIENTE 3 - LAUTI
// Caja ARS - Tarjeta VISA
clients[3].savingsBanks[0].debitCards[0].consumptions.push(new Movement("PedidosYa", 3500));
clients[3].savingsBanks[0].debitCards[0].consumptions.push(new Movement("Dia%", 1900));

// Caja USD - Tarjeta MASTERCARD
clients[3].savingsBanks[1].debitCards[0].consumptions.push(new Movement("YouTube Premium", 120));
clients[3].savingsBanks[1].debitCards[0].consumptions.push(new Movement("Disney+", 110));

// Caja USD - Tarjeta BBVA
clients[3].savingsBanks[1].debitCards[1].consumptions.push(new Movement("Steam", 60, 1));
clients[3].savingsBanks[1].debitCards[1].consumptions.push(new Movement("Battle.net", 45));

