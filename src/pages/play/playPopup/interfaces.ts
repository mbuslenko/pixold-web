import { IGetResponseHexagonInfo } from '../../../shared/ts/interfaces'
import { HexagonInfoType } from '../../../shared/ts/types'

import { IAlertProps } from '../../../components/interfaces'

export interface IPlayPopupProps {
  hexagonId: number;
  closePopupCallback: () => void;
}

export interface IPlayPopupInfoProps {
  hexagonId: number;
  hexagonInfo: IGetResponseHexagonInfo;
  changeTabCallback: (tab: string) => void;
  setModalIsVisibleCallback: (isVisible: boolean) => void;
  setAlertPropsCallback: (props: IAlertProps) => void;
}

export interface IPlayPopupLevelProps {
  hexagonInfo: IGetResponseHexagonInfo;
  setModalIsVisibleCallback: (isVisible: boolean) => void;
}

export interface IPlayPopupSettingsProps {
  hexagonInfo: IGetResponseHexagonInfo;
  changeHexagonTypeCallback: (hexagonType?: HexagonInfoType) => void;
  setAlertPropsCallback: (props: IAlertProps) => void;
}
