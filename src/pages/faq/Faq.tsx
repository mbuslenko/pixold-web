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
import { blockScrolling, unblockScrolling } from '../../shared/ts/helperFunctions';

export const Faq: React.FC = () => {
  const [faqTopicData, setFaqTopicData] = useState<IFaqTopicData[]>([]);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');

  const showInfoModal: ShowInfoModalCallback = (modalHeading, modalText) => {
    blockScrolling();
    setModalHeading(modalHeading);
    setModalText(modalText);
    setIsVisibleModal(true);
  };

  const hideInfoModal = (): void => {
    setIsVisibleModal(false);
    unblockScrolling();
  };

  useEffect(
    () => {
      axios
        .get('https://pixold.azurewebsites.net/faq')
        .then(response => setFaqTopicData(response.data))
        .catch(error => console.error([`ERROR: ${error.message}`]));
    },
    [],
  );

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
        <div className='info-modal-wrapper'>
          <Modal
            heading={modalHeading}
            text={modalText}
            sizeClassName='info-modal-size'
          >
            <Button
              text='Close'
              priority='secondary'
              className='faq-secondary-button-color'
              onClick={hideInfoModal}
            />
          </Modal>
        </div>
      }
    </section>
  );
};
