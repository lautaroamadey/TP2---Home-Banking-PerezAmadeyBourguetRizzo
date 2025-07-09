//9
function findClient(clientsId) {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === clientsId)
            return i
    } 
    return -1    
}


//10
function findSavingBank(clientsId, moneda) {
    const cantSBARS = [];
    const cantSBUSD = [];
    const cantSB = [];
    let posCliente = findClient(clientsId);
    for (let i = 0; i < clients[posCliente].savingsBanks.length; i++) {
        if ("ARS" == clients[posCliente].savingsBanks[i].currency) {
            cantSBARS.push(clients[posCliente].savingsBanks[i]);
            cantSB.push(clients[posCliente].savingsBanks[i]);
        } else {
            cantSBUSD.push(clients[posCliente].savingsBanks[i]);
            cantSB.push(clients[posCliente].savingsBanks[i]);
        }
    }

    if (moneda == "ARS") {
        return cantSBARS;
    } else if (moneda == "USD"){
        return cantSBUSD;
    } else {
        return cantSB
    }
}

//11
function findDebitCards(clientsId) {
    let debitCards = [];
    let posCliente = findClient(clientsId);
    let cliente = clients[posCliente];

    for (let i=0; i<cliente.savingsBanks.length;i++) {
        for (let j=0; j< cliente.savingsBanks[i].debitCards.length; j++) {
            debitCards.push(cliente.savingsBanks[i].debitCards[j]);
        }
    }

    return debitCards;
}

//12
function findDebitCardById(debitCardIds) {
    for (let i = 0; i < clients.length; i++) {
        for (let j=0; j<clients[i].savingsBanks.length;j++) {
            for (let k=0; k < clients[i].savingsBanks[j].debitCards.length; k++) {
                if (clients[i].savingsBanks[j].debitCards[k].id == debitCardIds) {
                    return clients[i].savingsBanks[j].debitCards[k];
                }
            }
        }
    }
    return -1
}

//13
function findCreditCards(clientsId) {
    let posCliente = findClient(clientsId);
    let cliente = clients[posCliente];

    return cliente.creditCards
}

//14
function findCreditCardById(creditCardIds){
    for (let i = 0; i < clients.length; i++) {
        for (let j=0; j<clients[i].creditCards.length;j++) {
            if (clients[i].creditCards[j].id == creditCardIds) {
                return clients[i].creditCards[j];
            }
        }
    }
    return -1
}

//15 
function findMovementsBySavingsBankId(savingsBanksId) {
    let posSavingBank
    for (let i=0;i < clients.length; i++) {
        cajasAhorro = findSavingBank(clients[i].id);
        for (let j=0; j < cajasAhorro.length; j++) {
            if (cajasAhorro[j].id == savingsBanksId) {
                return cajasAhorro[j].movements
            }
        }
    
    }
    return []
}

//16 {}
function findMovementsByDebitCardId(debitCardId) {
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].savingsBanks.length; j++) {
            for (let k = 0; k < clients[i].savingsBanks[j].debitCards.length; k++) {
                if (clients[i].savingsBanks[j].debitCards[k].id === debitCardId) {
                    return clients[i].savingsBanks[j].debitCards[k].consumptions;
                }
            }
        }
    }
    return [];
}

function findMovementsByDebitCardId(debitCardId) {
    for (let i = 0; i < clients.length; i++) {
        let cajasAhorro = findSavingBank(clients[i].id); // usamos función ya existente
        for (let j = 0; j < cajasAhorro.length; j++) {
            let tarjetas = cajasAhorro[j].debitCards;
            for (let k = 0; k < tarjetas.length; k++) {
                if (tarjetas[k].id === debitCardId) {
                    return tarjetas[k].consumptions;
                }
            }
        }
    }
    return [];
}

//revisar cual esta bien 

//17
function findMovementsByCreditCardId(creditCardId) {
    for (let i = 0; i < clients.length; i++) {
        let creditCards = clients[i].creditCards;
        for (let j = 0; j < creditCards.length; j++) {
            if (creditCards[j].id === creditCardId) {
                return creditCards[j].consumptions;
            }
        }
    }
    return [];
}

//23
function realizarTransferencia(idCajaOrigen, destinoCaja, monto) {
    if (monto <= 0) return false;

    let cajaOrigen = null;
    let cajaDestino = null;

    // Buscar caja de origen
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].savingsBanks.length; j++) {
            if (clients[i].savingsBanks[j].id === idCajaOrigen) {
                cajaOrigen = clients[i].savingsBanks[j];
            }
        }
    }

    // Buscar caja de destino (por ID, alias o CBU)
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].savingsBanks.length; j++) {
            let c = clients[i].savingsBanks[j];
            if (c.id === destinoCaja || c.alias === destinoCaja || c.cbu === destinoCaja) {
                cajaDestino = c;
            }
        }
    }

    if (!cajaOrigen || !cajaDestino) return false;

    // Validar que ambas cajas operen con la misma moneda
    if (cajaOrigen.currency !== cajaDestino.currency) return false;

    // Intentar extracción
    const extraccionExitosa = cajaOrigen.extraer(monto);
    if (!extraccionExitosa) return false;

    // Intentar ingreso
    const resultadoIngreso = cajaDestino.ingresar(monto);
    return resultadoIngreso !== -1;
}

