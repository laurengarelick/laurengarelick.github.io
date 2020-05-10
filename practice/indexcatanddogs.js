class Pet {
    constructor(name,age,color,breed,type){
        this.name = name,
        this.age = age,
        this.color = color,
        this.breed = breed,
        this.type = type,
        this.hungry = false
    }
    makeSound = function(){this.type === 'cat' ? console.log("MEOW!") : console.log("WOOF!")};
    feed = function(){
        if(this.hungry){
            console.log('thank you for feeding me human!');
            this.hungry = false;
        }else{
            console.log('IM NOT HUNGRY!');
        }
    };
    play =function(){
        console.log(`${this.name} is hungry from playing!`);
        this.hungry = true;
    };
}




class Cat extends Pet {
    constructor(name,age,color,breed){
        super(name,age,color,breed,'cat')
    }
}

class Dog extends Pet {
    constructor(name,age,color,breed){
        super(name,age,color,breed,'dog')
    }
}





const pet1 = new Cat('Kevin',2,'calico', 'persian') 
const pet2 = new Cat('James', 3, 'white','tabby cat')
const pet3 = new Dog('Licky',5, 'brown', "chihuahua")

console.log(pet1);
pet1.makeSound();
pet1.feed();
pet1.play();
pet1.feed();
console.log(pet2)
console.log(pet3)
pet3.makeSound()
