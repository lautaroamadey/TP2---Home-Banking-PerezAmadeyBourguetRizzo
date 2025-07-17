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
    } else if (moneda == "USD") {
        return cantSBUSD;
    } else {
        return cantSB
    }
}

//10.5
function encontrarSavingBank(idCaja) {
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].savingsBanks.length; j++) {
            if (clients[i].savingsBanks[j].id === parseInt(idCaja)) {
                return clients[i].savingsBanks[j];
            }
        }
    }
    return null; // Agregá esto para evitar que devuelva undefined
}



//11
function findDebitCards(clientsId) {
    let debitCards = [];
    let posCliente = findClient(clientsId);
    let cliente = clients[posCliente];

    for (let i = 0; i < cliente.savingsBanks.length; i++) {
        for (let j = 0; j < cliente.savingsBanks[i].debitCards.length; j++) {
            debitCards.push(cliente.savingsBanks[i].debitCards[j]);
        }
    }

    return debitCards;
}

//12
function findDebitCardById(debitCardIds) {
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].savingsBanks.length; j++) {
            for (let k = 0; k < clients[i].savingsBanks[j].debitCards.length; k++) {
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
function findCreditCardById(creditCardIds) {
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].creditCards.length; j++) {
            if (clients[i].creditCards[j].id == creditCardIds) {
                return clients[i].creditCards[j];
            }
        }
    }
    return -1
}

