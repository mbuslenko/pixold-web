import { IGetResponseHexagonInfo } from '../../../shared/ts/interfaces';
import { HexagonInfoType } from '../../../shared/ts/types';

export interface IPlayPopupProps {
  hexagonId: number;
  hexagonInfo: IGetResponseHexagonInfo | null;
  setHexagonInfo: (newHexagonInfo: IGetResponseHexagonInfo) => void;
  closePopupCallback: () => void;
  drawAttackLineCallback: (hexagonId: number) => void;
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

export interface IPlayPopupInfoMaintenanceProps {
  heading: string;
  text: string;
  buttonText: string;
  buttonClassName: string;
  isDisabledButton: boolean;
  buttonCallback: () => void;
}

export interface IPlayPopupLevelProps {
  hexagonInfo: IGetResponseHexagonInfo;
  setModalIsVisibleCallback: (isVisible: boolean) => void;
}

export interface IPlayPopupSettingsProps {
  hexagonInfo: IGetResponseHexagonInfo;
  changeHexagonTypeCallback: (hexagonType?: HexagonInfoType) => void;
}

export interface ILevelNameAll {
  value: string;
  nextValue: string;
  index: number;
}
