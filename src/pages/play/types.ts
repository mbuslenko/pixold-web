import { IAlertProps } from '../../components/interfaces';

export type PlayShowAlertCallback = Omit<IAlertProps, 'closeAlertCallback'> | null;
