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
    speed: 1.05,
    costRespect: 25,
    costDark: 0,
    housing: 1,
    trainTime: 3,
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
    speed: 0.95,
    costRespect: 35,
    costDark: 0,
    housing: 1,
    trainTime: 4,
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
    speed: 1.45,
    costRespect: 30,
    costDark: 0,
    housing: 1,
    trainTime: 3,
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
    speed: 0.90,
    costRespect: 45,
    costDark: 0,
    housing: 1,
    trainTime: 5,
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
    speed: 0.55,
    costRespect: 130,
    costDark: 0,
    housing: 5,
    trainTime: 10,
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
    speed: 1.25,
    costRespect: 75,
    costDark: 0,
    housing: 2,
    trainTime: 6,
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
    speed: 0.85,
    costRespect: 0,
    costDark: 30,
    housing: 4,
    trainTime: 8,
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
    speed: 1.40,
    costRespect: 0,
    costDark: 45,
    housing: 5,
    trainTime: 12,
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
    speed: 0.75,
    costRespect: 0,
    costDark: 95,
    housing: 10,
    trainTime: 20,
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

// Urban & Natural Village Obstacles (Limpiar por Gemas 💎 y Recursos)
const OBSTACLE_TYPES = {
  // Urban City Obstacles
  concrete_block: {
    id: 'concrete_block',
    name: 'Bloque de Hormigón Roto',
    icon: '🧱',
    costYen: 150,
    costRespect: 0,
    gemsMin: 2,
    gemsMax: 4,
    desc: 'Escombro de construcción urbana que estorba en la acera. Envía un obrero para ganar gemas.'
  },
  scrap_metal: {
    id: 'scrap_metal',
    name: 'Chatarra de Motos Bōsōzoku',
    icon: '⚙️',
    costYen: 200,
    costRespect: 0,
    gemsMin: 3,
    gemsMax: 5,
    desc: 'Piezas oxidadas de tubos de escape y motores. Recíclalas para obtener gemas de honor.'
  },
  oil_barrel: {
    id: 'oil_barrel',
    name: 'Barriles de Petróleo Clandestino',
    icon: '🛢️',
    costYen: 300,
    costRespect: 0,
    gemsMin: 3,
    gemsMax: 6,
    desc: 'Combustible peligroso acumulado en el callejón. Drenarlo otorga gemas e ingresos.'
  },
  dumpster: {
    id: 'dumpster',
    name: 'Contenedor de Basura Callejero',
    icon: '🗑️',
    costYen: 250,
    costRespect: 0,
    gemsMin: 2,
    gemsMax: 5,
    desc: 'Contenedor industrial desbordado. Límpialo para despejar tu distrito urbano.'
  },
  cargo_crate: {
    id: 'cargo_crate',
    name: 'Caja de Contrabando Portuario',
    icon: '📦',
    costYen: 350,
    costRespect: 0,
    gemsMin: 4,
    gemsMax: 7,
    desc: 'Caja de madera con botín oculto olvidada tras una redada nocturna.'
  },
  gem_stash: {
    id: 'gem_stash',
    name: 'Alijo Secreto de Gemas de Honor',
    icon: '💎',
    costYen: 0,
    costRespect: 150,
    gemsMin: 5,
    gemsMax: 8,
    desc: '¡Alijo clandestino dejado por líderes rivales repleto de gemas brillantes!'
  },
  // Legacy / Rural natural obstacles
  tree_trunk: {
    id: 'tree_trunk',
    name: 'Tronco de Roble Podrido',
    icon: '🪵',
    costYen: 150,
    costRespect: 0,
    gemsMin: 2,
    gemsMax: 4,
    desc: 'Un viejo tronco que estorba en el terreno.'
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
    desc: 'Árbol silvestre que crece en el terreno.'
  }
};

// ==========================================================================
// TOKYO DELINQUENT LEADERS REGISTRY (12 COMMANDERS)
// ==========================================================================

const LEADERS_DATA = {
  ren: {
    id: 'ren',
    name: 'Ren "Ray" Kazuma',
    title: '初代総長 • Líder Supremo de RAYTON',
    role: 'Delincuente Supremo & Daño Explosivo',
    rarity: 'legendary',
    stars: 5,
    avatar: 'assets/images/ren.jpg',
    icon: '👑',
    color: '#f59e0b',
    hpBase: 1600,
    hpPerLevel: 220,
    dpsBase: 110,
    dpsPerLevel: 18,
    speed: 2.1,
    targetPriority: 'any',
    passiveName: 'Presencia del Comandante',
    passiveDesc: 'Aumenta el daño de todas las tropas aliadas un +20% mientras combate.',
    abilityId: 'nuclear_kick',
    abilityName: '⚡ Patada Nuclear',
    abilityDesc: '¡Cura +700 HP, invoca 4 brawlers de refuerzo y desata onda expansiva destructiva!'
  },
  kaito: {
    id: 'kaito',
    name: 'Kaito Shiro',
    title: 'Makochi • El General del Viento',
    role: 'Comandante & Despliegue de Ejército Masivo',
    rarity: 'legendary',
    stars: 5,
    avatar: 'assets/images/kaito.jpg',
    icon: '🪭',
    color: '#06b6d4',
    hpBase: 1400,
    hpPerLevel: 190,
    dpsBase: 95,
    dpsPerLevel: 16,
    speed: 2.0,
    targetPriority: 'any',
    passiveName: '¡A la Carga, Escuadrón!',
    passiveDesc: '¡Al desplegarse, aparece automáticamente con una escolta de 6 Novatos con Bate y 3 Arqueras!',
    abilityId: 'tactical_reinforce',
    abilityName: '🚩 Refuerzo Táctico',
    abilityDesc: 'Convoca de inmediato 4 Lanzadores de Molotov y 1 Tanque con Viga en su posición.'
  },
  aoi: {
    id: 'aoi',
    name: 'Aoi "La Curandera"',
    title: 'Makochi • Médica Callejera de Élite',
    role: 'Sanadora Legendaria & Soporte Vital',
    rarity: 'legendary',
    stars: 5,
    avatar: 'assets/images/aoi.jpg',
    icon: '💚',
    color: '#10b981',
    hpBase: 1500,
    hpPerLevel: 200,
    dpsBase: 70,
    dpsPerLevel: 12,
    speed: 2.2,
    targetPriority: 'any',
    passiveName: 'Aura Sanadora Sagrada',
    passiveDesc: 'Restaura continuamente +40 HP/seg a todas las tropas aliadas en un radio de 4 casillas.',
    abilityId: 'divine_adrenaline',
    abilityName: '💉 Adrenalina Divina',
    abilityDesc: 'Cura masiva de +800 HP e invulnerabilidad dorada durante 3.5 segundos a todo su escuadrón.'
  },
  tora: {
    id: 'tora',
    name: 'Tora "El Destructor"',
    title: 'Tigre de Hierro • Titán Rompemuros',
    role: 'Fuerza Bruta & Furia Berserker',
    rarity: 'legendary',
    stars: 5,
    avatar: 'assets/images/tora.jpg',
    icon: '🐯',
    color: '#ef4444',
    hpBase: 2600,
    hpPerLevel: 320,
    dpsBase: 140,
    dpsPerLevel: 24,
    speed: 1.8,
    targetPriority: 'defenses',
    passiveName: 'Demolición de Murallas',
    passiveDesc: 'Inflige x3 de daño contra muros y defensas fortificadas.',
    abilityId: 'berserker_rage',
    abilityName: '🔥 Furia Berserker',
    abilityDesc: '¡Crece de tamaño, gana +150% de DPS, duplica su velocidad y causa temblor de tierra!'
  },
  ryu: {
    id: 'ryu',
    name: 'Ryu "El Dragón Bōsōzoku"',
    title: 'Capitán de la División de Motociclistas',
    role: 'Asalto Veloz & Rastro de Fuego',
    rarity: 'epic',
    stars: 4,
    avatar: 'assets/images/ryu.jpg',
    icon: '🏍️',
    color: '#f97316',
    hpBase: 1650,
    hpPerLevel: 210,
    dpsBase: 120,
    dpsPerLevel: 19,
    speed: 3.2,
    targetPriority: 'any',
    passiveName: 'Salto de Barricada',
    passiveDesc: 'Salta muros con su moto y no se detiene ante obstáculos.',
    abilityId: 'nitro_blaze',
    abilityName: '🏍️ Embestida Nitro',
    abilityDesc: 'Embestida de 550 de daño de choque que deja un rastro ardiente que quema todo por 5 seg.'
  },
  kurogane: {
    id: 'kurogane',
    name: 'Kurogane "La Serpiente"',
    title: 'Líder del Sindicato Kurohebi',
    role: 'Asesino Sombrío & Robo de Vida',
    rarity: 'epic',
    stars: 4,
    avatar: 'assets/images/kurogane.jpg',
    icon: '🐍',
    color: '#8b5cf6',
    hpBase: 1550,
    hpPerLevel: 195,
    dpsBase: 130,
    dpsPerLevel: 20,
    speed: 2.4,
    targetPriority: 'defenses',
    passiveName: 'Daga Drenadora',
    passiveDesc: 'Restaura el 35% de todo el daño que inflige como salud para sí mismo.',
    abilityId: 'shadow_strike',
    abilityName: '🌑 Paso Sombrío',
    abilityDesc: 'Se teletransporta detrás de la defensa enemiga más poderosa y le asesta 750 de daño crítico.'
  },
  daiki: {
    id: 'daiki',
    name: 'Daiki "El Puño de Acero"',
    title: 'Titan Clandestino de Osaka • Campeón Invicto',
    role: 'Muralla Humana & Daño Sísmico',
    rarity: 'legendary',
    stars: 5,
    avatar: 'assets/images/daiki.jpg',
    icon: '🥊',
    color: '#eab308',
    hpBase: 2800,
    hpPerLevel: 340,
    dpsBase: 125,
    dpsPerLevel: 22,
    speed: 1.7,
    targetPriority: 'defenses',
    passiveName: 'Blindaje de Titanio',
    passiveDesc: 'Reduce un 35% todo el daño sufrido de cañones y defensas fortificadas.',
    abilityId: 'titan_punch',
    abilityName: '🥊 Impacto Sísmico',
    abilityDesc: '¡Demuele barricadas en radio 3, inflige 850 de daño y activa un escudo protector de +1000 HP!'
  },
  gen: {
    id: 'gen',
    name: 'Gen "El Artificiero"',
    title: 'Pirotécnico Temerario de Shinjuku',
    role: 'Bombardero de Asedio & Fuego de Área',
    rarity: 'epic',
    stars: 4,
    avatar: 'assets/images/gen.jpg',
    icon: '💣',
    color: '#ef4444',
    hpBase: 1450,
    hpPerLevel: 185,
    dpsBase: 135,
    dpsPerLevel: 23,
    speed: 2.0,
    targetPriority: 'defenses',
    passiveName: 'Arsenal Incendiario',
    passiveDesc: 'Sus ataques incendian estructuras causando un +25% de daño adicional en 4 segundos.',
    abilityId: 'napalm_barrage',
    abilityName: '💣 Lluvia de Napalm',
    abilityDesc: '¡Bombardea con 5 explosivos de área que causan 500 de daño cada uno a defensas enemigas!'
  },
  hana: {
    id: 'hana',
    name: 'Hana "La Rosa Letal"',
    title: 'Comandante de la División Kunoichi',
    role: 'Asalto Hipersónico & Evasión Espectral',
    rarity: 'legendary',
    stars: 5,
    avatar: 'assets/images/hana.jpg',
    icon: '🌸',
    color: '#ec4899',
    hpBase: 1500,
    hpPerLevel: 195,
    dpsBase: 130,
    dpsPerLevel: 21,
    speed: 3.0,
    targetPriority: 'any',
    passiveName: 'Danza Espectral',
    passiveDesc: 'Tiene un 40% de probabilidad de esquivar cualquier proyectil o cañonazo enemigo.',
    abilityId: 'petal_vortex',
    abilityName: '🌸 Vórtice de Cuchillas',
    abilityDesc: '¡Gira con velocidad relámpago volviéndose inmune 4 seg y arrasando edificios en radio por 650 de daño!'
  },
  kazuki: {
    id: 'kazuki',
    name: 'Kazuki "El Filo Nocturno"',
    title: 'Maestro de Katana de los Dojos de Kioto',
    role: 'Corte Crítico & Destructor de Murallas',
    rarity: 'legendary',
    stars: 5,
    avatar: 'assets/images/kazuki.jpg',
    icon: '⚔️',
    color: '#6366f1',
    hpBase: 1650,
    hpPerLevel: 215,
    dpsBase: 145,
    dpsPerLevel: 25,
    speed: 2.3,
    targetPriority: 'any',
    passiveName: 'Corte Muramasa',
    passiveDesc: 'Cada tercer golpe inflige daño crítico x2.5 atravesando muros y escudos.',
    abilityId: 'iaido_slash',
    abilityName: '⚡ Corte Iaido Relámpago',
    abilityDesc: '¡Se proyecta en un destello atravesando muros e infligiendo 950 de daño a todos los objetivos en línea!'
  },
  shin: {
    id: 'shin',
    name: 'Shin "Ojo de Halcón"',
    title: 'Vigilante Táctico de Azoteas de Tokio',
    role: 'Francotirador de Ultra-Largo Alcance',
    rarity: 'epic',
    stars: 4,
    avatar: 'assets/images/shin.jpg',
    icon: '🎯',
    color: '#0ea5e9',
    hpBase: 1300,
    hpPerLevel: 170,
    dpsBase: 150,
    dpsPerLevel: 26,
    speed: 1.9,
    targetPriority: 'defenses',
    passiveName: 'Calibre Pesado Perforante',
    passiveDesc: 'Dispara desde una distancia extrema (rango 6.5) fuera del alcance de la mayoría de defensas.',
    abilityId: 'orbital_shot',
    abilityName: '🎯 Disparo Orbital Perforante',
    abilityDesc: '¡Fija con mira láser la defensa enemiga más peligrosa y la pulveriza con 1,200 de daño directo!'
  },
  yukiko: {
    id: 'yukiko',
    name: 'Yukiko "La Reina de Nieve"',
    title: 'Emperatriz de la Cuadrilla de Hokkaido',
    role: 'Control Glacial & Sanación Boreal',
    rarity: 'legendary',
    stars: 5,
    avatar: 'assets/images/yukiko.jpg',
    icon: '❄️',
    color: '#38bdf8',
    hpBase: 1550,
    hpPerLevel: 205,
    dpsBase: 105,
    dpsPerLevel: 18,
    speed: 2.1,
    targetPriority: 'any',
    passiveName: 'Aura Cero Absoluto',
    passiveDesc: 'Ralentiza la cadencia de fuego de todas las defensas y enemigos en un 35%.',
    abilityId: 'blizzard_tempest',
    abilityName: '❄️ Tempestad Glacial',
    abilityDesc: '¡Desata una tormenta de hielo que congela defensas en radio 5.5 por 6 seg y cura 600 HP a tropas aliadas!'
  }
};

// ==========================================================================
// JAPAN TERRITORIAL CONQUEST SYSTEM (RISK ARCHITECTURE)
// ==========================================================================

const JAPAN_REGIONS = {
  kanto: {
    id: 'kanto',
    name: 'Kanto',
    fullName: 'Gran Kanto (Tokio & Yokohama)',
    crest: '👑',
    territories: ['tokyo', 'yokohama', 'chiba'],
    bonusTitle: '+25% Impuestos de Yenes ¥',
    bonusDesc: 'Incrementa un +25% los Yenes generados en toda la red territorial.'
  },
  chubu: {
    id: 'chubu',
    name: 'Chubu',
    fullName: 'Chubu (Nagoya & Monte Fuji)',
    crest: '⚡',
    territories: ['nagoya', 'fuji', 'niigata'],
    bonusTitle: '+25% Velocidad de Tropas',
    bonusDesc: 'Todas las tropas y motoristas se desplazan un +25% más velozmente en asaltos.'
  },
  kansai: {
    id: 'kansai',
    name: 'Kansai',
    fullName: 'Kansai (Osaka, Kioto & Kobe)',
    crest: '🥊',
    territories: ['osaka', 'kyoto', 'kobe'],
    bonusTitle: '+15% Daño de Toda la Banda',
    bonusDesc: 'Aumenta un +15% el DPS de todas tus tropas en combate territorial.'
  },
  tohoku: {
    id: 'tohoku',
    name: 'Tohoku',
    fullName: 'Tohoku (Sendai & Aomori)',
    crest: '🛡️',
    territories: ['sendai', 'aomori'],
    bonusTitle: '+20% Resistencia de Muros',
    bonusDesc: 'Tus barricadas y cañones cuentan con un +20% de puntos de vida defensiva.'
  },
  hokkaido: {
    id: 'hokkaido',
    name: 'Hokkaido',
    fullName: 'Hokkaido (Sapporo Glacial)',
    crest: '❄️',
    territories: ['hakodate', 'sapporo'],
    bonusTitle: '-30% Tiempo de Reclutamiento',
    bonusDesc: '¡Acelera un 30% la velocidad de entrenamiento en la cola de reclutamiento!'
  },
  chugoku: {
    id: 'chugoku',
    name: 'Chugoku',
    fullName: 'Chugoku (Hiroshima Marítimo)',
    crest: '⚓',
    territories: ['okayama', 'hiroshima'],
    bonusTitle: '+20% Botín de Guerra Extra',
    bonusDesc: 'Otorga un +20% de botín adicional en todos los asaltos territoriales.'
  },
  shikoku: {
    id: 'shikoku',
    name: 'Shikoku',
    fullName: 'Shikoku (Matsuyama & Santuarios)',
    crest: '🏯',
    territories: ['matsuyama'],
    bonusTitle: '+20% Salud de Comandantes',
    bonusDesc: 'Todos tus líderes supremos obtienen un +20% de salud máxima.'
  },
  kyushu: {
    id: 'kyushu',
    name: 'Kyushu',
    fullName: 'Kyushu (Fukuoka & Volcanes)',
    crest: '🔥',
    territories: ['fukuoka'],
    bonusTitle: '+35% Esencia Sombría 🧪',
    bonusDesc: 'Genera un +35% de producción pasiva de Esencia para tropas de élite.'
  }
};

