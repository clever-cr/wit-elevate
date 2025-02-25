import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileFormData {
  personalInfo: {
    phoneNumber: string;
    programmingExperience: boolean;
    programmingLanguages: string[];
    educationLevel: string;
  };
  interests: {
    developmentInterests: string[];
    careerGoals: string;
  };
}

const Profile = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProfileFormData>({
    personalInfo: {
      phoneNumber: '',
      programmingExperience: false,
      programmingLanguages: [],
      educationLevel: ''
    },
    interests: {
      developmentInterests: [],
      careerGoals: ''
    }
  });

  const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'PHP'
  ];

  const developmentInterests = [
    'Web Development', 'Mobile Development', 'Data Science',
    'DevOps', 'Cloud Computing', 'Artificial Intelligence'
  ];

  const educationLevels = [ 'High School', 'Some College', 'Bachelors Degree','Masters Degree', 'PhD', 'Self-Taught'
  ];

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        developmentInterests: prev.interests.developmentInterests.includes(interest)
          ? prev.interests.developmentInterests.filter(i => i !== interest)
          : [...prev.interests.developmentInterests, interest]
      }
    }));
  };

  const handleLanguageChange = (language: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        programmingLanguages: prev.personalInfo.programmingLanguages.includes(language)
          ? prev.personalInfo.programmingLanguages.filter(l => l !== language)
          : [...prev.personalInfo.programmingLanguages, language]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API call to save profile
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Complete your Profile</h1>
      <div className="bg-white rounded-lg p-6 shadow">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full p-2 border rounded"
                      value={formData.personalInfo.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Education Level</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={formData.personalInfo.educationLevel}
                      onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                    >
                      <option value="">Select Education Level</option>
                      {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">Programming Experience</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={formData.personalInfo.programmingExperience}
                      onChange={(e) => handleInputChange('programmingExperience', e.target.checked)}
                    />
                    <label>I have programming experience</label>
                  </div>
                  {formData.personalInfo.programmingExperience && (
                    <div className="grid grid-cols-2 gap-2">
                      {programmingLanguages.map(lang => (
                        <div key={lang} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={formData.personalInfo.programmingLanguages.includes(lang)}
                            onChange={() => handleLanguageChange(lang)}
                          />
                          <label>{lang}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Development Interests</h2>
                <div className="grid grid-cols-2 gap-2">
                  {developmentInterests.map(interest => (
                    <div key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={formData.interests.developmentInterests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                      />
                      <label>{interest}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">Career Goals</h2>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={4}
                  value={formData.interests.careerGoals}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    interests: { ...prev.interests, careerGoals: e.target.value }
                  }))}
                  placeholder="Describe your career goals..."
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                className="bg-gray-200 px-6 py-2 rounded"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Back
              </button>
            )}
            {currentStep < 2 ? (
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded ml-auto"
                onClick={() => setCurrentStep(prev => prev + 1)}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Complete Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 