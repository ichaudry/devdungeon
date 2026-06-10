import { GameCanvas } from "@ui/GameCanvas";

export default function App() {
  return (
    <main className="app">
      <header className="topbar">
        <h1>⚔️ DevDungeon</h1>

        <p>
          Programming concepts become weapons.
          Bugs become enemies.
        </p>
      </header>

      <GameCanvas />
    </main>
  );
}