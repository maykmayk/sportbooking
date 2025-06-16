import { SignalHigh } from "lucide-react";

export function GameCard({ title, matchType, odds, teamA, teamB, players }) {
  console.log (title, matchType, odds, teamA, teamB, players )
  return (
    <div className="flex flex-col gap-5 bg-gray-100 rounded-lg p-4">
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
        <div className="w-full flex justify-between font-semibold">
          <div className="text-sm">{teamA}</div>
          <div className="text-sm">{teamB}</div>
        </div>

        <div className="grid grid-cols-5">
          {/* Blocco sinistro */}
          <div className="col-span-1 border-y-2 border-l-2 border-black" />

          {/* Blocco centrale */}
          <div className="col-span-3 grid grid-cols-2 border-2 border-black">
            {[...players, ...Array(4 - players.length).fill({ name: '', value: '' })]
              .slice(0, 4)
              .map((player, idx) => {
                const isEmpty = !player.name && !player.value;

                return (
                  <div
                    key={idx}
                    className={`relative aspect-square flex flex-col justify-center items-center text-center border-black ${
                      idx < 2 ? "border-b-2" : ""
                    } ${idx % 2 === 0 ? "border-r-2" : ""} ${
                      isEmpty
                        ? "bg-white"
                        : player.highlight
                        ? "bg-accent text-white"
                        : "bg-white"
                    }`}
                  >
                    {isEmpty ? (
                      <button
                        type="button"
                        className="text-4xl text-accent"
                        onClick={() => console.log("Add player clicked")}
                      >
                        +
                      </button>
                    ) : (
                      <>
                        <div className="text-sm font-medium">{player.name}</div>
                        <div className="text-xs text-gray-500">{player.value}</div>
                      </>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Blocco destro */}
          <div className="col-span-1 border-y-2 border-r-2 border-black" />
        </div>
      </div>
    </div>
  );
}