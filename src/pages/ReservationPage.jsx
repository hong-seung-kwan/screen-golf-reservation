import { useLocation, useNavigate } from "react-router-dom";
import stores from "../data/stores.json";
import React from 'react'

export default function ReservationPage() {

    const location = useLocation();
    const navigate = useNavigate();
    const slot = location.state;

    if (!slot) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500 font-semibold">
                    잘못된 접근입니다. 매장에서 예약을 선택하세요.
                </p>
            </div>
        )
    }

    const store = stores.find((s) => s.id === slot.storeId);

    const handleReserve = () => {
        const saved = JSON.parse(localStorage.getItem("myReservations") || "[]");

        const newReservation = {
            ...slot,
            status: "예약완료",
            storeName: store?.name || "알 수 없는 매장",
        }
        localStorage.setItem("myReservations", JSON.stringify([...saved, newReservation]));

        alert("예약이 완료되었습니다!!!");
        navigate("/my-reservations");
    };

    if (!slot) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500 font-semibold">잘못된 접근입니다. 매장에서 예약을 선택하세요.</p>
            </div>
        )
    }


    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">예약 확인</h1>

                <div className="space-y-3 mb-6">
                    <p className="text-gray-700"><span className="font-semibold">매장:</span> {store?.name}</p>
                    <p className="text-gray-700"><span className="font-semibold">날짜:</span> {slot.date}</p>
                    <p className="text-gray-700"><span className="font-semibold">시간:</span> {slot.time}</p>
                    <p className="text-gray-700"><span className="font-semibold">룸:</span> {slot.room}</p>

                </div>

                <button
                    onClick={handleReserve}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded shadow transition"
                >
                    예약 확정
                </button>
            </div>
        </div>
    );
}