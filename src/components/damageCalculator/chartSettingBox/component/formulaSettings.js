import React from "react";
import { Parser } from "expr-eval";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { useDmgCalcContext } from "hooks/useDmgCalcContext";
import { deepCopy } from "utils/deepCopy";





//===================================================================================





//#region Styled
const FormulaBlock_Div = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  background-color: #F3F9E7;
  border-radius: 10px;
  padding: 5px;
`;
const FormulaBlock_NameContainer = styled.div`
  display: flex;
  align-items: center;
`
const FormulaBlock_Name = styled.span`
  min-width: 170px;
  height: 100%;

  text-align: center;
  padding-right: 10px;
`
const FormulaBlock_Input = styled.input`
  width: 100%;
  height: 100%;

  padding: 5px;
  border-radius: 5px;
  resize: none;

  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;
`;
const FormulaBlock_ValidateButton = styled.button`
  min-width: 100px;
  height: 50px;

  border: 4px solid ${props => props.$borderColor};
  border-radius: 10px;
  background-color: ${props => props.$backgroundColor};

  color: black;
  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20px;
  white-space: no-wrap;
  margin-left: 15px;
`;
//#endregion Styled

const FormulaBlock = ({ formulaType, formulaName }) => {

  //#region value
  const { damageFormula, setDamageFormula } = useDmgCalcContext();
  const [formulaText, setFormulaText] = useState(damageFormula[formulaType].formula);
  const allowedVariables = damageFormula[formulaType].allowedVariables;
  const parser = new Parser();
  //#endregion value

  //#region function
  /**
   * 정규 표현식을 사용하여 허용되지 않는 문자가 문자열에 포함되어 있는지 확인합니다.
   * 
   * 해당 표현식은 숫자, 영어, 뒤에 적힌 특수문자들을 '제외한' 문자가 있는지 확인함.
   * 해당 문자 : 숫자, 영어, + - * / ( ) { } [ ] . ^ | & ; , = < > ? !
   * 이었는데 계산에 쓰는거 말고 전부 컷했음
   * /[^0-9 a-z A-Z + \- * / \( \) . ^ ! ]/
   * 
   * @param {string} str 확인할 문자열
   * @returns 테스트 결과 boolean
   */
  function containsNonAllowedCharacters(str) {
    const regex = /[^0-9 a-z A-Z + \- * / \( \) . , ^ ! ]/;
    return regex.test(str);
  }

  /**
   * 공식과 변수 목록을 문자열, 문자열 배열로 받아 유효한 식인지 검사합니다.
   * 
   * @param {string} formula 공식 문자열
   * @param {object} allowedVariables 허용할 변수 문자열 배열
   * @returns 유효한 식이면 true, 아니면 false
   */
  function validateTest(formula, allowedVariables) {
    //1.공식 문자열을 expression 객체로 바꿉니다
    let expr = 0;
    try {
      expr = parser.parse(formula);
    }
    catch {
      return false;
    }
    //2.공식에서 변수를 추출합니다.
    let variables = expr.variables();

    //3.추출한 변수들이 허용된 변수 목록에 모두 있는지 살펴봅니다.
    for (let i = 0; i < variables.length; i++) {
      //변수가 허용 목록에 없음
      if (allowedVariables.includes(variables[i]) == false) {
        //더 이상 확인하지않고 종료 (유효성 실패 유지)
        return false;
      }
    }

    //4.변수가 허용 목록에 모두 있으면, 실제로 값을 넣어서 계산이 제대로 되는지 확인해봅니다.
    //4-1. 식에 넣어줄 변수에 테스트값을 집어넣습니다.
    let vars = {};
    variables.map(str => { vars[str] = 1; });

    //4-2.변수를 넣고 실제로 계산합니다.
    let testResult = 0;
    try {
      testResult = expr.evaluate(vars);
    }
    catch {
      return false;
    }

    //5.테스트를 모두 통과했으면 true를 반환합니다.
    return true;
  }
  //#endregion function

  //#region state
  const [isFormulaValidate, setIsFormulaValidate] = useState(false);

  function handleChangeFormulaText(e) {
    let value = e.target.value;
    //허용되지 않는 문자는 전부 컷합니다.
    if (containsNonAllowedCharacters(value)) {
      return;
    }
    setFormulaText(value);
  }
  //공식이 변경되면 우선 validate 를 false로 설정하고
  //유효성 검사를 진행합니다.
  useEffect(() => {
    setIsFormulaValidate(false);
    if (validateTest(formulaText, allowedVariables)) {
      setIsFormulaValidate(true);
      updateFormula();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaText]);

  function updateFormula() {
    let copy = deepCopy(damageFormula);
    copy[formulaType].formula = deepCopy(formulaText);
    setDamageFormula(copy);
  }

  const validateResultText = {
    [true]: '유효한 식',
    [false]: '잘못된 식'
  };
  //#endregion state

  return (
    <FormulaBlock_Div>

      <FormulaBlock_NameContainer>
        <FormulaBlock_Name>{formulaName + ' : '}</FormulaBlock_Name>
      </FormulaBlock_NameContainer>

      <FormulaBlock_Input type='text' value={formulaText} onChange={handleChangeFormulaText} name={formulaType} />

      <FormulaBlock_ValidateButton
        $borderColor={isFormulaValidate ? 'green' : 'red'}
        $backgroundColor={isFormulaValidate ? '#E9F5CF' : '#FFDD74'}>
        {validateResultText[isFormulaValidate]}
      </FormulaBlock_ValidateButton>

    </FormulaBlock_Div>
  );
}





//===================================================================================





const FormulaSettingsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  height: 100%;

  font-family: 'OneMobilePop';
  font-weight: 100;
  font-size: 20;

  color: black;
`;

