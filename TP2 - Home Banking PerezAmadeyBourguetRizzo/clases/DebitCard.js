let debitCardIds = 1;

let cardNumbers = 1000000000000000;

class DebitCard {
    constructor(provider, securityCode, displayedName) {
        this.id = debitCardIds;
        debitCardIds++;

        this.number = cardNumbers;
        cardNumbers++;

        // VISA, American Express, CABAL, MasterCard...
        this.provider = provider;

        let emitionDate = new Date();
        this.expireDate = emitionDate;
        this.expireDate.setFullYear(this.expireDate.getFullYear() + 5);

        this.securityCode = securityCode;
        // Ej: NICOLAS AGUST FACON o NICOLAS A FACON
        this.displayedName = displayedName;

        this.consumptions = [];
    }
}

clients[0].savingsBanks[0].debitCards.push(new DebitCard("VISA",111,"FRANCISCO PEREZ"))
clients[0].savingsBanks[1].debitCards.push(new DebitCard("MASTERCARD",111,"FRANCISCO PEREZ"))
clients[0].savingsBanks[1].debitCards.push(new DebitCard("BBVA",111,"FRANCISCO PEREZ"))

clients[1].savingsBanks[0].debitCards.push(new DebitCard("VISA",222,"BAUTISTA RIZZO"))
clients[1].savingsBanks[1].debitCards.push(new DebitCard("MASTERCARD",222,"BAUTISTA RIZZO"))
clients[1].savingsBanks[1].debitCards.push(new DebitCard("BBVA",222,"BAUTISTA RIZZO"))

clients[2].savingsBanks[0].debitCards.push(new DebitCard("VISA",444,"TOMAS BOURGUET"))
clients[2].savingsBanks[1].debitCards.push(new DebitCard("MASTERCARD",444,"TOMAS BOURGUET"))
clients[2].savingsBanks[1].debitCards.push(new DebitCard("BBVA",444,"TOMAS BOURGUET"))


clients[3].savingsBanks[0].debitCards.push(new DebitCard("VISA",777,"LAUTARO AMADEY"))
clients[3].savingsBanks[1].debitCards.push(new DebitCard("MASTERCARD",777,"LAUTARO AMADEY"))
clients[3].savingsBanks[1].debitCards.push(new DebitCard("BBVA",777,"LAUTARO AMADEY"))

