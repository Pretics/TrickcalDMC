'use client'

//#region ChartImport
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);
//#endregion ChartImport

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from './customChartH.module.css';
import { useDmgCalcContext } from 'hooks/useDmgCalcContext';
import { deepCopy } from 'utils/deepCopy';

import { statType, attackType } from 'utils/basicValueNames';
import { Parser } from 'expr-eval';



let imageWidth = 40;


const CriSettingDiv = styled.div`
  padding: 5px;
  position: absolute; 
  top: -80px;
  right: 0;
  width: 170px;
  height: 40px;

  display: flex;
  align-items: center;

  background-color: #E9F5CF;
  border: 2px solid #D7EFA3;

  color: black;
  font-family: 'OneMobilePop';
  font-weight: 100;

  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
`
const CriSettingLabel = styled.label`
  &:hover {
    cursor: pointer;
  }
`
const CriSettingCheck = styled.input`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
`
const SkillLevelDiv = styled.div`
  padding: 5px;
  position: absolute; 
  top: -42px;
  right: 0;
  width: 170px;
  height: 40px;

  display: flex;
  align-items: center;

  background-color: #E9F5CF;
  border: 2px solid #D7EFA3;

  color: black;
  font-family: 'OneMobilePop';
  font-weight: 100;

  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
`
const SkillLevelSpan = styled.span`
  margin-right: 5px;
  width: 150px;
  text-align: center;
`
const SkillLevelInput = styled.input`
  width: 50px;
  height: 20px;
  padding: 10px;

  text-align: center;

  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 15px;
`



/**
 * 작동 방식
 * 1.DmgCalcContext에서 차트를 그리는데 필요한 데이터들을 가져옵니다.
 * 2.캐릭터 DB를 차트용으로 복사합니다.
 * 3.복사된 DB를 세팅값에 맞게 조작합니다.
 * 4.조작한 DB에서 차트를 그리는데 필요한 데이터를 추출합니다.
 * 5.추출한 데이터를 바탕으로 차트를 세팅합니다.
 * @returns w CustomChart 컴포넌트
 */
