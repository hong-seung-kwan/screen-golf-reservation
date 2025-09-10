import { useLocation, useNavigate } from "react-router-dom";
import slots from "../../data/slots.json";
import StepIndicator from "../../components/StepIndicator";
import { useState } from "react";

export default function Step2() {
  const location = useLocation();
  const navigate = useNavigate();
  const { store } = location.state;
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!store) {
    return <p className="text-center text-red-500">잘못된 접근!!</p>;
  }

  const reserved = JSON.parse(localStorage.getItem("myReservations") || "[]");

  // 해당 매장의 선택된 날짜 슬롯만 필터링
  const availableSlots = slots.filter(
    (s) =>
      s.storeId === store.id &&
      (date === "" || s.date === date) &&
      !reserved.some(
        (r) =>
          r.storeId === s.storeId &&
          r.date === s.date &&
          r.time === s.time &&
          r.room === s.room
      )
  );

  const handleNext = () => {
    if (!date || !selectedSlot) {
      alert("날짜와 시간을 선택해주세요.");
      return;
    }

    navigate("/reservation/Step3", {
      state: {
        store,
        slot: { ...selectedSlot, people }, // 슬롯 정보 + 인원
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <StepIndicator current={2} />

      <h1 className="text-2xl font-bold mb-6 text-center">
        날짜와 시간을 선택해주세요
      </h1>

      {/* 매장 정보 */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold">{store.name}</h2>
        <p className="text-sm text-gray-600">{store.address}</p>
        <p className="text-yellow-600 font-bold">{store.priceText}</p>
      </div>

      {/* 날짜 선택 */}
      <div className="bg-gray-50 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">날짜 선택</h3>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* 인원 선택 */}
      <div className="bg-gray-50 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">인원 수</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setPeople(num)}
              className={`px-4 py-2 border rounded ${people === num
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
                }`}
            >
              {num}명
            </button>
          ))}
        </div>
      </div>

      {/* 시간 + 룸 선택 */}
      <div className="bg-gray-50 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">시간 & 룸 선택</h3>
        {date === "" ? (
          <p className="text-sm text-gray-500">먼저 날짜를 선택해주세요</p>
        ) : availableSlots.length === 0 ? (
          <p className="text-sm text-red-500">
            해당 날짜에는 예약 가능한 시간이 없습니다.
          </p>
        ) : (
          <div className="space-y-4">
            {Object.entries(
              availableSlots.reduce((acc, slot) => {
                if (!acc[slot.room]) acc[slot.room] = [];
                acc[slot.room].push(slot);
                return acc;
              }, {})
            ).map(([room, roomSlots]) => (
              <div key={room}>
                <h4 className="font-semibold mb-2">{room}</h4>
                <div className="flex flex-wrap gap-2">
                  {roomSlots.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSlot(s)}
                      className={`px-3 py-2 border rounded text-sm ${selectedSlot?.id === s.id
                          ? "bg-black text-white"
                          : "bg-white hover:bg-gray-100"
                        }`}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded"
      >
        다음 단계
      </button>
    </div>
  );
}
