import { OpenAI } from "openai";
import User from "../models/user.js";
import Course from "../models/course.js";
import Response from "../utils/Response.js";
import status from "http-status";

export const generateCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await User.findById(userId);
 
    if (!userData) {
      return Response.errorMessage(res, "User not found", status.NOT_FOUND);
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const userPrompt = `I am looking for online courses to improve my skills in ${
      userData.programmingSkills?.length > 0
        ? userData.programmingSkills.join(", ")
        : userData.developmentInterest || "software development"
    }.

My background: 
- Education: ${userData.educationType || "Not specified"}
- Current skills: ${userData.programmingSkills?.join(", ") || "Beginner level"}
- Interested in: ${userData.excitingTechnology || userData.developmentInterest}
- Career goals: ${userData.careerAspirations || "Becoming a developer"}

Please recommend courses that:
✅ Match my current skill level
✅ Include practical projects
✅ Are from reputable platforms
✅ Align with my career goals
✅ Have clear learning outcomes`;

    const systemPrompt = `You are an expert tech career counselor. 
Provide course recommendations in JSON format:
{
  "courses": [
    {
      "title": "Course title",
      "link": "Course URL",
      "platform": "Platform name",
      "difficulty": "beginner/intermediate/advanced",
      "duration": "Estimated time",
      "description": "Brief description",
      "tags": ["relevant", "skills"]
    }
  ]
}

Provide 3 highly relevant courses for ${userData.developmentInterest || "software development"}.
Focus on practical, industry-relevant skills.
Base difficulty level on user's background.`;

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

    const courseRecord = new Course({
      userId,
      courses: recommendations.courses,
      learningPreference:  "self-paced",
    });

    await courseRecord.save();

    return Response.succesMessage(
      res,
      "Course recommendations generated successfully",
      {
        careerPath: userData.excitingTechnology || userData.developmentInterest,
        learningPreference:  "self-paced",
        recommendations: recommendations.courses,
      },
      status.OK
    );
  } catch (error) {
    return Response.errorMessage(
      res,
      "Failed to generate course recommendations",
      status.INTERNAL_SERVER_ERROR
    );
  }
};

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
    return Response.errorMessage(
      res,
      "Failed to retrieve course recommendations",
      status.INTERNAL_SERVER_ERROR
    );
  }
};


