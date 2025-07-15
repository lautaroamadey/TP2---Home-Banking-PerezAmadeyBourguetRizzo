//Punto 24
document.getElementsByClassName("navbar-toggler")[0].style.display = "none";
document.getElementById("accounts").style.display = "none";
document.getElementById("debitCards").style.display = "none";
document.getElementById("transfers").style.display = "none";
document.getElementById("dollar").style.display = "none";
document.getElementById("creditCards").style.display = "none";
document.getElementById("payments").style.display = "none";
document.getElementById("investments").style.display = "none";
/*
document.getElementById("movements").style.display = "none";
*/

//26
function logout() {
    // Ocultar funcionalidades del home banking
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
    // Mostrar el formulario de login/registro
    document.getElementsByClassName("col-md-6")[0].style.display = "";

    for (let i = 0; i < document.getElementsByClassName("form-floating").length; i++) {
        document.getElementsByClassName("form-floating")[i].children[0].value=""
    }
    console.log("Sesión cerrada exitosamente");
    alert("Sesión cerrada. Volvés a la pantalla de inicio.");

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
//27
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
                        <button class="btn btn-outline-primary btn-sm">Ver movimientos</button>
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
                        <button class="btn btn-outline-primary btn-sm">Ver movimientos</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function TarjetasDebito(id, currency, alias) {
    let savingbanks = clients[findClient(idLogued)].savingsBanks;
    for (let i = 0; i < savingbanks.length; i++) {
        document.getElementById("debitCardAccountSelect").innerHTML += `<option value="${savingbanks[i].id}">Moneda: ${savingbanks[i].currency}, alias: ${savingbanks[i].alias}</option>`
    }
}