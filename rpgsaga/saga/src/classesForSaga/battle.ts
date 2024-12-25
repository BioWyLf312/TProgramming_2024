import { Ability } from './ability';
import { Character } from './character';
import { CharacterFactory } from './characterFactory';

export class Battle {
  private players: Character[];

  constructor(characterCount: number) {
    if (characterCount % 2 !== 0) {
      throw new Error('Player count must be even.');
    }

    this.players = Array.from({ length: characterCount }, () => CharacterFactory.createRandomCharacter());
  }

  private handler(message: string) {
    console.log(message);
  }

  static fight(player1: Character, player2: Character, handler: (message: string) => void): string {
    while (player1.health > 0 && player2.health > 0) {
      player1.updateDebuffs();
      const result1 = player1.canAttack
        ? Math.random() > 0.5
          ? player1.attack(player2)
          : player1.useAbility(
              player2,
              player1.abilities[0] || ({ name: '', usageLimit: 0, effect: () => ({}) } as unknown as Ability),
            )
        : `${player1.name} is stunned and cannot act!`;

      handler(result1);

      if (player2.health <= 0) {
        handler(`${player2.name} is defeated!`);
        return `${result1} ${player2.name} is defeated!`;
      }

      player2.updateDebuffs();
      const result2 = player2.canAttack
        ? Math.random() > 0.5
          ? player2.attack(player1)
          : player2.useAbility(
              player1,
              player2.abilities[0] || ({ name: '', usageLimit: 0, effect: () => ({}) } as unknown as Ability),
            )
        : `${player2.name} is stunned and cannot act!`;

      handler(result2);

      if (player1.health <= 0) {
        handler(`${player1.name} is defeated!`);
        return `${result2} ${player1.name} is defeated!`;
      }
    }
    return '';
  }
  start() {
    this.handler('Battle Start!');
    while (this.players.length > 1) {
      const [player1, player2] = this.players.splice(0, 2);

      this.handler(`\n${player1.name} VS ${player2.name}`);
      const result = Battle.fight(player1, player2, this.handler);
      this.handler(result);

      const winner = player1.health > 0 ? player1 : player2;
      winner.restoreHealth();
      winner.refreshAbilities();
      this.players.push(winner);

      this.handler(`Winner: ${winner.name}`);
    }

    this.handler(`\nFinal Winner: ${this.players[0].name}`);
  }
}
