import { 
  getAssessments, 
  getAssessment, 
  submitAssessment 
} from '../controllers/assessmentController.js';
import Assessment from '../models/assessments.js';
import AssessmentAttempt from '../models/assessmentAttempts.js';
import mongoose from 'mongoose';

jest.mock('../models/assessments.js');
jest.mock('../models/assessmentAttempts.js');

describe('Assessment Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      query: {},
      params: {},
      user: {
        _id: new mongoose.Types.ObjectId()
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAssessments', () => {
    it('should get all assessments successfully', async () => {
      const mockAssessments = [
        {
          _id: new mongoose.Types.ObjectId(),
          title: 'Test Assessment',
          duration: 60,
          totalQuestions: 10,
          skillLevel: 'beginner',
          category: 'frontend'
        }
      ];

      Assessment.find.mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockAssessments)
          })
        })
      });

      await getAssessments(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Assessments retrieved successfully',
        data: mockAssessments,
        status: 200,
        result: 1,
        total: 1
      });
    });

    it('should handle errors when getting assessments', async () => {
      Assessment.find.mockImplementation(() => {
        throw new Error('Database error');
      });

      await getAssessments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch assessments',
        status: 500
      });
    });
  });

  describe('submitAssessment', () => {
    it('should submit assessment successfully', async () => {
      const mockAssessment = {
        _id: new mongoose.Types.ObjectId(),
        questions: [
          {
            _id: new mongoose.Types.ObjectId(),
            question: 'Test question',
            correctAnswer: 'correct',
            points: 10
          }
        ],
        passingScore: 8
      };

      const mockAnswers = [
        {
          questionId: mockAssessment.questions[0]._id.toString(),
          selectedAnswer: 'correct'
        }
      ];

      req.params.id = mockAssessment._id;
      req.body = {
        answers: mockAnswers,
        timeSpent: 300
      };

      Assessment.findById.mockResolvedValue(mockAssessment);
      AssessmentAttempt.findOne.mockResolvedValue(null);
      AssessmentAttempt.prototype.save = jest.fn();

      await submitAssessment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Assessment submitted successfully',
        data: {
          score: 10,
          totalPoints: 10,
          passed: true,
          feedback: [
            {
              question: 'Test question',
              selectedAnswer: 'correct',
              isCorrect: true,
              points: 10
            }
          ]
        },
        status: 200,
        result: 1,
        total: 1
      });
    });

    it('should handle already attempted assessment', async () => {
      const mockAssessment = {
        _id: new mongoose.Types.ObjectId()
      };

      req.params.id = mockAssessment._id;
      req.body = { answers: [], timeSpent: 300 };

      Assessment.findById.mockResolvedValue(mockAssessment);
      AssessmentAttempt.findOne.mockResolvedValue({ _id: new mongoose.Types.ObjectId() });

      await submitAssessment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'You have already attempted this assessment',
        status: 400
      });
    });

    it('should handle assessment not found', async () => {
      req.params.id = new mongoose.Types.ObjectId();
      req.body = { answers: [], timeSpent: 300 };

      Assessment.findById.mockResolvedValue(null);

      await submitAssessment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Assessment not found',
        status: 404
      });
    });
  });
}); 