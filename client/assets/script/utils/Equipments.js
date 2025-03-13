export class Equipment {
    /**
     * Equipment avec un type, un nom, une image et des points de caracteristique (-10 10)  
     * @param {string} type 
     * @param {string} name 
     * @param {string} src 
     * @param {int} strength 
     * @param {int} stamina 
     * @param {int} agility 
     */
    constructor(type, name, src, strength, stamina, agility) {
        this.type = type;
        this.name = name;
        this.src = "../assets/img/" + src;
        this.strength = strength ?? 0;
        this.stamina = stamina ?? 0;
        this.agility = agility ?? 0;
    }
}

export class Head extends Equipment {
    constructor(name, src, strength, stamina, agility) {
        super("Head", name, src, strength, stamina, agility)
    }
}

export class Torso extends Equipment {
    constructor(name, src, strength, stamina, agility) {
        super("Torso", name, src, strength, stamina, agility)
    }
}

export class Pants extends Equipment {
    constructor(name, src, strength, stamina, agility) {
        super("Pants", name, src, strength, stamina, agility)
    }
}


export class Shoes extends Equipment {
    constructor(name, src, strength, stamina, agility) {
        super("Shoes", name, src, strength, stamina, agility)
    }
}