import { useEffect, useState } from "react";
import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Link } from "react-router-dom";

export default function MyReservationsPage() {
    const [reservations, setReservations] = useState([]);
    const [selectedId, setSelectedId] = useState(null); // 취소하려는 예약 ID
    const [activeTab, setActiveTab] = useState("upcoming");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("myReservations") || "[]");
        setReservations(saved);
    }, []);

    const confirmCancel = () => {
        if (selectedId !== null) {
            const updated = reservations.filter((r) => r.id !== selectedId);

            setReservations(updated);
            localStorage.setItem("myReservations", JSON.stringify(updated));
            setSelectedId(null); // 모달 닫기
        }
    };

    // 상태별 예약 분리
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

    // 예약 카드 컴포넌트
    const ReservationCard = ({ r, type }) => (
        <div className="bg-gray-100 shadow rounded-lg overflow-hidden mb-4 flex items-center">
            <img
                src={r.imageUrl || "/default-golf.jpg"}
                alt={r.storeName}
                className="w-32 h-32 object-cover"
            />

            <div className="flex-1 p-4">
                <h3 className="font-bold text-lg">{r.storeName}</h3>
                <p className="text-sm text-gray-600">
                    {formatDateTime(r.date, r.time)}
                </p>
                <p className="text-sm">
                    룸: {r.room} | 인원: {r.people || 2}명
                </p>
                <p className="text-sm text-gray-500">
                    {r.contact || "02-1234-5678"}
                </p>
                <p className="text-yellow-600 font-semibold">
                    {r.price ? `${r.price.toLocaleString()}원` : "30,000원"}
                </p>
                <div className="flex space-x-2 mt-2">
                    <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                        예약 상세
                    </button>
                    {/* 예정된 예약일 때만 취소 버튼 보이기 */}
                    {type === "upcoming" && (
                        <button
                            onClick={() => setSelectedId(r.id)}
                            className="px-3 py-1 border rounded text-sm hover:bg-gray-100 text-red-600"
                        >
                            취소
                        </button>
                    )}
                    <button className="px-2 py-1 border rounded text-sm hover:bg-gray-100">
                        매장 연락
                    </button>
                </div>
            </div>
        </div>
    );


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

            {/* 예정된 예약 */}
            {activeTab === "upcoming" &&
                (upcoming.length === 0 ? (
                    <p className="text-gray-500 text-center">예정된 예약이 없습니다.</p>
                ) : (
                    upcoming.map((r, i) => <ReservationCard key={i} r={r} type="upcoming" />)
                ))}

            {/* 지난 예약 */}
            {activeTab === "past" &&
                (past.length === 0 ? (
                    <p className="text-gray-500 text-center">지난 예약이 없습니다.</p>
                ) : (
                    past.map((r, i) => <ReservationCard key={i} r={r} type="past" />)
                ))}

            {/* 취소 모달 */}
            {selectedId !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <h2 className="text-lg font-bold mb-4">예약 취소 확인</h2>
                        <p className="mb-6 text-gray-600">
                            정말 이 예약을 취소하시겠습니까?
                        </p>
                        <div className="flex justify-around">
                            <button
                                onClick={confirmCancel}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                확인
                            </button>
                            <button
                                onClick={() => setSelectedId(null)}
                                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
