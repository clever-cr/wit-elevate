import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAssessments, deleteAssessment } from '../util/api';
import { AssessmentListItem } from '../util/types';

export const AdminAssessmentList = () => {
  const [assessments, setAssessments] = useState<AssessmentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    skillLevel: ''
  });

  const loadAssessments = async () => {
    try {
      setLoading(true);
      const data = await fetchAssessments(
        filters.category || undefined,
        filters.skillLevel || undefined
      );
      setAssessments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load assessments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssessments();
  }, [filters.category, filters.skillLevel]);

  const handleDeleteAssessment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      try {
        await deleteAssessment(id);
        // Refresh assessment list
        loadAssessments();
      } catch (err) {
        setError('Failed to delete assessment');
      }
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading assessments...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Assessments</h1>
        <Link
          to="/portal/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create New Assessment
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-6 flex gap-4">
        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
            <option value="database">Database</option>
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
          <select
            name="skillLevel"
            value={filters.skillLevel}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assessments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No assessments found
                </td>
              </tr>
            ) : (
              assessments.map((assessment) => (
                <tr key={assessment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{assessment.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{assessment.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{assessment.skillLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{assessment.totalQuestions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{assessment.duration} min</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <Link
                        to={`/portal/EditAssessment/${assessment._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteAssessment(assessment._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

