class User {

    constructor(username, password){
        this.userId = User.getNextId();
        this.username = username;
        this.password = password;
    }


    static getNextId(){
        var usersArray = User.getUsers();
        var maxId = -1;

        usersArray.forEach(element => {
            if(element.userId>maxId) maxId = element.userId;
        });
        
        return ++maxId;
    }


    static getUsers(){
        var usersLocalStorage = localStorage.getItem("usersArray")
        if(usersLocalStorage === null || usersLocalStorage==""){
            return []
        }
        return JSON.parse(usersLocalStorage);
    }

    static addUser(user){
        var usersArray = User.getUsers();
        usersArray.push(user);
        var usersAsString = JSON.stringify(usersArray);

        localStorage.setItem("usersArray", usersAsString);
    }

    //Ajout de quelques users au localStorage
    static setMocksUser(){
        User.addUser(new User("usr", "pwd"));
        User.addUser(new User("toto", "tata"));
        User.addUser(new User("foo", "bar"))
    }

    static setLoggedUser(user){
        localStorage.setItem("loggedUser", JSON.stringify(user));
    }

    static getLoggedUser(){
        return JSON.parse(localStorage.getItem("loggedUser"));
    }

    

}

export {User}