const JAPAN_TERRITORIES_DEF = {
  tokyo: {
    id: 'tokyo',
    name: 'Gran Tokio (Shinjuku)',
    region: 'kanto',
    kanji: '東京',
    owner: 'rayton',
    gang: 'Cuartel General RAYTON',
    garrison: 25,
    difficulty: 1,
    lootYen: 5000,
    lootRespect: 3200,
    lootDark: 250,
    incomeYen: 180,
    incomeRespect: 90,
    coords: { x: 73, y: 56 },
    connections: ['yokohama', 'chiba', 'fuji', 'niigata'],
    lore: 'El corazón metropolitano de tu organización. Desde aquí se coordina la conquista de todo Japón.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 2 },
      { type: 'ramen', x: 5, y: 8, level: 2 },
      { type: 'vault', x: 12, y: 8, level: 2 },
      { type: 'cannon', x: 8, y: 5, level: 2 },
      { type: 'watchtower', x: 8, y: 12, level: 2 }
    ]
  },
  yokohama: {
    id: 'yokohama',
    name: 'Puerto de Yokohama',
    region: 'kanto',
    kanji: '横浜',
    owner: 'enemy',
    gang: 'Pandilla del Muelle Rojo',
    garrison: 14,
    difficulty: 1,
    lootYen: 7000,
    lootRespect: 4500,
    lootDark: 300,
    incomeYen: 140,
    incomeRespect: 70,
    coords: { x: 74, y: 62 },
    connections: ['tokyo', 'chiba', 'fuji'],
    lore: 'Punto de entrada de mercancías y astilleros clandestinos con defensas ligeras.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 1 },
      { type: 'ramen', x: 5, y: 8, level: 1 },
      { type: 'vault', x: 11, y: 8, level: 1 },
      { type: 'cannon', x: 8, y: 5, level: 1 },
      { type: 'watchtower', x: 8, y: 11, level: 1 },
      { type: 'spring_trap', x: 6, y: 6, level: 1 },
      { type: 'wall', x: 4, y: 4, level: 1 }, { type: 'wall', x: 5, y: 4, level: 1 }, { type: 'wall', x: 6, y: 4, level: 1 }
    ]
  },
  chiba: {
    id: 'chiba',
    name: 'Distrito Industrial Chiba',
    region: 'kanto',
    kanji: '千葉',
    owner: 'enemy',
    gang: 'Bōsōzoku de la Bahía',
    garrison: 16,
    difficulty: 2,
    lootYen: 8500,
    lootRespect: 5200,
    lootDark: 350,
    incomeYen: 160,
    incomeRespect: 80,
    coords: { x: 80, y: 58 },
    connections: ['tokyo', 'yokohama'],
    lore: 'Refinerías y naves industriales tomadas por pandilleros motociclistas.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 2 },
      { type: 'cannon', x: 6, y: 6, level: 2 },
      { type: 'watchtower', x: 10, y: 10, level: 2 },
      { type: 'mortar', x: 8, y: 11, level: 1 },
      { type: 'vault', x: 5, y: 8, level: 2 },
      { type: 'bomb', x: 7, y: 6, level: 1 }
    ]
  },
  fuji: {
    id: 'fuji',
    name: 'Santuario Monte Fuji',
    region: 'chubu',
    kanji: '富士',
    owner: 'enemy',
    gang: 'Guardia Sagrada del Volcán',
    garrison: 18,
    difficulty: 2,
    lootYen: 9500,
    lootRespect: 5800,
    lootDark: 400,
    incomeYen: 170,
    incomeRespect: 85,
    coords: { x: 67, y: 57 },
    connections: ['tokyo', 'yokohama', 'nagoya'],
    lore: 'Dojos de montaña fortificados en las faldas del volcán sagrado.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 2 },
      { type: 'wizard_tower', x: 8, y: 5, level: 1 },
      { type: 'cannon', x: 5, y: 8, level: 2 },
      { type: 'watchtower', x: 11, y: 8, level: 2 },
      { type: 'dojo', x: 8, y: 11, level: 2 }
    ]
  },
  nagoya: {
    id: 'nagoya',
    name: 'Autopistas de Nagoya',
    region: 'chubu',
    kanji: '名古屋',
    owner: 'enemy',
    gang: 'Hermandad del Asfalto',
    garrison: 20,
    difficulty: 2,
    lootYen: 11000,
    lootRespect: 6800,
    lootDark: 450,
    incomeYen: 190,
    incomeRespect: 95,
    coords: { x: 61, y: 61 },
    connections: ['fuji', 'niigata', 'kyoto', 'osaka'],
    lore: 'Nudo neurálgico de transporte y talleres ilegales que conecta el este y el oeste.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 2 },
      { type: 'mortar', x: 8, y: 5, level: 2 },
      { type: 'cannon', x: 5, y: 11, level: 2 },
      { type: 'watchtower', x: 11, y: 11, level: 2 },
      { type: 'vault', x: 5, y: 6, level: 2 }
    ]
  },
  niigata: {
    id: 'niigata',
    name: 'Costa Nevada de Niigata',
    region: 'chubu',
    kanji: '新潟',
    owner: 'enemy',
    gang: 'Bandidos de la Costa Marina',
    garrison: 22,
    difficulty: 3,
    lootYen: 12500,
    lootRespect: 7500,
    lootDark: 500,
    incomeYen: 200,
    incomeRespect: 100,
    coords: { x: 68, y: 46 },
    connections: ['tokyo', 'nagoya', 'sendai'],
    lore: 'Almacenes helados de arroz y sake defendidos con cañones dobles.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 3 },
      { type: 'cannon', x: 6, y: 5, level: 3 },
      { type: 'cannon', x: 10, y: 5, level: 3 },
      { type: 'mortar', x: 8, y: 11, level: 2 },
      { type: 'watchtower', x: 8, y: 6, level: 2 }
    ]
  },
  kyoto: {
    id: 'kyoto',
    name: 'Dojos Milenarios de Kioto',
    region: 'kansai',
    kanji: '京都',
    owner: 'enemy',
    gang: 'Orden de Katana de Kazuki',
    garrison: 24,
    difficulty: 3,
    lootYen: 13500,
    lootRespect: 8200,
    lootDark: 600,
    incomeYen: 220,
    incomeRespect: 110,
    coords: { x: 56, y: 57 },
    connections: ['nagoya', 'osaka', 'kobe'],
    lore: 'Antiguos santuarios reconvertidos en bastiones de artes marciales de élite.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 3 },
      { type: 'wizard_tower', x: 6, y: 6, level: 2 },
      { type: 'watchtower', x: 10, y: 6, level: 3 },
      { type: 'cannon', x: 8, y: 11, level: 3 },
      { type: 'dojo', x: 5, y: 8, level: 3 }
    ]
  },
  osaka: {
    id: 'osaka',
    name: 'Sindicato de Osaka (Minami)',
    region: 'kansai',
    kanji: '大阪',
    owner: 'enemy',
    gang: 'Tigres Callejeros de Daiki',
    garrison: 28,
    difficulty: 4,
    lootYen: 16000,
    lootRespect: 9800,
    lootDark: 750,
    incomeYen: 250,
    incomeRespect: 125,
    coords: { x: 54, y: 64 },
    connections: ['nagoya', 'kyoto', 'kobe', 'matsuyama'],
    lore: 'Metrópolis mercantil de Dotonbori dominada por cuadrillas de puño de hierro.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 4 },
      { type: 'mortar', x: 6, y: 8, level: 2 },
      { type: 'mortar', x: 10, y: 8, level: 2 },
      { type: 'cannon', x: 8, y: 5, level: 3 },
      { type: 'watchtower', x: 8, y: 11, level: 3 },
      { type: 'vault', x: 5, y: 11, level: 3 }
    ]
  },
  kobe: {
    id: 'kobe',
    name: 'Bahía del Dragón de Kobe',
    region: 'kansai',
    kanji: '神戸',
    owner: 'enemy',
    gang: 'Lobos Portuarios de Kobe',
    garrison: 22,
    difficulty: 3,
    lootYen: 13000,
    lootRespect: 7900,
    lootDark: 550,
    incomeYen: 210,
    incomeRespect: 105,
    coords: { x: 50, y: 62 },
    connections: ['osaka', 'kyoto', 'okayama'],
    lore: 'Muelles protegidos por anillos de barricadas y morteros de fuego continuo.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 3 },
      { type: 'cannon', x: 5, y: 6, level: 3 },
      { type: 'watchtower', x: 11, y: 6, level: 3 },
      { type: 'mortar', x: 8, y: 11, level: 2 }
    ]
  },
  sendai: {
    id: 'sendai',
    name: 'Fortaleza del Norte de Sendai',
    region: 'tohoku',
    kanji: '仙台',
    owner: 'enemy',
    gang: 'Guerreros del Trueno Boreal',
    garrison: 26,
    difficulty: 3,
    lootYen: 15000,
    lootRespect: 9200,
    lootDark: 700,
    incomeYen: 230,
    incomeRespect: 115,
    coords: { x: 77, y: 41 },
    connections: ['niigata', 'aomori'],
    lore: 'Bastión del norte rodeado de densos muros de piedra y vigías implacables.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 3 },
      { type: 'watchtower', x: 6, y: 5, level: 3 },
      { type: 'watchtower', x: 10, y: 5, level: 3 },
      { type: 'cannon', x: 8, y: 11, level: 3 },
      { type: 'mortar', x: 8, y: 5, level: 2 }
    ]
  },
  aomori: {
    id: 'aomori',
    name: 'Estrecho Helado de Aomori',
    region: 'tohoku',
    kanji: '青森',
    owner: 'enemy',
    gang: 'Clanes del Viento Helado',
    garrison: 28,
    difficulty: 4,
    lootYen: 17500,
    lootRespect: 10500,
    lootDark: 800,
    incomeYen: 260,
    incomeRespect: 130,
    coords: { x: 76, y: 31 },
    connections: ['sendai', 'hakodate'],
    lore: 'El paso final hacia el norte helado defendido por torres mágicas y trampas.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 4 },
      { type: 'wizard_tower', x: 5, y: 6, level: 2 },
      { type: 'wizard_tower', x: 11, y: 6, level: 2 },
      { type: 'cannon', x: 8, y: 11, level: 4 },
      { type: 'mortar', x: 8, y: 5, level: 3 }
    ]
  },
  hakodate: {
    id: 'hakodate',
    name: 'Bastión Costero de Hakodate',
    region: 'hokkaido',
    kanji: '函館',
    owner: 'enemy',
    gang: 'Guardia del Estrecho Norte',
    garrison: 30,
    difficulty: 4,
    lootYen: 19000,
    lootRespect: 11800,
    lootDark: 900,
    incomeYen: 280,
    incomeRespect: 140,
    coords: { x: 77, y: 23 },
    connections: ['aomori', 'sapporo'],
    lore: 'Fortaleza estrellada de estilo Goryokaku adaptada a la guerra callejera moderna.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 4 },
      { type: 'mortar', x: 6, y: 6, level: 3 },
      { type: 'mortar', x: 10, y: 6, level: 3 },
      { type: 'cannon', x: 8, y: 12, level: 4 },
      { type: 'watchtower', x: 5, y: 10, level: 3 }
    ]
  },
  sapporo: {
    id: 'sapporo',
    name: 'Metrópolis Glacial de Sapporo',
    region: 'hokkaido',
    kanji: '札幌',
    owner: 'enemy',
    gang: 'Reino de Hielo de Yukiko',
    garrison: 36,
    difficulty: 5,
    lootYen: 26000,
    lootRespect: 16500,
    lootDark: 1400,
    incomeYen: 340,
    incomeRespect: 170,
    coords: { x: 81, y: 14 },
    connections: ['hakodate'],
    lore: 'La capital helada del norte. Una fortaleza monumental armada con cañones y morteros máximos.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 5 },
      { type: 'mortar', x: 6, y: 8, level: 3 },
      { type: 'mortar', x: 10, y: 8, level: 3 },
      { type: 'wizard_tower', x: 8, y: 5, level: 3 },
      { type: 'cannon', x: 5, y: 11, level: 4 },
      { type: 'cannon', x: 11, y: 11, level: 4 },
      { type: 'watchtower', x: 8, y: 12, level: 4 }
    ]
  },
  okayama: {
    id: 'okayama',
    name: 'Ruta de Okayama',
    region: 'chugoku',
    kanji: '岡山',
    owner: 'enemy',
    gang: 'Jinetes del Viento Interior',
    garrison: 23,
    difficulty: 3,
    lootYen: 14000,
    lootRespect: 8600,
    lootDark: 600,
    incomeYen: 220,
    incomeRespect: 110,
    coords: { x: 44, y: 62 },
    connections: ['kobe', 'hiroshima', 'matsuyama'],
    lore: 'Castillo negro fortificado que vigila el paso entre el mar interior y las montañas.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 3 },
      { type: 'cannon', x: 6, y: 6, level: 3 },
      { type: 'mortar', x: 8, y: 11, level: 2 },
      { type: 'watchtower', x: 10, y: 10, level: 3 }
    ]
  },
  hiroshima: {
    id: 'hiroshima',
    name: 'Sindicato Marítimo de Hiroshima',
    region: 'chugoku',
    kanji: '広島',
    owner: 'enemy',
    gang: 'Dragones del Mar Interior',
    garrison: 28,
    difficulty: 4,
    lootYen: 18000,
    lootRespect: 11000,
    lootDark: 850,
    incomeYen: 270,
    incomeRespect: 135,
    coords: { x: 37, y: 64 },
    connections: ['okayama', 'fukuoka'],
    lore: 'Poderoso cuartel costero defendido por veteranos curtidos en batallas navales y callejeras.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 4 },
      { type: 'mortar', x: 6, y: 7, level: 3 },
      { type: 'cannon', x: 10, y: 7, level: 4 },
      { type: 'wizard_tower', x: 8, y: 11, level: 2 },
      { type: 'watchtower', x: 5, y: 10, level: 3 }
    ]
  },
  matsuyama: {
    id: 'matsuyama',
    name: 'Isla Fortaleza de Shikoku',
    region: 'shikoku',
    kanji: '四国',
    owner: 'enemy',
    gang: 'Cuadrilla de las 4 Provincias',
    garrison: 25,
    difficulty: 3,
    lootYen: 15500,
    lootRespect: 9500,
    lootDark: 700,
    incomeYen: 240,
    incomeRespect: 120,
    coords: { x: 45, y: 72 },
    connections: ['osaka', 'okayama', 'fukuoka'],
    lore: 'La isla inexpugnable rodeada por corrientes marinas rápidas y baluartes dobles.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 3 },
      { type: 'cannon', x: 6, y: 6, level: 3 },
      { type: 'watchtower', x: 10, y: 6, level: 3 },
      { type: 'mortar', x: 8, y: 11, level: 2 }
    ]
  },
  fukuoka: {
    id: 'fukuoka',
    name: 'Cuna Bōsōzoku de Fukuoka',
    region: 'kyushu',
    kanji: '福岡',
    owner: 'enemy',
    gang: 'Legión de Acero de Kyushu',
    garrison: 34,
    difficulty: 5,
    lootYen: 24000,
    lootRespect: 15000,
    lootDark: 1300,
    incomeYen: 320,
    incomeRespect: 160,
    coords: { x: 26, y: 68 },
    connections: ['hiroshima', 'matsuyama'],
    lore: 'La capital del sur y cuna legendaria de las mayores bandas de motociclistas de Japón.',
    buildings: [
      { type: 'hq', x: 8, y: 8, level: 5 },
      { type: 'mortar', x: 6, y: 8, level: 3 },
      { type: 'mortar', x: 10, y: 8, level: 3 },
      { type: 'cannon', x: 8, y: 5, level: 4 },
      { type: 'cannon', x: 8, y: 11, level: 4 },
      { type: 'wizard_tower', x: 5, y: 6, level: 3 },
      { type: 'watchtower', x: 11, y: 6, level: 4 }
    ]
  }
};

