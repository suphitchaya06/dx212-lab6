/**
 * คำนวณค่าโดยสารรถ NGV ในมหาวิทยาลัย
 * - 2 กม.แรก 10 บาท
 * - กม.ถัดไปคิด กม.ละ 2 บาท
 * - เศษของกิโลเมตรปัดขึ้น
 * - ระยะทางติดลบหรือไม่ใช่ตัวเลขคืนค่า 0
 * @param {*} distanceKm ระยะทางเป็นกิโลเมตร
 * @returns {number} ค่าโดยสารเป็นบาท
 */
const calcFare = (distanceKm) => {
  // กรณีข้อมูลไม่ถูกต้อง (ติดลบ / ไม่ใช่ตัวเลข) คืน 0
  if (typeof distanceKm !== 'number' || distanceKm < 0) return 0;

  // เศษของกิโลเมตรปัดขึ้น
  const distance = Math.ceil(distanceKm);

  // 2 กม.แรก 10 บาท ส่วนที่เกินคิด กม.ละ 2 บาท
  return 10 + Math.max(0, distance - 2) * 2;
};

// ตัวอย่างการใช้งาน
console.log(calcFare(1));      // 10 (2 กม.แรก)
console.log(calcFare(2));      // 10 (2 กม.แรก)
console.log(calcFare(2.1));    // 12 (ปัดเป็น 3 กม. -> 10 + 1*2)
console.log(calcFare(5));      // 16 (10 + 3*2)
console.log(calcFare(-3));     // 0 (ติดลบ)
console.log(calcFare('abc'));  // 0 (ไม่ใช่ตัวเลข)