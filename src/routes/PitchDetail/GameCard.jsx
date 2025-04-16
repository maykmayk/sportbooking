import { SignalHigh } from "lucide-react";

export function GameCard({ title, matchType, odds, teamA, teamB, players }) {
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
            {players.map((player, idx) => (
              <div
                key={idx}
                className={`p-4 text-center border-black ${
                  idx < 2 ? "border-b-2" : ""
                } ${idx % 2 === 0 ? "border-r-2" : ""} ${
                  player.highlight
                    ? "bg-accent relative text-white text-4xl"
                    : "bg-white"
                }`}
              >
                {player.highlight ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    +
                  </div>
                ) : (
                  <>
                    <div>{player.name}</div>
                    <div>{player.value}</div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Blocco destro */}
          <div className="col-span-1 border-y-2 border-r-2 border-black" />
        </div>
      </div>
    </div>
  );
}