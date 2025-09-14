
# 🚀 Better-PEP

Modern web app for searching, previewing, and downloading past exam papers (PEP) with real-time filtering, PDF preview, and mobile support.

ระบบค้นหา แสดงตัวอย่าง และดาวน์โหลดข้อสอบเก่า (Past Exam Papers) 🏫📚


## ✨ คุณสมบัติหลัก / Features
- 🔍 ค้นหาและกรองข้อสอบเก่าตามรหัสวิชา ชื่อวิชา ปีการศึกษา ภาคการศึกษา และประเภทข้อสอบ
- 📥 ดาวน์โหลดไฟล์ข้อสอบได้โดยตรง
- 📄 แสดงตัวอย่างข้อสอบ PDF ในแอป (PDF Preview/Reader)
- ⚡ ระบบกรองและค้นหาแบบ Real-time
- 📱💻 รองรับการใช้งานบนมือถือและเดสก์ท็อป (Responsive)
- 🌐 SEO Friendly (รองรับ sitemap และ robots)
- ✨ Animation สวยงามด้วย animate.css และ tailwindcss-animate


## 🛠️ Tech Stack
- 🧭 Next.js 14 (App Router)
- 🟦 TypeScript
- 🎨 Tailwind CSS
- 🟪 Chakra UI (บางส่วน)
- 🔗 Axios
- 📄 react-pdf (PDF preview)
- ✨ animate.css, tailwindcss-animate (Animation)


## 📁 โครงสร้างโปรเจกต์ (บางส่วน)
```
public/            # Static files (images, logos, etc.)
src/
  app/             # Next.js App Router
    (pages)/search # Search page
    api/           # API for search and data
  assets/          # SVG logos
  components/      # UI Components (PDFReaderDrawer, Header, Footer, etc.)
  data/pep-data.json # Exam data
  utils/           # Helper functions (DataSearch, LocalStorage)
```


## 🏁 Getting Started
1. 📦 Install dependencies
  ```bash
  npm install
  # or
  yarn install
  ```
2. ▶️ Run development server
  ```bash
  npm run dev
  # or
  yarn dev
  ```
3. 🌍 Open [http://localhost:3000](http://localhost:3000)


## 🏗️ Build for production
```bash
npm run build
npm start
# or
yarn build
yarn start
```


## 📝 เพิ่ม/แก้ไขข้อมูลข้อสอบ
- ✏️ แก้ไขไฟล์ `src/data/pep-data.json`
- 📄 ดูตัวอย่างโครงสร้างข้อมูลในไฟล์นั้น


## 🌐 SEO
- 🤖 มีไฟล์ `robots.ts` และ `sitemap.ts` สำหรับ Next.js ใน `src/app/`
- 📝 แก้ไข domain ในไฟล์เหล่านี้ให้ตรงกับ production จริง


## 🤝 Contributing
- 🍴 Fork & Pull Request are welcome!