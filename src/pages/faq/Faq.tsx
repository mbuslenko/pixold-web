import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

import { blockScrolling, unblockScrolling } from '../../shared/ts/helperFunctions';

import { Button } from '../../components/ui-kit/button/Button';
import { Modal } from '../../components/ui-kit/modal/Modal';
import { useAxiosInstance } from '../../components/AxiosInstance';

import './Faq.scss';
import { FaqHeader } from './FaqHeader';
import { FaqTopic } from './FaqTopic';
import { Footer } from '../homepage/Footer';
import { ShowInfoModalCallback } from './types';
import { GetResponseFaq } from '../../shared/ts/types';

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
      responseCallback: response => setFaqTopicData(response.data),
    });
  }, []);

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
