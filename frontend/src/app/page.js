"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full relative flex flex-col items-center justify-center pt-40 pb-24 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#0078D4]/[0.15] rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Welcome to <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078D4] to-[#00b4d8]">
            HireX AI.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 animate-fade-in-up font-light" style={{ animationDelay: '200ms' }}>
          An intelligent recruitment tool leveraging advancements in NLP and Generative AI to automate and enhance the hiring process using a RAG framework.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up justify-center" style={{ animationDelay: '300ms' }}>
          <Link href="/upload" className="px-8 py-3.5 bg-[#0078D4] hover:bg-[#006cc0] text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(0,120,212,0.3)] hover:shadow-[0_0_30px_rgba(0,120,212,0.5)]">
            Upload Resume
          </Link>
          <a href="#architecture" className="px-8 py-3.5 bg-transparent hover:bg-[#0078D4]/10 text-white border border-[#0078D4]/30 rounded-lg font-medium transition-all">
            Explore Details
          </a>
        </div>
      </section>

      {/* Innovative Features Section */}
      <section id="features" className="w-full max-w-6xl mx-auto px-4 py-20 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">Innovative Components</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">Groundbreaking retrieval and generation techniques engineered for precision.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-sm hover:bg-[#111] hover:border-white/10 transition-all duration-300 group">
            <h3 className="text-xl font-semibold mb-3 text-white">RAG Fusion & RRF</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light">Breaks down complex job queries into 3-4 focused sub-queries using the LLM. Merges results using Reciprocal Rank Fusion, ensuring complete coverage of multi-faceted job descriptions.</p>
          </div>
          <div className="p-8 rounded-xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-sm hover:bg-[#111] hover:border-white/10 transition-all duration-300 group">
            <h3 className="text-xl font-semibold mb-3 text-white">Small-to-Big Retrieval</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light">Uses compact 1024-character text chunks for high precision in matching, while passing the full resume document to the LLM for a holistic evaluation.</p>
          </div>
          <div className="p-8 rounded-xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-sm hover:bg-[#111] hover:border-white/10 transition-all duration-300 group">
            <h3 className="text-xl font-semibold mb-3 text-white">Gemini 2.5 Batch Processing</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light">Engineered to operate seamlessly under rate limits. Evaluates entire cohorts centrally using Gemini 2.5 Flash with precise JSON schema mapping.</p>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section id="architecture" className="w-full max-w-6xl mx-auto px-4 py-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">System Architecture</h2>
            <p className="text-gray-400 font-light mb-6 leading-relaxed">
              Our system is structured as a multi-stage AI pipeline designed for scale and accuracy. It handles everything from unstructured document parsing to dense semantic retrieval.
            </p>
            <ul className="space-y-4">
              {[
                "Resume Ingestion & Preprocessing (PDF, DOCX, TXT)",
                "Embedding Generation & Vector Indexing (MiniLM-L6-v2)",
                "Job Description Analysis & Sub-Query Decomposition",
                "Semantic Retrieval using FAISS Vector Database",
                "RAG Fusion with Reciprocal Rank Fusion (RRF) Re-Ranking",
                "LLM-Based Candidate Assessment & Report Generation",
                "Recruiter Dashboard Frontend Interface"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm font-light">
                  <div className="w-5 h-5 mt-0.5 rounded-full border border-white/20 flex items-center justify-center bg-white/5 text-white/70 text-xs shrink-0">{idx + 1}</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-square md:aspect-auto md:h-[400px] w-full bg-gradient-to-tr from-[#111] to-[#0a0a0a] rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="relative text-center p-8">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Multi-Stage AI Pipeline</h3>
                <p className="text-sm text-gray-500 font-light">Connecting advanced transformers with high-dimensional vector search.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="w-full max-w-6xl mx-auto px-4 py-20 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">Technology Stack & Specifications</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">Built on leading open-source frameworks and foundation models.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Language", value: "Python / JS" },
            { label: "LLM", value: "Gemini 2.5" },
            { label: "Embeddings", value: "all-MiniLM-L6-v2" },
            { label: "Vector DB", value: "FAISS" },
            { label: "Framework", value: "LangChain" },
            { label: "Backend API", value: "FastAPI" },
            { label: "UI Interface", value: "Next.js 15" },
            { label: "Hardware Min", value: "8GB RAM PC" }
          ].map((tech, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 border border-white/5 rounded-xl bg-white/[0.02]">
              <span className="text-xl font-semibold text-white mb-1 whitespace-nowrap">{tech.value}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">{tech.label}</span>
            </div>
          ))}
        </div>
      </section>



      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}} />
    </div>
  );
}