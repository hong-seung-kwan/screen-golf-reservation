import { Link } from "react-router-dom";
import React from 'react'

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-white font-bold text-xl">스크린 골프 예약</h1>

                <div className="space-x-6">
                    <Link
                        to="/"
                        className="text-gray-200 hover:text-white transition"
                    >
                        홈으로
                    </Link>
                    <Link
                        to="/SearchPage"
                        className="text-gray-200 hover:text-white transition"
                    >
                        매장 목록
                    </Link>
                    <Link
                        to="/my-reservations"
                        className="text-gray-200 hover:text-white transition"   
                    >
                        내 예약 내역
                    </Link>
                </div>
            </div>
        </nav>
    );
}