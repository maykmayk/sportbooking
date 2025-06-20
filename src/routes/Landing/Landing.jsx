import { Menu, Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiManager from "../../api/ApiManager";
import BaseAppLayout from "../../layouts/BaseAppLayout";

const getNext14Days = () => {
    const formatter = new Intl.DateTimeFormat('it-IT', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    });

    return Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const parts = formatter.formatToParts(date);

        return {
            label: parts.find(p => p.type === 'weekday')?.value.toUpperCase(),
            day: parts.find(p => p.type === 'day')?.value,
            month: parts.find(p => p.type === 'month')?.value.charAt(0).toUpperCase() + parts.find(p => p.type === 'month')?.value.slice(1),
        };
    });
};

export const Landing = () => {
    const api = new ApiManager();
    
    const images = [
        "https://plus.unsplash.com/premium_photo-1707862953516-9dd3032b69a8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFkZWx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1646649853703-7645147474ba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFkZWx8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1707862954401-7f68ad9c3cb3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBhZGVsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1646649853517-e2f75cde1908?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhZGVsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1673253408723-b5cfbfe00af6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBhZGVsfGVufDB8fDB8fHww"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const [days, setDays] = useState(getNext14Days());
    const [selectedOffset, setSelectedOffset] = useState(0); 
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        setDays(getNext14Days());
    }, []);

    useEffect(() => {
        fetchSlots();
    }, [selectedOffset]);

    const fetchSlots = async () => {
        setLoading(true);
        try {
            console.log(`/PublicMatches/offset/${selectedOffset}`)
            const response = await api.get(`/PublicMatches/offset/${selectedOffset}`);
            const data = response.data;

            const parsedSlots = data.map(item => {
                const hour = item.localHour.toString().padStart(2, "0");
                const minute = item.localMinute.toString().padStart(2, "0");
                return {
                    time: `${hour}:${minute}`,
                    count: item.openedCount,
                    total: item.totalCount 
                };
            });


            console.log(parsedSlots);
            setSlots(parsedSlots);

            // Mostra il tooltip con i parsedSlots come stringa
            setTooltipMessage(`Parsed Slots: ${JSON.stringify(parsedSlots, null, 2)}`);
            setShowTooltip(true);

            // Nascondi il tooltip dopo 5 secondi
            setTimeout(() => {
                setShowTooltip(false);
            }, 5000);

        } catch (error) {
            console.error("Errore nel recupero degli slot", error);
            setSlots([]);
            setTooltipMessage("Errore nel recupero dei dati");
            setShowTooltip(true);

            setTimeout(() => {
                setShowTooltip(false);
            }, 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseAppLayout>
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
                        <Link to="/favorites">
                            <div className="aspect-square bg-white h-12 w-12 flex items-center justify-center rounded-full ">
                                <Star size={20} />
                            </div>
                        </Link>
                    </div>
                    <div className="absolute top-4 right-4">
                        <div className="aspect-square bg-white h-12 w-12 flex items-center justify-center rounded-full ">
                            <Menu size={20} />
                        </div>
                    </div>

                    <div className="px-4  bg-white mt-[-40px] rounded-t-3xl p-6 relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 w-fit pt-4 px-8 bg-white rounded-t-lg">
                            <img
                                src="https://www.countrysportvillage.it/wp-content/uploads/2023/01/COUNTRY-LOGO-2023-Nero.png"
                                alt="Country Sport Village"
                                className="mx-auto mb-2 w-20"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-center">Country Sport Village</h1>
                        <p className="text-center text-gray-400 text-sm">
                            Via Guglielmo Pepe, 68, 20037 Paderno Dugnano MI
                        </p>
                    </div>
                </div>

                <div className="px-4 flex flex-col gap-6">
                    {/* Date Navigation */}
                    <div className="flex justify-around py-4 overflow-x-auto whitespace-nowrap gap-5 ml-[-16px] mr-[-16px] scrollbar-hidden px-4">
                        {days.map((day, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center text-gray-500 cursor-pointer`}
                                onClick={() => setSelectedOffset(index)}
                            >
                                <span className="text-sm font-semibold">{day.label}</span>
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold mt-1 ${selectedOffset === index ? "bg-accent text-white" : "border border-gray-300"}`}
                                >
                                    {day.day}
                                </div>
                                <span className="text-xs">{day.month}</span>
                            </div>
                        ))}
                    </div>

                    {/* Time Slots */}
                    <div className="grid grid-cols-4 gap-3">
                        {loading ? (
                            <div className="col-span-4 text-center py-4">Caricamento...</div>
                        ) : (
                            slots.map((slot, idx) => (
                                <Link to={`/pitch-detail/${selectedOffset}/${slot.time.split(":")[0]}/${slot.time.split(":")[1]}`} key={idx}>
                                    <div
                                        key={idx}
                                        className={`relative rounded-lg text-center py-3 font-bold text-sm ${slot.count === 0
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-white text-black border border-gray-300 hover:bg-accent hover:text-white cursor-pointer hover:border-accent"
                                            }`}
                                    >
                                        {slot.time}
                                        <div
                                        // w-5 h-5
                                            className={`absolute -top-2 -right-2 text-white text-xs px-1 flex items-center justify-center rounded-full ${slot.count === 0 ? 'bg-gray-400' : 'bg-accent'}`}
                                        >
                                            {slot.count} di {slot.total}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* Tooltip */}
                    {showTooltip && (
                        <div className="absolute max-h-[40vh] overflow-y-scroll top-16 right-4 left-4 bg-black text-white px-4 py-2 rounded-md shadow-lg">
                            {tooltipMessage}
                        </div>
                    )}

                </div>
            </div>
        </div>
        </BaseAppLayout>
    );
};
