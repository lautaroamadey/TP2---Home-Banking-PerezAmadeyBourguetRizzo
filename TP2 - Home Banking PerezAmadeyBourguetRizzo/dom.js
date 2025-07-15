//24
document.getElementsByClassName("navbar-toggler")[0].style.display = "none";
document.getElementById("accounts").style.display = "none";
document.getElementById("debitCards").style.display = "none";
document.getElementById("transfers").style.display = "none";
document.getElementById("dollar").style.display = "none";
document.getElementById("creditCards").style.display = "none";
document.getElementById("payments").style.display = "none";
document.getElementById("investments").style.display = "none";
document.getElementById("movements").style.display = "none";


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

//{}
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
                        <button class="btn btn-outline-primary btn-sm" onclick="verMovimientos(${id})" data-bs-toggle="modal" data-bs-target="#modal">Ver movimientos</button>
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
                        <button class="btn btn-outline-primary btn-sm" onclick="verMovimientos(${id})" data-bs-toggle="modal" data-bs-target="#modal">Ver movimientos</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}



//27 b.
function agregarCajaAlSelectDebito(id, currency, alias, cbu) {
    // Accedemos al select del DOM
    const select = document.getElementById("debitCardAccountSelect");

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
function VerMovimientos(id) {
    let movimientos;

    for (let i = 0; i < client.length; i++) {
        for (let j = 0; j < client[i].savingBanks.length; j++) {
            if (client[i].savingBanks[j].id == id) {
                movimientos = encontrarSavingBankMovement(client[idLogued - 1].savingBanks[j].id);

                // Crear tabla como en tu estructura (sin usar let html = ``)
                let tabla = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nombre del tercero</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                for (let k = 0; k < movimientos.length; k++) {
                    tabla += `
                        <tr>
                            <td>${movimientos[k].nombreDelTercero}</td>
                            <td>${movimientos[k].monto}</td>
                        </tr>
                    `;
                }

                tabla += `
                        </tbody>
                    </table>
                `;

                // Insertar toda la tabla dentro del modal
                document.getElementById("modalBody").innerHTML = tabla;
            }
        }
    }

    // Mostrar el modal (si usás Bootstrap 5)
    const modal = new bootstrap.Modal(document.getElementById('modal'));
    modal.show();
}


