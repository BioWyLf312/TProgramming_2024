import { Player } from "../src/player";
import { Types } from "../src/types";

describe('Example', () => {
    let oleg:Player;
    beforeEach(() => {
        oleg = new Player("Oleg", 20, "Warrior", "Sword")
    });
    it('should create class instance with correct properties', () => {
      expect(oleg.name).toBe('Oleg');
      expect(oleg.lvl).toBe(20);
      expect(oleg.playerClass).toBe('Warrior');
      expect(oleg.weapon).toBe("Sword");
      expect(oleg.creatureType).toBe(Types.player);
    });
    it('test of info method', () => {
        expect(oleg.info()).toBe('Player warrior Oleg | 20 lvl | Weapon: Sword');
    });
  });
  