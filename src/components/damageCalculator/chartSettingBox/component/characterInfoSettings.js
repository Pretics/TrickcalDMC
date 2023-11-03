'use client'

import React, { useRef } from "react"

import styled from "styled-components"
import { useState, useEffect } from "react";
import Image from "next/image";

import { useDmgCalcContext } from "hooks/useDmgCalcContext";

import { deepCopy } from "utils/deepCopy";


import { personality, attackType, role, position, race, statType } from "utils/basicValueNames";
import characterNames from "assets/characterNames";




//====================================================================





const imageWidth = 50;
const imageHeight = 50;






//====================================================================





const CharacterTypeContainer = styled.div`
  width: 330px;
  height: 70px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #35A52E;
  border: 10px solid #17992E;
  border-radius: 40px 20px 40px 20px;
  box-sizing: border-box;

  box-shadow: 8px 5px 0 0 #E3F2C0;
`
const TypeImageContainer = styled.div`
  position: relative;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;

  display: flex;
  justify-content: center;
  align-items: center;
`
const TypeImageNameContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: -10px;

  display: flex;
  justify-content: center;
  align-items: center;
`
const TypeImageName = styled.span`
  position: relative;

  font-size: ${[props => props.$fontSize]}px;
  color: black;
  text-align: center;
  z-index: 1;
  white-space: no-wrap;

  &::before {
    content: "${props => props.$text}";
    position: absolute;
    z-index: -1;
    -webkit-text-stroke: 3.5px white;
  }
`;

const TypeImages = ({ data, imageWidth }) => {
  const imgName = {
    [personality.gloomy]: 'UnitPersonality_Gloomy',
    [personality.cool]: 'UnitPersonality_Cool',
    [personality.jolly]: 'UnitPersonality_Jolly',
    [personality.mad]: 'UnitPersonality_Mad',
    [personality.naive]: 'UnitPersonality_Naive',

    [role.dealer]: 'UnitClass_0001',
    [role.tanker]: 'UnitClass_0002',
    [role.supporter]: 'UnitClass_0003',

    [attackType.magic]: 'UnitAttackMagic',
    [attackType.physic]: 'UnitAttackPhysic',

    [position.front]: 'PositionFront',
    [position.middle]: 'PositionMiddle',
    [position.back]: 'PositionBack'
  }
  const typesKorName = {
    [personality.gloomy]: '우울',
    [personality.cool]: '냉정',
    [personality.jolly]: '활발',
    [personality.mad]: '광기',
    [personality.naive]: '순수',

    [role.dealer]: '딜러',
    [role.tanker]: '탱커',
    [role.supporter]: '서포터',

    [attackType.magic]: '마법',
    [attackType.physic]: '물리',

    [position.front]: '전열',
    [position.middle]: '중열',
    [position.back]: '후열'
  }
  const typeImageMaxWidth = imageWidth;
  const fontSize = 18;
  const imageDown = 0.8;


  let type = data.type;
  let personalitySrc = require(`/public/images/type/Common_${imgName[type.personality]}.png`).default;
  let roleSrc = require(`/public/images/type/Common_${imgName[type.role]}.png`).default;
  let attackTypeSrc = require(`/public/images/type/Common_${imgName[type.attackType]}.png`).default;
  let positionSrc = require(`/public/images/type/Common_${imgName[type.position]}.png`).default;

  return (
    <CharacterTypeContainer>
      <TypeImageContainer $width={typeImageMaxWidth + fontSize} $height={typeImageMaxWidth}>
        <Image
          src={personalitySrc} alt='캐릭터 성격 이미지' width={typeImageMaxWidth} priority
        />
        <TypeImageNameContainer>
          <TypeImageName $text={typesKorName[type.personality]} $fontSize={fontSize}>
            {typesKorName[type.personality]}
          </TypeImageName>
        </TypeImageNameContainer>
      </TypeImageContainer>

      <TypeImageContainer $width={typeImageMaxWidth + fontSize} $height={typeImageMaxWidth}>
        <Image
          src={roleSrc} alt='캐릭터 직업 이미지' width={Math.floor(typeImageMaxWidth * imageDown)} priority
        />
        <TypeImageNameContainer>
          <TypeImageName $text={typesKorName[type.role]} $fontSize={fontSize}>
            {typesKorName[type.role]}
          </TypeImageName>
        </TypeImageNameContainer>
      </TypeImageContainer>

      <TypeImageContainer $width={typeImageMaxWidth + fontSize} $height={typeImageMaxWidth}>
        <Image
          src={attackTypeSrc} alt='캐릭터 공격 타입 이미지' width={Math.floor(typeImageMaxWidth * imageDown)} priority
        />
        <TypeImageNameContainer>
          <TypeImageName $text={typesKorName[type.attackType]} $fontSize={fontSize}>
            {typesKorName[type.attackType]}
          </TypeImageName>
        </TypeImageNameContainer>
      </TypeImageContainer>

      <TypeImageContainer $width={typeImageMaxWidth + fontSize} $height={typeImageMaxWidth}>
        <Image
          src={positionSrc} alt='캐릭터 포지션 이미지' width={Math.floor(typeImageMaxWidth * imageDown)} priority
        />
        <TypeImageNameContainer>
          <TypeImageName $text={typesKorName[type.position]} $fontSize={fontSize}>
            {typesKorName[type.position]}
          </TypeImageName>
        </TypeImageNameContainer>
      </TypeImageContainer>
    </CharacterTypeContainer>
  )
}





//====================================================================





const ShowingCharacterDiv = styled.div`
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  background-color: #D7EFA3;
  border-radius: 20px;
  
  color: black;
  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;
