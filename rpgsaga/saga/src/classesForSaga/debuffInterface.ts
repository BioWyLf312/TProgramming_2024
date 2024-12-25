import { Character } from './character';

export interface Debuff {
  name: string;
  duration: number;
  effect: (character: Character) => void;
  affectsAttack: boolean;
}