/**
 * 방어력 뎀감 계산 영역
 * 
 * 해야하는 것
 * 1.공식 수정
 * 2.유효성 검사
 * 3.Context 업데이트
 * 
 * @returns Components
 */
const FormulaBox = ({ settingMode }) => {

  //#region Component Settings

  //#region value & function setting

  const mode = {
    reduction: 'reduction',
    criticalDamage: 'criticalDamage'
  }
  const formulaType = {
    DEFV: 'DEFV',
    reduction: 'reduction',
    CRIDV: 'CRIDV',
    criticalDamage: 'criticalDamage'
  }

  //#endregion Component Settings

  function Components() {
    if (settingMode == mode.reduction) {
      return (
        <>
          <FormulaBlock formulaType={formulaType.DEFV} formulaName='방어도(DEFV)'></FormulaBlock>
          <FormulaBlock formulaType={formulaType.reduction} formulaName='데미지 감소율'></FormulaBlock>
        </>
      );
    }
    else if (settingMode == mode.criticalDamage) {
      return (
        <>
          <FormulaBlock formulaType={formulaType.CRIDV} formulaName='치명 수치(CRIDV)'></FormulaBlock>
          <FormulaBlock formulaType={formulaType.criticalDamage} formulaName='치명타 증가율'></FormulaBlock>
        </>
      );
    }
  }

  return (
    <FormulaSettingsDiv>
      <Components />
    </FormulaSettingsDiv>
  );
}





//====================================================================





//#region styled Components
const FormulaSection = styled.section`
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
const FormulaNav = styled.nav`
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
const FormulaArticle = styled.article`
  height: 100%;

  background-color: #E9F5CF;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
`
const FormulaArticle_TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D7EFA3;
  height: 40px;
  border-radius: 10px;
`
const FormulaArticle_Title = styled.span`
  text-align: center;
  color: black;
`
const FormulaArticle_BonusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding-top: 10px;
`
const RefsContainer = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 5px;
`
const Refs = styled.span`
  color: black;
  
  background-color: #F3F9E7;
  padding: 10px;
  border-radius: 6px;

  text-align: center;
