# ⚔️ DevDungeon

> Programming concepts become weapons. Bugs become enemies.

DevDungeon is a developer-themed roguelike built with Phaser and TypeScript. Explore procedurally generated dungeons, battle software-inspired monsters, and unlock programming powers as you descend deeper into the dungeon.

---

## Current Features

### Dungeon Generation

* Procedurally generated dungeon layouts
* Random room placement
* Corridor generation between rooms
* Non-overlapping room placement
* Infinite replayability

### Player Systems

* WASD movement
* Camera follow system
* World boundaries
* Wall collision detection

### UI

* Main menu
* Dungeon minimap
* Room counter
* Basic HUD
* Enemy counter

### Architecture

* Phaser scene management
* TypeScript codebase
* Modular dungeon generation system
* Dedicated rendering systems
* Enemy spawning system

---

## Screenshots

> Screenshots coming soon.

---

## Tech Stack

* TypeScript
* Phaser 3
* Vite
* React

---

## Getting Started

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## Project Structure

```text
src/
├── entities/
│   └── Player.ts
│
├── game/
│   ├── scenes/
│   │   ├── BootScene.ts
│   │   ├── MenuScene.ts
│   │   └── DungeonScene.ts
│   │
│   └── config.ts
│
├── systems/
│   └── dungeon/
│       ├── DungeonGenerator.ts
│       ├── DungeonRenderer.ts
│       └── Room.ts
│
├── ui/
│   ├── GameCanvas.tsx
│   └── Minimap.ts
│
└── App.tsx
```

---

## Roadmap

### Foundation

* [x] Phaser integration
* [x] Scene management
* [x] Player movement
* [x] Camera follow
* [x] Procedural dungeon generation
* [x] Dungeon rendering
* [x] Wall collision system
* [x] Minimap system

### Gameplay

* [x] Enemy spawning
* [ ] Enemy AI
* [ ] Combat system
* [ ] Health system
* [ ] Experience system
* [ ] Loot drops

### Developer Mechanics

* [ ] Code snippet weapons
* [ ] Ability chaining
* [ ] Null Pointer enemies
* [ ] Memory Leak enemies
* [ ] Infinite Loop enemies
* [ ] Programming language skill trees

### Content

* [ ] Boss encounters
* [ ] Multiple dungeon themes
* [ ] Procedural events
* [ ] Elite enemies

### Meta Progression

* [ ] Save system
* [ ] Progression tree
* [ ] Unlockables
* [ ] Achievements

---

## Development Log

### v0.1.0

Implemented:

* Core Phaser setup
* Main menu
* Player controller
* Procedural dungeon generation
* Camera follow system
* Wall collision system
* Minimap

Next milestone:

* Enemy spawning and basic combat
