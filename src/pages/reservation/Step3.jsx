import { useLocation, useNavigate } from "react-router-dom";
import StepIndicator from "../../components/StepIndicator";

export default function Step3() {
    const location = useLocation();
    const {store, slot} = location.state;
    const navigate = useNavigate();

    if(!store || !slot) {
        return <p className="text-center text-red-500">잘못된 접근!!!</p>
    }

    const handleConfirm = (e) => {
        e.preventDefault();
        const saved = JSON.parse(localStorage.getItem("myReservations") || "[]");

        const newReservation = {
            id: slot.id,
            storeId: store.id,
            storeName: store.name,
            date: slot.date,
            time: slot.time,
            room: slot.room,
            status: "예약완료",
            imageUrl: store.imageUrl,
            people: 2
        }

        localStorage.setItem(
            "myReservations",
            JSON.stringify([...saved, newReservation])
        )

        alert("예약이 완료되었습니다!")
        navigate("/my-reservations")
    }
    return (
        <div className="max-w-2xl mx-auto p-6">
            <StepIndicator current={3} />
            <h1 className="text-2xl font-bold mb-6 text-center">예약 정보를 확인해주세요</h1>

            <div className="bg-white shadow p-6 rounded mb-6">
                <h2 className="font-semibold mb-2">예약 요약</h2>
                <p>골프장: {store.name}</p>
                <p>날짜: {slot.date}</p>
                <p>시간: {slot.time}</p>
                <p>룸: {slot.room}</p>
            </div>

            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="이름"
                    className="w-full border p-2 rounded"
                />
                <input
                    type="tel"
                    placeholder="연락처"
                    className="w-full border p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="이메일"
                    className="w-full border p-2 rounded"
                />
                <textarea
                    placeholder="요청사항(선택)"
                    className="w-full border p-2 rounded"
                />
                <button 
                    onClick={handleConfirm}
                    className="w-full bg-black text-white py-3 rounded">
                    예약 완료하기
                </button>
            </form>
        </div>
    )
}