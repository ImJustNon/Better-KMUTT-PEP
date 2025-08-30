import type { Metadata } from "next";
import "./globals.css";
import HeaderComponent from "@/components/Header.component";
import { Provider } from "@/components/ui/provider"


export const metadata: Metadata = {
    icons: "/logo.svg",
    title: "KMUTT Past Exam Paper (PEP)",
    description: "Past Exam Papers for KMUTT Students",
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
