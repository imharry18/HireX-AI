import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_resume(resume_text, job_description):
    prompt = f"""
    You are an AI recruiter.

    Compare the following resume with job description.

    Job Description:
    {job_description}

    Resume:
    {resume_text}

    Give:
    1. Match percentage (0-100)
    2. Strengths
    3. Missing skills
    4. Final short summary
    """

    response = model.generate_content(prompt)
    return response.text