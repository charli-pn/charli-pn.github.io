import { Voyage } from './voyage.js';


const destinationsCards = document.getElementById("destinations-cards");
const filtersForm = document.getElementById("filters");

const maxPriceInput = document.getElementById("maxPrice");
const minPriceInput = document.getElementById("minPrice");

const breakfastIncludedInput = document.getElementById("breakfastIncluded");
const acceptChildrenInput = document.getElementById("acceptChildren");

window.onload = function () {
    main();
};

function main(){
    const voyageArray = Voyage.getVoyageArray();
    
    filtersForm.onchange = function (){
        let filteredVoyages = filterVoyages(voyageArray)
        if(filteredVoyages.length===0){
            printNotFound()
        } else {
            printCards(filteredVoyages);
        }
    }

    filtersForm.dispatchEvent(new Event('change'));
    

    
}

function filterVoyages(voyageArray){

    let maxPrice = maxPriceInput.value;
    let minPrice = minPriceInput.value;
    let breakfastIncluded = breakfastIncludedInput.checked;
    let acceptChildren = acceptChildrenInput.checked;

    let filteredArray = []
    for (let i=0; i<voyageArray.length; i++){
        if(checkVoyageIsCompatible(voyageArray[i], minPrice, maxPrice, breakfastIncluded, acceptChildren)){
            
            filteredArray.push(voyageArray[i]);
        }
    }
    return filteredArray;
}

function checkVoyageIsCompatible(voyage, minPrice, maxPrice, breakfastIncluded, acceptChildren){

    if(minPrice && voyage.price < minPrice) return false;
    if(maxPrice && voyage.price > maxPrice) return false;
    if(breakfastIncluded && !voyage.breakfastIncluded) return false;
    if(acceptChildren && !voyage.acceptChildren) return false;

    return true;


}

function printCards(voyageArray){
    let voyagesCardHTML = "";
    for (let i=0; i<voyageArray.length; i++){
        voyagesCardHTML += generateVoyageCardHTML(voyageArray[i]);
    }
    destinationsCards.innerHTML =voyagesCardHTML;
}

function printNotFound(){
    destinationsCards.innerHTML ="Aucun voyage ne correspond à votre recherche";
}

function generateVoyageCardHTML(voyage){

    let cardHtml = "<div class=\"card\">"
    cardHtml+= "<div class=\"card-image\">"
    cardHtml+= "<img src=\"img/"+voyage.img+"\">"
    cardHtml+= "</div>"
    cardHtml+= "<div class=\"card-content\">"
    cardHtml+= "<h3>"+voyage.title+"</h3>"
    cardHtml+= "<p>"+voyage.description+"</p>"
    cardHtml+= "<p>Prix : "+voyage.price+"</p>"
    cardHtml+= "<p>Petit-déjeuner: "+(voyage.breakfastIncluded ? "Oui" : "Non")+"</p>"
    cardHtml+= "<p>Enfants acceptés : "+(voyage.acceptChildren ? "Oui" : "Non")+"</p>"
    cardHtml+= "</div>"
    cardHtml+= "<div class=\"card-action\">"
    cardHtml+= "<a href=\"reservation.html?voyageId="+voyage.id+"\">Réserver</a>"
    cardHtml+= "</div>"
    cardHtml+= "</div>"

    return cardHtml;
}