// Legacy compatibility alias
const HERO_REN = {
  id: 'ren',
  name: LEADERS_DATA.ren.name,
  icon: LEADERS_DATA.ren.icon,
  avatar: LEADERS_DATA.ren.avatar,
  hp: LEADERS_DATA.ren.hpBase,
  maxHp: LEADERS_DATA.ren.hpBase,
  dps: LEADERS_DATA.ren.dpsBase,
  speed: 2.1,
  targetPriority: 'any',
  desc: LEADERS_DATA.ren.title
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
    this.theme = 'urban'; // 'urban' (Tokyo Asphalt & Concrete) or 'village' (Lush Emerald Grass)
    this.weather = 'rain'; // 'rain' (Tokyo Rain), 'sakura' (Cherry Blossoms), 'neon' (Cyber Haze), 'clear'
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

    // Recruitment Queue with Real-Time Progress Bar
    this.trainingQueue = [];

    // Japan Territorial Conquest (RISK System)
    this.japanTerritories = {};
    for (const [id, def] of Object.entries(JAPAN_TERRITORIES_DEF)) {
      this.japanTerritories[id] = {
        owner: def.owner,
        garrison: def.garrison,
        conqueredAt: def.owner === 'rayton' ? Date.now() : null
      };
    }
    this.selectedRiskTerritory = 'yokohama';
    this.japanTaxesAccumulated = { yen: 0, respect: 0 };
    this.lastTaxTick = Date.now();

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

    // Urban City Obstacles (Escombros, Chatarra, Barriles, Cajas y Alijos)
    this.obstacles = [
      { id: 'obs_1', type: 'concrete_block', x: 2, y: 6 },
      { id: 'obs_2', type: 'scrap_metal', x: 14, y: 3 },
      { id: 'obs_3', type: 'oil_barrel', x: 13, y: 13 },
      { id: 'obs_4', type: 'cargo_crate', x: 2, y: 14 },
      { id: 'obs_5', type: 'gem_stash', x: 6, y: 2 }
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

    // Wandering Villagers in base (Aldeanos y miembros de cuadrilla)
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

    // Tokyo Gang Leaders Collection (12 Commanders)
    this.activeLeaderId = 'ren';
    this.leaders = {
      ren: { unlocked: true, level: 1, shards: 0 },
      kaito: { unlocked: false, level: 1, shards: 0 },
      aoi: { unlocked: false, level: 1, shards: 0 },
      tora: { unlocked: false, level: 1, shards: 0 },
      ryu: { unlocked: false, level: 1, shards: 0 },
      kurogane: { unlocked: false, level: 1, shards: 0 },
      daiki: { unlocked: false, level: 1, shards: 0 },
      gen: { unlocked: false, level: 1, shards: 0 },
      hana: { unlocked: false, level: 1, shards: 0 },
      kazuki: { unlocked: false, level: 1, shards: 0 },
      shin: { unlocked: false, level: 1, shards: 0 },
      yukiko: { unlocked: false, level: 1, shards: 0 }
    };

    this.loadState();
    this.startProductionLoop();
    this.startVillagerLoop();
  }

  getActiveLeader() {
    const data = LEADERS_DATA[this.activeLeaderId] || LEADERS_DATA.ren;
    const state = this.leaders[this.activeLeaderId] || { unlocked: true, level: 1, shards: 0 };
    const level = state.level || 1;
    const hp = data.hpBase + (level - 1) * data.hpPerLevel;
    const dps = data.dpsBase + (level - 1) * data.dpsPerLevel;
    const shardsNeeded = level * 5;
    return {
      ...data,
      level: level,
      shards: state.shards || 0,
      unlocked: state.unlocked,
      hp: hp,
      maxHp: hp,
      dps: dps,
      shardsNeeded: shardsNeeded
    };
  }

  getLeaderInfo(leaderId) {
    const data = LEADERS_DATA[leaderId];
    if (!data) return null;
    const state = this.leaders[leaderId] || { unlocked: false, level: 1, shards: 0 };
    const level = state.level || 1;
    const hp = data.hpBase + (level - 1) * data.hpPerLevel;
    const dps = data.dpsBase + (level - 1) * data.dpsPerLevel;
    const shardsNeeded = level * 5;
    const upgradeCostRespect = level * 1000;
    return {
      ...data,
      level: level,
      shards: state.shards || 0,
      unlocked: state.unlocked,
      hp: hp,
      maxHp: hp,
      dps: dps,
      shardsNeeded: shardsNeeded,
      upgradeCostRespect: upgradeCostRespect,
      isActive: this.activeLeaderId === leaderId
    };
  }

  setActiveLeader(leaderId) {
    if (!LEADERS_DATA[leaderId]) return;
    if (!this.leaders[leaderId] || !this.leaders[leaderId].unlocked) {
      showToast('¡Debes reclutar a este líder en el Gacha antes de asignarlo!');
      return;
    }
    this.activeLeaderId = leaderId;
    window.soundEngine.playFanfareLevelUp();
    showToast(`👑 ¡${LEADERS_DATA[leaderId].name} asignado como Comandante Supremo de RAYTON!`);
    this.saveState();
    updateUI();
    if (typeof renderGachaModal === 'function') renderGachaModal();
  }

  upgradeLeader(leaderId) {
    const info = this.getLeaderInfo(leaderId);
    if (!info || !info.unlocked) return;
    if (info.level >= 10) {
      showToast('¡Este líder ya ha alcanzado el Nivel Máximo (Nv. 10)!');
      return;
    }
    if (info.shards < info.shardsNeeded) {
      showToast(`¡Necesitas ${info.shardsNeeded - info.shards} fragmentos más para mejorar a este líder!`);
      return;
    }
    if (this.respect < info.upgradeCostRespect) {
      showToast(`¡Respeto insuficiente! Necesitas ${info.upgradeCostRespect.toLocaleString()} 🔥`);
      return;
    }

    this.respect -= info.upgradeCostRespect;
    this.leaders[leaderId].shards -= info.shardsNeeded;
    this.leaders[leaderId].level += 1;

    window.soundEngine.playFanfareLevelUp();
    showToast(`⚡ ¡${info.name} ascendió a Nivel ${this.leaders[leaderId].level}! +HP y +DPS aumentados.`);
    this.saveState();
    updateUI();
    if (typeof renderGachaModal === 'function') renderGachaModal();
  }

  rollGacha(pullCount, currency) {
    const singleCostGems = 50;
    const multiCostGems = 450;
    const singleCostRespect = 2500;
    const multiCostRespect = 22500;

    let totalCost = 0;
    if (currency === 'gems') {
      totalCost = pullCount === 1 ? singleCostGems : multiCostGems;
      if (this.gems < totalCost) {
        showToast(`¡Gemas insuficientes! Necesitas ${totalCost} 💎 Gemas de Honor.`);
        return null;
      }
      this.gems -= totalCost;
    } else {
      totalCost = pullCount === 1 ? singleCostRespect : multiCostRespect;
      if (this.respect < totalCost) {
        showToast(`¡Respeto insuficiente! Necesitas ${totalCost.toLocaleString()} 🔥 de Respeto.`);
        return null;
      }
      this.respect -= totalCost;
    }

    const results = [];
    if (window.soundEngine.playGachaRoll) window.soundEngine.playGachaRoll();

    for (let i = 0; i < pullCount; i++) {
      const allKeys = Object.keys(LEADERS_DATA);
      const legendaries = allKeys.filter(k => LEADERS_DATA[k].rarity === 'legendary');
      const epics = allKeys.filter(k => LEADERS_DATA[k].rarity === 'epic');

      let pickedKey = 'ren';
      if (Math.random() < 0.28) {
        pickedKey = legendaries[Math.floor(Math.random() * legendaries.length)];
      } else {
        pickedKey = epics[Math.floor(Math.random() * epics.length)];
      }

      // Multi-pull guaranteed 5-star
      if (pullCount === 10 && i === 9 && !results.some(r => r.rarity === 'legendary')) {
        pickedKey = legendaries[Math.floor(Math.random() * legendaries.length)];
      }

      const leaderData = LEADERS_DATA[pickedKey];
      const state = this.leaders[pickedKey];
      let isNew = false;
      let shardsAwarded = 0;

      if (!state.unlocked) {
        state.unlocked = true;
        isNew = true;
        shardsAwarded = 0;
      } else {
        isNew = false;
        shardsAwarded = leaderData.rarity === 'legendary' ? 6 : 4;
        state.shards += shardsAwarded;
      }

      results.push({
        leader: leaderData,
        isNew: isNew,
        shardsAwarded: shardsAwarded,
        rarity: leaderData.rarity,
        stars: leaderData.stars
      });
    }

    this.saveState();
    updateUI();
    return results;
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
        weather: this.weather,
        yen: this.yen,
        respect: this.respect,
        darkElixir: this.darkElixir,
        gems: this.gems,
        trophies: this.trophies,
        buildings: this.buildings,
        obstacles: this.obstacles,
        army: this.army,
        spells: this.spells,
        clanTroops: this.clanTroops,
        activeLeaderId: this.activeLeaderId,
        leaders: this.leaders,
        trainingQueue: this.trainingQueue,
        japanTerritories: this.japanTerritories,
        japanTaxesAccumulated: this.japanTaxesAccumulated,
        selectedRiskTerritory: this.selectedRiskTerritory
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
        this.theme = parsed.theme ?? 'urban';
        this.weather = parsed.weather ?? 'rain';
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
        if (parsed.activeLeaderId && LEADERS_DATA[parsed.activeLeaderId]) {
          this.activeLeaderId = parsed.activeLeaderId;
        }
        if (parsed.trainingQueue) this.trainingQueue = parsed.trainingQueue;
        if (parsed.japanTerritories) {
          this.japanTerritories = Object.assign({}, this.japanTerritories, parsed.japanTerritories);
        }
        if (parsed.japanTaxesAccumulated) {
          this.japanTaxesAccumulated = parsed.japanTaxesAccumulated;
        }
        if (parsed.selectedRiskTerritory) {
          this.selectedRiskTerritory = parsed.selectedRiskTerritory;
        }
        if (parsed.leaders) {
          this.leaders = Object.assign({
            ren: { unlocked: true, level: 1, shards: 0 },
            kaito: { unlocked: false, level: 1, shards: 0 },
            aoi: { unlocked: false, level: 1, shards: 0 },
            tora: { unlocked: false, level: 1, shards: 0 },
            ryu: { unlocked: false, level: 1, shards: 0 },
            kurogane: { unlocked: false, level: 1, shards: 0 },
            daiki: { unlocked: false, level: 1, shards: 0 },
            gen: { unlocked: false, level: 1, shards: 0 },
            hana: { unlocked: false, level: 1, shards: 0 },
            kazuki: { unlocked: false, level: 1, shards: 0 },
            shin: { unlocked: false, level: 1, shards: 0 },
            yukiko: { unlocked: false, level: 1, shards: 0 }
          }, parsed.leaders);
        }
      }
    } catch (e) {
      console.warn('LocalStorage load failed', e);
    }
  }

  resetGame() {
    localStorage.removeItem('rayton_clash_data');
    this.theme = 'urban';
    this.weather = 'rain';
    this.yen = 5400;
    this.respect = 3800;
    this.darkElixir = 750;
    this.gems = 320;
    this.trophies = 480;
    this.activeLeaderId = 'ren';
    this.trainingQueue = [];
    this.japanTerritories = {};
    for (const [id, def] of Object.entries(JAPAN_TERRITORIES_DEF)) {
      this.japanTerritories[id] = {
        owner: def.owner,
        garrison: def.garrison,
        conqueredAt: def.owner === 'rayton' ? Date.now() : null
      };
    }
    this.selectedRiskTerritory = 'yokohama';
    this.japanTaxesAccumulated = { yen: 0, respect: 0 };
    this.leaders = {
      ren: { unlocked: true, level: 1, shards: 0 },
      kaito: { unlocked: false, level: 1, shards: 0 },
      aoi: { unlocked: false, level: 1, shards: 0 },
      tora: { unlocked: false, level: 1, shards: 0 },
      ryu: { unlocked: false, level: 1, shards: 0 },
      kurogane: { unlocked: false, level: 1, shards: 0 },
      daiki: { unlocked: false, level: 1, shards: 0 },
      gen: { unlocked: false, level: 1, shards: 0 },
      hana: { unlocked: false, level: 1, shards: 0 },
      kazuki: { unlocked: false, level: 1, shards: 0 },
      shin: { unlocked: false, level: 1, shards: 0 },
      yukiko: { unlocked: false, level: 1, shards: 0 }
    };
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
      { id: 'obs_1', type: 'concrete_block', x: 2, y: 6 },
      { id: 'obs_2', type: 'scrap_metal', x: 14, y: 3 },
      { id: 'obs_3', type: 'oil_barrel', x: 13, y: 13 },
      { id: 'obs_4', type: 'cargo_crate', x: 2, y: 14 },
      { id: 'obs_5', type: 'gem_stash', x: 6, y: 2 }
    ];
    this.saveState();
    updateUI();
    showToast('¡Distrito urbano de RAYTON restablecido por completo!');
  }

  // ------------------------------------------------------------------------
  // JAPAN TERRITORIAL CONQUEST (RISK SYSTEM) METHODS
  // ------------------------------------------------------------------------

  getConquestCount() {
    let count = 0;
    for (const [id, t] of Object.entries(this.japanTerritories)) {
      if (t.owner === 'rayton') count++;
    }
    return count;
  }

  getConquestPct() {
    const total = Object.keys(JAPAN_TERRITORIES_DEF).length;
    return Math.round((this.getConquestCount() / total) * 100);
  }

  isRegionFullyOwned(regionId) {
    const region = JAPAN_REGIONS[regionId];
    if (!region) return false;
    return region.territories.every(tid => this.japanTerritories[tid] && this.japanTerritories[tid].owner === 'rayton');
  }

  getActiveRegionalBonuses() {
    const bonuses = [];
    for (const [rid, rdef] of Object.entries(JAPAN_REGIONS)) {
      if (this.isRegionFullyOwned(rid)) {
        bonuses.push(rdef);
      }
    }
    return bonuses;
  }

  conquerTerritory(territoryId) {
    const def = JAPAN_TERRITORIES_DEF[territoryId];
    if (!def) return;
    if (!this.japanTerritories[territoryId]) {
      this.japanTerritories[territoryId] = { owner: 'enemy', garrison: def.garrison };
    }
    const wasAlreadyOwned = this.japanTerritories[territoryId].owner === 'rayton';
    this.japanTerritories[territoryId].owner = 'rayton';
    this.japanTerritories[territoryId].conqueredAt = Date.now();
    this.japanTerritories[territoryId].garrison = Math.max(15, this.japanTerritories[territoryId].garrison);

    if (!wasAlreadyOwned) {
      if (window.soundEngine.playConquestFanfare) window.soundEngine.playConquestFanfare();
      showToast(`🗾 ¡PROVINCIA CONQUISTADA: ${def.name.toUpperCase()}! ¡El imperio de RAYTON se expande!`);
      this.saveState();

      // Check for Total Japan Conquest (100% Risk)
      if (this.getConquestCount() >= Object.keys(JAPAN_TERRITORIES_DEF).length) {
        setTimeout(() => {
          this.triggerShogunTotalVictory();
        }, 1200);
      }
    }
  }

  triggerShogunTotalVictory() {
    if (window.soundEngine.playConquestFanfare) window.soundEngine.playConquestFanfare();
    const modal = document.getElementById('japan-conquest-victory-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
    this.gems += 1000;
    this.yen = Math.min(this.maxYen, this.yen + 150000);
    this.respect = Math.min(this.maxRespect, this.respect + 80000);
    this.saveState();
    updateUI();
  }

  collectJapanTaxes() {
    const amountYen = Math.round(this.japanTaxesAccumulated.yen || 0);
    const amountRespect = Math.round(this.japanTaxesAccumulated.respect || 0);
    if (amountYen <= 0 && amountRespect <= 0) {
      showToast('No hay tributos acumulados todavía. Tus territorios generan impuestos continuamente.');
      return;
    }

    this.yen = Math.min(this.maxYen, this.yen + amountYen);
    this.respect = Math.min(this.maxRespect, this.respect + amountRespect);
    this.japanTaxesAccumulated = { yen: 0, respect: 0 };
    window.soundEngine.playCoinCollect();
    this.addFloatingText(`+¥${amountYen.toLocaleString()}`, window.innerWidth / 2, window.innerHeight / 2, '#fbbf24');
    showToast(`💰 ¡Tributos Recaudados! +¥ ${amountYen.toLocaleString()} | +${amountRespect.toLocaleString()} 🔥`);
    this.saveState();
    updateUI();
    if (typeof renderJapanRiskMap === 'function') renderJapanRiskMap();
  }

  reinforceTerritory(territoryId) {
    const t = this.japanTerritories[territoryId];
    if (!t || t.owner !== 'rayton') {
      showToast('¡Solo puedes reforzar provincias dominadas por tu banda!');
      return;
    }
    if (this.getArmyCount() < 5) {
      showToast('¡Necesitas al menos 5 tropas en tus campamentos para transferir guarnición!');
      return;
    }
    let transferred = 0;
    for (const [id, count] of Object.entries(this.army)) {
      const take = Math.min(count, 5 - transferred);
      this.army[id] -= take;
      transferred += take;
      if (transferred >= 5) break;
    }
    t.garrison += 5;
    window.soundEngine.playDeploy();
    showToast(`🛡️ ¡Guarnición reforzada! +5 defensores estacionados en ${JAPAN_TERRITORIES_DEF[territoryId].name}`);
    this.saveState();
    updateUI();
    if (typeof renderJapanRiskMap === 'function') renderJapanRiskMap();
  }

  // ------------------------------------------------------------------------
  // RECRUITMENT QUEUE WITH TIME METHODS
  // ------------------------------------------------------------------------

  enqueueTroop(troopId, isDark = false) {
    const t = TROOP_TYPES[troopId];
    if (!t) return;
    const queuedHousing = this.trainingQueue.reduce((sum, item) => {
      const def = TROOP_TYPES[item.troopId];
      return sum + (def ? def.housing : 1);
    }, 0);

    if (this.getArmyCount() + queuedHousing + t.housing > this.getArmyCapacity()) {
      showToast('¡Campamentos y cola de reclutamiento al máximo de capacidad!');
      return;
    }

    if (isDark) {
      if (this.darkElixir < t.costDark) {
        showToast('¡No tienes suficiente Esencia Sombría 🧪!');
        return;
      }
      this.darkElixir -= t.costDark;
    } else {
      if (this.respect < t.costRespect) {
        showToast('¡No tienes suficiente Respeto 🔥!');
        return;
      }
      this.respect -= t.costRespect;
    }

    // Regional bonus: Hokkaido gives -30% training time!
    let durationSeconds = t.trainTime || 5;
    if (this.isRegionFullyOwned('hokkaido')) {
      durationSeconds = Math.max(1, Math.round(durationSeconds * 0.7));
    }

    const durationMs = durationSeconds * 1000;
    const newItem = {
      queueId: Date.now() + Math.random(),
      troopId: troopId,
      isDark: isDark,
      costRespect: t.costRespect || 0,
      costDark: t.costDark || 0,
      totalMs: durationMs,
      remainingMs: durationMs
    };

    this.trainingQueue.push(newItem);
    if (window.soundEngine.playRecruitStart) window.soundEngine.playRecruitStart();
    showToast(`⏳ Reclutando ${t.name}... (${durationSeconds}s)`);
    this.saveState();
    updateUI();
    if (typeof renderBarracks === 'function') renderBarracks(isDark ? 'dark' : 'troops');
  }

  updateTrainingQueue(dt) {
    if (!this.trainingQueue || this.trainingQueue.length === 0) return;
    const active = this.trainingQueue[0];
    active.remainingMs -= dt;

    if (active.remainingMs <= 0) {
      const t = TROOP_TYPES[active.troopId];
      this.army[active.troopId] = (this.army[active.troopId] || 0) + 1;
      this.trainingQueue.shift();

      if (window.soundEngine.playRecruitFinish) window.soundEngine.playRecruitFinish();
      this.addFloatingText(`+1 ${t ? t.icon : '🥋'} ¡Listo!`, canvas.width / 2, canvas.height / 3, '#10b981');
      showToast(`✅ ¡${t ? t.name : 'Tropa'} reclutado y listo para la guerra!`);
      this.saveState();
      updateUI();

      const barracksModal = document.getElementById('barracks-modal');
      if (barracksModal && !barracksModal.classList.contains('hidden') && typeof renderRecruitmentQueue === 'function') {
        renderRecruitmentQueue();
      }
    } else {
      const barracksModal = document.getElementById('barracks-modal');
      if (barracksModal && !barracksModal.classList.contains('hidden') && typeof renderRecruitmentQueue === 'function') {
        renderRecruitmentQueue();
      }
    }
  }

  speedUpTrainingWithGems() {
    if (this.trainingQueue.length === 0) return;
    if (this.gems < 2) {
      showToast('¡Necesitas al menos 2 Gemas de Honor 💎 para acelerar la cola!');
      return;
    }
    this.gems -= 2;
    this.trainingQueue.forEach(item => {
      this.army[item.troopId] = (this.army[item.troopId] || 0) + 1;
    });
    const totalTrained = this.trainingQueue.length;
    this.trainingQueue = [];
    if (window.soundEngine.playFanfareLevelUp) window.soundEngine.playFanfareLevelUp();
    showToast(`⚡ ¡Aceleración completada! ${totalTrained} tropas listas al instante.`);
    this.saveState();
    updateUI();
    if (typeof renderRecruitmentQueue === 'function') renderRecruitmentQueue();
    if (typeof renderBarracks === 'function') renderBarracks('troops');
  }

  cancelTrainingQueueItem(queueId) {
    const idx = this.trainingQueue.findIndex(q => q.queueId === queueId);
    if (idx === -1) return;
    const item = this.trainingQueue[idx];
    if (item.isDark) {
      this.darkElixir = Math.min(this.maxDarkElixir, this.darkElixir + item.costDark);
    } else {
      this.respect = Math.min(this.maxRespect, this.respect + item.costRespect);
    }
    this.trainingQueue.splice(idx, 1);
    showToast('Reclutamiento cancelado. Recursos reembolsados.');
    this.saveState();
    updateUI();
    if (typeof renderRecruitmentQueue === 'function') renderRecruitmentQueue();
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

      // Accumulate Japan Regional Taxes continuously
      let taxIncYen = 0;
      let taxIncRespect = 0;
      for (const [id, state] of Object.entries(this.japanTerritories)) {
        if (state.owner === 'rayton' && JAPAN_TERRITORIES_DEF[id]) {
          const tDef = JAPAN_TERRITORIES_DEF[id];
          taxIncYen += (tDef.incomeYen || 150) * 0.08;
          taxIncRespect += (tDef.incomeRespect || 75) * 0.08;
        }
      }
      if (this.isRegionFullyOwned('kanto')) taxIncYen *= 1.25;

      this.japanTaxesAccumulated.yen = (this.japanTaxesAccumulated.yen || 0) + taxIncYen;
      this.japanTaxesAccumulated.respect = (this.japanTaxesAccumulated.respect || 0) + taxIncRespect;

      updateUI();
    }, 2500);

    // Live Recruitment Queue Tick Loop (Runs every 200ms)
    setInterval(() => {
      this.updateTrainingQueue(200);
    }, 200);

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

  toggleWeather() {
    const modes = ['rain', 'sakura', 'neon', 'clear'];
    const curIdx = modes.indexOf(this.weather || 'rain');
    this.weather = modes[(curIdx + 1) % modes.length];
    if (window.soundEngine && window.soundEngine.playWeatherSwitch) {
      window.soundEngine.playWeatherSwitch();
    }
    const weatherIcons = { rain: '🌧️', sakura: '🌸', neon: '⚡', clear: '☀️' };
    const weatherNames = {
      rain: '🌧️ Lluvia Callejera Tokio (Asfalto Mojado y Reflejos)',
      sakura: '🌸 Brisa Nocturna Sakura (Pétalos de Cerezo Flotantes)',
      neon: '⚡ Noche Cibernética Neón (Aura Violeta y Resplandor)',
      clear: '☀️ Cielo Despejado de Metrópolis'
    };
    const btn = document.getElementById('btn-weather-toggle');
    if (btn) btn.textContent = weatherIcons[this.weather] || '🌧️';
    showToast(weatherNames[this.weather] || 'Clima modificado');
    this.saveState();
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
// ==========================================================================
// GEOMETRIC 2.5D ARCHITECTURAL BUILDING MODELS (NO CUBES!)
// ==========================================================================

function drawBuilding(bldg, isRaid = false) {
  const def = BUILDING_TYPES[bldg.type];
  if (!def) return;

  const w = def.w;
  const h = def.h;
  const origin = gridToScreen(bldg.x, bldg.y);
  const rightCorner = gridToScreen(bldg.x + w, bldg.y);
  const bottomCorner = gridToScreen(bldg.x + w, bldg.y + h);
  const leftCorner = gridToScreen(bldg.x, bldg.y + h);
  const centerPt = gridToScreen(bldg.x + w / 2, bldg.y + h / 2);
  const cx = centerPt.x;
  const cy = centerPt.y;

  // 1. Selected Building Bounding Box & Ground Aura
  if (!isRaid && game.selectedBuilding && game.selectedBuilding.id === bldg.id) {
    ctx.save();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
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

  // 2. Realistic Ground Shadow
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.ellipse(cx, cy + (h * TILE_H) / 2.4, (w * TILE_W) / 2.1, (h * TILE_H) / 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 3. RENDER CUSTOM GEOMETRIC MODEL BASED ON BUILDING TYPE
  const bType = bldg.type;

  // ------------------------------------------------------------------------
  // A. HQ / CUARTEL GENERAL (PAGODA FORTALEZA URBANA TOKIO)
  // ------------------------------------------------------------------------
  if (bType === 'hq') {
    const baseH = 22;
    const midH = 48;
    const topH = 74;

    // Stone rampart foundation (Shiro-kabe)
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y - baseH);
    ctx.lineTo(rightCorner.x, rightCorner.y - baseH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y - baseH);
    ctx.lineTo(leftCorner.x, leftCorner.y - baseH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Foundation side faces
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(leftCorner.x, leftCorner.y - baseH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y - baseH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(rightCorner.x, rightCorner.y - baseH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y - baseH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y);
    ctx.lineTo(rightCorner.x, rightCorner.y);
    ctx.closePath();
    ctx.fill();

    // Double entrance doors with iron crossbars & studs
    ctx.fillStyle = '#78350f';
    ctx.fillRect(cx - 10, cy - baseH + 2, 20, 14);
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - 10, cy - baseH + 2, 20, 14);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(cx - 1, cy - baseH + 7, 2, 4);

    // Tier 1 Timber Walls (Red lacquer & Gold Shoji Grid)
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(origin.x + 8, origin.y - midH);
    ctx.lineTo(rightCorner.x - 8, rightCorner.y - midH);
    ctx.lineTo(bottomCorner.x - 8, bottomCorner.y - midH);
    ctx.lineTo(leftCorner.x + 8, leftCorner.y - midH);
    ctx.closePath();
    ctx.fill();

    // Flared Curved Pagoda Eaves (Tier 1 Irimoya Roof)
    ctx.fillStyle = '#1e1b4b';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - midH - 12);
    ctx.quadraticCurveTo(cx - 42, cy - midH + 4, cx - 48, cy - midH + 2);
    ctx.lineTo(cx + 48, cy - midH + 2);
    ctx.quadraticCurveTo(cx + 42, cy - midH + 4, cx, cy - midH - 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Tier 2 Tower Room
    ctx.fillStyle = '#b45309';
    ctx.fillRect(cx - 16, cy - topH + 8, 32, 18);
    ctx.strokeStyle = '#fbbf24';
    ctx.strokeRect(cx - 16, cy - topH + 8, 32, 18);

    // Shoji Windows
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(cx - 11, cy - topH + 11, 8, 8);
    ctx.fillRect(cx + 3, cy - topH + 11, 8, 8);

    // Top Pagoda Roof with flared hip
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - topH - 16);
    ctx.quadraticCurveTo(cx - 30, cy - topH + 2, cx - 34, cy - topH);
    ctx.lineTo(cx + 34, cy - topH);
    ctx.quadraticCurveTo(cx + 30, cy - topH + 2, cx, cy - topH - 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Golden Roof Ridge Ornament (Shachihoko) & Gang War Banner
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(cx, cy - topH - 18, 5, 0, Math.PI * 2);
    ctx.fill();

    // Flagpole with waving RAYTON war flag
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - topH - 18);
    ctx.lineTo(cx, cy - topH - 36);
    ctx.stroke();

    const flagWave = Math.sin(Date.now() / 180) * 3;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(cx, cy - topH - 36);
    ctx.lineTo(cx + 16, cy - topH - 32 + flagWave);
    ctx.lineTo(cx, cy - topH - 26);
    ctx.closePath();
    ctx.fill();
    ctx.font = 'bold 8px Russo One, sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText('雷', cx + 6, cy - topH - 30 + flagWave * 0.5);
  }

  // ------------------------------------------------------------------------
  // B. CAÑÓN DE ASEDIO (CYLINDRICAL TURRET & TAPERED GUN BARREL)
  // ------------------------------------------------------------------------
  else if (bType === 'cannon') {
    // Cast-iron circular turntable base
    ctx.save();
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Rivet studs around base
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
      const rx = cx + Math.cos(a) * 20;
      const ry = cy + Math.sin(a) * 10;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(rx, ry, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Heavy dark steel carriage brackets
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 14, cy - 14, 8, 14);
    ctx.fillRect(cx + 6, cy - 14, 8, 14);

    // Cannon Barrel (Angled upwards with 3D metallic gradient)
    const barrelAngle = -0.55; // ~32 degrees upwards
    ctx.save();
    ctx.translate(cx, cy - 8);
    ctx.rotate(barrelAngle);

    // Barrel Body
    const grad = ctx.createLinearGradient(0, -7, 0, 7);
    grad.addColorStop(0, '#94a3b8');
    grad.addColorStop(0.4, '#475569');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(-8, -6, 34, 12);

    // Brass Muzzle Band
    ctx.fillStyle = '#d97706';
    ctx.fillRect(22, -7.5, 4, 15);

    // Dark Bore Hole
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.ellipse(26, 0, 2.5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Trunnion axle cap
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(cx - 10, cy - 8, 4, 0, Math.PI * 2);
    ctx.arc(cx + 10, cy - 8, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ------------------------------------------------------------------------
  // C. TORRE DE VIGÍAS (4-LEGGED WOODEN TRESTLE SCAFFOLDING TOWER)
  // ------------------------------------------------------------------------
  else if (bType === 'watchtower') {
    const towerH = 55;
    const p1 = gridToScreen(bldg.x + 0.3, bldg.y + 0.3);
    const p2 = gridToScreen(bldg.x + w - 0.3, bldg.y + 0.3);
    const p3 = gridToScreen(bldg.x + w - 0.3, bldg.y + h - 0.3);
    const p4 = gridToScreen(bldg.x + 0.3, bldg.y + h - 0.3);

    // Corner concrete footings
    ctx.fillStyle = '#64748b';
    [p1, p2, p3, p4].forEach(p => {
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, 5, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4 Angled Stilt Legs
    const deckPt = { x: cx, y: cy - towerH };
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(cx - 14, cy - towerH + 2);
    ctx.moveTo(p2.x, p2.y); ctx.lineTo(cx + 14, cy - towerH + 2);
    ctx.moveTo(p4.x, p4.y); ctx.lineTo(cx - 16, cy - towerH + 4);
    ctx.moveTo(p3.x, p3.y); ctx.lineTo(cx + 16, cy - towerH + 4);
    ctx.stroke();

    // Diagonal X-Truss Braces
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Mid level cross
    const midY = cy - towerH / 2;
    ctx.moveTo(p4.x, p4.y - 4); ctx.lineTo(cx + 14, midY);
    ctx.moveTo(p3.x, p3.y - 4); ctx.lineTo(cx - 14, midY);
    ctx.stroke();

    // Elevated Wooden Timber Deck
    ctx.fillStyle = '#92400e';
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy - towerH, 22, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Crenellated Parapet Guardrail
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
      const rx = cx + Math.cos(a) * 20;
      const ry = (cy - towerH) + Math.sin(a) * 9;
      ctx.strokeRect(rx - 2, ry - 10, 4, 10);
    }

    // Archer Sentinel standing inside
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏹', cx, cy - towerH - 8);

    // 4 Canopy Posts & Pagoda Roof
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - 12, cy - towerH - 24, 24, 14);

    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy - towerH - 34);
    ctx.lineTo(cx - 24, cy - towerH - 22);
    ctx.lineTo(cx + 24, cy - towerH - 22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // ------------------------------------------------------------------------
  // D. MORTERO DE CÓCTELES (HEAVY DOME CAULDRON & WIDE TUBE)
  // ------------------------------------------------------------------------
  else if (bType === 'mortar') {
    // Cast-iron base disc with radial cooling fins
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Cauldron Dome
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(cx, cy - 4, 16, Math.PI, 0);
    ctx.closePath();
    ctx.fill();

    // Wide-bore Mortar Tube angled 45 degrees
    ctx.save();
    ctx.translate(cx, cy - 8);
    ctx.rotate(-0.85); // 48 degrees upward
    const gradM = ctx.createLinearGradient(0, -9, 0, 9);
    gradM.addColorStop(0, '#64748b');
    gradM.addColorStop(0.5, '#1e293b');
    gradM.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradM;
    ctx.fillRect(-10, -9, 28, 18);

    // Thick reinforced lip
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(16, -11, 4, 22);

    // Dark Hollow Bore
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.ellipse(20, 0, 3, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Side stack of round demolition shells & molotovs
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx + 14, cy + 4, 4, 0, Math.PI * 2);
    ctx.arc(cx + 18, cy + 1, 4, 0, Math.PI * 2);
    ctx.arc(cx + 16, cy - 3, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // ------------------------------------------------------------------------
  // E. TORRE DE MAGOS (SPIRALING STONE MASONRY & FLOATING CRYSTAL)
  // ------------------------------------------------------------------------
  else if (bType === 'wizard_tower') {
    const tH = 58;

    // Stone Plinth
    ctx.fillStyle = '#312e81';
    ctx.strokeStyle = '#4338ca';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 24, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Tapering Stone Tower Trunk with layered steps
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.moveTo(cx - 18, cy - 2);
    ctx.lineTo(cx - 12, cy - tH + 6);
    ctx.lineTo(cx + 12, cy - tH + 6);
    ctx.lineTo(cx + 18, cy - 2);
    ctx.closePath();
    ctx.fill();

    // Spiral arcane bands
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy - 10); ctx.lineTo(cx + 14, cy - 20);
    ctx.moveTo(cx - 14, cy - 26); ctx.lineTo(cx + 12, cy - 36);
    ctx.stroke();

    // Flared Stone Balcony with Battlements
    ctx.fillStyle = '#312e81';
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy - tH + 4, 18, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Glowing Arcane Runes
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#e879f9';
    ctx.fillText('ᚱ ᛟ ᛉ', cx, cy - tH + 2);

    // Floating Rotating Magical Crystal Orb
    const crystalY = cy - tH - 12 + Math.sin(Date.now() / 220) * 4;
    const crystalRot = (Date.now() / 600) % (Math.PI * 2);

    // Glow Aura
    const glow = ctx.createRadialGradient(cx, crystalY, 2, cx, crystalY, 18);
    glow.addColorStop(0, 'rgba(192, 132, 252, 0.9)');
    glow.addColorStop(0.5, 'rgba(147, 51, 234, 0.4)');
    glow.addColorStop(1, 'rgba(147, 51, 234, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, crystalY, 18, 0, Math.PI * 2);
    ctx.fill();

    // Octahedral Crystal Spire
    ctx.save();
    ctx.translate(cx, crystalY);
    ctx.rotate(crystalRot);
    ctx.fillStyle = '#f0abfc';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(6, 0);
    ctx.lineTo(0, 9);
    ctx.lineTo(-6, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // ------------------------------------------------------------------------
  // F. DEFENSA AÉREA (TRIPOD MOUNT & QUAD-ROCKET LAUNCHER POD)
  // ------------------------------------------------------------------------
  else if (bType === 'air_defense') {
    // Heavy steel tripod base
    ctx.strokeStyle = '#065f46';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 4); ctx.lineTo(cx - 20, cy + 6);
    ctx.moveTo(cx, cy - 4); ctx.lineTo(cx + 20, cy + 6);
    ctx.moveTo(cx, cy - 4); ctx.lineTo(cx, cy - 14);
    ctx.stroke();

    // Turret center swivel
    ctx.fillStyle = '#047857';
    ctx.beginPath();
    ctx.arc(cx, cy - 6, 8, 0, Math.PI * 2);
    ctx.fill();

    // Quad Rocket Launcher Pod Assembly (Angled 45 deg)
    ctx.save();
    ctx.translate(cx, cy - 14);
    ctx.rotate(-0.75); // 45 deg upward

    // Box Pod Frame
    ctx.fillStyle = '#064e3b';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.fillRect(-8, -12, 26, 24);
    ctx.strokeRect(-8, -12, 26, 24);

    // 4 Rocket Launch Tubes with Red Warheads
    const tubePositions = [
      { y: -7 }, { y: -2 }, { y: 3 }, { y: 8 }
    ];
    tubePositions.forEach(pos => {
      // Tube
      ctx.fillStyle = '#022c22';
      ctx.fillRect(0, pos.y - 2.5, 18, 5);
      // Red Warhead Tip
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(18, pos.y - 2.5);
      ctx.lineTo(24, pos.y);
      ctx.lineTo(18, pos.y + 2.5);
      ctx.closePath();
      ctx.fill();
    });
    ctx.restore();

    // Miniature Rotating Radar Antenna
    const radarAngle = (Date.now() / 400) % (Math.PI * 2);
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx - 10, cy - 24, 7, radarAngle, radarAngle + Math.PI);
    ctx.stroke();
  }

  // ------------------------------------------------------------------------
  // G. DESTILADOR OSCURO (OIL DERRICK LATTICE & PUMPJACK WALKING BEAM)
  // ------------------------------------------------------------------------
  else if (bType === 'dark_drill') {
    // Heavy steel frame pad
    ctx.fillStyle = '#2e1065';
    ctx.fillRect(cx - 22, cy - 6, 44, 12);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 22, cy - 6, 44, 12);

    // A-Frame Derrick Lattice
    ctx.strokeStyle = '#581c87';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy); ctx.lineTo(cx, cy - 38);
    ctx.moveTo(cx + 16, cy); ctx.lineTo(cx, cy - 38);
    ctx.stroke();

    // Horizontal truss
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy - 18); ctx.lineTo(cx + 10, cy - 18);
    ctx.stroke();

    // Oscillating Pumpjack Walking Beam
    const beamOsc = Math.sin(Date.now() / 320) * 9;
    ctx.save();
    ctx.translate(cx, cy - 38);
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-18, beamOsc);
    ctx.lineTo(18, -beamOsc);
    ctx.stroke();

    // Counterweight Head
    ctx.fillStyle = '#3b0764';
    ctx.fillRect(-22, beamOsc - 4, 8, 8);
    ctx.restore();

    // Glass Observation Vat with bubbling Dark Elixir
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.fillRect(cx + 10, cy - 24, 12, 22);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx + 10, cy - 24, 12, 22);

    // Glowing Purple Liquid Inside
    const fluidLevel = 14 + Math.sin(Date.now() / 250) * 2;
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(cx + 11, cy - 2 - fluidLevel, 10, fluidLevel);
  }

  // ------------------------------------------------------------------------
  // H. DEPÓSITO OSCURO (OCTAGONAL BUNKER & SWIRLING GLASS SPHERE)
  // ------------------------------------------------------------------------
  else if (bType === 'dark_vault') {
    // Octagonal Bunker Base with hazard warning stripes
    ctx.fillStyle = '#1e1b4b';
    ctx.strokeStyle = '#4c1d95';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Hazard yellow/black collar
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, 22, 11, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glass Containment Sphere with Swirling Dark Elixir
    const sphereY = cy - 18;
    const sphereRadius = 16;
    const sphereGrad = ctx.createRadialGradient(cx - 4, sphereY - 4, 2, cx, sphereY, sphereRadius);
    sphereGrad.addColorStop(0, '#e879f9');
    sphereGrad.addColorStop(0.6, '#7e22ce');
    sphereGrad.addColorStop(1, '#2e1065');

    ctx.fillStyle = sphereGrad;
    ctx.beginPath();
    ctx.arc(cx, sphereY, sphereRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Specular glass shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.beginPath();
    ctx.ellipse(cx - 5, sphereY - 6, 5, 3, -0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // ------------------------------------------------------------------------
  // I. BÓVEDA DE YENES (ARMORED REINFORCED BANK VAULT & GOLD STACKS)
  // ------------------------------------------------------------------------
  else if (bType === 'vault') {
    const vH = 34;

    // Armored Steel Isometric Base
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y - vH);
    ctx.lineTo(rightCorner.x, rightCorner.y - vH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y - vH);
    ctx.lineTo(leftCorner.x, leftCorner.y - vH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Side faces
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(leftCorner.x, leftCorner.y - vH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y - vH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.closePath();
    ctx.fill();

    // Giant Circular Bank Vault Door
    ctx.fillStyle = '#475569';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx - 4, cy - vH + 10, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Vault Door Spoke Wheel Handle
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy - vH + 10); ctx.lineTo(cx + 2, cy - vH + 10);
    ctx.moveTo(cx - 4, cy - vH + 4); ctx.lineTo(cx - 4, cy - vH + 16);
    ctx.stroke();

    // Digital Keypad
    ctx.fillStyle = '#10b981';
    ctx.fillRect(cx + 12, cy - vH + 6, 4, 6);

    // Stacks of Golden Yen Bullion Bars
    ctx.fillStyle = '#f59e0b';
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 0.8;
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const bx = cx - 18 + c * 7;
        const by = cy + 2 - r * 4;
        ctx.fillRect(bx, by, 6, 3);
        ctx.strokeRect(bx, by, 6, 3);
      }
    }
  }

  // ------------------------------------------------------------------------
  // J. PUESTO DE RAMEN (TRADITIONAL WOODEN YATAI WITH NOREN & LANTERNS)
  // ------------------------------------------------------------------------
  else if (bType === 'ramen') {
    // Cedar Platform
    ctx.fillStyle = '#92400e';
    ctx.fillRect(cx - 22, cy - 4, 44, 8);
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 22, cy - 4, 44, 8);

    // 4 Wooden Pillars
    ctx.fillStyle = '#78350f';
    ctx.fillRect(cx - 20, cy - 32, 4, 28);
    ctx.fillRect(cx + 16, cy - 32, 4, 28);

    // Traditional Fabric Noren Curtains (Red and White with Kanji)
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(cx - 18, cy - 28, 36, 12);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ラーメン', cx, cy - 20);

    // Shaded Timber Awning Roof
    ctx.fillStyle = '#451a03';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 38);
    ctx.lineTo(cx - 26, cy - 28);
    ctx.lineTo(cx + 26, cy - 28);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Two Glowing Red Paper Chochin Lanterns (🏮)
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx - 22, cy - 18, 5, 0, Math.PI * 2);
    ctx.arc(cx + 22, cy - 18, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.font = '8px sans-serif';
    ctx.fillText('🏮', cx - 22, cy - 17);
    ctx.fillText('🏮', cx + 22, cy - 17);

    // Steaming Bowl of Ramen on Counter
    ctx.font = '14px sans-serif';
    ctx.fillText('🍜', cx, cy - 8);
  }

  // ------------------------------------------------------------------------
  // K. DOJO / BARRACKS (MARTIAL ARTS HALL WITH SHOJI & TRAINING RACK)
  // ------------------------------------------------------------------------
  else if (bType === 'dojo' || bType === 'barracks') {
    const dH = 36;

    // Timber foundation veranda
    ctx.fillStyle = '#78350f';
    ctx.fillRect(cx - 26, cy - 6, 52, 10);
    ctx.strokeStyle = '#451a03';
    ctx.strokeRect(cx - 26, cy - 6, 52, 10);

    // Main Hall Walls
    ctx.fillStyle = '#451a03';
    ctx.fillRect(cx - 22, cy - dH + 6, 44, 26);

    // Sliding Shoji Paper Screens (Grid)
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(cx - 18, cy - dH + 10, 36, 18);
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.strokeRect(cx - 18, cy - dH + 10, 36, 18);
    // Shoji lattice lines
    ctx.beginPath();
    ctx.moveTo(cx, cy - dH + 10); ctx.lineTo(cx, cy - dH + 28);
    ctx.moveTo(cx - 18, cy - dH + 19); ctx.lineTo(cx + 18, cy - dH + 19);
    ctx.stroke();

    // Flared Tiled Hip-and-Gable Roof (Irimoya style)
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - dH - 12);
    ctx.quadraticCurveTo(cx - 30, cy - dH + 2, cx - 34, cy - dH);
    ctx.lineTo(cx + 34, cy - dH);
    ctx.quadraticCurveTo(cx + 30, cy - dH + 2, cx, cy - dH - 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Weapons Rack on Veranda (Katanas & Bats)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy + 2); ctx.lineTo(cx - 10, cy - 8);
    ctx.moveTo(cx - 12, cy + 2); ctx.lineTo(cx - 6, cy - 8);
    ctx.stroke();
  }

  // ------------------------------------------------------------------------
  // L. CAMPAMENTO MILITAR (CIRCULAR ENCAMPMENT, CANVAS TENTS & CAMPFIRE)
  // ------------------------------------------------------------------------
  else if (bType === 'camp') {
    // Packed-dirt circle
    ctx.fillStyle = '#451a03';
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 28, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Two A-Frame Canvas Military Tents
    ctx.fillStyle = '#166534';
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 1.5;
    // Left Tent
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy - 22);
    ctx.lineTo(cx - 26, cy - 8);
    ctx.lineTo(cx - 6, cy - 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right Tent
    ctx.beginPath();
    ctx.moveTo(cx + 16, cy - 20);
    ctx.lineTo(cx + 6, cy - 6);
    ctx.lineTo(cx + 26, cy - 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Central Stone Campfire with Glowing Embers & Animated Flame
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 2, 7, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    const firePulse = Math.sin(Date.now() / 140) * 3;
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(cx, cy - 2 + firePulse * 0.3, 5 + firePulse * 0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🔥', cx, cy - 3);

    // Roaming Delinquents in Camp
    const troopKeys = Object.keys(game.army).filter(k => game.army[k] > 0);
    troopKeys.slice(0, 3).forEach((tk, idx) => {
      const angle = (Date.now() / 1400) + (idx * (Math.PI * 2 / 3));
      const tx = cx + Math.cos(angle) * 18;
      const ty = cy + Math.sin(angle) * 8;
      ctx.font = '11px sans-serif';
      ctx.fillText(TROOP_TYPES[tk].icon, tx, ty);
    });
  }

  // ------------------------------------------------------------------------
  // M. BARRICADA DE ACERO (URBAN CONCRETE BARRIER WITH HAZARD STRIPES)
  // ------------------------------------------------------------------------
  else if (bType === 'wall') {
    const wallH = 18;
    // Concrete Jersey Barrier Structure
    ctx.fillStyle = '#475569';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y - wallH);
    ctx.lineTo(rightCorner.x, rightCorner.y - wallH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y - wallH);
    ctx.lineTo(leftCorner.x, leftCorner.y - wallH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Side face
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(leftCorner.x, leftCorner.y - wallH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y - wallH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.closePath();
    ctx.fill();

    // Hazard yellow/black chevron warning stripes on front
    ctx.save();
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 3;
    for (let s = -10; s <= 10; s += 8) {
      ctx.beginPath();
      ctx.moveTo(cx + s - 3, cy - wallH + 4);
      ctx.lineTo(cx + s + 3, cy + 2);
      ctx.stroke();
    }
    ctx.restore();

    // Steel rebar / razor spikes on top
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy - wallH); ctx.lineTo(cx - 8, cy - wallH - 5);
    ctx.moveTo(cx, cy - wallH); ctx.lineTo(cx, cy - wallH - 6);
    ctx.moveTo(cx + 8, cy - wallH); ctx.lineTo(cx + 8, cy - wallH - 5);
    ctx.stroke();
  }

  // ------------------------------------------------------------------------
  // N. TRAMPA DE RESORTE (RECESSED STEEL PLATE WITH COMPRESSION COILS)
  // ------------------------------------------------------------------------
  else if (bType === 'spring_trap') {
    // Metallic recessed frame
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Checkered steel treadplate trigger
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 8, cy - 4, 16, 8);
    ctx.strokeStyle = '#38bdf8';
    ctx.strokeRect(cx - 8, cy - 4, 16, 8);

    // Heavy Coiled Springs Underneath
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy); ctx.lineTo(cx - 4, cy - 3); ctx.lineTo(cx - 2, cy); ctx.lineTo(cx, cy - 3);
    ctx.stroke();
  }

  // ------------------------------------------------------------------------
  // O. BOMBA OCULTA (CAST-IRON MINE WITH LED & BURNING FUSE)
  // ------------------------------------------------------------------------
  else if (bType === 'bomb') {
    // Spiked cast-iron sphere embedded in ground
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy - 2, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Flashing red sensor LED
    const ledBlink = Math.floor(Date.now() / 250) % 2 === 0;
    ctx.fillStyle = ledBlink ? '#ef4444' : '#7f1d1d';
    ctx.beginPath();
    ctx.arc(cx, cy - 2, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Burning Spark Fuse
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 11);
    ctx.quadraticCurveTo(cx + 4, cy - 15, cx + 8, cy - 14);
    ctx.stroke();

    // Spark
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(cx + 8, cy - 14, 2 + Math.random() * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // ------------------------------------------------------------------------
  // P. ALTAR DE HÉROE (TWO-TIERED MARBLE PODIUM, CARPET & DELINQUENT THRONE)
  // ------------------------------------------------------------------------
  else if (bType === 'hero_altar') {
    // Tier 1 Marble Dais
    ctx.fillStyle = '#e2e8f0';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 26, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Tier 2 Raised Dais
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.ellipse(cx, cy - 6, 18, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Crimson Velvet Carpet Runner
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(cx - 6, cy - 12, 12, 18);

    // Carved Delinquent Throne
    ctx.fillStyle = '#78350f';
    ctx.fillRect(cx - 10, cy - 26, 20, 16);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 10, cy - 26, 20, 16);

    // Ren Crown Emblem
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('👑', cx, cy - 20);
    ctx.font = 'bold 9px Russo One, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('REN', cx, cy - 30);
  }

  // ------------------------------------------------------------------------
  // Q. DEFAULT / CLAN CASTLE / SPELL FACTORY
  // ------------------------------------------------------------------------
  else {
    const genH = 42;
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y - genH);
    ctx.lineTo(rightCorner.x, rightCorner.y - genH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y - genH);
    ctx.lineTo(leftCorner.x, leftCorner.y - genH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(leftCorner.x, leftCorner.y - genH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y - genH);
    ctx.lineTo(bottomCorner.x, bottomCorner.y);
    ctx.lineTo(leftCorner.x, leftCorner.y);
    ctx.closePath();
    ctx.fill();

    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(def.icon, cx, cy - genH / 1.6);
  }

  // Level Badge (On all permanent structures)
  if (bldg.type !== 'spring_trap' && bldg.type !== 'bomb' && bldg.type !== 'wall') {
    const badgeY = cy - 48;
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(cx - 14, badgeY - 8, 28, 14, 4);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 9px Russo One, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Nv.${bldg.level || 1}`, cx, badgeY - 1);
    ctx.restore();
  }

  // 4. FLOATING RECRUITMENT BADGE OVER BARRACKS / DOJO
  if ((bldg.type === 'dojo' || bldg.type === 'barracks') && !isRaid && game.trainingQueue && game.trainingQueue.length > 0) {
    const activeItem = game.trainingQueue[0];
    const troopDef = TROOP_TYPES[activeItem.troopId];
    const badgeY = cy - 56;
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx - 28, badgeY - 12, 56, 20, 6);
    ctx.fill();
    ctx.stroke();

    // Progress bar inside badge
    const pct = Math.min(1, Math.max(0, 1 - (activeItem.remainingMs / activeItem.totalMs)));
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(cx - 26, badgeY + 4, 52 * pct, 3);

    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const remainingSecs = Math.ceil(activeItem.remainingMs / 1000);
    ctx.fillText(`${troopDef ? troopDef.icon : '⚔️'} ${remainingSecs}s (${game.trainingQueue.length})`, cx, badgeY - 3);
    ctx.restore();
  }

  // Freeze Visual Effect (Spell Freeze CoC)
  if (bldg.frozenUntil && bldg.frozenUntil > Date.now()) {
    ctx.save();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy - 20, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('❄️', cx, cy - 20);
    ctx.restore();
  }

  // Health Bar (During Raid or when damaged)
  if (isRaid || (bldg.currentHp && bldg.currentHp < bldg.maxHp)) {
    const hpPct = Math.max(0, bldg.currentHp / bldg.maxHp);
    const barW = Math.max(34, w * 18);
    const barX = cx - barW / 2;
    const barY = cy - 60;

    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(barX - 1, barY - 1, barW + 2, 6);

    ctx.fillStyle = hpPct > 0.5 ? '#10b981' : hpPct > 0.25 ? '#f59e0b' : '#ef4444';
    ctx.fillRect(barX, barY, barW * hpPct, 4);
  }

  // Floating Collection Icon (In Base Mode)
  if (!isRaid && bldg.stored && bldg.stored > 25) {
    const iconY = cy - 68 + Math.sin(Date.now() / 250) * 4;
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    const collectIcon = bldg.type === 'ramen' ? '🪙' : bldg.type === 'dojo' ? '🔥' : '🧪';
    ctx.fillText(collectIcon, cx, iconY);
  }
}

// ==========================================================================
// DYNAMIC METROPOLIS WEATHER & ATMOSPHERE SYSTEM
// ==========================================================================

const WEATHER_PARTICLE_COUNT = 80;
const weatherParticles = [];
for (let i = 0; i < WEATHER_PARTICLE_COUNT; i++) {
  weatherParticles.push({
    x: Math.random() * 1600,
    y: Math.random() * 1000,
    speed: 6 + Math.random() * 8,
    len: 12 + Math.random() * 16,
    sway: Math.random() * Math.PI * 2,
    size: 2.5 + Math.random() * 3.5,
    rot: Math.random() * Math.PI * 2
  });
}
const weatherSplashes = [];

function renderAtmosphericWeather(ctx) {
  const wMode = game.weather || 'rain';
  if (wMode === 'clear') return;

  const width = canvas.width;
  const height = canvas.height;

  if (wMode === 'rain') {
    ctx.save();
    ctx.strokeStyle = 'rgba(147, 197, 253, 0.42)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    weatherParticles.forEach(p => {
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - 3.5, p.y + p.len);
      p.x -= 1.2;
      p.y += p.speed;
      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * (width + 120);
        if (Math.random() < 0.28) {
          weatherSplashes.push({ x: p.x, y: Math.random() * height, r: 1, alpha: 0.65 });
        }
      }
      if (p.x < -20) p.x = width + 20;
    });
    ctx.stroke();

    // Render asphalt ripple splashes
    for (let i = weatherSplashes.length - 1; i >= 0; i--) {
      const s = weatherSplashes[i];
      ctx.strokeStyle = `rgba(186, 230, 253, ${s.alpha * 0.45})`;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.ellipse(s.x, s.y, s.r * 2.2, s.r * 0.9, 0, 0, Math.PI * 2);
      ctx.stroke();
      s.r += 0.38;
      s.alpha -= 0.038;
      if (s.alpha <= 0) weatherSplashes.splice(i, 1);
    }
    ctx.restore();
  } else if (wMode === 'sakura') {
    ctx.save();
    weatherParticles.forEach(p => {
      p.y += 1.4;
      p.x += Math.sin(p.sway + Date.now() / 700) * 0.9 + 0.35;
      p.rot += 0.02;
      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -10;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = 'rgba(244, 114, 182, 0.85)';
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    ctx.restore();
  } else if (wMode === 'neon') {
    ctx.save();
    // Ambient cyberpunk neon gradient
    const neonGrad = ctx.createRadialGradient(width / 2, height / 2, 60, width / 2, height / 2, width * 0.75);
    neonGrad.addColorStop(0, 'rgba(168, 85, 247, 0.07)');
    neonGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)');
    neonGrad.addColorStop(1, 'rgba(0, 0, 0, 0.18)');
    ctx.fillStyle = neonGrad;
    ctx.fillRect(0, 0, width, height);

    // Floating cyber dust motes
    ctx.fillStyle = 'rgba(6, 182, 212, 0.55)';
    weatherParticles.slice(0, 35).forEach(p => {
      p.y -= 0.6;
      p.x += Math.sin(p.sway + Date.now() / 900) * 0.5;
      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }
}

// Main Render Loop
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const isRaid = game.mode === 'raid';
  const isDefense = game.mode === 'defense';
  const isVillage = game.theme === 'village';

  // Draw Grid Turf (Asphalt Gray City or Mythical Village)
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
        // Tokyo Urban City: High quality asphalt & concrete slabs
        const isStreet = gx === 6 || gx === 17 || gy === 6 || gy === 17;
        if (isStreet) {
          tileColor = (gx + gy) % 2 === 0 ? '#1e2129' : '#242731';
          borderColor = 'rgba(255, 255, 255, 0.08)';
        } else {
          tileColor = (gx + gy) % 2 === 0 ? '#2b2e38' : '#333744';
          borderColor = 'rgba(255, 255, 255, 0.04)';
        }
      }

      drawTile(gx, gy, tileColor, borderColor);

      // Urban City Street Markings (Dashed lines / pedestrian crossings on streets)
      if (!isVillage && !isRaid) {
        const isStreetIntersection = (gx === 6 || gx === 17) && (gy === 6 || gy === 17);
        if (isStreetIntersection) {
          const pt = gridToScreen(gx + 0.5, gy + 0.5);
          ctx.save();
          ctx.fillStyle = 'rgba(250, 204, 21, 0.45)'; // Yellow urban junction marker
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
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

  // Draw Perimeter Urban City or Forest Border
  if (!isRaid && !isDefense) {
    if (isVillage) {
      // Village Pine & Rock perimeter
      for (let i = 0; i < GRID_SIZE; i += 2) {
        const p1 = gridToScreen(i, 0);
        const p2 = gridToScreen(i, GRID_SIZE - 1);
        ctx.font = '16px sans-serif';
        ctx.fillText(i % 4 === 0 ? '🌲' : '🪨', p1.x, p1.y - 6);
        ctx.fillText(i % 4 === 0 ? '🌲' : '🏮', p2.x, p2.y - 6);
      }
    } else {
      // Tokyo Urban Metropolis City Perimeter (Streetlamps with light cones, barriers, dumpsters)
      for (let i = 0; i < GRID_SIZE; i += 2) {
        const p1 = gridToScreen(i, 0);
        const p2 = gridToScreen(i, GRID_SIZE - 1);
        const p3 = gridToScreen(0, i);
        const p4 = gridToScreen(GRID_SIZE - 1, i);

        // Streetlamp soft yellow light aura
        if (i % 6 === 0) {
          ctx.save();
          const lightGrad = ctx.createRadialGradient(p1.x, p1.y, 2, p1.x, p1.y, 24);
          lightGrad.addColorStop(0, 'rgba(253, 224, 71, 0.25)');
          lightGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
          ctx.fillStyle = lightGrad;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, 24, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.font = '15px sans-serif';
        ctx.textAlign = 'center';
        const topProp = i % 6 === 0 ? '🏮' : (i % 4 === 0 ? '🚧' : '🛑');
        const btmProp = i % 6 === 0 ? '🏮' : (i % 4 === 0 ? '🗑️' : '🚏');
        ctx.fillText(topProp, p1.x, p1.y - 6);
        ctx.fillText(btmProp, p2.x, p2.y - 6);
      }
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

  // Render Dynamic Atmospheric Weather (Rain, Sakura petals, Cyber Neon haze)
  renderAtmosphericWeather(ctx);

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
    this.speedMultiplier = 1; // 1x, 2x, 4x speed
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

  deployLeader(gx, gy) {
    this.hasDeployedAtLeastOne = true;
    const leader = game.getActiveLeader();

    if (leader.id === 'kaito' && window.soundEngine.playWhistle) {
      window.soundEngine.playWhistle();
    } else if (leader.id === 'aoi' && window.soundEngine.playHealChime) {
      window.soundEngine.playHealChime();
    } else if (leader.id === 'tora' && window.soundEngine.playBerserkerRoar) {
      window.soundEngine.playBerserkerRoar();
    } else if (leader.id === 'kurogane' && window.soundEngine.playTeleportShadow) {
      window.soundEngine.playTeleportShadow();
    } else {
      window.soundEngine.playHeroRoar();
    }

    this.leaderUnit = {
      id: 'leader_' + leader.id + '_' + Date.now(),
      leaderId: leader.id,
      type: 'leader',
      name: leader.name,
      icon: leader.icon,
      avatar: leader.avatar,
      color: leader.color,
      x: gx,
      y: gy,
      hp: leader.hp,
      maxHp: leader.hp,
      dps: leader.dps,
      speed: leader.speed,
      targetPriority: leader.targetPriority,
      range: leader.id === 'tora' ? 1.0 : (leader.id === 'kurogane' ? 0.8 : 0.9),
      lastAttack: 0,
      isHero: true,
      usedAbility: false,
      jumpsWalls: leader.id === 'ryu',
      invulnerableUntil: 0,
      lastPassiveTick: 0
    };
    this.heroRen = this.leaderUnit; // Legacy alias
    this.troops.push(this.leaderUnit);

    // ========================================================
    // PASSIVE SPECIAL ABILITY ON SPAWN
    // ========================================================
    if (leader.id === 'kaito') {
      // Kaito Shiro: "¡A la Carga, Escuadrón!" -> Spawns with full army bodyguard (6 Novatos + 3 Arqueras)
      for (let i = 0; i < 6; i++) {
        const ox = (Math.random() - 0.5) * 1.6;
        const oy = (Math.random() - 0.5) * 1.6;
        this.deployTroop('brawler', gx + ox, gy + oy);
      }
      for (let i = 0; i < 3; i++) {
        const ox = (Math.random() - 0.5) * 2.0;
        const oy = (Math.random() - 0.5) * 2.0;
        this.deployTroop('archer', gx + ox, gy + oy);
      }
      game.addFloatingText('🪭 ¡ESCUADRÓN KAITO!', gx, gy, '#06b6d4');
      showToast('🪭 ¡Kaito Shiro entra en combate escoltado por un batallón de 6 Novatos y 3 Arqueras!');
    } else if (leader.id === 'ren') {
      game.addFloatingText('👑 ¡PRESENCIA SUPREMA!', gx, gy, '#f59e0b');
      showToast('👑 ¡Ren Kazuma desata su Presencia (+20% Daño a Aliados en Combate)!');
    } else if (leader.id === 'aoi') {
      game.addFloatingText('💚 ¡AURA SANADORA!', gx, gy, '#10b981');
      showToast('💚 ¡Aoi activa su Aura Sanadora Sagrada (+40 HP/s continua en área)!');
    } else if (leader.id === 'tora') {
      game.addFloatingText('🐯 ¡DEMOLICIÓN x3!', gx, gy, '#ef4444');
      showToast('🐯 ¡Tora "El Destructor" entra al asalto con daño x3 contra muros y defensas!');
    } else if (leader.id === 'ryu') {
      game.addFloatingText('🏍️ ¡BŌSŌZOKU!', gx, gy, '#f97316');
      showToast('🏍️ ¡Ryu salta muros a toda velocidad con su bólido bicilíndrico!');
    } else if (leader.id === 'kurogane') {
      game.addFloatingText('🐍 ¡ROBO DE VIDA 35%!', gx, gy, '#8b5cf6');
      showToast('🐍 ¡Kurogane acecha en las sombras drenando un 35% de vida al golpear!');
    }

    // Configure Floating Ability Button for this specific active leader
    const heroBtnWrap = document.getElementById('hero-ability-button-wrap');
    const heroBtn = document.getElementById('btn-hero-ability');
    if (heroBtnWrap && heroBtn) {
      heroBtn.classList.remove('used');
      const avatarImg = heroBtn.querySelector('.hero-ability-avatar');
      if (avatarImg) avatarImg.src = leader.avatar;
      const titleSpan = heroBtn.querySelector('.hero-ability-title');
      if (titleSpan) titleSpan.textContent = leader.abilityName.toUpperCase();
      const descSpan = heroBtn.querySelector('.hero-ability-desc');
      if (descSpan) descSpan.textContent = leader.passiveName;
      heroBtn.title = `${leader.abilityName}: ${leader.abilityDesc}`;
      heroBtnWrap.classList.remove('hidden');
      heroBtnWrap.style.display = 'block';
    }
  }

  // Backwards compatibility alias
  deployHero(gx, gy) {
    this.deployLeader(gx, gy);
  }

  activateLeaderAbility() {
    if (!this.leaderUnit || this.leaderUnit.usedAbility || this.leaderUnit.hp <= 0) return;
    this.leaderUnit.usedAbility = true;

    const leaderId = this.leaderUnit.leaderId;
    const heroBtn = document.getElementById('btn-hero-ability');
    if (heroBtn) {
      heroBtn.classList.add('used');
      heroBtn.title = 'Habilidad ya utilizada en este asalto';
    }

    // 1. Ren Kazuma: Patada Nuclear
    if (leaderId === 'ren') {
      window.soundEngine.playHeroRoar();
      this.leaderUnit.hp = Math.min(this.leaderUnit.maxHp, this.leaderUnit.hp + 700);
      this.leaderUnit.dps *= 2.0;
      this.leaderUnit.speed *= 1.4;

      for (let i = 0; i < 4; i++) {
        const ox = (Math.random() - 0.5) * 1.5;
        const oy = (Math.random() - 0.5) * 1.5;
        this.deployTroop('brawler', this.leaderUnit.x + ox, this.leaderUnit.y + oy);
      }

      this.buildings.forEach(b => {
        if (!b.destroyed && Math.hypot(b.x - this.leaderUnit.x, b.y - this.leaderUnit.y) < 3.2) {
          this.applyDamageToBuilding(b, 450);
        }
      });

      for (let i = 0; i < 18; i++) {
        this.particles.push({
          x: this.leaderUnit.x + (Math.random() - 0.5) * 2.5,
          y: this.leaderUnit.y + (Math.random() - 0.5) * 2.5,
          life: 25,
          color: '#f59e0b'
        });
      }
      game.addFloatingText('⚡ PATADA NUCLEAR!', this.leaderUnit.x, this.leaderUnit.y, '#f59e0b');
      showToast('⚡ ¡¡PATADA NUCLEAR ACTIVADA!! ¡Ren desata furia, cura +700 HP y llama a 4 Novatos!');
    }

    // 2. Kaito Shiro: Refuerzo Táctico (4 Molotov + 1 Tanque)
    else if (leaderId === 'kaito') {
      if (window.soundEngine.playWhistle) window.soundEngine.playWhistle();
      else window.soundEngine.playBattleHorn();

      this.leaderUnit.hp = Math.min(this.leaderUnit.maxHp, this.leaderUnit.hp + 500);

      for (let i = 0; i < 4; i++) {
        const ox = (Math.random() - 0.5) * 1.6;
        const oy = (Math.random() - 0.5) * 1.6;
        this.deployTroop('molotov', this.leaderUnit.x + ox, this.leaderUnit.y + oy);
      }
      this.deployTroop('tank', this.leaderUnit.x + 0.6, this.leaderUnit.y + 0.6);

      for (let i = 0; i < 16; i++) {
        this.particles.push({
          x: this.leaderUnit.x + (Math.random() - 0.5) * 2.2,
          y: this.leaderUnit.y + (Math.random() - 0.5) * 2.2,
          life: 25,
          color: '#06b6d4'
        });
      }
      game.addFloatingText('🚩 REFUERZO TÁCTICO!', this.leaderUnit.x, this.leaderUnit.y, '#06b6d4');
      showToast('🚩 ¡REFUERZO TÁCTICO! ¡Kaito ha llamado a 4 Lanzadores de Molotov y 1 Tanque con Viga!');
    }

    // 3. Aoi "La Curandera": Inyección Adrenalina Divina (+800 HP & Inmunidad Dorada 3.5s)
    else if (leaderId === 'aoi') {
      if (window.soundEngine.playHealChime) window.soundEngine.playHealChime();
      else window.soundEngine.playVictory();

      this.leaderUnit.hp = Math.min(this.leaderUnit.maxHp, this.leaderUnit.hp + 800);
      this.leaderUnit.invulnerableUntil = Date.now() + 3500;

      let healedCount = 0;
      this.troops.forEach(troop => {
        if (troop.hp > 0 && Math.hypot(troop.x - this.leaderUnit.x, troop.y - this.leaderUnit.y) <= 5.5) {
          troop.hp = Math.min(troop.maxHp, troop.hp + 800);
          troop.invulnerableUntil = Date.now() + 3500;
          game.addFloatingText('+800 HP 🛡️ INMUNE', troop.x, troop.y, '#10b981');
          healedCount++;
        }
      });

      for (let i = 0; i < 24; i++) {
        this.particles.push({
          x: this.leaderUnit.x + (Math.random() - 0.5) * 3.5,
          y: this.leaderUnit.y + (Math.random() - 0.5) * 3.5,
          life: 35,
          color: '#10b981'
        });
      }
      game.addFloatingText('💉 ADRENALINA DIVINA!', this.leaderUnit.x, this.leaderUnit.y, '#10b981');
      showToast(`💉 ¡ADRENALINA DIVINA! ¡Aoi cura +800 HP y otorga Invulnerabilidad Dorada de 3.5s a ${healedCount} aliados!`);
    }

    // 4. Tora "El Destructor": Furia Berserker & Terremoto
    else if (leaderId === 'tora') {
      if (window.soundEngine.playBerserkerRoar) window.soundEngine.playBerserkerRoar();
      else window.soundEngine.playHeroRoar();

      this.leaderUnit.hp = Math.min(this.leaderUnit.maxHp, this.leaderUnit.hp + 800);
      this.leaderUnit.dps *= 2.5;
      this.leaderUnit.speed *= 1.8;
      this.leaderUnit.isBerserk = true;

      // Terremoto: Daña defensas en radio 4.2 y las aturde 3.5s
      this.buildings.forEach(b => {
        if (!b.destroyed && Math.hypot(b.x - this.leaderUnit.x, b.y - this.leaderUnit.y) <= 4.2) {
          this.applyDamageToBuilding(b, 350);
          b.frozenUntil = Date.now() + 3500;
        }
      });

      for (let i = 0; i < 22; i++) {
        this.particles.push({
          x: this.leaderUnit.x + (Math.random() - 0.5) * 3.0,
          y: this.leaderUnit.y + (Math.random() - 0.5) * 3.0,
          life: 30,
          color: '#ef4444'
        });
      }
      game.addFloatingText('🔥 FURIA BERSERKER!', this.leaderUnit.x, this.leaderUnit.y, '#ef4444');
      showToast('🔥 ¡FURIA BERSERKER! ¡Tora entra en frenesí x2.5 DPS y hace temblar la tierra aturdiendo defensas!');
    }

    // 5. Ryu "El Dragón Bōsōzoku": Embestida Nitro & Rastro de Fuego
    else if (leaderId === 'ryu') {
      window.soundEngine.playBattleHorn();
      this.leaderUnit.speed *= 1.6;

      if (this.leaderUnit.target && !this.leaderUnit.target.destroyed) {
        this.applyDamageToBuilding(this.leaderUnit.target, 600);
      } else {
        const nearest = this.buildings.find(b => !b.destroyed && Math.hypot(b.x - this.leaderUnit.x, b.y - this.leaderUnit.y) < 4.0);
        if (nearest) this.applyDamageToBuilding(nearest, 600);
      }

      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x: this.leaderUnit.x + (Math.random() - 0.5) * 2.5,
          y: this.leaderUnit.y + (Math.random() - 0.5) * 2.5,
          life: 35,
          color: '#f97316'
        });
      }
      game.addFloatingText('🏍️ NITRO BLAZE!', this.leaderUnit.x, this.leaderUnit.y, '#f97316');
      showToast('🏍️ ¡EMBESTIDA NITRO! ¡Ryu asesta 600 de daño de choque a máxima aceleración!');
    }

    // 6. Kurogane "La Serpiente": Paso Sombrío (Teleport tras la defensa más fuerte)
    else if (leaderId === 'kurogane') {
      if (window.soundEngine.playTeleportShadow) window.soundEngine.playTeleportShadow();
      else window.soundEngine.playSpellCast();

      const defenseBldgs = this.buildings.filter(b => !b.destroyed && (b.type === 'cannon' || b.type === 'watchtower' || b.type === 'wizard_tower' || b.type === 'mortar' || b.type === 'air_defense' || b.type === 'hq'));
      const primeTarget = defenseBldgs.sort((a, b) => (b.level * 1000 + b.currentHp) - (a.level * 1000 + a.currentHp))[0];

      if (primeTarget) {
        this.leaderUnit.x = primeTarget.x;
        this.leaderUnit.y = primeTarget.y;
        this.applyDamageToBuilding(primeTarget, 800);
        this.leaderUnit.hp = Math.min(this.leaderUnit.maxHp, this.leaderUnit.hp + 450);
        game.addFloatingText('🌑 -800 CRÍTICO!', primeTarget.x, primeTarget.y, '#8b5cf6');
      }

      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x: this.leaderUnit.x + (Math.random() - 0.5) * 2.0,
          y: this.leaderUnit.y + (Math.random() - 0.5) * 2.0,
          life: 30,
          color: '#8b5cf6'
        });
      }
      game.addFloatingText('🌑 PASO SOMBRÍO!', this.leaderUnit.x, this.leaderUnit.y, '#8b5cf6');
      showToast('🌑 ¡PASO SOMBRÍO! ¡Kurogane se teletransporta tras la defensa enemiga asestando 800 de daño crítico!');
    }

    // 7. Daiki "El Puño de Acero": Impacto Sísmico & Escudo de Titanio
    else if (leaderId === 'daiki') {
      if (window.soundEngine.playSteelImpact) window.soundEngine.playSteelImpact();
      else window.soundEngine.playPunch();

      this.leaderUnit.hp = Math.min(this.leaderUnit.maxHp + 1000, this.leaderUnit.hp + 1000);
      this.leaderUnit.speed *= 1.4;

      // Terremoto que demuele murallas y defensas en radio 3.5
      this.buildings.forEach(b => {
        if (!b.destroyed && Math.hypot(b.x - this.leaderUnit.x, b.y - this.leaderUnit.y) <= 3.5) {
          const dmg = b.type === 'wall' ? 1400 : 850;
          this.applyDamageToBuilding(b, dmg);
        }
      });

      for (let i = 0; i < 24; i++) {
        this.particles.push({
          x: this.leaderUnit.x + (Math.random() - 0.5) * 3.5,
          y: this.leaderUnit.y + (Math.random() - 0.5) * 3.5,
          life: 30,
          color: '#eab308'
        });
      }
      game.addFloatingText('🥊 IMPACTO SÍSMICO!', this.leaderUnit.x, this.leaderUnit.y, '#eab308');
      showToast('🥊 ¡IMPACTO SÍSMICO! ¡Daiki asesta 850 de daño, pulveriza muros y activa un escudo protector!');
    }

    // 8. Gen "El Artificiero": Lluvia de Napalm Pirotécnica
    else if (leaderId === 'gen') {
      if (window.soundEngine.playBombBarrage) window.soundEngine.playBombBarrage();
      else window.soundEngine.playExplosion();

      const aliveDefenses = this.buildings.filter(b => !b.destroyed);
      for (let i = 0; i < 5; i++) {
        const target = aliveDefenses[Math.floor(Math.random() * aliveDefenses.length)];
        if (target) {
          this.applyDamageToBuilding(target, 500);
          for (let p = 0; p < 8; p++) {
            this.particles.push({
              x: target.x + (Math.random() - 0.5) * 2,
              y: target.y + (Math.random() - 0.5) * 2,
              life: 35,
              color: '#ef4444'
            });
          }
        }
      }
      game.addFloatingText('💣 LLUVIA DE NAPALM!', this.leaderUnit.x, this.leaderUnit.y, '#ef4444');
      showToast('💣 ¡LLUVIA DE NAPALM! ¡Gen lanza 5 bombas incendiarias simultáneas devastando las defensas!');
    }

    // 9. Hana "La Rosa Letal": Vórtice de Cuchillas & Evasión Fantasma
    else if (leaderId === 'hana') {
      if (window.soundEngine.playKatanaSlash) window.soundEngine.playKatanaSlash();
      else window.soundEngine.playWhistle();

      this.leaderUnit.speed *= 2.0;
      this.leaderUnit.isInvulnerableUntil = Date.now() + 4500;

      this.buildings.forEach(b => {
        if (!b.destroyed && Math.hypot(b.x - this.leaderUnit.x, b.y - this.leaderUnit.y) <= 3.2) {
          this.applyDamageToBuilding(b, 650);
        }
      });

      for (let i = 0; i < 22; i++) {
        this.particles.push({
          x: this.leaderUnit.x + (Math.random() - 0.5) * 2.5,
          y: this.leaderUnit.y + (Math.random() - 0.5) * 2.5,
          life: 30,
          color: '#ec4899'
        });
      }
      game.addFloatingText('🌸 VÓRTICE DE CUCHILLAS!', this.leaderUnit.x, this.leaderUnit.y, '#ec4899');
      showToast('🌸 ¡VÓRTICE DE CUCHILLAS! ¡Hana se vuelve inmune durante 4.5s y causa 650 de daño en área!');
    }

    // 10. Kazuki "El Filo Nocturno": Corte Iaido Relámpago
    else if (leaderId === 'kazuki') {
      if (window.soundEngine.playKatanaSlash) window.soundEngine.playKatanaSlash();
      else window.soundEngine.playPunch();

      // Corte en línea hacia el objetivo
      this.buildings.forEach(b => {
        if (!b.destroyed && Math.hypot(b.x - this.leaderUnit.x, b.y - this.leaderUnit.y) <= 4.5) {
          this.applyDamageToBuilding(b, 950);
        }
      });

      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x: this.leaderUnit.x + (Math.random() - 0.5) * 4.0,
          y: this.leaderUnit.y + (Math.random() - 0.5) * 2.0,
          life: 25,
          color: '#6366f1'
        });
      }
      game.addFloatingText('⚡ CORTE IAIDO!', this.leaderUnit.x, this.leaderUnit.y, '#6366f1');
      showToast('⚡ ¡CORTE IAIDO! ¡Kazuki desenvaina en un destello fulminante asestando 950 de daño crítico!');
    }

    // 11. Shin "Ojo de Halcón": Disparo Orbital Perforante
    else if (leaderId === 'shin') {
      if (window.soundEngine.playSniperShot) window.soundEngine.playSniperShot();
      else window.soundEngine.playExplosion();

      const defenseBldgs = this.buildings.filter(b => !b.destroyed && (b.type === 'cannon' || b.type === 'watchtower' || b.type === 'wizard_tower' || b.type === 'mortar' || b.type === 'hq'));
      const highThreat = defenseBldgs.sort((a, b) => b.currentHp - a.currentHp)[0];

      if (highThreat) {
        this.applyDamageToBuilding(highThreat, 1200);
        for (let i = 0; i < 16; i++) {
          this.particles.push({
            x: highThreat.x + (Math.random() - 0.5) * 1.5,
            y: highThreat.y + (Math.random() - 0.5) * 1.5,
            life: 30,
            color: '#0ea5e9'
          });
        }
        game.addFloatingText('🎯 -1200 SNIPER!', highThreat.x, highThreat.y, '#0ea5e9');
        showToast(`🎯 ¡DISPARO ORBITAL! ¡Shin fulmina la defensa enemiga más peligrosa con 1,200 de daño!`);
      } else {
        game.addFloatingText('🎯 DISPARO!', this.leaderUnit.x, this.leaderUnit.y, '#0ea5e9');
      }
    }

    // 12. Yukiko "La Reina de Nieve": Tempestad Glacial
    else if (leaderId === 'yukiko') {
      if (window.soundEngine.playIceStorm) window.soundEngine.playIceStorm();
      else window.soundEngine.playFreezeSpell();

      this.buildings.forEach(b => {
        if (!b.destroyed && Math.hypot(b.x - this.leaderUnit.x, b.y - this.leaderUnit.y) <= 5.5) {
          b.frozenUntil = Date.now() + 6000;
        }
      });

      let healedCount = 0;
      this.troops.forEach(tr => {
        if (!tr.destroyed) {
          tr.hp = Math.min(tr.maxHp, tr.hp + 600);
          healedCount++;
        }
      });

      for (let i = 0; i < 28; i++) {
        this.particles.push({
          x: this.leaderUnit.x + (Math.random() - 0.5) * 5.0,
          y: this.leaderUnit.y + (Math.random() - 0.5) * 5.0,
          life: 40,
          color: '#38bdf8'
        });
      }
      game.addFloatingText('❄️ TEMPESTAD GLACIAL!', this.leaderUnit.x, this.leaderUnit.y, '#38bdf8');
      showToast(`❄️ ¡TEMPESTAD GLACIAL! ¡Yukiko congela defensas en 5.5 casillas por 6s y cura +600 HP a ${healedCount} aliados!`);
    }
  }

  // Backwards compatibility alias
  activateHeroAbility() {
    this.activateLeaderAbility();
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

    // Check Ren Kazuma +20% damage aura
    const isRenAlive = this.leaderUnit && this.leaderUnit.hp > 0 && this.leaderUnit.leaderId === 'ren';

    // Check Aoi "La Curandera" +40 HP/s healing aura (heals troops in 4.5 tiles every 1s)
    if (this.leaderUnit && this.leaderUnit.hp > 0 && this.leaderUnit.leaderId === 'aoi') {
      if (!this.leaderUnit.lastPassiveTick || now - this.leaderUnit.lastPassiveTick > 1000) {
        this.leaderUnit.lastPassiveTick = now;
        this.troops.forEach(t => {
          if (t.hp > 0 && Math.hypot(t.x - this.leaderUnit.x, t.y - this.leaderUnit.y) <= 4.5) {
            if (t.hp < t.maxHp) {
              t.hp = Math.min(t.maxHp, t.hp + 40);
              game.addFloatingText('+40 HP', t.x, t.y, '#10b981');
              this.particles.push({
                x: t.x + (Math.random() - 0.5) * 0.8,
                y: t.y + (Math.random() - 0.5) * 0.8,
                life: 18,
                color: '#10b981'
              });
            }
          }
        });
      }
    }

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

      let effectiveDps = isRaged ? troop.dps * 1.65 : troop.dps;
      if (isRenAlive) effectiveDps *= 1.20; // Ren passive: +20% damage aura
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
        // Deliberate, tactical marching speed (smooth, readable combat pacing)
        const step = (effectiveSpeed * 0.0135);
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

          // Tora "El Destructor" Passive: x3 damage vs walls and defensive structures
          if (troop.leaderId === 'tora' && (troop.target.type === 'wall' || troop.target.type === 'cannon' || troop.target.type === 'watchtower' || troop.target.type === 'wizard_tower' || troop.target.type === 'mortar' || troop.target.type === 'air_defense')) {
            dmg *= 3;
            game.addFloatingText('🐯 DEMOLICIÓN x3!', troop.target.x + tw / 2, troop.target.y + th / 2, '#ef4444');
          }

          this.applyDamageToBuilding(troop.target, dmg);

          // Kurogane "La Serpiente" Passive: 35% Life Steal
          if (troop.leaderId === 'kurogane') {
            const drained = Math.round(dmg * 0.35);
            troop.hp = Math.min(troop.maxHp, troop.hp + drained);
            game.addFloatingText(`+${drained} 🩸`, troop.x, troop.y, '#8b5cf6');
          }

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
            speed: 0.14,
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
            speed: 0.16,
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
            speed: 0.12,
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
            speed: 0.18,
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
              if (t.invulnerableUntil && t.invulnerableUntil > now) {
                game.addFloatingText('🛡️ INMUNE', t.x, t.y, '#facc15');
              } else {
                t.hp -= p.damage;
                game.addFloatingText(`-${Math.round(p.damage)}`, t.x, t.y, '#f59e0b');
              }
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
          if (p.targetTroop.invulnerableUntil && p.targetTroop.invulnerableUntil > now) {
            game.addFloatingText('🛡️ INMUNE', p.targetTroop.x, p.targetTroop.y, '#facc15');
          } else {
            p.targetTroop.hp -= p.damage;
            game.addFloatingText(`-${Math.round(p.damage)}`, p.targetTroop.x, p.targetTroop.y, '#f59e0b');
          }
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
    const totalRemainingToDeploy = Object.values(game.army).reduce((a, b) => a + b, 0) + (this.leaderUnit ? 0 : 1);
    if (this.hasDeployedAtLeastOne && this.troops.length === 0 && (!this.leaderUnit || this.leaderUnit.hp <= 0) && totalRemainingToDeploy === 0 && !this.victoryTriggered) {
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
        if (troop.invulnerableUntil && troop.invulnerableUntil > Date.now()) {
          game.addFloatingText('🛡️ INMUNE', troop.x, troop.y, '#facc15');
          return;
        }
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
            if (t.invulnerableUntil && t.invulnerableUntil > Date.now()) {
              game.addFloatingText('🛡️ INMUNE', t.x, t.y, '#facc15');
            } else {
              t.hp -= 150;
              game.addFloatingText('-150', t.x, t.y, '#ef4444');
            }
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

  toggleSpeed() {
    const speeds = [1, 2, 4];
    const idx = speeds.indexOf(this.speedMultiplier || 1);
    this.speedMultiplier = speeds[(idx + 1) % speeds.length];
    if (window.soundEngine && window.soundEngine.playSpeedSwitch) {
      window.soundEngine.playSpeedSwitch();
    }
    const btn = document.getElementById('btn-raid-speed');
    if (btn) btn.textContent = `⚡ ${this.speedMultiplier}x`;
    showToast(`⚡ Velocidad de combate: ${this.speedMultiplier}x`);
  }

  renderCombat(ctx) {
    const loops = this.speedMultiplier || 1;
    for (let l = 0; l < loops; l++) {
      this.updateCombat();
    }

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

      // Leader Aura
      if (t.isHero) {
        ctx.save();
        ctx.lineWidth = 2.5;
        let ringColor = 'rgba(245, 158, 11, 0.55)';
        if (t.leaderId === 'aoi') ringColor = 'rgba(16, 185, 129, 0.65)';
        else if (t.leaderId === 'kaito') ringColor = 'rgba(6, 182, 212, 0.65)';
        else if (t.leaderId === 'tora') ringColor = 'rgba(239, 68, 68, 0.65)';
        else if (t.leaderId === 'ryu') ringColor = 'rgba(249, 115, 22, 0.65)';
        else if (t.leaderId === 'kurogane') ringColor = 'rgba(139, 92, 246, 0.65)';
        ctx.strokeStyle = ringColor;
        ctx.fillStyle = ringColor.replace('0.65', '0.14').replace('0.55', '0.14');
        ctx.beginPath();
        const pulse = 1 + Math.sin(Date.now() / 240) * 0.16;
        ctx.ellipse(pt.x, pt.y + 4, 18 * pulse, 9 * pulse, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath();
      ctx.ellipse(pt.x, pt.y + 4, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Golden Invulnerability Shield (from Aoi's Divine Adrenaline)
      if (t.invulnerableUntil && t.invulnerableUntil > Date.now()) {
        ctx.save();
        ctx.strokeStyle = '#facc15';
        ctx.fillStyle = 'rgba(253, 224, 71, 0.22)';
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        const drawYShield = t.isFlying ? pt.y - 24 : pt.y - 12;
        ctx.arc(pt.x, drawYShield, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

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

    // Check if this was a Risk Japan Territorial Conquest Raid!
    if (this.baseDef && this.baseDef.territoryId && this.stars > 0) {
      game.conquerTerritory(this.baseDef.territoryId);
      const conquestBanner = document.getElementById('victory-conquest-banner');
      const conquestTitle = document.getElementById('v-conquest-title');
      const conquestSub = document.getElementById('v-conquest-sub');
      if (conquestBanner) {
        if (conquestTitle) conquestTitle.textContent = `¡${(JAPAN_TERRITORIES_DEF[this.baseDef.territoryId]?.name || 'PROVINCIA').toUpperCase()} CONQUISTADA!`;
        if (conquestSub) conquestSub.textContent = `Dominio de Japón ampliado al ${game.getConquestPct()}% (${game.getConquestCount()}/16 Provincias)`;
        conquestBanner.classList.remove('hidden');
        conquestBanner.style.display = 'flex';
      }
    } else {
      const conquestBanner = document.getElementById('victory-conquest-banner');
      if (conquestBanner) {
        conquestBanner.classList.add('hidden');
        conquestBanner.style.display = 'none';
      }
    }

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
    this.speedMultiplier = 1; // 1x, 2x, 4x simulation speed
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

    // Active Leader Altar Defender
    const altar = this.buildings.find(b => b.type === 'hero_altar' && !b.destroyed);
    if (altar) {
      const leader = game.getActiveLeader();
      this.alliedTroops.push({
        id: 'def_leader_' + leader.id,
        leaderId: leader.id,
        type: 'leader',
        name: `${leader.name} (Defensor)`,
        icon: leader.icon,
        x: altar.x + 1,
        y: altar.y + 1,
        hp: leader.hp,
        maxHp: leader.hp,
        dps: leader.dps,
        speed: leader.speed,
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

  toggleSpeed() {
    const speeds = [1, 2, 4];
    const idx = speeds.indexOf(this.speedMultiplier || 1);
    this.speedMultiplier = speeds[(idx + 1) % speeds.length];
    if (window.soundEngine && window.soundEngine.playSpeedSwitch) {
      window.soundEngine.playSpeedSwitch();
    }
    const btn = document.getElementById('btn-defense-speed');
    if (btn) btn.textContent = `⚡ ${this.speedMultiplier}x`;
    showToast(`⚡ Velocidad de asedio: ${this.speedMultiplier}x`);
  }

  renderDefense(ctx) {
    const loops = this.speedMultiplier || 1;
    for (let l = 0; l < loops; l++) {
      this.updateDefense();
    }

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

  const activeL = game.getActiveLeader();
  const leaderSub = document.getElementById('btn-sub-leader-name');
  if (leaderSub && activeL) {
    leaderSub.textContent = `${activeL.name.split(' ')[0]} (Nv. ${activeL.level})`;
  }

  const hudJapanPct = document.getElementById('hud-japan-conquest-pct');
  if (hudJapanPct) {
    hudJapanPct.textContent = `${game.getConquestPct()}%`;
  }

  updateQuickObjective();
}

function updateQuickObjective() {
  const pill = document.getElementById('quick-objective-pill');
  if (!pill || pill.dataset.dismissed === 'true') return;

  const descEl = document.getElementById('obj-desc');
  const btnEl = document.getElementById('btn-obj-action');
  if (!descEl || !btnEl) return;

  const yenMills = game.buildings.filter(b => b.type === 'yen_post');
  const dojos = game.buildings.filter(b => b.type === 'dojo');
  const armyCount = game.getArmyCount();
  const conquestPct = game.getConquestPct();

  if (yenMills.length === 0) {
    descEl.textContent = 'Construye un Puesto de Yenes para producir fondos de banda.';
    btnEl.textContent = 'Construir';
    btnEl.onclick = () => {
      renderShopCatalog('resources');
      document.getElementById('shop-modal').classList.remove('hidden');
    };
  } else if (dojos.length === 0) {
    descEl.textContent = 'Construye un Dojo para producir Respeto (fuerza de reclutamiento).';
    btnEl.textContent = 'Construir';
    btnEl.onclick = () => {
      renderShopCatalog('resources');
      document.getElementById('shop-modal').classList.remove('hidden');
    };
  } else if (armyCount < 10) {
    descEl.textContent = 'Recluta al menos 10 pandilleros en el Cuartel para tu ejército.';
    btnEl.textContent = 'Entrenar';
    btnEl.onclick = () => {
      renderBarracks('troops');
      document.getElementById('barracks-modal').classList.remove('hidden');
    };
  } else if (conquestPct < 15) {
    descEl.textContent = '¡Tienes tropas listas! Conquista una nueva provincia en el Mapa de Japón.';
    btnEl.textContent = 'Guerra';
    btnEl.onclick = () => {
      renderWarMap();
      showWarTab('japan');
      document.getElementById('war-map-modal').classList.remove('hidden');
    };
  } else {
    descEl.textContent = 'Toca tus defensas y Sede Central para subirlas de nivel.';
    btnEl.textContent = 'Base';
    btnEl.onclick = () => {
      showToast('💡 Toca cualquier edificio para ver opciones de mejora.');
    };
  }
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

  // Always render the Live Recruitment Queue on top!
  renderRecruitmentQueue();

  if (tab === 'troops') {
    // Regular troops trained with Respect
    for (const [id, t] of Object.entries(TROOP_TYPES)) {
      if (t.category !== 'troops') continue;

      const card = document.createElement('div');
      card.className = 'train-card';
      const currentQty = game.army[id] || 0;
      const canTrain = game.respect >= t.costRespect && (game.getArmyCount() + t.housing) <= game.getArmyCapacity();

      // Show real-time train duration
      card.innerHTML = `
        <div class="train-header">
          <span class="train-icon">${t.icon}</span>
          <div>
            <h4 class="train-name">${t.name} (x${currentQty})</h4>
            <div class="train-stats">
              <span>HP: ${t.hp} | DPS: ${t.dps} | Espacio: ${t.housing}</span>
              <span class="train-time-badge" style="color: #38bdf8; margin-left: 6px;">⏱️ ${t.trainTime}s</span>
            </div>
          </div>
        </div>
        <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.3;">${t.desc}</p>
        <div class="train-action-row">
          <span class="train-cost">${t.costRespect} 🔥</span>
          <button class="btn btn-gold btn-sm btn-train-troop" data-id="${id}" ${!canTrain ? 'disabled' : ''}>
            + Reclutar (${t.trainTime}s)
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
              <span class="train-time-badge" style="color: #c084fc; margin-left: 6px;">⏱️ ${t.trainTime}s</span>
            </div>
          </div>
        </div>
        <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.3;">${t.desc}</p>
        <div class="train-action-row">
          <span class="train-cost" style="color: #c084fc;">${t.costDark} 🧪</span>
          <button class="btn btn-purple btn-sm btn-train-dark-troop" data-id="${id}" ${!canTrain ? 'disabled' : ''}>
            + Reclutar Élite (${t.trainTime}s)
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

// ==========================================================================
// RECRUITMENT QUEUE WITH REAL-TIME PROGRESS BAR & COUNTDOWN
// ==========================================================================

function renderRecruitmentQueue() {
  const container = document.getElementById('recruitment-queue-container');
  if (!container) return;

  const queue = game.trainingQueue || [];
  if (queue.length === 0) {
    container.innerHTML = `
      <div class="queue-empty-state">
        <span class="queue-empty-icon">⏳</span>
        <div class="queue-empty-text">
          <h4 style="margin: 0; font-family: var(--font-display); font-size: 0.95rem; color: #fff;">Cola de Reclutamiento Disponible</h4>
          <p style="margin: 2px 0 0 0; font-size: 0.78rem; color: var(--text-muted);">Selecciona tropas para entrenarlas en tiempo real con barra de progreso.</p>
        </div>
      </div>
    `;
    return;
  }

  const active = queue[0];
  const activeDef = TROOP_TYPES[active.troopId];
  const activeSecs = Math.max(1, Math.ceil(active.remainingMs / 1000));
  const progressPct = Math.min(100, Math.max(0, ((active.totalMs - active.remainingMs) / active.totalMs) * 100));

  let queuedHtml = '';
  if (queue.length > 1) {
    queuedHtml = `
      <div class="queue-subsequent-list" style="margin-top: 10px; display: flex; align-items: center; gap: 8px;">
        <span class="queue-subsequent-label" style="font-size: 0.75rem; color: var(--text-muted);">En espera (${queue.length - 1}):</span>
        <div class="queue-items-strip" style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${queue.slice(1).map((item) => {
      const def = TROOP_TYPES[item.troopId];
      return `
              <div class="queue-sub-badge" style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 3px 6px; display: flex; align-items: center; gap: 4px;" title="${def ? def.name : 'Tropa'}">
                <span class="sub-icon">${def ? def.icon : '⚔️'}</span>
                <button class="btn-cancel-queue-item" data-qid="${item.queueId}" style="background: none; border: none; color: #ef4444; font-size: 0.75rem; cursor: pointer; padding: 0 2px;" title="Cancelar y reembolsar">✕</button>
              </div>
            `;
    }).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="queue-active-card">
      <div class="queue-active-header" style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px;">
        <div class="queue-active-info" style="display: flex; align-items: center; gap: 10px;">
          <span class="queue-active-icon" style="font-size: 1.8rem;">${activeDef ? activeDef.icon : '🥋'}</span>
          <div>
            <h4 class="queue-active-name" style="margin: 0; font-family: var(--font-display); font-size: 0.95rem; color: var(--gold-bright);">Entrenando: ${activeDef ? activeDef.name : 'Tropa'}</h4>
            <span class="queue-countdown" id="queue-active-timer" style="font-size: 0.8rem; color: #38bdf8;">⏱️ ${activeSecs}s restantes (${Math.round(progressPct)}%)</span>
          </div>
        </div>
        <div class="queue-actions-inline" style="display: flex; gap: 8px;">
          <button class="btn btn-outline btn-xs" id="btn-cancel-active-training" data-qid="${active.queueId}" title="Cancelar y recuperar recursos" style="padding: 4px 8px; font-size: 0.75rem;">
            ✕ Cancelar
          </button>
          <button class="btn btn-gold btn-xs" id="btn-speedup-training" style="padding: 4px 10px; font-size: 0.75rem;">
            ⚡ Acelerar (2 💎)
          </button>
        </div>
      </div>
      <div class="queue-progress-track" style="height: 6px; background: rgba(0,0,0,0.5); border-radius: 3px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
        <div class="queue-progress-fill" style="width: ${progressPct}%; height: 100%; background: linear-gradient(90deg, #38bdf8, #fbbf24); transition: width 0.2s linear;"></div>
      </div>
    </div>
    ${queuedHtml}
  `;

  const speedBtn = container.querySelector('#btn-speedup-training');
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      game.speedUpTrainingWithGems();
    });
  }

  const cancelActiveBtn = container.querySelector('#btn-cancel-active-training');
  if (cancelActiveBtn) {
    cancelActiveBtn.addEventListener('click', (e) => {
      const qid = parseFloat(e.currentTarget.getAttribute('data-qid'));
      game.cancelTrainingQueueItem(qid);
    });
  }

  container.querySelectorAll('.btn-cancel-queue-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const qid = parseFloat(e.currentTarget.getAttribute('data-qid'));
      game.cancelTrainingQueueItem(qid);
    });
  });
}

