const buses = [
  { route: "NGV-1", passengers: 45, late: false },
  { route: "NGV-2", passengers: 62, late: true },
  { route: "NGV-3", passengers: 38, late: true },
  { route: "NGV-4", passengers: 51, late: false },
];

// 1. ดึงเฉพาะชื่อสายรถทั้งหมด (ผลลัพธ์: ["NGV-1", "NGV-2", "NGV-3", "NGV-4"])
const routes = buses.map((bus) => bus.route);
console.log(routes);

// 2. คัดกรองเฉพาะรถที่มาสาย (ผลลัพธ์: NGV-2, NGV-3)
const lateBuses = buses.filter((bus) => bus.late);
console.log(lateBuses);

// 3. คัดกรองเฉพาะรถที่มีผู้โดยสารมากกว่า 50 คน (ผลลัพธ์: NGV-2, NGV-4)
const heavyBuses = buses.filter((bus) => bus.passengers > 50);
console.log(heavyBuses);

/*
แก้ไข Syntax Error for (const bus of buses): มีเครื่องหมายปิดปีกกา } เกินลอยอยู่ด้านบนก่อนเปิดลูป 
แก้ไขการตั้งชื่อตัวแปร บรรทัดที่ใช้ .map() มีการตั้งชื่อตัวแปรว่า const route (เอกพจน์) แต่ผลลัพธ์จาก .map() จะได้ออกมาเป็น Array (พหูพจน์) ทำให้ตอนนำไป console.log(routes) จะเกิด ReferenceError: routes is not defined เพราะชื่อไม่ตรงกัน
*/

