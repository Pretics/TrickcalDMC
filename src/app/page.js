'use client'

import styles from './page.module.css';
import styled from 'styled-components';
import Image from 'next/image';

import DamageCalculatorSection from 'components/damageCalculator/damageCalculatorSection.js';
import { createRoot } from 'react-dom/client';
import { DmgCalcProvider } from 'contexts/dmgCalcContext';




const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 768px;
  position: relative;
`;
const BackgroundImageDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1500px;
  background: linear-gradient(
    to bottom, #00000000 0%, #F5F5F5 28%
  ), url('/images/background/start.png');
  background-repeat: no-repeat;
  background-size: contain;
  z-index: -100;
`

export default function Home() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.header_top}>
          <a href='https://www.trickcal.com/'>
            <div className={styles.header_logoContainer}>
              <Image className={styles.header_logoImage}
                src={require('/public/images/logo/trickcalRevive.webp').default}
                alt="trickcal_logo"
                priority
              ></Image>
            </div>
          </a>
          <h1 className={styles.header_title}>이것저것 계산기 <span style={{ fontSize: '10px' }}>v0.1</span></h1>
        </div>
        <div className={styles.header_bottom}>
          <ul>
            <li>
              <a href=''>데미지 계산기</a>
            </li>
            <li>
              <a href=''>장비 계산기</a>
            </li>
            <li>
              <a href=''>모험회</a>
            </li>
          </ul>
        </div>
      </header>

      <StyledMain>
        <BackgroundImageDiv />
        <DmgCalcProvider>
          <div className={styles.section_Container}>
            <DamageCalculatorSection />
          </div>
        </DmgCalcProvider>
      </StyledMain>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}