import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export function FiltersPanel({ onClose }) {
  const [levelRange, setLevelRange] = useState([2.5, 5.5]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const types = ["Competitiva", "Amichevole", "Femminile", "Maschile", "Mista", "Aperta"];

  // Carica filtri da localStorage
  useEffect(() => {
    const saved = localStorage.getItem("filters");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.levelRange) setLevelRange(parsed.levelRange);
        if (parsed.selectedTypes) setSelectedTypes(parsed.selectedTypes);
      } catch (e) {
        console.error("Errore nel parsing dei filtri salvati:", e);
      }
    }
  }, []);

  // Salva i filtri ogni volta che cambiano
  useEffect(() => {
    const filters = {
      levelRange,
      selectedTypes,
    };
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [levelRange, selectedTypes]);

  const handleCheckboxChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleReset = () => {
    setLevelRange([0, 7]);
    setSelectedTypes([]);
    localStorage.removeItem("filters");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Slider livello */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-gray-700">Livello giocatori</label>
          <div className="bg-accent/10 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-accent">
              {levelRange[0].toFixed(1)} - {levelRange[1].toFixed(1)}
            </span>
          </div>
        </div>

        <Slider
          range
          min={0}
          max={7}
          step={0.1}
          value={levelRange}
          onChange={setLevelRange}
          trackStyle={[{ backgroundColor: '#a3a9e2', height: 6 }]}
          handleStyle={[
            {
              borderColor: '#a3a9e2',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              width: 20,
              height: 20,
              marginTop: -7,
            },
            {
              borderColor: '#a3a9e2',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              width: 20,
              height: 20,
              marginTop: -7,
            },
          ]}
          railStyle={{ backgroundColor: '#e5e7eb', height: 6 }}
        />

        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Principiante (0)</span>
          <span>Professionista (7)</span>
        </div>
      </div>

      {/* Tipo partita */}
      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-4">Tipo partita</label>
        <div className="grid grid-cols-2 gap-3">
          {types.map((type) => (
            <label
              key={type}
              className={`relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${
                  selectedTypes.includes(type)
                    ? 'border-accent bg-accent/5 text-accent'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                }`}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
                    ${
                      selectedTypes.includes(type)
                        ? 'border-accent bg-accent'
                        : 'border-gray-300 bg-white'
                    }`}
                >
                  {selectedTypes.includes(type) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm font-medium">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[2px] bg-gray-100" />

      {/* Pulsanti azione */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="flex-1 py-3 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
        >
          Azzera filtri
        </button>
        <button
            onClick={onClose}
            className="flex-1 py-3 px-4 text-sm font-medium text-white bg-accent rounded-xl hover:bg-accent/90 transition-colors duration-200"
            >
            Applica filtri
        </button>
      </div>
    </div>
  );
}
