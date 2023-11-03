'use client'

import Image from 'next/image';
import styled from 'styled-components';

import characterData from "assets/characterData.js";
import { personalityColorTable } from 'utils/basicValueNames';
import { useDmgCalcContext } from 'hooks/useDmgCalcContext';





//====================================================================





const width = 64;
const height = width;

const colorTable = personalityColorTable;





//====================================================================





//#region Styled Components
const StyledImageBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`
const StyledImage = styled(Image)`
  border-radius: 10%;
  background: linear-gradient(to top,
    ${props => props.backgroundcolor[0]}, ${props => props.backgroundcolor[1]});
  transition: 0.2s ease-out background-position;
  background-size: 100% ${height * 2}px;
  background-position: 0 ${height};

  ${StyledImageBlock}:hover &{
    background-position: 0 -${height}px;
  }
`;
const StyledName = styled.span`
  white-space: nowrap;
  font-family: 'OneMobilePop';
  font-size: 12px;
  font-weight: 100;
  text-align: center;
  margin-top: 2px;
  color: ${props => props.$color};
  transition: 0s ease-out;

  ${StyledImageBlock}:hover & {
    color: black;
  }
`
//#endregion Styled Components

function ImageBlock({ character }) {
  const { selectedCharList, setSelectedCharList } = useDmgCalcContext()
  let engName = character.name[1];
  let namePath = `${engName}.webp`;
  let isSelected = selectedCharList[engName];

  const imageClick = () => {
    let copy = { ...selectedCharList };
    copy[engName] = !copy[engName];
    setSelectedCharList(copy);
  }

  const backgroundColor =
    (isSelected)
      ? [colorTable[character.type.personality], '#1A222E']
      : ['#AAAAAA', '#AAAAAA'];

  const textColor = (isSelected) ? 'black' : '#AAAAAA';

  return (
    <li>
      <StyledImageBlock
        onClick={() => imageClick()}
      >
        <StyledImage
          src={'/images/default/' + namePath}
          alt={`${character.name[0]}`}
          width={width}
          height={height}
          backgroundcolor={backgroundColor}
          priority>
        </StyledImage>
        <StyledName $color={textColor}>{character.name[0]}</StyledName>
      </StyledImageBlock>
    </li>
  );
}





//====================================================================




//#region Styled Components
const ImageBlockContainer = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
`
const ImageBlockContainer_ul = styled.ul`
list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  justify-items: center;
  gap: 5px 10px;
`
//#endregion Styled Components

function ImageBox({ isCharacterSelected, clickHandler }) {

  return (
    <ImageBlockContainer>
      <ImageBlockContainer_ul>
        {
          characterData.map((data) => {
            return (<ImageBlock
              character={data}
              key={data.name[1]}
              isCharacterSelected={isCharacterSelected}
              clickHandler={clickHandler}
            />);
          })
        }
      </ImageBlockContainer_ul>
    </ImageBlockContainer>
  );
}





//====================================================================




export default ImageBox;