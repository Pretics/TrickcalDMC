

import { personality, role, attackType, position, buff, debuff, 
  Name, Type, Status, NormalAttack, ReinforcedAttack,
  AdmissionSkill, GraduateSkill, Buff, Debuff, Character, race }
  from 'utils/basicValueNames';

/*
normalAttack : 평타 [기본, 강화]
admissionSkill : 저학년 스킬
graduateSkill : 고학년 스킬
AOE : Area of Effect. 범위기 유무
 - 평타의 경우[기본평타, 강화평타]
      (0 : 단일타격 / 1 : 범위기)
Pt : percentage. percentage = 피해량 백분율
percentage [ [첫번째 공격], [두번째 공격], ... ]
혹시라도 계수가 여러 타수에 나눠져있는 사도가 나올 때를 대비해서
배열로 만듬.
*/


const noValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//percentage
const noDamage = [noValue];
//attackNumber
const attackOnce = 1;
//areaOfEffect
const singleTarget = [0];
const areaAttack = [1];
//maxKillRecast
const noKillRecast = 0;
//buff
const noBuff = new Buff([buff.none], [noValue], [noValue]);
//debuff
const noDebuff = new Debuff([debuff.none], [noValue], [noValue]);
//ReinforcedAttack
const noReinforcedAttack = new ReinforcedAttack(0, singleTarget, noBuff, noDebuff);

//sample
let c = new Character(
  new Name("더미", "Dummy"),
  new Type(personality.cool, role.dealer, attackType.magic, position.back),
  new Status(3, 10000, 1000, 2000, 2000, 900, 900, 800, 800),
  new NormalAttack(50, singleTarget, noBuff, noDebuff),
  noReinforcedAttack,
  new AdmissionSkill(
    "저학년 스킬 이름",
    noDamage,
    singleTarget, noKillRecast,
    noBuff, noDebuff
  ),
  new GraduateSkill(
    "고학년 스킬 이름", 60,
    noDamage,
    areaAttack, noKillRecast,
    noBuff, noDebuff
  ),
)

