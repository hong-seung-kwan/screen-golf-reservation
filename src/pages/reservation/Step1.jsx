import { useNavigate } from "react-router-dom"
import StepIndicator from "../../components/StepIndicator";
import stores from "../../data/stores.json";



export default function Step1() {

    const navigate = useNavigate();

    const handleSelect = (store) => {
        navigate("/reservation/Step2", { state: { store } });
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <StepIndicator current={1} />

            <h2 className="text-2xl font-bold mb-6 text-center">골프장을 선택해주세요</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {stores.map((store) => (
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
                            <button
                                onClick={() => handleSelect(store)}
                                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                            >
                                선택하기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}