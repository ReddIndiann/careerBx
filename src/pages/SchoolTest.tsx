import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  email: string;
  name: string;
  age: string;
  gender: string;
  region: string;
  phoneNumber: string;
  studentStatus: string;
  shsLevel?: string;
  checkedWASSCE?: string;
  schoolName?: string;
  shsProgram?: string;
  programOfInterest?: string;
  assistanceNeeded?: string;
  financialChallenge?: string;
  interestedInScholarship?: string;
  careerAspiration?: string;
  considerVocational?: string;
  specificUniversity?: string;
  specifiedUniversity?: string;
  desiredProgram?: string;
  institutionType?: string;
  studyLocation?: string;
}

const regions = [
  'Ashanti', 'Greater Accra', 'Northern', 'Volta', 'Central',
  'Western', 'Upper-West', 'Upper-East', 'Oti', 'Savannah',
  'Bono East', 'Western North', 'Brong Ahafo', 'North East',
  'Ahafo', 'Eastern'
];

const studentStatuses = [
  'I am in Senior High School (yet to graduate)',
  'I am a recent SHS graduate',
  'I have gained admission to a tertiary institution',
  'I am planning to rewrite WASSCE',
  'My grades don\'t qualify me for university',
  'I can\'t afford to fund my education, even though I have admission or good grades',
  'I am still exploring options (e.g., university vouchers, scholarships)',
  'Other'
];

const shsPrograms = [
  'Business', 'General Art', 'Visual Art', 'Home Economics',
  'Science', 'Technical Studies', 'Agriculture', 'Other'
];

const programsOfInterest = [
  'Art', 'Fashion', 'Home Sciences', 'Technical Studies',
  'Business', 'Technology', 'Science', 'Agriculture', 'Other'
];

const institutionTypes = [
  'Public university (e.g., University of Ghana, KNUST)',
  'Private university (e.g., Ashesi University)',
  'Technical University (e.g., Accra Technical University)',
  'Vocational school (e.g., GH Media School)',
  'Other'
];

