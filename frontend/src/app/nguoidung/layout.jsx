import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import LienHe from "@/components/lienhe";
import React from 'react';
import { PrimeReactProvider } from 'primereact/api';

export default function nguoidung({ children }) {
    return (
        <>
                <Navbar />
                <main>
                    <PrimeReactProvider>
                        {children}
                    </PrimeReactProvider>
                </main>
                <LienHe />
                <Footer />
        </>
    )
};
