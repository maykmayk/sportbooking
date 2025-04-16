import { ArrowLeft, Menu, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Favorites () {
    const images = [
        "https://plus.unsplash.com/premium_photo-1707862953516-9dd3032b69a8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFkZWx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1646649853703-7645147474ba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFkZWx8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1707862954401-7f68ad9c3cb3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBhZGVsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1646649853517-e2f75cde1908?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhZGVsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1673253408723-b5cfbfe00af6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBhZGVsfGVufDB8fDB8fHww"
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

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

            <div className="flex flex-col bg-white ">
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

                    <div className="px-4  bg-white mt-[-40px] rounded-t-3xl p-6 h-full">
                        <h1 className="text-2xl font-bold text-center">Preferiti</h1>
                        <p className="text-center text-gray-400 text-sm">
                            Qui vedrai i tuoi campi preferiti
                        </p>
                    </div>
                </div>

                <div className="px-4 flex flex-col gap-6">
                    <div className="">
                        
                    </div>
                </div>
            </div>
        </div >
    );
};
