// import { OpenAI } from 'openai';

// const generateCourses = async (req, res) => {
//   const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
//   });

//   const { careerPath, experienceLevel, learningPreference } = req.body;

//   if (!careerPath) {
//     return res.status(400).json({
//       error: "Please provide a career path (e.g., frontend, backend, UI/UX)."
//     });
//   }

//   const prompt = `Recommend online courses for someone interested in a ${careerPath} tech career. They have ${
//     experienceLevel || "beginner"
//   } experience and prefer ${learningPreference || "self-paced"} learning.`;

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",  // Correct model for chat completions
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful AI that provides course recommendations."
//         },
//         { role: "user", content: prompt }
//       ],
//       max_tokens: 200
//     });
    
//     const recommendations = response.choices[0].message.content;
//     res.json({ careerPath, recommendations });
//   } catch (error) {
//     console.error('OpenAI API Error:', error);
//     res.status(500).json({ 
//       message: "Server error", 
//       details: "OpenAI API quota exceeded or invalid credentials" 
//     });
//   }
// };

// export default generateCourses;

import { GoogleGenerativeAI } from '@google/generative-ai';

const generateCourses = async (req, res) => {
  try {
    // Initialize Gemini API with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const { careerPath, experienceLevel, learningPreference } = req.body;

    if (!careerPath) {
      return res.status(400).json({
        error: "Please provide a career path (e.g., frontend, backend, UI/UX)."
      });
    }

    const prompt = `Recommend online courses for someone interested in a ${careerPath} tech career. They have ${
      experienceLevel || "beginner"
    } experience and prefer ${learningPreference || "self-paced"} learning. Please provide specific course names and platforms.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    const recommendations = response.text();
    
    res.json({ 
      careerPath, 
      experienceLevel: experienceLevel || 'beginner',
      learningPreference: learningPreference || 'self-paced',
      recommendations 
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      message: "Server error", 
      details: error.message 
    });
  }
};

export default generateCourses;