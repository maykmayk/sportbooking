import { ArrowLeft, Filter, Menu } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ApiManager from "../../api/ApiManager";
import { GameCard } from "./GameCard";
import { FiltersPanel } from "./FiltersPanel";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../components/ui/drawer";

export const PitchDetail = () => {
    const { daysOffset, hour, minute } = useParams();
    const [searchParams] = useSearchParams();
    const api = new ApiManager();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const images = useMemo(() => [
        "https://images.unsplash.com/photo-1646649853703-7645147474ba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFkZWx8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1707862954401-7f68ad9c3cb3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBhZGVsfGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1707862953516-9dd3032b69a8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFkZWx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1646649853517-e2f75cde1908?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhZGVsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1673253408723-b5cfbfe00af6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBhZGVsfGVufDB8fDB8fHww"
    ], []);

    const randomImage = useMemo(() => images[Math.floor(Math.random() * images.length)], [images]);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    // Recupera il selectedOffset dalla query string per il link di ritorno
    const selectedOffset = searchParams.get('selectedOffset') || '0';

    // Calcola la data locale da quella UTC passata nei parametri
    const getLocalTimeLabel = () => {
        const utcDate = new Date();
        utcDate.setUTCHours(parseInt(hour), parseInt(minute), 0, 0);

        const localHour = utcDate.getHours().toString().padStart(2, "0");
        const localMinute = utcDate.getMinutes().toString().padStart(2, "0");

        return `${localHour}:${localMinute}`;
    };

    useEffect(() => {
        fetchMatches();
    }, [daysOffset, hour, minute]);

    const fetchMatches = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/PublicMatches/hour/${hour}/minute/${minute}/daysOffset/${daysOffset}`);
            const data = response.data;

            console.log(data)

            // Adattiamo i dati per le GameCard
            const parsed = data.map(match => {
                const players = match.teams.flatMap(team =>
                    team.players.map(player => ({
                        name: player.name,
                        value: "",
                    }))
                );

                const isJoinable = players.length < 4; // partite con meno di 4 giocatori

                return {
                    title: match.sportField || "",
                    matchType: "Partita Aperta",
                    odds: "",
                    teamA: "Team A",
                    teamB: "Team B",
                    players,
                    hasOpenSlots: isJoinable,
                    addMatchLink: match.addToMatchLink || "",
                };
            });

            // Ordina: prima quelle joinabili
            const ordered = parsed.sort((a, b) => {
                if (a.hasOpenSlots && !b.hasOpenSlots) return -1;
                if (!a.hasOpenSlots && b.hasOpenSlots) return 1;
                return 0;
            });

            console.log(ordered)

            setMatches(parsed);
        } catch (error) {
            console.error("Errore durante il recupero delle partite:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Header */}
            <div className="w-full h-48 overflow-hidden relative">
                <img
                    src={randomImage}
                    alt="Padel background"
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col bg-white pb-4">
                {/* Logo and Title */}
                <div className="flex flex-col">
                    <div className="absolute top-4 left-4">
                        <Link to={`/?selectedOffset=${selectedOffset}`}>
                            <div className="aspect-square bg-white h-12 w-12 flex items-center justify-center rounded-full ">
                                <ArrowLeft size={20} />
                            </div>
                        </Link>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                                <DrawerTrigger asChild>
                                <div
                                    onClick={() => setDrawerOpen(true)}
                                    className="aspect-square bg-white h-12 w-12 flex items-center justify-center rounded-full cursor-pointer"
                                >
                                    <Filter size={20} />
                                </div>
                                </DrawerTrigger>
                                <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Filtri disponibili</DrawerTitle>
                                </DrawerHeader>
                                <div className="p-2">
                                    <FiltersPanel key={drawerOpen ? "open" : "closed"} onClose={() => setDrawerOpen(false)} />
                                </div>
                                </DrawerContent>
                            </Drawer>
                            <div className="aspect-square bg-white h-12 w-12 flex items-center justify-center rounded-full ">
                                <Menu size={20} />
                            </div>
                        </div>

                    <div className="px-4 bg-white mt-[-40px] rounded-t-3xl p-6 relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 w-fit pt-4 px-8 bg-white rounded-t-lg">
                            <img
                                src="https://www.countrysportvillage.it/wp-content/uploads/2023/01/COUNTRY-LOGO-2023-Nero.png"
                                alt="Country Sport Village"
                                className="mx-auto mb-2 w-20"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-center">Partite ore {getLocalTimeLabel()}</h1>
                    </div>
                </div>

                <div className="px-4 flex flex-col gap-6">
                    
                    {loading ? (
                        <div className="text-center py-10">Caricamento partite...</div>
                    ) : matches.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">Nessuna partita disponibile</div>
                    ) : (
                        matches.map((data, index) => (
                            <div key={index} className={data.hasOpenSlots ? "" : "opacity-40"}>
                                <GameCard {...data} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};