import { useEffect, useState } from "react";
// import stores from "../data/stores.json";
import React from 'react'
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Link } from "react-router-dom";

export default function MyReservationsPage() {

    const [reservations, setReservations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [activeTab, setActiveTab] = useState("upcoming");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("myReservations") || "[]");
        setReservations(saved);
    }, []);

    const confirmCancel = () => {
        if (selectedId !== null) {
            const updated = reservations.map((r) =>
                r.id === selectedId ? { ...r, status: "취소됨" } : r
            )
            setReservations(updated);
            localStorage.setItem("myReservations", JSON.stringify(updated));
            setSelectedId(null);
        }
    }

    // 상태별 색상 및 텍스트
    const now = new Date();
    const upcoming = reservations.filter(
        (r) => new Date(`${r.date}T${r.time}:00`) >= now
    );
    const past = reservations.filter(
        (r) => new Date(`${r.date}T${r.time}:00`) < now
    );

    const formatDateTime = (date, time) => {
        return format(new Date(`${date}T${time}:00`), "yyyy년 M월 d일 (E) a h시", {
            locale: ko,
        });
    };

    const ReservationCard = ({ r }) => (
        <div className="bg-gray-100 shadow rounded-lg overflow-hidden mb-4 flex items-center">
            <img
                src={r.imageUrl || "/default-golf.jpg"}
                alt={r.storeName}
                className="w-32 h-32 object-cover"
            />

            <div className="flex-1 p-4">
                <h3 className="font-bold text-lg">{r.storeName}</h3>
                <p className="text-sm text-gray-600">{formatDateTime(r.date, r.time)}</p>
                <p className="text-sm">룸: {r.room} | 인원: {r.people || 2}명</p>
                <p className="text-sm text-gray-500">{r.contact || "02-1234-5678"}</p>
                <p className="text-yellow-600 font-semibold">
                    {r.price ? `${r.price.toLocaleString()}원` : "30,000원"}
                </p>
                <div className="flex space-x-2 mt-2">
                    <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                        예약 상세
                    </button>
                    <button
                        onClick={confirmCancel}
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                        취소
                    </button>
                    <button className="px-2 py-1 border rounded text-sm hover:bg-gray-100">
                        매장 연락
                    </button>
                </div>
            </div>

            <div className="p-4 flex items-center">
                <span
                    className={`text-sm font-semibold px-2 py-1 rounded ${r.status === "예약완료"
                            ? "bg-green-100 text-green-600"
                            : r.status === "취소됨"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                        }`}
                >
                    {r.status || "예약확정"}
                </span>
            </div>
        </div>
    )

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">내 예약 관리</h1>

            {/* 탭 */}
            <div className="flex space-x-6 border-b mb-6 justify-center">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`pb-2 ${activeTab === "upcoming"
                            ? "border-b-2 border-green-500 font-bold"
                            : "text-gray-500"
                        }`}
                >
                    예정된 예약 ({upcoming.length})
                </button>
                <button
                    onClick={() => setActiveTab("past")}
                    className={`pb-2 ${activeTab === "past"
                            ? "border-b-2 border-gray-500 font-bold"
                            : "text-gray-500"
                        }`}
                >
                    지난 예약 ({past.length})
                </button>
            </div>

            {/* 예약 리스트 */}
            {activeTab === "upcoming" &&
                (upcoming.length === 0 ? (
                    <p className="text-gray-500 text-center">예정된 예약이 없습니다.</p>
                ) : (
                    upcoming.map((r, i) => <ReservationCard key={i} r={r} />)
                ))}

            {activeTab === "past" &&
                (past.length === 0 ? (
                    <p className="text-gray-500 text-center">지난 예약이 없습니다.</p>
                ) : (
                    past.map((r, i) => <ReservationCard key={i} r={r} />)
                ))}
        </div>
    );
}