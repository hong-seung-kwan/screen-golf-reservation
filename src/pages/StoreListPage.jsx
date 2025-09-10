import { Link } from "react-router-dom";
import stores from "../data/stores.json";
import React from 'react'

export default function StoreListPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">매장 목록</h1>
            <ul className="grid gap-4 md:grid-cols-2">
                {stores.map((store) => (
                    <li key={store.id} 
                    className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
                        <Link to={`/store/${store.id}`}
                        className="text-lg font-semibold text-blue-600 hover:underline">
                            {store.name}
                        </Link>
                        <p className="text-gray-600">{store.address}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}