import json
import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "mistral"

def extract_job_details(text: str) -> dict:
    prompt = f"""You are an AI job extraction engine.

Extract:
- company
- role
- qualification
- experience
- vacancies
- last_date
- location

Return ONLY valid JSON. Make sure keys match exactly the ones requested above. If a value is unknown, use "Not specified".

TEXT:
{text}
"""
    
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "format": "json"
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()
        
        # The mistral model should return valid JSON inside response["response"]
        result_text = data.get("response", "{}")
        
        job_data = json.loads(result_text)
        return job_data
    except Exception as e:
        print(f"Error calling Ollama: {e}")
        return {}
