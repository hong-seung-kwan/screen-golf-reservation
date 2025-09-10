import React from "react";

export default function StepIndicator({ current }) {
    const steps = ["골프장 선택", "날짜/시간 선택", "예약 정보"];

    return (
        <div className="flex justify-center mb-8 space-x-8">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold 
              ${current === index + 1 ? "bg-blue-500" : "bg-gray-400"}`}
                    >
                        {index + 1}
                    </div>
                    <span
                        className={`font-medium ${current === index + 1 ? "text-blue-600" : "text-gray-500"
                            }`}
                    >
                        {step}
                    </span>
                </div>
            ))}
        </div>
    );
}