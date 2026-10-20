# RAYTON (雷頓): Choque de Pandillas & Aldea Mítica
### Estrategia de Construcción de Base y Asaltos estilo Clash of Clans inspirado en Tokyo Revengers y Wind Breaker

Bienvenido al proyecto **RAYTON**, un juego de estrategia de construcción de aldea/barrio y asaltos territoriales en tiempo real donde lideras a una cuadrilla juvenil en Tokio. Construye tu fortaleza, limpia obstáculos ancestrales para conseguir gemas, entrena ejércitos de delincuentes, prepara brebajes y hechizos arcanos, y asalta las fortalezas de bandas rivales.

---

## 📸 Características Principales (Estilo Clash of Clans)

1. **Terreno de Aldea Mítica y Vista Dual**:
   - **Modo Aldea Mítica**: Césped esmeralda ajedrezado con perímetro de pinos 🌲, rocas de granito 🪨 y faroles tradicionales 🏮.
   - **Modo Distrito Urbano**: Asfalto nocturno con luces de neón estilo Tokio Shinjuku 🏙️.
   - Alternable instantáneamente con el botón `🌲` de la barra superior.

2. **Limpieza de Obstáculos y Economía de Gemas**:
   - Generación periódica de obstáculos naturales: Troncos podridos 🪵, Peñascos de granito 🪨, Arbustos de gemas 💎 y Pinos milenarios 🌲.
   - Envía a tus constructores a talar o picar obstáculos para desbloquear entre +2 y +6 **Gemas de Honor** 💎 con efectos de sonido cristalinos y partículas de humo.

3. **Aldea Viva & Campamentos con Fogata**:
   - **Campamentos de Asalto**: Círculo de tierra con fogata activa y partículas de brasas donde tus tropas entrenadas (brawlers, motoristas, tanques) caminan físicamente alrededor del fuego.
   - **Aldeanos y Constructores**: Habitantes caminando entre puestos y constructores que martillean 🔨 activamente sobre las obras.
   - **Altar de Héroe**: Podium ceremonial donde el líder **Ren "Ray" Kazuma** monta guardia.

4. **Dock Contextual de Edificios (Estilo CoC)**:
   - Al tocar cualquier edificio u obstáculo se despliega el menú contextual inferior con botones circulares:
     - ℹ️ **Info**: Estadísticas detalladas de vida, daño y lore.
     - ⚡ **Mejorar**: Subida de nivel con coste en Yenes/Respeto y fanfarria.
     - ✋ **Mover**: Modo reubicación libre con previsualización en verde (válido) o rojo (ocupado).
     - 💰 **Cobrar**: Recolección rápida de puestos de Ramen y Dojos.
     - 🥋 **Entrenar**: Acceso directo al Cuartel de tropas.
     - 🧪 **Brebajes**: Acceso al Caldero de Hechizos.
     - ⛏️ **Limpiar**: Talar/picar obstáculos para ganar gemas.

5. **Defensas y Trampas Ocultas**:
   - **Cañón de Asedio Urbano**: Disparo terrestre rápido y contundente.
   - **Torre de Vigías**: Ataque a distancia constante con piedras y bates.
   - **Mortero de Molotovs**: Fuego parabólico con demoledor daño de área.
   - **Trampa de Muelle de Salto (🌀)**: Oculta hasta que el atacante pisa sobre ella; ¡catapulta a los invasores volando fuera del mapa con sonido *Boing*!
   - **Bomba Oculta (💣)**: Mina explosiva subterránea que estalla en área.

6. **Sistema de Hechizos y Héroe en Combate**:
   - **Caldero de Brebajes**: Prepara *Furia Callejera* (⚡ aura púrpura de +65% daño y +40% velocidad), *Brebaje Médico* (🩹 aura verde esmeralda de curación continua) y *Rayo Celestial* (⚡ relámpago demoledor que impacta directamente en cualquier defensa enemiga).
   - **Habilidad de Héroe (Patada Nuclear)**: Despliega a Ren Kazuma en el asalto y pulsa el botón llameante de su habilidad para curarlo +600 HP, activar super-furia e invocar 4 refuerzos inmediatos.

7. **Castillo del Clan & Alianzas**:
   - Sede de la hermandad tokiota. Solicita refuerzos de cuadrilla veterana (+3 brawlers y +1 motorista) y recibe un +20% de botín extra en guerras territoriales.

---

## 📂 Estructura del Proyecto

```
RAYTON/
├── index.html           # Estructura semántica, vistas y modales de combate
├── styles.css           # Sistema de diseño, animaciones manga y glassmorphism
├── game.js              # Lógica de juego, IA de combate por turnos y gestión
├── audio.js             # Motor de efectos de sonido Web Audio API
├── README.md            # Documentación completa del proyecto
└── assets/
    └── images/
        ├── banner.jpg   # Arte conceptual del líder sobre el skyline de Tokio
        ├── ren.jpg      # Retrato de Ren "Ray" Kazuma (Líder Supremo)
        ├── tora.jpg     # Retrato de Tora "Iron" Jin (Vice-Líder / Tanque)
        ├── kaito.jpg    # Retrato de Kaito Shiro (Estratega / 1ª División)
        └── kurogane.jpg # Retrato de Kurogane (Líder Rival / Emperador)
```

---

## 🚀 Cómo Jugar

Simplemente haz doble clic o abre [index.html](file:///c:/Users/User/Desktop/Proye/Proyectos%20personales/RAYTON/index.html) en cualquier navegador web moderno (Chrome, Edge, Firefox, Brave, Safari). ¡No se requiere instalación ni servidores externos!
