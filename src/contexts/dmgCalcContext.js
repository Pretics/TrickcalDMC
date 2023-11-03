import React, { useState, createContext, useCallback, useContext } from 'react';
import originalDB from 'assets/characterData';
import { objectDeepCopy, deepCopy } from 'utils/deepCopy';
import { statType } from 'utils/basicValueNames';
import characterNames from 'assets/characterNames';

const DmgCalcContext = createContext();
export default DmgCalcContext;
export function DmgCalcProvider({ children }) {

  /*
  생성해야하는 데이터 5가지
  1.모든 캐릭터 정보 - 주로 Chart, Settings 에서 씀
  2.imageBox에서 선택된 캐릭터 - 주로 Chart 와 imageBox 에서 씀
  3.전체 8% 보드 갯수, 보드 보너스 스탯 - 주로 Chart 와 Settings 에서 씀
  4.공격 대상 정보 - 주로 Chart와 Settings 에서 씀
  5.계산식 변수 - 주로 Chart와 Settings 에서 씀
  */

  //1.모든 캐릭터 정보 - 주로 Chart 에서 씀
  //[ { 캐릭터1 }, { 캐릭터2 }, ... ]
  const copiedDB = deepCopy(originalDB);
  const [characterDB, setCharacterDB] = useState(copiedDB);

  //2.imageBox에서 선택된 캐릭터 - 주로 Chart 와 imageBox 에서 씀
  //{ 이름1 : bool, 이름2 : bool, ... }
  const list = {};
  characterDB.map(data => {
    list[data.name[1]] = true;
  });
  const [selectedCharList, setSelectedCharList] = useState(list);

  //3.전체 8% 보드 갯수, 보드 보너스 스탯 - 주로 Chart 와 Settings 에서 씀
  //{ overall : { 'HP' : 0, ... }, personal : { 'HP' : 0, ... }  }
  const board = {
    overall : {},
    personal : {}
  };
  Object.values(statType).map((statName) => {
    board.overall[statName] = 0;
    board.personal[statName] = 0;
  });
  const [boardBonus, setBoardBonus] = useState(board);

  //4.공격 대상 정보 - 주로 Chart와 Settings 에서 씀
  //데미지 계산에 직접적으로 연관되는 stat과 type 데이터만 있음
  let targetChar = objectDeepCopy(characterDB.find(c => c.name[0] === '코미'));
  let opponent = {
    stat : targetChar.stat,
    type : targetChar.type
  };
  opponent.stat.MATK = 10000;
  const [targetData, setTargetData] = useState(opponent);

  //5.계산식 변수 - 주로 Chart와 Settings 에서 씀
  //공격력 * 스킬계수 * 방어도뎀감 * 치명뎀뻥
  //여기서 설정할건 방어도뎀감과 치명뎀뻥 공식
  const formula = {
    DEFV : {
      formula : 'max(DEF - ATK * 2.105, 0)',
      allowedVariables : ['ATK', 'DEF', 'CRIC', 'CRID', 'CCRES', 'CDRES'],
      minValue : 0,
      maxValue : Infinity
    },
    reduction : {
      formula : 'DEFV / (DEFV + 1300)',
      allowedVariables : ['DEFV', 'ATK', 'DEF', 'CRIC', 'CRID', 'CCRES', 'CDRES'],
      minValue : 0,
      maxValue : 80
    },
    CRIDV : {
      formula : 'CRID - CDRES',
      allowedVariables : ['ATK', 'DEF', 'CRIC', 'CRID', 'CCRES', 'CDRES'],
      minValue : 0,
      maxValue : Infinity
    },
    criticalDamage : {
      formula : 'ln(CRIDV) / ln(6)',
      allowedVariables : ['CRIDV', 'ATK', 'DEF', 'CRIC', 'CRID', 'CCRES', 'CDRES'],
      minValue : 115,
      maxValue : 400
    }
  };
  const [damageFormula, setDamageFormula] = useState(formula);

  //쓰는 곳 : characterInfoSettings
  const [searchNameClass, setSearchNameClass] = useState(characterNames.find(name => name.name[0] == '버터'));


  //provider에서 context로 제공할 state 목록
  const providerValue = {
    characterDB, setCharacterDB,
    selectedCharList, setSelectedCharList,
    boardBonus, setBoardBonus,
    targetData, setTargetData,
    damageFormula, setDamageFormula,
    searchNameClass, setSearchNameClass,
  }
  return (
    <DmgCalcContext.Provider value={providerValue}>
      {children}
    </DmgCalcContext.Provider>
  )
}