// Audio Engine using Web Audio API for RAYTON: Gang Wars (Clash of Delinquents)
// Generates punch impacts, deployment whistles, building placement, coin collection, explosions and fanfare.

class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playDeploy() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(650, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playBuildPlace() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playCoinCollect() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    [987.77, 1318.51].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.18);
    });
  }

  playPunch() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playHeavyHit() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playExplosion() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Sub-bass heavy impact
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.35);
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);

    // Crackle noise
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 700;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start(now);
  }

  playShoot() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  }

  playStarSound() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  playMotorcycleRev() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(65, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.3);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.7);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  playIntroSwell() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(330, now + 1.2);
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 1.3);
  }

  playSpellCast() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playHeroRoar() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.4);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Clash of Clans: Spring Trap "BOING!"
  playSpringTrap() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.38);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.38);
  }

  // Builder Hammer Clink
  playBuilderHammer() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.06);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Clearing Obstacle (Chop & Dig)
  playChopObstacle() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.1);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Gem Shimmer Ding
  playGemDing() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    [1318.51, 1567.98, 2093.00].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.18, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.3);
    });
  }

  // Lightning Spell
  playLightningSpell() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.28);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Level Up / Sede Upgrade Fanfare
  playFanfareLevelUp() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const melody = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    melody.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.22, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.4);
    });
  }

  // Clash of Clans War Horn
  playBattleHorn() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [220, 277.18, 329.63, 440];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.25, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.55);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.6);
    });
  }

  // Peaceful Village Return Chime
  playPeaceChime() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.45);
    });
  }

  // Archer Arrow Shoot
  playArrowShoot() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.09);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Wizard Fireball / Fire Splash
  playMagicFireball() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.22);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Dragon Fire Breath
  playDragonBreath() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.linearRampToValueAtTime(800, now + 0.2);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.4);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  // Freeze Spell Glass Shatter / Ice
  playFreezeSpell() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    [1200, 1500, 1800, 2400].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.28);
    });
  }

  // Base Defense Alarm
  playDefenseAlarm() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now + i * 0.2);
      osc.frequency.exponentialRampToValueAtTime(880, now + i * 0.2 + 0.15);
      gain.gain.setValueAtTime(0.3, now + i * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.2 + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.2);
      osc.stop(now + i * 0.2 + 0.16);
    }
  }

  // Gacha Drum Roll Suspense
  playGachaRoll() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    for (let i = 0; i < 12; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100 + i * 15, now + i * 0.05);
      gain.gain.setValueAtTime(0.18, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.05);
    }
  }

  // Gacha Legendary Reveal Fanfare (5 Stars)
  playGachaRevealLegendary() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major ascension
    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.28, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.65);
    });
  }

  // Gacha Epic Reveal Chime (4 Stars)
  playGachaRevealEpic() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.22, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.45);
    });
  }

  // Aoi Healing Sparkle Chime
  playHealChime() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    [783.99, 987.77, 1174.66, 1567.98].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.4);
    });
  }

  // Tora Berserker Roar (Deep rumble & fury)
  playBerserkerRoar() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(75, now);
    osc.frequency.linearRampToValueAtTime(160, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.65);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  // Kaito Tactical Whistle
  playWhistle() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1600, now);
    osc.frequency.exponentialRampToValueAtTime(2200, now + 0.12);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Kurogane Shadow Teleport Whoosh
  playTeleportShadow() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.22);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Troop Recruitment Enqueue
  playRecruitStart() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Troop Recruitment Complete Chime
  playRecruitFinish() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.18, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.25);
    });
  }

  // Japan Territory Conquest Fanfare (Imperial Gong & Victory Chord)
  playConquestFanfare() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    // Deep Imperial Gong
    const gongOsc = this.ctx.createOscillator();
    const gongGain = this.ctx.createGain();
    gongOsc.type = 'sawtooth';
    gongOsc.frequency.setValueAtTime(120, now);
    gongOsc.frequency.exponentialRampToValueAtTime(45, now + 1.2);
    gongGain.gain.setValueAtTime(0.4, now);
    gongGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    gongOsc.connect(gongGain);
    gongGain.connect(this.ctx.destination);
    gongOsc.start(now);
    gongOsc.stop(now + 1.2);

    // Triumphant Fanfare Arpeggio
    [440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + 0.15 + i * 0.08);
      gain.gain.setValueAtTime(0.25, now + 0.15 + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15 + i * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.15 + i * 0.08);
      osc.stop(now + 0.15 + i * 0.08 + 0.65);
    });
  }

  // Kazuki Katana Iaido Slash
  playKatanaSlash() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.14);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Shin Sniper High-Caliber Shot
  playSniperShot() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.22);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Yukiko Blizzard Ice Storm
  playIceStorm() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    [1200, 1500, 950, 1800].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      osc.frequency.linearRampToValueAtTime(freq * 0.6, now + idx * 0.04 + 0.3);
      gain.gain.setValueAtTime(0.18, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.35);
    });
  }

  // Gen Bomb Barrage Explosions
  playBombBarrage() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now + i * 0.09);
      osc.frequency.exponentialRampToValueAtTime(40, now + i * 0.09 + 0.16);
      gain.gain.setValueAtTime(0.3, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.2);
    }
  }

  // Daiki Heavy Steel Impact
  playSteelImpact() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.3);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Weather Atmosphere Switch (Raindrop / Ambient Breeze Chime)
  playWeatherSwitch() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    [1046.50, 1318.51, 1567.98].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.05);
      gain.gain.setValueAtTime(0.12, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.22);
    });
  }

  // Battle Speed Multiplier Blip (1x, 2x, 4x)
  playSpeedSwitch() {
    if (this.muted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(1040, now + 0.08);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // =========================================================================
  // MÚSICA TRANQUILA AMBIENTAL (LO-FI CHILL NEO-TOKYO BGM)
  // =========================================================================

  toggleMusic() {
    if (!this.musicEngine) {
      this.musicEngine = new CalmMusicEngine(this);
    }
    return this.musicEngine.toggle();
  }

  startMusic() {
    if (!this.musicEngine) {
      this.musicEngine = new CalmMusicEngine(this);
    }
    this.musicEngine.start();
  }

  stopMusic() {
    if (this.musicEngine) {
      this.musicEngine.stop();
    }
  }

  isMusicPlaying() {
    return this.musicEngine ? this.musicEngine.isPlaying : false;
  }
}

// ---------------------------------------------------------------------------
// GENERADOR PROCEDURAL DE MÚSICA TRANQUILA (Web Audio API)
// Diseñado para una experiencia de juego limpia, zen y relajante.
// ---------------------------------------------------------------------------

class CalmMusicEngine {
  constructor(soundFx) {
    this.soundFx = soundFx;
    this.isPlaying = false;
    this.timer = null;
    this.measure = 0;
    this.volume = 0.20; // Volumen suave que no satura los efectos
    this.masterGain = null;
    this.filter = null;
    this.tapeNoiseNode = null;
    this.tapeGain = null;

    // Progresión armónica serena: Dm9 -> Bbmaj7 -> Gm9 -> Asus4/A7
    this.chords = [
      {
        name: 'Dm9',
        bass: 73.42, // D2
        notes: [146.83, 174.61, 220.00, 261.63, 329.63] // D3, F3, A3, C4, E4
      },
      {
        name: 'Bbmaj7',
        bass: 58.27, // Bb1
        notes: [116.54, 174.61, 220.00, 293.66, 349.23] // Bb2, F3, A3, D4, F4
      },
      {
        name: 'Gm9',
        bass: 49.00, // G1
        notes: [98.00, 146.83, 233.08, 293.66, 349.23, 440.00] // G2, D3, Bb3, D4, F4, A4
      },
      {
        name: 'Asus4',
        bass: 55.00, // A1
        notes: [110.00, 164.81, 220.00, 293.66, 329.63, 392.00] // A2, E3, A3, D4, E4, G4
      }
    ];

    // Notas pentatónicas sutiles para campanillas relajantes (D menor pentatónica)
    this.chimeNotes = [
      440.00, // A4
      523.25, // C5
      587.33, // D5
      659.25, // E5
      698.46, // F5
      783.99, // G5
      880.00, // A5
      1046.50, // C6
      1174.66  // D6
    ];
  }

  initNodes() {
    this.soundFx.init();
    const ctx = this.soundFx.ctx;

    if (!this.masterGain) {
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);

      // Filtro pasa-bajas cálido (simula sintetizador analógico de estudio de lofi)
      this.filter = ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(650, ctx.currentTime);
      this.filter.Q.setValueAtTime(0.7, ctx.currentTime);

      this.filter.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);
    }
  }

  start() {
    if (this.isPlaying) return;
    this.initNodes();
    const ctx = this.soundFx.ctx;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    this.isPlaying = true;

    // Fade-in suave de la música (2 segundos para máxima calidez)
    const now = ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value || 0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(this.volume, now + 2.0);

    // Iniciar bucle armónico (cada compás dura 4.2 segundos: ritmo zen y pausado)
    this.measure = 0;
    this.playChordMeasure();

    this.timer = setInterval(() => {
      if (!this.isPlaying) return;
      this.measure = (this.measure + 1) % this.chords.length;
      this.playChordMeasure();
    }, 4200);

    // Iniciar sutil textura de lluvia / vinilo analógico relajante
    this.startAmbientTexture();
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // Fade-out suave
    if (this.masterGain && this.soundFx.ctx) {
      const ctx = this.soundFx.ctx;
      const now = ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    }

    if (this.tapeGain && this.soundFx.ctx) {
      const now = this.soundFx.ctx.currentTime;
      this.tapeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        try {
          if (this.tapeNoiseNode) this.tapeNoiseNode.stop();
        } catch (e) {}
        this.tapeNoiseNode = null;
      }, 900);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  playChordMeasure() {
    if (!this.isPlaying || !this.soundFx.ctx) return;
    const ctx = this.soundFx.ctx;
    const now = ctx.currentTime;
    const chord = this.chords[this.measure];

    // 1. Bajo profundo y acolchado (Sub-Bass)
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(chord.bass, now);
    
    bassGain.gain.setValueAtTime(0.001, now);
    bassGain.gain.linearRampToValueAtTime(0.24, now + 0.3);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 4.1);

    bassOsc.connect(bassGain);
    bassGain.connect(this.filter);
    bassOsc.start(now);
    bassOsc.stop(now + 4.2);

    // 2. Acorde cálido tipo Pad Lofi (Osciladores mezclados sine + triangle)
    chord.notes.forEach((freq, i) => {
      const padOsc = ctx.createOscillator();
      const padGain = ctx.createGain();
      
      padOsc.type = i % 2 === 0 ? 'sine' : 'triangle';
      padOsc.frequency.setValueAtTime(freq, now);
      
      // Sutil desafinación para sensación de cinta analógica / chorus orgánico
      const detuneCents = (i - 2) * 2.5;
      padOsc.detune.setValueAtTime(detuneCents, now);

      const noteVol = 0.05 / Math.sqrt(chord.notes.length);
      padGain.gain.setValueAtTime(0.001, now);
      padGain.gain.linearRampToValueAtTime(noteVol, now + 0.6 + i * 0.08);
      padGain.gain.exponentialRampToValueAtTime(0.0005, now + 4.0);

      padOsc.connect(padGain);
      padGain.connect(this.filter);
      padOsc.start(now);
      padOsc.stop(now + 4.2);
    });

    // 3. Notas melódicas sutiles de campanilla / glockenspiel zen en tiempos aleatorios
    const chimeCount = 2 + Math.floor(Math.random() * 2);
    for (let c = 0; c < chimeCount; c++) {
      const delay = 0.8 + Math.random() * 2.6;
      const noteFreq = this.chimeNotes[Math.floor(Math.random() * this.chimeNotes.length)];
      this.playChimeNote(noteFreq, now + delay);
    }
  }

  playChimeNote(freq, time) {
    if (!this.soundFx.ctx) return;
    const ctx = this.soundFx.ctx;
    
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();

    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(freq, time);

    chimeGain.gain.setValueAtTime(0.001, time);
    chimeGain.gain.linearRampToValueAtTime(0.045, time + 0.04);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, time + 1.6);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(this.masterGain);

    chimeOsc.start(time);
    chimeOsc.stop(time + 1.7);
  }

  startAmbientTexture() {
    if (this.tapeNoiseNode || !this.soundFx.ctx) return;
    const ctx = this.soundFx.ctx;

    // Buffer de ruido suave (simula calor de vinilo / lluvia lejana)
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02; // Pink-ish noise
      lastOut = output[i];
    }

    this.tapeNoiseNode = ctx.createBufferSource();
    this.tapeNoiseNode.buffer = noiseBuffer;
    this.tapeNoiseNode.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(900, ctx.currentTime);
    noiseFilter.Q.setValueAtTime(1.2, ctx.currentTime);

    this.tapeGain = ctx.createGain();
    this.tapeGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.tapeGain.gain.linearRampToValueAtTime(0.012, ctx.currentTime + 2.5);

    this.tapeNoiseNode.connect(noiseFilter);
    noiseFilter.connect(this.tapeGain);
    this.tapeGain.connect(this.masterGain);

    this.tapeNoiseNode.start();
  }
}

window.soundEngine = new SoundFX();


