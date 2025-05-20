const [KnightName, strenght, magic, createButton] = document.querySelectorAll("#form-container > input");
const form = document.getElementById("form-container")
const Knights = document.querySelector(".knightsContainer");
const [action, attaquant, cible,actionButton] = document.querySelectorAll("#action, #attaquant, #cible, #agir");

const listChevalier = [];

let message = document.getElementById("event");




class Chevalier{
    constructor(name,strength,magic){
        this.name = name;
        this.strength = strength;
        this.magic = magic;
        this.life = 100;
        this.mana = 50;
        this.potions = 2;
    }
    shout(){
        message.innerHTML += `Je m'appelle ${this.name}<br>`

    }
    
    attack(cible){
        if(this.isDead()){
            message.innerHTML += `${this.name} est mort !<br>`
            return
            
        }
        message.innerHTML = `${this.name} attaque ${cible.name} à l'épée !`
        cible.getDamages(this.strength)
        
    }

    magicAttack(cible){
        if(this.isDead()){
            message.innerHTML += `${this.name} est mort !<br>`
            return   
        }
        if (this.mana > 20){
            this.mana -= 20;
            message.innerHTML = `${this.name} attaque ${cible.name} avec une boule de feu !<br>`;
              
        }
        else{
            
            message.innerHTML += `${this.name} n'a plus assez de mana !<br>`
        }
        
    }
    takePotion(){
        if(this.isDead()){
            message.innerHTML += `${this.name} est mort !<br>`
            return
            
        } 
        if (this.potions <= 0)
            return false
        if (this.life + 30 > 100){
            this.life = 100;
            this.potions -= 1;
            message.innerHTML += `${this.name} a utilisé une potion !<br>`
            
        }
        else{
            this.life += 30;
        }
    }
    isDead(){
        if(this.life <= 0){
            message.innerHTML += `${this.name} est mort !<br>`
            return true
            
        }
            
        
    }
    getDamages(strenght){
        this.life -= strenght;
        if(this.isDead()){
            message.innerHTML += `${this.name} est mort !<br>`
            this.life = 0;
        }
    }
    
}

function resetForm(){
    KnightName.value = '';
    strenght.value = '';
    magic.value = '';
}

function fillInfo(knight,container){
    
    let name = document.createElement("span");
    let force = document.createElement("span");
    let magie = document.createElement("span");
    let mana = document.createElement("span");
    let vie = document.createElement("span");
    let  div = document.createElement("div");
    div.classList.add("lifebarcontenair")
    let red = document.createElement("div");
    red.classList.add("redLife");
    red.style.width = `${knight.life}%`
    div.append(red);

    
    name.innerHTML =`${knight.name}` ;
    force.innerHTML =`💪 Force : ${knight.strength}` ;
    magie.innerHTML =`🧙‍♂️ Magie : ${knight.magic}`;
    mana.innerHTML = `🔮 Mana : ${knight.mana}`;
    vie.innerHTML = `❤ Vie : ${knight.life}`


    
    container.append(name);
    container.append(force);
    container.append(magie);
    container.append(mana);
    container.append(vie);
    container.append(div);

}

function display(){
    Knights.innerHTML = "";
    attaquant.innerHTML ="";
    cible.innerHTML = "";
    listChevalier.forEach((knight,index)=> {
        let container = document.createElement("div");
        container.classList.add("KnightInfo");
        if (knight.isDead()){
            container.classList.add("dead");
        }
        fillInfo(knight,container);
        Knights.append(container);
        if (knight.isDead()){
            container.classList.add("dead");
            
        }
        else{
        let option = document.createElement("option");
        option.innerHTML = `${knight.name}`;
        option.setAttribute("value", index );
        option.setAttribute("data-index", index );
        attaquant.append(option.cloneNode(true));
        cible.append(option.cloneNode(true));
        }
        

    })
 
}



createButton.addEventListener("click",(e) =>{
    e.preventDefault();
    if(!KnightName.value || !strenght.value || !magic.value) {
        alert("Veuillez remplir tout les champs !")
        return
    }

    listChevalier.push(new Chevalier(KnightName.value,strenght.value,magic.value));

    display();
    resetForm();
    
    
    
})



actionButton.addEventListener("click",(event) =>{
    event.preventDefault();

    

    if (listChevalier[attaquant.value] ==  listChevalier[cible.value]){
        message.innerHTML += `${listChevalier[attaquant.value].name} ne peut pas s'attaquer lui même !<br>`;
        return;
    }

    listChevalier[attaquant.value].shout();

    if(action.value == "atq"){
        listChevalier[attaquant.value].attack(listChevalier[cible.value]);
        
    }
    if(action.value == "atqMag"){
        listChevalier[attaquant.value].magicAttack(listChevalier[cible.value]);
        
    }
     if(action.value == "potion"){
        listChevalier[attaquant.value].takePotion();
        
    }
    display();
})
















