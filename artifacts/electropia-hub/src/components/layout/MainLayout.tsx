import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Header />
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
