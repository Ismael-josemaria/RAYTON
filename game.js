// ==========================================================================
// RAYTON: Gang Wars (Clash of Delinquents) - Mythical Village & Base Engine
// Inspired by Clash of Clans, Tokyo Revengers and Wind Breaker
// ==========================================================================

// Global Definitions & Constants
const GRID_SIZE = 18;
const TILE_W = 56;
const TILE_H = 28;

// Building Catalog Templates (Clash of Clans & Mythical Village Archetypes)
const BUILDING_TYPES = {
  hq: {
    type: 'hq',
    name: 'Sede Central de RAYTON',
    category: 'resources',
    w: 3, h: 3,
    hp: 1600,
    costYen: 0,
    costRespect: 0,
    reqHq: 1,
    desc: 'El corazón de tu aldea y cuartel supremo. Destruirlo otorga una estrella en asaltos.',
    icon: '🏢',
    maxLevel: 5
  },
  ramen: {
    type: 'ramen',
    name: 'Puesto de Ramen Tradicional',
    category: 'resources',
    w: 2, h: 2,
    hp: 450,
    costYen: 400,
    costRespect: 0,
    reqHq: 1,
    desc: 'Genera Yenes ¥ continuamente a través del comercio y apoyo de los vecinos.',
    icon: '🍜',
    rate: 16,
    maxLevel: 5
  },
  vault: {
    type: 'vault',
    name: 'Cofre Fuerte de la Banda',
    category: 'resources',
    w: 2, h: 2,
    hp: 800,
    costYen: 600,
    costRespect: 0,
    reqHq: 1,
    desc: 'Almacena grandes sumas de Yenes ¥ obtenidos de patrullas y asaltos.',
    icon: '🏦',
    cap: 5000,
    maxLevel: 5
  },
  dojo: {
    type: 'dojo',
    name: 'Dojo Callejero & Pesas',
    category: 'resources',
    w: 2, h: 2,
    hp: 450,
    costYen: 0,
    costRespect: 400,
    reqHq: 1,
    desc: 'Genera Respeto y espíritu de lucha 🔥 continuamente para la cuadrilla.',
    icon: '🏋️',
    rate: 14,
    maxLevel: 5
  },
  honor_altar: {
    type: 'honor_altar',
    name: 'Altar de Honor de RAYTON',
    category: 'resources',
    w: 2, h: 2,
    hp: 800,
    costYen: 500,
    costRespect: 0,
    reqHq: 1,
    desc: 'Almacena Respeto Callejero 🔥 para financiar entrenamientos y brebajes.',
    icon: '🏮',
    cap: 4000,
    maxLevel: 5
  },
  barracks: {
    type: 'barracks',
    name: 'Barracón de Entrenamiento',
    category: 'army',
    w: 2, h: 2,
    hp: 650,
    costYen: 800,
    costRespect: 0,
    reqHq: 1,
    desc: 'Entrena a jóvenes novatos para convertirlos en brawlers temidos de asalto.',
    icon: '🥊',
    maxLevel: 5
  },
  spell_factory: {
    type: 'spell_factory',
    name: 'Caldero de Brebajes & Hechizos',
    category: 'army',
    w: 2, h: 2,
    hp: 550,
    costYen: 1200,
    costRespect: 0,
    reqHq: 1,
    desc: 'Destila pócimas y hechizos de combate (Furia, Curación y Rayos Celestiales).',
    icon: '🧪',
    maxLevel: 5
  },
  camp: {
    type: 'camp',
    name: 'Campamento de Asalto',
    category: 'army',
    w: 3, h: 3,
    hp: 500,
    costYen: 0,
    costRespect: 600,
    reqHq: 1,
    desc: 'Alberga tropas entrenadas alrededor de una fogata activa listas para la guerra.',
    icon: '⛺',
    cap: 25,
    maxLevel: 5
  },
  hero_altar: {
    type: 'hero_altar',
    name: 'Altar del Líder Ren Kazuma',
    category: 'army',
    w: 3, h: 3,
    hp: 1400,
    costYen: 0,
    costRespect: 1200,
    reqHq: 1,
    desc: 'Trono del líder supremo. Ren vigila la aldea y desata su Patada Nuclear en la guerra.',
    icon: '👑',
    maxLevel: 5
  },
  clan_castle: {
    type: 'clan_castle',
    name: 'Castillo del Clan & Alianza',
    category: 'army',
    w: 3, h: 3,
    hp: 1500,
    costYen: 1500,
    costRespect: 0,
    reqHq: 1,
    desc: 'Sede de la alianza de Tokio. Permite solicitar tropas de refuerzo del clan.',
    icon: '🏯',
    maxLevel: 5
  },
  cannon: {
    type: 'cannon',
    name: 'Cañón de Asedio Urbano',
    category: 'defenses',
    w: 2, h: 2,
    hp: 600,
    costYen: 700,
    costRespect: 0,
    reqHq: 1,
    desc: 'Dispara proyectiles directos de alta cadencia a cualquier atacante terrestre.',
    icon: '💥',
    range: 5,
    dps: 32,
    maxLevel: 5
  },
  watchtower: {
    type: 'watchtower',
    name: 'Torre de Vigías con Bates',
    category: 'defenses',
    w: 2, h: 2,
    hp: 550,
    costYen: 900,
    costRespect: 0,
    reqHq: 1,
    desc: 'Centinelas en lo alto que arrojan proyectiles a distancia a invasores.',
    icon: '🗼',
    range: 6,
    dps: 26,
    maxLevel: 5
  },
  mortar: {
    type: 'mortar',
    name: 'Mortero de Cócteles Molotov',
    category: 'defenses',
    w: 2, h: 2,
    hp: 420,
    costYen: 1500,
    costRespect: 0,
    reqHq: 2,
    desc: 'Lanza proyectiles incendiarios parabólicos con gran daño de área explosivo.',
    icon: '💣',
    range: 7.5,
    dps: 36,
    maxLevel: 5
  },
  wizard_tower: {
    type: 'wizard_tower',
    name: 'Torre de Magos de Pirotecnia',
    category: 'defenses',
    w: 2, h: 2,
    hp: 680,
    costYen: 2200,
    costRespect: 0,
    costDark: 0,
    reqHq: 2,
    desc: 'Lanza chispas mágicas y fuegos artificiales de área que impactan en tierra y aire.',
    icon: '🧙‍♂️',
    range: 4.8,
    dps: 42,
    isSplash: true,
    maxLevel: 5
  },
  air_defense: {
    type: 'air_defense',
    name: 'Batería de Cohetes Antiaéreos',
    category: 'defenses',
    w: 2, h: 2,
    hp: 750,
    costYen: 2600,
    costRespect: 0,
    costDark: 0,
    reqHq: 2,
    desc: 'Lanza cohetes guiados devastadores exclusivamente contra dragones y tropas aéreas.',
    icon: '🚀',
    range: 7.2,
    dps: 78,
    targetsAir: true,
    maxLevel: 5
  },
  dark_drill: {
    type: 'dark_drill',
    name: 'Destilador de Esencia Sombría',
    category: 'resources',
    w: 2, h: 2,
    hp: 550,
    costYen: 1600,
    costRespect: 0,
    costDark: 0,
    reqHq: 2,
    desc: 'Extrae Esencia Sombría 🧪 continuamente para reclutar magos, motoristas y dragones.',
    icon: '⚗️',
    rate: 6,
    maxLevel: 5
  },
  dark_vault: {
    type: 'dark_vault',
    name: 'Depósito de Esencia Sombría',
    category: 'resources',
    w: 2, h: 2,
    hp: 900,
    costYen: 2000,
    costRespect: 0,
    costDark: 0,
    reqHq: 2,
    desc: 'Almacén blindado que protege tu Esencia Sombría 🧪 de saqueos enemigos.',
    icon: '🔮',
    cap: 3000,
    maxLevel: 5
  },
  spring_trap: {
    type: 'spring_trap',
    name: 'Trampa de Muelle de Salto',
    category: 'traps',
    w: 1, h: 1,
    hp: 100,
    costYen: 350,
    costRespect: 0,
    reqHq: 1,
    desc: 'Oculta hasta que el enemigo pisa sobre ella. ¡Catapulta a los intrusos por el aire!',
    icon: '🌀',
    maxLevel: 3
  },
  bomb: {
    type: 'bomb',
    name: 'Bomba Oculta Explosiva',
    category: 'traps',
    w: 1, h: 1,
    hp: 100,
    costYen: 250,
    costRespect: 0,
    reqHq: 1,
    desc: 'Mina oculta bajo tierra. Estalla causando daño en área cuando se acercan atacantes.',
    icon: '🧨',
    maxLevel: 3
  },
  wall: {
    type: 'wall',
    name: 'Barricada de Acero Reforzado',
    category: 'walls',
    w: 1, h: 1,
    hp: 850,
    costYen: 100,
    costRespect: 0,
    reqHq: 1,
    desc: 'Muro para canalizar a las tropas y proteger los edificios clave.',
    icon: '🧱',
    maxLevel: 5
  }
};

// Troop Catalog Templates (Clash of Clans Delinquent archetypes)
const TROOP_TYPES = {
  brawler: {
    id: 'brawler',
    name: 'Bárbaro con Bate',
    icon: '🏏',
    hp: 110,
    dps: 26,
    speed: 1.8,
    costRespect: 25,
    costDark: 0,
    housing: 1,
    range: 0.8,
    category: 'troops',
    targetPriority: 'any',
    desc: 'Infantería de choque cuerpo a cuerpo. Ataca el edificio enemigo más próximo sin dudar.'
  },
  archer: {
    id: 'archer',
    name: 'Arquera Cazadora',
    icon: '🏹',
    hp: 75,
    dps: 28,
    speed: 1.7,
    costRespect: 35,
    costDark: 0,
    housing: 1,
    range: 3.5,
    category: 'troops',
    targetPriority: 'any',
    desc: 'Ataca a distancia por encima de las barricadas disparando proyectiles certeros.'
  },
  goblin: {
    id: 'goblin',
    name: 'Duende Saqueador',
    icon: '👺',
    hp: 65,
    dps: 36,
    speed: 2.7,
    costRespect: 30,
    costDark: 0,
    housing: 1,
    range: 0.8,
    category: 'troops',
    targetPriority: 'resources',
    desc: 'Extremadamente veloz. Prioriza puestos y almacenes robando botín al doble de velocidad.'
  },
  molotov: {
    id: 'molotov',
    name: 'Lanzador de Molotovs',
    icon: '🍾',
    hp: 75,
    dps: 30,
    speed: 1.6,
    costRespect: 45,
    costDark: 0,
    housing: 1,
    range: 3.2,
    category: 'troops',
    targetPriority: 'any',
    desc: 'Arroja botellas incendiarias con daño de fuego que supera muros.'
  },
  tank: {
    id: 'tank',
    name: 'Gigante con Viga',
    icon: '🦍',
    hp: 600,
    dps: 22,
    speed: 1.1,
    costRespect: 130,
    costDark: 0,
    housing: 5,
    range: 0.9,
    category: 'troops',
    targetPriority: 'defenses',
    desc: 'Enorme resistencia. Ignora otros edificios hasta destruir todos los Cañones y Torres.'
  },
  demolisher: {
    id: 'demolisher',
    name: 'Saboteador Rompemuros',
    icon: '🧨',
    hp: 90,
    dps: 280,
    speed: 2.5,
    costRespect: 75,
    costDark: 0,
    housing: 2,
    range: 0.8,
    category: 'troops',
    targetPriority: 'walls',
    desc: 'Corre a toda velocidad hacia las barricadas para abrirlas de un solo estallido demoledor.'
  },
  wizard: {
    id: 'wizard',
    name: 'Mago de Pirotecnia',
    icon: '🧙‍♂️',
    hp: 190,
    dps: 68,
    speed: 1.5,
    costRespect: 0,
    costDark: 30,
    housing: 4,
    range: 3.2,
    isSplash: true,
    category: 'dark',
    targetPriority: 'any',
    desc: 'Dispara proyectiles mágicos y fuegos artificiales con gran daño de área a tierra y aire.'
  },
  biker: {
    id: 'biker',
    name: 'Motorista en CB250T',
    icon: '🏍️',
    hp: 340,
    dps: 40,
    speed: 2.6,
    costRespect: 0,
    costDark: 45,
    housing: 5,
    jumpsWalls: true,
    range: 0.9,
    category: 'dark',
    targetPriority: 'defenses',
    desc: 'Salta las barricadas a toda velocidad con su moto y embiste directamente las defensas.'
  },
  dragon: {
    id: 'dragon',
    name: 'Dragón de Tokio',
    icon: '🐉',
    hp: 980,
    dps: 92,
    speed: 1.3,
    costRespect: 0,
    costDark: 95,
    housing: 10,
    isFlying: true,
    jumpsWalls: true,
    range: 2.2,
    isSplash: true,
    category: 'dark',
    targetPriority: 'any',
    desc: '¡Unidad aérea mítica! Sobrevuela cualquier muro e incinera objetivos con llamaradas continuas.'
  }
};

// Street Spells / Brebajes Callejeros (Clash of Clans Spells)
const SPELL_TYPES = {
  rage: {
    id: 'rage',
    name: 'Furia Callejera',
    icon: '⚡',
    costRespect: 160,
    radius: 3.8,
    duration: 9500,
    color: 'rgba(168, 85, 247, 0.32)',
    borderColor: '#c084fc',
    desc: 'Aura que aumenta el daño en +65% y la velocidad en +40% de las tropas aliadas.'
  },
  heal: {
    id: 'heal',
    name: 'Brebaje Médico de Emergencia',
    icon: '🩹',
    costRespect: 140,
    radius: 3.8,
    duration: 8500,
    color: 'rgba(16, 185, 129, 0.32)',
    borderColor: '#34d399',
    desc: 'Regenera continuamente la salud de todas las tropas aliadas dentro del área.'
  },
  lightning: {
    id: 'lightning',
    name: 'Rayo Celestial Destructor',
    icon: '⚡',
    costRespect: 180,
    radius: 1.5,
    damage: 340,
    color: 'rgba(250, 204, 21, 0.45)',
    borderColor: '#facc15',
    desc: 'Descarga un potente relámpago que fulmina defensas enemigas al instante.'
  },
  freeze: {
    id: 'freeze',
    name: 'Hechizo de Congelación',
    icon: '❄️',
    costRespect: 150,
    radius: 3.2,
    duration: 5500,
    color: 'rgba(56, 189, 248, 0.35)',
    borderColor: '#38bdf8',
    desc: 'Inmoviliza y silencia torres defensivas y tropas enemigas durante 5.5 segundos.'
  }
};

// Natural Village Obstacles (Clash of Clans Style - Limpiar por Gemas 💎)
const OBSTACLE_TYPES = {
  tree_trunk: {
    id: 'tree_trunk',
    name: 'Tronco de Roble Podrido',
    icon: '🪵',
    costYen: 150,
    costRespect: 0,
    gemsMin: 2,
    gemsMax: 4,
    desc: 'Un viejo tronco que estorba en la aldea. Límpialo con un constructor para ganar gemas.'
  },
  rock_boulder: {
    id: 'rock_boulder',
    name: 'Peñasco de Granito',
    icon: '🪨',
    costYen: 250,
    costRespect: 0,
    gemsMin: 3,
    gemsMax: 5,
    desc: 'Roca volcánica ancestral. Picarla libera vetas de gemas de honor.'
  },
  gem_bush: {
    id: 'gem_bush',
    name: 'Arbusto de Gemas Místicas',
    icon: '💎',
    costYen: 0,
    costRespect: 120,
    gemsMin: 4,
    gemsMax: 6,
    desc: '¡Arbusto legendario con cristales brillantes entre sus ramas!'
  },
  pine_tree: {
    id: 'pine_tree',
    name: 'Pino de la Aldea',
    icon: '🌲',
    costYen: 200,
    costRespect: 0,
    gemsMin: 2,
    gemsMax: 5,
    desc: 'Árbol silvestre que crece en el terreno fértil de la aldea.'
  }
};

// Hero Unit: Ren Kazuma (Barbarian King equivalent)
const HERO_REN = {
  id: 'hero_ren',
  name: 'Ren "Ray" Kazuma',
  icon: '👑',
  avatar: 'assets/images/ren.jpg',
  hp: 1350,
  maxHp: 1350,
  dps: 80,
  speed: 2.1,
  targetPriority: 'any',
  desc: '初代総長 • Líder Supremo de RAYTON. Posee la devastadora Patada Nuclear activa.'
};

// Rival Bases for Raids
const RIVAL_BASES = [
  {
    id: 'shibuya',
    name: 'Puesto Callejero de Shibuya',
    gang: 'Serpientes de Shibuya (Nivel 1)',
    lootYen: 3200,
    lootRespect: 1900,
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 1 },
      { type: 'ramen', x: 5, y: 8, level: 1 },
      { type: 'vault', x: 12, y: 8, level: 1 },
      { type: 'cannon', x: 8, y: 5, level: 1 },
      { type: 'watchtower', x: 8, y: 12, level: 1 },
      { type: 'dojo', x: 11, y: 11, level: 1 },
      { type: 'spring_trap', x: 6, y: 6, level: 1 },
      { type: 'bomb', x: 10, y: 6, level: 1 },
      // Perimeter walls
      { type: 'wall', x: 4, y: 4, level: 1 }, { type: 'wall', x: 5, y: 4, level: 1 }, { type: 'wall', x: 6, y: 4, level: 1 },
      { type: 'wall', x: 11, y: 4, level: 1 }, { type: 'wall', x: 12, y: 4, level: 1 }, { type: 'wall', x: 13, y: 4, level: 1 },
      { type: 'wall', x: 4, y: 13, level: 1 }, { type: 'wall', x: 5, y: 13, level: 1 }, { type: 'wall', x: 12, y: 13, level: 1 }
    ]
  },
  {
    id: 'roppongi',
    name: 'Almacén Portuario Fortificado',
    gang: 'Lobos de Hierro de Roppongi (Nivel 2)',
    lootYen: 6500,
    lootRespect: 4200,
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 2 },
      { type: 'vault', x: 5, y: 6, level: 2 },
      { type: 'honor_altar', x: 11, y: 6, level: 2 },
      { type: 'cannon', x: 5, y: 11, level: 2 },
      { type: 'watchtower', x: 11, y: 11, level: 2 },
      { type: 'mortar', x: 8, y: 11, level: 1 },
      { type: 'ramen', x: 5, y: 8, level: 2 },
      { type: 'dojo', x: 11, y: 8, level: 2 },
      { type: 'spring_trap', x: 8, y: 6, level: 1 },
      { type: 'spring_trap', x: 8, y: 10, level: 1 },
      { type: 'bomb', x: 6, y: 9, level: 1 },
      // Ring of walls
      { type: 'wall', x: 4, y: 4, level: 2 }, { type: 'wall', x: 5, y: 4, level: 2 }, { type: 'wall', x: 6, y: 4, level: 2 },
      { type: 'wall', x: 7, y: 4, level: 2 }, { type: 'wall', x: 8, y: 4, level: 2 }, { type: 'wall', x: 9, y: 4, level: 2 },
      { type: 'wall', x: 10, y: 4, level: 2 }, { type: 'wall', x: 11, y: 4, level: 2 }, { type: 'wall', x: 12, y: 4, level: 2 }
    ]
  },
  {
    id: 'shinjuku',
    name: 'Sede Central de Shinjuku',
    gang: 'Sindicato Kurohebi de Kurogane (Nivel 3)',
    lootYen: 12500,
    lootRespect: 8000,
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 3 },
      { type: 'mortar', x: 6, y: 8, level: 2 },
      { type: 'mortar', x: 10, y: 8, level: 2 },
      { type: 'cannon', x: 8, y: 5, level: 3 },
      { type: 'watchtower', x: 8, y: 11, level: 3 },
      { type: 'watchtower', x: 5, y: 5, level: 2 },
      { type: 'cannon', x: 11, y: 5, level: 2 },
      { type: 'vault', x: 5, y: 11, level: 3 },
      { type: 'honor_altar', x: 11, y: 11, level: 3 },
      { type: 'ramen', x: 4, y: 8, level: 3 },
      { type: 'dojo', x: 12, y: 8, level: 3 },
      { type: 'spring_trap', x: 7, y: 6, level: 2 },
      { type: 'spring_trap', x: 9, y: 6, level: 2 },
      { type: 'bomb', x: 8, y: 7, level: 2 },
      { type: 'bomb', x: 8, y: 9, level: 2 },
      // Dense walls
      { type: 'wall', x: 3, y: 3, level: 3 }, { type: 'wall', x: 4, y: 3, level: 3 }, { type: 'wall', x: 5, y: 3, level: 3 },
      { type: 'wall', x: 11, y: 3, level: 3 }, { type: 'wall', x: 12, y: 3, level: 3 }, { type: 'wall', x: 13, y: 3, level: 3 }
    ]
  }
];

