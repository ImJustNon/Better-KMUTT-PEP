# Better-PEP

ระบบค้นหาและดาวน์โหลดข้อสอบเก่า (Past Exam Papers) 

## คุณสมบัติหลัก
- ค้นหาข้อสอบเก่าตามรหัสวิชา ชื่อวิชา ปีการศึกษา ภาคการศึกษา และประเภทข้อสอบ
- ดาวน์โหลดไฟล์ข้อสอบได้โดยตรง
- ระบบกรองและค้นหาแบบ Real-time
- รองรับการใช้งานบนมือถือและเดสก์ท็อป
- SEO Friendly (รองรับ sitemap และ robots)

## เทคโนโลยีที่ใช้
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Chakra UI (บางส่วน)
- Axios

## โครงสร้างโปรเจกต์ (บางส่วน)
```
public/            # ไฟล์ static เช่น รูป โลโก้
src/
  app/             # Next.js App Router
    (pages)/search # หน้า Search
    api/           # API สำหรับค้นหาและดึงข้อมูล
  assets/          # ไฟล์ SVG โลโก้
  components/      # UI Components
  data/pep-data.json # ข้อมูลข้อสอบ
  utils/           # ฟังก์ชันช่วยเหลือ เช่น DataSearch
```

## วิธีเริ่มต้นใช้งาน
1. ติดตั้ง dependencies
   ```bash
   npm install
   ```
2. รันเซิร์ฟเวอร์สำหรับพัฒนา
   ```bash
   npm run dev
   ```
3. เปิดใช้งานที่ [http://localhost:3000](http://localhost:3000)

## การ build สำหรับ production
```bash
npm run build
npm start
```

## การปรับแต่ง/เพิ่มข้อมูลข้อสอบ
- เพิ่ม/แก้ไขไฟล์ `src/data/pep-data.json`
- โครงสร้างข้อมูลดูได้ในไฟล์นั้น

## SEO
- มีไฟล์ `robots.ts` และ `sitemap.ts` สำหรับ Next.js ใน `src/app/`
- แก้ไข domain ในไฟล์เหล่านี้ให้ตรงกับ production จริง

## การ Contribute
- Fork ได้เลย