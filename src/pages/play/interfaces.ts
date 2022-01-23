import { IGetResponseHexagonInfo } from '../../shared/ts/interfaces';

export interface IPlayPagePopupProps {
  hexagonId: number;
  hexagonInfo: IGetResponseHexagonInfo;
  closePopupCallback: () => void;
}

export interface PlayPagePopupInfoProps {
  hexagonId: number;
}
