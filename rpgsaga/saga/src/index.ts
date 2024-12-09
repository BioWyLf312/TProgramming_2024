import { Animal } from './animal';
import { Player } from './player';

console.log('Hello world');
const oleg = new Player('Oleg Ignatov', 228, 'Driver', 'Vibe');
const ursa = new Animal('Ursa', 1, 'Bear', true);
console.log(oleg.info());
console.log(ursa.info());