const characterData = [
  //=========================================================================
  new Character(
    new Name("네르", "Ner"),
    new Type(personality.mad, role.supporter, attackType.magic, position.front, race.fairy),
    new Status(3, 95572, 5379, 9898, 9787, 9297, 6144, 7068, 5959),
    new NormalAttack(80, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "세계수의 계시",
      noDamage,
      singleTarget, noKillRecast,
      new Buff(buff.allyDamageUp, 6, 26), noDebuff
    ),
    new GraduateSkill(
      "엘드르의 축복", 42,
      [ [510, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      new Buff(buff.allyCriDamageUp, 6, 30), noDebuff
    )
  ),
  //=========================================================================
  new Character(
    new Name("에르핀", "Erpin"),
    new Type(personality.naive, role.dealer, attackType.magic, position.front, race.fairy),
    new Status(3, 47333, 6487, 9080, 9308, 7082, 6060, 6984, 6104),
    new NormalAttack(55, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "마력탄 폭주",
      [ [350, 370, 395, 420, 455, 490, 530, 575, 620, 675] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "돌겨어어어!!! 억...?", 44,                  
      [ [525, 555, 590, 635, 680, 735, 795, 860, 935, 1010] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    )
  ),
  //=========================================================================
  new Character(
    new Name("에슈르", "Ashur"),
    new Type(personality.gloomy, role.dealer, attackType.magic, position.back, race.fairy),
    new Status(3, 50107, 7265, 7163, 7208, 6302, 5756, 5716, 6241),
    new NormalAttack(55, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(70, singleTarget, noBuff, new Debuff(debuff.burn, 2, 0)),
    new AdmissionSkill(
      "빵템피드",
      [ [375, 395, 420, 450, 485, 525, 565, 610, 665, 720] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "빵테오", 58,
      [ [670, 710, 760, 810, 870, 940, 1020, 1100, 1190, 1290] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.stun, 4, 0)
    ),
  ),
  //=========================================================================
  new Character(
    new Name("클로에", "Chloe"),
    new Type(personality.mad, role.tanker, attackType.magic, position.front, race.fairy),
    new Status(3, 158777, 6012, 12504, 15562, 7512, 6803, 10180, 11069),
    new NormalAttack(70, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(90, areaAttack, noBuff, noDebuff),
    new AdmissionSkill(
      "세바스티안 뤼지흐",
      [ [180, 190, 200, 215, 235, 255, 275, 300, 325, 355] ],
      singleTarget, noKillRecast,
      new Buff(buff.barrier, 6, 57),
      new Debuff(debuff.taunt, 3, 0)
    ),
    new GraduateSkill(
      "세바스티안 에카제", 50,
      [ [730, 780, 830, 890, 950, 1030, 1110, 1200, 1310, 1410] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("코미", "Kommy"),
    new Type(personality.gloomy, role.tanker, attackType.physic, position.front, race.furry),
    new Status(3, 137835, 6485, 13342, 11546, 6570, 6462, 6341, 7952),
    new NormalAttack(110, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(130, areaAttack, noBuff, new Debuff(debuff.stun, 1.5, 0)),
    new AdmissionSkill(
      "푹신푹신 타임",
      noDamage,
      singleTarget, noKillRecast,
      new Buff(buff.selfHeal, 4, 15), noDebuff
    ),
    new GraduateSkill(
      "엘프산 특제 사료", 56,
      [ [530, 560, 590, 640, 680, 740, 800, 860, 940, 1010] ],
      areaAttack, noKillRecast,
      new Buff(buff.selfHealOnce, 1, 500), noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("루포", "Rufo"),
    new Type(personality.jolly, role.dealer, attackType.physic, position.middle, race.furry),
    new Status(3, 41273, 5236, 7083, 6887, 6415, 7979, 4957, 4397),
    new NormalAttack(120, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "루포류 신속베기",
      [ [102, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      singleTarget, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "오의 여우회전!", 34,
      [ [730, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("디아나", "Diana"),
    new Type(personality.mad, role.supporter, attackType.magic, position.middle, race.furry),
    new Status(3, 50399, 5091, 8097, 8122, 5844, 6066, 5461, 7254),
    new NormalAttack(110, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(125, singleTarget, new Buff(buff.allyHeal, 1, 250), noDebuff),
    new AdmissionSkill(
      "자연 치유",
      noDamage,
      singleTarget, noKillRecast,
      new Buff(buff.allAllyHeal, 1, 
        [1030, 1090, 1160, 1240, 1335, 1440, 1560, 1685, 1830, 1980]
      ), noDebuff
    ),
    new GraduateSkill(
      "진정한 치료법", 32,
      [ [1740, 1830, 1950, 2100, 2250, 2430, 2640, 2850, 3090, 3360] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("버터", "Butter"),
    new Type(personality.jolly, role.dealer, attackType.physic, position.back, race.furry),
    new Status(3, 52879, 6120, 9680, 6944, 7404, 6549, 5356, 4354),
    new NormalAttack(55, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(70, singleTarget, noBuff, noDebuff),
    new AdmissionSkill(
      "버터 플라이!",
      [ [220, 240, 260, 260, 300, 320, 340, 380, 400, 440] ],
      singleTarget, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "새쭁! 쓔튜라이크!", 37,
      [ [230, 250, 260, 280, 300, 320, 350, 380, 410, 450] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("티그", "Tig"),
    new Type(personality.jolly, role.dealer, attackType.physic, position.front, race.furry),
    new Status(3, 122226, 5691, 10707, 8652, 6727, 5821, 7182, 8785),
    new NormalAttack(50, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(100, areaAttack, new Buff(buff.selfSPHeal, 1, 120), noDebuff),
    new AdmissionSkill(
      "소닉 블레이드",
      [ [320, 335, 360, 385, 415, 445, 485, 525, 565, 615] ],
      singleTarget, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "오버드라이브", 20,
      [ [320, 335, 350, 365, 380, 395, 410, 425, 440, 455] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("아멜리아", "Amelia"),
    new Type(personality.cool, role.supporter, attackType.physic, position.back, race.elf),
    new Status(3, 69171, 3909, 8796, 8995, 6837, 7769, 2920, 4763),
    new NormalAttack(40, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(55, areaAttack, noBuff, new Debuff(debuff.electricShock, 3, 0)),
    new AdmissionSkill(
      "새틀라이트 전술폭격",
      [ [285, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.electricShock, 6, 0)
    ),
    new GraduateSkill(
      "초전도 레이저 캐논", 29,
      [ [1140, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.stun, 4, 0)
    ),
  ),
  //=========================================================================
  new Character(
    new Name("엘레나", "Elena"),
    new Type(personality.cool, role.dealer, attackType.physic, position.middle, race.elf),
    new Status(3, 76676, 5993, 9347, 6758, 7538, 8147, 8182, 7592),
    new NormalAttack(165, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "전술드론 MK-2",
      [ [290, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.electricShock, 4, 0)
    ),
    new GraduateSkill(
      "코드네임 D - CAT", 28,
      [ [760, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("칸나", "Canna"),
    new Type(personality.jolly, role.dealer, attackType.physic, position.back, race.elf),
    new Status(3, 86991, 4694, 10201, 9995, 7921, 7644, 5147, 7873),
    new NormalAttack(55, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(82, areaAttack, noBuff, new Debuff(debuff.stun, 3, 0)),
    new AdmissionSkill(
      "큰 거 한 방",
      [ [475, 500, 535, 570, 615, 665, 720, 780, 840, 915] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "양자폭탄", 51,
      [ [950, 1000, 1070, 1140, 1230, 1330, 1440, 1560, 1680, 1830] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("실라", "Sylla"),
    new Type(personality.cool, role.dealer, attackType.physic, position.back, race.elf),
    new Status(3, 53704, 7711, 8036, 7841, 7614, 8164, 5638, 6935),
    new NormalAttack(70, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "래피드 샷",
      [ [390, 410, 435, 470, 500, 540, 590, 630, 690, 740] ],
      singleTarget, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "헥토파스칼 스윙", 25,
      [ [970, 1020, 1090, 1170, 1250, 1350, 1460, 1580, 1720, 1860] ],
      singleTarget, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("멜루나", "Meluna"),
    new Type(personality.cool, role.supporter, attackType.magic, position.back, race.elf),
    new Status(3, 43971, 4956, 6993, 8020, 7219, 6178, 5567, 5221),
    new NormalAttack(20, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(35, singleTarget, noBuff, noDebuff),
    new AdmissionSkill(
      "올 때 멜루나~",
      [ [240, 255, 270, 290, 315, 340, 365, 395, 430, 465] ],
      singleTarget, noKillRecast,
      new Buff(buff.allAllyHeal, 1, 300), noDebuff
    ),
    new GraduateSkill(
      "멜론머스크 X", 20,
      [ [290, 305, 325, 350, 375, 405, 440, 475, 515, 560] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("우이", "Ui"),
    new Type(personality.jolly, role.supporter, attackType.magic, position.middle, race.spirit),
    new Status(3, 74275, 6277, 9847, 10033, 7991, 6082, 7184, 6885),
    new NormalAttack(70, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(90, singleTarget, noBuff, noDebuff),
    new AdmissionSkill(
      "개굴비",
      [ [50, 55, 60, 65, 70, 75, 80, 90, 95, 105] ],
      areaAttack, noKillRecast,
      new Buff(buff.allAllyHeal, 4, 280), noDebuff
    ),
    new GraduateSkill(
      "낼름~퉤!", 53,
      noDamage,
      singleTarget, noKillRecast,
      new Buff([buff.allyHeal, buff.barrier], [1, 6], [1045, 35]), noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("림", "Rim"),
    new Type(personality.gloomy, role.dealer, attackType.physic, position.front, race.ghost),
    new Status(3, 117649, 5237, 11168, 9815, 5814, 4916, 4896, 6464),
    new NormalAttack(55, areaAttack, noBuff, new Debuff(debuff.bitterness, 2, 0)),
    noReinforcedAttack,
    new AdmissionSkill(
      "스크래치 사이드",
      [ [120, 125, 135, 145, 155, 165, 180, 195, 210, 230] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.bitterness, 10, 0)
    ),
    new GraduateSkill(
      "그림 하베스트", 56,
      [ [480, 500, 530, 570, 620, 660, 720, 780, 840, 910] ],
      areaAttack, noKillRecast,
      new Buff(buff.selfHeal, 1, 200), noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("셰이디", "Shady"),
    new Type(personality.mad, role.dealer, attackType.physic, position.front, race.ghost),
    new Status(3, 75762, 5015, 9494, 9541, 4873, 6290, 5170, 6684),
    new NormalAttack(95, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "불 좀 꺼줄래?",
      [ [1320, 1395, 1485, 1590, 1710, 1845, 1995, 2160, 2340, 2535] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.SPDown, 1, [23.5, 25, 26.5, 28.5, 31, 33.5, 36, 39, 42.5])
    ),
    new GraduateSkill(
      "타임 오브 셰이디", 46,
      [ [660, 700, 740, 800, 860, 920, 1000, 1080, 1170, 1270] ],
      singleTarget, noKillRecast,
      noBuff, new Debuff(debuff.silence, 10, 0)
    ),
  ),
  //=========================================================================
  new Character(
    new Name("시온 더 다크불릿", "Xion the Darkbullet"),
    new Type(personality.gloomy, role.dealer, attackType.physic, position.back, race.ghost),
    new Status(3, 58461, 8015, 8930, 8879, 10298, 10050, 7014, 8230),
    new NormalAttack(55, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(70, singleTarget, noBuff, new Debuff(debuff.stun, 2, 0)),
    new AdmissionSkill(
      "멸.망.의.씨.앗★",
      [ [85, 90, 95, 100, 110, 120, 130, 140, 155, 165] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "절.대.영.점", 27,
      [ [305, 325, 345, 370, 395, 430, 465, 500, 545, 590] ],
      areaAttack, 2,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("다야", "Daya"),
    new Type(personality.naive, role.dealer, attackType.magic, position.back, race.dragon),
    new Status(3, 60317, 7350, 8871, 9099, 8220, 9363, 6225, 8085),
    new NormalAttack(165, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "다이아 피어스",
      [ [205, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.bitterness, 8, 0)
    ),
    new GraduateSkill(
      "다이아 브레...츄!", 40,
      [ [310, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("키디언", "Kidian"),
    new Type(personality.gloomy, role.dealer, attackType.physic, position.front, race.dragon),
    new Status(3, 93787, 3693, 10701, 10476, 5758, 7836, 6750, 6854),
    new NormalAttack(80, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "아웃사이드 커터",
      [ [580, 615, 655, 700, 750, 810, 880, 950, 1030, 1115] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "쉐도우 다이브", 25,
      [ [870, 920, 980, 1050, 1130, 1220, 1315, 1425, 1545, 1675] ],
      areaAttack, 6,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("루드", "Rude"),
    new Type(personality.jolly, role.tanker, attackType.physic, position.front, race.dragon),
    new Status(3, 97877, 4000, 11610, 10402, 6677, 3921, 5846, 5565),
    new NormalAttack(80, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "한 세트 더!",
      [ [340, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.noise, 6, 0)
    ),
    new GraduateSkill(
      "임팩트 프레스", 50,
      [ [820, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.stun, 2, 0)
    ),
  ),
  //=========================================================================
  new Character(
    new Name("시스트", "Sist"),
    new Type(personality.mad, role.dealer, attackType.physic, position.middle, race.dragon),
    new Status(3, 51529, 4998, 7632, 7597, 8894, 7515, 6658, 6693),
    new NormalAttack(110, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "총알 배송",
      [ [830, 880, 935, 1000, 1075, 1160, 1255, 1360, 1475, 1595] ],
      areaAttack, 6,
      noBuff, new Debuff(debuff.noise, 6, 0)
    ),
    new GraduateSkill(
      "플렉스 건", 32,
      noDamage,
      areaAttack, noKillRecast,
      new Buff([buff.selfDamageUp, buff.selfSPHeal], [10, 1], [15, 40]),
      new Debuff(debuff.stun, 2, 0)
    ),
  ),
  //=========================================================================
  new Character(
    new Name("벨벳", "Velvet"),
    new Type(personality.cool, role.tanker, attackType.physic, position.front, race.witch),
    new Status(3, 140927, 4144, 11308, 10561, 4313, 5778, 7089, 5993),
    new NormalAttack(70, areaAttack, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "그냥 다 덤벼!",
      noDamage,
      areaAttack, noKillRecast,
      new Buff(buff.taunt, 4, 0), noDebuff
    ),
    new GraduateSkill(
      "마법 : 원심 분리", 44,
      [ [1140, 1190, 1280, 1360, 1460, 1580, 1720, 1850, 2010, 2180] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("프리클", "Fricle"),
    new Type(personality.cool, role.dealer, attackType.magic, position.middle, race.witch),
    new Status(3, 54463, 4679, 6789, 9094, 7899, 7982, 6595, 7398),
    new NormalAttack(70, areaAttack, noBuff, noDebuff),
    new ReinforcedAttack(90, areaAttack, noBuff, noDebuff),
    new AdmissionSkill(
      "디멘션 오브 위치",
      [ [285, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "크림슨 레인", 33,
      [ [340, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("포셔", "Posher"),
    new Type(personality.gloomy, role.supporter, attackType.magic, position.back, race.witch),
    new Status(3, 81738, 2752, 9500, 9372, 7264, 7643, 5541, 7264),
    new NormalAttack(80, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(96, singleTarget, noBuff, new Debuff(debuff.poison, 2, 0)),
    new AdmissionSkill(
      "무슨 포션 줄까?",
      [ [448, 0, 0, 0, 0, 0, 0, 0, 0, 0] ],
      areaAttack, noKillRecast,
      new Buff(buff.allyHeal, 1, 3580), new Debuff(debuff.stun, 4, 0)
    ),
    new GraduateSkill(
      "감자 고구마!", 13,
      noDamage,
      singleTarget, noKillRecast,
      noBuff, new Debuff(debuff.polymorph, 3, 0)
    ),
  ),
  //=========================================================================
  new Character(
    new Name("아야", "Aya"),
    new Type(personality.cool, role.dealer, attackType.magic, position.middle, race.witch),
    new Status(3, 99004, 6907, 11112, 11204, 13270, 8472, 6989, 7684),
    new NormalAttack(80, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(96, singleTarget, noBuff, noDebuff),
    new AdmissionSkill(
      "빙설화도",
      [ [255, 270, 290, 310, 330, 355, 385, 415, 450, 490] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.attackSpeedDown, 8, 40)
    ),
    new GraduateSkill(
      "설폭화", 20,
      [ [51, 53, 57, 61, 66, 71, 77, 83, 90, 98] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.frostbite, 5, [33, 36, 39, 42, 45, 48, 51, 54, 57, 60])
    ),
  ),
  //=========================================================================
  new Character(
    new Name("마요", "Mayo"),
    new Type(personality.mad, role.dealer, attackType.physic, position.back, race.fairy),
    new Status(2, 48950, 3442, 7391, 7218, 8110, 9394, 4633, 5137),
    new NormalAttack(72, singleTarget, noBuff, noDebuff),
    new ReinforcedAttack(87, singleTarget, noBuff, new Debuff(debuff.poison, 2, 0)),
    new AdmissionSkill(
      "수집의 법칙임.",
      [ [370, 395, 420, 450, 480, 520, 565, 610, 660, 715] ],
      singleTarget, noKillRecast,
      noBuff, new Debuff(debuff.poison, 4, 0)
    ),
    new GraduateSkill(
      "그 수집품 내꺼임.", 36,
      [ [560, 590, 630, 675, 725, 780, 845, 915, 990, 1075] ],
      singleTarget, noKillRecast,
      noBuff, new Debuff(debuff.poison, 4, 0)
    ),
  ),
  //=========================================================================
  new Character(
    new Name("마에스트로 2호", "MaestroMK2"),
    new Type(personality.mad, role.tanker, attackType.physic, position.front, race.elf),
    new Status(2, 119129, 2636, 9359, 8105, 4878, 4565, 5330, 7324),
    new NormalAttack(55, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "로보틱 매트릭스",
      noDamage,
      areaAttack, noKillRecast,
      new Buff(buff.barrier, 6, [35, 37, 40, 42, 46, 49, 53, 58, 62, 68]), noDebuff
    ),
    new GraduateSkill(
      "사운더스 쇼크 웨이브", 40,
      [ [370, 390, 420, 450, 480, 520, 560, 600, 660, 710] ],
      areaAttack, noKillRecast,
      noBuff, new Debuff(debuff.noise, 6, 0)
    ),
  ),
  //=========================================================================
  new Character(
    new Name("가비아", "Gabia"),
    new Type(personality.naive, role.supporter, attackType.magic, position.middle, race.spirit),
    new Status(2, 85015, 4084, 8947, 9151, 5784, 4336, 5353, 4563),
    new NormalAttack(55, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "돌려...줄...게...",
      [ [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] ],
      singleTarget, noKillRecast,
      new Buff(buff.barrier, 6, [45, 47, 50, 53, 57, 62, 67, 72, 78]), noDebuff
    ),
    new GraduateSkill(
      "지켜...줄...게...", 23,
      noDamage,
      singleTarget, noKillRecast,
      new Buff(buff.invincibility, 4, 0), noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("레비", "Levi"),
    new Type(personality.gloomy, role.dealer, attackType.physic, position.middle, race.witch),
    new Status(2, 68749, 4944, 9836, 7122, 3946, 4934, 4532, 5167),
    new NormalAttack(40, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "님블 컷",
      [ [1020, 1080, 1140, 1230, 1320, 1425, 1530, 1665, 1800, 1950] ],
      singleTarget, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "레비드 더 레드", 61,
      [ [610, 640, 690, 730, 790, 850, 920, 1000, 1080, 1170] ],
      areaAttack, noKillRecast,
      noBuff, noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("쥬비", "Jubee"),
    new Type(personality.jolly, role.dealer, attackType.physic, position.middle, race.spirit),
    new Status(2, 50771, 4521, 7164, 7011, 5869, 6228, 5677, 5849),
    new NormalAttack(80, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "친구왔쮸비",
      [ [300, 300, 400, 400, 500, 500, 700, 800, 1000, 1000] ],
      singleTarget, noKillRecast,
      noBuff, noDebuff
    ),
    new GraduateSkill(
      "행복했쮸비", 29,
      noDamage,
      new Buff(buff.allyDamageUp, 8, [31, 33, 35, 37, 40, 43, 47, 50, 55, 59]), noDebuff
    ),
  ),
  //=========================================================================
  new Character(
    new Name("스피키", "Speaki"),
    new Type(personality.naive, role.supporter, attackType.magic, position.back, race.ghost),
    new Status(2, 38752, 3603, 6781, 6798, 4462, 5388, 5212, 5167),
    new NormalAttack(110, singleTarget, noBuff, noDebuff),
    noReinforcedAttack,
    new AdmissionSkill(
      "펌킨 매직",
      noDamage,
      singleTarget, noKillRecast,
      new Buff(buff.allySPHeal, 1, [17.6, 18.6, 19.8, 21.2, 22.8, 24.6, 26.6, 28.8, 31.2, 33.8]), noDebuff
    ),
    new GraduateSkill(
      "트릭 오어 트릿~☆", 27,
      noDamage,
      new Buff(buff.allyTakeDamageDown, 6, [20, 21, 22, 24, 26, 28, 30, 32, 35, 38]), noDebuff
    ),
  ),
  //=========================================================================
];

export default characterData;