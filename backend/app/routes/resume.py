# Resume routes
from fastapi import APIRouter, UploadFile, File
from typing import List
from app.services.parser import extract_text
from app.services.rag import add_resume, rank_resumes
from app.services.llm import generate_full_analysis

router = APIRouter()

@router.post("/upload-resumes")
async def upload_resumes(files: List[UploadFile] = File(...)):
    results = []

    for file in files:
        text = await extract_text(file)
        resume_id = add_resume(text, file.filename)

        results.append({
            "filename": file.filename,
            "resume_id": resume_id
        })

    return {"uploaded": results}


@router.post("/rank")
async def rank(job_description: str):
    # Retrieve base data and embeddings/similarity match chunks
    results = rank_resumes(job_description)
    
    if not results:
        return {"error": "No resumes stored to rank."}

    # Use single batch architecture to overcome 10-12 request-per-minute limits
    final_payload = generate_full_analysis(results, job_description)

    return final_payload