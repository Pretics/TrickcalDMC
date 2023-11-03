'use client'

//#region import
import React, { useState } from "react";

import styled from "styled-components";

import BoardSettings from "./component/boardSettings";
import StatSettings from "./component/statSettings";
import FormulaSettings from "./component/formulaSettings";
import InfoSettings from "./component/characterInfoSettings";

//#endregion import





//====================================================================





//#region MainComponent - ChartSettingBox

//#region Styled Components
const ChartSettingBoxDiv = styled.div`
  width: 100%;
  height: 100%;
`;
const ChartSetting_nav = styled.nav`
  height: 30px;
  font-family: 'Katuri';
  font-size: 16px;
  font-weight: 100;
  background-color: #4F5363;
`;
const ChartSetting_nav_ul = styled.ul`
  list-style: none;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
`;
const StyledNavLi = styled.li`
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  background-color: ${props => props.color};

  &:hover {
    background-color: black;
  }
`;
const ChartSetting_article = styled.article`
  height: 768px;
  background-color: #CDE793;
  border: 1px solid #E6E6E6;
  overflow-y: scroll;
  padding: 20px;
`;
//#endregion StyledComponenets

const ChartSettingBox = () => {

  //#region Component Settings

  const MODE = {
    board: 'board',
    formula: 'formula',
    stat: 'stat',
    info: 'info'
  }

  const settingArticles = {
    [MODE.board]: <BoardSettings />,
    [MODE.formula]: <FormulaSettings />,
    [MODE.stat]: <StatSettings />,
    [MODE.info]: <InfoSettings />,
  }

  const [settingMode, setSettingMode] = useState(MODE.info);

  function handleNavClick(mode) {
    setSettingMode(mode);
  }

  function getNavColor(myMode) {
    if (myMode == settingMode) {
      return 'black';
    }
    else {
      return '#4F5363';
    }
  }

  //#endregion Compnent Settings

  return (
    <ChartSettingBoxDiv>
      <ChartSetting_nav>
        <ChartSetting_nav_ul>
          <StyledNavLi onClick={() => handleNavClick(MODE.stat)}
            color={getNavColor(MODE.stat)}>
            <span>피격 대상 정보</span>
          </StyledNavLi>
          <StyledNavLi onClick={() => handleNavClick(MODE.board)}
            color={getNavColor(MODE.board)}>
            <span>보드</span>
          </StyledNavLi>
          <StyledNavLi onClick={() => handleNavClick(MODE.formula)}
            color={getNavColor(MODE.formula)}>
            <span>계산 공식</span>
          </StyledNavLi>
          <StyledNavLi onClick={() => handleNavClick(MODE.info)}
            color={getNavColor(MODE.info)}>
            <span>전체 사도 정보</span>
          </StyledNavLi>
        </ChartSetting_nav_ul>
      </ChartSetting_nav>
      <ChartSetting_article>
        {
          settingArticles[settingMode]
        }
      </ChartSetting_article>
    </ChartSettingBoxDiv>
  );
}

//#endregion MainComponent - ChartSettingBox



export default ChartSettingBox;