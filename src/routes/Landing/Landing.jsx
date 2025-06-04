import { Menu, Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiManager from "../../api/ApiManager";

export const Landing = () => {
    const api = new ApiManager();

    const days = [
        { label: "GIO", day: "06", month: "Feb" },
        { label: "VEN", day: "07", month: "Feb" },
        { label: "SAB", day: "08", month: "Feb" },
        { label: "DOM", day: "09", month: "Feb" },
        { label: "LUN", day: "10", month: "Feb" },
        { label: "MAR", day: "11", month: "Feb" },
        { label: "MER", day: "12", month: "Feb" },
        { label: "GIO", day: "13", month: "Feb" },
        { label: "VEN", day: "14", month: "Feb" },
        { label: "SAB", day: "15", month: "Feb" },
        { label: "DOM", day: "16", month: "Feb" },
        { label: "LUN", day: "17", month: "Feb" },
        { label: "MAR", day: "18", month: "Feb" },
        { label: "MER", day: "19", month: "Feb" },
    ];

    const images = [
        "https://plus.unsplash.com/premium_photo-1707862953516-9dd3032b69a8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFkZWx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1646649853703-7645147474ba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFkZWx8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1707862954401-7f68ad9c3cb3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBhZGVsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1646649853517-e2f75cde1908?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhZGVsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1673253408723-b5cfbfe00af6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBhZGVsfGVufDB8fDB8fHww"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const [selectedOffset, setSelectedOffset] = useState(0); // 0 = oggi
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);

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
                    count: item.openedCount
                };
            });

            setSlots(parsedSlots);
        } catch (error) {
            console.error("Errore nel recupero degli slot", error);
            setSlots([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Header */}
            <div className="w-full h-48">
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
                                <Link to="/pitch-detail" key={idx}>
                                    <div
                                        className={`relative rounded-lg text-center py-3 font-bold text-sm ${slot.count === 0
                                            ? "bg-gray-200 text-gray-400"
                                            : "bg-white text-black border border-gray-300 hover:bg-accent hover:text-white cursor-pointer hover:border-accent"
                                            }`}
                                    >
                                        {slot.time}
                                        {slot.count > 0 && (
                                            <div className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                                {slot.count}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
