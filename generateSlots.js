import fs from "fs";

const stores = [
  { id: 1, name: "프렌즈스크린 연수점" },
  { id: 2, name: "프렌즈스크린 송도국제학교점" },
  { id: 3, name: "골프존파크 송도더존골프점" },
];

const slots = [];
let slotId = 1;
const startDate = new Date("2025-09-01");
const endDate = new Date("2025-09-30");

for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  const date = d.toISOString().split("T")[0];
  for (const store of stores) {
    for (let room = 1; room <= 5; room++) {
      const times = ["10:00", "12:00", "14:00", "16:00", "18:00"];
      for (const time of times) {
        slots.push({
          id: slotId++,
          storeId: store.id,
          date,
          time,
          room: `룸${room}`,
        });
      }
    }
  }
}

fs.writeFileSync("slots.json", JSON.stringify(slots, null, 2), "utf-8");
console.log("✅ slots.json 생성 완료!");
