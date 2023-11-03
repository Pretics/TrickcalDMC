import React, { useEffect } from 'react';
import { useState } from "react";
import Image from 'next/image';

import styled from 'styled-components';

import { statType } from 'utils/basicValueNames';
import { useDmgCalcContext } from "hooks/useDmgCalcContext";
import { objectDeepCopy } from "utils/deepCopy";





//================================================================================





const imageWidth = 56;
const imageHeight = 56;





//================================================================================





//#region StatSetting

//#region styled
const StatBoxDiv = styled.div`
  width: 100%;
  min-width: 350px;
  max-width: 450px;
  height: 90%;
  padding: 5px;

  display: flex;
  align-items: center;
  position: relative;
  border-radius: 20px;
  z-index: 2;

  color: black;
  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;

  &:hover {
    background-color: #F3F9E7;
  }
`
const StatBoxBackground = styled.div`
  position: absolute;
  top: 20%;
  left: 5%;
  width: 85%;
  height: 60%;

  z-index: 1;
  background-color: #F3F9E7;
  border-radius: 20px;
`
const StatBoxArticle = styled.article`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 5px;

  z-index: 1;
  display: flex;
  align-items: center;
  color: black;
`
const StatImageContainer = styled.div`
  position: relative;
`
const StatImage = styled(Image)`
  background-color: #FFF3CB;
  border: 4px solid #F5CF8F;
  border-radius: 10%;
  //x-position y-position blur spread color
  box-shadow: 2px 2px 2px 0px #A97119;
`;
const StatImagePopup = styled.span`
  position: absolute;
  top: -34px;
  left: 0px;
  transform: -50% 50%;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  background-color: #F3FBE3;
  padding: 5px;
  opacity: 0;
  z-index: 0;

  ${StatBoxDiv}:hover &{
    opacity: 1;
  }
`
const StatName = styled.span`
  min-width: 150px;
  text-align: left;
  white-space: no-wrap;
  padding: 10px;
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
//#endregion styled

const StatBox = ({ type }) => {

  //#region Component Settings

  const { boardBonus, setBoardBonus } = useDmgCalcContext();
  const boardImageNameByStat = {
    [statType.HP]: 'Tile_HpOn.png',
    [statType.ATK]: 'Tile_AttackPhysicOn.png',
    [statType.MATK]: 'Tile_AttackMagicOn.png',
    [statType.DEF]: 'Tile_DefensePhysicOn.png',
    [statType.MDEF]: 'Tile_DefenseMagicOn.png',
    [statType.CRIC]: 'Tile_CriticalRateOn.png',
    [statType.CRID]: 'Tile_CriticalMultOn.png',
    [statType.CCRES]: 'Tile_CriticalResistOn.png',
    [statType.CDRES]: 'Tile_CriticalMultResistOn.png',
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

  const [statValue, setStatValue] = useState(boardBonus.personal[type]);

  function handleOnChange(e) {
    let value = Number(e.target.value);
    if(isNaN(value)) {
      return;
    }
    value = Math.min(value, 9999999);
    value = Math.max(value, 0);
    if (!value) {
      value = 0;
    }
    setStatValue(value);
  }
  useEffect(() => {
    let copy = objectDeepCopy(boardBonus);
    copy.personal[type] = statValue;
    setBoardBonus(copy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statValue]);

  //#endregion

  return (
    <StatBoxDiv>

      <StatBoxBackground />

      <StatBoxArticle>
        <StatImageContainer>
          <StatImage
            src={require(`/public/images/board/${boardImageNameByStat[type]}`).default}
            alt={'스탯 이미지'}
            width={imageWidth}
            height={imageHeight}
            priority
          />
          <StatImagePopup>{`+${(statValue) == 0 ? '0' : statValue}`}</StatImagePopup>
        </StatImageContainer>
        <StatName>{statKORName[type]}</StatName>
        <StatNumber type='text' value={statValue} onChange={handleOnChange} name={type} />
      </StatBoxArticle>

    </StatBoxDiv>
  );
}





//================================================================================





//#region BoardSetting

//#region Styled
const BonusBox = styled.div`
  width: 100%;
  height: 90%;
  padding: 5px;
  position: relative;

  display: flex;
  align-items: center;
  border-radius: 20px;
  z-index: 2;

  color: black;
  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;

  &:hover {
    background-color: #F3F9E7;
  }
