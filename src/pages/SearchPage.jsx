import { useState } from "react";
import { useNavigate } from "react-router-dom";
import stores from "../data/stores.json";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const filteredStores = stores.filter((store) => {
        const matchQuery = query === "" || store.name.includes(query);
        const matchRegion = region === "" || store.address.includes(region);
        const matchPrice =
            price === "" ||
            (price === "low" && store.price < 20000) ||
            (price === "mid" && store.price >= 20000 && store.price <= 30000) ||
            (price === "high" && store.price > 30000);
        return matchQuery && matchRegion && matchPrice;
    });

    const handleReserve = (store) => {
        navigate("/reservation/Step2", {state: {store}});
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">골프장 검색</h1>

            {/* 검색 필터 */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <input
                    type="text"
                    placeholder="골프장 이름 검색"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border rounded px-3 py-2 w-64"
                />
                <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="border rounded px-2 py-2"
                >
                    <option value="">지역 선택</option>
                    <option value="인천">인천</option>
                    <option value="서울">서울</option>
                    <option value="대전">대전</option>
                </select>
                <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="">가격 선택</option>
                    <option value="low">2만원 이하</option>
                    <option value="mid">2만 ~ 3만</option>
                    <option value="high">3만원 이상</option>
                </select>
            </div>
            {/* 검색 결과 */}
            {filteredStores.length === 0 ? (
                <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
            ):(
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredStores.map((store)=> (
                        <div
                            key={store.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
                        >
                            <img
                                src={store.imageUrl}
                                alt={store.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">{store.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">{store.address}</p>
                                <p className="text-yellow-500 text-sm">⭐ {store.rating}</p>
                                <p className="text-blud-600 font-bold mt-2">
                                    {store.priceText}
                                </p>
                                <button
                                    onClick={() => handleReserve(store)}
                                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                                >
                                    예약하기
                                </button>
                            </div>
                            </div>
                    ))}
                    </div>
            )}
        </div>
    )
}