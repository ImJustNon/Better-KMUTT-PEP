import HeaderComponent from "@/components/Header.component";
import { Suspense } from "react";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
        <>
            <Suspense>
                <HeaderComponent />
                {children}
            </Suspense>
        </>
    );
}