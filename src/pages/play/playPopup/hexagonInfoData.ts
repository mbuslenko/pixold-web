import { HexagonLevel } from '../../../shared/ts/interfaces';

export const hexagonLevelInfo = {
  miner: {
    description: 'Chance to mine',
    levelAll: ['15%', '40%', '50%', '65%'],
  },
  attack: { description: 'Chance of a successful attack', levelAll: ['15%-30%', '15%-45%', '15%-60%', '15%-80%'] },
  defender: { description: 'Change of repel an attack', levelAll: ['50%', '70%', '90%', '98%'] },
};

export const levelNameAll: Record<keyof typeof HexagonLevel, string> = {
  starter: 'Starter',
  middle: 'Middle',
  pro: 'Pro',
  supreme: 'Supreme',
};

export const getNextItem = (array: any[], index: number) => array[Math.min(array.length - 1, index + 1)];