`
const ShowingCharacterCard = styled.div`
  width: 400px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  background-color: #E9F5CF;
  border-radius: 20px;
`
const CharacterNameBox = styled.div`
  display: flex;
  justify-content: center;

  background-color: #F2F9E2;
  border: 4px solid #D7EFA3;
  border-radius: 20px;
`
const CharacterRaceImageContainer = styled.div`
  padding: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`
const CharacterNameContainer = styled.div`
  padding-right: 10px;
  padding-left: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
`
const CharacterName = styled.span`
  min-width: 80px;

  text-align: center;
  font-size: ${props => props.fontSize}px;
`
const CharacterImageContainer = styled.div`
  display: flex;
  justify-content: center;
`
const CharacterImage = styled(Image)`

`

const ShowingCharacter = () => {
  /*
    드롭다운 메뉴" 또는 "셀렉트 박스(Select Box)
  */
  const { characterDB, searchNameClass } = useDmgCalcContext();
  const raceName = {
    [race.dragon]: 'Dragon',
    [race.witch]: 'Witch',
    [race.ghost]: 'Ghost',
    [race.fairy]: 'Fairy',
    [race.furry]: 'Furry',
    [race.elf]: 'Elf',
    [race.spirit]: 'Spirit'
  }

  let characterData = characterDB.find(data => data.name[0] == searchNameClass.name[0]);
  let engName = characterData.name[1];
  if (engName == 'Xion the Darkbullet') {
    engName = 'xXionx';
  }

  return (
    <ShowingCharacterDiv>
      <ShowingCharacterCard>

        <CharacterNameBox>

          <CharacterRaceImageContainer>
            <Image
              src={require(`/public/images/type/Common_UnitRace_${raceName[characterData.type.race]}.png`).default}
              alt='캐릭터 종족 이미지'
              width={50}
              priority
            />
          </CharacterRaceImageContainer>

          <CharacterNameContainer>
            <CharacterName fontSize={24}>{characterData.name[0]}</CharacterName>
            <CharacterName fontSize={13}>{characterData.name[1]}</CharacterName>
          </CharacterNameContainer>

        </CharacterNameBox>


        <CharacterImageContainer>
          <CharacterImage
            src={require(`/public/images/story/Character_${engName}_Story_1.png`).default}
            alt='캐릭터 스토리 이미지'
            width={300}
            priority
          />
        </CharacterImageContainer>


        <div>
          <TypeImages data={characterData} imageWidth={imageWidth} />
        </div>

      </ShowingCharacterCard>
    </ShowingCharacterDiv>

  );
}






//====================================================================






//#region StatBlock

//#region styled
const StatBlockDiv = styled.div`
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
const StatBlockBackground = styled.div`
  position: absolute;
  z-index: 1;
  top: 30%;
  left: 10%;
  width: 85%;
  height: 45%;
  background-color: #F3F9E7;
  border-radius: 20px;
`
const StatBlockArticle = styled.article`
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

const StatBlock = ({ type }) => {
  const { characterDB, setCharacterDB, searchNameClass } = useDmgCalcContext();

  //#region Component Settings

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
  //state 초기값 세팅
  let cd = characterDB.find(data => data.name[0] == searchNameClass.name[0]);
  const [characterData, setCharacterData] = useState(cd);
  let currentAttackType = characterData.type.attackType;
  const [statValue, setStatValue] = useState(
    (type == statType.MATK && currentAttackType == attackType.magic)
      ? characterData.stat.ATK : characterData.stat[type]
  );

  //다른 캐릭터 검색시 데이터 업데이트
  useEffect(() => {
    let data = characterDB.find(data => data.name[0] == searchNameClass.name[0]);
    let copy = deepCopy(data);
    setCharacterData(copy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchNameClass, characterDB]);

  //캐릭터 데이터 변경시 필드 value 업데이트
  useEffect(() => {
    if (type == statType.MATK && currentAttackType == attackType.magic) {
      setStatValue(characterData.stat.ATK);
    }
    else {
      setStatValue(characterData.stat[type]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterData]);

  //input 필드 변경 제어
  function handleOnChange(e) {
    let value = Number(e.target.value);
    if (isNaN(value)) {
      return;
    }
    value = Math.min(value, 9999999);
    value = Math.max(value, 0);
    setStatValue(value);
  }
  //값 변경시 context 조작
  useEffect(() => {
    let targetData = characterDB.find(data => data.name[0] == characterData.name[0]);
    let baseStat = (type == statType.MATK && currentAttackType == attackType.magic)
      ? targetData.stat.ATK : targetData.stat[type]; 
    if (baseStat != statValue) {
      let copy = deepCopy(characterDB);
      let copyTarget = copy.find(data => data.name[0] == characterData.name[0]);
      if(type == statType.MATK && currentAttackType == attackType.magic) {
        copyTarget.stat.MATK = statValue;
      }
      else {
        copyTarget.stat[type] = statValue;
      }
      setCharacterDB(copy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statValue]);

  if (currentAttackType == attackType.physic && type == statType.MATK) {
    return;
  }
  else if (currentAttackType == attackType.magic && type == statType.ATK) {
    return;
  }

  //#endregion

  return (
    <StatBlockDiv>
      <StatBlockBackground />
      <StatBlockArticle>
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
      </StatBlockArticle>

    </StatBlockDiv>
  );
}

//#endregion




const StatBoxDiv = styled.div`
  padding: 20px;
  padding-top: 10px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  align-items: center;

  background-color: #E9F5CF;
  border-radius: 20px;
