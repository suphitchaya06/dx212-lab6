/**
 * ฟังก์ชันคัดกรองเมนูตามงบประมาณ หมวดหมู่ ประเภทอาหาร และตัวเลือกท็อปปิ้ง
 * 
 * @param {Array<Object>} menus - รายการเมนูทั้งหมด
 * @param {number} budget - งบประมาณสูงสุดของผู้ใช้
 * @param {Object} [options={}] - เงื่อนไขเพิ่มเติม เช่น category, isVegetarian, includeOptions
 * @returns {Array<Object>} รายการเมนูที่อยู่ในงบประมาณ
 */
const filterMenusByBudget = (menus, budget, options = {}) => {
  // --- Edge Cases & Validation ---
  // 1. ตรวจสอบประเภทข้อมูลของ menus
  if (!Array.isArray(menus)) {
    return [];
  }

  // 2. ตรวจสอบงบประมาณ: ต้องเป็นตัวเลข, ไม่ใช่ NaN, และต้องไม่ติดลบ (0 ได้)
  if (typeof budget !== 'number' || Number.isNaN(budget) || budget < 0) {
    return [];
  }

  const { category, isVegetarian, includeOptions = false } = options;

  // --- Filtering Logic ---
  return menus
    .filter((menu) => {
      // ตรวจสอบความถูกต้องของวัตถุเมนูและราคาเริ่มต้น (ต้องไม่ติดลบ)
      if (!menu || typeof menu.price !== 'number' || Number.isNaN(menu.price) || menu.price < 0) {
        return false;
      }

      // กรองตามหมวดหมู่ (ถ้ามีการระบุ)
      if (category && menu.category !== category) {
        return false;
      }

      // กรองตามประเภทเจ/มังสวิรัติ (ถ้ามีการระบุเป็น true)
      if (isVegetarian !== undefined && menu.isVegetarian !== isVegetarian) {
        return false;
      }

      // คำนวณราคาขั้นต่ำสุดของเมนูนี้
      let minPrice = menu.price;

      // กรณีนำตัวเลือกท็อปปิ้ง/ขนาด มาร่วมคำนวณราคาขั้นต่ำสุดที่มีในเมนู
      if (includeOptions && Array.isArray(menu.options) && menu.options.length > 0) {
        const validOptions = menu.options.filter(
          (opt) => typeof opt.price === 'number' && !Number.isNaN(opt.price) && opt.price >= 0
        );
        if (validOptions.length > 0) {
          const cheapestOption = Math.min(...validOptions.map((opt) => opt.price));
          minPrice += cheapestOption;
        }
      }

      // ตรวจสอบว่าราคาขั้นต่ำของเมนูนี้ไม่เกินงบประมาณ
      return minPrice <= budget;
    })
    .map((menu) => {
      // สร้าง Object ใหม่เพื่อไม่ให้กระทบข้อมูลเดิม (Immutability)
      const menuCopy = { ...menu };

      // ถ้าเปิดคำนวณ options คัดกรองเฉพาะ options ที่สามารถเลือกได้โดยราคาไม่เกินงบ
      if (includeOptions && Array.isArray(menu.options)) {
        menuCopy.options = menu.options.filter(
          (opt) =>
            typeof opt.price === 'number' &&
            !Number.isNaN(opt.price) &&
            opt.price >= 0 &&
            menu.price + opt.price <= budget
        );
      }

      return menuCopy;
    })
    .sort((a, b) => a.price - b.price); // เรียงลำดับจากราคาต่ำไปสูง
};

// ==========================================
// ตัวอย่างข้อมูลและการทดสอบ (Test Cases)
// ==========================================

const sampleMenus = [
  {
    id: 1,
    name: "ข้าวมันไก่",
    category: "อาหาร",
    price: 50,
    isVegetarian: false,
    options: [
      { name: "ธรรมดา", price: 0 },
      { name: "พิเศษ", price: 10 }
    ]
  },
  {
    id: 2,
    name: "ผัดไทยเจ",
    category: "อาหาร",
    price: 60,
    isVegetarian: true,
    options: [
      { name: "พิเศษ", price: 15 }
    ]
  },
  {
    id: 3,
    name: "ชานมเย็น",
    category: "เครื่องดื่ม",
    price: 35,
    isVegetarian: true,
    options: [
      { name: "เพิ่มไข่มุก", price: 5 }
    ]
  },
  {
    id: 4,
    name: "เมนูราคาผิดปกติ",
    category: "อาหาร",
    price: -20, // Edge Case: ราคาติดลบ
    isVegetarian: false
  }
];

// --- 1. ทดสอบกรณีปรกติ (งบ 55 บาท) ---
console.log("--- 1. งบ 55 บาท (เมนูทั่วไป) ---");
console.log(filterMenusByBudget(sampleMenus, 55));

// --- 2. ทดสอบกรณีพิจารณา Options รวมงบด้วย (งบ 60 บาท) ---
console.log("--- 2. งบ 60 บาท (รวมตัวเลือกท็อปปิ้ง) ---");
console.log(filterMenusByBudget(sampleMenus, 60, { includeOptions: true }));

// --- 3. ทดสอบกรองตามหมวดหมู่และประเภทอาหาร (เครื่องดื่ม / เจ) ---
console.log("--- 3. กรองเฉพาะ 'เครื่องดื่ม' ---");
console.log(filterMenusByBudget(sampleMenus, 100, { category: "เครื่องดื่ม" }));

// --- 4. Edge Cases: งบประมาณติดลบ หรือไม่ใช่ตัวเลข ---
console.log("--- 4. Edge Cases (คืนค่า []) ---");
console.log(filterMenusByBudget(sampleMenus, -50)); // งบติดลบ -> []
console.log(filterMenusByBudget(sampleMenus, "50")); // งบเป็น String -> []
console.log(filterMenusByBudget(null, 50));          // Array เป็น null -> []