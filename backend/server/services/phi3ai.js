require('dotenv').config();
const axios = require("axios");
const usedModelName = process.env.MODEL_NAME;

async function isModelAvailable(modelName) {
    try {
        const response = await axios.get(process.env.OLLAMA_API_URL + "/api/tags");
        const availableModels = response.data.models;
        console.log(availableModels)
        return availableModels.some(model => model.name === modelName);
    } catch (error) {
        console.error("Error checking model availability:", error);
        return false;
    }
}

async function ensureModelIsAvailable(modelName) {
    try {
        const available = await isModelAvailable(modelName);
        if (available) {
            console.log(`Model ${modelName} is already available.`);
            return true;
        }
        console.log(`Model ${modelName} not found, attempting to pull...`);
        const response = await axios.post(process.env.OLLAMA_API_URL + "/api/pull", {
            model: modelName
        });

        if (response.data.success) {
            console.log(`Successfully pulled model: ${modelName}`);
            return true;
        } else {
            console.error(`Failed to pull model: ${modelName}`);
            return false;
        }
    } catch (error) {
        console.error("Error pulling model:", error);
        return false;
    }
}

async function classifyReview(input) {
    const modelReady = await ensureModelIsAvailable(usedModelName);

    try {
    if (!modelReady) {
        console.log(`Model ${usedModelName} is not available. Exiting classification.`);
        return "Model loading failed or not available, please try again later.";
    }

        console.log("Classifying input:", input);
        const prompt = `Classify the following review under one of these categories: Bugs, Complaints, Crashes, Praises, or Other. Choose 'Bugs' if the review mentions any issues or bugs in the app, 'Complaints' for general complaints about functionality or features, 'Crashes' if the review discusses app crashes, 'Praises' if the review praises the app or developers, or 'Other' if none of the other categories apply.Limit your response to only one word. Do not include any other details in your response. Return only one category name based on the review content.Review: '${input}' Category: `
        const response = await axios.post(process.env.OLLAMA_API_URL + "/api/generate", {
            model: usedModelName,
            prompt: prompt,
            stream: false
        });
        console.log("Classification response:", response.data.response);
        return response.data.response;
    } catch (error) {
        console.error("Error during classification:", error);
        return "Error during classification.";
    }
}


// for testing this
(async () => {
    const result = await classifyReview("good");
    console.log("Classification Result:", result);
})();

module.exports = { classifyReview, ensureModelIsAvailable, isModelAvailable };
