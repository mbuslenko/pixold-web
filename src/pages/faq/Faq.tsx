import { FaqHeader } from './FaqHeader';
import { IFaqTopicData } from './interfaces';
import './Faq.scss';
import { FaqTopic } from './FaqTopic';
import { Footer } from '../homepage/Footer';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui-kit/button/Button';
import { Modal } from '../../components/ui-kit/modal/Modal';
import { ShowInfoModalCallback } from './types';
import axios from 'axios';

const testData: IFaqTopicData[] = [{ "id":"6b85f82e-491f-41e6-ab40-d7ab845b5b33","name":"Account","content":[{ "question":"There are question header","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat." },{ "question":"There are question header","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus." },{ "question":"There are question header","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat." }] },{ "id":"28a8892c-0ed4-45d5-b2c4-978fb96de163","name":"Gameplay","content":[{ "question":"There are question header","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat." },{ "question":"There are question header","answer":"Lorem ipsum dolor sit amet\n" },{ "question":"There are question header","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat.\n" }] },{ "id":"3562d0fa-d423-474b-9b00-16530d65893b","name":"PXL Coin","content":[{ "question":"There are question header","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat." },{ "question":"There are question header","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat." },{ "question":"There are question header","answer":"Lorem ipsum dolor" },{ "question":"There are question header","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat." }] },{ "id":"0f5a7110-3aad-4120-bd90-004ed8ed3820","name":"Other","content":[{ "question":"There are question header","answer":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit ultricies aliquam quis in accumsan, vel ut. Posuere suscipit neque scelerisque libero. Quisque ipsum tristique arcu velit facilisi nec lectus. Commodo sed elementum congue consequat." }] }];

export const Faq: React.FC = () => {
  const [faqTopicData, setFaqTopicData] = useState<IFaqTopicData[]>(testData);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');

  const showInfoModal: ShowInfoModalCallback = (modalHeading, modalText) => {
    setModalHeading(modalHeading);
    setModalText(modalText);
    setIsVisibleModal(true);
  };

  // useEffect(() => {
  //   axios
  //     .get('https://pixold.azurewebsites.net/faq')
  //     .then(response => setFaqTopicData(response.data))
  //     .catch(error => console.error([`ERROR: ${error.message}`, 'Response data:', faqTopicData]));
  // });

  return (
    <section className='faq-page'>
      <FaqHeader />
      <section className={`faq-page-content ${isVisibleModal && 'is-blurred'}`}>
        <h1 className='page-heading'>FAQ</h1>
        <div className='faq-topic-container'>
          {faqTopicData.map(({ name, content }, index) => (
            <FaqTopic
              key={index}
              name={name}
              content={content}
              showInfoModalCallback={showInfoModal}
            />
          ))}
        </div>
        <Footer />
      </section>
      { isVisibleModal &&
        <Modal
          heading={modalHeading}
          text={modalText}
        >
          <Button
            text='Close'
            priority='secondary'
            className='faq-secondary-button-color'
            onClick={() => setIsVisibleModal(false)}
          />
        </Modal>
      }
    </section>
  );
};
