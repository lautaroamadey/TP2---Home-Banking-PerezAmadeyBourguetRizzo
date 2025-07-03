let clientsId = 1;

class Client{
    constructor(dni, password, name, lastName) {
        this.id = clientsId;
        clientsId++;
        this.dni = dni;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.creditCards = [];
        this.savingsBanks = [];
        //Otra opción es crear la primer caja de ahorro acá directamente...
        //this.savingsBanks = [new SavingsBanks("ARS", 50000, "FIRMA.TIPO.ALIAS")];
    }
}


 const clients = [];
 clients.push(new Client (48588205, "aa", "Francisco", "Perez Stefan"))
 clients.push(new Client (48680134, "bb", "Bautista", "Rizzo"))
 clients.push(new Client (48316998, "cc", "Tomas", "Bourguet"))
 clients.push(new Client (47477890, "dd", "Lautaro", "Amadey"))