`
const StatBox = () => {

  const Stats = Object.keys(statType).map((statString) => {
    return <StatBlock type={statString} key={statString}></StatBlock>;
  });

  return (
    <StatBoxDiv>
      {Stats}
    </StatBoxDiv>
  );
}









const SkillBlockDiv = styled.div`
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: black;

`
const SkillLevelText = styled.span`
  text-align: center;
  margin-right: 5px;
`
const SkillLevelInput = styled.input`
  width: 100px;
  height: 30px;
  
  text-align: center;

  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;
`

const SkillBlock = ({ type, level }) => {
  //type : admissionSkill, graduateSkill
  const { characterDB, setCharacterDB, searchNameClass } = useDmgCalcContext();
  let characterData = characterDB.find(data => data.name[0] == searchNameClass.name[0]);

  let percentage = characterData[type].percentage[0];
  const [inputText, setInputText] = useState(percentage[level - 1]);

  function handleOnChange(e) {
    let value = e.target.value;
    setInputText(value);
  }

  // 캐릭터 변경시 inputText 업데이트
  useEffect(() => {
    let characterData = characterDB.find(data => data.name[0] == searchNameClass.name[0]);
    let percentage = characterData[type].percentage[0];
    setInputText(percentage[level - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchNameClass])

  // 스킬 계수 변경시 db 업데이트
  useEffect(() => {
    if (inputText != characterData[type].percentage[0][level - 1]) {
      let copy = deepCopy(characterDB);
      let targetData = copy.find(data => data.name[0] == searchNameClass.name[0]);
      targetData[type].percentage[0][level - 1] = inputText;
      setCharacterDB(copy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  return (
    <SkillBlockDiv>
      <SkillLevelText>{`${level}레벨 : `}</SkillLevelText>
      <SkillLevelInput
        type='text'
        value={inputText}
        onChange={handleOnChange}
        name={type}
      />
    </SkillBlockDiv>
  );
}









const SkillBoxDiv = styled.div`
  padding: 20px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  align-items: center;

  background-color: #E9F5CF;
  border-radius: 20px;
