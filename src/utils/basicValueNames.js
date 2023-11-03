/**
 * @param gloomy 우울
 * @param jolly 활발
 * @param cool 냉정
 * @param mad 광기
 * @param naive 순수
 */
const personality = {
  gloomy: "gloomy",
  jolly: "jolly",
  cool: "cool",
  mad: "mad",
  naive: "naive",
}
const role = {
  dealer: "dealer",
  tanker: "tanker",
  supporter: "supporter",
}
const attackType = {
  physic: "physic",
  magic: "magic",
}
const position = {
  front: "front",
  middle: "middle",
  back: "back",
}
const buff = {
  none: "none_buff",
  selfDamageUp: "selfDamageUp",
  allyDamageUp: "allyDamageUp",
  allyCriDamageUp: "allyCriDamageUp",
  selfSPHeal : "selfSPHeal",
  allySPHeal : "allySPHeal",
  barrier : "barrier",
  allyHeal : "allyHeal",
  allAllyHeal : "allAllyHeal",
  selfHealSec : "selfHealSec",
  selfHealOnce : "selfHealOnce",
  allyTakeDamageDown : "allyTakeDamageDown"
}
const debuff = {
  none: "none_debuff",
  burn: "burn",
  poison: "poison",
  freeze: "freeze",
  stun: "stun",
  taunt: "taunt", //도발
  electricShock: "electricShock", //감전
  bitterness: "bitterness", //쓰라림
  SPDown: "SPDown", //sp 감소
  silence: "silence", //침묵
  noise: "noise", //소음
  polymorph: "polymorph", //변이
  frostbite: "frostbite", //동상
  attackSpeedDown: "attackSpeedDown", //공속 감소
  invincibility: "invincibility", //무적
}
const statType = {
  HP: 'HP',
  ATK: 'ATK',
  MATK: 'MATK',
  DEF: 'DEF',
  MDEF: 'MDEF',
  CRIC: 'CRIC',
  CRID: 'CRID',
  CCRES: 'CCRES',
  CDRES: 'CDRES',
}

class Name {
  constructor(KOR, ENG) {
    this.name = [KOR, ENG];
  }
}

class Type {
  constructor(personality, role, attackType, position, race) {
    this.personality = personality;
    this.role = role;
    this.attackType = attackType;
    this.position = position;
    this.race = race;
  }
}

class Status {
  constructor(star, HP, ATK, DEF, MDEF, CRIC, CRID, CCRES, CDRES) {
    this.star = star;
    this.HP = HP;
    this.ATK = ATK;
    this.DEF = DEF;
    this.MDEF = MDEF;
    this.CRIC = CRIC;
    this.CRID = CRID;
    this.CCRES = CCRES;
    this.CDRES = CDRES;
  }
}


class NormalAttack {
  constructor(nDamage, nAreaOfEffect, nBuff, nDebuff) {
    this.percentage = nDamage;
    this.areaOfEffect = nAreaOfEffect;
    this.buff = nBuff;
    this.debuff = nDebuff;
  }
}
class ReinforcedAttack {
  constructor(rDamage, rAreaOfEffect, rBuff, rDebuff) {
    this.percentage = rDamage;
    this.areaOfEffect = rAreaOfEffect;
    this.buff = rBuff;
    this.debuff = rDebuff;
  }
}

class AdmissionSkill {
  constructor(name, percentage, areaOfEffect, maxKillRecast, buff, debuff) {
    this.name = name;
    this.percentage = percentage;
    this.areaOfEffect = areaOfEffect;
    this.maxKillRecast = maxKillRecast;
    this.buff = buff;
    this.debuff = debuff;
  }
}
class GraduateSkill {
  constructor(name, recastTime, percentage, areaOfEffect, maxKillRecast, buff, debuff) {
    this.name = name;
    this.recastTime = recastTime;
    this.percentage = percentage;
    this.areaOfEffect = areaOfEffect;
    this.maxKillRecast = maxKillRecast;
    this.buff = buff;
    this.debuff = debuff;
  }
}

class Buff {
  constructor(type, time, percentage) {
    this.type = type;
    this.time = time;
    this.percentage = percentage;
  }
}
class Debuff {
  constructor(type, time, percentage) {
    this.type = type;
    this.time = time;
    this.percentage = percentage;
  }
}

class Character {
  constructor(nameClass, type, stat, normalAttack, reinforcedAttack, admissionSkill, graduateSkill) {
    this.name = nameClass.name;
    this.type = type;
    this.stat = stat;
    this.normalAttack = normalAttack;
    this.reinforcedAttack = reinforcedAttack;
    this.admissionSkill = admissionSkill;
    this.graduateSkill = graduateSkill;
  }
}

const personalityColorTable = {
  [personality.naive]: '#46B92D',
  [personality.cool]: '#109FBC',
  [personality.gloomy]: '#7751E1',
  [personality.jolly]: '#C6AC06',
  [personality.mad]: '#C42121'
};

const race = {
  dragon: 'dragon',
  elf: 'elf',
  fairy: 'fairy',
  furry: 'furry',
  ghost: 'ghost',
  spirit: 'spirit',
  witch: 'witch'
}

export { personality, role, attackType, position, buff, debuff, statType,
  Name, Type, Status, NormalAttack, ReinforcedAttack, AdmissionSkill, GraduateSkill,
  Buff, Debuff, Character, personalityColorTable, race };