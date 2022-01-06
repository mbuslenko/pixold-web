import { IGetResponseFaqContent } from '../../shared/ts/interfaces';

import { ShowInfoModalCallback } from './types';

export interface IFaqTopicProps {
  name: string;
  content: IGetResponseFaqContent[];
  showInfoModalCallback: ShowInfoModalCallback;
}

export interface IFaqQuestionProps extends IGetResponseFaqContent {
  showInfoModalCallback: ShowInfoModalCallback;
}
