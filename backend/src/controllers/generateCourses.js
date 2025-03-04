import { OpenAI } from "openai";
import User from "../models/user.js";
import Course from "../models/course.js";
import Response from "../utils/Response.js";
import status from "http-status";

export const generateCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await User.findById(userId);
    console.log("userData", userData);
    if (!userData) {
      return Response.errorMessage(res, "User not found", status.NOT_FOUND);
    }

    // const { careerPath, experienceLevel, learningPreference } = req.body;

    // if (!careerPath) {
    //   return Response.errorMessage(
    //     res,
    //     "Please provide a career path",
    //     status.BAD_REQUEST
    //   );
    // }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    let userPrompt = "";

    if (userData?.hasProgrammingExperience) {
      userPrompt = `I am looking for **advanced online courses** to improve my skills in **${
        userData.programmingSkills.length > 0
          ? userData.programmingSkills.join(", ")
          : "various programming languages"
      }**.  

I am particularly interested in **${
        userData.excitingTechnology
      }**, and my career aspirations are: **${
        userData.careerAspirations || "growing as a software engineer"
      }**.  

In high school, I studied **${
        userData.educationCombination || "general subjects"
      }**. However, this **${
        userData.educationCombination ? "did/did not" : "may not have"
      }** . I am looking for **courses that help bridge any gaps** and enhance my expertise in software development.

### **Course Requirements**
✅ **Include real-world projects** and hands-on experience.  
✅ **Cover advanced concepts** relevant to my career interests.  
✅ Are available on **reputable learning platforms** like Coursera, Udemy, edX, or similar.  
✅ Are suited for **self-paced or structured learning**, based on industry standards.  
✅ If needed, recommend **optional prerequisite courses** to fill any knowledge gaps.  

Please provide recommendations in **structured JSON format**, ensuring the courses are **practical, career-oriented, and aligned with current industry demands**.`;
    } else {
      userPrompt = `Find **beginner-friendly online courses** to help me start learning programming.  
    I am interested in **${userData.excitingTechnology}** and this is my carrer aspirations **${userData.careerAspirations}**, and my background is **${userData?.educationType}** and I took this courses  **${userData.educationCombination}**.  
    Recommend structured courses with **step-by-step guidance, no prior coding experience required**,  
    and a **practical approach** to learning.`;
    }

    // System directive for structured course recommendations

    const systemPrompt = `You are an expert career counselor and tech educator. 
    Provide course recommendations in the following JSON format:
    {
      "courses": [
        {
          "title": "Course title",
          "link": "Direct course URL",
          "platform": "Platform name (e.g., Udemy, Coursera)",
          "difficulty": "beginner/intermediate/advanced",
          "duration": "Estimated completion time",
          "description": "Brief course description",
          "tags": ["relevant", "skill", "tags"]
        }
      ]
    }
    
  
    
    Provide 5 highly relevant courses with accurate, working links from reputable platforms.
    Focus on practical, industry-relevant skills.`;

    // const userPrompt = `Find the best online courses for a ${careerPath} career path,
    // suitable for ${experienceLevel || "beginner"} level with ${
    //   learningPreference || "self-paced"
    // } learning style.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const recommendations = JSON.parse(response.choices[0].message.content);

    // Save course recommendations
    const courseRecord = new Course({
      userId,
   
      courses: recommendations.courses,
      experienceLevel: "beginner",
      learningPreference:  "self-paced",
    });

    await courseRecord.save();

    return Response.succesMessage(
      res,
      "Course recommendations generated successfully",
      {
        // careerPath,
        experienceLevel: "beginner",
        learningPreference:  "self-paced",
        recommendations: recommendations.courses,
      },
      status.OK
    );
  } catch (error) {
    console.error("Error:", error);
    return Response.errorMessage(
      res,
      "Failed to generate course recommendations",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

// Get user's course recommendations
export const getUserCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    const courses = await Course.find({
      userId,
      isActive: true,
    }).sort("-createdAt");

    if (!courses.length) {
      return Response.errorMessage(
        res,
        "No course recommendations found",
        status.NOT_FOUND
      );
    }

    return Response.succesMessage(
      res,
      "Course recommendations retrieved successfully",
      courses,
      status.OK
    );
  } catch (error) {
    console.error("Error:", error);
    return Response.errorMessage(
      res,
      "Failed to retrieve course recommendations",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

// import { GoogleGenerativeAI } from '@google/generative-ai';

// const generateCourses = async (req, res) => {
//   try {
//     // Initialize Gemini API with your API key
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     // Use the correct model name
//     const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

//     const { careerPath, experienceLevel, learningPreference } = req.body;

//     if (!careerPath) {
//       return res.status(400).json({
//         error: "Please provide a career path (e.g., frontend, backend, UI/UX)."
//       });
//     }

//     const prompt = `Recommend online courses for someone interested in a ${careerPath} tech career. They have ${
//       experienceLevel || "beginner"
//     } experience and prefer ${learningPreference || "self-paced"} learning. Please provide specific course names and platforms.`;

//     const result = await model.generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const response = await result.response;
//     const recommendations = response.text();

//     res.json({
//       careerPath,
//       experienceLevel: experienceLevel || 'beginner',
//       learningPreference: learningPreference || 'self-paced',
//       recommendations
//     });

//   } catch (error) {
//     console.error('Gemini API Error:', error);
//     res.status(500).json({
//       message: "Server error",
//       details: error.message
//     });
//   }
// };

// export default generateCourses;
