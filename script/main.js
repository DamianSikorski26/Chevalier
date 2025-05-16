const [OneThenTwo, KnightName, strenght,magic,createButton] = document.querySelectorAll("#form-container > *");
const form = document.getElementById("form-container")
const Knights = document.querySelector(".Knights");
const info1 = document.querySelector("#Chevalier1 .KnightInfo");
const info2 = document.querySelector("#Chevalier2 .KnightInfo");

console.log(info1);
console.log(info2);

let chevalier1;
let chevalier2;


class Chevalier{
    constructor(name,strength,magic){
        this.name = name;
        this.strength = strength;
        this.magic = magic;
        this.life = 100;
        this.mana = 50;
        this.potions = 2;
    }

    magicAttack(cible){
        this.mana -= 20;
        cible.life -= this.magic;
        cible.getDamages()

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
    let  div = document.createElement("div.lifeBarCOntenair");
    let red = document.createElement("div.redLife");
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



createButton.addEventListener("click",(e) =>{
    e.preventDefault();
    if(!KnightName.value || !strenght.value || !magic.value) {
        alert("Veuillez remplir tout les champs !")
        return
    }

    if(chevalier1 == undefined){
        chevalier1 = new Chevalier(KnightName.value,strenght.value,magic.value);
        resetForm()
        OneThenTwo.innerHTML = "Créer le 2ème Chevalier:"
        return
    }
    else{
        chevalier2 = new Chevalier(KnightName.value,strenght.value,magic.value);
        resetForm()
        form.style.display = "none";
        fillInfo(chevalier1,info1);
        fillInfo(chevalier2,info2);
        Knights.classList.remove("dnone");


    }


})