function trainTroop(id) {
  game.enqueueTroop(id, false);
}

function trainDarkTroop(id) {
  game.enqueueTroop(id, true);
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

// ==========================================================================
// JAPAN RISK CONQUEST SYSTEM (STRATEGIC MAP & PROVINCE WAR)
// ==========================================================================

function renderWarMap() {
  // Always update Japan Risk map as primary mode
  renderJapanRiskMap();

  // Campaign bases
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

function renderJapanRiskMap() {
  const conquestCount = game.getConquestCount();
  const conquestPct = game.getConquestPct();
  const totalTerritories = Object.keys(JAPAN_TERRITORIES_DEF).length;

  // Top Dominion stats
  const progText = document.getElementById('japan-risk-progress-text');
  if (progText) progText.textContent = `${conquestCount} / ${totalTerritories} Provincias (${conquestPct}%)`;

  const progFill = document.getElementById('japan-risk-progress-fill');
  if (progFill) progFill.style.width = `${conquestPct}%`;

  const hudPct = document.getElementById('hud-japan-conquest-pct');
  if (hudPct) hudPct.textContent = `${conquestPct}%`;

  // Tax Rate & Uncollected Ledger
  const taxRateEl = document.getElementById('japan-risk-tax-rate');
  if (taxRateEl) {
    let rateYen = 0;
    let rateRespect = 0;
    for (const [id, state] of Object.entries(game.japanTerritories)) {
      if (state.owner === 'rayton' && JAPAN_TERRITORIES_DEF[id]) {
        rateYen += (JAPAN_TERRITORIES_DEF[id].incomeYen || 150);
        rateRespect += (JAPAN_TERRITORIES_DEF[id].incomeRespect || 75);
      }
    }
    if (game.isRegionFullyOwned('kanto')) rateYen = Math.round(rateYen * 1.25);
    taxRateEl.textContent = `+¥ ${rateYen.toLocaleString()} / +${rateRespect.toLocaleString()} 🔥 por min`;
  }

  const uncolEl = document.getElementById('japan-uncollected-taxes');
  if (uncolEl) {
    const uncolYen = Math.round(game.japanTaxesAccumulated.yen || 0);
    const uncolResp = Math.round(game.japanTaxesAccumulated.respect || 0);
    uncolEl.textContent = `¥ ${uncolYen.toLocaleString()} | ${uncolResp} 🔥`;
  }

  // Regional Bonuses Ribbon (8 Regions)
  const bonusesContainer = document.getElementById('regional-bonuses-container');
  if (bonusesContainer) {
    bonusesContainer.innerHTML = '';
    for (const [rid, rdef] of Object.entries(JAPAN_REGIONS)) {
      const isOwned = game.isRegionFullyOwned(rid);
      const ownedInRegion = rdef.territories.filter(tid => game.japanTerritories[tid] && game.japanTerritories[tid].owner === 'rayton').length;

      const pill = document.createElement('div');
      pill.className = `region-bonus-pill ${isOwned ? 'active-bonus' : 'locked-bonus'}`;
      pill.innerHTML = `
        <span class="region-crest">${rdef.crest}</span>
        <div class="region-bonus-meta">
          <div class="region-bonus-title-row">
            <strong>${rdef.name}</strong>
            <span class="region-status-tag">${isOwned ? 'ACTIVO' : `${ownedInRegion}/${rdef.territories.length}`}</span>
          </div>
          <span class="region-bonus-desc">${rdef.bonusTitle}</span>
        </div>
      `;
      pill.title = `${rdef.fullName}\nBonus: ${rdef.bonusDesc}`;
      bonusesContainer.appendChild(pill);
    }
  }

  // Render SVG Connections Lines
  const svgLines = document.getElementById('japan-map-svg-lines');
  if (svgLines) {
    svgLines.innerHTML = '';
    const drawnPairs = new Set();
    for (const [tid, tdef] of Object.entries(JAPAN_TERRITORIES_DEF)) {
      (tdef.connections || []).forEach(connId => {
        const pairKey = [tid, connId].sort().join('--');
        if (!drawnPairs.has(pairKey) && JAPAN_TERRITORIES_DEF[connId]) {
          drawnPairs.add(pairKey);
          const target = JAPAN_TERRITORIES_DEF[connId];
          const isRaytonLink = (game.japanTerritories[tid]?.owner === 'rayton') && (game.japanTerritories[connId]?.owner === 'rayton');

          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', `${tdef.coords.x}%`);
          line.setAttribute('y1', `${tdef.coords.y}%`);
          line.setAttribute('x2', `${target.coords.x}%`);
          line.setAttribute('y2', `${target.coords.y}%`);
          line.setAttribute('class', `tactical-connection-line ${isRaytonLink ? 'conquered-line' : 'hostile-line'}`);
          svgLines.appendChild(line);
        }
      });
    }
  }

  // Render 16 Territory Pins
  const pinsOverlay = document.getElementById('japan-territories-overlay');
  if (pinsOverlay) {
    pinsOverlay.innerHTML = '';
    for (const [tid, tdef] of Object.entries(JAPAN_TERRITORIES_DEF)) {
      const state = game.japanTerritories[tid] || { owner: tdef.owner, garrison: tdef.garrison };
      const isOwned = state.owner === 'rayton';
      const isSelected = game.selectedRiskTerritory === tid;

      const pin = document.createElement('div');
      pin.className = `territory-pin ${isOwned ? 'owned' : 'enemy'} ${isSelected ? 'selected' : ''}`;
      pin.style.left = `${tdef.coords.x}%`;
      pin.style.top = `${tdef.coords.y}%`;

      pin.innerHTML = `
        <div class="pin-radar-ring"></div>
        <div class="pin-marker">
          <span class="pin-crest">${isOwned ? '👑' : '⚔️'}</span>
          <span class="pin-garrison">${state.garrison || 15}</span>
        </div>
        <span class="pin-label">${tdef.name.split(' ')[0]}</span>
      `;

      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundEngine.playClick();
        game.selectedRiskTerritory = tid;
        renderTerritoryIntel();
        renderJapanRiskMap();
      });

      pinsOverlay.appendChild(pin);
    }
  }

  renderTerritoryIntel();
}

