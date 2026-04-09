# RAG services
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores.faiss import FAISS
import uuid

embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# store all resumes
resume_store = {}

def add_resume(text, filename="Unknown"):
    resume_id = str(uuid.uuid4())

    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_text(text)

    metadatas = [{"resume_id": resume_id} for _ in chunks]

    vector_db = FAISS.from_texts(chunks, embedding_model, metadatas=metadatas)

    resume_store[resume_id] = {
        "vector_db": vector_db,
        "full_text": text,
        "filename": filename
    }

    return resume_id


def calculate_score(resume_text, job_description):
    jd_words = set(job_description.lower().split())
    resume_words = set(resume_text.lower().split())

    matched = jd_words.intersection(resume_words)

    if len(jd_words) == 0:
        return 0

    return int((len(matched) / len(jd_words)) * 100)


def rank_resumes(job_description):
    results = []

    for resume_id, data in resume_store.items():
        db = data["vector_db"]
        docs = db.similarity_search(job_description, k=3)

        content = " ".join([d.page_content for d in docs])

        score = calculate_score(content, job_description)

        results.append({
            "resume_id": resume_id,
            "filename": data["filename"],
            "full_text": data["full_text"],
            "score": score,
            "content": content
        })

    results = sorted(results, key=lambda x: x["score"], reverse=True)

    return results