const CustomChart = () => {

  //#region Component Settings
  /*
   * 1.DmgCalcContext에서 차트를 그리는데 필요한 데이터들을 가져옵니다.
   */
  const { characterDB, selectedCharList, targetData, boardBonus, damageFormula } = useDmgCalcContext();

  const [isCriChecked, setIsCriChecked] = useState(false);

  function handleCriCheck() {
    setIsCriChecked(!isCriChecked);
  }

  /*
   * 2.캐릭터 DB를 차트용으로 복사합니다.
   * 세팅 변경에 따른 재랜더링이 모든 컴포넌트에서 일어날 필요는 없으므로
   * 차트에서'만' 쓸 DB를 state로 선언해줍니다.
   */
  const [onlyChartDB, setOnlyChartDB] = useState(deepCopy(characterDB));
  const [skillLevel, setSkillLevel] = useState(1);



  /*
   * 3.복사된 DB를 세팅값에 맞게 조작합니다.
   */

  function boardBounsApply(characterData, originalDB, boardBonus) {
    let baseCharacter = originalDB.find((data) => data.name[0] == characterData.name[0]);
    let baseStat = baseCharacter.stat;
    let copiedStat = characterData.stat;

    if (baseCharacter.type.attackType == "physic") {
      copiedStat.ATK = baseStat.ATK * (1 + boardBonus.overall[statType.ATK] * 0.08) + boardBonus.personal.ATK;
    }
    else {
      copiedStat.ATK = baseStat.ATK * (1 + boardBonus.overall[statType.MATK] * 0.08) + boardBonus.personal.MATK;
    }

    copiedStat.HP = baseStat.ATK * (1 + boardBonus.overall[statType.HP] * 0.08) + boardBonus.personal.HP;
    copiedStat.DEF = baseStat.DEF * (1 + boardBonus.overall[statType.DEF] * 0.08) + boardBonus.personal.DEF;
    copiedStat.MDEF = baseStat.MDEF * (1 + boardBonus.overall[statType.MDEF] * 0.08) + boardBonus.personal.MDEF;
    copiedStat.CRIC = baseStat.CRIC * (1 + boardBonus.overall[statType.CRIC] * 0.08) + boardBonus.personal.CRIC;
    copiedStat.CRID = baseStat.CRID * (1 + boardBonus.overall[statType.CRID] * 0.08) + boardBonus.personal.CRID;
    copiedStat.CCRES = baseStat.CCRES * (1 + boardBonus.overall[statType.CCRES] * 0.08) + boardBonus.personal.CCRES;
    copiedStat.CDRES = baseStat.CDRES * (1 + boardBonus.overall[statType.CDRES] * 0.08) + boardBonus.personal.CDRES;
  }



  //3-1. 보드 세팅값에 따른 보드 보너스 적용
  useEffect(() => {
    //보드 보너스 적용시, 중복 적용을 피하기 위해 갖고있던 DB를 한번 초기화합니다.
    let copiedDB = deepCopy(characterDB);

    //복사된 DB의 캐릭터 정보를 세팅값에 따라 하나씩 변경합니다.
    copiedDB.map((characterData) => {
      boardBounsApply(characterData, characterDB, boardBonus);
    });

    //공격력 순으로 정렬합니다.
    copiedDB.sort(function (a, b) {
      return b.stat.ATK - a.stat.ATK;
    });

    //state를 변경합니다.
    setOnlyChartDB(copiedDB);
  }, [boardBonus, characterDB]);

  /*
   * 4.조작한 DB에서 차트를 그리는데 필요한 데이터를 추출합니다.
   * 복사본 DB 이름은 onlyChartDB 입니다.
   */

  
  /*
   * 1.방어도
   * 2.데미지 감소율
   * 3.치명 수치
   * 4.치명타 증가율
   */

  const parser = new Parser();
  //1.방어도
  function DEFValue(characterData, opponentData) {
    let formulaData = damageFormula.DEFV;
    let formula = formulaData.formula;
    const stat = {
      ATK : characterData.stat.ATK,
      DEF : (characterData.type.attackType == attackType.physic)
        ? opponentData.stat.DEF : opponentData.stat.MDEF,
      CRIC : characterData.stat.CRIC,
      CRID : characterData.stat.CRID,
      CCRES : opponentData.stat.CCRES,
      CDRES : opponentData.stat.CDRES
    }

    let DEFV = parser.parse(formula).evaluate(stat);
    DEFV = Math.min(formulaData.maxValue/100, DEFV);
    DEFV = Math.max(formulaData.minValue/100, DEFV);
    return DEFV;
  }
  //2.데미지 감소율
  function damageReduction(characterData, opponentData) {
    let formulaData = damageFormula.reduction;
    let formula = formulaData.formula;
    const stat = {
      ATK : characterData.stat.ATK,
      DEF : (characterData.type.attackType == attackType.physic)
        ? opponentData.stat.DEF : opponentData.stat.MDEF,
      CRIC : characterData.stat.CRIC,
      CRID : characterData.stat.CRID,
      CCRES : opponentData.stat.CCRES,
      CDRES : opponentData.stat.CDRES,
      DEFV : DEFValue(characterData, opponentData)
    }
    
    let reduction = parser.parse(formula).evaluate(stat);
    reduction = Math.min(formulaData.maxValue/100, reduction);
    reduction = Math.max(formulaData.minValue/100, reduction);
    return reduction;
  }
  //3.치명 수치 CRIDV
  function CRIDValue(characterData, opponentData) {
    let formulaData = damageFormula.CRIDV;
    let formula = formulaData.formula;
    const stat = {
      ATK : characterData.stat.ATK,
      DEF : (characterData.type.attackType == attackType.physic)
        ? opponentData.stat.DEF : opponentData.stat.MDEF,
      CRIC : characterData.stat.CRIC,
      CRID : characterData.stat.CRID,
      CCRES : opponentData.stat.CCRES,
      CDRES : opponentData.stat.CDRES,
      DEFV : DEFValue(characterData, opponentData)
    }
    
    let CRIDV = parser.parse(formula).evaluate(stat);
    CRIDV = Math.min(formulaData.maxValue/100, CRIDV);
    CRIDV = Math.max(formulaData.minValue/100, CRIDV);
    return CRIDV;
  }
  //4.치명타 증가율
  function criticalIncrease(characterData, opponentData) {
    let formulaData = damageFormula.criticalDamage;
    let formula = formulaData.formula;
    
    const stat = {
      ATK : characterData.stat.ATK,
      DEF : (characterData.type.attackType == attackType.physic)
        ? opponentData.stat.DEF : opponentData.stat.MDEF,
      CRIC : characterData.stat.CRIC,
      CRID : characterData.stat.CRID,
      CCRES : opponentData.stat.CCRES,
      CDRES : opponentData.stat.CDRES,
      DEFV : DEFValue(characterData, opponentData),
      CRIDV : CRIDValue(characterData, opponentData)
    }
    
    let criDamagePer = parser.parse(formula).evaluate(stat);

    criDamagePer = Math.min(formulaData.maxValue/100, criDamagePer);
    criDamagePer = Math.max(formulaData.minValue/100, criDamagePer);
    return criDamagePer;
  }


  /**
   * 차트의 기본적인 넓이를 정하기 위한 기준 변수입니다.
   */
  let baseChartWidth = onlyChartDB.length * imageWidth + 200;

  let lowSkillDamage = [];
  let highSkillDamage = [];
  let labels = [];
  let allATK = [];
  let labelImages = [];
  /**
   * 선택된 캐릭터들의 데이터만 따로 뽑아낸 DB입니다.
   */
  let selectedDB = [];

  //DB에서 필요한 데이터 뽑아내기 
  onlyChartDB.forEach(character => {
    if (selectedCharList[character.name[1]]) {
      selectedDB.push(character);

      //data 1 : 캐릭터 공격력
      let atk = character.stat.ATK;
      allATK.push(atk);

      //방어력, 공격력에 의한 데미지 감소 계수
      let reduction = damageReduction(character, targetData);

      //치명 데미지 계수
      let criIncrease = criticalIncrease(character, targetData);
      if(isCriChecked == false) {
        criIncrease = 1;
      }

      //뎀감을 적용한 캐릭터 스킬 데미지
      let lowDmg = atk * criIncrease * (1 - reduction) * (character.admissionSkill.percentage[0][skillLevel-1] / 100);
      let highDmg = atk * criIncrease * (1 - reduction) * (character.graduateSkill.percentage[0][skillLevel-1] / 100);
      lowSkillDamage.push(lowDmg);
      highSkillDamage.push(highDmg);

      //차트에 그릴 캐릭터들 이름 (각각의 데이터에 달아줄 라벨)
      labels.push(character.name[0] + ` -${Math.round(reduction * 100)}%`);
    }
  });

  /*
   * 데이터 라벨용 이미지 세팅
   * chart.js의 커스텀 플러그인인 imageItemsPlugin에서
   * canvas에 이미지를 그릴 때 src로 넣어줄 경로 문자열을 저장한 배열을 생성합니다.
   * 각각의 경로는 labels와 1대 1로 대응합니다.
   */
  for (let i = 0; i < labels.length; i++) {
    let image = new Image();

    if (selectedDB[i].name[0] === '시온 더 다크불릿') {
      image.src = '/images/graduateSkill/Icon_GraduateSkill_' + 'xXionx' + '.png';
    } else {
      image.src = '/images/graduateSkill/Icon_GraduateSkill_' + selectedDB[i].name[1] + '.png';
    }

    labelImages.push(image);
  }

  /*
   * 5.추출한 데이터를 바탕으로 차트를 세팅합니다.
   */

  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: '저학년 데미지',
        data: lowSkillDamage,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
        order: 1,
        images: labelImages,
      },
      {
        type: 'bar',
        label: '고학년 데미지',
        data: highSkillDamage,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y',
        order: 1,
      },
      {
        type: 'line',
        label: '공격력',
        data: allATK,
        borderColor: '#CCB1DA',
        backgroundColor: '#CCB1DA7C',
        yAxisID: 'y1',
        order: 0,
      },
    ],
  }

  //차트에 이미지 그리는 플러그인
  const imageItemsPlugin = {
    id: 'imageItems',
    beforeDatasetsDraw(chart, args, plugins) {
      const { ctx, data, options, scales: { x, y } } = chart;

      ctx.save();
      let imageSize = x.getPixelForValue(1) - x.getPixelForValue(0);
      imageSize = Math.min(imageSize, 100);

      data.datasets[0].images.forEach((image, index) => {
        ctx.drawImage(
          image,
          x.getPixelForValue(index) - imageSize / 2, y.getPixelForValue(0) - 1,
          imageSize, imageSize
        );
      })
    }
  }

  ChartJS.register(imageItemsPlugin);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
      line: {
        borderWidth: 1.5,
      }
    },
    layout: {
      padding: {
        left: 40,
        right: 40,
        top: 0,
        bottom: 100
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 0,
          }
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        // grid line settings
        grid: {
          // only want the grid lines for one axis to show up
          drawOnChartArea: false,
        }
      }
    }
  };


  //실제로 컴포넌트에 들어갈 state입니다.
  const [chartWidth, setChartWidth] = useState(baseChartWidth);

  //줌 기능을 만듭니다.
  let [zoomScale, setzoomScale] = useState(1.0);

  const minZoom = 0.5;
  const maxZoom = 3.0;
  const zoomIn = () => {
    let zoomValue = 0;
    if (zoomScale < maxZoom && zoomScale >= 1.0) {
      zoomValue = zoomScale + 0.5;
    } else if (zoomScale < 1.0) {
      zoomValue = zoomScale + 0.1;
    }
    if (zoomValue !== 0) {
      setzoomScale(Math.round(zoomValue * 10) / 10);
    }
  }
  const zoomOut = () => {
    let zoomValue = 0;
    if (zoomScale <= 1.0 && zoomScale > minZoom) {
      zoomValue = zoomScale - 0.1;
    } else if (zoomScale > 1.0) {
      zoomValue = zoomScale - 0.5;
    }
    if (zoomValue !== 0) {
      setzoomScale(Math.round(zoomValue * 10) / 10);
    }
  }

  useEffect(() => {
    setChartWidth(baseChartWidth * zoomScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomScale]);

  //#endregion Component Settings


  function handleSkillLevel(e) {
    let value = e.target.value;
    if(isNaN(value)) {
      return;
    }
    value = Math.min(value, 10);
    value = Math.max(value, 1);

    setSkillLevel(value);
  }

  return (
    <div className={styles.customChart}>
      <div className={styles.customChart_top}>
        <h2 className={styles.customChart_top_title}>물방 {targetData.stat.DEF} / 마방 {targetData.stat.MDEF} 대상 스킬 데미지</h2>
      </div>
      <div className={styles.customChart_bottom}>
        <button className={styles.zoomInButton} onClick={() => zoomIn()}>+</button>
        <button className={styles.zoomScale}>{zoomScale.toFixed(1)}</button>
        <button className={styles.zoomOutButton} onClick={() => zoomOut()}>-</button>
        <CriSettingDiv>
          <CriSettingLabel htmlFor='criOnOff'>치명 데미지 적용 : </CriSettingLabel>
          <CriSettingCheck type='checkbox' id='criOnOff' name='criOnOff' checked={isCriChecked} onChange={handleCriCheck} ></CriSettingCheck>
        </CriSettingDiv>
        <SkillLevelDiv>
          <SkillLevelSpan>스킬 레벨 : </SkillLevelSpan>
          <SkillLevelInput type='text' value={skillLevel} onChange={handleSkillLevel} name='skillLevel' />
        </SkillLevelDiv>
        <div className={styles.customChart_bottom_viewport}>
          <div style={{
            minWidth: chartWidth,
            maxWidth: chartWidth,
            height: 500
          }}>
            <Chart
              data={data}
              options={options}
              className={styles.chart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomChart;