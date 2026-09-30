const buses = [
  { route: "NGV-1", passengers: 45, late: false },
  { route: "NGV-2", passengers: 62, late: true },
  { route: "NGV-3", passengers: 38, late: true },
];

// แก้ไข 1: เอาปีกกา { } ออก เพื่อให้ Implicit Return ค่า b.late
const lateRoutes = buses.filter(b => b.late).map(b => b.route);

// แก้ไข 2: ใส่ค่าเริ่มต้น (Initial Value) เป็น 0 ให้กับ reduce
const total = buses.reduce((sum, b) => sum + b.passengers, 0);

console.log("สายที่มาสาย:", lateRoutes);   // ผลลัพธ์: ["NGV-2", "NGV-3"]
console.log("ผู้โดยสารรวม:", total);      // ผลลัพธ์: 145