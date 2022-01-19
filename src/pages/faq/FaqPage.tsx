import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { blockScrolling, unblockScrolling } from '../../shared/ts/helperFunctions';
import { GetResponseFaq } from '../../shared/ts/types';
import { getAxiosInstance } from '../../shared/ts/axiosInstance';

import { Button } from '../../components/button/Button';
import { Modal } from '../../components/modal/Modal';

import './FaqPage.scss';
import { FaqHeader } from './FaqHeader';
import { FaqTopic } from './FaqTopic';
import { HomeFooter } from '../home/HomeFooter';
import { ShowInfoModalCallback } from './types';
import emailSvg from '../../assets/svg/mail-btn.svg';
import telegramSvg from '../../assets/svg/telegram-btn.svg';

export const FaqPage: React.FC = () => {
  const navigate = useNavigate();
  const [faqTopicData, setFaqTopicData] = useState<GetResponseFaq['data']>([]);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');

  const [linkHref, setLinkHref] = useState<string>('');
  const linkRef = useRef<HTMLAnchorElement>(null);

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
      onResponse: (response: GetResponseFaq) => {
        setFaqTopicData(response.data);

        // TODO: change reflink
        setLinkHref('#PXL CoinThere are question header');
        linkRef.current?.click();
      },
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
              <a href="mailto:hello@pixold.io" target="_blank" rel="noreferrer noopener">
                <img src={emailSvg} alt="Email" className="faq-page-support-email-icon" />
              </a>
              <a href="https://t.me/pixold_help_bot" target="_blank" rel="noreferrer noopener">
                <img src={telegramSvg} alt="Telegram" className="faq-page-support-telegram-icon" />
              </a>
            </nav>
          </div>
          <a href={linkHref} ref={linkRef} className="invisible-link">
            Link to question
          </a>
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