function renderTerritoryIntel() {
  const drawer = document.getElementById('territory-intel-drawer');
  if (!drawer) return;

  const tid = game.selectedRiskTerritory || 'yokohama';
  const tdef = JAPAN_TERRITORIES_DEF[tid];
  if (!tdef) return;

  const state = game.japanTerritories[tid] || { owner: tdef.owner, garrison: tdef.garrison };
  const isOwned = state.owner === 'rayton';
  const regionDef = JAPAN_REGIONS[tdef.region];

  drawer.innerHTML = `
    <div class="intel-card" style="padding: 16px; display: flex; flex-direction: column; gap: 12px; height: 100%;">
      <div class="intel-header" style="display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px;">
        <span class="intel-kanji" style="font-family: var(--font-kanji); font-size: 2.2rem; color: var(--gold-bright);">${tdef.kanji}</span>
        <div class="intel-title-wrap">
          <span class="intel-region-tag" style="font-size: 0.75rem; color: var(--gold-bright); letter-spacing: 1px;">${regionDef ? regionDef.fullName : 'Japón'}</span>
          <h3 class="intel-province-name" style="margin: 0; font-family: var(--font-display); font-size: 1.15rem; color: #fff;">${tdef.name}</h3>
        </div>
      </div>

      <div class="intel-status-pill ${isOwned ? 'status-owned' : 'status-hostile'}" style="display: flex; justify-content: space-between; align-items: center; background: ${isOwned ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; border: 1px solid ${isOwned ? '#10b981' : '#ef4444'}; padding: 6px 12px; border-radius: 6px;">
        <span style="font-size: 0.8rem; font-weight: 700; color: ${isOwned ? '#10b981' : '#ef4444'};">${isOwned ? '👑 TERRITORIO RAYTON' : '⚔️ OCUPADO POR RIVAL'}</span>
        <strong style="color: #fff; font-size: 0.85rem;">${state.garrison} Defensores</strong>
      </div>

      <div class="intel-gang-row" style="font-size: 0.8rem; color: var(--text-muted);">
        <span>Fuerza en control: </span><strong style="color: #fff;">${isOwned ? 'Cuartel Territorial RAYTON' : tdef.gang}</strong>
      </div>

      <p class="intel-lore" style="font-size: 0.78rem; line-height: 1.4; color: #cbd5e1; margin: 0; font-style: italic;">${tdef.lore}</p>

      <div class="intel-rewards-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div class="intel-reward-pill" style="background: rgba(0,0,0,0.4); padding: 6px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
          <span style="display: block; font-size: 0.7rem; color: var(--text-muted);">Botín Yenes:</span>
          <strong style="color: #fbbf24; font-size: 0.85rem;">¥ ${tdef.lootYen.toLocaleString()}</strong>
        </div>
        <div class="intel-reward-pill" style="background: rgba(0,0,0,0.4); padding: 6px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
          <span style="display: block; font-size: 0.7rem; color: var(--text-muted);">Respeto:</span>
          <strong style="color: #ef4444; font-size: 0.85rem;">+${tdef.lootRespect.toLocaleString()} 🔥</strong>
        </div>
        <div class="intel-reward-pill" style="background: rgba(0,0,0,0.4); padding: 6px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
          <span style="display: block; font-size: 0.7rem; color: var(--text-muted);">Esencia Sombría:</span>
          <strong style="color: #c084fc; font-size: 0.85rem;">+${(tdef.lootDark || 300).toLocaleString()} 🧪</strong>
        </div>
        <div class="intel-reward-pill" style="background: rgba(0,0,0,0.4); padding: 6px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
          <span style="display: block; font-size: 0.7rem; color: var(--text-muted);">Tributo Pasivo:</span>
          <strong style="color: #34d399; font-size: 0.8rem;">+¥ ${tdef.incomeYen} / +${tdef.incomeRespect} 🔥</strong>
        </div>
      </div>

      <div class="intel-actions-block" style="margin-top: auto; padding-top: 10px;">
        ${!isOwned ? `
          <button class="btn btn-danger btn-block btn-launch-territory-raid" id="btn-conquer-territory" style="width: 100%; padding: 12px; font-weight: 700; font-size: 0.95rem;">
            <span>⚔️</span> ¡ASALTAR Y CONQUISTAR!
          </button>
        ` : `
          <button class="btn btn-gold btn-block" id="btn-reinforce-territory" style="width: 100%; padding: 12px; font-weight: 700; font-size: 0.95rem;">
            <span>🛡️</span> Reforzar Guarnición (+5 Tropas)
          </button>
        `}
      </div>
    </div>
  `;

  const conquerBtn = drawer.querySelector('#btn-conquer-territory');
  if (conquerBtn) {
    conquerBtn.addEventListener('click', () => {
      launchTerritoryRaid(tid);
    });
  }

  const reinforceBtn = drawer.querySelector('#btn-reinforce-territory');
  if (reinforceBtn) {
    reinforceBtn.addEventListener('click', () => {
      game.reinforceTerritory(tid);
    });
  }
}

