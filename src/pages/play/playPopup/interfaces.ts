import { IGetResponseHexagonInfo } from '../../../shared/ts/interfaces';
import { HexagonInfoType } from '../../../shared/ts/types';

export interface IPlayPopupProps {
  hexagonId: number;
  closePopupCallback: () => void;
}

export interface IPlayPopupInfoProps {
  hexagonId: number;
  hexagonInfo: IGetResponseHexagonInfo;
  changeTabCallback: (tab: string) => void;
  setModalIsVisibleCallback: (isVisible: boolean) => void;
}

export interface IPlayPopupLevelProps {
  hexagonInfo: IGetResponseHexagonInfo;
  setModalIsVisibleCallback: (isVisible: boolean) => void;
}

export interface IPlayPopupSettingsProps {
  hexagonInfo: IGetResponseHexagonInfo;
  changeHexagonTypeCallback: (hexagonType?: HexagonInfoType) => void;
}
