import { Animal } from './animal';
import { Battle } from './classesForSaga/battle';
import { CharacterFactory } from './classesForSaga/characterFactory';
import { Abilities } from './classesForSaga/weaponsAndAbilities';
import { Player } from './player';

console.log('Hello world');
const oleg = new Player('Oleg Ignatov', 228, 'Driver', 'Vibe');
const ursa = new Animal('Ursa', 1, 'Bear', true);
console.log(oleg.info());
console.log(ursa.info());

let ignat = CharacterFactory.createCustomCharacter("Ignat", "Archer", "sword", { physical: 50, magic:10 }, [Abilities[0]]);
console.log(ignat.getInfo());

const battle = new Battle(4);
battle.start();
