import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { useDmgCalcContext } from 'hooks/useDmgCalcContext';
import { personality, statType } from 'utils/basicValueNames';
import styled from 'styled-components';
import { objectDeepCopy } from 'utils/deepCopy';





//====================================================================





const imageWidth = 50;
const imageHeight = 50;





//====================================================================





//====================================================================





//#region StatSetting

//#region styled
const StatBoxDiv = styled.div`
  max-width: 500px;
  height: ${imageHeight}px;
  display: flex;
  align-items: center;
  color: black;
  padding: 5px;
  position: relative;
  border-radius: 20px;
  z-index: 2;
  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;

  &:hover {
    background-color: #F3F9E7;
  }
`
const StatBoxBackground = styled.div`
  position: absolute;
  z-index: 1;
  top: 30%;
  left: 10%;
  width: 85%;
  height: 45%;
  background-color: #F3F9E7;
  border-radius: 20px;
`
const StatBoxArticle = styled.article`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  color: black;
  padding: 5px;
`
const StatImageContainer = styled.div`
  position: relative;
`
const StatName = styled.span`
  min-width: 150px;
  max-width: 200px;
  text-align: left;
  white-space: no-wrap;
  padding: 5px;
`
const StatNumber = styled.input`
  width: 100px;
  height: 40px;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;
  position: absolute;
  right: 0;
`
const StatImage = styled(Image)`
  border-radius: 10%;
`;
//#endregion styled

const StatBox = ({ type }) => {

  //#region Component Settings

  const { targetData, setTargetData } = useDmgCalcContext();
  const statImageNameByStat = {
    HP: 'Icon_Hp.png',
    ATK: 'Icon_AttackPhysic.png',
    MATK: 'Icon_AttackMagic.png',
    DEF: 'Icon_DefensePhysic.png',
    MDEF: 'Icon_DefenseMagic.png',
    CRIC: 'Icon_CriticalRate.png',
    CRID: 'Icon_CriticalMult.png',
    CCRES: 'Icon_CriticalResist.png',
    CDRES: 'Icon_CriticalMultResist.png',
  }
  const statKORName = {
    HP: 'HP',
    SP: 'SP',
    ATK: '물리 공격력',
    MATK: '마법 공격력',
    DEF: '물리 방어력',
    MDEF: '마법 방어력',
    CRIC: '치명타',
    CRID: '치명 피해',
    CCRES: '치명타 저항',
    CDRES: '치명 피해 저항'
  }
  let normalStat = targetData.stat[type];
  const [statValue, setStatValue] = useState(normalStat);

  function handleOnChange(e) {
    let value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    value = Math.min(value, 9999999);
    value = Math.max(value, 0);
    setStatValue(value);
  }
  useEffect(() => {
    if(statValue != targetData.stat[type]) {
      let copy = objectDeepCopy(targetData);
      copy.stat[type] = statValue;
      setTargetData(copy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statValue]);

  //#endregion

  return (
    <StatBoxDiv>
      <StatBoxBackground />
      <StatBoxArticle>
        <StatImageContainer>
          <StatImage
            src={require(`/public/images/stat/${statImageNameByStat[type]}`).default}
            alt={'스탯 이미지'}
            width={imageWidth}
            height={imageHeight}
            priority
          />
        </StatImageContainer>
        <StatName>{statKORName[type]}</StatName>
        <StatNumber type='text' value={statValue} onChange={handleOnChange} name={type} />
      </StatBoxArticle>

    </StatBoxDiv>
  );
}





//====================================================================





//#region styled Components
const StatSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: #F9F9F3;

  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;
`
const StatNav = styled.nav`
  display: grid;
  grid-template-columns : 1fr 1fr;
  gap: 20px;
  //top right bottom left 
  padding: 0px 20px 15px 20px;
`
const TabTitleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: ${props => props.$backgroundColor};
  border-radius: 15px;
  border: 3px solid #ADD593;
  transition: 0.2s;

  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;

  &:hover {
    background-color: #DDE5CC;
    transform: scale(0.9, 1.1);
    cursor: pointer;
  }
`
const TabTitle = styled.span`
  text-align: center;
  color: black;
`
const StatArticle = styled.article`
  background-color: #E9F5CF;
  border-radius: 20px;
  padding: 20px;
`
const StatArticle_TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D7EFA3;
  height: 40px;
  border-radius: 10px;
`
const StatArticle_Title = styled.span`
  text-align: center;
  color: black;
`
const StatArticle_BonusContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  align-items: center;
  
  padding-top: 10px;
`
//#endregion

const StatSettings = () => {

  //#region Component Settings

  const mode = { stat: 'stat', type: 'type' }
  const [currentMode, setCurrentMode] = useState(mode.stat);

  function handleButtonClick(buttonMode) {
    setCurrentMode(buttonMode);
  }

  function getButtonBackgroundColor(buttonMode) {
    return (buttonMode == currentMode) ? '#BDDD7F' : '#F3FBE3';
  }

  function statBoxes() {
    return Object.keys(statType).map(type => {
      return <StatBox type={type} key={type}></StatBox>
    });
  }

  //#endregion Component Settings

  return (
    <StatSection>
      <StatNav>
        <TabTitleButton
          $backgroundColor={() => getButtonBackgroundColor(mode.stat)}
          onClick={() => handleButtonClick(mode.stat)}>
          <TabTitle>스테이터스</TabTitle>
        </TabTitleButton>
        <TabTitleButton
          $backgroundColor={() => getButtonBackgroundColor(mode.type)}
          onClick={() => handleButtonClick(mode.type)}>
          <TabTitle>타입</TabTitle>
        </TabTitleButton>
      </StatNav>

      <StatArticle>
        <StatArticle_TitleContainer>
          <StatArticle_Title>대상 사도 스탯</StatArticle_Title>
        </StatArticle_TitleContainer>
        <StatArticle_BonusContainer>
          {
            statBoxes()
          }
        </StatArticle_BonusContainer>
      </StatArticle>
    </StatSection>
  )
}
//#endregion

export default StatSettings;