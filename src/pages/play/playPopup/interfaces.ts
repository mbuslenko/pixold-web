import { IGetResponseHexagonInfo } from '../../../shared/ts/interfaces';
import { HexagonInfoType } from '../../../shared/ts/types';

export interface IPlayPopupProps {
  hexagonId: number;
  closePopupCallback: () => void;
  drawAttackLineCallback: () => void;
  stopAttackLineCallback: () => void;
}

export interface IPlayPopupInfoProps {
  hexagonId: number;
  hexagonInfo: IGetResponseHexagonInfo;
  changeTabCallback: (tab: string) => void;
  // TODO: make change hexagonInfo prop
  changeCoinsInStorageCallback: (coinsInStorage: number) => void;
  changeHealthCallback: (health: number) => void;
  setModalIsVisibleCallback: (isVisible: boolean) => void;
  drawAttackLineCallback: () => void;
}

export interface IPlayPopupLevelProps {
  hexagonInfo: IGetResponseHexagonInfo;
  setModalIsVisibleCallback: (isVisible: boolean) => void;
}

export interface IPlayPopupSettingsProps {
  hexagonInfo: IGetResponseHexagonInfo;
  changeHexagonTypeCallback: (hexagonType?: HexagonInfoType) => void;
}
