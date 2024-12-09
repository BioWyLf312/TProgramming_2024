import { Creature } from "./creature";
import { Types } from "./types";

export class Player extends Creature {
    private _playerClass: string;
    private _weapon: string;
    constructor(name:string, lvl:number, playerClass: string, weapon: string) {
        super(name, lvl, Types.player);
        this.weapon = weapon;
        this.playerClass = playerClass;
    }
    private set playerClass(val:string) {
        this._playerClass = val;
    }
    private set weapon(val:string) {
        this._weapon = val;
    }
    public get playerClass() {
        return this._playerClass;
    }
    public get weapon() {
        return this._weapon;
    }
    public info(): string {
        return `${this.creatureType} ${this.playerClass.toLowerCase()} ${this.name} | ${this.lvl} lvl | Weapon: ${this.weapon}`
    }
}