`
//#endregion

//#region FormulaSetting
const FormulaSettings = () => {

  //#region Component Settings

  const mode = {
    reduction: 'reduction',
    criticalDamage: 'criticalDamage'
  }
  const [currentMode, setCurrentMode] = useState(mode.reduction);

  function handleButtonClick(buttonMode) {
    setCurrentMode(buttonMode);
  }
  function getButtonBackgroundColor(buttonMode) {
    return (buttonMode == currentMode) ? '#BDDD7F' : '#F3FBE3';
  }

  //#endregion Component Settings

  return (
    <FormulaSection>

      <FormulaNav>

        <TabTitleButton
          $backgroundColor={() => getButtonBackgroundColor(mode.reduction)}
          onClick={() => handleButtonClick(mode.reduction)}>
          <TabTitle>데미지 감소</TabTitle>
        </TabTitleButton>

        <TabTitleButton
          $backgroundColor={() => getButtonBackgroundColor(mode.criticalDamage)}
          onClick={() => handleButtonClick(mode.criticalDamage)}>
          <TabTitle>치명 데미지</TabTitle>
        </TabTitleButton>

      </FormulaNav>

      <FormulaArticle>

        <FormulaArticle_TitleContainer>
          <FormulaArticle_Title>계산식</FormulaArticle_Title>
        </FormulaArticle_TitleContainer>

        <FormulaArticle_BonusContainer>
          <FormulaBox settingMode={currentMode} />
        </FormulaArticle_BonusContainer>

      </FormulaArticle>

      <FormulaArticle>

        <FormulaArticle_TitleContainer>
          <FormulaArticle_Title>사용 가능 변수</FormulaArticle_Title>
        </FormulaArticle_TitleContainer>

        <FormulaArticle_BonusContainer>
          <RefsContainer>
            <Refs>물리/마법 공격력(ATK)</Refs>
            <Refs>물리/마법 방어력(DEF)</Refs>
            <Refs>치명타(CRIC)</Refs>
            <Refs>치명 피해(CRID)</Refs>
            <Refs>치명타 저항(CCRES)</Refs>
            <Refs>치명 피해 저항(CDRES)</Refs>
            <Refs>방어도(DEFV)</Refs>
            <Refs>치명수치(CRIDV)</Refs>
            <Refs>E(자연상수)</Refs>
            <Refs>PI(π)</Refs>
          </RefsContainer>
        </FormulaArticle_BonusContainer>

      </FormulaArticle>

      <FormulaArticle>

        <FormulaArticle_TitleContainer>
          <FormulaArticle_Title>사용 가능 함수</FormulaArticle_Title>
        </FormulaArticle_TitleContainer>

        <FormulaArticle_BonusContainer>
          <RefsContainer>
            <Refs>min(a, b, ...)</Refs>
            <Refs>max(a, b, ...)</Refs>
            <Refs>pow(x, y)</Refs>
            <Refs>sqrt(x)</Refs>
            <Refs>abs(x)</Refs>
            <Refs>ln(x)</Refs>
            <Refs>log(x)</Refs>
            <Refs>log10(x)</Refs>
            <Refs>log2(x)</Refs>
            <Refs>log1p(x)</Refs>
            <Refs>floor(x)</Refs>
            <Refs>round(x)</Refs>
            <Refs>ceil(x)</Refs>
            <Refs>exp(x)</Refs>
            <Refs>expm1(x)</Refs>
            <Refs>sin(x)</Refs>
            <Refs>cos(x)</Refs>
            <Refs>tan(x)</Refs>
            <Refs>asin(x)</Refs>
            <Refs>acos(x)</Refs>
            <Refs>atan(x)</Refs>
            <Refs>asinh(x)</Refs>
            <Refs>acosh(x)</Refs>
            <Refs>atanh(x)</Refs>
            <Refs>cbrt(x)</Refs>
            <Refs>hypot(a, b)</Refs>
            <Refs>pyt(a, b)</Refs>
            <Refs>atan2(y, x)</Refs>
            <Refs>roundTo(x, n)</Refs>
          </RefsContainer>
        </FormulaArticle_BonusContainer>

      </FormulaArticle>

    </FormulaSection>
  )
}
//#endregion

export default FormulaSettings;