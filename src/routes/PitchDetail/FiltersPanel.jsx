import React, { useEffect, useMemo, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ApiManager from "../../api/ApiManager";
import { useFilters } from "../../context/FiltersContext";

export function FiltersPanel({ onClose }) {
  const api = useMemo(() => new ApiManager(), []);
  const [config, setConfig] = useState(null); // { base, minLevel, maxLevel, filters[] }
  const { levelRange, setLevelRange, selectedValues, setSelectedValues, resetFilters, filter, applyFilters } = useFilters();

  // carica FilterConfig UNA SOLA VOLTA (no dipendenza da levelRange!)
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/FilterConfig");
        const cfg = res.data;
        setConfig(cfg);

        // se il range è ancora "default", allinealo ai limiti del club
        if (Array.isArray(levelRange) && levelRange[0] === 0 && levelRange[1] === 7) {
          setLevelRange([cfg.minLevel ?? 0, cfg.maxLevel ?? 7]);
        }
      } catch (e) {
        console.error("Errore caricando FilterConfig:", e);
      }
    };
    load();
  }, [api, setLevelRange]); // <— niente levelRange nelle deps

  const handleCheckboxChange = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleReset = () => {
    resetFilters();
    if (config) setLevelRange([config.minLevel ?? 0, config.maxLevel ?? 7]);
  };

  if (!config) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-500">
        Caricamento filtri...
      </div>
    );
  }

  const sliderMin = config.minLevel ?? 0;
  const sliderMax = config.maxLevel ?? 7;

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
          min={sliderMin}
          max={sliderMax}
          step={0.1}
          value={levelRange}
          onChange={(val) => setLevelRange(val)}
          onChangeComplete={(val) => setLevelRange(val)}
          trackStyle={[{ backgroundColor: '#a3a9e2', height: 6 }]}
          handleStyle={[
            { borderColor: '#a3a9e2', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: 20, height: 20, marginTop: -7 },
            { borderColor: '#a3a9e2', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: 20, height: 20, marginTop: -7 },
          ]}
          railStyle={{ backgroundColor: '#e5e7eb', height: 6 }}
        />

        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Principiante ({sliderMin})</span>
          <span>Professionista ({sliderMax})</span>
        </div>
      </div>

      {/* Filtri dinamici */}
      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-4">Tipo partita / Genere</label>
        <div className="grid grid-cols-2 gap-3">
          {config.filters?.map((f) => {
            const isChecked = selectedValues.includes(f.value);
            return (
              <label
                key={f.value}
                className={`relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${isChecked ? 'border-accent bg-accent/5 text-accent' : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'}
                `}
                title={f.description}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(f.value)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
                    ${isChecked ? 'border-accent bg-accent' : 'border-gray-300 bg-white'}
                  `}
                >
                  {isChecked && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium line-clamp-1">{f.description}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="text-xs text-gray-400">
        <strong>Debug:</strong> filter mask = {filter} (hex: {filter.toString(16)})
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
          onClick={() => { applyFilters(); onClose(); }}
          className="flex-1 py-3 px-4 text-sm font-medium text-white bg-accent rounded-xl hover:bg-accent/90 transition-colors duration-200"
        >
          Applica filtri
        </button>
      </div>
    </div >
  );
}