`

const SkillBox = ({ type }) => {
  const SkillBlocks = () => {
    let components = [];
    for (let i = 1; i <= 10; i++) {
      components.push(<SkillBlock level={i} type={type} key={i} />);
    }
    return components;
  }

  return (
    <SkillBoxDiv>
      {SkillBlocks()}
    </SkillBoxDiv>
  )
}







const ShowingStatDiv = styled.div`
  min-width: 400px;
  width: 100%;
  height: 100%;
  padding: 20px;

  background-color: #D7EFA3;
  border-radius: 20px;
`
const ShowingStatNav = styled.nav`
  //top right bottom left 
  padding: 0px 20px 15px 20px;

  display: grid;
  grid-template-columns : 1fr 1fr 1fr;
  gap: 10px;
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

const ShowingStat = () => {
  const mode = { stat: 'stat', admissionSkill: 'admissionSkill', graduateSkill: 'graduateSkill' }
  const [currentMode, setCurrentMode] = useState(mode.stat);

  function handleButtonClick(buttonMode) {
    setCurrentMode(buttonMode);
  }

  function getButtonBackgroundColor(buttonMode) {
    return (buttonMode == currentMode) ? '#BDDD7F' : '#F3FBE3';
  }

  function Component() {
    if (currentMode == mode.stat) {
      return <StatBox key={currentMode} />;
    }
    else if (currentMode == mode.admissionSkill) {
      return <SkillBox type={currentMode} key={currentMode} />;
    }
    else if (currentMode == mode.graduateSkill) {
      return <SkillBox type={currentMode} key={currentMode} />;
    }
  }

  return (
    <ShowingStatDiv>
      <ShowingStatNav>
        <TabTitleButton
          $backgroundColor={() => getButtonBackgroundColor(mode.stat)}
          onClick={() => handleButtonClick(mode.stat)}>
          <TabTitle>스테이터스</TabTitle>
        </TabTitleButton>
        <TabTitleButton
          $backgroundColor={() => getButtonBackgroundColor(mode.admissionSkill)}
          onClick={() => handleButtonClick(mode.admissionSkill)}>
          <TabTitle>저학년 스킬</TabTitle>
        </TabTitleButton>
        <TabTitleButton
          $backgroundColor={() => getButtonBackgroundColor(mode.graduateSkill)}
          onClick={() => handleButtonClick(mode.graduateSkill)}>
          <TabTitle>고학년 스킬</TabTitle>
        </TabTitleButton>
      </ShowingStatNav>
      {
        Component()
      }


    </ShowingStatDiv>
  )
}





//====================================================================







const ResultImage = styled(Image)`
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`

/**
 * 검색결과창에 띄울 캐릭터 블록입니다.
 * 
 * 여기로 들어오는 이름은 영어일 수도, 한국어일 수도 있음.
 * 
 * @param {String} param0 
 */
const ResultBlock = ({ name, setSelectedResult }) => {
  const { characterDB } = useDmgCalcContext();

  //props로 들어온 이름을 DB에 검색해서 데이터를 뽑아냅니다.
  let targetData = characterDB.find(data => data.name[0] == name || data.name[1] == name);
  let targetName = targetData.name[1];

  //지 혼자 파일명이 다른 시온의 이름을 필터링합니다
  if (targetName == 'Xion the Darkbullet') {
    targetName = 'xXionx';
  }
  let src = require(`/public/images/graduateSkill/Icon_GraduateSKill_${targetName}.png`).default;

  return (
    <ResultImage
      src={src}
      alt={targetName}
      width={60}
      onClick={() => setSelectedResult({ name: targetData.name })}
    />
  )
}




const SearchAreaDiv = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #D7EFA3;
  border-radius: 20px;

  color: black;
`
const SearchAreaText = styled.span`
  width: 60px;

  text-align: center;
  white-space: no-wrap;
`
const SearchAreaInputContainer = styled.div`
  position: relative;
  width: 100%;
`
const SearchAreaInput = styled.input`
  position: relative;
  padding: 5px;
  width: 100%;

  border-radius: 5px;
  z-index: 2;

  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;
