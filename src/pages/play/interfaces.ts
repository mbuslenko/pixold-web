import { IAlertProps } from '../../components/interfaces';
import { IGetResponseHexagonInfo } from '../../shared/ts/interfaces';
import { HexagonInfoType } from '../../shared/ts/types';

export interface IPlayMenuCallback {
  // TODO: refactoring
  showMyTerritoryCallback?: () => void;
}

export interface IPlayPagePopupProps {
  hexagonId: number;
  closePopupCallback: () => void;
}

// TODO: get rid of optional type in hexagonInfo?
export interface IPlayPagePopupInfoProps {
  hexagonId: number;
  hexagonInfo: IGetResponseHexagonInfo;
  changeTabCallback: (tab: string) => void;
  setModalIsVisibleCallback: (isVisible: boolean) => void;
  setAlertPropsCallback: (props: IAlertProps) => void;
}

export interface IPlayPagePopupLevelProps {
  hexagonInfo: IGetResponseHexagonInfo;
  setModalIsVisibleCallback: (isVisible: boolean) => void;
}

export interface IPlayPagePopupSettingsProps {
  hexagonInfo: IGetResponseHexagonInfo;
  changeHexagonTypeCallback: (hexagonType?: HexagonInfoType) => void;
  setAlertPropsCallback: (props: IAlertProps) => void;
}