function launchTerritoryRaid(territoryId) {
  const tdef = JAPAN_TERRITORIES_DEF[territoryId];
  if (!tdef) return;

  const territoryBase = {
    id: `territory_${territoryId}`,
    territoryId: territoryId,
    name: tdef.name,
    gang: tdef.gang,
    lootYen: tdef.lootYen,
    lootRespect: tdef.lootRespect,
    lootDark: tdef.lootDark || 300,
    trophiesWin: 35,
    trophiesLoss: 15,
    buildings: tdef.buildings || [
      { type: 'hq', x: 8, y: 8, level: tdef.difficulty || 2 },
      { type: 'cannon', x: 6, y: 6, level: tdef.difficulty || 2 },
      { type: 'watchtower', x: 10, y: 10, level: tdef.difficulty || 2 },
      { type: 'vault', x: 6, y: 10, level: 2 },
      { type: 'ramen', x: 10, y: 6, level: 2 }
    ]
  };

  const modal = document.getElementById('war-map-modal');
  if (modal) modal.classList.add('hidden');

  switchToRaidMode(territoryBase);
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

// ==========================================================================
// TOKYO DELINQUENT LEADERS GACHA & HERO ROSTER RENDERERS
// ==========================================================================

function renderGachaModal() {
  const activeLeader = game.getActiveLeader();
  const activeBanner = document.getElementById('active-leader-banner-display');
  if (activeBanner && activeLeader) {
    activeBanner.innerHTML = `
      <div class="active-leader-card-glow" style="border-left: 4px solid ${activeLeader.color};">
        <img src="${activeLeader.avatar}" alt="${activeLeader.name}" class="active-leader-avatar">
        <div class="active-leader-info">
          <div class="active-leader-badge-row">
            <span class="active-leader-crown">👑 LÍDER ACTIVO EN COMBATE</span>
            <span class="leader-rarity-pill ${activeLeader.rarity}">${'★'.repeat(activeLeader.stars)} ${activeLeader.rarity.toUpperCase()}</span>
          </div>
          <h3>${activeLeader.name}</h3>
          <span class="active-leader-sub">${activeLeader.title} • <strong>Nivel ${activeLeader.level}</strong></span>
          
          <div class="active-leader-stats-bar">
            <span>❤️ HP: <strong>${activeLeader.hp.toLocaleString()}</strong></span>
            <span>⚔️ DPS: <strong>${activeLeader.dps.toLocaleString()}</strong></span>
            <span>⚡ Vel: <strong>${activeLeader.speed}</strong></span>
          </div>

          <div class="active-leader-skills-row">
            <div class="active-skill-box passive">
              <span class="skill-kicker">HABILIDAD PASIVA:</span>
              <strong>${activeLeader.passiveName}</strong>
              <p>${activeLeader.passiveDesc}</p>
            </div>
            <div class="active-skill-box active">
              <span class="skill-kicker">HABILIDAD ACTIVA:</span>
              <strong>${activeLeader.abilityName}</strong>
              <p>${activeLeader.abilityDesc}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Count Unlocked
  let unlockedCount = 0;
  for (const k of Object.keys(LEADERS_DATA)) {
    if (game.leaders[k] && game.leaders[k].unlocked) unlockedCount++;
  }
  const countEl = document.getElementById('gacha-roster-count');
  if (countEl) countEl.textContent = `${unlockedCount}/${Object.keys(LEADERS_DATA).length} Reclutados`;

  // Render Roster Grid
  const rosterGrid = document.getElementById('gacha-leaders-container');
  if (rosterGrid) {
    rosterGrid.innerHTML = '';
    for (const [id, def] of Object.entries(LEADERS_DATA)) {
      const info = game.getLeaderInfo(id);
      const card = document.createElement('div');
      card.className = `gacha-leader-card ${info.unlocked ? 'unlocked' : 'locked'} ${info.isActive ? 'active-leader-card' : ''}`;
      card.style.borderColor = info.isActive ? 'var(--gold-bright)' : (info.unlocked ? info.color : 'rgba(255,255,255,0.1)');

      const shardsPct = Math.min(100, (info.shards / info.shardsNeeded) * 100);

      card.innerHTML = `
        <div class="leader-card-header">
          <span class="leader-rarity-pill ${def.rarity}">${'★'.repeat(def.stars)} ${def.rarity.toUpperCase()}</span>
          ${info.isActive ? '<span class="leader-current-pill">👑 ACTIVO</span>' : ''}
        </div>

        <div class="leader-card-avatar-wrap">
          <img src="${def.avatar}" alt="${def.name}" class="leader-card-avatar ${info.unlocked ? '' : 'locked-silhouette'}">
          ${!info.unlocked ? '<div class="leader-locked-badge">🔒 BLOQUEADO</div>' : `<div class="leader-level-badge">Nv. ${info.level}</div>`}
        </div>

        <div class="leader-card-body">
          <h4 class="leader-card-name">${def.name}</h4>
          <span class="leader-card-role">${def.role}</span>

          <div class="leader-card-stats-mini">
            <span>❤️ ${info.hp.toLocaleString()} HP</span>
            <span>⚔️ ${info.dps.toLocaleString()} DPS</span>
          </div>

          <div class="leader-card-passive-highlight">
            <span class="passive-tag">PASIVA</span>
            <strong>${def.passiveName}</strong>
            <p>${def.passiveDesc}</p>
          </div>

          <div class="leader-card-ability-highlight">
            <span class="active-tag">ACTIVA</span>
            <strong>${def.abilityName}</strong>
            <p>${def.abilityDesc}</p>
          </div>

          <!-- Shards progress bar -->
          <div class="leader-shards-box">
            <div class="shards-labels">
              <span>Fragmentos de Ascenso:</span>
              <strong>${info.shards} / ${info.shardsNeeded}</strong>
            </div>
            <div class="shards-progress-track">
              <div class="shards-progress-fill" style="width: ${shardsPct}%;"></div>
            </div>
          </div>
        </div>

        <div class="leader-card-actions">
          ${!info.unlocked ? `
            <button class="btn btn-secondary btn-block disabled" disabled title="Consigue a este líder tirando en el Gacha de Convocatoria">
              🔒 Reclutar en Gacha
            </button>
          ` : info.isActive ? `
            <div class="active-leader-selected-btn">
              <span>👑 Comandante Asignado</span>
            </div>
          ` : `
            <button class="btn btn-primary btn-block btn-set-active" data-id="${id}">
              Asignar como Líder
            </button>
          `}

          ${info.unlocked && info.level < 10 && info.shards >= info.shardsNeeded ? `
            <button class="btn btn-gold btn-block btn-upgrade-leader" data-id="${id}">
              ⚡ Subir a Nv. ${info.level + 1} (${info.upgradeCostRespect.toLocaleString()} 🔥)
            </button>
          ` : ''}
          ${info.unlocked && info.level >= 10 ? `
            <span class="badge-max-rank">⭐ RANGO MÁXIMO (Nv. 10)</span>
          ` : ''}
        </div>
      `;

      // Set active leader listener
      const setBtn = card.querySelector('.btn-set-active');
      if (setBtn) {
        setBtn.addEventListener('click', () => {
          game.setActiveLeader(id);
        });
      }

      // Upgrade leader listener
      const upgBtn = card.querySelector('.btn-upgrade-leader');
      if (upgBtn) {
        upgBtn.addEventListener('click', () => {
          game.upgradeLeader(id);
        });
      }

      rosterGrid.appendChild(card);
    }
  }
}

function showGachaReveal(results) {
  if (!results || results.length === 0) return;

  const gachaModal = document.getElementById('gacha-modal');
  if (gachaModal) gachaModal.classList.add('hidden');

  const revealModal = document.getElementById('gacha-reveal-modal');
  const cardsGrid = document.getElementById('gacha-reveal-cards-grid');
  const titleEl = document.getElementById('gacha-reveal-title');

  if (!revealModal || !cardsGrid) return;

  cardsGrid.innerHTML = '';
  revealModal.classList.remove('hidden');
  revealModal.style.display = 'flex';

  const hasLegendary = results.some(r => r.rarity === 'legendary');
  if (hasLegendary && window.soundEngine.playGachaRevealLegendary) {
    window.soundEngine.playGachaRevealLegendary();
  } else if (window.soundEngine.playGachaRevealEpic) {
    window.soundEngine.playGachaRevealEpic();
  }

  if (titleEl) {
    titleEl.textContent = results.length > 1 ? `¡${results.length} COMANDANTES RECLUTADOS!` : '¡COMANDANTE RECLUTADO!';
  }

  results.forEach((res, idx) => {
    const card = document.createElement('div');
    card.className = `gacha-reveal-card ${res.rarity}`;
    card.style.animationDelay = `${idx * 0.08}s`;

    card.innerHTML = `
      <div class="reveal-card-inner">
        <div class="reveal-card-front" style="border-color: ${res.leader.color};">
          <div class="reveal-stars">${'⭐'.repeat(res.stars)}</div>
          <img src="${res.leader.avatar}" alt="${res.leader.name}" class="reveal-avatar">
          <div class="reveal-meta">
            ${res.isNew ? '<span class="reveal-badge-new">¡NUEVO LÍDER!</span>' : `<span class="reveal-badge-shards">+${res.shardsAwarded} FRAGMENTOS</span>`}
            <h4>${res.leader.name}</h4>
            <span class="reveal-role">${res.leader.role}</span>
            <div class="reveal-passive-line">
              <strong>${res.leader.passiveName}:</strong> ${res.leader.passiveDesc}
            </div>
            <div class="reveal-ability-line">
              <strong>${res.leader.abilityName}:</strong> ${res.leader.abilityDesc}
            </div>
          </div>
        </div>
      </div>
    `;

    cardsGrid.appendChild(card);
  });
}

// Render Troop & Spell Deployment Deck during Raid
function renderTroopDeployDeck() {
  const container = document.getElementById('troop-deploy-container');
  if (!container || !game.currentRaid) return;
  container.innerHTML = '';

  // 1. Active Leader Card (If not yet deployed)
  if (!game.currentRaid.leaderUnit && !game.currentRaid.heroRen) {
    const leader = game.getActiveLeader();
    const heroCard = document.createElement('div');
    heroCard.className = `troop-card-deploy hero-card ${game.selectedDeployTroop === 'leader' || game.selectedDeployTroop === 'hero_ren' ? 'selected' : ''}`;
    heroCard.innerHTML = `
      <span class="troop-count-badge">LÍDER</span>
      <span class="troop-deploy-icon">${leader.icon}</span>
      <span class="troop-deploy-name">${leader.name.split(' ')[0]} (Nv. ${leader.level})</span>
    `;
    heroCard.title = `${leader.name} • ${leader.title}\nPasiva: ${leader.passiveDesc}\nHabilidad: ${leader.abilityDesc}`;
    heroCard.addEventListener('click', () => {
      game.selectedDeployTroop = 'leader';
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

    if ((game.selectedDeployTroop === 'leader' || game.selectedDeployTroop === 'hero_ren') && !game.currentRaid.leaderUnit && !game.currentRaid.heroRen) {
      const isPerimeter = gx <= 1 || gy <= 1 || gx >= GRID_SIZE - 2 || gy >= GRID_SIZE - 2;
      if (isPerimeter) {
        game.currentRaid.deployLeader(gx, gy);
        game.selectedDeployTroop = null;
        renderTroopDeployDeck();
      } else {
        const leader = game.getActiveLeader();
        showToast(`⚠️ ¡Despliega al Líder ${leader.name.split(' ')[0]} en la zona perimetral roja exterior!`);
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

  const weatherBtn = document.getElementById('btn-weather-toggle');
  if (weatherBtn) {
    const weatherIcons = { rain: '🌧️', sakura: '🌸', neon: '⚡', clear: '☀️' };
    weatherBtn.textContent = weatherIcons[game.weather || 'rain'] || '🌧️';
    weatherBtn.addEventListener('click', () => game.toggleWeather());
  }

  const raidSpeedBtn = document.getElementById('btn-raid-speed');
  if (raidSpeedBtn) {
    raidSpeedBtn.addEventListener('click', () => {
      if (game.currentRaid) game.currentRaid.toggleSpeed();
    });
  }

  const defSpeedBtn = document.getElementById('btn-defense-speed');
  if (defSpeedBtn) {
    defSpeedBtn.addEventListener('click', () => {
      if (game.currentDefense) game.currentDefense.toggleSpeed();
    });
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

  // Gacha & Leaders Modals
  const openGacha = () => {
    window.soundEngine.playClick();
    renderGachaModal();
    const modal = document.getElementById('gacha-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
  };

  const btnOpenGacha = document.getElementById('btn-open-gacha');
  if (btnOpenGacha) btnOpenGacha.addEventListener('click', openGacha);

  const btnOpenGachaDock = document.getElementById('btn-open-gacha-dock');
  if (btnOpenGachaDock) btnOpenGachaDock.addEventListener('click', openGacha);

  // Gacha Summon Buttons
  const btnSingleGems = document.getElementById('btn-gacha-single-gems');
  if (btnSingleGems) {
    btnSingleGems.addEventListener('click', () => {
      const res = game.rollGacha(1, 'gems');
      if (res) showGachaReveal(res);
    });
  }

  const btnMultiGems = document.getElementById('btn-gacha-multi-gems');
  if (btnMultiGems) {
    btnMultiGems.addEventListener('click', () => {
      const res = game.rollGacha(10, 'gems');
      if (res) showGachaReveal(res);
    });
  }

  const btnSingleRespect = document.getElementById('btn-gacha-single-respect');
  if (btnSingleRespect) {
    btnSingleRespect.addEventListener('click', () => {
      const res = game.rollGacha(1, 'respect');
      if (res) showGachaReveal(res);
    });
  }

  const btnMultiRespect = document.getElementById('btn-gacha-multi-respect');
  if (btnMultiRespect) {
    btnMultiRespect.addEventListener('click', () => {
      const res = game.rollGacha(10, 'respect');
      if (res) showGachaReveal(res);
    });
  }

  // Claim Gacha Reveal
  const btnClaimReveal = document.getElementById('btn-gacha-reveal-claim');
  if (btnClaimReveal) {
    btnClaimReveal.addEventListener('click', () => {
      window.soundEngine.playClick();
      const revModal = document.getElementById('gacha-reveal-modal');
      if (revModal) {
        revModal.classList.add('hidden');
        revModal.style.display = 'none';
      }
      renderGachaModal();
      const gModal = document.getElementById('gacha-modal');
      if (gModal) {
        gModal.classList.remove('hidden');
        gModal.style.display = 'flex';
      }
      updateUI();
    });
  }

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

  // War Map Tabs (Japan Risk vs Campaign vs Multiplayer)
  const tabJapan = document.getElementById('tab-war-japan');
  const tabCampaign = document.getElementById('tab-war-campaign');
  const tabMultiplayer = document.getElementById('tab-war-multiplayer');
  const paneJapan = document.getElementById('war-pane-japan');
  const paneCampaign = document.getElementById('war-pane-campaign');
  const paneMultiplayer = document.getElementById('war-pane-multiplayer');

  const showWarTab = (tabName) => {
    window.soundEngine.playClick();
    if (tabJapan) tabJapan.classList.toggle('active', tabName === 'japan');
    if (tabCampaign) tabCampaign.classList.toggle('active', tabName === 'campaign');
    if (tabMultiplayer) tabMultiplayer.classList.toggle('active', tabName === 'multiplayer');

    if (paneJapan) paneJapan.classList.toggle('hidden', tabName !== 'japan');
    if (paneCampaign) paneCampaign.classList.toggle('hidden', tabName !== 'campaign');
    if (paneMultiplayer) paneMultiplayer.classList.toggle('hidden', tabName !== 'multiplayer');

    if (tabName === 'japan') renderJapanRiskMap();
    if (tabName === 'multiplayer') renderMultiplayerPanel();
  };

  if (tabJapan) tabJapan.addEventListener('click', () => showWarTab('japan'));
  if (tabCampaign) tabCampaign.addEventListener('click', () => showWarTab('campaign'));
  if (tabMultiplayer) tabMultiplayer.addEventListener('click', () => showWarTab('multiplayer'));

  // Top Bar HUD Japan Conquest Pill
  const hudJapanBtn = document.getElementById('hud-japan-conquest-btn');
  if (hudJapanBtn) {
    hudJapanBtn.addEventListener('click', () => {
      window.soundEngine.playClick();
      renderWarMap();
      showWarTab('japan');
      document.getElementById('war-map-modal').classList.remove('hidden');
    });
  }

  // Japan Risk Collect Taxes Button
  const collectTaxesBtn = document.getElementById('btn-collect-japan-taxes');
  if (collectTaxesBtn) {
    collectTaxesBtn.addEventListener('click', () => {
      game.collectJapanTaxes();
    });
  }

  // Shogun Grand Victory Claim Button
  const claimShogunBtn = document.getElementById('btn-claim-shogun-reward');
  if (claimShogunBtn) {
    claimShogunBtn.addEventListener('click', () => {
      if (window.soundEngine.playConquestFanfare) window.soundEngine.playConquestFanfare();
      const shogunModal = document.getElementById('japan-conquest-victory-modal');
      if (shogunModal) {
        shogunModal.classList.add('hidden');
        shogunModal.style.display = 'none';
      }
      showToast('👑 ¡UNIFICACIÓN TOTAL DE JAPÓN! ¡Has reclamado las 1,000 Gemas y el título de Shogun Supremo!');
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

  // Music Toggle (Música Tranquila Lofi)
  const musicBtn = document.getElementById('btn-music-toggle');
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      const isPlaying = window.soundEngine.toggleMusic();
      musicBtn.textContent = isPlaying ? '🎵' : '🔇';
      musicBtn.title = isPlaying ? '🎵 Música Tranquila: Activa (Lofi Chill)' : '🔇 Música Tranquila: Pausada';
      if (isPlaying) {
        musicBtn.classList.add('active');
        musicBtn.classList.remove('muted');
        showToast('🎵 Música tranquila lofi activada');
      } else {
        musicBtn.classList.remove('active');
        musicBtn.classList.add('muted');
        showToast('🔇 Música pausada');
      }
    });
  }

  // Help & Quick Guide Modal Controls
  const helpBtn = document.getElementById('btn-open-help');
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      window.soundEngine.playClick();
      const modal = document.getElementById('help-modal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    });
  }

  const closeHelpBtn = document.getElementById('btn-close-help');
  if (closeHelpBtn) {
    closeHelpBtn.addEventListener('click', () => {
      window.soundEngine.playClick();
      const modal = document.getElementById('help-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    });
  }

  // Dismiss Quick Objective Pill
  const dismissObjBtn = document.getElementById('btn-dismiss-obj');
  if (dismissObjBtn) {
    dismissObjBtn.addEventListener('click', () => {
      const pill = document.getElementById('quick-objective-pill');
      if (pill) {
        pill.dataset.dismissed = 'true';
        pill.style.display = 'none';
      }
    });
  }

  // Audio SFX Toggle
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

  // Desktop Strategy Keyboard Hotkeys
  window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => {
        m.classList.add('hidden');
        m.style.display = 'none';
      });
      closeContextDock();
      game.placementBuilding = null;
      game.movingBuilding = null;
      return;
    }

    if (e.key === 'b' || e.key === 'B') {
      const barracksBtn = document.getElementById('btn-open-barracks');
      if (barracksBtn && game.mode === 'base') barracksBtn.click();
    } else if (e.key === 'c' || e.key === 'C' || e.key === 's' || e.key === 'S') {
      const shopBtn = document.getElementById('btn-open-shop');
      if (shopBtn && game.mode === 'base') shopBtn.click();
    } else if (e.key === 'j' || e.key === 'J' || e.key === 'm' || e.key === 'M') {
      const warBtn = document.getElementById('btn-open-war-map');
      if (warBtn && game.mode === 'base') warBtn.click();
    } else if (e.key === 'g' || e.key === 'G') {
      const gachaBtn = document.getElementById('btn-open-gacha-dock');
      if (gachaBtn && game.mode === 'base') gachaBtn.click();
    } else if (e.key === 'w' || e.key === 'W') {
      game.toggleWeather();
    } else if (e.key === 't' || e.key === 'T') {
      game.toggleTheme();
    } else if (e.key === ' ') {
      if (game.mode === 'raid' && game.currentRaid) {
        e.preventDefault();
        game.currentRaid.toggleSpeed();
      } else if (game.mode === 'defense' && game.currentDefense) {
        e.preventDefault();
        game.currentDefense.toggleSpeed();
      } else if (game.mode === 'base') {
        const collectAllBtn = document.getElementById('btn-collect-all');
        if (collectAllBtn) collectAllBtn.click();
      }
    } else if (['1', '2', '3', '4'].includes(e.key) && game.mode === 'raid') {
      const slotIdx = parseInt(e.key, 10) - 1;
      const cards = document.querySelectorAll('.troop-card-deploy');
      if (cards && cards[slotIdx]) cards[slotIdx].click();
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

  // Iniciar música tranquila de fondo
  if (window.soundEngine && !window.soundEngine.isMusicPlaying()) {
    window.soundEngine.startMusic();
  }

  showToast('¡Bienvenido a RAYTON! Construye puestos, entrena cuadrillas y conquista Tokio.');
}

// Iniciar música con la primera interacción del usuario
let userHasInteracted = false;
function initCalmMusicOnFirstGesture() {
  if (userHasInteracted) return;
  userHasInteracted = true;
  if (window.soundEngine && !window.soundEngine.isMusicPlaying()) {
    window.soundEngine.startMusic();
    const mBtn = document.getElementById('btn-music-toggle');
    if (mBtn) {
      mBtn.textContent = '🎵';
      mBtn.classList.add('active');
      mBtn.classList.remove('muted');
    }
  }
}

window.addEventListener('click', initCalmMusicOnFirstGesture, { once: true });
window.addEventListener('keydown', initCalmMusicOnFirstGesture, { once: true });

// Bootstrapping
document.addEventListener('DOMContentLoaded', () => {
  switchToBaseMode();
  setupEventListeners();
  updateUI();
  showIntro();
  console.log('RAYTON Clash of Delinquents Mythical Village Engine Initialized.');
});

