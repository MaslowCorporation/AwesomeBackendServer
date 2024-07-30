import fs from "fs";
import path from "path";
import OpenAI from "openai";



export async function GenerateAudioFromTxt({
    apiKey,
    voice,
    text,
    onSuccess,
    onError,
}) {
    try {
        const openai = new OpenAI({
            apiKey,
        });

        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: voice,
            input: text,
        });

        const bufferData = await mp3.arrayBuffer();

        // eslint-disable-next-line no-undef
        // const buffer = Buffer.from(bufferData);

        const bufferArray = new Uint8Array(bufferData);
        const bufferArrayJS = Array.from(bufferArray);

        onSuccess && onSuccess(bufferArrayJS);

        return bufferArrayJS;
    } catch (error) {
        onError && onError(error);

        return null;
    }
}
