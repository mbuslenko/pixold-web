export interface IFaqTopicDataContent {
  question: string;
  answer: string;
}

export interface IFaqTopicData {
  id: string;
  name: string;
  content: IFaqTopicDataContent[];
}

export interface IFaqTopicProps {
  name: string;
  content: IFaqTopicDataContent[];
}
