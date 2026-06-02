import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import LienHe from "@/components/lienhe";
import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
export default function login({ children }) {
  return (
    <>
        <React.StrictMode>
          <PrimeReactProvider>
            <Navbar />
            {children}
            <LienHe />
            <Footer />
          </PrimeReactProvider>
        </React.StrictMode>
    </>
  )
}