`
const BonusBoxBackground = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
  width: 85%;
  height: 60%;
  
  background-color: #F3F9E7;
  border-radius: 20px;
  z-index: 1;
`
const BonusBoxArticle = styled.article`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  color: black;
  padding: 5px;
`
const BoardImageContainer = styled.div`
  position: relative;
`
const BoardImage = styled(Image)`
  background-image: conic-gradient(from 0deg at 50% 50%, #9DE9D3FF 0%, #F4EB8DFF 12%, #FBC197FF 25%, #FCB19FFF 37%, #F990BFFF 50%, #ED6EE7FF 62%, #CB8DFBFF 75%, #81BAEFFF 88%, #9DE9D3FF 100%);
  border: 4px solid #856CC6;
  border-radius: 10%;
  //x-position y-position blur spread color
  box-shadow: 2px 2px 2px 0px #5E5693;
`
const BoardImagePopup = styled.span`
  position: absolute;
  top: -34px;
  left: 0px;
  transform: -50% 50%;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  background-color: #F3FBE3;
  padding: 5px;
  opacity: 0;
  z-index: 0;

  ${BonusBox}:hover &{
    opacity: 1;
  }
`
const BoardOverallNumber = styled.span`
  width: 100px;
  text-align: center;
`
const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
const BoardSlider = styled.input`
  width: 100%;
`
const BoardOverallMaxNumber = styled.input`
  width: 50px;
  height: 40px;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;
`
//#endregion Styled

/**
 * 보드 하나의 보너스를 설정하는 박스를 생성합니다.
 * 
 * 기능 1 : 보드 이미지를 표시합니다.
 * 기능 2 : 현재 활성화된 보드 갯수를 표시합니다.
 * 기능 3 : 슬라이더로 보드 갯수를 설정합니다.
 * 기능 4 : 슬라이더 최댓값을 input box로 설정합니다.
 * 
 * @param {object} type : 해당 보너스 설정 칸이 표시할 보드의 종류입니다.
 * @returns BoardBonusBox 컴포넌트
 */
