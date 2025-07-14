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

