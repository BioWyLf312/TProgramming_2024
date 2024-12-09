import { Types } from './types';

export abstract class Creature {
  private _cretureType: Types;
  private _name: string;
  private _lvl: number;
  constructor(name: string, lvl: number, type: Types) {
    this.name = name;
    this.lvl = lvl;
    this.creatureType = type;
  }
  protected set name(val: string) {
    this._name = val;
  }
  protected set lvl(val: number) {
    if (val > 0) {
      this._lvl = val;
    } else {
      throw new Error('Lvl must be more then 0');
    }
  }
  protected set creatureType(val: Types) {
    this._cretureType = val;
  }
  public get name() {
    return this._name;
  }
  public get lvl() {
    return this._lvl;
  }
  public get creatureType() {
    return this._cretureType;
  }
  abstract info(): unknown;
}