const BoardBonusBox = ({ type }) => {

  //#region Component Settings

  const boardImageNameByStat = {
    [statType.HP]: 'Tile_HpOn.png',
    [statType.ATK]: 'Tile_AttackPhysicOn.png',
    [statType.MATK]: 'Tile_AttackMagicOn.png',
    [statType.DEF]: 'Tile_DefensePhysicOn.png',
    [statType.MDEF]: 'Tile_DefenseMagicOn.png',
    [statType.CRIC]: 'Tile_CriticalRateOn.png',
    [statType.CRID]: 'Tile_CriticalMultOn.png',
    [statType.CCRES]: 'Tile_CriticalResistOn.png',
    [statType.CDRES]: 'Tile_CriticalMultResistOn.png',
  }
  const popupContents = {
    [statType.HP]: '체력',
    [statType.ATK]: '물리 공격력',
    [statType.MATK]: '마법 공격력',
    [statType.DEF]: '물리 방어력',
    [statType.MDEF]: '마법 방어력',
    [statType.CRIC]: '치명타',
    [statType.CRID]: '치명 피해',
    [statType.CCRES]: '치명타 저항',
    [statType.CDRES]: '치명 피해 저항',
  }
  const { boardBonus, setBoardBonus } = useDmgCalcContext();
  const [boardNumber, setBoardNumber] = useState(boardBonus.overall[type]);
  const [maxBoardNumber, setMaxBoardNumber] = useState(Math.max(boardBonus.overall[type], 20));

  //로컬 보드 수치 변경
  function handleSliderChange(e) {
    let value = Number(e.target.value);
    if(value !== boardNumber) {
      setBoardNumber(value);
    }
  }
  function handleTextChange(e) {
    let value = e.target.value;
    if(isNaN(value)) {
      return;
    }
    value = Math.min(Number(value), 999);
    if(value !== maxBoardNumber) {
      setMaxBoardNumber(value);
    }
  }

  //보드 최댓값 변경시, 현재 갯수를 최댓값에 맞게 변경
  useEffect(() => {
    if(boardNumber > maxBoardNumber) {
      setBoardNumber(maxBoardNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxBoardNumber])

  //로컬 보드 숫자가 바뀌면 context의 보드 보너스 변경
  useEffect(() => {
    let copiedBonus = objectDeepCopy(boardBonus);
    copiedBonus.overall[type] = boardNumber;
    setBoardBonus(copiedBonus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardNumber]);

  //#endregion
  
  return (
    <BonusBox>
      <BonusBoxBackground />
      <BonusBoxArticle>
        <BoardImageContainer>
          <BoardImage
            src={require(`/public/images/board/${boardImageNameByStat[type]}`).default}
            alt={'공격력 보드 이미지'}
            width={imageWidth}
            height={imageHeight}
            priority
          />
          <BoardImagePopup>{popupContents[type] + ` ${boardBonus.overall[type]*8}%`}</BoardImagePopup>
        </BoardImageContainer>
        <BoardOverallNumber>{`${boardNumber}개`}</BoardOverallNumber>
        <SliderContainer>
          <BoardSlider type='range' name='boardNumber' min='0' max={maxBoardNumber} value={boardNumber} step='1'
            onChange={handleSliderChange}/>
          <BoardOverallMaxNumber type='text' name='maxBoardNumber' value={maxBoardNumber}
            onChange={handleTextChange}/>
        </SliderContainer>
      </BonusBoxArticle>
    </BonusBox>
  )
}





//================================================================================





//#region styled Components
const BoardSection = styled.section`
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
const BoardNav = styled.nav`
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
const BoardArticle = styled.article`
  background-color: #E9F5CF;
  border-radius: 20px;
  padding: 20px;
`
const BoardArticleTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D7EFA3;
  height: 40px;
  border-radius: 10px;
`
const BoardArticleTitle = styled.span`
  text-align: center;
  color: black;
`
const BoardArticleBonusContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  justify-items: left;
  align-items: center;
  padding-top: 10px;
`
//#endregion


//#region BoardSettings

const BoardSettings = () => {

  //#region Component Settings

  const mode = { overall: 'overall', personal: 'personal' }
  const [currentMode, setcurrentMode] = useState(mode.overall);

  function handleButtonClick(mode) {
    setcurrentMode(mode);
  }

  function getButtonBackgroundColor(mode) {
    if (mode == currentMode) {
      return '#BDDD7F';
    }
    else {
      return '#F3FBE3';
    }
  }

  //#endregion

  return (
    <BoardSection>

      <BoardNav>
        <TabTitleButton
          $backgroundColor={() => getButtonBackgroundColor(mode.overall)}
          onClick={() => handleButtonClick(mode.overall)}>
          <TabTitle>전체 사도 효과</TabTitle>
        </TabTitleButton>
        <TabTitleButton
          $backgroundColor={() => getButtonBackgroundColor(mode.personal)}
          onClick={() => handleButtonClick(mode.personal)}>
          <TabTitle>개별 효과</TabTitle>
        </TabTitleButton>
      </BoardNav>

      <BoardArticle>
        <BoardArticleTitleContainer>
          <BoardArticleTitle>{(currentMode == mode.overall) ? '특수 칸 효과' : '일반 칸 효과'}</BoardArticleTitle>
        </BoardArticleTitleContainer>
        <BoardArticleBonusContainer>
          {
            Object.values(statType).map((stat) => {
              if (currentMode === mode.overall) {
                return <BoardBonusBox type={stat} key={stat}></BoardBonusBox>
              } else {
                return <StatBox type={stat} key={stat}></StatBox>
              }
            })
          }
        </BoardArticleBonusContainer>
      </BoardArticle>

    </BoardSection>
  )
}

//#endregion

export default BoardSettings;