`
const SearchAreaResultDiv = styled.div`
  position: absolute;
  top: 37px;
  left: 0;
  width: 100%;
  min-height: 80px;
  max-height: 250px;
  padding: 10px;

  display: ${props => props.$isVisible ? 'block' : 'none'};
  overflow-y: auto;
  border-radius: 0px 0px 0px 10px;
  z-index: 100;

  background-color: #F5F7EB;
`
const SearchAreaGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 5px;
`

const SearchArea = () => {
  const { setSearchNameClass } = useDmgCalcContext();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedResult, setSelectedResult] = useState();
  const [isDivVisible, setDivVisible] = useState(false);

  //검색하는 기능
  function handleSearch(e) {
    let value = e.target.value;
    value = String(value);
    setSearchKeyword(value);
  }

  //검색용 아이템 생성
  const allNames = [];
  for (let i = 0; i < characterNames.length; i++) {
    let name = characterNames[i].name;
    allNames.push(name[0]);
    allNames.push(name[1]);
  }

  //실제로 검색하는 곳
  useEffect(() => {
    let result = [];
    if (searchKeyword != '') {
      result = filterItems(allNames, searchKeyword);
    }

    setSearchResult(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  //검색 키워드가지고 이름이 있는지 살펴보는 기능
  //items로 문자열 배열 입력, query로 필터링할 키워드 입력하면
  //query가 포함된 문자열만 배열로 반환해줌
  function filterItems(items, query) {
    query = query.toLowerCase();
    return items.filter(item =>
      item.split(' ').some(word =>
        word.toLowerCase().startsWith(query)
      )
    );
  }

  //div가 보였다 안보였다 하는 기능
  function handleInputFocus() {
    setDivVisible(true);
  }
  //외부 클릭시 안보이게 만들기
  const modalRef = useRef();
  const clickModalOutside = event => {
    if (isDivVisible && !modalRef.current.contains(event.target)) {
      setDivVisible(false);
    }
  }
  useEffect(() => {
    // window 객체에 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', clickModalOutside);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      document.removeEventListener('mousedown', clickModalOutside);
    };
  });

  //결과창에 뜬 캐릭터 클릭기능
  useEffect(() => {
    let nameClass = selectedResult;
    if (nameClass) {
      setSearchNameClass(nameClass);
      setDivVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResult])

  //모든 결과 출력 기능
  const AllResultBlocks = (names) => {
    return names.map(name => {
      return <ResultBlock name={name} key={name} setSelectedResult={setSelectedResult} />
    })
  }

  return (
    <SearchAreaDiv ref={modalRef}>
      <SearchAreaText>검색 : </SearchAreaText>
      <SearchAreaInputContainer>
        <SearchAreaInput
          value={searchKeyword}
          onChange={handleSearch}
          onFocus={handleInputFocus}
          name='SearchAreaInput'
          id='searchAreaResult'
          autoComplete='off'
        />
        <SearchAreaResultDiv $isVisible={isDivVisible} id='searchAreaResult'>
          <SearchAreaGrid>
            {AllResultBlocks(searchResult)}
          </SearchAreaGrid>
        </SearchAreaResultDiv>
      </SearchAreaInputContainer>
    </SearchAreaDiv>
  );
}









//#region styled Components
const InfoSection = styled.section`
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #F5F7EB;

  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;
`
const InfoArticle = styled.article`
  background-color: #E9F5CF;
  border-radius: 20px;
  padding: 20px;
`
const InfoArticle_TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D7EFA3;
  height: 40px;
  border-radius: 10px;
`
const InfoArticle_Title = styled.span`
  text-align: center;
  color: black;
`
const InfoArticle_MainContainer = styled.div`
  padding-top: 10px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(430px, 1fr));

  gap: 20px;
  justify-items: center;
  align-items: center;
`

//#endregion

const InfoSettings = () => {

  return (
    <InfoSection>
      <InfoArticle>

        <SearchArea />

        <InfoArticle_TitleContainer>
          <InfoArticle_Title>캐릭터 정보</InfoArticle_Title>
        </InfoArticle_TitleContainer>

        <InfoArticle_MainContainer>

          <ShowingCharacter />
          <ShowingStat />

        </InfoArticle_MainContainer>

      </InfoArticle>

    </InfoSection>
  )
}
//#endregion


export default InfoSettings;


