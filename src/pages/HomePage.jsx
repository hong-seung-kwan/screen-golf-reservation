import React from "react";
import { useNavigate } from "react-router-dom";
import stores from "../data/stores.json";

export default function Homepage() {
  const navigate = useNavigate();
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const handleReserve = (store) => {
    navigate("/reservation/Step2", { state: { store } });
  };

  return (
    <div>
      {/* Hero 섹션 */}
      <section className="bg-gray-100 py-16 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          최고의 스크린골프 경험을 예약해보세요.
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6">
          스크린골프장을 편리하게 예약하고 즐기세요
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/reservation/Step1")}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 w-full md:w-auto"
          >
            지금 예약하기
          </button>
          <button
            onClick={() => navigate("/SearchPage")}
            className="bg-gray-200 px-6 py-3 rounded shadow hover:bg-gray-300 w-full md:w-auto"
          >
            매장찾기
          </button>
        </div>
      </section>

      {/* 빠른 예약 */}
      <section className="max-w-4xl mx-auto mt-12 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">빠른 예약</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="date" className="border rounded p-2 w-full" />
          <select className="border rounded p-2 w-full">
            <option>시간을 선택하세요</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <select className="border rounded p-2 w-full">
            <option>인원 선택</option>
            <option>1명</option>
            <option>2명</option>
            <option>3명</option>
            <option>4명</option>
          </select>
        </div>
        <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          예약 가능한 매장 찾기
        </button>
      </section>

      {/* 인기 매장 */}
      <section className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">인기 골프장</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.slice(0, 3).map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={store.imageUrl || "/default-golf.jpg"}
                alt={store.name}
                className="rounded-t-lg h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{store.name}</h3>
                <p className="text-sm text-gray-500">{store.address}</p>
                <p className="text-yellow-500 font-semibold mt-1">
                  ⭐ {store.rating}
                </p>
                <p className="text-blue-600 font-semibold mt-2">
                  {store.priceText}
                </p>
                <button
                  onClick={() => handleReserve(store)}
                  className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  예약하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer className="bg-gray-800 text-gray-200 mt-16 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-2">스크린골프 예약</h3>
            <p>최고의 스크린골프장 예약 플랫폼</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">서비스</h3>
            <p>매장 검색</p>
            <p>예약 관리</p>
            <p>리뷰 작성</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">고객 지원</h3>
            <p>전화: 1234-5678</p>
            <p>이메일: aaaaaaaa@screengolf.co.kr</p>
            <p>운영시간: 09:00 ~ 18:00</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
