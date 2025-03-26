import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  // Personal Information
  fullName: string;
  age: string;
  gender: string;
  region: string;
  phoneNumber: string;

  // Academic Journey
  currentStatus: string;
  shsLevel?: string;
  wassceResults?: string;
  schoolName: string;
  currentProgram: string;
  programOfInterest: string;

  // Guidance
  helpNeeded: string[];

  // Financial and Career Preferences
  financialChallenge: string;
  interestedInScholarship: string;
  careerAspiration: string;
  considerVocational: string;

  // University Preferences
  hasSpecificUniversity: string;
  specificUniversity?: string;
  desiredProgram?: string;
  institutionType: string;
  studyLocation: string;
}

const SchoolTest = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    gender: '',
    region: '',
    phoneNumber: '',
    currentStatus: '',
    schoolName: '',
    currentProgram: '',
    programOfInterest: '',
    helpNeeded: [],
    financialChallenge: '',
    interestedInScholarship: '',
    careerAspiration: '',
    considerVocational: '',
    hasSpecificUniversity: '',
    institutionType: '',
    studyLocation: '',
  });

  const regions = [
    'Ashanti', 'Greater Accra', 'Northern', 'Volta', 'Central', 'Western',
    'Upper-West', 'Upper-East', 'Oti', 'Savannah', 'Bono East', 'Western North',
    'Brong Ahafo', 'North East', 'Ahafo', 'Eastern'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        helpNeeded: checkbox.checked
          ? [...prev.helpNeeded, value]
          : prev.helpNeeded.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Handle form submission
      console.log('Form submitted:', formData);
      navigate('/search-results');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age *</label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select age range</option>
                  <option value="15-17">15 - 17 years</option>
                  <option value="18-20">18 - 20 years</option>
                  <option value="21-23">21 - 23 years</option>
                  <option value="24-26">24 - 26 years</option>
                  <option value="27+">27 years and above</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Region of Residence *</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Academic Journey</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Which of these best describes you? *</label>
                <select
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select your status</option>
                  <option value="in_shs">I am in Senior High School (yet to graduate)</option>
                  <option value="recent_graduate">I am a recent SHS graduate</option>
                  <option value="admitted">I have gained admission to a tertiary institution</option>
                  <option value="rewrite">I am planning to rewrite WASSCE</option>
                  <option value="poor_grades">My grades don't qualify me for university</option>
                  <option value="financial">I can't afford to fund my education</option>
                  <option value="exploring">I am still exploring options</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {formData.currentStatus === 'in_shs' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">If you are in SHS, which level are you?</label>
                  <select
                    name="shsLevel"
                    value={formData.shsLevel}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  >
                    <option value="">Select level</option>
                    <option value="shs1">SHS 1</option>
                    <option value="shs2">SHS 2</option>
                    <option value="shs3">SHS 3</option>
                  </select>
                </div>
              )}

              {formData.currentStatus === 'recent_graduate' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">If you have finished SHS, have you checked your WASSCE results?</label>
                  <select
                    name="wassceResults"
                    value={formData.wassceResults}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  >
                    <option value="">Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Name of Senior High School you attended or (are currently attending) *</label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">What Program are you studying or did you study in Senior High School (SHS)? *</label>
                <select
                  name="currentProgram"
                  value={formData.currentProgram}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select program</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="technical">Technical Studies</option>
                  <option value="home_economics">Home Economics</option>
                  <option value="visual_art">Visual Art</option>
                  <option value="science">Science</option>
                  <option value="general_art">General Art</option>
                  <option value="business">Business</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">What is your program of interest? *</label>
                <select
                  name="programOfInterest"
                  value={formData.programOfInterest}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select program</option>
                  <option value="business">Business</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="technical">Technical Studies</option>
                  <option value="technology">Technology</option>
                  <option value="science">Science</option>
                  <option value="fashion">Fashion</option>
                  <option value="art">Art</option>
                  <option value="home_sciences">Home Sciences</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Guidance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">What do you need help with? *</label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="helpNeeded"
                      value="choosing_program"
                      checked={formData.helpNeeded.includes('choosing_program')}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2">Choosing a Program to study</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="helpNeeded"
                      value="career_options"
                      checked={formData.helpNeeded.includes('career_options')}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2">Exploring Career Options</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="helpNeeded"
                      value="institution"
                      checked={formData.helpNeeded.includes('institution')}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2">Picking a Tertiary Institution</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Financial and Career Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">What is your biggest financial challenge? *</label>
                <select
                  name="financialChallenge"
                  value={formData.financialChallenge}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select challenge</option>
                  <option value="tuition">Tuition fees</option>
                  <option value="accommodation">Accommodation costs</option>
                  <option value="materials">Learning materials</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Are you interested in scholarships or financial aid? *</label>
                <select
                  name="interestedInScholarship"
                  value={formData.interestedInScholarship}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Career Aspiration: Is there a specific career you've considered pursuing?</label>
                <input
                  type="text"
                  name="careerAspiration"
                  value={formData.careerAspiration}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Would you consider vocational or technical training? *</label>
                <select
                  name="considerVocational"
                  value={formData.considerVocational}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="maybe">Maybe</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">University Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Do you have a specific university in mind you want to study? *</label>
                <select
                  name="hasSpecificUniversity"
                  value={formData.hasSpecificUniversity}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No, I'm exploring options</option>
                </select>
              </div>

              {formData.hasSpecificUniversity === 'yes' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">If you selected YES (please specify)</label>
                    <input
                      type="text"
                      name="specificUniversity"
                      value={formData.specificUniversity}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">What Program will you want to study in the University?</label>
                    <input
                      type="text"
                      name="desiredProgram"
                      value={formData.desiredProgram}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">What type of institution are you interested in? *</label>
                <select
                  name="institutionType"
                  value={formData.institutionType}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select type</option>
                  <option value="public">Public university</option>
                  <option value="private">Private university</option>
                  <option value="technical">Technical University</option>
                  <option value="vocational">Vocational school</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Where would you prefer to study? *</label>
                <select
                  name="studyLocation"
                  value={formData.studyLocation}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select location</option>
                  <option value="local">Locally (within Ghana)</option>
                  <option value="regional">Regionally (other African countries)</option>
                  <option value="international">Internationally (outside Africa)</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">School Assessment Test</h1>
              <div className="text-sm text-gray-500">
                Step {currentStep} of 5
              </div>
            </div>
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-between">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step <= currentStep
                          ? 'bg-orange-500 text-white'
                          : 'bg-white border-2 border-gray-300 text-gray-500'
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStep()}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                  currentStep === 1 ? 'ml-auto' : ''
                }`}
              >
                {currentStep === 5 ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchoolTest; 