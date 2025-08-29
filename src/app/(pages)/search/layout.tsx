import HeaderComponent from "@/components/Header.component";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
        <>
            <HeaderComponent />
            {children}

        </>
    );
}