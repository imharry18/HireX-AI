# Resume routes
from fastapi import APIRouter, UploadFile, File
from typing import List
from app.services.parser import extract_text
from app.services.rag import add_resume, rank_resumes
from app.services.llm import analyze_resume

router = APIRouter()

@router.post("/upload-resumes")
async def upload_resumes(files: List[UploadFile] = File(...)):
    results = []

    for file in files:
        text = await extract_text(file)
        resume_id = add_resume(text)

        results.append({
            "filename": file.filename,
            "resume_id": resume_id
        })

    return {"uploaded": results}


@router.post("/rank")
async def rank(job_description: str):
    results = rank_resumes(job_description)

    final_results = []

    for r in results:
        analysis = analyze_resume(r["content"], job_description)

        final_results.append({
            "resume_id": r["resume_id"],
            "score": r["score"],
            "analysis": analysis
        })

    return {"ranking": final_results}