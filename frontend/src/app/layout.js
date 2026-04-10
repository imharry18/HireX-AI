import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata = {
  title: "HireX AI | Intelligent Resume Screening",
  description: "Upload and analyze student resumes with AI-driven insights using a RAG-based engine.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col pt-16 font-sans antialiased text-gray-200 bg-black selection:bg-white/20">
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
