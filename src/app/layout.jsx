"use client";

import "../app/globals.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import SearchField from "../components/SearchField";
import Head from "next/head";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ReactQueryDevtools } from "react-query/devtools";


export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body>
          <AuthProvider>
            <div className="bg-slate-100">
              <Navbar />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
