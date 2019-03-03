class Voyage {

    constructor(id, title, description, img, price, breakfastIncluded, acceptChildren){

        this.id = id;
        this.title = title;
        this.description = description
        this.img = img
        this.price = price;
        this.breakfastIncluded = breakfastIncluded;
        this.acceptChildren = acceptChildren;

    }

    static getVoyageArray() {

        let voyageArray = [];
    
        voyageArray.push(
            new Voyage(0, "La Renaissance",
            "Envie de renaitre ? Plongez à l'époque de la renaissance pour vous redecouvrir",
            "renaissance.jpg", 100, true, true));
    
        voyageArray.push(
            new Voyage(1, "La Pré-histoire", 
            "Vous n'aimez pas vraiment le luxe mais vous voulez de l'aventure ? La pré-histoire est faite pour vous !",
            "prehistoire.jpg", 200, false, false));
    
        voyageArray.push(
            new Voyage(2, "Le Futur", 
            "Vous en avez ras le bol de vos comtemporains ? Une cure termale dans le futur c'est la seule solution pour décompresser",
            "futur.jpg", 50, true, true));
    
        voyageArray.push(
            new Voyage(3, "Le Moyen-âge", 
            "Vous en avez assez d'être trop vieux ou trop jeune ? Rejoignez le moyen âge !",
            "moyenage.jpg", 75, true, false));
    
        return voyageArray;

    }

    getTotalPrice(days, adultNumber, childNumber, breakfast){

        var basePrice = this.price;

        var totalprice = 0;

        days = parseInt(days);
        basePrice = parseFloat(basePrice);
        adultNumber = parseInt(adultNumber);
        childNumber = parseInt(childNumber);
        console.log(adultNumber);
    
        totalprice = basePrice*adultNumber // On ajoute le prix par jour des adultes
        totalprice += basePrice*childNumber*0.4 // On ajoute le prix par jour des enfants
        
        

        if(breakfast){
            totalprice += 8 * (childNumber+adultNumber) //Petit déjeuné
        }
        
        totalprice *= days // On multiplie le prix par jour obtenu par le nombre de jours
    
        return totalprice;
    }

}

export {Voyage}


