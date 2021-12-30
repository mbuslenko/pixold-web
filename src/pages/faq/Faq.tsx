import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { blockScrolling, unblockScrolling } from '../../shared/ts/helperFunctions';
import { GetResponseFaq } from '../../shared/ts/types';
import { useAxiosInstance } from '../../shared/ts/axiosInstance';

import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';

import './Faq.scss';
import { FaqHeader } from './FaqHeader';
import { FaqTopic } from './FaqTopic';
import { Footer } from '../home/Footer';
import { ShowInfoModalCallback } from './types';

export const Faq: React.FC = () => {
  const request = useAxiosInstance(useNavigate());
  const [faqTopicData, setFaqTopicData] = useState<GetResponseFaq['data']>([]);
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

  useEffect(() => {
    request({
      requestMethod: 'get',
      requestUrl: '/faq',
      onResponse: response => setFaqTopicData(response.data),
    });
  }, []);

  return (
    <section className="faq-page">
      <FaqHeader />
      <section className={`faq-page-content ${isVisibleModal && 'is-blurred'}`}>
        <h1 className='faq-heading'>FAQ</h1>
        <div className='faq-topic-container'>
          {faqTopicData.map(({ name, content }, index) => (
            <FaqTopic key={index} name={name} content={content} showInfoModalCallback={showInfoModal} />
          ))}
        </div>
        <Footer />
      </section>
      { isVisibleModal &&
        <div className='faq-info-modal-wrapper'>
          <Modal
            heading={modalHeading}
            text={modalText}
            addedClasses='faq-info-modal-size'
          >
            <Button
              text='Close'
              appearance={{ priority: 'secondary', theme: 'black-white' }}
              onClick={hideInfoModal}
              addedClasses='faq-button-small'
            />
          </Modal>
        </div>
      )}
    </section>
  );
};