// Helper Toast
function showToast(msg) {
  const toast = document.getElementById('toast-notify');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

// ==========================================================================
// GAME STATE CLASS
// ==========================================================================

class ClashGame {
  constructor() {
    this.mode = 'base'; // 'base', 'raid', or 'defense'
    this.theme = 'village'; // 'village' (Lush Emerald Grass) or 'urban' (Tokyo Asphalt)
    this.yen = 5400;
    this.maxYen = 12000;
    this.respect = 3800;
    this.maxRespect = 9000;
    this.darkElixir = 750;
    this.maxDarkElixir = 3000;
    this.gems = 320;
    this.trophies = 480;
    this.builders = 2;
    this.freeBuilders = 2;
    this.clanTroops = 4;
    
    // Buildings in Player's Base
    this.buildings = [
      { id: 'b_hq', type: 'hq', x: 7, y: 7, level: 1, currentHp: 1600, maxHp: 1600 },
      { id: 'b_ramen_1', type: 'ramen', x: 4, y: 7, level: 1, currentHp: 450, maxHp: 450, stored: 240 },
      { id: 'b_vault_1', type: 'vault', x: 11, y: 7, level: 1, currentHp: 800, maxHp: 800 },
      { id: 'b_dojo_1', type: 'dojo', x: 7, y: 4, level: 1, currentHp: 450, maxHp: 450, stored: 180 },
      { id: 'b_altar_1', type: 'honor_altar', x: 7, y: 11, level: 1, currentHp: 800, maxHp: 800 },
      { id: 'b_dark_drill_1', type: 'dark_drill', x: 10, y: 11, level: 1, currentHp: 550, maxHp: 550, stored: 90 },
      { id: 'b_dark_vault_1', type: 'dark_vault', x: 11, y: 9, level: 1, currentHp: 900, maxHp: 900 },
      { id: 'b_barracks_1', type: 'barracks', x: 4, y: 4, level: 1, currentHp: 650, maxHp: 650 },
      { id: 'b_camp_1', type: 'camp', x: 12, y: 12, level: 1, currentHp: 500, maxHp: 500 },
      { id: 'b_tower_1', type: 'watchtower', x: 11, y: 4, level: 1, currentHp: 550, maxHp: 550 },
      { id: 'b_cannon_1', type: 'cannon', x: 4, y: 11, level: 1, currentHp: 600, maxHp: 600 },
      { id: 'b_wiz_1', type: 'wizard_tower', x: 4, y: 9, level: 1, currentHp: 680, maxHp: 680 },
      { id: 'b_hero_1', type: 'hero_altar', x: 7, y: 13, level: 1, currentHp: 1400, maxHp: 1400 },
      { id: 'b_castle_1', type: 'clan_castle', x: 13, y: 7, level: 1, currentHp: 1500, maxHp: 1500 },
      { id: 'b_spring_1', type: 'spring_trap', x: 6, y: 6, level: 1, currentHp: 100, maxHp: 100 },
      { id: 'b_bomb_1', type: 'bomb', x: 9, y: 5, level: 1, currentHp: 100, maxHp: 100 },
      // Starter walls
      { id: 'w_1', type: 'wall', x: 3, y: 3, level: 1, currentHp: 850, maxHp: 850 },
      { id: 'w_2', type: 'wall', x: 4, y: 3, level: 1, currentHp: 850, maxHp: 850 },
      { id: 'w_3', type: 'wall', x: 5, y: 3, level: 1, currentHp: 850, maxHp: 850 },
      { id: 'w_4', type: 'wall', x: 6, y: 3, level: 1, currentHp: 850, maxHp: 850 },
      { id: 'w_5', type: 'wall', x: 3, y: 4, level: 1, currentHp: 850, maxHp: 850 }
    ];

    // Natural Village Obstacles (Troncos, Rocas, Arbustos de Gemas)
    this.obstacles = [
      { id: 'obs_1', type: 'tree_trunk', x: 2, y: 6 },
      { id: 'obs_2', type: 'rock_boulder', x: 14, y: 3 },
      { id: 'obs_3', type: 'gem_bush', x: 13, y: 13 },
      { id: 'obs_4', type: 'pine_tree', x: 2, y: 14 },
      { id: 'obs_5', type: 'tree_trunk', x: 6, y: 2 }
    ];

    // Army Inventory (Normal + Dark Elixir Troops)
    this.army = {
      brawler: 16,
      archer: 12,
      goblin: 10,
      molotov: 8,
      tank: 2,
      demolisher: 3,
      wizard: 3,
      biker: 2,
      dragon: 1
    };

    // Spells Inventory
    this.spells = {
      rage: 2,
      heal: 2,
      lightning: 2,
      freeze: 2
    };

    // Wandering Villagers in base (Aldeanos)
    this.villagers = [
      { x: 7, y: 7, targetX: 4, targetY: 7, speed: 0.015, icon: '🚶' },
      { x: 11, y: 11, targetX: 7, targetY: 4, speed: 0.012, icon: '👘' },
      { x: 13, y: 7, targetX: 7, targetY: 11, speed: 0.014, icon: '🥷' }
    ];

    // Active Builder working on an obstacle or construction
    this.activeBuilder = null;

    // Construction placement & selection state
    this.placementBuilding = null;
    this.movingBuilding = null;
    this.selectedBuilding = null;
    this.selectedObstacle = null;

    // Battle Engines
    this.currentRaid = null;
    this.currentDefense = null;
    this.multiplayerTarget = null;
    this.floatingTexts = [];

    // Viewport Offset for Pan/Drag
    this.cameraX = 0;
    this.cameraY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;

    // Selected Troop or Spell for Deployment
    this.selectedDeployTroop = null;
    this.selectedDeploySpell = null;

    this.loadState();
    this.startProductionLoop();
    this.startVillagerLoop();
  }

  addFloatingText(text, x, y, color = '#fbbf24') {
    this.floatingTexts.push({
      text: text,
      x: x,
      y: y,
      color: color,
      alpha: 1.0,
      life: 55
    });
  }

  getHqLevel() {
    const hq = this.buildings.find(b => b.type === 'hq');
    return hq ? hq.level : 1;
  }

  getArmyCapacity() {
    const camps = this.buildings.filter(b => b.type === 'camp');
    return camps.reduce((sum, c) => sum + (BUILDING_TYPES.camp.cap * c.level), 35);
  }

  getArmyCount() {
    let count = 0;
    for (const [id, qty] of Object.entries(this.army)) {
      const housing = TROOP_TYPES[id] ? TROOP_TYPES[id].housing : 1;
      count += (qty || 0) * housing;
    }
    return count;
  }

  saveState() {
    try {
      const data = {
        theme: this.theme,
        yen: this.yen,
        respect: this.respect,
        darkElixir: this.darkElixir,
        gems: this.gems,
        trophies: this.trophies,
        buildings: this.buildings,
        obstacles: this.obstacles,
        army: this.army,
        spells: this.spells,
        clanTroops: this.clanTroops
      };
      localStorage.setItem('rayton_clash_data', JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  loadState() {
    try {
      const saved = localStorage.getItem('rayton_clash_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.theme = parsed.theme ?? this.theme;
        this.yen = parsed.yen ?? this.yen;
        this.respect = parsed.respect ?? this.respect;
        this.darkElixir = parsed.darkElixir ?? this.darkElixir;
        this.gems = parsed.gems ?? this.gems;
        this.trophies = parsed.trophies ?? this.trophies;
        if (parsed.buildings && parsed.buildings.length) this.buildings = parsed.buildings;
        if (parsed.obstacles && parsed.obstacles.length) this.obstacles = parsed.obstacles;
        if (parsed.army) this.army = Object.assign({}, this.army, parsed.army);
        if (parsed.spells) this.spells = Object.assign({}, this.spells, parsed.spells);
        if (parsed.clanTroops !== undefined) this.clanTroops = parsed.clanTroops;
      }
    } catch (e) {
      console.warn('LocalStorage load failed', e);
    }
  }

  resetGame() {
    localStorage.removeItem('rayton_clash_data');
    this.theme = 'village';
    this.yen = 5400;
    this.respect = 3800;
    this.darkElixir = 750;
    this.gems = 320;
    this.trophies = 480;
    this.army = {
      brawler: 16,
      archer: 12,
      goblin: 10,
      molotov: 8,
      tank: 2,
      demolisher: 3,
      wizard: 3,
      biker: 2,
      dragon: 1
    };
    this.spells = { rage: 2, heal: 2, lightning: 2, freeze: 2 };
    this.clanTroops = 4;
    this.buildings = [
      { id: 'b_hq', type: 'hq', x: 7, y: 7, level: 1, currentHp: 1600, maxHp: 1600 },
      { id: 'b_ramen_1', type: 'ramen', x: 4, y: 7, level: 1, currentHp: 450, maxHp: 450, stored: 240 },
      { id: 'b_vault_1', type: 'vault', x: 11, y: 7, level: 1, currentHp: 800, maxHp: 800 },
      { id: 'b_dojo_1', type: 'dojo', x: 7, y: 4, level: 1, currentHp: 450, maxHp: 450, stored: 180 },
      { id: 'b_altar_1', type: 'honor_altar', x: 7, y: 11, level: 1, currentHp: 800, maxHp: 800 },
      { id: 'b_dark_drill_1', type: 'dark_drill', x: 10, y: 11, level: 1, currentHp: 550, maxHp: 550, stored: 90 },
      { id: 'b_dark_vault_1', type: 'dark_vault', x: 11, y: 9, level: 1, currentHp: 900, maxHp: 900 },
      { id: 'b_barracks_1', type: 'barracks', x: 4, y: 4, level: 1, currentHp: 650, maxHp: 650 },
      { id: 'b_camp_1', type: 'camp', x: 12, y: 12, level: 1, currentHp: 500, maxHp: 500 },
      { id: 'b_tower_1', type: 'watchtower', x: 11, y: 4, level: 1, currentHp: 550, maxHp: 550 },
      { id: 'b_cannon_1', type: 'cannon', x: 4, y: 11, level: 1, currentHp: 600, maxHp: 600 },
      { id: 'b_wiz_1', type: 'wizard_tower', x: 4, y: 9, level: 1, currentHp: 680, maxHp: 680 },
      { id: 'b_hero_1', type: 'hero_altar', x: 7, y: 13, level: 1, currentHp: 1400, maxHp: 1400 },
      { id: 'b_castle_1', type: 'clan_castle', x: 13, y: 7, level: 1, currentHp: 1500, maxHp: 1500 },
      { id: 'b_spring_1', type: 'spring_trap', x: 6, y: 6, level: 1, currentHp: 100, maxHp: 100 },
      { id: 'b_bomb_1', type: 'bomb', x: 9, y: 5, level: 1, currentHp: 100, maxHp: 100 },
      { id: 'w_1', type: 'wall', x: 3, y: 3, level: 1, currentHp: 850, maxHp: 850 },
      { id: 'w_2', type: 'wall', x: 4, y: 3, level: 1, currentHp: 850, maxHp: 850 },
      { id: 'w_3', type: 'wall', x: 5, y: 3, level: 1, currentHp: 850, maxHp: 850 },
      { id: 'w_4', type: 'wall', x: 6, y: 3, level: 1, currentHp: 850, maxHp: 850 },
      { id: 'w_5', type: 'wall', x: 3, y: 4, level: 1, currentHp: 850, maxHp: 850 }
    ];
    this.obstacles = [
      { id: 'obs_1', type: 'tree_trunk', x: 2, y: 6 },
      { id: 'obs_2', type: 'rock_boulder', x: 14, y: 3 },
      { id: 'obs_3', type: 'gem_bush', x: 13, y: 13 },
      { id: 'obs_4', type: 'pine_tree', x: 2, y: 14 },
      { id: 'obs_5', type: 'tree_trunk', x: 6, y: 2 }
    ];
    this.saveState();
    updateUI();
    showToast('¡Aldea mítica de RAYTON restablecida por completo!');
  }

  startProductionLoop() {
    setInterval(() => {
      if (this.mode !== 'base') return;
      this.buildings.forEach(b => {
        if (b.type === 'ramen') {
          b.stored = Math.min(650, (b.stored || 0) + (14 * b.level));
        } else if (b.type === 'dojo') {
          b.stored = Math.min(550, (b.stored || 0) + (12 * b.level));
        } else if (b.type === 'dark_drill') {
          b.stored = Math.min(300, (b.stored || 0) + (5 * b.level));
        }
      });
      updateUI();
    }, 2500);

    // Random obstacle respawn (like Clash of Clans)
    setInterval(() => {
      if (this.mode === 'base' && this.obstacles.length < 8 && Math.random() < 0.35) {
        this.spawnRandomObstacle();
      }
    }, 45000);
  }

  startVillagerLoop() {
    setInterval(() => {
      if (this.mode !== 'base') return;
      this.villagers.forEach(v => {
        const dx = v.targetX - v.x;
        const dy = v.targetY - v.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.2) {
          const randomBldg = this.buildings[Math.floor(Math.random() * this.buildings.length)];
          if (randomBldg) {
            v.targetX = randomBldg.x + 1;
            v.targetY = randomBldg.y + 1;
          }
        } else {
          v.x += (dx / dist) * v.speed;
          v.y += (dy / dist) * v.speed;
        }
      });
    }, 100);
  }

  spawnRandomObstacle() {
    const keys = Object.keys(OBSTACLE_TYPES);
    const chosenType = keys[Math.floor(Math.random() * keys.length)];
    const gx = 1 + Math.floor(Math.random() * (GRID_SIZE - 2));
    const gy = 1 + Math.floor(Math.random() * (GRID_SIZE - 2));

    const occupied = this.buildings.some(b => {
      const def = BUILDING_TYPES[b.type];
      return gx >= b.x && gx < b.x + def.w && gy >= b.y && gy < b.y + def.h;
    }) || this.obstacles.some(o => o.x === gx && o.y === gy);

    if (!occupied) {
      this.obstacles.push({
        id: 'obs_' + Date.now(),
        type: chosenType,
        x: gx,
        y: gy
      });
      this.saveState();
    }
  }

  collectResources() {
    let collectedYen = 0;
    let collectedRespect = 0;
    let collectedDark = 0;

    this.buildings.forEach(b => {
      if (b.type === 'ramen' && b.stored) {
        collectedYen += b.stored;
        b.stored = 0;
      } else if (b.type === 'dojo' && b.stored) {
        collectedRespect += b.stored;
        b.stored = 0;
      } else if (b.type === 'dark_drill' && b.stored) {
        collectedDark += b.stored;
        b.stored = 0;
      }
    });

    if (collectedYen > 0 || collectedRespect > 0 || collectedDark > 0) {
      this.yen = Math.min(this.maxYen, this.yen + collectedYen);
      this.respect = Math.min(this.maxRespect, this.respect + collectedRespect);
      this.darkElixir = Math.min(this.maxDarkElixir, this.darkElixir + collectedDark);
      window.soundEngine.playCoinCollect();
      showToast(`¡Ganancias recogidas! +¥ ${collectedYen}, +${collectedRespect} 🔥 y +${collectedDark} 🧪`);
      this.saveState();
      updateUI();
    } else {
      showToast('No hay ganancias listas para recolectar aún.');
    }
  }

  collectDarkOnly() {
    let collectedDark = 0;
    this.buildings.forEach(b => {
      if (b.type === 'dark_drill' && b.stored) {
        collectedDark += b.stored;
        b.stored = 0;
      }
    });

    if (collectedDark > 0) {
      this.darkElixir = Math.min(this.maxDarkElixir, this.darkElixir + collectedDark);
      window.soundEngine.playCoinCollect();
      showToast(`🧪 ¡Esencia Sombría recolectada! +${collectedDark} 🧪`);
      this.saveState();
      updateUI();
    } else {
      showToast('No hay Esencia Sombría acumulada aún en tus destiladores.');
    }
  }

  clearObstacle(obs) {
    const def = OBSTACLE_TYPES[obs.type];
    if (!def) return;

    if (this.yen < def.costYen || this.respect < def.costRespect) {
      showToast('¡Fondos o Respeto insuficiente para limpiar este obstáculo!');
      return;
    }

    if (this.freeBuilders <= 0) {
      showToast('¡Todos los constructores están ocupados! Espera a que terminen.');
      return;
    }

    this.yen -= def.costYen;
    this.respect -= def.costRespect;
    this.freeBuilders--;

    window.soundEngine.playChopObstacle();
    showToast(`Un constructor está limpiando: ${def.name}...`);

    this.activeBuilder = {
      x: obs.x,
      y: obs.y,
      progress: 0,
      targetTime: 2200
    };

    setTimeout(() => {
      const gemsFound = Math.floor(Math.random() * (def.gemsMax - def.gemsMin + 1)) + def.gemsMin;
      this.gems += gemsFound;
      this.obstacles = this.obstacles.filter(o => o.id !== obs.id);
      this.freeBuilders = Math.min(this.builders, this.freeBuilders + 1);
      this.activeBuilder = null;

      window.soundEngine.playGemDing();
      showToast(`✨ ¡Obstáculo limpiado! ¡Has encontrado +${gemsFound} 💎 Gemas de Honor!`);
      closeContextDock();
      this.saveState();
      updateUI();
    }, 2200);
  }

  toggleTheme() {
    this.theme = this.theme === 'village' ? 'urban' : 'village';
    window.soundEngine.playClick();
    this.saveState();

    const titleEl = document.getElementById('hud-base-theme-title');
    const descEl = document.getElementById('hud-base-status-desc');
    const themeBtn = document.getElementById('btn-theme-toggle');

    if (this.theme === 'village') {
      if (titleEl) titleEl.textContent = 'ALDEA MÍTICA DE RAYTON';
      if (descEl) descEl.textContent = 'Defensas Activas • Campo Fértil y Paz';
      if (themeBtn) themeBtn.textContent = '🌲';
      showToast('🌿 Vista de Aldea Mítica Activada (Hierba Esmeralda & Bosque)');
    } else {
      if (titleEl) titleEl.textContent = 'DISTRITO URBANO DE SHINJUKU';
      if (descEl) descEl.textContent = 'Territorio Bajo Vigilancia • Asfalto Nocturno';
      if (themeBtn) themeBtn.textContent = '🏙️';
      showToast('🏙️ Vista de Asfalto Urbano Tokio Activada');
    }
  }

  requestClanTroops() {
    window.soundEngine.playFanfareLevelUp();
    this.army.brawler = (this.army.brawler || 0) + 3;
    this.army.biker = (this.army.biker || 0) + 1;
    this.clanTroops = 4;
    showToast('🛡️ ¡Tropas de refuerzo del Clan recibidas: +3 Brawlers y +1 Motorista!');
    this.saveState();
    updateUI();
    document.getElementById('clan-modal').classList.add('hidden');
  }

  generateMultiplayerTarget() {
    const rivalNames = [
      { name: 'Aldea de Draken', gang: 'Primer Escuadrón ToMan', crest: '🏯' },
      { name: 'Fortaleza de Kisaki', gang: 'Sindicato Valhalla', crest: '🦅' },
      { name: 'Bastión de Baji', gang: 'Rebeldes de Shibuya', crest: '🔥' },
      { name: 'Guarida de Taiju', gang: 'Black Dragons X Gen', crest: '🐉' },
      { name: 'Distrito de Mikey', gang: 'Invencibles de Roppongi', crest: '⚡' },
      { name: 'Almacén de Osanai', gang: 'Moebius de Shinjuku', crest: '🐍' },
      { name: 'Refugio de Chifuyu', gang: 'Centinelas del Este', crest: '🛡️' }
    ];
    const picked = rivalNames[Math.floor(Math.random() * rivalNames.length)];
    const lootYen = 6000 + Math.floor(Math.random() * 9500);
    const lootRespect = 3500 + Math.floor(Math.random() * 6500);
    const lootDark = 250 + Math.floor(Math.random() * 550);

    const rivalBuildings = [
      { type: 'hq', x: 7, y: 7, level: 2 },
      { type: 'ramen', x: 5, y: 7, level: 2 },
      { type: 'dojo', x: 7, y: 5, level: 2 },
      { type: 'dark_drill', x: 9, y: 7, level: 1 },
      { type: 'dark_vault', x: 7, y: 9, level: 1 },
      { type: 'cannon', x: 4, y: 4, level: 2 },
      { type: 'watchtower', x: 10, y: 4, level: 2 },
      { type: 'wizard_tower', x: 4, y: 10, level: 1 },
      { type: 'mortar', x: 10, y: 10, level: 1 },
      { type: 'spring_trap', x: 6, y: 6, level: 1 },
      { type: 'bomb', x: 8, y: 6, level: 1 },
      { type: 'wall', x: 3, y: 3, level: 2 },
      { type: 'wall', x: 4, y: 3, level: 2 },
      { type: 'wall', x: 5, y: 3, level: 2 },
      { type: 'wall', x: 9, y: 3, level: 2 },
      { type: 'wall', x: 10, y: 3, level: 2 },
      { type: 'wall', x: 11, y: 3, level: 2 }
    ];

    this.multiplayerTarget = {
      id: 'mp_' + Date.now(),
      name: picked.name,
      gang: picked.gang,
      crest: picked.crest,
      lootYen: lootYen,
      lootRespect: lootRespect,
      lootDark: lootDark,
      trophiesWin: 28 + Math.floor(Math.random() * 10),
      trophiesLoss: 14 + Math.floor(Math.random() * 8),
      buildings: rivalBuildings
    };
    return this.multiplayerTarget;
  }
}

const game = new ClashGame();

// ==========================================================================
// CANVAS ISOMETRIC ENGINE & RENDERER
// ==========================================================================

const canvas = document.getElementById('base-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  game.cameraX = canvas.width / 2;
  game.cameraY = canvas.height / 3;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Isometric Grid Projection Helpers
function gridToScreen(gx, gy) {
  const x = (gx - gy) * (TILE_W / 2) + game.cameraX;
  const y = (gx + gy) * (TILE_H / 2) + game.cameraY;
  return { x, y };
}

function screenToGrid(sx, sy) {
  const relX = sx - game.cameraX;
  const relY = sy - game.cameraY;
  const gx = (relX / (TILE_W / 2) + relY / (TILE_H / 2)) / 2;
  const gy = (relY / (TILE_H / 2) - relX / (TILE_W / 2)) / 2;
  return { gx: Math.floor(gx), gy: Math.floor(gy) };
}

// Draw Isometric Tile
function drawTile(gx, gy, color, border = 'rgba(255,255,255,0.05)') {
  const pt = gridToScreen(gx, gy);
  ctx.beginPath();
  ctx.moveTo(pt.x, pt.y);
  ctx.lineTo(pt.x + TILE_W / 2, pt.y + TILE_H / 2);
  ctx.lineTo(pt.x, pt.y + TILE_H);
  ctx.lineTo(pt.x - TILE_W / 2, pt.y + TILE_H / 2);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();

  if (border) {
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// Draw Natural Village Obstacle
function drawObstacle(obs) {
  const def = OBSTACLE_TYPES[obs.type];
  if (!def) return;

  const pt = gridToScreen(obs.x + 0.5, obs.y + 0.5);

  // Soft shadow
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(pt.x, pt.y + 6, 14, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Highlight if selected
  if (game.selectedObstacle && game.selectedObstacle.id === obs.id) {
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(pt.x, pt.y + 6, 18, 9, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Obstacle Icon
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(def.icon, pt.x, pt.y - 8);

  // Gem sparkle indicator
  if (obs.type === 'gem_bush') {
    const sparkleY = pt.y - 18 + Math.sin(Date.now() / 200) * 3;
    ctx.font = '10px sans-serif';
    ctx.fillText('✨', pt.x + 8, sparkleY);
  }
  ctx.restore();
}

// Draw Building
function drawBuilding(bldg, isRaid = false) {
  const def = BUILDING_TYPES[bldg.type];
  if (!def) return;

  const pt = gridToScreen(bldg.x, bldg.y);
  const w = def.w;
  const h = def.h;

  // Selected Building Bounding Box & Ground Aura
  if (!isRaid && game.selectedBuilding && game.selectedBuilding.id === bldg.id) {
    ctx.save();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    const origin = gridToScreen(bldg.x, bldg.y);
    const rightCorner = gridToScreen(bldg.x + w, bldg.y);
    const bottomCorner = gridToScreen(bldg.x + w, bldg.y + h);
    const leftCorner = gridToScreen(bldg.x, bldg.y + h);
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(rightCorner.x, rightCorner.y);
    ctx.lineTo(bottomCorner.x, bottomCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.closePath();
    ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // Shadow
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  const shadowPt = gridToScreen(bldg.x + w / 2, bldg.y + h / 2);
  ctx.ellipse(shadowPt.x, shadowPt.y + (h * TILE_H) / 2, (w * TILE_W) / 2.2, (h * TILE_H) / 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Building Isometric Base Box
  const origin = gridToScreen(bldg.x, bldg.y);
  const bottomCorner = gridToScreen(bldg.x + w, bldg.y + h);
  const rightCorner = gridToScreen(bldg.x + w, bldg.y);
  const leftCorner = gridToScreen(bldg.x, bldg.y + h);

  const heightOffset = bldg.type === 'wall' ? 18 : 
                       bldg.type === 'watchtower' ? 55 : 
                       bldg.type === 'wizard_tower' ? 58 :
                       bldg.type === 'air_defense' ? 46 :
                       bldg.type === 'cannon' ? 36 :
                       bldg.type === 'mortar' ? 42 :
                       bldg.type === 'dark_drill' ? 44 :
                       bldg.type === 'dark_vault' ? 48 :
                       bldg.type === 'clan_castle' ? 60 :
                       bldg.type === 'hero_altar' ? 32 :
                       bldg.type === 'spring_trap' || bldg.type === 'bomb' ? 8 :
                       bldg.type === 'hq' ? 65 : 40;

  // Top Surface
  ctx.beginPath();
  ctx.moveTo(origin.x, origin.y - heightOffset);
  ctx.lineTo(rightCorner.x, rightCorner.y - heightOffset);
  ctx.lineTo(bottomCorner.x, bottomCorner.y - heightOffset);
  ctx.lineTo(leftCorner.x, leftCorner.y - heightOffset);
  ctx.closePath();

  // Colors based on building type (Rich Fantasy Delinquent Aesthetic)
  if (bldg.type === 'hq') ctx.fillStyle = '#b45309';
  else if (bldg.type === 'watchtower') ctx.fillStyle = '#1e293b';
  else if (bldg.type === 'wizard_tower') ctx.fillStyle = '#312e81';
  else if (bldg.type === 'air_defense') ctx.fillStyle = '#065f46';
  else if (bldg.type === 'cannon') ctx.fillStyle = '#334155';
  else if (bldg.type === 'mortar') ctx.fillStyle = '#7f1d1d';
  else if (bldg.type === 'dark_drill') ctx.fillStyle = '#581c87';
  else if (bldg.type === 'dark_vault') ctx.fillStyle = '#2e1065';
  else if (bldg.type === 'wall') ctx.fillStyle = '#475569';
  else if (bldg.type === 'ramen') ctx.fillStyle = '#d97706';
  else if (bldg.type === 'dojo') ctx.fillStyle = '#c2410c';
  else if (bldg.type === 'camp') ctx.fillStyle = '#166534';
  else if (bldg.type === 'clan_castle') ctx.fillStyle = '#1e1b4b';
  else if (bldg.type === 'hero_altar') ctx.fillStyle = '#78350f';
  else if (bldg.type === 'spell_factory') ctx.fillStyle = '#581c87';
  else if (bldg.type === 'spring_trap' || bldg.type === 'bomb') ctx.fillStyle = '#52525b';
  else ctx.fillStyle = '#1e293b';

  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Left Face
  ctx.beginPath();
  ctx.moveTo(leftCorner.x, leftCorner.y - heightOffset);
  ctx.lineTo(bottomCorner.x, bottomCorner.y - heightOffset);
  ctx.lineTo(bottomCorner.x, bottomCorner.y);
  ctx.lineTo(leftCorner.x, leftCorner.y);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fill();
  ctx.stroke();

  // Right Face
  ctx.beginPath();
  ctx.moveTo(rightCorner.x, rightCorner.y - heightOffset);
  ctx.lineTo(bottomCorner.x, bottomCorner.y - heightOffset);
  ctx.lineTo(bottomCorner.x, bottomCorner.y);
  ctx.lineTo(rightCorner.x, rightCorner.y);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fill();
  ctx.stroke();

  // Building Icon & Level
  const centerPt = gridToScreen(bldg.x + w / 2, bldg.y + h / 2);
  ctx.font = `${Math.min(32, 16 + w * 5)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(def.icon, centerPt.x, centerPt.y - heightOffset / 1.5);

  // Special Visual: Wizard Tower Pyrotechnics
  if (bldg.type === 'wizard_tower') {
    const sparkY = centerPt.y - heightOffset - 8;
    ctx.font = '10px sans-serif';
    ctx.fillText('✨', centerPt.x + 8 * Math.cos(Date.now() / 200), sparkY + 4 * Math.sin(Date.now() / 200));
  }

  // Special Visual: Dark Drill Bubbling Glow
  if (bldg.type === 'dark_drill') {
    const bubY = centerPt.y - heightOffset - 6;
    ctx.fillStyle = 'rgba(192, 132, 252, 0.35)';
    ctx.beginPath();
    ctx.arc(centerPt.x, bubY, 8 + Math.sin(Date.now() / 180) * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Special Visual: Campfire in Camp with Roaming Troops!
  if (bldg.type === 'camp') {
    const fireY = centerPt.y - heightOffset - 4;
    ctx.fillStyle = 'rgba(249, 115, 22, 0.4)';
    ctx.beginPath();
    ctx.arc(centerPt.x, fireY, 14 + Math.sin(Date.now() / 150) * 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '16px sans-serif';
    ctx.fillText('🔥', centerPt.x, fireY);

    const troopKeys = Object.keys(game.army).filter(k => game.army[k] > 0);
    troopKeys.slice(0, 3).forEach((tk, idx) => {
      const angle = (Date.now() / 1200) + (idx * (Math.PI * 2 / 3));
      const tx = centerPt.x + Math.cos(angle) * 22;
      const ty = centerPt.y - heightOffset + Math.sin(angle) * 10;
      ctx.font = '13px sans-serif';
      ctx.fillText(TROOP_TYPES[tk].icon, tx, ty);
    });
  }

  // Special Visual: Hero Ren on Hero Altar
  if (bldg.type === 'hero_altar' && !isRaid) {
    const heroY = centerPt.y - heightOffset - 12;
    ctx.font = '18px sans-serif';
    ctx.fillText('👑', centerPt.x, heroY - 8);
    ctx.font = 'bold 9px Russo One, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('REN', centerPt.x, heroY + 8);
  }

  // Level Badge
  if (bldg.type !== 'spring_trap' && bldg.type !== 'bomb') {
    ctx.font = 'bold 10px Russo One, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`Nv.${bldg.level || 1}`, centerPt.x, centerPt.y - heightOffset - 8);
  }

  // Freeze Visual Effect (Spell Freeze CoC)
  if (bldg.frozenUntil && bldg.frozenUntil > Date.now()) {
    ctx.save();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y - heightOffset);
    ctx.lineTo(rightCorner.x, rightCorner.y - heightOffset);
    ctx.lineTo(bottomCorner.x, bottomCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.font = '18px sans-serif';
    ctx.fillText('❄️', centerPt.x, centerPt.y - heightOffset - 18);
    ctx.restore();
  }

  // Health Bar (During Raid or when damaged)
  if (isRaid || (bldg.currentHp && bldg.currentHp < bldg.maxHp)) {
    const hpPct = Math.max(0, bldg.currentHp / bldg.maxHp);
    const barW = Math.max(34, w * 18);
    const barX = centerPt.x - barW / 2;
    const barY = centerPt.y - heightOffset - 22;

    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(barX - 1, barY - 1, barW + 2, 6);

    ctx.fillStyle = hpPct > 0.5 ? '#10b981' : hpPct > 0.25 ? '#f59e0b' : '#ef4444';
    ctx.fillRect(barX, barY, barW * hpPct, 4);
  }

  // Floating Collection Icon (In Base Mode)
  if (!isRaid && bldg.stored && bldg.stored > 25) {
    const iconY = centerPt.y - heightOffset - 24 + Math.sin(Date.now() / 250) * 4;
    ctx.font = '18px sans-serif';
    const collectIcon = bldg.type === 'ramen' ? '🪙' : bldg.type === 'dojo' ? '🔥' : '🧪';
    ctx.fillText(collectIcon, centerPt.x, iconY);
  }
}

// Main Render Loop
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const isRaid = game.mode === 'raid';
  const isDefense = game.mode === 'defense';
  const isVillage = game.theme === 'village';

  // Draw Grid Turf
  for (let gx = 0; gx < GRID_SIZE; gx++) {
    for (let gy = 0; gy < GRID_SIZE; gy++) {
      const isPerimeter = gx === 0 || gy === 0 || gx === GRID_SIZE - 1 || gy === GRID_SIZE - 1;
      
      let tileColor;
      let borderColor;

      if (isRaid && isPerimeter) {
        tileColor = 'rgba(239, 68, 68, 0.22)';
        borderColor = 'rgba(239, 68, 68, 0.5)';
      } else if (isVillage) {
        tileColor = (gx + gy) % 2 === 0 ? '#2e7d32' : '#338a37';
        borderColor = 'rgba(255, 255, 255, 0.06)';
      } else {
        tileColor = (gx + gy) % 2 === 0 ? '#121624' : '#161a2b';
        borderColor = 'rgba(255,255,255,0.04)';
      }

      drawTile(gx, gy, tileColor, borderColor);
    }
  }

  // Animated Perimeter Line (In Raid Mode to clearly distinguish troop deployment zone)
  if (isRaid) {
    ctx.save();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([10, 8]);
    ctx.lineDashOffset = (Date.now() / 60) % 18;
    const pTL = gridToScreen(1.5, 1.5);
    const pTR = gridToScreen(GRID_SIZE - 1.5, 1.5);
    const pBR = gridToScreen(GRID_SIZE - 1.5, GRID_SIZE - 1.5);
    const pBL = gridToScreen(1.5, GRID_SIZE - 1.5);
    ctx.beginPath();
    ctx.moveTo(pTL.x, pTL.y);
    ctx.lineTo(pTR.x, pTR.y);
    ctx.lineTo(pBR.x, pBR.y);
    ctx.lineTo(pBL.x, pBL.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  // Draw Perimeter Forest Border (In Village Mode)
  if (isVillage && !isRaid && !isDefense) {
    for (let i = 0; i < GRID_SIZE; i += 2) {
      const p1 = gridToScreen(i, 0);
      const p2 = gridToScreen(i, GRID_SIZE - 1);
      ctx.font = '16px sans-serif';
      ctx.fillText(i % 4 === 0 ? '🌲' : '🪨', p1.x, p1.y - 6);
      ctx.fillText(i % 4 === 0 ? '🌲' : '🏮', p2.x, p2.y - 6);
    }
  }

  // Draw Natural Village Obstacles (Base Mode)
  if (!isRaid && !isDefense) {
    game.obstacles.forEach(obs => drawObstacle(obs));
  }

  // Active Buildings List
  let activeBuildings = game.buildings;
  if (isRaid && game.currentRaid) {
    activeBuildings = game.currentRaid.buildings;
  } else if (isDefense && game.currentDefense) {
    activeBuildings = game.currentDefense.buildings;
  }

  // Sort buildings by depth (gx + gy) for correct isometric overlap
  activeBuildings
    .slice()
    .sort((a, b) => (a.x + a.y) - (b.x + b.y))
    .forEach(b => {
      if (!b.destroyed) {
        drawBuilding(b, isRaid || isDefense);
      }
    });

  // Render Wandering Villagers (Base Mode)
  if (!isRaid && !isDefense) {
    game.villagers.forEach(v => {
      const pt = gridToScreen(v.x, v.y);
      ctx.font = '16px sans-serif';
      ctx.fillText(v.icon, pt.x, pt.y - 6);
    });
  }

  // Render Active Builder Worker with Hammer
  if (!isRaid && !isDefense && game.activeBuilder) {
    const pt = gridToScreen(game.activeBuilder.x + 0.5, game.activeBuilder.y + 0.5);
    ctx.font = '18px sans-serif';
    ctx.fillText('🔨', pt.x + 8, pt.y - 16 + Math.sin(Date.now() / 80) * 4);
    ctx.fillText('👷', pt.x - 4, pt.y - 12);
  }

  // Render Raid Projectiles, Troops, Spells & Traps if in Raid Mode
  if (isRaid && game.currentRaid) {
    game.currentRaid.renderCombat(ctx);
  }

  // Render Defense Mode Simulation if in Defense Mode
  if (isDefense && game.currentDefense) {
    game.currentDefense.renderDefense(ctx);
  }

  // Floating Texts (Damage, Loot, Alerts)
  game.floatingTexts.forEach(ft => {
    const pt = gridToScreen(ft.x, ft.y);
    ctx.save();
    ctx.globalAlpha = Math.max(0, ft.alpha);
    ctx.font = 'bold 13px Russo One, sans-serif';
    ctx.fillStyle = ft.color;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    const offsetY = (55 - ft.life) * 0.9;
    ctx.strokeText(ft.text, pt.x, pt.y - offsetY);
    ctx.fillText(ft.text, pt.x, pt.y - offsetY);
    ctx.restore();
    ft.life--;
    ft.alpha = ft.life / 55;
  });
  game.floatingTexts = game.floatingTexts.filter(ft => ft.life > 0);

  // Placement Preview if player is placing a building or moving an existing one
  const previewBldg = game.placementBuilding || game.movingBuilding;
  if (previewBldg && !isRaid && !isDefense) {
    const def = BUILDING_TYPES[previewBldg.type];
    const w = def ? def.w : 1;
    const h = def ? def.h : 1;

    const collides = game.buildings.some(b => {
      if (game.movingBuilding && b.id === game.movingBuilding.id) return false;
      const bdef = BUILDING_TYPES[b.type];
      return !(previewBldg.x + w <= b.x || previewBldg.x >= b.x + bdef.w ||
               previewBldg.y + h <= b.y || previewBldg.y >= b.y + bdef.h);
    });

    const isInside = previewBldg.x >= 1 && previewBldg.y >= 1 && 
                     previewBldg.x + w <= GRID_SIZE - 1 && previewBldg.y + h <= GRID_SIZE - 1;

    const isValid = !collides && isInside;

    for (let ix = 0; ix < w; ix++) {
      for (let iy = 0; iy < h; iy++) {
        drawTile(previewBldg.x + ix, previewBldg.y + iy, isValid ? 'rgba(34, 197, 94, 0.45)' : 'rgba(239, 68, 68, 0.5)', isValid ? '#22c55e' : '#ef4444');
      }
    }

    ctx.save();
    ctx.globalAlpha = 0.75;
    drawBuilding(previewBldg, false);
    ctx.restore();
  }

  requestAnimationFrame(render);
}
requestAnimationFrame(render);

// ==========================================================================
// REAL-TIME RAID COMBAT ENGINE (CLASH OF CLANS AUTONOMOUS AI & SPELLS)
// ==========================================================================

class RaidSession {
  constructor(baseDef) {
    this.baseDef = baseDef;
    // Only non-walls and non-traps count towards destruction percentage (Clash of Clans standard)
    this.targetableBuildings = baseDef.buildings.filter(b => b.type !== 'wall' && b.type !== 'spring_trap' && b.type !== 'bomb');
    this.totalBuildings = Math.max(1, this.targetableBuildings.length);
    this.destroyedBuildings = 0;
    this.stars = 0;
    this.hqDestroyed = false;
    this.damagePct = 0;
    this.hasDeployedAtLeastOne = false;
    this.victoryTriggered = false;
    this.autoReturnTimer = null;

    this.lootedYen = 0;
    this.lootedRespect = 0;
    this.lootedDark = 0;
    this.maxLootYen = baseDef.lootYen;
    this.maxLootRespect = baseDef.lootRespect;
    this.maxLootDark = baseDef.lootDark || 350;

    this.timeLeft = 180; // 3 minutes
    this.isOver = false;

    // Instantiate Enemy Buildings
    this.buildings = baseDef.buildings.map((b, idx) => {
      const template = BUILDING_TYPES[b.type];
      const maxHp = (template ? template.hp : 500) * (b.level || 1);
      return {
        id: 'raid_bldg_' + idx,
        type: b.type,
        x: b.x,
        y: b.y,
        level: b.level || 1,
        maxHp: maxHp,
        currentHp: maxHp,
        destroyed: false,
        lastShot: 0,
        frozenUntil: 0
      };
    });

    this.troops = [];
    this.projectiles = [];
    this.particles = [];
    this.activeSpells = [];
    this.heroRen = null;

    this.startTimer();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.isOver) return;
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.endRaid(false);
      }
      this.updateHud();
    }, 1000);
  }

  deployTroop(troopType, gx, gy) {
    const template = TROOP_TYPES[troopType];
    if (!template) return;

    this.hasDeployedAtLeastOne = true;
    window.soundEngine.playDeploy();

    this.troops.push({
      id: 't_' + Date.now() + '_' + Math.random(),
      type: troopType,
      name: template.name,
      icon: template.icon,
      x: gx,
      y: gy,
      hp: template.hp,
      maxHp: template.hp,
      dps: template.dps,
      speed: template.speed,
      targetPriority: template.targetPriority,
      range: template.range || 0.8,
      isFlying: template.isFlying || false,
      jumpsWalls: template.jumpsWalls || false,
      isSplash: template.isSplash || false,
      lastAttack: 0,
      target: null
    });
  }

  deployHero(gx, gy) {
    this.hasDeployedAtLeastOne = true;
    window.soundEngine.playHeroRoar();
    this.heroRen = {
      id: 'hero_ren_' + Date.now(),
      type: 'hero_ren',
      name: HERO_REN.name,
      icon: HERO_REN.icon,
      x: gx,
      y: gy,
      hp: HERO_REN.hp,
      maxHp: HERO_REN.maxHp,
      dps: HERO_REN.dps,
      speed: HERO_REN.speed,
      targetPriority: 'any',
      range: 0.9,
      lastAttack: 0,
      isHero: true,
      usedAbility: false
    };
    this.troops.push(this.heroRen);

    const heroBtn = document.getElementById('hero-ability-button-wrap');
    if (heroBtn) {
      heroBtn.classList.remove('hidden');
      heroBtn.style.display = 'block';
    }
    showToast('👑 ¡Ren Kazuma ha pisado el campo de batalla! ¡Patada Nuclear lista!');
  }

  activateHeroAbility() {
    if (!this.heroRen || this.heroRen.usedAbility || this.heroRen.hp <= 0) return;
    this.heroRen.usedAbility = true;

    this.heroRen.hp = Math.min(this.heroRen.maxHp, this.heroRen.hp + 600);
    this.heroRen.dps *= 1.8;
    this.heroRen.speed *= 1.4;

    window.soundEngine.playHeroRoar();

    for (let i = 0; i < 4; i++) {
      const offsetX = (Math.random() - 0.5) * 1.5;
      const offsetY = (Math.random() - 0.5) * 1.5;
      this.deployTroop('brawler', this.heroRen.x + offsetX, this.heroRen.y + offsetY);
    }

    const heroBtn = document.getElementById('btn-hero-ability');
    if (heroBtn) {
      heroBtn.classList.add('used');
      heroBtn.title = 'Habilidad ya utilizada';
    }

    showToast('⚡ ¡¡PATADA NUCLEAR ACTIVADA!! ¡Ren desata furia y llama refuerzos!');
  }

  castSpell(spellType, gx, gy) {
    const def = SPELL_TYPES[spellType];
    if (!def) return;

    if (spellType === 'lightning') {
      window.soundEngine.playLightningSpell();
      this.buildings.forEach(b => {
        if (!b.destroyed && Math.hypot(b.x - gx, b.y - gy) <= def.radius) {
          this.applyDamageToBuilding(b, def.damage);
        }
      });
      for (let i = 0; i < 14; i++) {
        this.particles.push({
          x: gx + (Math.random() - 0.5),
          y: gy + (Math.random() - 0.5),
          life: 25,
          color: '#fde047'
        });
      }
      game.addFloatingText('⚡ RAYO!', gx, gy, '#fde047');
      showToast('⚡ ¡Rayo Celestial impactó sobre las defensas enemigas!');
    } else if (spellType === 'freeze') {
      window.soundEngine.playFreezeSpell();
      this.buildings.forEach(b => {
        if (!b.destroyed && Math.hypot(b.x - gx, b.y - gy) <= def.radius) {
          b.frozenUntil = Date.now() + def.duration;
        }
      });
      for (let i = 0; i < 16; i++) {
        this.particles.push({
          x: gx + (Math.random() - 0.5) * 2,
          y: gy + (Math.random() - 0.5) * 2,
          life: 30,
          color: '#38bdf8'
        });
      }
      game.addFloatingText('❄️ CONGELADO!', gx, gy, '#38bdf8');
      showToast('❄️ ¡Hechizo de Hielo! ¡Defensas congeladas durante 5.5 segundos!');
    } else {
      window.soundEngine.playSpellCast();
      this.activeSpells.push({
        type: spellType,
        x: gx,
        y: gy,
        radius: def.radius,
        color: def.color,
        borderColor: def.borderColor,
        expiresAt: Date.now() + def.duration
      });
      showToast(`🧪 ¡${def.name} arrojada en el campo de batalla!`);
    }
  }

  updateCombat() {
    if (this.isOver) return;

    const now = Date.now();
    this.activeSpells = this.activeSpells.filter(s => s.expiresAt > now);

    // 1. Update Troops AI
    this.troops.forEach(troop => {
      if (troop.hp <= 0) return;

      let isRaged = false;
      this.activeSpells.forEach(s => {
        const d = Math.hypot(troop.x - s.x, troop.y - s.y);
        if (d <= s.radius) {
          if (s.type === 'rage') isRaged = true;
          if (s.type === 'heal') troop.hp = Math.min(troop.maxHp, troop.hp + 0.6);
        }
      });

      const effectiveDps = isRaged ? troop.dps * 1.65 : troop.dps;
      const effectiveSpeed = isRaged ? troop.speed * 1.4 : troop.speed;

      if (!troop.target || troop.target.destroyed) {
        troop.target = this.findBestTarget(troop);
      }

      if (!troop.target) return;

      const targetDef = BUILDING_TYPES[troop.target.type];
      const tw = targetDef ? targetDef.w : 1;
      const th = targetDef ? targetDef.h : 1;
      const targetCenterX = troop.target.x + tw / 2;
      const targetCenterY = troop.target.y + th / 2;

      const dx = targetCenterX - troop.x;
      const dy = targetCenterY - troop.y;
      const dist = Math.hypot(dx, dy);

      if (dist > troop.range) {
        const step = (effectiveSpeed * 0.035);
        troop.x += (dx / dist) * step;
        troop.y += (dy / dist) * step;

        if (!troop.isFlying && !troop.jumpsWalls) {
          this.checkTrapsUnderTroop(troop);
        }
      } else {
        if (now - troop.lastAttack > (troop.type === 'dragon' ? 700 : 920)) {
          troop.lastAttack = now;
          let dmg = effectiveDps;
          if (troop.type === 'goblin' && (troop.target.type === 'ramen' || troop.target.type === 'dojo' || troop.target.type === 'vault' || troop.target.type === 'dark_drill' || troop.target.type === 'dark_vault')) {
            dmg *= 2;
            game.addFloatingText('👺 ROBO x2!', troop.target.x + tw / 2, troop.target.y + th / 2, '#10b981');
          }

          this.applyDamageToBuilding(troop.target, dmg);

          if (troop.type === 'archer') {
            window.soundEngine.playArrowShoot();
          } else if (troop.type === 'wizard') {
            window.soundEngine.playMagicFireball();
          } else if (troop.type === 'dragon') {
            window.soundEngine.playDragonBreath();
          } else {
            window.soundEngine.playPunch();
          }

          this.particles.push({
            x: troop.target.x + tw / 2,
            y: troop.target.y + th / 2,
            life: 18,
            color: troop.type === 'wizard' ? '#c084fc' : (troop.type === 'dragon' ? '#f97316' : '#fbbf24')
          });

          if (troop.type === 'demolisher' && troop.target.type === 'wall') {
            troop.hp = 0;
            window.soundEngine.playExplosion();
          }
        }
      }
    });

    this.troops = this.troops.filter(t => t.hp > 0);

    // 2. Defensive Buildings AI
    this.buildings.forEach(b => {
      if (b.destroyed) return;
      if (b.frozenUntil && b.frozenUntil > now) return; // Tower is frozen!

      if (b.type === 'cannon') {
        const range = 5.2;
        const targetTroop = this.findNearestTroop(b.x + 1, b.y + 1, range, false);
        if (targetTroop && now - b.lastShot > 850) {
          b.lastShot = now;
          window.soundEngine.playShoot();
          this.projectiles.push({
            startX: b.x + 1, startY: b.y + 1,
            x: b.x + 1, y: b.y + 1,
            targetTroop: targetTroop,
            speed: 0.22,
            damage: 32 * b.level
          });
        }
      } else if (b.type === 'watchtower') {
        const range = 6.2;
        const targetTroop = this.findNearestTroop(b.x + 1, b.y + 1, range, true);
        if (targetTroop && now - b.lastShot > 1000) {
          b.lastShot = now;
          window.soundEngine.playArrowShoot();
          this.projectiles.push({
            startX: b.x + 1, startY: b.y + 1,
            x: b.x + 1, y: b.y + 1,
            targetTroop: targetTroop,
            speed: 0.26,
            isArrow: true,
            damage: 28 * b.level
          });
        }
      } else if (b.type === 'wizard_tower') {
        const range = 4.8;
        const targetTroop = this.findNearestTroop(b.x + 1, b.y + 1, range, true);
        if (targetTroop && now - b.lastShot > 1400) {
          b.lastShot = now;
          window.soundEngine.playMagicFireball();
          this.projectiles.push({
            startX: b.x + 1, startY: b.y + 1,
            x: b.x + 1, y: b.y + 1,
            targetX: targetTroop.x,
            targetY: targetTroop.y,
            isSplash: true,
            speed: 0.16,
            damage: 42 * b.level
          });
        }
      } else if (b.type === 'air_defense') {
        const range = 7.2;
        const flyingTarget = this.troops.find(t => t.hp > 0 && t.isFlying && Math.hypot(t.x - (b.x + 1), t.y - (b.y + 1)) <= range);
        if (flyingTarget && now - b.lastShot > 950) {
          b.lastShot = now;
          window.soundEngine.playHeavyHit();
          this.projectiles.push({
            startX: b.x + 1, startY: b.y + 1,
            x: b.x + 1, y: b.y + 1,
            targetTroop: flyingTarget,
            speed: 0.32,
            damage: 85 * b.level
          });
        }
      } else if (b.type === 'mortar') {
        const range = 7.5;
        const targetTroop = this.findNearestTroop(b.x + 1, b.y + 1, range, false);
        if (targetTroop && now - b.lastShot > 3200) {
          b.lastShot = now;
          window.soundEngine.playShoot();
          this.projectiles.push({
            startX: b.x + 1, startY: b.y + 1,
            x: b.x + 1, y: b.y + 1,
            targetX: targetTroop.x,
            targetY: targetTroop.y,
            isSplash: true,
            speed: 0.08,
            damage: 40 * b.level
          });
        }
      }
    });

    // 3. Update Projectiles
    this.projectiles.forEach(p => {
      if (p.isSplash) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.25) {
          window.soundEngine.playExplosion();
          this.troops.forEach(t => {
            if (Math.hypot(t.x - p.targetX, t.y - p.targetY) < 2.2) {
              t.hp -= p.damage;
              game.addFloatingText(`-${Math.round(p.damage)}`, t.x, t.y, '#f59e0b');
            }
          });
          p.dead = true;
        } else {
          p.x += (dx / dist) * p.speed;
          p.y += (dy / dist) * p.speed;
        }
      } else {
        if (!p.targetTroop || p.targetTroop.hp <= 0) {
          p.dead = true;
          return;
        }
        const dx = p.targetTroop.x - p.x;
        const dy = p.targetTroop.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.25) {
          p.targetTroop.hp -= p.damage;
          game.addFloatingText(`-${Math.round(p.damage)}`, p.targetTroop.x, p.targetTroop.y, '#f59e0b');
          p.dead = true;
        } else {
          p.x += (dx / dist) * p.speed;
          p.y += (dy / dist) * p.speed;
        }
      }
    });

    this.projectiles = this.projectiles.filter(p => !p.dead);

    // 4. Update Particles
    this.particles.forEach(p => p.life--);
    this.particles = this.particles.filter(p => p.life > 0);

    // Check Victory 100% or All Targetable Buildings Destroyed
    const targetableRemaining = this.buildings.filter(b => !b.destroyed && b.type !== 'wall' && b.type !== 'spring_trap' && b.type !== 'bomb');
    if ((targetableRemaining.length === 0 || this.damagePct >= 100) && !this.victoryTriggered) {
      this.victoryTriggered = true;
      this.damagePct = 100;
      this.awardStar(1);
      this.awardStar(2);
      this.awardStar(3);
      this.updateHud();
      window.soundEngine.playVictory();
      setTimeout(() => {
        this.endRaid(true);
      }, 700);
      return;
    }

    // Check if player deployed troops and all troops died with none left to deploy
    const totalRemainingToDeploy = Object.values(game.army).reduce((a, b) => a + b, 0) + (this.heroRen ? 0 : 1);
    if (this.hasDeployedAtLeastOne && this.troops.length === 0 && (!this.heroRen || this.heroRen.hp <= 0) && totalRemainingToDeploy === 0 && !this.victoryTriggered) {
      this.victoryTriggered = true;
      setTimeout(() => {
        this.endRaid(false);
      }, 1000);
      return;
    }
  }

  checkTrapsUnderTroop(troop) {
    this.buildings.forEach(b => {
      if (b.destroyed) return;
      const d = Math.hypot(troop.x - b.x, troop.y - b.y);

      if (b.type === 'spring_trap' && d < 0.75) {
        b.destroyed = true;
        window.soundEngine.playSpringTrap();
        troop.hp = 0;
        game.addFloatingText('🌀 TRAMPA!', troop.x, troop.y, '#38bdf8');
        showToast('🌀 ¡Trampa de Muelle activada! ¡Tropa catapultada fuera del mapa!');
      } else if (b.type === 'bomb' && d < 0.9) {
        b.destroyed = true;
        window.soundEngine.playExplosion();
        this.troops.forEach(t => {
          if (Math.hypot(t.x - b.x, t.y - b.y) < 2.0) {
            t.hp -= 150;
            game.addFloatingText('-150', t.x, t.y, '#ef4444');
          }
        });
        showToast('💣 ¡Bomba oculta detonada!');
      }
    });
  }

  findBestTarget(troop) {
    const living = this.buildings.filter(b => !b.destroyed && b.type !== 'spring_trap' && b.type !== 'bomb');
    if (living.length === 0) return null;

    // Filter living targetable structures excluding walls
    const targetableLiving = living.filter(b => b.type !== 'wall');
    if (targetableLiving.length === 0) {
      // Only walls left! 100% Victory achieved!
      if (!this.victoryTriggered) {
        this.victoryTriggered = true;
        this.damagePct = 100;
        this.awardStar(1);
        this.awardStar(2);
        this.awardStar(3);
        this.updateHud();
        window.soundEngine.playVictory();
        setTimeout(() => {
          this.endRaid(true);
        }, 600);
      }
      return null;
    }

    if (troop.targetPriority === 'defenses') {
      const defenses = targetableLiving.filter(b => b.type === 'watchtower' || b.type === 'mortar' || b.type === 'cannon' || b.type === 'wizard_tower' || b.type === 'air_defense');
      if (defenses.length > 0) {
        return this.getClosestBuilding(troop.x, troop.y, defenses);
      }
    } else if (troop.targetPriority === 'resources') {
      const resources = targetableLiving.filter(b => b.type === 'ramen' || b.type === 'dojo' || b.type === 'vault' || b.type === 'dark_drill' || b.type === 'dark_vault');
      if (resources.length > 0) {
        return this.getClosestBuilding(troop.x, troop.y, resources);
      }
    } else if (troop.targetPriority === 'walls') {
      const walls = living.filter(b => b.type === 'wall');
      if (walls.length > 0) {
        return this.getClosestBuilding(troop.x, troop.y, walls);
      }
    }

    // Default target: closest targetable structure
    return this.getClosestBuilding(troop.x, troop.y, targetableLiving);
  }

  getClosestBuilding(x, y, list) {
    let closest = list[0];
    let minDist = Infinity;
    list.forEach(b => {
      const dist = Math.hypot(b.x - x, b.y - y);
      if (dist < minDist) {
        minDist = dist;
        closest = b;
      }
    });
    return closest;
  }

  findNearestTroop(x, y, maxRange, canTargetAir = true) {
    let nearest = null;
    let minDist = maxRange;
    this.troops.forEach(t => {
      if (t.hp > 0 && (canTargetAir || !t.isFlying)) {
        const dist = Math.hypot(t.x - x, t.y - y);
        if (dist < minDist) {
          minDist = dist;
          nearest = t;
        }
      }
    });
    return nearest;
  }

  applyDamageToBuilding(bldg, dmg) {
    bldg.currentHp -= dmg;
    game.addFloatingText(`-${Math.round(dmg)}`, bldg.x + 1, bldg.y + 1, '#fbbf24');

    if (bldg.currentHp <= 0 && !bldg.destroyed) {
      bldg.destroyed = true;
      window.soundEngine.playExplosion();

      // Only count non-walls, non-traps for destruction percentage!
      const isTargetable = bldg.type !== 'wall' && bldg.type !== 'spring_trap' && bldg.type !== 'bomb';
      if (isTargetable) {
        this.destroyedBuildings++;
        this.damagePct = Math.min(100, Math.round((this.destroyedBuildings / this.totalBuildings) * 100));
      }

      this.lootedYen = Math.round(this.maxLootYen * (this.damagePct / 100));
      this.lootedRespect = Math.round(this.maxLootRespect * (this.damagePct / 100));
      this.lootedDark = Math.round(this.maxLootDark * (this.damagePct / 100));

      if (bldg.type === 'hq' && !this.hqDestroyed) {
        this.hqDestroyed = true;
        this.awardStar(1);
      }
      if (this.damagePct >= 50 && this.stars < 1 && !this.hqDestroyed) {
        this.awardStar(1);
      }
      if (this.hqDestroyed && this.damagePct >= 50 && this.stars < 2) {
        this.awardStar(2);
      }

      // Check if all non-wall buildings are destroyed
      const remainingTargetable = this.buildings.filter(b => !b.destroyed && b.type !== 'wall' && b.type !== 'spring_trap' && b.type !== 'bomb');
      if (remainingTargetable.length === 0 || this.damagePct >= 100) {
        this.damagePct = 100;
        this.awardStar(1);
        this.awardStar(2);
        this.awardStar(3);
        this.updateHud();

        if (!this.victoryTriggered) {
          this.victoryTriggered = true;
          window.soundEngine.playVictory();
          game.addFloatingText('💥 100% ANIQUILACIÓN TOTAL!', bldg.x + 1, bldg.y + 1, '#ef4444');
          setTimeout(() => {
            this.endRaid(true);
          }, 800);
        }
      }

      this.updateHud();
    }
  }

  awardStar(num) {
    if (num > this.stars) {
      this.stars = num;
      window.soundEngine.playStarSound();
      showToast(`⭐ ¡Estrella ${num} conseguida!`);
      const starEl = document.getElementById(`raid-star-${num}`);
      if (starEl) starEl.classList.add('active');
    }
  }

  updateHud() {
    const pctEl = document.getElementById('raid-damage-pct');
    if (pctEl) pctEl.textContent = `${this.damagePct}%`;
    const yEl = document.getElementById('raid-looted-yen');
    if (yEl) yEl.textContent = `+¥ ${this.lootedYen.toLocaleString()}`;
    const rEl = document.getElementById('raid-looted-respect');
    if (rEl) rEl.textContent = `+${this.lootedRespect.toLocaleString()} 🔥`;
    const dEl = document.getElementById('raid-looted-dark');
    if (dEl) dEl.textContent = `+${this.lootedDark.toLocaleString()} 🧪`;

    const mins = String(Math.floor(this.timeLeft / 60)).padStart(2, '0');
    const secs = String(this.timeLeft % 60).padStart(2, '0');
    const tEl = document.getElementById('raid-timer');
    if (tEl) tEl.textContent = `${mins}:${secs}`;
  }

  renderCombat(ctx) {
    this.updateCombat();

    this.activeSpells.forEach(s => {
      const pt = gridToScreen(s.x, s.y);
      ctx.save();
      ctx.fillStyle = s.color;
      ctx.strokeStyle = s.borderColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(pt.x, pt.y, s.radius * (TILE_W / 2), s.radius * (TILE_H / 2), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });

    this.troops.forEach(t => {
      const pt = gridToScreen(t.x, t.y);

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath();
      ctx.ellipse(pt.x, pt.y + 4, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Troop Icon
      ctx.font = t.isHero ? '28px sans-serif' : (t.isFlying ? '26px sans-serif' : '20px sans-serif');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const drawY = t.isFlying ? pt.y - 24 : pt.y - 12;
      ctx.fillText(t.icon, pt.x, drawY);

      // Troop Health Bar
      const hpPct = Math.max(0, t.hp / t.maxHp);
      ctx.fillStyle = '#000';
      ctx.fillRect(pt.x - 12, drawY - 14, 24, 4);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(pt.x - 11, drawY - 13, 22 * hpPct, 2);
    });

    // Render Projectiles
    this.projectiles.forEach(p => {
      const pt = gridToScreen(p.x, p.y);
      ctx.fillStyle = p.isSplash ? '#f97316' : (p.isArrow ? '#38bdf8' : '#f59e0b');
      ctx.beginPath();
      ctx.arc(pt.x, pt.y - 15, p.isSplash ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Render Particles
    this.particles.forEach(p => {
      const pt = gridToScreen(p.x, p.y);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y - 10, 3 + (18 - p.life) * 0.4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  endRaid(isPerfect100 = false) {
    if (this.isOver) return;
    this.isOver = true;
    clearInterval(this.timerInterval);

    // Forcibly hide combat HUDs immediately so nothing bugs or lingers
    const raidTop = document.getElementById('raid-top-hud');
    if (raidTop) {
      raidTop.classList.add('hidden');
      raidTop.style.display = 'none';
    }
    const raidBtm = document.getElementById('bottom-hud-raid');
    if (raidBtm) {
      raidBtm.classList.add('hidden');
      raidBtm.style.display = 'none';
    }
    const deployHint = document.getElementById('deployment-hint');
    if (deployHint) {
      deployHint.classList.add('hidden');
      deployHint.style.display = 'none';
    }
    const heroBtn = document.getElementById('hero-ability-button-wrap');
    if (heroBtn) {
      heroBtn.classList.add('hidden');
      heroBtn.style.display = 'none';
    }

    let bonusYen = this.lootedYen;
    let bonusRespect = this.lootedRespect;
    let bonusDark = this.lootedDark;
    let bonusGems = 0;
    let trophiesEarned = 0;

    if (this.damagePct >= 100 || isPerfect100) {
      this.damagePct = 100;
      this.stars = 3;
      bonusYen = Math.round(this.maxLootYen * 1.35); // +35% bonus for 100%
      bonusRespect = Math.round(this.maxLootRespect * 1.35);
      bonusDark = Math.round(this.maxLootDark * 1.35);
      bonusGems = 10; // 10 Free Gems bonus for 100% demolition!
      trophiesEarned = (this.baseDef.trophiesWin || 30) + 10;
      game.trophies += trophiesEarned;
      game.gems += bonusGems;
    } else if (this.stars > 0) {
      bonusYen = Math.round(bonusYen * 1.15);
      bonusRespect = Math.round(bonusRespect * 1.15);
      bonusDark = Math.round(bonusDark * 1.15);
      trophiesEarned = (this.baseDef.trophiesWin || 25);
      game.trophies += trophiesEarned;
    } else {
      trophiesEarned = -(this.baseDef.trophiesLoss || 15);
      game.trophies = Math.max(0, game.trophies + trophiesEarned);
    }

    game.yen = Math.min(game.maxYen, game.yen + bonusYen);
    game.respect = Math.min(game.maxRespect, game.respect + bonusRespect);
    game.darkElixir = Math.min(game.maxDarkElixir, game.darkElixir + bonusDark);
    game.saveState();

    window.soundEngine.playVictory();

    const modal = document.getElementById('raid-victory-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }

    const vTitle = document.getElementById('victory-title');
    if (this.damagePct >= 100) {
      vTitle.textContent = '👑 ¡100% ANIQUILACIÓN PERFECTA!';
    } else if (this.stars > 0) {
      vTitle.textContent = '¡VICTORIA DELINCUENTE!';
    } else {
      vTitle.textContent = 'ASALTO FALLIDO';
    }

    document.getElementById('victory-pct').textContent = `${this.damagePct}%`;
    document.getElementById('victory-yen').textContent = `+¥ ${bonusYen.toLocaleString()}`;
    document.getElementById('victory-respect').textContent = `+${bonusRespect.toLocaleString()} 🔥`;
    
    const vDark = document.getElementById('victory-dark');
    if (vDark) vDark.textContent = `+${bonusDark.toLocaleString()} 🧪`;
    const vGems = document.getElementById('victory-gems');
    if (vGems) vGems.textContent = bonusGems > 0 ? `+${bonusGems} 💎` : '0 💎';
    const vTrophies = document.getElementById('victory-trophies');
    if (vTrophies) vTrophies.textContent = trophiesEarned >= 0 ? `+${trophiesEarned} 🏆` : `${trophiesEarned} 🏆`;

    for (let i = 1; i <= 3; i++) {
      const star = document.getElementById(`v-star-${i}`);
      if (star) {
        if (i <= this.stars) star.classList.add('active');
        else star.classList.remove('active');
      }
    }

    // Auto-return countdown (3s) to return automatically to lobby / base!
    let countdown = 3;
    const countdownEl = document.getElementById('auto-return-countdown');
    if (countdownEl) countdownEl.textContent = `(${countdown}s)`;

    if (this.autoReturnTimer) clearInterval(this.autoReturnTimer);
    this.autoReturnTimer = setInterval(() => {
      countdown--;
      if (countdownEl) countdownEl.textContent = `(${countdown}s)`;
      if (countdown <= 0) {
        clearInterval(this.autoReturnTimer);
        this.autoReturnTimer = null;
        returnHome();
      }
    }, 1000);
  }
}

// ==========================================================================
// REAL-TIME VILLAGE DEFENSE ENGINE (CLASH OF CLANS TOWER DEFENSE SIMULATOR)
// ==========================================================================

class DefenseSession {
  constructor(playerBuildings) {
    this.totalWaves = 3;
    this.currentWave = 1;
    this.isOver = false;
    this.waveSpawned = false;

    // Clone player base buildings
    this.buildings = playerBuildings.map((b, idx) => {
      const template = BUILDING_TYPES[b.type];
      const maxHp = (template ? template.hp : 500) * (b.level || 1);
      return {
        id: 'def_bldg_' + idx,
        type: b.type,
        x: b.x,
        y: b.y,
        level: b.level || 1,
        maxHp: maxHp,
        currentHp: maxHp,
        destroyed: false,
        lastShot: 0
      };
    });

    this.enemies = [];
    this.alliedTroops = [];
    this.projectiles = [];
    this.particles = [];

    // Clan Castle reinforcement troops spawn
    const cc = this.buildings.find(b => b.type === 'clan_castle' && !b.destroyed);
    if (cc && (game.clanTroops || 0) > 0) {
      for (let i = 0; i < game.clanTroops; i++) {
        this.alliedTroops.push({
          id: 'clan_def_' + i,
          type: i === 0 ? 'biker' : 'brawler',
          name: i === 0 ? 'Motorista Aliado' : 'Bárbaro del Clan',
          icon: i === 0 ? '🏍️' : '🏏',
          x: cc.x + 1 + (Math.random() - 0.5),
          y: cc.y + 1 + (Math.random() - 0.5),
          hp: i === 0 ? 340 : 120,
          maxHp: i === 0 ? 340 : 120,
          dps: i === 0 ? 42 : 28,
          speed: 1.8,
          range: 0.9,
          lastAttack: 0,
          target: null
        });
      }
    }

    // Hero Ren Altar Defender
    const altar = this.buildings.find(b => b.type === 'hero_altar' && !b.destroyed);
    if (altar) {
      this.alliedTroops.push({
        id: 'def_hero_ren',
        type: 'hero_ren',
        name: 'Ren Kazuma (Defensor)',
        icon: '👑',
        x: altar.x + 1,
        y: altar.y + 1,
        hp: HERO_REN.hp,
        maxHp: HERO_REN.maxHp,
        dps: HERO_REN.dps,
        speed: HERO_REN.speed,
        range: 1.0,
        lastAttack: 0,
        isHero: true,
        target: null
      });
    }

    this.startWave(1);
  }

  startWave(waveNum) {
    this.currentWave = waveNum;
    this.waveSpawned = true;
    window.soundEngine.playBattleHorn();
    const titleEl = document.getElementById('defense-wave-title');
    if (titleEl) titleEl.textContent = `🛡️ ASEDIO A TU ALDEA: OLEADA ${waveNum}/3`;

    const waveEnemies = [];
    if (waveNum === 1) {
      for (let i = 0; i < 8; i++) waveEnemies.push({ type: 'brawler', side: i % 4 });
      for (let i = 0; i < 4; i++) waveEnemies.push({ type: 'archer', side: (i + 1) % 4 });
      for (let i = 0; i < 2; i++) waveEnemies.push({ type: 'goblin', side: (i + 2) % 4 });
    } else if (waveNum === 2) {
      for (let i = 0; i < 2; i++) waveEnemies.push({ type: 'tank', side: 0 });
      for (let i = 0; i < 6; i++) waveEnemies.push({ type: 'brawler', side: i % 4 });
      for (let i = 0; i < 4; i++) waveEnemies.push({ type: 'molotov', side: (i + 1) % 4 });
      for (let i = 0; i < 2; i++) waveEnemies.push({ type: 'demolisher', side: 2 });
    } else {
      waveEnemies.push({ type: 'dragon', side: 1 });
      for (let i = 0; i < 3; i++) waveEnemies.push({ type: 'biker', side: i % 4 });
      for (let i = 0; i < 3; i++) waveEnemies.push({ type: 'wizard', side: (i + 1) % 4 });
      for (let i = 0; i < 2; i++) waveEnemies.push({ type: 'tank', side: 3 });
      for (let i = 0; i < 8; i++) waveEnemies.push({ type: 'brawler', side: i % 4 });
    }

    waveEnemies.forEach((eDef, idx) => {
      setTimeout(() => {
        if (this.isOver) return;
        let sx, sy;
        if (eDef.side === 0) { sx = 1 + Math.random() * (GRID_SIZE - 2); sy = 0.5; }
        else if (eDef.side === 1) { sx = GRID_SIZE - 0.5; sy = 1 + Math.random() * (GRID_SIZE - 2); }
        else if (eDef.side === 2) { sx = 1 + Math.random() * (GRID_SIZE - 2); sy = GRID_SIZE - 0.5; }
        else { sx = 0.5; sy = 1 + Math.random() * (GRID_SIZE - 2); }

        const tDef = TROOP_TYPES[eDef.type];
        if (!tDef) return;
        this.enemies.push({
          id: 'invader_' + waveNum + '_' + idx,
          type: eDef.type,
          name: 'Invasor ' + tDef.name,
          icon: tDef.icon,
          x: sx,
          y: sy,
          hp: tDef.hp,
          maxHp: tDef.hp,
          dps: tDef.dps,
          speed: tDef.speed,
          targetPriority: tDef.targetPriority,
          range: tDef.range || 0.8,
          isFlying: tDef.isFlying || false,
          jumpsWalls: tDef.jumpsWalls || false,
          isSplash: tDef.isSplash || false,
          lastAttack: 0,
          target: null
        });
      }, idx * 350);
    });
  }

  updateDefense() {
    if (this.isOver) return;
    const now = Date.now();

    // 1. Update Enemies
    this.enemies.forEach(e => {
      if (e.hp <= 0) return;
      if (!e.target || e.target.destroyed) {
        e.target = this.findBestTargetForEnemy(e);
      }
      if (!e.target) return;

      const targetDef = BUILDING_TYPES[e.target.type];
      const tw = targetDef ? targetDef.w : 1;
      const th = targetDef ? targetDef.h : 1;
      const targetCenterX = e.target.x + tw / 2;
      const targetCenterY = e.target.y + th / 2;

      const dx = targetCenterX - e.x;
      const dy = targetCenterY - e.y;
      const dist = Math.hypot(dx, dy);

      if (dist > e.range) {
        const step = e.speed * 0.035;
        e.x += (dx / dist) * step;
        e.y += (dy / dist) * step;
        this.checkTrapsUnderEnemy(e);
      } else {
        if (now - e.lastAttack > 950) {
          e.lastAttack = now;
          e.target.currentHp -= e.dps;
          window.soundEngine.playPunch();
          game.addFloatingText(`-${Math.round(e.dps)}`, e.target.x + tw / 2, e.target.y + th / 2, '#ef4444');

          if (e.target.currentHp <= 0 && !e.target.destroyed) {
            e.target.destroyed = true;
            window.soundEngine.playExplosion();
          }

          if (e.type === 'demolisher' && e.target.type === 'wall') {
            e.hp = 0;
            window.soundEngine.playExplosion();
          }
        }
      }
    });
    this.enemies = this.enemies.filter(e => e.hp > 0);

    // 2. Update Allied Troops (Clan castle + Hero Ren)
    this.alliedTroops.forEach(ally => {
      if (ally.hp <= 0) return;
      if (!ally.target || ally.target.hp <= 0) {
        ally.target = this.findNearestEnemy(ally.x, ally.y, 8);
      }
      if (!ally.target) return;

      const dx = ally.target.x - ally.x;
      const dy = ally.target.y - ally.y;
      const dist = Math.hypot(dx, dy);

      if (dist > ally.range) {
        const step = ally.speed * 0.035;
        ally.x += (dx / dist) * step;
        ally.y += (dy / dist) * step;
      } else {
        if (now - ally.lastAttack > 900) {
          ally.lastAttack = now;
          ally.target.hp -= ally.dps;
          window.soundEngine.playPunch();
          game.addFloatingText(`-${Math.round(ally.dps)}`, ally.target.x, ally.target.y, '#fbbf24');
        }
      }
    });
    this.alliedTroops = this.alliedTroops.filter(a => a.hp > 0);

    // 3. Defensive Buildings AI
    this.buildings.forEach(b => {
      if (b.destroyed) return;

      if (b.type === 'cannon') {
        const range = 5.2;
        const target = this.findNearestEnemy(b.x + 1, b.y + 1, range, false);
        if (target && now - b.lastShot > 850) {
          b.lastShot = now;
          window.soundEngine.playShoot();
          this.projectiles.push({
            startX: b.x + 1, startY: b.y + 1,
            x: b.x + 1, y: b.y + 1,
            targetEnemy: target,
            speed: 0.22,
            damage: 32 * b.level
          });
        }
      } else if (b.type === 'watchtower') {
        const range = 6.2;
        const target = this.findNearestEnemy(b.x + 1, b.y + 1, range, true);
        if (target && now - b.lastShot > 950) {
          b.lastShot = now;
          window.soundEngine.playArrowShoot();
          this.projectiles.push({
            startX: b.x + 1, startY: b.y + 1,
            x: b.x + 1, y: b.y + 1,
            targetEnemy: target,
            isArrow: true,
            speed: 0.26,
            damage: 28 * b.level
          });
        }
      } else if (b.type === 'wizard_tower') {
        const range = 4.8;
        const target = this.findNearestEnemy(b.x + 1, b.y + 1, range, true);
        if (target && now - b.lastShot > 1400) {
          b.lastShot = now;
          window.soundEngine.playMagicFireball();
          this.projectiles.push({
            startX: b.x + 1, startY: b.y + 1,
            x: b.x + 1, y: b.y + 1,
            targetX: target.x,
            targetY: target.y,
            isSplash: true,
            speed: 0.16,
            damage: 42 * b.level
          });
        }
      } else if (b.type === 'mortar') {
        const range = 7.5;
        const target = this.findNearestEnemy(b.x + 1, b.y + 1, range, false);
        if (target && now - b.lastShot > 3200) {
          b.lastShot = now;
          window.soundEngine.playShoot();
          this.projectiles.push({
            startX: b.x + 1, startY: b.y + 1,
            x: b.x + 1, y: b.y + 1,
            targetX: target.x,
            targetY: target.y,
            isSplash: true,
            speed: 0.08,
            damage: 40 * b.level
          });
        }
      } else if (b.type === 'air_defense') {
        const range = 7.2;
        const airTarget = this.enemies.find(e => e.hp > 0 && e.isFlying && Math.hypot(e.x - (b.x + 1), e.y - (b.y + 1)) <= range);
        if (airTarget && now - b.lastShot > 1000) {
          b.lastShot = now;
          window.soundEngine.playHeavyHit();
          this.projectiles.push({
            startX: b.x + 1, startY: b.y + 1,
            x: b.x + 1, y: b.y + 1,
            targetEnemy: airTarget,
            speed: 0.32,
            damage: 85 * b.level
          });
        }
      }
    });

    // 4. Update Projectiles
    this.projectiles.forEach(p => {
      if (p.isSplash) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.25) {
          window.soundEngine.playExplosion();
          this.enemies.forEach(e => {
            if (Math.hypot(e.x - p.targetX, e.y - p.targetY) < 2.0) {
              e.hp -= p.damage;
              game.addFloatingText(`-${Math.round(p.damage)}`, e.x, e.y, '#f59e0b');
            }
          });
          p.dead = true;
        } else {
          p.x += (dx / dist) * p.speed;
          p.y += (dy / dist) * p.speed;
        }
      } else {
        if (!p.targetEnemy || p.targetEnemy.hp <= 0) {
          p.dead = true;
          return;
        }
        const dx = p.targetEnemy.x - p.x;
        const dy = p.targetEnemy.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 0.25) {
          p.targetEnemy.hp -= p.damage;
          game.addFloatingText(`-${Math.round(p.damage)}`, p.targetEnemy.x, p.targetEnemy.y, '#f59e0b');
          p.dead = true;
        } else {
          p.x += (dx / dist) * p.speed;
          p.y += (dy / dist) * p.speed;
        }
      }
    });
    this.projectiles = this.projectiles.filter(p => !p.dead);

    // 5. Update HUD and Check Wave Advancement
    this.updateDefenseHud();

    const livingHp = this.buildings.reduce((sum, b) => sum + (b.destroyed ? 0 : b.currentHp), 0);
    const totalMaxHp = this.buildings.reduce((sum, b) => sum + b.maxHp, 1);
    const integrityPct = Math.round((livingHp / totalMaxHp) * 100);

    const hq = this.buildings.find(b => b.type === 'hq');
    if (hq && hq.destroyed) {
      this.endDefense(false);
      return;
    }

    if (this.enemies.length === 0 && this.waveSpawned) {
      if (this.currentWave < this.totalWaves) {
        this.waveSpawned = false;
        showToast(`✨ ¡Oleada ${this.currentWave} rechazada con éxito! Siguiente oleada en camino...`);
        setTimeout(() => {
          if (!this.isOver) this.startWave(this.currentWave + 1);
        }, 3200);
      } else {
        this.endDefense(true);
      }
    }
  }

  checkTrapsUnderEnemy(e) {
    this.buildings.forEach(b => {
      if (b.destroyed) return;
      const d = Math.hypot(e.x - b.x, e.y - b.y);
      if (b.type === 'spring_trap' && d < 0.75) {
        b.destroyed = true;
        window.soundEngine.playSpringTrap();
        e.hp = 0;
        game.addFloatingText('🌀 TRAMPA!', e.x, e.y, '#38bdf8');
      } else if (b.type === 'bomb' && d < 0.9) {
        b.destroyed = true;
        window.soundEngine.playExplosion();
        this.enemies.forEach(other => {
          if (Math.hypot(other.x - b.x, other.y - b.y) < 2.0) {
            other.hp -= 160;
            game.addFloatingText('-160', other.x, other.y, '#ef4444');
          }
        });
      }
    });
  }

  findBestTargetForEnemy(e) {
    const living = this.buildings.filter(b => !b.destroyed && b.type !== 'spring_trap' && b.type !== 'bomb');
    if (living.length === 0) return null;

    if (e.targetPriority === 'defenses') {
      const defenses = living.filter(b => b.type === 'watchtower' || b.type === 'mortar' || b.type === 'cannon' || b.type === 'wizard_tower' || b.type === 'air_defense');
      if (defenses.length > 0) return this.getClosestBuilding(e.x, e.y, defenses);
    } else if (e.targetPriority === 'resources') {
      const resources = living.filter(b => b.type === 'ramen' || b.type === 'dojo' || b.type === 'vault' || b.type === 'dark_drill' || b.type === 'dark_vault');
      if (resources.length > 0) return this.getClosestBuilding(e.x, e.y, resources);
    } else if (e.targetPriority === 'walls') {
      const walls = living.filter(b => b.type === 'wall');
      if (walls.length > 0) return this.getClosestBuilding(e.x, e.y, walls);
    }
    return this.getClosestBuilding(e.x, e.y, living);
  }

  getClosestBuilding(x, y, list) {
    let closest = list[0];
    let minDist = Infinity;
    list.forEach(b => {
      const dist = Math.hypot(b.x - x, b.y - y);
      if (dist < minDist) {
        minDist = dist;
        closest = b;
      }
    });
    return closest;
  }

  findNearestEnemy(x, y, maxRange, canTargetAir = true) {
    let nearest = null;
    let minDist = maxRange;
    this.enemies.forEach(e => {
      if (e.hp > 0 && (canTargetAir || !e.isFlying)) {
        const dist = Math.hypot(e.x - x, e.y - y);
        if (dist < minDist) {
          minDist = dist;
          nearest = e;
        }
      }
    });
    return nearest;
  }

  updateDefenseHud() {
    const livingHp = this.buildings.reduce((sum, b) => sum + (b.destroyed ? 0 : b.currentHp), 0);
    const totalMaxHp = this.buildings.reduce((sum, b) => sum + b.maxHp, 1);
    const integrityPct = Math.round((livingHp / totalMaxHp) * 100);

    const hpEl = document.getElementById('defense-village-hp');
    if (hpEl) hpEl.textContent = `${integrityPct}%`;

    const countEl = document.getElementById('defense-enemies-count');
    if (countEl) countEl.textContent = this.enemies.length;
  }

  renderDefense(ctx) {
    this.updateDefense();

    // Render Enemies
    this.enemies.forEach(e => {
      const pt = gridToScreen(e.x, e.y);
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath();
      ctx.ellipse(pt.x, pt.y + 4, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = e.isFlying ? '28px sans-serif' : '20px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const drawY = e.isFlying ? pt.y - 24 : pt.y - 12;
      ctx.fillText(e.icon, pt.x, drawY);

      const hpPct = Math.max(0, e.hp / e.maxHp);
      ctx.fillStyle = '#000';
      ctx.fillRect(pt.x - 12, drawY - 14, 24, 4);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(pt.x - 11, drawY - 13, 22 * hpPct, 2);
    });

    // Render Allies
    this.alliedTroops.forEach(a => {
      const pt = gridToScreen(a.x, a.y);
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath();
      ctx.ellipse(pt.x, pt.y + 4, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = a.isHero ? '28px sans-serif' : '20px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(a.icon, pt.x, pt.y - 12);

      const hpPct = Math.max(0, a.hp / a.maxHp);
      ctx.fillStyle = '#000';
      ctx.fillRect(pt.x - 12, pt.y - 26, 24, 4);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(pt.x - 11, pt.y - 25, 22 * hpPct, 2);
    });

    // Render Projectiles
    this.projectiles.forEach(p => {
      const pt = gridToScreen(p.x, p.y);
      ctx.fillStyle = p.isSplash ? '#f97316' : (p.isArrow ? '#38bdf8' : '#f59e0b');
      ctx.beginPath();
      ctx.arc(pt.x, pt.y - 15, p.isSplash ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  endDefense(isVictory) {
    if (this.isOver) return;
    this.isOver = true;

    const livingHp = this.buildings.reduce((sum, b) => sum + (b.destroyed ? 0 : b.currentHp), 0);
    const totalMaxHp = this.buildings.reduce((sum, b) => sum + b.maxHp, 1);
    const integrityPct = Math.round((livingHp / totalMaxHp) * 100);

    const gemsReward = isVictory ? 25 : 5;
    const trophiesReward = isVictory ? 30 : -12;
    const yenReward = isVictory ? 4500 : 800;

    game.gems += gemsReward;
    game.trophies = Math.max(0, game.trophies + trophiesReward);
    game.yen = Math.min(game.maxYen, game.yen + yenReward);
    game.saveState();

    if (isVictory) window.soundEngine.playVictory();
    else window.soundEngine.playHeavyHit();

    const modal = document.getElementById('defense-victory-modal');
    if (modal) {
      document.getElementById('defense-victory-title').textContent = isVictory ? '¡ALDEA INVICTA!' : 'DEFENSA ROTA';
      document.getElementById('defense-result-pct').textContent = `${integrityPct}%`;
      document.getElementById('defense-result-gems').textContent = `+${gemsReward} 💎`;
      document.getElementById('defense-result-trophies').textContent = `${trophiesReward >= 0 ? '+' : ''}${trophiesReward} 🏆`;
      modal.classList.remove('hidden');
    }
  }
}

// ==========================================================================
// UI & EVENT HANDLERS
// ==========================================================================

function updateUI() {
  document.getElementById('res-yen-val').textContent = `${game.yen.toLocaleString()} / ${game.maxYen.toLocaleString()}`;
  document.getElementById('res-yen-bar').style.width = `${Math.min(100, (game.yen / game.maxYen) * 100)}%`;

  document.getElementById('res-respect-val').textContent = `${game.respect.toLocaleString()} / ${game.maxRespect.toLocaleString()}`;
  document.getElementById('res-respect-bar').style.width = `${Math.min(100, (game.respect / game.maxRespect) * 100)}%`;

  const darkValEl = document.getElementById('res-dark-val');
  if (darkValEl) darkValEl.textContent = `${game.darkElixir.toLocaleString()} / ${game.maxDarkElixir.toLocaleString()}`;
  const darkBarEl = document.getElementById('res-dark-bar');
  if (darkBarEl) darkBarEl.style.width = `${Math.min(100, (game.darkElixir / game.maxDarkElixir) * 100)}%`;

  document.getElementById('builder-count').textContent = `${game.freeBuilders}/${game.builders}`;
  document.getElementById('army-capacity-count').textContent = `${game.getArmyCount()}/${game.getArmyCapacity()}`;
  document.getElementById('btn-sub-trained').textContent = `${game.getArmyCount()}/${game.getArmyCapacity()} Tropas`;
  document.getElementById('gems-count').textContent = game.gems;
  document.getElementById('hq-level-indicator').textContent = `SEDE NIVEL ${game.getHqLevel()}`;
}

// ==========================================================================
// MODE SWITCHERS (BASE vs RAID vs DEFENSE)
// ==========================================================================

function switchToBaseMode() {
  game.mode = 'base';
  if (game.currentRaid && game.currentRaid.autoReturnTimer) {
    clearInterval(game.currentRaid.autoReturnTimer);
    game.currentRaid.autoReturnTimer = null;
  }
  game.currentRaid = null;
  game.currentDefense = null;
  game.selectedDeployTroop = null;
  game.selectedDeploySpell = null;

  // Forcibly hide combat/defense overlays via both class and inline style
  const raidTop = document.getElementById('raid-top-hud');
  if (raidTop) {
    raidTop.classList.add('hidden');
    raidTop.style.display = 'none';
  }
  const defTop = document.getElementById('defense-top-hud');
  if (defTop) {
    defTop.classList.add('hidden');
    defTop.style.display = 'none';
  }
  const raidBtm = document.getElementById('bottom-hud-raid');
  if (raidBtm) {
    raidBtm.classList.add('hidden');
    raidBtm.style.display = 'none';
  }
  const deployHint = document.getElementById('deployment-hint');
  if (deployHint) {
    deployHint.classList.add('hidden');
    deployHint.style.display = 'none';
  }
  const combatVig = document.getElementById('combat-vignette');
  if (combatVig) combatVig.classList.add('hidden');
  const defVig = document.getElementById('defense-vignette');
  if (defVig) defVig.classList.add('hidden');

  const heroBtn = document.getElementById('hero-ability-button-wrap');
  if (heroBtn) {
    heroBtn.classList.add('hidden');
    heroBtn.style.display = 'none';
  }

  const raidVic = document.getElementById('raid-victory-modal');
  if (raidVic) {
    raidVic.classList.add('hidden');
    raidVic.style.display = 'none';
  }
  const defVic = document.getElementById('defense-victory-modal');
  if (defVic) {
    defVic.classList.add('hidden');
    defVic.style.display = 'none';
  }

  // Reveal base HUDs
  const topRes = document.getElementById('top-resource-bar');
  if (topRes) {
    topRes.classList.remove('hidden');
    topRes.style.display = 'flex';
  }
  const btmBase = document.getElementById('bottom-hud-base');
  if (btmBase) {
    btmBase.classList.remove('hidden');
    btmBase.style.display = 'flex';
  }

  window.soundEngine.playPeaceChime();
  updateUI();
  showToast('🛡️ De vuelta en tu barrio: Defensas activas y producción en paz.');
}

function switchToRaidMode(baseDef) {
  if (game.getArmyCount() === 0) {
    showToast('⚠️ ¡No tienes tropas entrenadas! Entrena a tu banda en el Barracón.');
    return;
  }

  document.getElementById('war-map-modal').classList.add('hidden');
  game.mode = 'raid';
  game.currentRaid = new RaidSession(baseDef);

  // Switch HUDs - hide base with both class and style
  const topRes = document.getElementById('top-resource-bar');
  if (topRes) {
    topRes.classList.add('hidden');
    topRes.style.display = 'none';
  }
  const btmBase = document.getElementById('bottom-hud-base');
  if (btmBase) {
    btmBase.classList.add('hidden');
    btmBase.style.display = 'none';
  }
  const defTop = document.getElementById('defense-top-hud');
  if (defTop) {
    defTop.classList.add('hidden');
    defTop.style.display = 'none';
  }
  const defVig = document.getElementById('defense-vignette');
  if (defVig) defVig.classList.add('hidden');
  closeContextDock();

  // Show raid HUDs
  const raidTop = document.getElementById('raid-top-hud');
  if (raidTop) {
    raidTop.classList.remove('hidden');
    raidTop.style.display = 'flex';
  }
  const raidBtm = document.getElementById('bottom-hud-raid');
  if (raidBtm) {
    raidBtm.classList.remove('hidden');
    raidBtm.style.display = 'flex';
  }
  const deployHint = document.getElementById('deployment-hint');
  if (deployHint) {
    deployHint.classList.remove('hidden');
    deployHint.style.display = 'block';
  }
  const combatVig = document.getElementById('combat-vignette');
  if (combatVig) combatVig.classList.remove('hidden');

  document.getElementById('raid-target-title').textContent = `ASALTANDO: ${baseDef.name.toUpperCase()}`;

  renderTroopDeployDeck();
  window.soundEngine.playBattleHorn();
  showToast('⚔️ ¡MODO ASALTO ACTIVO! Toca una tropa abajo y haz clic en el perímetro rojo exterior.');
}

function switchToDefenseMode() {
  document.getElementById('shop-modal').classList.add('hidden');
  document.getElementById('barracks-modal').classList.add('hidden');
  document.getElementById('war-map-modal').classList.add('hidden');
  document.getElementById('clan-modal').classList.add('hidden');
  closeContextDock();

  game.mode = 'defense';
  game.currentDefense = new DefenseSession(game.buildings);

  // Switch HUDs
  document.getElementById('top-resource-bar').classList.add('hidden');
  document.getElementById('bottom-hud-base').classList.add('hidden');
  document.getElementById('raid-top-hud').classList.add('hidden');
  document.getElementById('bottom-hud-raid').classList.add('hidden');
  document.getElementById('deployment-hint').classList.add('hidden');
  document.getElementById('combat-vignette').classList.add('hidden');

  document.getElementById('defense-top-hud').classList.remove('hidden');
  document.getElementById('defense-vignette').classList.remove('hidden');

  window.soundEngine.playDefenseAlarm();
  showToast('🚨 ¡SIMULADOR DE DEFENSA DE ALDEA! Oleadas enemigas atacando tu base.');
}

// Render Shop Catalog
function renderShopCatalog(category = 'resources') {
  const container = document.getElementById('shop-catalog-container');
  if (!container) return;
  container.innerHTML = '';

  const hqLevel = game.getHqLevel();

  for (const [key, bldg] of Object.entries(BUILDING_TYPES)) {
    if (bldg.category === category) {
      const card = document.createElement('div');
      card.className = 'catalog-card';
      const canAfford = game.yen >= bldg.costYen && game.respect >= bldg.costRespect;
      const meetsHq = hqLevel >= bldg.reqHq;

      card.innerHTML = `
        <div class="catalog-header">
          <div class="catalog-icon">${bldg.icon}</div>
          <div>
            <h4 class="catalog-title">${bldg.name}</h4>
            <span class="catalog-price">${bldg.costYen > 0 ? `¥ ${bldg.costYen.toLocaleString()}` : `${bldg.costRespect} 🔥`}</span>
          </div>
        </div>
        <p class="catalog-desc">${bldg.desc}</p>
        <button class="btn btn-primary btn-block btn-buy-building" data-type="${key}" ${!canAfford || !meetsHq ? 'disabled' : ''}>
          ${!meetsHq ? `Requiere Sede Nv.${bldg.reqHq}` : `Colocar en Aldea`}
        </button>
      `;

      card.querySelector('.btn-buy-building').addEventListener('click', () => {
        startPlacement(key);
      });

      container.appendChild(card);
    }
  }
}

// Start Building Placement
function startPlacement(type) {
  const def = BUILDING_TYPES[type];
  if (!def) return;

  if (game.yen < def.costYen || game.respect < def.costRespect) {
    showToast('¡Fondos o Respeto insuficiente!');
    return;
  }

  document.getElementById('shop-modal').classList.add('hidden');
  window.soundEngine.playClick();

  game.placementBuilding = {
    type: type,
    x: 8,
    y: 8,
    level: 1,
    currentHp: def.hp,
    maxHp: def.hp
  };

  showToast('Haz clic en el mapa verde donde quieras colocar el nuevo edificio.');
}

// Render Barracks Training Modal (Tropas, Élite/Oscuro, Hechizos)
let currentBarracksTab = 'troops';

function renderBarracks(tab = currentBarracksTab) {
  currentBarracksTab = tab;
  const container = document.getElementById('troops-training-container');
  if (!container) return;
  container.innerHTML = '';

  document.getElementById('modal-army-capacity').textContent = `${game.getArmyCount()} / ${game.getArmyCapacity()}`;
  document.getElementById('modal-respect-balance').textContent = `${game.respect.toLocaleString()} 🔥`;
  const darkBalEl = document.getElementById('modal-dark-balance');
  if (darkBalEl) darkBalEl.textContent = `${game.darkElixir.toLocaleString()} 🧪`;

  if (tab === 'troops') {
    // Regular troops trained with Respect
    for (const [id, t] of Object.entries(TROOP_TYPES)) {
      if (t.category !== 'troops') continue;

      const card = document.createElement('div');
      card.className = 'train-card';
      const currentQty = game.army[id] || 0;
      const canTrain = game.respect >= t.costRespect && (game.getArmyCount() + t.housing) <= game.getArmyCapacity();

      card.innerHTML = `
        <div class="train-header">
          <span class="train-icon">${t.icon}</span>
          <div>
            <h4 class="train-name">${t.name} (x${currentQty})</h4>
            <div class="train-stats">
              <span>HP: ${t.hp} | DPS: ${t.dps} | Espacio: ${t.housing}</span>
            </div>
          </div>
        </div>
        <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.3;">${t.desc}</p>
        <div class="train-action-row">
          <span class="train-cost">${t.costRespect} 🔥</span>
          <button class="btn btn-gold btn-sm btn-train-troop" data-id="${id}" ${!canTrain ? 'disabled' : ''}>
            + Entrenar
          </button>
        </div>
      `;

      card.querySelector('.btn-train-troop').addEventListener('click', () => {
        trainTroop(id);
      });

      container.appendChild(card);
    }
  } else if (tab === 'dark') {
    // Dark Elixir troops (Wizard, Biker, Dragon)
    for (const [id, t] of Object.entries(TROOP_TYPES)) {
      if (t.category !== 'dark') continue;

      const card = document.createElement('div');
      card.className = 'train-card dark-elixir-card';
      const currentQty = game.army[id] || 0;
      const canTrain = game.darkElixir >= t.costDark && (game.getArmyCount() + t.housing) <= game.getArmyCapacity();

      card.innerHTML = `
        <div class="train-header">
          <span class="train-icon">${t.icon}</span>
          <div>
            <h4 class="train-name">${t.name} (x${currentQty})</h4>
            <div class="train-stats">
              <span>HP: ${t.hp} | DPS: ${t.dps} | Espacio: ${t.housing}</span>
            </div>
          </div>
        </div>
        <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.3;">${t.desc}</p>
        <div class="train-action-row">
          <span class="train-cost" style="color: #c084fc;">${t.costDark} 🧪</span>
          <button class="btn btn-purple btn-sm btn-train-dark-troop" data-id="${id}" ${!canTrain ? 'disabled' : ''}>
            + Reclutar Élite
          </button>
        </div>
      `;

      card.querySelector('.btn-train-dark-troop').addEventListener('click', () => {
        trainDarkTroop(id);
      });

      container.appendChild(card);
    }
  } else {
    // Spells tab
    for (const [id, s] of Object.entries(SPELL_TYPES)) {
      const card = document.createElement('div');
      card.className = 'train-card';
      const currentQty = game.spells[id] || 0;
      const canBrew = game.respect >= s.costRespect;

      card.innerHTML = `
        <div class="train-header">
          <span class="train-icon">${s.icon}</span>
          <div>
            <h4 class="train-name">${s.name} (x${currentQty})</h4>
            <div class="train-stats">
              <span>Coste: ${s.costRespect} 🔥</span>
            </div>
          </div>
        </div>
        <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.3;">${s.desc}</p>
        <div class="train-action-row">
          <span class="train-cost">${s.costRespect} 🔥</span>
          <button class="btn btn-gold btn-sm btn-brew-spell" data-id="${id}" ${!canBrew ? 'disabled' : ''}>
            + Preparar Brebaje
          </button>
        </div>
      `;

      card.querySelector('.btn-brew-spell').addEventListener('click', () => {
        brewSpell(id);
      });

      container.appendChild(card);
    }
  }
}

function trainTroop(id) {
  const t = TROOP_TYPES[id];
  if (!t) return;
  if (game.respect < t.costRespect) {
    showToast('¡No tienes suficiente Respeto 🔥!');
    return;
  }
  if (game.getArmyCount() + t.housing > game.getArmyCapacity()) {
    showToast('¡Campamentos llenos! Construye o mejora más campamentos.');
    return;
  }

  game.respect -= t.costRespect;
  game.army[id] = (game.army[id] || 0) + 1;
  window.soundEngine.playCoinCollect();
  game.saveState();
  updateUI();
  renderBarracks('troops');
}

function trainDarkTroop(id) {
  const t = TROOP_TYPES[id];
  if (!t) return;
  if (game.darkElixir < t.costDark) {
    showToast('¡No tienes suficiente Esencia Sombría 🧪!');
    return;
  }
  if (game.getArmyCount() + t.housing > game.getArmyCapacity()) {
    showToast('¡Campamentos llenos! Construye o mejora más campamentos.');
    return;
  }

  game.darkElixir -= t.costDark;
  game.army[id] = (game.army[id] || 0) + 1;
  window.soundEngine.playCoinCollect();
  game.saveState();
  updateUI();
  renderBarracks('dark');
}

function brewSpell(id) {
  const s = SPELL_TYPES[id];
  if (!s) return;
  if (game.respect < s.costRespect) {
    showToast('¡No tienes suficiente Respeto 🔥 para preparar este hechizo!');
    return;
  }

  game.respect -= s.costRespect;
  game.spells[id] = (game.spells[id] || 0) + 1;
  window.soundEngine.playSpellCast();
  showToast(`🧪 ¡Brebaje preparado: ${s.name}!`);
  game.saveState();
  updateUI();
  renderBarracks('spells');
}

// Render War Map (Campaign & Multiplayer Rival Search)
function renderWarMap() {
  const container = document.getElementById('rival-bases-container');
  if (container) {
    container.innerHTML = '';
    RIVAL_BASES.forEach(base => {
      const card = document.createElement('div');
      card.className = 'rival-base-card';
      card.innerHTML = `
        <div class="rival-meta">
          <h4>${base.name}</h4>
          <span>${base.gang}</span>
          <div class="rival-loot-preview">
            Botín: <strong>¥ ${base.lootYen.toLocaleString()}</strong> | <strong>${base.lootRespect.toLocaleString()} 🔥</strong> | <strong>${(base.lootDark || 200).toLocaleString()} 🧪</strong>
          </div>
        </div>
        <button class="btn btn-danger btn-launch-raid" data-id="${base.id}">
          <span>⚔️</span> Asaltar Base
        </button>
      `;

      card.querySelector('.btn-launch-raid').addEventListener('click', () => {
        switchToRaidMode(base);
      });

      container.appendChild(card);
    });
  }

  renderMultiplayerPanel();
}

function renderMultiplayerPanel() {
  if (!game.multiplayerTarget) {
    game.generateMultiplayerTarget();
  }
  const t = game.multiplayerTarget;

  const crestEl = document.getElementById('mp-target-crest');
  if (crestEl) crestEl.textContent = t.crest || '🏯';
  const nameEl = document.getElementById('mp-target-name');
  if (nameEl) nameEl.textContent = t.name;
  const gangEl = document.getElementById('mp-target-gang');
  if (gangEl) gangEl.textContent = t.gang;
  const yenEl = document.getElementById('mp-target-yen');
  if (yenEl) yenEl.textContent = `¥ ${t.lootYen.toLocaleString()}`;
  const respEl = document.getElementById('mp-target-respect');
  if (respEl) respEl.textContent = `${t.lootRespect.toLocaleString()} 🔥`;
  const tropEl = document.getElementById('mp-target-trophies');
  if (tropEl) tropEl.textContent = `+${t.trophiesWin} 🏆 / -${t.trophiesLoss} 🏆`;
}

// Render Troop & Spell Deployment Deck during Raid
function renderTroopDeployDeck() {
  const container = document.getElementById('troop-deploy-container');
  if (!container || !game.currentRaid) return;
  container.innerHTML = '';

  // 1. Hero Ren Card (If not yet deployed)
  if (!game.currentRaid.heroRen) {
    const heroCard = document.createElement('div');
    heroCard.className = `troop-card-deploy hero-card ${game.selectedDeployTroop === 'hero_ren' ? 'selected' : ''}`;
    heroCard.innerHTML = `
      <span class="troop-count-badge">HÉROE</span>
      <span class="troop-deploy-icon">👑</span>
      <span class="troop-deploy-name">Ren Kazuma</span>
    `;
    heroCard.addEventListener('click', () => {
      game.selectedDeployTroop = 'hero_ren';
      game.selectedDeploySpell = null;
      window.soundEngine.playClick();
      renderTroopDeployDeck();
    });
    container.appendChild(heroCard);
  }

  // 2. Regular & Dark Troops
  for (const [id, qty] of Object.entries(game.army)) {
    const t = TROOP_TYPES[id];
    if (!t) continue;

    const card = document.createElement('div');
    card.className = `troop-card-deploy ${qty === 0 ? 'empty' : ''} ${game.selectedDeployTroop === id ? 'selected' : ''}`;

    card.innerHTML = `
      <span class="troop-count-badge">x${qty}</span>
      <span class="troop-deploy-icon">${t.icon}</span>
      <span class="troop-deploy-name">${t.name}</span>
    `;

    card.addEventListener('click', () => {
      if (qty > 0) {
        game.selectedDeployTroop = id;
        game.selectedDeploySpell = null;
        window.soundEngine.playClick();
        renderTroopDeployDeck();
      }
    });

    container.appendChild(card);
  }

  // 3. Divider
  const div = document.createElement('div');
  div.className = 'spell-divider';
  container.appendChild(div);

  // 4. Spells Deck
  for (const [id, qty] of Object.entries(game.spells)) {
    const s = SPELL_TYPES[id];
    if (!s) continue;

    const card = document.createElement('div');
    card.className = `spell-card-deploy ${qty === 0 ? 'empty' : ''} ${game.selectedDeploySpell === id ? 'selected' : ''}`;

    card.innerHTML = `
      <span class="spell-count">x${qty}</span>
      <span class="spell-icon">${s.icon}</span>
      <span class="spell-name">${s.name}</span>
    `;

    card.addEventListener('click', () => {
      if (qty > 0) {
        game.selectedDeploySpell = id;
        game.selectedDeployTroop = null;
        window.soundEngine.playClick();
        renderTroopDeployDeck();
        showToast(`🧪 ¡${s.name} seleccionado! Haz clic en cualquier lugar del mapa para lanzarlo.`);
      }
    });

    container.appendChild(card);
  }
}

// Return Home from Raid or Defense
function returnHome() {
  if (game.currentRaid && game.currentRaid.autoReturnTimer) {
    clearInterval(game.currentRaid.autoReturnTimer);
    game.currentRaid.autoReturnTimer = null;
  }
  const modal = document.getElementById('raid-victory-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
  const defModal = document.getElementById('defense-victory-modal');
  if (defModal) {
    defModal.classList.add('hidden');
    defModal.style.display = 'none';
  }
  switchToBaseMode();
  showToast('🏰 ¡De vuelta en la Aldea de RAYTON! Botín y trofeos acreditados en tus almacenes.');
}

// ==========================================================================
// CONTEXTUAL BUILDING DOCK (CLASH OF CLANS BOTTOM DOCK)
// ==========================================================================

function openBuildingContextDock(bldg) {
  game.selectedBuilding = bldg;
  game.selectedObstacle = null;
  const def = BUILDING_TYPES[bldg.type];
  if (!def) return;

  const dock = document.getElementById('building-context-dock');
  document.getElementById('ctx-bldg-icon').textContent = def.icon;
  document.getElementById('ctx-bldg-name').textContent = def.name;
  document.getElementById('ctx-bldg-level').textContent = `Nivel ${bldg.level || 1}`;

  const upgradeCost = (bldg.level || 1) * 900;
  document.getElementById('ctx-upgrade-label').textContent = `Mejorar (¥ ${upgradeCost.toLocaleString()})`;

  const collectBtn = document.getElementById('btn-ctx-collect');
  const trainBtn = document.getElementById('btn-ctx-train');
  const spellsBtn = document.getElementById('btn-ctx-spells');
  const clearBtn = document.getElementById('btn-ctx-clear');

  if (collectBtn) {
    if (bldg.stored && bldg.stored > 20) collectBtn.classList.remove('hidden');
    else collectBtn.classList.add('hidden');
  }

  if (trainBtn) {
    if (bldg.type === 'barracks' || bldg.type === 'camp') trainBtn.classList.remove('hidden');
    else trainBtn.classList.add('hidden');
  }

  if (spellsBtn) {
    if (bldg.type === 'spell_factory') spellsBtn.classList.remove('hidden');
    else spellsBtn.classList.add('hidden');
  }

  if (clearBtn) clearBtn.classList.add('hidden');

  dock.classList.remove('hidden');
}

function openObstacleContextDock(obs) {
  game.selectedObstacle = obs;
  game.selectedBuilding = null;
  const def = OBSTACLE_TYPES[obs.type];
  if (!def) return;

  const dock = document.getElementById('building-context-dock');
  document.getElementById('ctx-bldg-icon').textContent = def.icon;
  document.getElementById('ctx-bldg-name').textContent = def.name;
  document.getElementById('ctx-bldg-level').textContent = `Recompensa: +${def.gemsMin}-${def.gemsMax} 💎 Gemas`;

  document.getElementById('btn-ctx-info').classList.add('hidden');
  document.getElementById('btn-ctx-upgrade').classList.add('hidden');
  document.getElementById('btn-ctx-move').classList.add('hidden');
  document.getElementById('btn-ctx-collect').classList.add('hidden');
  document.getElementById('btn-ctx-train').classList.add('hidden');
  document.getElementById('btn-ctx-spells').classList.add('hidden');

  const clearBtn = document.getElementById('btn-ctx-clear');
  if (clearBtn) {
    clearBtn.classList.remove('hidden');
    const costText = def.costYen > 0 ? `¥ ${def.costYen}` : `${def.costRespect} 🔥`;
    document.getElementById('ctx-clear-label').textContent = `Limpiar (${costText})`;
  }

  dock.classList.remove('hidden');
}

function closeContextDock() {
  game.selectedBuilding = null;
  game.selectedObstacle = null;
  const dock = document.getElementById('building-context-dock');
  if (dock) dock.classList.add('hidden');

  const infoBtn = document.getElementById('btn-ctx-info');
  const upBtn = document.getElementById('btn-ctx-upgrade');
  const moveBtn = document.getElementById('btn-ctx-move');
  if (infoBtn) infoBtn.classList.remove('hidden');
  if (upBtn) upBtn.classList.remove('hidden');
  if (moveBtn) moveBtn.classList.remove('hidden');
}

function openBuildingInfo(bldg) {
  game.selectedBuilding = bldg;
  const def = BUILDING_TYPES[bldg.type];
  if (!def) return;

  const modal = document.getElementById('building-info-modal');
  document.getElementById('info-bldg-name').textContent = def.name;
  document.getElementById('info-bldg-desc').textContent = def.desc;
  document.getElementById('info-bldg-icon').textContent = def.icon;
  document.getElementById('info-bldg-level').textContent = bldg.level || 1;
  document.getElementById('info-bldg-hp').textContent = `${bldg.currentHp} / ${bldg.maxHp}`;

  const upgradeCost = (bldg.level || 1) * 900;
  document.getElementById('upgrade-target-level').textContent = (bldg.level || 1) + 1;
  document.getElementById('upgrade-cost').textContent = `¥ ${upgradeCost.toLocaleString()}`;

  modal.classList.remove('hidden');
}

// ==========================================================================
// MOUSE & CANVAS CONTROLS (PAN, DRAG, PLACEMENT, DEPLOYMENT)
// ==========================================================================

canvas.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    game.isDragging = true;
    game.dragStartX = e.clientX;
    game.dragStartY = e.clientY;
  }
});

window.addEventListener('mousemove', (e) => {
  if (game.isDragging) {
    const dx = e.clientX - game.dragStartX;
    const dy = e.clientY - game.dragStartY;
    game.cameraX += dx;
    game.cameraY += dy;
    game.dragStartX = e.clientX;
    game.dragStartY = e.clientY;
  }
});

window.addEventListener('mouseup', (e) => {
  if (game.isDragging) {
    const moved = Math.hypot(e.clientX - game.dragStartX, e.clientY - game.dragStartY);
    game.isDragging = false;

    if (moved < 6) {
      handleCanvasClick(e.clientX, e.clientY);
    }
  }
});

function handleCanvasClick(screenX, screenY) {
  const rect = canvas.getBoundingClientRect();
  const clickX = screenX - rect.left;
  const clickY = screenY - rect.top;
  const { gx, gy } = screenToGrid(clickX, clickY);

  if (game.mode === 'raid') {
    if (game.selectedDeploySpell && (game.spells[game.selectedDeploySpell] || 0) > 0) {
      game.spells[game.selectedDeploySpell]--;
      game.currentRaid.castSpell(game.selectedDeploySpell, gx, gy);
      renderTroopDeployDeck();
      return;
    }

    if (game.selectedDeployTroop === 'hero_ren' && !game.currentRaid.heroRen) {
      const isPerimeter = gx <= 1 || gy <= 1 || gx >= GRID_SIZE - 2 || gy >= GRID_SIZE - 2;
      if (isPerimeter) {
        game.currentRaid.deployHero(gx, gy);
        game.selectedDeployTroop = null;
        renderTroopDeployDeck();
      } else {
        showToast('⚠️ ¡Despliega al Líder Ren en la zona perimetral roja exterior!');
      }
      return;
    }

    const isPerimeter = gx <= 1 || gy <= 1 || gx >= GRID_SIZE - 2 || gy >= GRID_SIZE - 2;
    if (isPerimeter && game.selectedDeployTroop && (game.army[game.selectedDeployTroop] || 0) > 0) {
      game.army[game.selectedDeployTroop]--;
      game.currentRaid.deployTroop(game.selectedDeployTroop, gx, gy);
      renderTroopDeployDeck();
    } else if (!isPerimeter && game.selectedDeployTroop) {
      showToast('⚠️ ¡Solo puedes desplegar a tus tropas en la zona perimetral roja exterior!');
    }
    return;
  }

  if (game.movingBuilding) {
    const m = game.movingBuilding;
    const def = BUILDING_TYPES[m.type];
    const w = def.w;
    const h = def.h;

    if (gx >= 1 && gy >= 1 && gx + w <= GRID_SIZE - 1 && gy + h <= GRID_SIZE - 1) {
      const collides = game.buildings.some(b => {
        if (b.id === m.id) return false;
        const bdef = BUILDING_TYPES[b.type];
        return !(gx + w <= b.x || gx >= b.x + bdef.w || gy + h <= b.y || gy >= b.y + bdef.h);
      });

      if (!collides) {
        m.x = gx;
        m.y = gy;
        game.movingBuilding = null;
        window.soundEngine.playBuildPlace();
        showToast('¡Edificio reubicado con éxito!');
        game.saveState();
        openBuildingContextDock(m);
        return;
      } else {
        showToast('¡Casilla ocupada! Elige un espacio libre.');
        return;
      }
    }
  }

  if (game.placementBuilding) {
    if (gx >= 1 && gy >= 1 && gx <= GRID_SIZE - 3 && gy <= GRID_SIZE - 3) {
      const p = game.placementBuilding;
      const def = BUILDING_TYPES[p.type];
      game.yen -= def.costYen;
      game.respect -= def.costRespect;
      const newBldg = {
        id: 'b_' + Date.now(),
        type: p.type,
        x: gx,
        y: gy,
        level: 1,
        currentHp: def.hp,
        maxHp: def.hp,
        stored: 0
      };
      game.buildings.push(newBldg);
      game.placementBuilding = null;
      window.soundEngine.playBuildPlace();
      showToast('¡Edificio levantado en la aldea!');
      game.saveState();
      updateUI();
      openBuildingContextDock(newBldg);
    }
    return;
  }

  const clickedObs = game.obstacles.find(o => o.x === gx && o.y === gy);
  if (clickedObs) {
    window.soundEngine.playClick();
    openObstacleContextDock(clickedObs);
    return;
  }

  const clickedBldg = game.buildings.find(b => {
    const def = BUILDING_TYPES[b.type];
    const w = def ? def.w : 1;
    const h = def ? def.h : 1;
    return gx >= b.x && gx < b.x + w && gy >= b.y && gy < b.y + h;
  });

  if (clickedBldg) {
    window.soundEngine.playClick();
    openBuildingContextDock(clickedBldg);
  } else {
    closeContextDock();
  }
}

// ==========================================================================
// SETUP EVENT LISTENERS
// ==========================================================================

function setupEventListeners() {
  const themeBtn = document.getElementById('btn-theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => game.toggleTheme());
  }

  const clanBtn = document.getElementById('btn-clan-castle');
  if (clanBtn) {
    clanBtn.addEventListener('click', () => {
      window.soundEngine.playClick();
      document.getElementById('clan-modal').classList.remove('hidden');
    });
  }

  const reqTroopsBtn = document.getElementById('btn-request-clan-troops');
  if (reqTroopsBtn) {
    reqTroopsBtn.addEventListener('click', () => game.requestClanTroops());
  }

  // Open Modals
  document.getElementById('btn-open-shop').addEventListener('click', () => {
    window.soundEngine.playClick();
    renderShopCatalog('resources');
    document.getElementById('shop-modal').classList.remove('hidden');
  });

  document.getElementById('btn-open-barracks').addEventListener('click', () => {
    window.soundEngine.playClick();
    renderBarracks('troops');
    document.getElementById('barracks-modal').classList.remove('hidden');
  });

  document.getElementById('btn-open-war-map').addEventListener('click', () => {
    window.soundEngine.playClick();
    renderWarMap();
    document.getElementById('war-map-modal').classList.remove('hidden');
  });

  // Defense Mode Triggers
  const trigDefBtn = document.getElementById('btn-trigger-defense');
  if (trigDefBtn) {
    trigDefBtn.addEventListener('click', () => switchToDefenseMode());
  }

  const openDefBtn = document.getElementById('btn-open-defense-mode');
  if (openDefBtn) {
    openDefBtn.addEventListener('click', () => switchToDefenseMode());
  }

  const endDefBtn = document.getElementById('btn-end-defense');
  if (endDefBtn) {
    endDefBtn.addEventListener('click', () => {
      if (game.currentDefense) game.currentDefense.endDefense(false);
      else switchToBaseMode();
    });
  }

  const returnFromDefBtn = document.getElementById('btn-return-from-defense');
  if (returnFromDefBtn) {
    returnFromDefBtn.addEventListener('click', () => switchToBaseMode());
  }

  // Quick Collection Buttons
  document.getElementById('btn-collect-all').addEventListener('click', () => game.collectResources());
  document.getElementById('btn-collect-yen').addEventListener('click', () => game.collectResources());
  document.getElementById('btn-collect-respect').addEventListener('click', () => game.collectResources());
  const darkColBtn = document.getElementById('btn-collect-dark');
  if (darkColBtn) {
    darkColBtn.addEventListener('click', () => game.collectDarkOnly());
  }

  // Shop Tabs
  document.querySelectorAll('.shop-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.soundEngine.playClick();
      document.querySelectorAll('.shop-nav-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderShopCatalog(e.currentTarget.getAttribute('data-cat'));
    });
  });

  // Barracks Tabs (Tropas vs Élite/Oscuro vs Hechizos)
  document.querySelectorAll('.barracks-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.soundEngine.playClick();
      document.querySelectorAll('.barracks-nav-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderBarracks(e.currentTarget.getAttribute('data-bcat'));
    });
  });

  // War Map Tabs (Campaign vs Multiplayer)
  const tabCampaign = document.getElementById('tab-war-campaign');
  const tabMultiplayer = document.getElementById('tab-war-multiplayer');
  const paneCampaign = document.getElementById('war-pane-campaign');
  const paneMultiplayer = document.getElementById('war-pane-multiplayer');

  if (tabCampaign && tabMultiplayer) {
    tabCampaign.addEventListener('click', () => {
      window.soundEngine.playClick();
      tabCampaign.classList.add('active');
      tabMultiplayer.classList.remove('active');
      if (paneCampaign) paneCampaign.classList.remove('hidden');
      if (paneMultiplayer) paneMultiplayer.classList.add('hidden');
    });

    tabMultiplayer.addEventListener('click', () => {
      window.soundEngine.playClick();
      tabMultiplayer.classList.add('active');
      tabCampaign.classList.remove('active');
      if (paneMultiplayer) paneMultiplayer.classList.remove('hidden');
      if (paneCampaign) paneCampaign.classList.add('hidden');
      renderMultiplayerPanel();
    });
  }

  // Multiplayer Search Controls
  const mpNextBtn = document.getElementById('btn-mp-next-target');
  if (mpNextBtn) {
    mpNextBtn.addEventListener('click', () => {
      if (game.yen < 50) {
        showToast('¡Fondos insuficientes para buscar rival (¥ 50)!');
        return;
      }
      game.yen -= 50;
      window.soundEngine.playClick();
      game.generateMultiplayerTarget();
      renderMultiplayerPanel();
      updateUI();
      showToast('🔍 ¡Nuevo rival encontrado en el mapa de Tokio!');
    });
  }

  const mpAttackBtn = document.getElementById('btn-mp-launch-attack');
  if (mpAttackBtn) {
    mpAttackBtn.addEventListener('click', () => {
      if (game.multiplayerTarget) {
        switchToRaidMode(game.multiplayerTarget);
      }
    });
  }

  // Clan Modal Tabs (Info vs Wars vs Rankings)
  const tabClanInfo = document.getElementById('tab-clan-info');
  const tabClanWars = document.getElementById('tab-clan-wars');
  const tabClanRanking = document.getElementById('tab-clan-ranking');
  const paneClanInfo = document.getElementById('clan-pane-info');
  const paneClanWars = document.getElementById('clan-pane-wars');
  const paneClanRanking = document.getElementById('clan-pane-ranking');

  if (tabClanInfo && tabClanWars && tabClanRanking) {
    tabClanInfo.addEventListener('click', () => {
      window.soundEngine.playClick();
      tabClanInfo.classList.add('active');
      tabClanWars.classList.remove('active');
      tabClanRanking.classList.remove('active');
      if (paneClanInfo) paneClanInfo.classList.remove('hidden');
      if (paneClanWars) paneClanWars.classList.add('hidden');
      if (paneClanRanking) paneClanRanking.classList.add('hidden');
    });

    tabClanWars.addEventListener('click', () => {
      window.soundEngine.playClick();
      tabClanWars.classList.add('active');
      tabClanInfo.classList.remove('active');
      tabClanRanking.classList.remove('active');
      if (paneClanWars) paneClanWars.classList.remove('hidden');
      if (paneClanInfo) paneClanInfo.classList.add('hidden');
      if (paneClanRanking) paneClanRanking.classList.add('hidden');
    });

    tabClanRanking.addEventListener('click', () => {
      window.soundEngine.playClick();
      tabClanRanking.classList.add('active');
      tabClanInfo.classList.remove('active');
      tabClanWars.classList.remove('active');
      if (paneClanRanking) paneClanRanking.classList.remove('hidden');
      if (paneClanInfo) paneClanInfo.classList.add('hidden');
      if (paneClanWars) paneClanWars.classList.add('hidden');
    });
  }

  // Context Dock Action Buttons
  const ctxInfoBtn = document.getElementById('btn-ctx-info');
  if (ctxInfoBtn) {
    ctxInfoBtn.addEventListener('click', () => {
      if (game.selectedBuilding) openBuildingInfo(game.selectedBuilding);
    });
  }

  const ctxUpgradeBtn = document.getElementById('btn-ctx-upgrade');
  if (ctxUpgradeBtn) {
    ctxUpgradeBtn.addEventListener('click', () => {
      const b = game.selectedBuilding;
      if (!b) return;
      const cost = (b.level || 1) * 900;
      if (game.yen < cost) {
        showToast('¡Fondos insuficientes para mejorar!');
        return;
      }
      game.yen -= cost;
      b.level = (b.level || 1) + 1;
      b.maxHp += 250;
      b.currentHp = b.maxHp;
      window.soundEngine.playFanfareLevelUp();
      showToast(`⚡ ¡${BUILDING_TYPES[b.type].name} mejorado a Nivel ${b.level}!`);
      game.saveState();
      updateUI();
      openBuildingContextDock(b);
    });
  }

  const ctxMoveBtn = document.getElementById('btn-ctx-move');
  if (ctxMoveBtn) {
    ctxMoveBtn.addEventListener('click', () => {
      if (!game.selectedBuilding) return;
      game.movingBuilding = game.selectedBuilding;
      window.soundEngine.playClick();
      showToast('✋ Modo Reubicación: Haz clic en el espacio verde donde quieras mover el edificio.');
    });
  }

  const ctxCollectBtn = document.getElementById('btn-ctx-collect');
  if (ctxCollectBtn) {
    ctxCollectBtn.addEventListener('click', () => game.collectResources());
  }

  const ctxTrainBtn = document.getElementById('btn-ctx-train');
  if (ctxTrainBtn) {
    ctxTrainBtn.addEventListener('click', () => {
      renderBarracks('troops');
      document.getElementById('barracks-modal').classList.remove('hidden');
    });
  }

  const ctxSpellsBtn = document.getElementById('btn-ctx-spells');
  if (ctxSpellsBtn) {
    ctxSpellsBtn.addEventListener('click', () => {
      renderBarracks('spells');
      document.getElementById('barracks-modal').classList.remove('hidden');
    });
  }

  const ctxClearBtn = document.getElementById('btn-ctx-clear');
  if (ctxClearBtn) {
    ctxClearBtn.addEventListener('click', () => {
      if (game.selectedObstacle) game.clearObstacle(game.selectedObstacle);
    });
  }

  const ctxCloseBtn = document.getElementById('btn-ctx-close');
  if (ctxCloseBtn) {
    ctxCloseBtn.addEventListener('click', () => closeContextDock());
  }

  // Hero Nuclear Kick Ability Button
  const heroAbilityBtn = document.getElementById('btn-hero-ability');
  if (heroAbilityBtn) {
    heroAbilityBtn.addEventListener('click', () => {
      if (game.currentRaid) game.currentRaid.activateHeroAbility();
    });
  }

  // Close Modals
  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      window.soundEngine.playClick();
      const modalId = e.currentTarget.getAttribute('data-close');
      document.getElementById(modalId).classList.add('hidden');
    });
  });

  // Upgrade Selected Building from Modal
  document.getElementById('btn-upgrade-building').addEventListener('click', () => {
    const b = game.selectedBuilding;
    if (!b) return;
    const cost = (b.level || 1) * 900;
    if (game.yen < cost) {
      showToast('¡Fondos insuficientes para mejorar!');
      return;
    }
    game.yen -= cost;
    b.level = (b.level || 1) + 1;
    b.maxHp += 250;
    b.currentHp = b.maxHp;
    window.soundEngine.playFanfareLevelUp();
    showToast(`¡${BUILDING_TYPES[b.type].name} mejorado a Nivel ${b.level}!`);
    document.getElementById('building-info-modal').classList.add('hidden');
    game.saveState();
    updateUI();
  });

  // End Raid Early
  document.getElementById('btn-end-raid').addEventListener('click', () => {
    if (game.currentRaid) {
      game.currentRaid.endRaid();
    }
  });

  // Return Home from Victory Modal
  document.getElementById('btn-return-home').addEventListener('click', () => {
    returnHome();
  });

  // Replay Intro
  const replayBtn = document.getElementById('btn-replay-intro');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.soundEngine.playClick();
      showIntro();
    });
  }

  // Intro Dialog Controls
  document.getElementById('btn-next-intro').addEventListener('click', () => {
    nextIntroSlide();
  });

  document.getElementById('btn-skip-intro').addEventListener('click', () => {
    window.soundEngine.playClick();
    finishIntro();
  });

  // Audio Toggle
  document.getElementById('btn-audio-toggle').addEventListener('click', (e) => {
    const isMuted = window.soundEngine.toggleMute();
    e.currentTarget.textContent = isMuted ? '🔇' : '🔊';
  });

  // Reset Game
  document.getElementById('btn-reset-game').addEventListener('click', () => {
    if (confirm('¿Restablecer toda tu aldea y recursos de RAYTON?')) {
      game.resetGame();
    }
  });
}

// ==========================================================================
// CINEMATIC ANIME INTRO CONTROLLER
// ==========================================================================

const INTRO_SLIDES = [
  {
    avatar: 'assets/images/banner.jpg',
    speaker: 'Crónica de las Calles de Tokio',
    role: 'Prólogo • La Caída del Orden (2026)',
    text: 'En los callejones oscuros de Shibuya y Shinjuku, la fuerza bruta impone la ley. Sindicatos despiadados como Kurohebi extorsionan a los comerciantes locales y aplastan a quienes se atreven a levantar la mirada...',
    btnText: 'Siguiente ❯'
  },
  {
    avatar: 'assets/images/kaito.jpg',
    speaker: 'Kaito Shiro • Estratega',
    role: 'Makochi • El Viento Protector',
    text: 'Pero aquí en nuestro distrito, no permitiremos que nadie derrame las lágrimas de nuestra gente. Inspirados por el honor de Bōfurin y la hermandad de la ToMan, levantaremos nuestras propias barricadas.',
    btnText: 'Siguiente ❯'
  },
  {
    avatar: 'assets/images/ren.jpg',
    speaker: 'Ren "Ray" Kazuma',
    role: '初代総長 • Líder Supremo de RAYTON',
    text: '¡Afilen los bates, preparen los cócteles molotov y enciendan los motores de las motos! ¡Construiremos la fortaleza más temida de Tokio y marcharemos a la guerra! ¡¡RAYTON A LA CIMA!!',
    btnText: '⚡ ¡INICIAR GUERRA DE PANDILLAS!'
  }
];

let currentIntroSlide = 0;

function showIntro() {
  currentIntroSlide = 0;
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;
  overlay.classList.remove('hidden');
  overlay.classList.remove('fade-out');
  renderIntroSlide(0);
  window.soundEngine.playIntroSwell();
}

function renderIntroSlide(index) {
  const slide = INTRO_SLIDES[index];
  if (!slide) return;

  const avatar = document.getElementById('intro-speaker-avatar');
  const name = document.getElementById('intro-speaker-name');
  const role = document.getElementById('intro-speaker-role');
  const text = document.getElementById('intro-story-text');
  const btnLabel = document.getElementById('intro-btn-label');

  if (avatar) avatar.src = slide.avatar;
  if (name) name.textContent = slide.speaker;
  if (role) role.textContent = slide.role;
  if (text) {
    text.style.animation = 'none';
    text.offsetHeight; // trigger reflow
    text.style.animation = 'textFadeIn 0.35s ease-out';
    text.textContent = slide.text;
  }
  if (btnLabel) btnLabel.textContent = slide.btnText;

  // Update Dots
  const dots = document.querySelectorAll('.step-dot');
  dots.forEach((dot, idx) => {
    if (idx === index) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

function nextIntroSlide() {
  currentIntroSlide++;
  if (currentIntroSlide < INTRO_SLIDES.length) {
    window.soundEngine.playClick();
    renderIntroSlide(currentIntroSlide);
  } else {
    finishIntro();
  }
}

function finishIntro() {
  window.soundEngine.playMotorcycleRev();
  const overlay = document.getElementById('intro-overlay');
  if (overlay) {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 600);
  }
  showToast('¡Bienvenido a la Aldea Mítica de RAYTON! Limpia obstáculos, levanta defensas y entrena a tus tropas.');
}

// Bootstrapping
document.addEventListener('DOMContentLoaded', () => {
  switchToBaseMode();
  setupEventListeners();
  updateUI();
  showIntro();
  console.log('RAYTON Clash of Delinquents Mythical Village Engine Initialized.');
});
