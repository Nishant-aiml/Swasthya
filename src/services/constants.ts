export const MEDICAL_DISCLAIMER = `
IMPORTANT MEDICAL DISCLAIMER:
This AI provides general information and suggestions for informational purposes only. 
It is not a substitute for professional medical advice, diagnosis, or treatment. 
Always seek the advice of your physician or other qualified health provider with any 
questions you may have regarding a medical condition.

In case of emergency, please contact emergency services or visit your nearest 
healthcare facility immediately.
`.trim();

export const API_CONFIG = {
  HUGGING_FACE_KEY: process.env.REACT_APP_HUGGING_FACE_KEY,
  BASE_URL: 'https://api-inference.huggingface.co/models'
};
