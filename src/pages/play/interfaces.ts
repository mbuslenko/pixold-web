import { IAlertProps } from '../../components/interfaces';
import { IGetResponseHexagonInfo } from '../../shared/ts/interfaces';

export interface IPlayMenuCallback {
  // TODO: refactoring
  showMyTerritoryCallback?: () => void;
}

export interface IPlayPagePopupProps {
  hexagonId?: number;
  closePopupCallback: () => void;
}

// TODO: get rid of optional type in hexagonInfo?
export interface IPlayPagePopupInfoProps {
  hexagonId: number;
  changeTabCallback: (tab: string) => void;
  setModalIsVisibleCallback: (isVisible: boolean) => void;
  setAlertPropsCallback: (props: IAlertProps) => void;
  hexagonInfo?: IGetResponseHexagonInfo;
}

export interface IPlayPagePopupLevelProps {
  setModalIsVisibleCallback: (isVisible: boolean) => void;
  hexagonInfo?: IGetResponseHexagonInfo;
}

export interface IPlayPagePopupSettingsProps {
  changeHexagonTypeCallback: (hexagonType?: string) => void;
  setAlertPropsCallback: (props: IAlertProps) => void;
  hexagonInfo?: IGetResponseHexagonInfo;
}
