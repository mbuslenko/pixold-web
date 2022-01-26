import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { blockScrolling, unblockScrolling } from '../../shared/ts/helperFunctions';
import { GetResponseFaq } from '../../shared/ts/types';
import { getAxiosInstance } from '../../shared/ts/axiosInstance';

import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';

import './FaqPage.scss';
import emailSvg from '../../assets/svg/mail-icon.svg';
import telegramSvg from '../../assets/svg/telegram-icon2.svg';
import { FaqHeader } from './FaqHeader';
import { FaqTopic } from './FaqTopic';
import { HomeFooter } from '../home/HomeFooter';
import { ShowInfoModalCallback } from './types';

export const FaqPage: React.FC = () => {
  // FIXME: after canceling <Show More> -> scrolls again
  const navigate = useNavigate();
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
    getAxiosInstance(navigate)({
      requestConfig: {
        method: 'get',
        url: '/faq',
      },
      onResponse: (response: GetResponseFaq) => setFaqTopicData(response.data),
    });
  }, [navigate]);

  return (
    <section className="faq-page">
      <FaqHeader />
      <section className={`faq-page-content ${isVisibleModal && 'is-blurred'}`}>
        <h1 className="faq-heading">FAQ</h1>
        <main className="faq-topic-container">
          {faqTopicData.map(({ name, content }, index) => (
            <FaqTopic key={index} name={name} content={content} showInfoModalCallback={showInfoModal} />
          ))}
          <div className="faq-support-wrapper">
            <nav className="faq-page-support">
              <a
                href="mailto:hello@pixold.io"
                className="faq-page-support-link"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={emailSvg} alt="Email" className="faq-page-support-email-icon" />
              </a>
              <a
                href="https://t.me/pixold_help_bot"
                className="faq-page-support-link faq-page-support-link-telegram"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={telegramSvg} alt="Telegram" className="faq-page-support-telegram-icon" />
              </a>
            </nav>
          </div>
        </main>
        <HomeFooter />
      </section>
      {isVisibleModal && (
        <div className="faq-info-modal-wrapper">
          <Modal heading={modalHeading} text={modalText} className="faq-info-modal-size">
            <Button
              text="Close"
              appearance={{ priority: 'secondary', theme: 'black-white' }}
              onClick={hideInfoModal}
              className="faq-button-small"
            />
          </Modal>
        </div>
      )}
    </section>
  );
};
