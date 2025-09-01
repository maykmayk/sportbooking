import { SignalHigh } from "lucide-react";

export function GameCard({ title, matchType, odds, teamA, teamB, players = [], addMatchLink }) {
  // players: [A1, A2, B1, B2] (se meno di 4 riempio con slot vuoti)
  const filled = [...players, ...Array(Math.max(0, 4 - players.length)).fill({ name: "", value: "" })].slice(0, 4);

  const leftCol = [filled[0], filled[1]];   // Team A
  const rightCol = [filled[2], filled[3]];  // Team B

  const Cell = ({ p, isTop, isLeft }) => {
    const isEmpty = !p?.name && !p?.value;
    return (
      <div
        className={[
          "relative aspect-square flex flex-col justify-center items-center text-center border-black bg-white",
          isTop ? "border-b-2" : "",
          isLeft ? "border-r-2" : "",
        ].join(" ")}
      >
        {isEmpty ? (
          <button
            type="button"
            className="text-4xl text-accent"
            onClick={() => { if (addMatchLink) window.location.href = addMatchLink; }}
            title="Aggiungi giocatore"
          >
            +
          </button>
        ) : (
          <>
            <div className="text-sm font-medium max-w-[80%] truncate">{p.name}</div>
            <div className="text-xs text-gray-500 max-w-[80%] truncate">{p.value}</div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 bg-gray-100 rounded-2xl p-4">
      <div className="flex flex-col">
        <div className="font-bold text-lg">{title}</div>
        <div className="w-full flex justify-between text-gray-500">
          <div className="text-sm">{matchType}</div>
          <div className="flex gap-2 items-center">
            <SignalHigh size={16} />
            <div className="text-sm">{odds}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* intestazioni Team A (sx) e Team B (dx) */}
        <div className="w-full flex justify-between font-semibold">
          <div className="text-sm">{teamA}</div>
          <div className="text-sm">{teamB}</div>
        </div>

        <div className="grid grid-cols-5">
          {/* Colonna nera sinistra */}
          <div className="col-span-1 border-y-2 border-l-2 border-black" />

          {/* Griglia centrale: 2 colonne (A | B) x 2 righe */}
          <div className="col-span-3 grid grid-cols-2 border-2 border-black">
            {/* Riga 1 */}
            <Cell p={leftCol[0]} isTop isLeft />
            <Cell p={rightCol[0]} isTop={true} isLeft={false} />
            {/* Riga 2 */}
            <Cell p={leftCol[1]} isTop={false} isLeft />
            <Cell p={rightCol[1]} isTop={false} isLeft={false} />
          </div>

          {/* Colonna nera destra */}
          <div className="col-span-1 border-y-2 border-r-2 border-black" />
        </div>
      </div>
    </div>
  );
}
