import {User} from "./models/user.js";
import {Order} from "./models/order.js";

window.onload = function() {
    main();
  };


function main(){

    var champName = document.getElementById('name');
    var champFirstName = document.getElementById('firstName');
    var champEmail = document.getElementById('email');
    var champPhoneNumber = document.getElementById('phoneNumber');
    var champDepart = document.getElementById('depart');
    var champRetour = document.getElementById('retour');
    var champAdultNumber = document.getElementById('adultNumber');
    var champChildNumber = document.getElementById('childNumber');
    var champBreakfast = document.getElementById('breakfast');
    var champDemande = document.getElementById('demande');
    var champTotalPrice = document.getElementById('totalPrice');

    var userId = User.getLoggedUser().userId;
    var ordersArray = Order.getOrdersById(userId);

    if(ordersArray.length == 0){
      location.href = "index.html";
    }

    var lastOrder = ordersArray[ordersArray.length-1];
    console.log(lastOrder)

    champName.innerHTML = lastOrder.customer.name
    champFirstName.innerHTML = lastOrder.customer.firstName
    champEmail.innerHTML = lastOrder.customer.email
    champPhoneNumber.innerHTML = lastOrder.customer.phoneNumber

    champDepart.innerHTML = formatDate(lastOrder.dateDepart)
    champRetour.innerHTML = formatDate(lastOrder.dateRetour)
    champAdultNumber.innerHTML = lastOrder.adultNumber
    champChildNumber.innerHTML = lastOrder.childNumber
    champBreakfast.innerHTML = lastOrder.breakfast ? "Oui" : "Non"
    champDemande.innerHTML = lastOrder.request

    champTotalPrice.innerHTML = lastOrder.totalPrice

}

