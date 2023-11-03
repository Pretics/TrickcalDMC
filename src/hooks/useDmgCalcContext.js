import { useContext } from "react";
import DmgCalcContext from "contexts/dmgCalcContext";

/**
 * context 얻기용 커스텀 Hook.
 * characterDB, setCharacterDB,
 * selectedCharList, setSelectedCharList,
 * boardBouns, setBoardBouns,
 * targetData, setTargetData,
 * damageFormula, setDamageFormula
 */
export function useDmgCalcContext() {
  return useContext(DmgCalcContext);
}