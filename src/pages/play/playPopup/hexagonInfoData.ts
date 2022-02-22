import { HexagonLevelType } from '../../../shared/ts/types';
import { HexagonInfoType } from '../../../shared/ts/types';

import { ILevelNameAll } from './interfaces';

export const hexagonActionChance = {
  miner: {
    description: 'Chance to mine',
    chance: ['15%', '40%', '50%', '65%'],
  },
  attack: {
    description: 'Chance of a successful attack',
    chance: ['15%-30%', '15%-45%', '15%-60%', '15%-80%'],
  },
  defender: {
    description: 'Change of repel an attack',
    chance: ['50%', '70%', '90%', '98%'],
  },
};

export const levelNameAll: Record<HexagonLevelType, ILevelNameAll> = {
  starter: { value: 'Starter', nextValue: 'Middle', index: 0 },
  middle: { value: 'Middle', nextValue: 'Pro', index: 1 },
  pro: { value: 'Pro', nextValue: 'Supreme', index: 2 },
  supreme: { value: 'Supreme', nextValue: 'Max level', index: 3 },
};

export const typeNameAll: Record<HexagonInfoType, string> = {
  attack: 'Attacker',
  defender: 'Defender',
  miner: 'Miner',
  without: 'Without',
};

export const getActionChance = (chanceAll: string[], hexagonLevelType: HexagonLevelType) =>
  chanceAll[levelNameAll[hexagonLevelType].index];

export const getNextLevelActionChance = (chanceAll: string[], hexagonLevelType: HexagonLevelType) =>
  chanceAll[Math.min(chanceAll.length - 1, levelNameAll[hexagonLevelType].index + 1)];
