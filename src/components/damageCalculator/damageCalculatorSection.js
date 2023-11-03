import styles from './damageCalculatorSection.module.css';
import CustomChartHorizontal from 'components/damageCalculator/customChartH';
import ImageBox from 'components/damageCalculator/characterImageBox';
import ChartSettingBox from './chartSettingBox/chartSettingBox';

import originalDB from 'assets/characterData.js';
import { useDmgCalcContext } from 'hooks/useDmgCalcContext';
import { arrayDeepCopy } from 'utils/deepCopy';
import { useEffect } from 'react';




const DamageCalculatorSection = () => {
  return (
    <>
      <section className={styles.chartSection}>
        <h2 style={{
          fontFamily: 'OneMobilePop', fontSize: 30, fontWeight: 400, marginBottom: 20, marginLeft: 10,
          WebkitTextStroke: '2px #292B33',
        }}>데미지 계산기</h2>
        <div className={styles.chartWindow}>
          <div className={styles.chartWindow_top}>
            <h4 className={styles.chartWindow_top_title}>데미지 그래프</h4>
          </div>
          <div className={styles.chartWindow_bottom}>
            <CustomChartHorizontal />
          </div>
        </div>
      </section>

      <section className={styles.imageBoxSection}>
        <div className={styles.imageBoxWindow}>
          <div className={styles.imageBoxWindow_top}>
            <h4 className={styles.imageBoxWindow_top_title}>등록된 사도 목록</h4>
          </div>
          <div className={styles.imageBoxWindow_bottom}>
            <div className={styles.imageBoxContainer}>
              <ImageBox />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.settingSection}>
        <div className={styles.settingWindow}>
          <div className={styles.settingWindow_top}>
            <h4 className={styles.settingWindow_top_title}>변수 세팅</h4>
          </div>
          <div className={styles.settingWindow_bottom}>
            <ChartSettingBox />
          </div>
        </div>
      </section>
    </>
  );
}

export default DamageCalculatorSection;