const SchoolTest = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    age: '',
    gender: '',
    region: '',
    phoneNumber: '',
    studentStatus: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Let's start with your basic information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Tell us a bit more about yourself</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Prefer not to say</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Your Location & Contact</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                >
                  <option value="">Select region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Your Current Status</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Which of these best describes you?</label>
                <div className="space-y-3">
                  {studentStatuses.map(status => (
                    <div key={status} className="flex items-center">
                      <input
                        type="radio"
                        id={status}
                        name="studentStatus"
                        value={status}
                        checked={formData.studentStatus === status}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                      />
                      <label htmlFor={status} className="ml-3 block text-sm text-gray-700">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Education Details</h2>
            {formData.studentStatus === 'I am in Senior High School (yet to graduate)' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Which level are you?</label>
                  <div className="space-y-2">
                    {['SHS 1', 'SHS 2', 'SHS 3'].map(level => (
                      <div key={level} className="flex items-center">
                        <input
                          type="radio"
                          id={level}
                          name="shsLevel"
                          value={level}
                          checked={formData.shsLevel === level}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                        />
                        <label htmlFor={level} className="ml-3 block text-sm text-gray-700">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {formData.studentStatus === 'I am a recent SHS graduate' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Have you checked your WASSCE results?</label>
                  <div className="space-y-2">
                    {['Yes', 'No'].map(option => (
                      <div key={option} className="flex items-center">
                        <input
                          type="radio"
                          id={option}
                          name="checkedWASSCE"
                          value={option}
                          checked={formData.checkedWASSCE === option}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                        />
                        <label htmlFor={option} className="ml-3 block text-sm text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div>
              <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">Name of Senior High School</label>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                value={formData.schoolName || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                placeholder="Enter school name"
              />
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Program Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What Program did you study in SHS?</label>
                <select
                  name="shsProgram"
                  value={formData.shsProgram || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select program</option>
                  {shsPrograms.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What is your program of interest?</label>
                <select
                  name="programOfInterest"
                  value={formData.programOfInterest || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select program of interest</option>
                  {programsOfInterest.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Support & Assistance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What do you need help with?</label>
                <select
                  name="assistanceNeeded"
                  value={formData.assistanceNeeded || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select area of assistance</option>
                  <option value="Choosing a Program">Choosing a Program to study</option>
                  <option value="Exploring Career Options">Exploring Career Options</option>
                  <option value="Picking a Tertiary">Picking a Tertiary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What is your biggest financial challenge?</label>
                <select
                  name="financialChallenge"
                  value={formData.financialChallenge || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select financial challenge</option>
                  <option value="Tuition fees">Tuition fees</option>
                  <option value="Accommodation costs">Accommodation costs</option>
                  <option value="Learning materials">Learning materials (e.g., books, laptops)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Are you interested in scholarships or financial aid?</label>
                <div className="space-y-2">
                  {['Yes', 'No'].map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={`scholarship-${option}`}
                        name="interestedInScholarship"
                        value={option}
                        checked={formData.interestedInScholarship === option}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                      />
                      <label htmlFor={`scholarship-${option}`} className="ml-3 block text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 8:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Career & Future Plans</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="careerAspiration" className="block text-sm font-medium text-gray-700">Career Aspiration</label>
                <textarea
                  id="careerAspiration"
                  name="careerAspiration"
                  value={formData.careerAspiration || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="What specific career have you considered pursuing?"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Would you consider vocational or technical training?</label>
                <div className="space-y-2">
                  {['Yes', 'No', 'Maybe'].map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={`vocational-${option}`}
                        name="considerVocational"
                        value={option}
                        checked={formData.considerVocational === option}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                      />
                      <label htmlFor={`vocational-${option}`} className="ml-3 block text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 9:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Institution Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Do you have a specific university in mind?</label>
                <div className="space-y-2">
                  {['Yes', 'No I\'m exploring options'].map(option => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={`specific-uni-${option}`}
                        name="specificUniversity"
                        value={option}
                        checked={formData.specificUniversity === option}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                      />
                      <label htmlFor={`specific-uni-${option}`} className="ml-3 block text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {formData.specificUniversity === 'Yes' && (
                <div>
                  <label htmlFor="specifiedUniversity" className="block text-sm font-medium text-gray-700">Please specify the university</label>
                  <input
                    type="text"
                    id="specifiedUniversity"
                    name="specifiedUniversity"
                    value={formData.specifiedUniversity || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter university name"
                  />
                </div>
              )}
              <div>
                <label htmlFor="desiredProgram" className="block text-sm font-medium text-gray-700">What Program will you want to study?</label>
                <input
                  type="text"
                  id="desiredProgram"
                  name="desiredProgram"
                  value={formData.desiredProgram || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Enter desired program"
                />
              </div>
            </div>
          </motion.div>
        );

      case 10:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Final Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What type of institution are you interested in?</label>
                <select
                  name="institutionType"
                  value={formData.institutionType || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select institution type</option>
                  {institutionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Where would you prefer to study?</label>
                <div className="space-y-2">
                  {[
                    'Locally (within Ghana)',
                    'Regionally (other African countries)',
                    'Internationally (outside Africa)'
                  ].map(location => (
                    <div key={location} className="flex items-center">
                      <input
                        type="radio"
                        id={`location-${location}`}
                        name="studyLocation"
                        value={location}
                        checked={formData.studyLocation === location}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                      />
                      <label htmlFor={`location-${location}`} className="ml-3 block text-sm text-gray-700">
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${(step / 10) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600 text-right">Step {step} of 10</div>
          </div>

          {/* Form content */}
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
            <button
              onClick={step === 10 ? () => console.log(formData) : nextStep}
              className="ml-auto px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              {step === 10 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolTest; 