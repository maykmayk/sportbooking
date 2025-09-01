import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const FiltersContext = createContext(null);

export function FiltersProvider({ children }) {
  const [levelRange, setLevelRange] = useState([0, 7]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [appliedAt, setAppliedAt] = useState(0); // cambia solo quando l’utente preme "Applica"

  // load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("filters");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.levelRange)) setLevelRange(parsed.levelRange);
        if (Array.isArray(parsed.selectedValues)) setSelectedValues(parsed.selectedValues);
      }
    } catch {}
  }, []);

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify({ levelRange, selectedValues }));
  }, [levelRange, selectedValues]);

  const filter = useMemo(
    () => selectedValues.reduce((acc, v) => acc | (1 << v), 0),
    [selectedValues]
  );

  const resetFilters = () => {
    setLevelRange([0, 7]);
    setSelectedValues([]);
  };

  const applyFilters = () => {
    // segnala ai consumer (Landing/PitchDetail) che i filtri sono stati "applicati"
    setAppliedAt(Date.now());
  };

  const value = {
    levelRange,
    setLevelRange,
    selectedValues,
    setSelectedValues,
    filter,
    resetFilters,
    applyFilters,
    appliedAt,
  };

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within FiltersProvider");
  return ctx;
}
