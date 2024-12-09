import { Animal } from "../src/animal";
import { Types } from "../src/types";

describe('Example', () => {
    let ursa:Animal;
    beforeEach(() => {
        ursa = new Animal("Ursa", 14, "Bear", true);
    });
    it('should create class instance with correct properties', () => {
      expect(ursa.name).toBe('Ursa');
      expect(ursa.lvl).toBe(14);
      expect(ursa.animalType).toBe('Bear');
      expect(ursa.isAgressive).toBe(true);
      expect(ursa.creatureType).toBe(Types.animal);
    });
    it('test of info method', () => {
        expect(ursa.info()).toBe('Agressive animal bear Ursa | 14 lvl');
    });
  });
  