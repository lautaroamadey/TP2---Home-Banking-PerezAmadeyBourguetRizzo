//24
document.getElementsByClassName("navbar-toggler")[0].style.display = "none";
document.getElementById("accounts").style.display = "none";
document.getElementById("debitCards").style.display = "none";
document.getElementById("transfers").style.display = "none";
document.getElementById("dollar").style.display = "none";
document.getElementById("creditCards").style.display = "none";
document.getElementById("payments").style.display = "none";
document.getElementById("investments").style.display = "none";

/*document.getElementById("movements").style.display = "none";*/


//26
function logout() {
    document.getElementsByClassName("navbar-toggler")[0].style.display = "none";
    document.getElementById("offcanvasMenu").style.display = "none";
    document.getElementById("accounts").style.display = "none";
    document.getElementById("debitCards").style.display = "none";
    document.getElementById("transfers").style.display = "none";
    document.getElementById("dollar").style.display = "none";
    document.getElementById("creditCards").style.display = "none";
    document.getElementById("payments").style.display = "none";
    document.getElementById("investments").style.display = "none";
    document.getElementsByClassName("row")[1].innerHTML = "";
    document.getElementById("misCuentas").innerHTML = "";

    //login/registro
    document.getElementsByClassName("col-md-6")[0].style.display = "";

    for (let i = 0; i < document.getElementsByClassName("form-floating").length; i++) {
        document.getElementsByClassName("form-floating")[i].children[0].value=""
    }
    console.log("Sesión cerrada");
    alert("Sesión cerrada");

    document.getElementById("debitCardAccountSelect").innerHTML = "";
    document.getElementById("transferOrigin").innerHTML = "";
    document.getElementById("transferDestiny").innerHTML = "";
    document.getElementById("pesosAccount").innerHTML = "";
    document.getElementById("dollarsAccount").innerHTML = "";
    document.getElementById("creditCardSelect").innerHTML = "";
    document.getElementById("paymentMethodSelect").innerHTML = "";
    document.getElementById("creditCardSelect").innerHTML = "";
}


//27 a.
function crearCajaPesos(id, balance, descubiertoDisponible, descubierto, alias, cbu) {
    document.getElementById("misCuentas").innerHTML += `
        <div id="cajaPesos${id}" class="col-md-6 col-lg-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">Caja de Ahorro en Pesos</h5>
                    <p class="card-text mb-1"><strong>Moneda:</strong> ARS</p>
                    <p class="card-text mb-1"><strong>Saldo:</strong> $${balance}</p>
                    <p class="card-text mb-1"><strong>Descubierto disponible:</strong> $${descubiertoDisponible}</p>
                    <p class="card-text mb-1"><strong>Descubierto usado:</strong> $${descubierto}</p>
                    <p class="card-text mb-1"><strong>Alias:</strong> ${alias}</p>
                    <p class="card-text mb-3"><strong>CBU:</strong> ${cbu}</p>
                    <div class="d-grid">
                        <button class="btn btn-outline-primary btn-sm" onclick="mostrarMovimientos(${id})">Ver movimientos</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function crearCajaDolares(id, balance, alias, cbu) {
    document.getElementById("misCuentas").innerHTML += `
        <div id="cuentaUSD${id}" class="col-md-6 col-lg-4 mb-4">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">Caja de Ahorro en Dólares</h5>
                    <p class="card-text mb-1"><strong>Moneda:</strong> USD</p>
                    <p class="card-text mb-1"><strong>Saldo:</strong> U$D ${balance}</p>
                    <p class="card-text mb-1"><strong>Alias:</strong> ${alias}</p>
                    <p class="card-text mb-3"><strong>CBU:</strong> ${cbu}</p>
                    <div class="d-grid">
                        <button class="btn btn-outline-primary btn-sm" onclick="mostrarMovimientos(${id})">Ver movimientos</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}



//27 b.
function agregarCajaAlSelectDebito(id, currency, alias, cbu) {
    // Accedemos al select del DOM
    let select = document.getElementById("debitCardAccountSelect");

    // Creamos dinámicamente una opción dentro del select, con la información visible al usuario
    // El value corresponde al id de la caja (lo más útil para identificarla luego)
    select.innerHTML += `
        <option value="${id}">
            Moneda: ${currency}, Alias: ${alias}, CBU: ${cbu}
        </option>
    `;
}


//27 c.
function agregarCajaOrigen(id, currency, alias, cbu) {
    document.getElementById("transferOrigin").innerHTML += `
        <option value="${id}">Moneda: ${currency} | Alias: ${alias} | CBU: ${cbu}</option>
    `;
}

function agregarCajaDestinatario(id, currency, alias, cbu, clienteNombre) {
    document.getElementById("transferDestinysSelect").innerHTML += `
        <option value="${id}">Cliente: ${clienteNombre} | Moneda: ${currency} | Alias: ${alias} | CBU: ${cbu}</option>
    `;
}

//27 d.
function cajaPesos(id, alias, cbu) {
    document.getElementById("pesosAccount").innerHTML += `
        <option value="${id}">
            Alias: ${alias}, CBU: ${cbu}
        </option>
    `;
}

function cajaDolares(id, alias, cbu) {
    document.getElementById("dollarsAccount").innerHTML += `
        <option value="${id}">
            Alias: ${alias}, CBU: ${cbu}
        </option>
    `;
}

