"use client";
import Together from "together-ai";
import dotenv from "dotenv";

// ✅ Load environment variables before using them
dotenv.config();

const together = new Together({
    apiKey: '8007d92ee12c57c8c20aa63b0fac071c789f7a46eaaba4547901b324f1c924e3', // Make sure this is correctly set
});

async function getResponse() {
    try {
        const response = await together.chat.completions.create({
            messages: [{ "role": "user", "content": "What are some fun things to do in New York?" }],
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        });

        console.log(response.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
    }
}

getResponse();