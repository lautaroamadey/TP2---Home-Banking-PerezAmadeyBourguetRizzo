let debitCardIds = 1;
let debitCards=[];
let cardNumbers = 1000000000000000;

class DebitCard {
    constructor(provider, emitionDate, securityCode, displayedName){
        this.debitCardIds = debitCardIds;
        debitCardIds++
        this.number = cardNumbers;
        cardNumbers++;
        this.provider = provider;
        this.expireDate = new Date(emitionDate);
        this.expireDate.setFullYear(this.expireDate.getFullYear() + 5);
        this.securityCode = securityCode;
        this.displayedName = displayedName;
        this.consumptions = [];   
    }
    registrarMovimiento(tercero, monto, fecha){
        
        if(this.expireDate>fecha){
            this.movements.push(fecha, tercero, monto)
            return true
        }else{
            return false
        }
        
    }
}

clients[0].savingsBanks[0].debitCards.push(new DebitCard("VISA", "03/12/2022", 111, "FRANCISCO PEREZ"));
clients[0].savingsBanks[1].debitCards.push(new DebitCard("MASTERCARD", "07/08/2023", 111, "FRANCISCO PEREZ"));
clients[0].savingsBanks[1].debitCards.push(new DebitCard("BBVA", "11/20/2021", 111, "FRANCISCO PEREZ"));

clients[1].savingsBanks[0].debitCards.push(new DebitCard("VISA", "01/15/2024", 222, "BAUTISTA RIZZO"));
clients[1].savingsBanks[1].debitCards.push(new DebitCard("MASTERCARD", "05/23/2022", 222, "BAUTISTA RIZZO"));
clients[1].savingsBanks[1].debitCards.push(new DebitCard("BBVA", "09/10/2023", 222, "BAUTISTA RIZZO"));

clients[2].savingsBanks[0].debitCards.push(new DebitCard("VISA", "02/28/2021", 444, "TOMAS BOURGUET"));
clients[2].savingsBanks[1].debitCards.push(new DebitCard("MASTERCARD", "06/17/2023", 444, "TOMAS BOURGUET"));
clients[2].savingsBanks[1].debitCards.push(new DebitCard("BBVA", "12/05/2022", 444, "TOMAS BOURGUET"));

clients[3].savingsBanks[0].debitCards.push(new DebitCard("VISA", "04/10/2024", 777, "LAUTARO AMADEY"));
clients[3].savingsBanks[1].debitCards.push(new DebitCard("MASTERCARD", "08/19/2021", 777, "LAUTARO AMADEY"));
clients[3].savingsBanks[1].debitCards.push(new DebitCard("BBVA", "10/30/2023", 777, "LAUTARO AMADEY"));


