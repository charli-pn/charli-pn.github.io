import {User} from "./models/user.js";
import {Order} from "./models/order.js";


window.onload = function() {
    main();
  };


function main(){

    var userId = User.getLoggedUser().userId;
    var ordersArray = Order.getOrdersById(userId);

    var html = (ordersArray.length==0) ? "Votre panier est vide pour le moment" : "";

    ordersArray.forEach(element => {
        html += generateHTML(element);
    });

    document.getElementById("orders").innerHTML = html;

    ordersArray.forEach(element => {
        document.getElementById(element.orderId).onclick = () => {
            Order.removeById(element.orderId);
            //location=location
        }
    })

}

function generateHTML(order){
    let html= "<li class=\"order-info\">"
    html +=     "<div class=\"order-left\">"
    html +=         "<img class=\"order-image\" src=\"img/"+order.voyage.img+"\" alt=\"futur\"></img>"
    html +=         "<div class=\"order-text\">"
    html +=             "<p>"+order.voyage.description+"</p>"
    html +=             "<p> Du "+formatDate(new Date(order.dateDepart))+" au "+formatDate(new Date(order.dateRetour))+"</p>"
    html +=         "</div>"
    html +=         "<div class=\"order-text\">"
    html +=             "<p>Nombre d'enfants : "+order.childNumber+"</p>"
    html +=             "<p>Nombre d'adultes : "+order.adultNumber+"</p>"
    html +=         "</div>"
    html +=         "<div class=\"order-text\">"
    html +=             "<p>Petit déjeuner : "+ (order.breakfast ? "Oui" : "Non")+"</p>"
    html +=         "</div>"
    html +=     "</div>"
    html +=     "<div class=\"order-price\">"
    html +=         "<p>"+order.totalPrice+"€</p>"
    html +=         "<button id=\""+order.orderId+"\" class=\"suppression\" type=\"button\">Supprimer</button>"
    html +=     "</div>"
    html += "</li>"

    return html;
}