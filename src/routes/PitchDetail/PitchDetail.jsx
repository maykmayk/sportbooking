import { ArrowLeft, Menu, SignalHigh, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { GameCard } from "./GameCard";

export const PitchDetail = () => {
    const images = [
        "https://images.unsplash.com/photo-1646649853703-7645147474ba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFkZWx8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1707862954401-7f68ad9c3cb3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBhZGVsfGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1707862953516-9dd3032b69a8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFkZWx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1646649853517-e2f75cde1908?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhZGVsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1673253408723-b5cfbfe00af6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBhZGVsfGVufDB8fDB8fHww"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const cardsData = [
        {
            title: "Campo 1",
            matchType: "Amichevole",
            odds: "0,79 - 1,80",
            teamA: "Squadra A",
            teamB: "Squadra B",
            players: [
                { name: "Luca", value: "1,79" },
                { name: "Gianluca", value: "1,26" },
                { highlight: true },
                { name: "Federica", value: "1,46" },
            ],
        },
        {
            title: "Campo 2",
            matchType: "Torneo",
            odds: "1,10 - 2,30",
            teamA: "Leoni",
            teamB: "Tigri",
            players: [
                { name: "Marco", value: "2,05" },
                { name: "Sara", value: "1,95" },
                { highlight: true },
                { name: "Giulia", value: "1,88" },
            ],
        },
        {
            title: "Campo 3",
            matchType: "Finale",
            odds: "1,50 - 1,60",
            teamA: "Falchi",
            teamB: "Aquiloni",
            players: [
                { name: "Alessandro", value: "1,60" },
                { name: "Marta", value: "1,57" },
                { highlight: true },
                { name: "Elisa", value: "1,55" },
            ],
        },
    ];

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
                        <Link to="/">
                            <div className="aspect-square bg-white h-12 w-12 flex items-center justify-center rounded-full ">
                                <ArrowLeft size={20} />
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
                        <h1 className="text-2xl font-bold text-center">Partite aperte ore 09:00</h1>

                    </div>
                </div>

                <div className="px-4 flex flex-col gap-6">
                    {cardsData.map((data, index) => (
                        <GameCard key={index} {...data} />
                    ))}
                </div>
            </div>
        </div >
    );
};


