"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import mockDataRaw from "../../../mockdata.json";

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState("idle"); // idle, uploading, results
  const [progress, setProgress] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  const fileInputRef = useRef(null);
  const mockData = mockDataRaw;

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const processFiles = () => {
    if (files.length === 0 || !jobDescription) {
      alert("Please upload resumes and enter a job description.");
      return;
    }
    
    setStatus("uploading");
    setProgress(0);

    // Simulate realistic loading progression
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
         setProgress(100);
         clearInterval(interval);
         setTimeout(() => setStatus("results"), 500); // short delay after hitting 100%
      } else {
         setProgress(Math.floor(currentProgress));
      }
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 w-full max-w-7xl mx-auto">
      
      {/* Upload State */}
      {status === "idle" && (
        <div className="w-full max-w-4xl animate-fade-in text-center flex flex-col items-center justify-center m-auto h-[60vh]">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-3 flex items-center justify-center gap-3">
               <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
               HireX AI
            </h1>
            <p className="text-gray-400 font-light">Upload a batch of tracking files and drop a job description to instantly rank and analyze potential matches.</p>
          </div>

          <div 
            className="w-full max-w-2xl mx-auto border-2 border-dashed border-white/10 rounded-2xl p-16 text-center hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer shadow-lg shadow-black/50"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#111]">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-base font-medium mb-1 text-white">Select PDF resumes to upload</h3>
            <p className="text-gray-500 text-sm mb-6">or drag and drop them here</p>
            
            <input 
              type="file" 
              multiple 
              accept=".pdf" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
          </div>

          {files.length > 0 && (
            <div className="mt-8 max-w-2xl w-full mx-auto text-left animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#0d0d0d] hover:bg-[#151515] transition-colors">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-red-500/10 p-2 rounded-lg text-red-500 shrink-0">
                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-8h2v8zm4 0h-2v-8h2v8zm4 0h-2v-8h2v8z" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                      </div>
                      <span className="text-sm text-gray-300 truncate">{file.name}</span>
                    </div>
                    <span className="text-xs text-gray-600 bg-[#050505] px-2 py-1 rounded-md shrink-0">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ))}
              </div>
              
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3 text-white">Job Description Context</label>
                <div className="relative group">
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                   <textarea 
                     value={jobDescription}
                     onChange={(e) => setJobDescription(e.target.value)}
                     placeholder="Paste the job description, key requirements, or desired skills to screen candidates against..."
                     className="relative w-full bg-[#050505] border border-white/10 rounded-xl p-5 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 h-36 resize-none transition-all placeholder:text-gray-600"
                   />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  onClick={processFiles}
                  disabled={!jobDescription.trim()}
                  className="px-8 py-3 bg-white hover:bg-gray-200 text-black rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transform active:scale-95"
                >
                  Analyze & Rank Cohort
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {status === "uploading" && (
        <div className="w-full max-w-md my-auto flex flex-col items-center justify-center m-auto h-[60vh] text-center animate-fade-in relative z-10">
          <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
            <svg className="absolute inset-0 animate-[spin_3s_linear_infinite] w-full h-full text-blue-500/20" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
            </svg>
            <svg className="absolute inset-2 animate-[spin_2s_linear_infinite_reverse] w-[calc(100%-16px)] h-[calc(100%-16px)] text-purple-500/30" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="20 40" />
            </svg>
            <span className="text-xl font-medium text-white">{progress}%</span>
          </div>
          <h2 className="text-xl font-medium text-white mb-2 tracking-tight">
            Processing Data Models
          </h2>
          <p className="text-sm text-gray-500 font-light mb-8 max-w-[280px]">
            {progress < 40 ? "Extracting text and parsing resumes..." : progress < 70 ? "Generating semantic embeddings..." : "Ranking against job description..."}
          </p>
          
          <div className="w-full bg-[#111] border border-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {/* Results Workspace */}
      {status === "results" && (
        <div className="w-full animate-fade-in my-6">
          
          <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
             <div>
               <h1 className="text-3xl font-semibold text-white tracking-tight flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Screening Complete
               </h1>
               <p className="text-gray-400 text-sm">{mockData.overview.stats.total_candidates} candidates evaluated against role requirements.</p>
             </div>
             <button 
                  onClick={() => {
                     setFiles([]);
                     setStatus("idle");
                     setJobDescription("");
                     setSelectedCandidate(null);
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-sm transition-all flex items-center gap-2"
               >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  New Search
               </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[600px]">
            
            {/* LEFT COLUMN: Overview & List */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               
               {/* Global Summary Card */}
               <div 
                  className={`bg-[#0a0a0a] border ${!selectedCandidate ? 'border-blue-500/40 ring-1 ring-blue-500/20' : 'border-white/10'} rounded-2xl p-6 cursor-pointer hover:bg-[#0f0f0f] transition-all`}
                  onClick={() => setSelectedCandidate(null)}
               >
                  <div className="flex items-center justify-between mb-5">
                     <h2 className="text-base font-semibold text-white flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        Cohort Overview
                     </h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                     <div className="bg-[#111] border border-white/5 rounded-xl p-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-1 opacity-20"><svg className="w-12 h-12 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
                        <p className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mb-1 relative z-10">Top Match</p>
                        <p className="text-sm font-medium text-white truncate relative z-10">{mockData.overview.best_candidate.name}</p>
                     </div>
                     <div className="bg-[#111] border border-white/5 rounded-xl p-4">
                        <p className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mb-1">Avg Score</p>
                        <p className="text-sm font-semibold text-blue-400 flex items-center gap-1">
                           {mockData.overview.stats.average_score}
                           <span className="text-[10px] text-gray-500">/ 100</span>
                        </p>
                     </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                     <div className="flex-1 bg-green-500/10 border border-green-500/20 text-center py-2 rounded-xl">
                        <span className="block text-[9px] text-green-500/70 uppercase tracking-widest font-bold mb-0.5">High</span>
                        <span className="text-sm font-bold text-green-400">{mockData.overview.distribution.high}</span>
                     </div>
                     <div className="flex-1 bg-yellow-500/10 border border-yellow-500/20 text-center py-2 rounded-xl">
                        <span className="block text-[9px] text-yellow-500/70 uppercase tracking-widest font-bold mb-0.5">Med</span>
                        <span className="text-sm font-bold text-yellow-400">{mockData.overview.distribution.medium}</span>
                     </div>
                     <div className="flex-1 bg-red-500/10 border border-red-500/20 text-center py-2 rounded-xl">
                        <span className="block text-[9px] text-red-500/70 uppercase tracking-widest font-bold mb-0.5">Low</span>
                        <span className="text-sm font-bold text-red-400">{mockData.overview.distribution.low}</span>
                     </div>
                  </div>

                  <div className="text-xs text-gray-400 leading-relaxed font-light border-t border-white/5 pt-4">
                     {mockData.overview.recommendation}
                  </div>
               </div>

               {/* Rankings List */}
               <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex-1 min-h-0 flex flex-col">
                  <h3 className="text-xs tracking-widest uppercase font-semibold text-gray-500 mb-4 px-1">Ranked Results ✨</h3>
                  
                  <div className="overflow-y-auto pr-2 space-y-2 flex-1 custom-scrollbar">
                     {mockData.candidates.map(candidate => {
                        const isSelected = selectedCandidate?.id === candidate.id;
                        return (
                           <button 
                              key={candidate.id}
                              onClick={() => setSelectedCandidate(candidate)}
                              className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between transition-all group ${isSelected ? 'bg-blue-600/10 border border-blue-500/30' : 'bg-[#111] border border-white/5 hover:bg-[#151515] hover:border-white/10'}`}
                           >
                              <div className="flex items-center gap-3.5">
                                 <span className={`flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold ${candidate.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-lg shadow-amber-500/20' : isSelected ? 'bg-blue-500 text-white' : 'bg-[#222] text-gray-400'}`}>
                                    {candidate.rank}
                                 </span>
                                 <div>
                                    <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'} group-hover:text-white transition-colors`}>{candidate.name}</p>
                                    <p className="text-[11px] text-gray-500 tracking-wide mt-0.5 max-w-[120px] truncate">{candidate.email}</p>
                                 </div>
                              </div>
                              <div className="flex flex-col items-end">
                                 <div className={`px-2 py-1 rounded text-xs font-semibold tracking-wide ${candidate.ats_score > 80 ? 'bg-green-500/10 text-green-400' : candidate.ats_score > 55 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                                    {candidate.ats_score}
                                 </div>
                              </div>
                           </button>
                        );
                     })}
                  </div>
               </div>
            </div>

            {/* RIGHT COLUMN: Candidate Detail / Global Compare */}
            <div className="lg:col-span-8 flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-2xl relative overflow-hidden">
               {!selectedCandidate ? (
                  // EMPTY/GLOBAL STATE
                  <div className="flex flex-col h-full p-8 absolute inset-0 animate-fade-in z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#13151a] to-[#0a0a0a] overflow-y-auto custom-scrollbar">
                     <div className="mb-10 text-center mt-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full mb-4 ring-1 ring-blue-500/20">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <h2 className="text-2xl font-medium text-white mb-2">Cohort Intelligence</h2>
                        <p className="text-gray-500 text-sm max-w-md mx-auto">Select a candidate from the left to view detailed profile matches, or review the batch statistics below based on your job description.</p>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full mb-8">
                        {/* JD Insights */}
                        <div className="bg-[#111] border border-white/5 rounded-3xl p-7 shadow-lg shadow-black/20">
                           <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-5 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                              Target Requirements
                           </h3>
                           <div className="mb-6">
                              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Required Skills</p>
                              <div className="flex flex-wrap gap-2">
                                 {mockData.overview.jd_insights.skills.map(s => (
                                    <span key={s} className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm">{s}</span>
                                 ))}
                              </div>
                           </div>
                           <div>
                              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Target Experience</p>
                              <p className="text-base text-gray-300 font-medium inline-block bg-white/5 px-4 py-2 rounded-xl">{mockData.overview.jd_insights.experience}</p>
                           </div>
                        </div>

                        {/* Common Skill Gaps */}
                        <div className="bg-[#111] border border-white/5 rounded-3xl p-7 shadow-lg shadow-black/20">
                           <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-5 flex items-center gap-2">
                              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                              Frequent Skill Gaps
                           </h3>
                           <div className="space-y-4">
                              {mockData.overview.common_skill_gaps.map((gap, index) => (
                                 <div key={gap.skill} className="relative">
                                    <div className="flex items-center justify-between mb-2">
                                       <span className="text-sm font-medium text-gray-300">{gap.skill}</span>
                                       <span className="text-xs font-semibold text-gray-500">
                                          Missing in {gap.count} candidates
                                       </span>
                                    </div>
                                    <div className="w-full bg-[#1a1a1a] rounded-full h-1.5 overflow-hidden">
                                       <div 
                                          className="bg-gradient-to-r from-red-500/50 to-orange-500/50 h-full rounded-full" 
                                          style={{ width: `${(gap.count / mockData.overview.stats.total_candidates) * 100}%` }}
                                       ></div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  // CANDIDATE PROFILE
                  <div className="absolute inset-0 overflow-y-auto animate-fade-in custom-scrollbar">
                     
                     {/* Candidate Header Area */}
                     <div className="relative p-8 pb-10 border-b border-white/10 overflow-hidden">
                        {/* Background subtle rank text */}
                        <div className="absolute top-0 right-8 text-[12rem] font-black text-white/[0.02] leading-none pointer-events-none select-none tracking-tighter mix-blend-overlay">
                           #{selectedCandidate.rank}
                        </div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                           <div>
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300 mb-4 tracking-widest uppercase">
                                 Rank {selectedCandidate.rank} of {mockData.overview.stats.total_candidates}
                              </div>
                              <h2 className="text-4xl font-semibold text-white mb-4 tracking-tight">{selectedCandidate.name}</h2>
                              
                              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
                                 <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                                    <div className="p-1.5 bg-[#111] rounded-lg group-hover:bg-white/10 transition-colors">
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    {selectedCandidate.email}
                                 </span>
                                 <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                                    <div className="p-1.5 bg-[#111] rounded-lg group-hover:bg-white/10 transition-colors">
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    {selectedCandidate.phone}
                                 </span>
                              </div>
                           </div>

                           {/* Big ATS Score Block */}
                           <div className="flex flex-col items-center justify-center shrink-0">
                               <div className="relative">
                                  <svg className="w-28 h-28 transform -rotate-90">
                                     <circle cx="56" cy="56" r="50" fill="none" className="text-[#151515]" strokeWidth="8" stroke="currentColor" />
                                     <circle 
                                       cx="56" 
                                       cy="56" 
                                       r="50" 
                                       fill="none" 
                                       className={`${selectedCandidate.ats_score > 80 ? 'text-green-500' : selectedCandidate.ats_score > 55 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
                                       strokeWidth="8" 
                                       strokeLinecap="round"
                                       strokeDasharray="314"
                                       strokeDashoffset={314 - (314 * selectedCandidate.ats_score) / 100}
                                       stroke="currentColor" 
                                     />
                                  </svg>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                                     <span className="text-3xl font-bold text-white">{selectedCandidate.ats_score}</span>
                                  </div>
                               </div>
                               <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-3">ATS Status</span>
                           </div>
                        </div>
                     </div>

                     {/* Content Grid */}
                     <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Scores & Skills Left Col */}
                        <div className="space-y-8">
                           {/* Score Breakdown Area */}
                           <div>
                              <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-5 flex items-center gap-2">
                                 <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                 Detailed Breakdown
                              </h3>
                              <div className="space-y-4">
                                 {Object.entries(selectedCandidate.score_breakdown).map(([key, value]) => {
                                    // Let's assume standard max points is around 40 based on the mock data to show visually 
                                    const percentage = Math.min((value / 40) * 100, 100);
                                    return (
                                       <div key={key} className="group">
                                          <div className="flex justify-between items-end mb-1.5">
                                             <span className="text-sm font-medium text-gray-300 capitalize group-hover:text-white transition-colors">{key}</span>
                                             <span className="text-xs font-semibold text-gray-400">{value} pts</span>
                                          </div>
                                          <div className="w-full bg-[#151515] rounded-full h-2 overflow-hidden shadow-inner border border-white/5">
                                             <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-2 rounded-full relative" style={{ width: `${percentage}%` }}>
                                                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                                             </div>
                                          </div>
                                       </div>
                                    )
                                 })}
                              </div>
                           </div>

                           {/* Skills Matched Layer */}
                           <div>
                              <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
                                 <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                 Verified Match Skills
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                 {selectedCandidate.embedding_data.matched_keywords.map(skill => (
                                     <span key={skill} className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide shadow-sm">
                                         {skill}
                                     </span>
                                 ))}
                              </div>
                           </div>
                        </div>

                        {/* AI Insights Right Col */}
                        <div className="space-y-6 flex flex-col">
                           
                           {/* Why this candidate? */}
                           <div className="bg-[#111] border border-white/5 rounded-2xl p-6 relative group overflow-hidden">
                              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                 <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                              </div>
                              <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-4 flex items-center gap-2 relative z-10">
                                 <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                 AI Assessment
                              </h3>
                               <p className="text-sm text-gray-300 leading-relaxed relative z-10">
                                   {selectedCandidate.llm_data.why}
                               </p>
                               <div className="mt-4 pt-4 border-t border-white/5 relative z-10">
                                 <p className="text-xs font-medium text-gray-500">Summary: <span className="text-gray-300 ml-1">{selectedCandidate.llm_data.summary}</span></p>
                               </div>
                           </div>
                           
                           {/* Skill Gaps */}
                           <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
                              <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
                                 <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                 Detected Skill Gaps
                              </h3>
                              {selectedCandidate.llm_data.skill_gap.length > 0 ? (
                                 <div className="flex flex-wrap gap-2">
                                     {selectedCandidate.llm_data.skill_gap.map(gap => (
                                         <span key={gap} className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                            {gap}
                                         </span>
                                     ))}
                                 </div>
                              ) : (
                                 <div className="bg-green-500/5 border border-green-500/10 p-3 rounded-xl flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <p className="text-sm text-gray-300">Perfect alignment. No critical skill gaps identified for this role.</p>
                                 </div>
                              )}
                           </div>
                           
                        </div>
                     </div>
                  </div>
               )}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}
