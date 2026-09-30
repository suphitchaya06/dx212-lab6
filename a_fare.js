// ฟังก์ชันคำนวณค่ารถ NGV มหาวิทยาลัย
const calcFare = (distanceKm) => {
  // ตรวจสอบข้อมูลอินพุต: ต้องเป็นตัวเลข และมีค่าไม่ติดลบ
  if (typeof distanceKm !== 'number' || isNaN(distanceKm) || distanceKm <= 0) {
    return 0;
  }

  // ปัดเศษกิโลเมตรขึ้นเสมอ
  const totalKm = Math.ceil(distanceKm);

  // 2 กม. แรกคิด 10 บาท
  if (totalKm <= 2) {
    return 10;
  }

  // กม. ที่เกินจาก 2 กม. คิดเพิ่ม กม. ละ 2 บาท
  return 10 + (totalKm - 2) * 2;
};

// ทดสอบ 3 กรณี
console.log(calcFare(1.5)); // กรณี 1.5 กม. -> ปัดเป็น 2 กม. (10 บาท)
console.log(calcFare(2));   // กรณี 2 กม.   -> ไม่เกิน 2 กม. (10 บาท)
console.log(calcFare(7.2)); // กรณี 7.2 กม. -> ปัดเป็น 8 กม. (10 + 6*2 = 22 บาท)