//27 e. 
function creditCardOption(id, provider, displayedName) {
    document.getElementById("creditCardSelect").innerHTML += `
        <option value="${id}">
            ${provider} - ${displayedName}
        </option>
    `;
}


//27 f.
function agregarTarjetaMetodoPago(id, tipo, provider, displayedName, securityCode) {
    document.getElementById("paymentMethodSelect").innerHTML += `
        <option value="${id}">
            [${tipo}] ${provider} - ${displayedName} (Cod: ${securityCode})
        </option>
    `;
}

//27 g.
function agregarCajaASelectInversion(id, currency, alias, cbu) {
    document.getElementById("investmentAccountSelect").innerHTML += `
        <option value="${id}">
            [${currency}] Alias: ${alias}, CBU: ${cbu}
        </option>
    `;
}

//{}
//28

function showModal(title, body) {
    // Paso 1: Insertar título y contenido en el modal
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalBody").innerHTML = body;

    // Paso 2: Crear e iniciar el modal de Bootstrap
    let modal = new bootstrap.Modal(document.getElementById("modal"), {
        keyboard: true,
        focus: true
    });

    modal.show();
}


function mostrarMovimientos(idCaja) {
    let movimientos = findMovementsBySavingsBankId(idCaja);

    // Construir el HTML de la tabla
    let tablaHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre del tercero</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < movimientos.length; i++) {
        let thirdPartyName = movimientos[i].thirdPartyName;
        let amount = movimientos[i].amount;

        tablaHTML += `
            <tr>
                <td>${thirdPartyName}</td>
                <td>$${amount}</td>
            </tr>
        `;
    }

    tablaHTML += `
            </tbody>
        </table>
    `;

    showModal("Movimientos de la cuenta", tablaHTML);
}

function cerrarModal() {
    let modalElement = document.getElementById("modal");
    let modalInstance = bootstrap.Modal.getInstance(modalElement);

    if (modalInstance) {
        modalInstance.hide();
    }

    // Limpiar contenido del modal
    document.getElementById("modalBody").innerHTML = "";
}

//31
function mostrarSelectDolares() {
    let cliente = findClient(idLogued);
    let selectPesos = document.getElementById("pesosAccount");
    let selectDolares = document.getElementById("dollarsAccount");

    // Limpiar opciones anteriores
    selectPesos.innerHTML = '<option selected disabled>Seleccionar cuenta...</option>';
    selectDolares.innerHTML = '<option selected disabled>Seleccionar cuenta...</option>';

    cliente.savingsBanks.forEach(caja => {
        let option = document.createElement("option");
        option.value = caja.id;
        option.text = `${caja.currency} - ${caja.balance} (${caja.displayedName})`;
        if (caja.currency === "ARS") {
            selectPesos.appendChild(option);
        } else if (caja.currency === "USD") {
            selectDolares.appendChild(option);
        }
    });
}

function comprarDolares() {
    console.log("Función comprarDolares ejecutada");

    let monto = parseFloat(document.getElementById("dollarsAmount").value);
    let idPesos = document.getElementById("pesosAccount").value;
    let idDolares = document.getElementById("dollarsAccount").value;

    if (isNaN(monto) || monto <= 0) {
        showModal("Error", "Ingresá un monto válido");
        return;
    }

    let cajaPesos = encontrarSavingBank(idPesos);
    let cajaDolares = encontrarSavingBank(idDolares);
    const tipoCambio = 1200;

    if (cajaPesos.extraer(monto * tipoCambio)) {
        let montoEnDolares = monto;
        cajaDolares.ingresar(montoEnDolares);
        showModal("Éxito", `Compraste USD ${montoEnDolares.toFixed(2)}`);
        document.getElementById("dollarsAmount").value = "";
        actualizarMisCuentas();
        mostrarSelectDolares();
    } else {
        showModal("Error", "No tenés saldo suficiente en pesos");
    }
}

function venderDolares() {
    let monto = parseFloat(document.getElementById("dollarsAmount").value);
    let idPesos = document.getElementById("pesosAccount").value;
    let idDolares = document.getElementById("dollarsAccount").value;

    if (isNaN(monto) || monto <= 0) {
        showModal("Error", "Ingresá un monto válido");
        return;
    }

    let cajaPesos = encontrarSavingBank(idPesos);
    let cajaDolares = encontrarSavingBank(idDolares);
    const tipoCambio = 1150;

    if (cajaDolares.extraer(monto)) {
        let montoEnPesos = monto * tipoCambio;
        cajaPesos.ingresar(montoEnPesos);
        showModal("Éxito", `Vendiste USD ${monto.toFixed(2)} por $${montoEnPesos.toFixed(2)}`);
        document.getElementById("dollarsAmount").value = "";
        actualizarMisCuentas();
        mostrarSelectDolares();
    } else {
        showModal("Error", "No tenés suficientes dólares");
    }
}

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const selectOperacion = document.getElementById("dollarOperation");
    const operacion = selectOperacion.value;

    if (!operacion || selectOperacion.selectedIndex === 0) {
        showModal("Error", "Seleccioná si querés comprar o vender dólares");
        return;
    }

    if (operacion === "compra") {
        comprarDolares();
    } else if (operacion === "venta") {
        venderDolares();
    } else {
        showModal("Error", "Operación no reconocida");
    }
});