//15 
function findMovementsBySavingsBankId(savingsBanksId) {
    for (let i = 0; i < clients.length; i++) {
        let cajasAhorro = clients[i].savingsBanks;
        for (let j = 0; j < cajasAhorro.length; j++) {
            if (cajasAhorro[j].id == savingsBanksId) {
                return cajasAhorro[j].movements;
            }
        }
    }
    return [];
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
function realizarTransferencia(id1, id2, monto) {
    const montoNum = Number(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
        showModal("Error", "Monto inválido");
        return false;
    }

    let caja1 = encontrarSavingBank(id1);
    let caja2 = encontrarSavingBank(id2);

    if (!caja1 || !caja2) {
        showModal("Error", "No se encontraron las cuentas");
        return false;
    }

    if (caja1.currency !== caja2.currency) {
        showModal("Error", "Las cuentas tienen distintas monedas");
        return false;
    }

    if (caja1.extraer(montoNum)) {
        caja2.ingresar(montoNum);

        // Guardar movimientos con nombre tercero = "transferencia"
        if (Array.isArray(caja1.movements)) {
            caja1.movements.push(new Movement("transferencia", -montoNum));
        }

        if (Array.isArray(caja2.movements)) {
            caja2.movements.push(new Movement("transferencia", montoNum));
        }

        showModal("Éxito", "Has realizado la transferencia");
        actualizarMisCuentas();
        return true;
    } else {
        showModal("Error", "No se ha podido realizar la transferencia");
        return false;
    }
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


//25
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


//27 a.
function llenarTarjetaSavingBank() {
    // Paso 1: Accedemos al cliente logueado restando 1 porque los arrays comienzan en 0
    // y tomamos su array de cajas de ahorro (savingsBanks)
    let savings = clients[findClient(idLogued)].savingsBanks;

    // Paso 2: Recorremos todas las cajas de ahorro del cliente
    for (let i = 0; i < savings.length; i++) {

        // Paso 3: Verificamos si la caja actual es en pesos (ARS)
        if (savings[i].currency === "ARS") {

            // Paso 4: Extraemos los datos importantes de esa caja en pesos
            let id = savings[i].id;                              // ID único de la caja
            let balance = savings[i].balance;                    // Saldo disponible
            let descubiertoDisponible = savings[i].limit - savings[i].overdraft; // Límite menos descubierto usado
            let descubierto = savings[i].overdraft;             // Monto del descubierto ya usado
            let alias = savings[i].alias;                        // Alias de la cuenta
            let cbu = savings[i].cbu;                            // CBU de 22 dígitos

            crearCajaPesos(id, balance, descubiertoDisponible, descubierto, alias, cbu);
        }
    }
}

function llenarCajaDolares() {
    // Paso 1: Accedemos al cliente logueado (restamos 1 porque los arrays comienzan en 0)
    // y tomamos su array de cajas de ahorro (savingsBanks)
    let saving = clients[findClient(idLogued)].savingsBanks;

    // Paso 2: Recorremos todas las cajas de ahorro del cliente
    for (let i = 0; i < saving.length; i++) {

        // Paso 3: Verificamos si la caja actual es en dólares (USD)
        if (saving[i].currency === "USD") {

            // Paso 4: Extraemos los datos importantes de esa caja en dólares
            let id = saving[i].id;           // ID único de la caja
            let balance = saving[i].balance; // Saldo disponible en dólares
            let alias = saving[i].alias;     // Alias de la cuenta
            let cbu = saving[i].cbu;         // CBU de 22 dígitos

            // Paso 5: Llamamos a la función que crea visualmente la tarjeta en el HTML
            crearCajaDolares(id, balance, alias, cbu);
        }
    }
}

function actualizarMisCuentas() {
    document.getElementById("misCuentas").innerHTML = "";  // ✅ Limpia antes de rellenar
    llenarTarjetaSavingBank();
    llenarCajaDolares();
}


//27 b.
function mostrarSavingBank() {
    // Paso 1: Accedemos a las cajas de ahorro del cliente actualmente logueado
    let cliente = clients[findClient(idLogued)].savingsBanks;

    // Paso 2: Limpiamos el select antes de llenarlo (para evitar duplicados)
    document.getElementById("debitCardAccountSelect").innerHTML = "";

    // Paso 3: Recorremos todas las cajas del cliente (pueden ser en ARS o USD)
    for (let i = 0; i < cliente.length; i++) {
        // Extraemos los datos importantes de cada caja
        let id = cliente[i].id;
        let currency = cliente[i].currency;
        let alias = cliente[i].alias;
        let cbu = cliente[i].cbu;

        // Paso 4: Llamamos a la función del DOM para mostrar esta caja en el select
        agregarCajaAlSelectDebito(id, currency, alias, cbu);
    }
}


//27 c.
function llenarSelectTransferencias() {
    let clienteLogueado = clients[findClient(idLogued)];

    // Limpiar los selects
    document.getElementById("transferOrigin").innerHTML = "";
    document.getElementById("transferDestinysSelect").innerHTML = "";

    // Cajas propias → selectOrigen
    for (let i = 0; i < clienteLogueado.savingsBanks.length; i++) {
        let cuenta = clienteLogueado.savingsBanks[i];
        agregarCajaOrigen(cuenta.id, cuenta.currency, cuenta.alias, cuenta.cbu);
    }

    // Cajas de otros clientes → selectDestinatario
    for (let j = 0; j < clients.length; j++) {
        if (clients[j].id !== idLogued) {
            let nombre = clients[j].name;
            for (let k = 0; k < clients[j].savingsBanks.length; k++) {
                let cuenta = clients[j].savingsBanks[k];
                agregarCajaDestinatario(cuenta.id, cuenta.currency, cuenta.alias, cuenta.cbu, nombre);
            }
        }
    }
}

//27 d.
function mostrarSavingBankPesos() {
    // Paso 1: Accedemos a las cajas de ahorro del cliente actualmente logueado
    let cliente = clients[findClient(idLogued)].savingsBanks;

    // Paso 2: Limpiamos el select antes de llenarlo (para evitar duplicados)
    Number(document.getElementById("pesosAccount").innerHTML = "");

    // Paso 3: Recorremos todas las cajas del cliente
    for (let i = 0; i < cliente.length; i++) {
        if (cliente[i].currency === "ARS") {
            // Extraemos los datos importantes de cada caja
            let id = cliente[i].id;
            let alias = cliente[i].alias;
            let cbu = cliente[i].cbu;

            // Paso 4: Llamamos a la función del DOM para mostrar esta caja en el select
            cajaPesos(id, alias, cbu);
        }
    }
}

function mostrarSavingBankDolares() {
    // Paso 1: Accedemos a las cajas de ahorro del cliente actualmente logueado
    let cliente = clients[findClient(idLogued)].savingsBanks;

    // Paso 2: Limpiamos el select antes de llenarlo (para evitar duplicados)
    Number(document.getElementById("dollarsAccount").innerHTML = "");

    // Paso 3: Recorremos todas las cajas del cliente
    for (let i = 0; i < cliente.length; i++) {
        if (cliente[i].currency === "USD") { // ← Mostramos solo cuentas en dólares
            // Extraemos los datos importantes de cada caja
            let id = cliente[i].id;
            let alias = cliente[i].alias;
            let cbu = cliente[i].cbu;

            // Paso 4: Llamamos a la función del DOM para mostrar esta caja en el select
            cajaDolares(id, alias, cbu);
        }
    }
}


//27 e.
function mostrarCreditCards() {
    // Paso 1: Accedemos a las tarjetas de crédito del cliente logueado
    let creditCards = clients[findClient(idLogued)].creditCards;

    // Paso 2: Limpiamos el select antes de llenarlo
    document.getElementById("creditCardSelect").innerHTML = "";

    // Paso 3: Recorremos cada tarjeta y agregamos la opción al select
    for (let i = 0; i < creditCards.length; i++) {
        let id = creditCards[i].id;
        let provider = creditCards[i].provider;
        let displayedName = creditCards[i].displayedName;

        document.getElementById("creditCardSelect").innerHTML += `
            <option value="${id}">${provider} - ${displayedName}</option>
        `;
    }

    // Paso 4: Seleccionamos la primera tarjeta por defecto y mostramos sus datos
    if (creditCards.length > 0) {
        document.getElementById("creditCardSelect").value = creditCards[0].id;
        rellenarTarjetaCredito();
    }
}

//27 f.
function mostrarTarjetasCredito() {
    let creditCards = findCreditCards(idLogued);

    for (let i = 0; i < creditCards.length; i++) {
        let tarjeta = creditCards[i];
        agregarTarjetaMetodoPago(tarjeta.id, "Crédito", tarjeta.provider, tarjeta.displayedName, tarjeta.securityCode);
    }
}

function mostrarTarjetasDebito() {
    let debitCards = findDebitCards(idLogued);

    for (let i = 0; i < debitCards.length; i++) {
        let tarjeta = debitCards[i];
        agregarTarjetaMetodoPago(tarjeta.id, "Débito", tarjeta.provider, tarjeta.displayedName, tarjeta.securityCode);
    }
}

//27 g.
function mostrarCajasParaInversiones() {
    // Paso 1: Accedemos a las cajas de ahorro del cliente actualmente logueado
    let cliente = clients[findClient(idLogued)].savingsBanks;

    // Paso 2: Limpiamos el select antes de llenarlo (para evitar duplicados)
    document.getElementById("investmentAccountSelect").innerHTML = "";

    // Paso 3: Recorremos todas las cajas del cliente (pueden ser en ARS o USD)
    for (let i = 0; i < cliente.length; i++) {
        // Extraemos los datos importantes de cada caja
        let id = cliente[i].id;
        let currency = cliente[i].currency;
        let alias = cliente[i].alias;
        let cbu = cliente[i].cbu;

        // Paso 4: Llamamos a la función del DOM para mostrar esta caja en el select
        agregarCajaASelectInversion(id, currency, alias, cbu);
    }
}



//29
function actualizarCardDebito() {
    let idSeleccionado = Number(document.getElementById("debitCardAccountSelect").value);
    let tarjeta = findDebitCardById(idSeleccionado);

    document.getElementById("debitCardTitle").textContent = `${tarjeta.provider} •••• ${String(tarjeta.number).slice(-4)}`;
    document.getElementById("debitCardHolder").textContent = tarjeta.displayedName;
    document.getElementById("debitCardExpiry").textContent = tarjeta.expireDate.toLocaleDateString();
    document.getElementById("debitCardNumber").value = tarjeta.number;
    document.getElementById("debitCardCvv").value = tarjeta.securityCode;
}

// 29 Toggle del número de tarjeta
document.getElementById("toggleDebitCardNumber").addEventListener("click", function () {
    const input = document.getElementById("debitCardNumber");
    const icon = document.getElementById("debitCardNumberIcon");

    if (input.type === "text") {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    } else {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    }
});

// 29 código de seguridad (CVV)
document.getElementById("toggleDebitCvv").addEventListener("click", function () {
    let input = document.getElementById("debitCardCvv");
    let icon = document.getElementById("debitCvvIcon");

    if (input.type === "text") {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    } else {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    }
});





//30
function tranferenciaAlias() {
    let aliasDestino = document.getElementById("transferDestiny").value;
    let idOrigen = document.getElementById("transferOrigin").value;
    let monto = parseFloat(document.getElementById("transferAmount").value);

    // Buscar la caja de destino a partir del alias
    let cajaDestino = null;
    for (let i = 0; i < clients.length; i++) {
        for (let j = 0; j < clients[i].savingsBanks.length; j++) {
            if (clients[i].savingsBanks[j].alias === aliasDestino) {
                cajaDestino = clients[i].savingsBanks[j];
                break;
            }
        }
        if (cajaDestino) break;
    }

    if (!cajaDestino) {
        showModal("Error", "No se encontró una caja de ahorro con ese alias");
        return;
    }

    // Realizar la transferencia
    let cajaOrigen = encontrarSavingBank(parseInt(idOrigen));

    if (!cajaOrigen) {
        showModal("Error", "No se encontró la caja de origen");
        return;
    }

    if (cajaOrigen.currency !== cajaDestino.currency) {
        showModal("Error", "Las cuentas tienen distintas monedas");
        return;
    }

    if (cajaOrigen.extraer(monto)) {
        cajaDestino.ingresar(monto);
        showModal("Éxito", "La transferencia fue realizada correctamente");
        actualizarMisCuentas(); // actualiza las tarjetas visibles
    } else {
        showModal("Error", "No hay suficiente saldo");
    }
}

function tranferencias() {
    let idOrigen = document.getElementById("transferOrigin").value;
    let aliasDestino = document.getElementById("transferDestiny").value;
    let idDestino = document.getElementById("transferDestinysSelect").value;
    let monto = document.getElementById("transferAmount").value;

    if (aliasDestino !== "") {
        tranferenciaAlias(); 
    } else {
        let exito = realizarTransferencia(idOrigen, idDestino, monto); 
        if (exito) {
            document.getElementById("transferOrigin").value = "nada";
            document.getElementById("transferDestiny").value = "";
            document.getElementById("transferDestinysSelect").value = "nada";
            document.getElementById("transferAmount").value = "";


        }
    }
}



//31
function operarDolares(tipo) {
    let client = clients[findClient(idLogued)];
    let monto = Number(document.getElementById("dollarsAmount").value);
    let idPesos = Number(document.getElementById("pesosAccount").value);
    let idDolares = Number(document.getElementById("dollarsAccount").value);

    if (isNaN(monto) || monto <= 0 || !idPesos || !idDolares) {
        showModal("Error", "Verificá los datos ingresados");
        return;
    }

    const COTIZACION_COMPRA = 1200; 
    const COTIZACION_VENTA = 1150;  

    let exito = false;

    if (tipo === "compra") {
        let montoEnPesos = monto * COTIZACION_COMPRA;
        exito = client.convertirMoneda(montoEnPesos, idPesos, idDolares);

        if (exito) {
            let cajaPesos = encontrarSavingBank(idPesos);
            let cajaDolares = encontrarSavingBank(idDolares);
            cajaPesos.movements.push(new Movement("compra de dólar", -montoEnPesos));
            cajaDolares.movements.push(new Movement("compra de dólar", monto));
        }

    } else if (tipo === "venta") {
        exito = client.convertirMoneda(monto, idDolares, idPesos);

        if (exito) {
            let cajaDolares = encontrarSavingBank(idDolares);
            let cajaPesos = encontrarSavingBank(idPesos);
            cajaDolares.movements.push(new Movement("venta de dólar", -monto));
            let montoEnPesos = monto * COTIZACION_VENTA;
            cajaPesos.movements.push(new Movement("venta de dólar", montoEnPesos));
        }

    } else {
        showModal("Error", "Tipo de operación inválido");
        return;
    }

    if (exito) {
        showModal("Éxito", `Operación de ${tipo === "compra" ? "compra" : "venta"} realizada correctamente`);
        actualizarMisCuentas();
        mostrarSavingBankPesos();
        mostrarSavingBankDolares();
        document.getElementById("dollarsAmount").value = "";
        document.getElementById("dollarEquivalent").textContent = "$0";
    } else {
        showModal("Error", "No se pudo realizar la operación");
    }
}



//32
function rellenarTarjetaCredito() {
    let creditCards = findCreditCards(idLogued)
    let id = document.getElementById("creditCardSelect").value
    for (let i = 0; i < creditCards.length; i++) {
        if (creditCards[i].id == id) {
            document.getElementById("creditCardTitle").innerText = `${creditCards[i].provider} •••• ${String(creditCards[i].number).slice(-4)}`;
            document.getElementById("creditCardHolder").innerText = `${creditCards[i].displayedName}`
            document.getElementById("creditCardExpiry").innerText = `${creditCards[i].expireDate}`
            document.getElementById("creditCardClosingDate").innerText = `${creditCards[i].closeDate}`
            document.getElementById("creditCardBalance").innerText = `${creditCards[i].balance}`
            document.getElementById("creditCardBalanceExpiry").innerText = `${creditCards[i].expiresBalanceDate}`
            Number(document.getElementById("cardNumber").value = `${creditCards[i].number}`)
            document.getElementById("cardCvv").value = `${creditCards[i].securityCode}`
        }
    }
}


//32 Toggle del número de tarjeta
document.getElementById("toggleCardNumber").addEventListener("click", function () {
    const input = document.getElementById("cardNumber");
    const icon = document.getElementById("cardNumberIcon");

    if (input.type === "text") {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    } else {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    }
});

//32 código de seguridad (CVV)
document.getElementById("toggleCvv").addEventListener("click", function () {
    let input = document.getElementById("cardCvv");
    let icon = document.getElementById("cvvIcon");

    if (input.type === "text") {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    } else {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    }
});



function pagoMinimo() {
    let idcreditCard = document.getElementById("creditCardSelect").value;
    let creditCard = findCreditCardById(idcreditCard);
    let pagoMinimo = creditCard.balance * 0.1;
    document.getElementById("customPaymentAmount").value = pagoMinimo;
}


function pagoTotal() {
    let idcreditCard = document.getElementById("creditCardSelect").value
    let creditCard = findCreditCardById(idcreditCard)
    let pagoTotal = creditCard.balance
    document.getElementById("customPaymentAmount").value = pagoTotal
}

function pagarSaldo() {
    let idcreditCard = document.getElementById("creditCardSelect").value;
    let creditCard = findCreditCardById(idcreditCard);
    let savingbanks = encontrarSavingBank(idLogued);
    let monto = Number(document.getElementById("customPaymentAmount").value);

    let cuentaOk = false;

    for (let i = 0; i < savingbanks.length; i++) {
        if (savingbanks[i].currency == "ARS") {
            if (monto <= savingbanks[i].balance) {
                savingbanks[i].extraer(monto);
                cuentaOk = true;
                document.getElementsByClassName("mb-1")[1].innerHTML = `<strong>Saldo:</strong> $${savingbanks[i].balance}`;
                break;
            } else {
                showModal("Error", "Saldo insuficiente en la caja de ahorro.");
                return;
            }
        }
    }

    if (!cuentaOk) {
        showModal("Error", "No se encontró una caja de ahorro en ARS.");
        return;
    }

    let checkPago = creditCard.registrarPago(monto);

    if (checkPago === 1) {
        creditCard.consumptions.push(new Movement("Pago total", -monto, 1));
    } else if (checkPago === 0) {
        creditCard.consumptions.push(new Movement("Pago mínimo", -monto, 1));
    } else if (checkPago === -1) {
        showModal("Error", "El monto ingresado es menor al pago mínimo.");
        return;
    } else {
        showModal("Error", "No se ha podido realizar el pago.");
        return;
    }

    showModal("Éxito", "El pago de la tarjeta fue realizado correctamente.");
    document.getElementById("creditCardBalance").innerText = `${creditCard.balance}`;
    document.getElementById("customPaymentAmount").value = "";

    actualizarMisCuentas();
    rellenarTarjetaCredito();
    verMovimientosTarjetaCredito();
}


function verMovimientosTarjetaCredito() {
    let tarjetaId = Number(document.getElementById("creditCardSelect").value);
    let tarjeta = findCreditCardById(tarjetaId);

    if (!tarjeta) {
        showModal("Error", "No se encontró la tarjeta.");
        return;
    }

    let movimientos = tarjeta.consumptions;

    if (!movimientos || movimientos.length === 0) {
        showModal("Movimientos de la tarjeta", "<p>No hay movimientos registrados.</p>");
        return;
    }

    let tabla = `
        <table class="table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Comercio</th>
                    <th>Monto</th>
                    <th>Cuotas</th>
                </tr>
            </thead>
            <tbody>
    `;

    movimientos.forEach(mov => {
        tabla += `
            <tr>
                <td>${new Date(mov.date).toLocaleDateString()}</td>
                <td>${mov.thirdPartyName}</td>
                <td>$${mov.amount}</td>
                <td>${mov.cuotes || "-"}</td>
            </tr>
        `;
    });

    tabla += `
            </tbody>
        </table>
    `;

    document.getElementById("modalTitle").textContent = "Movimientos de la tarjeta";
    document.getElementById("modalBody").innerHTML = tabla;

    let modalEl = document.getElementById("modal");
    let modal = new bootstrap.Modal(modalEl);
    modal.show();
}



