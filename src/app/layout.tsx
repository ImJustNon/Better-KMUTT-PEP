import type { Metadata } from "next";
import "./globals.css";
import HeaderComponent from "@/components/Header.component";
import { Provider } from "@/components/ui/provider"


export const metadata: Metadata = {
	icons: "/logo.svg",
	title: "KMUTT Past Exam Paper (PEP)",
	description: "Past Exam Papers for KMUTT Students. Search and download previous exam papers by subject, year, semester, and type. Responsive, fast, and SEO optimized.",
	keywords: [
		"KMUTT Past Exam Paper", "PEP", "ข้อสอบเก่า", "KMUTT", "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี", "ดาวน์โหลดข้อสอบ", "ค้นหาข้อสอบ", "exam papers", "university exams", "search exam papers", "download exam papers", "ข้อสอบย้อนหลัง"
	],
		authors: [{ name: "TGDTEL & Contributors" }],
	publisher: "KMUTT PEP",
	applicationName: "KMUTT Past Exam Paper (PEP)",
	themeColor: "#ff5f25",
	metadataBase: new URL("https://better-pep.vercel.app"),
	openGraph: {
		title: "KMUTT Past Exam Paper (PEP)",
		description: "Search and download KMUTT past exam papers by subject, year, semester, and type. Free, fast, and mobile-friendly.",
		url: "https://better-pep.vercel.app/",
		siteName: "KMUTT PEP",
		images: [
			{
				url: "/logo.svg",
				width: 256,
				height: 256,
				alt: "KMUTT PEP Logo"
			}
		],
		locale: "th_TH",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "KMUTT Past Exam Paper (PEP)",
		description: "Search and download KMUTT past exam papers by subject, year, semester, and type. Free, fast, and mobile-friendly.",
		images: ["/logo.svg"],
		creator: "@TGDTEL",
		site: "@TGDTEL"
	},
	alternates: {
		canonical: "/",
		languages: {
			"en": "/en",
			"th": "/th"
		}
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 5
	},
	other: {
		"google-site-verification": "Ouy0dCDo-ijgMW6017hFxIgjxoW8vKYfn8WyJUolJW8",
	}
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="bg-[#f2f5fa] duration-300">
				<Provider>
					{children}
				</Provider>
			</body>
		</html>
	);
}
