import { useState } from 'react';

import { blockScrolling, unblockScrolling } from '../../shared/ts/helperFunctions';

import { Button } from '../../components/ui-kit/button/Button';
import { Modal } from '../../components/ui-kit/modal/Modal';
import { AxiosInstance } from '../../components/AxiosInstance';

import './Faq.scss';
import { FaqHeader } from './FaqHeader';
import { FaqTopic } from './FaqTopic';
import { Footer } from '../homepage/Footer';
import { IFaqTopicData } from './interfaces';
import { ShowInfoModalCallback } from './types';

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
      <AxiosInstance
        requestMethod='get'
        requestUrl='/faq'
        responseCallback={response => setFaqTopicData(response.data)}
        errorCallback={error => console.error(`ERROR: ${error.message}`)}
      />
    </section>
  );
};
