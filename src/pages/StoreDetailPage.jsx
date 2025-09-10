import { useNavigate, useParams } from "react-router-dom";
import stores from "../data/stores.json";
import React from 'react'
import slots from "../data/slots.json";

export default function StoreDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const storeId = parseInt(id);

    const store = stores.find((s) => s.id === storeId);

    const now = new Date();

    const storeSlots = slots.filter((slot) =>
        slot.storeId === storeId &&
        new Date(`${slot.date}T${slot.time}:00`) >= now
    );

    if (!store) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500 font-semibold">존재하지 않는 매장입니다.</p>
            </div>
        )
    }
    const reserved = JSON.parse(localStorage.getItem("myReservations") || "[]");

    const isReserved = (slot) => {
        return reserved.some(   // some ? 배열 안에 있는 원소들 중 하나라도 조건 만족하면 true, 아니면 false 리턴
            (r) =>
                r.storeId === slot.storeId &&
                r.date === slot.date &&
                r.time === slot.time &&
                r.room === slot.room &&
                r.status !== "취소됨"
        );
    };

    const handleSelectSlot = (slot) => {
        navigate("/reserve", { state: slot });
    }

    const groupedSlots = storeSlots.reduce((groups, slot) => {
        if (!groups[slot.date]) groups[slot.date] = [];
        groups[slot.date].push(slot);
        return groups;
    }, {});
    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{store.name}</h1>
                <p className="text-gray-600 mb-6">{store.address}</p>
            </div>

            <h2 className="text-xl font-semibold mb-4 mt-4">예약 가능 슬롯</h2>
            {Object.keys(groupedSlots).length === 0 ? (
                <p className="text-gray-500">예약 가능한 슬롯이 없습니다.</p>
            ) : (
                Object.keys(groupedSlots).map((date) => (
                    <div key={date} className="mb-8">
                        {/* 날짜 헤더 */}
                        <div className="flex items-center mb-3">
                            <span className="text-blue-600 mr-2">📅</span>
                            <h3 className="text-lg font-bold text-gray-700 mb-2">
                                {date}
                            </h3>
                        </div>
                        {/* 슬롯 카드들 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {groupedSlots[date].map((slot) => (
                                <div
                                    key={slot.id}
                                    className="bg-white border rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">{slot.time}</p>
                                        <p className="text-sm text-gray-500">룸: {slot.room}</p>
                                    </div>

                                    {isReserved(slot) ? (
                                        <button
                                            disabled
                                            className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                                        >
                                            예약 완료
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleSelectSlot(slot)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                        >
                                            예약하기
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}