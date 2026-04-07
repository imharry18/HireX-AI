import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

def analyze_resume(resume_text, job_description):
    # Fallback to older simpler behavior if ever needed
    prompt = f"""
    You are an AI recruiter. Combine the following resume with job description and give:
    1. Match percentage
    2. Strengths
    3. Missing skills
    4. Final short summary
    Job Description: {job_description}
    Resume: {resume_text}
    """
    response = model.generate_content(prompt)
    return response.text

def generate_full_analysis(resumes_data, job_description):
    """
    resumes_data is a list of dicts: [{"resume_id": str, "filename": str, "full_text": str, "score": float}, ...]
    Performs a single global batch analysis to prevent rate limits and build the whole JSON natively.
    """
    candidates_text = ""
    for r in resumes_data:
        candidates_text += f"\n--- CANDIDATE (ID: {r['resume_id']}, Filename: {r['filename']}, EmbedScore: {r['score']}) ---\n"
        candidates_text += r['full_text'] + "\n"

    prompt = f"""
    You are an expert HR and ATS evaluation system.
    Evaluate the following candidates against the job description.

    JOB DESCRIPTION:
    {job_description}

    CANDIDATES:
    {candidates_text}

    OUTPUT FORMAT:
    You MUST return ONLY a valid JSON object matching EXACTLY the following structure. Do not wrap in markdown tags like ```json.
    {{
      "overview": {{
        "best_candidate": {{
          "name": "Name",
          "score": 90,
          "tag": "Top Match"
        }},
        "stats": {{
          "average_score": 75,
          "total_candidates": {len(resumes_data)}
        }},
        "distribution": {{
          "high": 1,
          "medium": 0,
          "low": 0
        }},
        "jd_insights": {{
          "skills": ["React", "Python"],
          "experience": "required experience string"
        }},
        "common_skill_gaps": [
          {{ "skill": "Docker", "count": 1 }}
        ],
        "recommendation": "Overall recommendation for the cohort."
      }},
      "candidates": [
        {{
          "id": "resume_id_from_input",
          "name": "Candidate Name",
          "email": "email",
          "phone": "phone",
          "rank": 1,
          "embedding_data": {{
            "similarity_score": 0.9,
            "matched_keywords": ["keyword1"]
          }},
          "ats_score": 85,
          "score_breakdown": {{
            "skills": 30,
            "experience": 30,
            "projects": 15,
            "education": 10
          }},
          "charts": {{
             "pie": [
               {{ "name": "Skills", "value": 30 }},
               {{ "name": "Experience", "value": 30 }},
               {{ "name": "Projects", "value": 15 }},
               {{ "name": "Education", "value": 10 }}
             ]
          }},
          "llm_data": {{
            "why": "Detailed reason why...",
            "skill_gap": ["Skill 1"],
            "summary": "Short summary."
          }}
        }}
      ]
    }}

    IMPORTANT RULES:
    1. Base `ats_score` out of 100 on how well they match the JD.
    2. Ensure `score_breakdown` fields sum roughly to `ats_score`.
    3. Calculate `distribution`: counts of ats_score (high >= 80, medium 50-79, low < 50).
    4. Provide the EXACT requested structure. Map `id` in `candidates` to exactly the `resume_id` provided above.
    5. Sort the `candidates` array by `ats_score` in descending order, and properly assign `rank` (1, 2, ...).
    6. Ensure that `overview.stats.average_score` correctly averages the `ats_score`.
    """

    response = model.generate_content(prompt)
    
    text_content = response.text.strip()
    if text_content.startswith("```json"):
        text_content = text_content[7:]
    elif text_content.startswith("```"):
        text_content = text_content[3:]
        
    if text_content.endswith("```"):
        text_content = text_content[:-3]
        
    try:
        return json.loads(text_content.strip())
    except Exception as e:
        print("JSON Decode Error:", e)
        print("RAW RESPONSE:", text_content)
        return {"error": "Failed to parse JSON", "raw": text_content}