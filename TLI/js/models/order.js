import {User} from "./user.js";

class Order {


    constructor(voyage, customer, dateDepart, dateRetour, adultNumber, childNumber, breakfast, request, totalPrice){

        this.orderId = Order.getNextId();
        this.userId = User.getLoggedUser().userId;
        this.voyage = voyage;
        this.customer = customer;
        this.dateDepart = dateDepart;
        this.dateRetour = dateRetour;
        this.adultNumber = adultNumber;
        this.childNumber = childNumber;
        this.breakfast = breakfast;
        this.request = request;
        this.totalPrice = totalPrice;

    

    }

    static getNextId(){
        var ordersArray = Order.getOrders();
        var maxId = -1;

        ordersArray.forEach(element => {
            if(element.orderId>maxId) maxId = element.orderId;
        });
        
        return ++maxId;
    }

    static getOrders(){
        var ordersLocalStorage = localStorage.getItem("ordersArray")
        if(ordersLocalStorage === null || ordersLocalStorage==""){
            return [];
        }
        return JSON.parse(ordersLocalStorage);
    }

    static addOrder(order){
        var ordersArray = Order.getOrders();
        ordersArray.push(order);
        var ordersAsString = JSON.stringify(ordersArray);

        localStorage.setItem("ordersArray", ordersAsString);
    }

    static getOrdersById(id){
        var ordersArray = Order.getOrders();

        var filteredArray = [];

        ordersArray.forEach(element => {
            
            if(element.userId == id){
                
                filteredArray.push(element);
            }
        });
        return filteredArray;
    }

    static removeById(id){
        var ordersArray = Order.getOrders();

        ordersArray = ordersArray.filter((order)=>{
            return order.orderId==id;
        })

        localStorage.setItem("ordersArray", JSON.stringify(ordersArray));


    }

}

export {Order}