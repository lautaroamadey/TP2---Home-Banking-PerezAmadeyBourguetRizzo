let idLogued = 0
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
    let cajasAhorro
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

//16 
function findMovementsByDebitCardId(debitCardIds) {
    let movementss = []
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].savingsBanks.length; j++) {
            for (let k = 0; k < clients[i].savingsBanks[j].debitCards.length; k++) {
                if (clients[i].savingsBanks[j].debitCards[k].id === debitCardIds) {
                    movementss.push(clients[i].savingsBanks[j].debitCards[k].consumptions)
                    return movementss;
                }
            }
        }
    }
    return [];
} 


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

// 24
function checklogin(dni, password) {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].dni == dni) {
            if (clients[i].password == password) {
                idLogued = clients[i].id;
                return idLogued;
            } else {
                console.log("La contraseña es incorrecta");
                alert("La contraseña es incorrecta");
                return false;
            }
        }
    }
    console.log("DNI incorrecto");
    alert("El DNI es incorrecto");
    return false;
}

function login() {
    let dni = document.getElementById("loginDni").value;
    let password = document.getElementById("loginPassword").value;

    if (dni == "") {
        console.log("No relleno el espacio del DNI");
        alert("Debe completar con su DNI");
        return false;
    } else if (dni.length < 7) {
        console.log("Fallo DNI");
        alert("El DNI debe tener al menos 7 números");
        return false;
    } else if (password == "") {
        console.log("No relleno el espacio de la contraseña");
        alert("Tiene que completar el campo de la contraseña");
        return false;
    }

    idLogued = checklogin(dni, password);
    if (idLogued >= 1) {
        document.getElementsByClassName("navbar-toggler")[0].style.display = "";
        document.getElementById("offcanvasMenu").style.display = "";
        document.getElementById("accounts").style.display = "";
        document.getElementById("debitCards").style.display = "";
        document.getElementById("transfers").style.display = "";
        document.getElementById("dollar").style.display = "";
        document.getElementById("creditCards").style.display = "";
        document.getElementById("payments").style.display = "";
        document.getElementById("investments").style.display = "";
        document.getElementsByClassName("col-md-6")[0].style.display = "none";

        console.log("Logueado exitosamente, el id del usuario es: " + idLogued);
    }

    return true;
}


// 25
function checkRegister(dni, password, name, surname) {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].dni === dni) {
            console.log("Utilizó un DNI que ya fue registrado");
            alert("El DNI ya fue utilizado, no se ha podido registrar");
            return false;
        }
    }

    // Si el DNI no existe, se crea un nuevo cliente
    clients.push(new Client(dni, password, name, surname));
    return true;
}


function register() {
    let arroba = -1;
    let dni = document.getElementById("registerDni").value;
    let name = document.getElementById("registerName").value;
    let password = document.getElementById("registerPassword").value;
    let correo = document.getElementById("registerEmail").value;
    let surname = document.getElementById("registerLastName").value;

    // Verifica si hay un "@" en el correo
    for (let i = 0; i < correo.length; i++) {
        if (correo[i] === "@") {
            arroba = 1;
        }
    }

    // Validaciones de campos
    if (name === "") {
        console.log("No rellenó el espacio del nombre");
        alert("Debe completar con su nombre");
        return false;
    } else if (surname === "") {
        console.log("No rellenó el espacio del apellido");
        alert("Debe completar con su apellido");
        return false;
    } else if (dni === "") {
        console.log("No rellenó el espacio del DNI");
        alert("Debe completar con su DNI");
        return false;
    } else if (correo === "") {
        console.log("No rellenó el espacio del correo");
        alert("Debe completar con su correo");
        return false;
    } else if (password === "") {
        console.log("No rellenó el espacio de la contraseña");
        alert("Debe completar con su contraseña");
        return false;
    } else if (dni.length < 7) {
        console.log("Fallo DNI");
        alert("El DNI debe tener al menos 7 números");
        return false;
    } else if (arroba === -1) {
        console.log("Fallo arroba");
        alert("Tiene que ingresar un mail válido");
        return false;
    }

    // Si todo está bien, intento registrar
    let check = checkRegister(dni, password, name, surname);
    if (check === true) {
        console.log("Registrado exitosamente");
        alert("Registrado exitosamente");
    } else {
        return false;
    }

    return true;
}

//aa sefsegsggses

//26