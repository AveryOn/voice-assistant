
import axios from "axios";

export async function askGemma(prompt: string) {
    const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'gemma3:1b',
        prompt,
        stream: false
    });

    return res.data.response.trim();
}