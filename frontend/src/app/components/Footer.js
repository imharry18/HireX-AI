import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col items-start">
            <span className="text-xl font-medium text-white tracking-tight">
              HireX AI
            </span>
            <p className="mt-2 text-sm text-gray-500 font-light max-w-xs">
              Automated resume screening using LLMs and Retrieval Augmented Generation (RAG).
            </p>
          </div>
          
          <div className="flex space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/upload" className="text-sm font-medium text-gray-500 hover:text-white transition-colors">
              Process
            </Link>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-white transition-colors">
              Privacy
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8 flex items-center justify-between">
          <p className="text-xs text-gray-600 font-light">
            &copy; {new Date().getFullYear()} HireX AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
            <span className="text-xs text-gray-500 font-light">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
