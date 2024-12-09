import { Creature } from "./creature";
import { Types } from "./types";

export class Animal extends Creature {
    private _animalType: string;
    private _isAgressive: boolean;
    constructor(name:string, lvl:number, animalType: string, isAgressive: boolean) {
        super(name, lvl, Types.animal);
        this.animalType = animalType;
        this.isAgressive = isAgressive
    }
    private set animalType(val:string) {
        this._animalType = val;
    }
    private set isAgressive(val:boolean) {
        this._isAgressive = val;
    }
    public get animalType() {
        return this._animalType;
    }
    public get isAgressive() {
        return this._isAgressive;
    }
    public info(): string {
        if (this.isAgressive) {
            return `Agressive ${this.creatureType.toLowerCase()} ${this.animalType.toLowerCase()} ${this.name} | ${this.lvl} lvl`;
        } else {
            return `Friendly ${this.creatureType.toLowerCase()} ${this.animalType.toLowerCase()} ${this.name} | ${this.lvl} lvl`
        }
    }
}
