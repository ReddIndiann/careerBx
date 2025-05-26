import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

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

interface Message {
  type: 'bot' | 'user';
  content: string;
  options?: string[];
  inputType?: 'text' | 'select' | 'checkbox';
  field?: keyof FormData;
  condition?: (formData: FormData) => boolean;
}

const regions = [
  'Ashanti', 'Greater Accra', 'Northern', 'Volta', 'Central', 'Western',
  'Upper-West', 'Upper-East', 'Oti', 'Savannah', 'Bono East', 'Western North',
  'Brong Ahafo', 'North East', 'Ahafo', 'Eastern'
];

const questions: Message[] = [
  {
    type: 'bot',
    content: "Hi! I'm here to help you find the perfect school. Let's start with your name.",
    inputType: 'text',
    field: 'fullName'
  },
  {
    type: 'bot',
    content: "What's your age range?",
    inputType: 'select',
    options: ['15-17', '18-20', '21-23', '24-26', '27+'],
    field: 'age'
  },
  {
    type: 'bot',
    content: "What's your gender?",
    inputType: 'select',
    options: ['male', 'female'],
    field: 'gender'
  },
  {
    type: 'bot',
    content: "Which region do you live in?",
    inputType: 'select',
    options: regions,
    field: 'region'
  },
  {
    type: 'bot',
    content: "What's your phone number?",
    inputType: 'text',
    field: 'phoneNumber'
  },
  {
    type: 'bot',
    content: "Which of these best describes your current status?",
    inputType: 'select',
    options: [
      'I am in Senior High School (yet to graduate)',
      'I am a recent SHS graduate',
      'I have gained admission to a tertiary institution',
      'I am planning to rewrite WASSCE',
      'My grades don\'t qualify me for university',
      'I can\'t afford to fund my education',
      'I am still exploring options',
      'Other'
    ],
    field: 'currentStatus'
  },
  {
    type: 'bot',
    content: "If you're in SHS, which level are you?",
    inputType: 'select',
    options: ['SHS 1', 'SHS 2', 'SHS 3'],
    field: 'shsLevel',
    condition: (formData) => formData.currentStatus === 'I am in Senior High School (yet to graduate)'
  },
  {
    type: 'bot',
    content: "Have you checked your WASSCE results?",
    inputType: 'select',
    options: ['Yes', 'No'],
    field: 'wassceResults',
    condition: (formData) => formData.currentStatus === 'I am a recent SHS graduate'
  },
  {
    type: 'bot',
    content: "What's the name of your Senior High School?",
    inputType: 'text',
    field: 'schoolName'
  },
  {
    type: 'bot',
    content: "What program are you studying or did you study in SHS?",
    inputType: 'select',
    options: [
      'Agriculture',
      'Technical Studies',
      'Home Economics',
      'Visual Art',
      'Science',
      'General Art',
      'Business',
      'Other'
    ],
    field: 'currentProgram'
  },
  {
    type: 'bot',
    content: "What program are you interested in pursuing?",
    inputType: 'select',
    options: [
      'Business',
      'Agriculture',
      'Technical Studies',
      'Technology',
      'Science',
      'Fashion',
      'Art',
      'Home Sciences',
      'Other'
    ],
    field: 'programOfInterest'
  },
  {
    type: 'bot',
    content: "What do you need help with? (You can select multiple options)",
    inputType: 'checkbox',
    options: [
      'Choosing a Program to study',
      'Exploring Career Options',
      'Picking a Tertiary Institution'
    ],
    field: 'helpNeeded'
  },
  {
    type: 'bot',
    content: "What's your biggest financial challenge?",
    inputType: 'select',
    options: [
      'Tuition fees',
      'Accommodation costs',
      'Learning materials',
      'Other'
    ],
    field: 'financialChallenge'
  },
  {
    type: 'bot',
    content: "Are you interested in scholarships or financial aid?",
    inputType: 'select',
    options: ['Yes', 'No'],
    field: 'interestedInScholarship'
  },
  {
    type: 'bot',
    content: "Is there a specific career you've considered pursuing?",
    inputType: 'text',
    field: 'careerAspiration'
  },
  {
    type: 'bot',
    content: "Would you consider vocational or technical training?",
    inputType: 'select',
    options: ['Yes', 'No', 'Maybe'],
    field: 'considerVocational'
  },
  {
    type: 'bot',
    content: "Do you have a specific university in mind?",
    inputType: 'select',
    options: ['Yes', 'No, I\'m exploring options'],
    field: 'hasSpecificUniversity'
  },
  {
    type: 'bot',
    content: "Which university are you interested in?",
    inputType: 'text',
    field: 'specificUniversity',
    condition: (formData) => formData.hasSpecificUniversity === 'Yes'
  },
  {
    type: 'bot',
    content: "What program would you like to study at the university?",
    inputType: 'text',
    field: 'desiredProgram',
    condition: (formData) => formData.hasSpecificUniversity === 'Yes'
  },
  {
    type: 'bot',
    content: "What type of institution are you interested in?",
    inputType: 'select',
    options: [
      'Public university',
      'Private university',
      'Technical University',
      'Vocational school',
      'Other'
    ],
    field: 'institutionType'
  },
  {
    type: 'bot',
    content: "Where would you prefer to study?",
    inputType: 'select',
    options: [
      'Locally (within Ghana)',
      'Regionally (other African countries)',
      'Internationally (outside Africa)'
    ],
    field: 'studyLocation'
  }
];

const SchoolTest = () => {
  const navigate = useNavigate();
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

  const [messages, setMessages] = useState<Message[]>([questions[0]]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSubmitToFirebase = async () => {
    try {
      setIsSubmitting(true);
      const assessmentRef = collection(db, 'assessments');
      const docRef = await addDoc(assessmentRef, {
        ...formData,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      });
      
      if (docRef.id) {
        setShowSuccessModal(true);
      } else {
        throw new Error('Failed to create document');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      // Show error message to user
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const moveToNextQuestion = () => {
    let nextIndex = currentQuestionIndex;
    let nextQuestion;

    do {
      nextIndex++;
      nextQuestion = questions[nextIndex];
    } while (
      nextQuestion &&
      nextQuestion.condition &&
      !nextQuestion.condition(formData)
    );

    if (nextQuestion) {
      setCurrentQuestionIndex(nextIndex);
      setMessages(prev => [...prev, nextQuestion]);
      setIsWaitingForResponse(false);
    } else {
      // End of questions
      handleSubmitToFirebase();
    }
  };

  const handleOptionClick = (option: string) => {
    if (isWaitingForResponse) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.inputType === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [currentQuestion.field]: prev[currentQuestion.field].includes(option)
          ? prev[currentQuestion.field].filter(item => item !== option)
          : [...prev[currentQuestion.field], option]
      }));
    } else {
      setIsWaitingForResponse(true);
      setMessages(prev => [...prev, { type: 'user', content: option }]);
      setFormData(prev => ({
        ...prev,
        [currentQuestion.field]: option
      }));
      setTimeout(moveToNextQuestion, 500);
    }
  };

  const handleCheckboxContinue = () => {
    if (isWaitingForResponse) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOptions = formData[currentQuestion.field] as string[];
    
    if (selectedOptions.length === 0) return;
    
    setIsWaitingForResponse(true);
    setMessages(prev => [...prev, { type: 'user', content: selectedOptions.join(', ') }]);
    setTimeout(moveToNextQuestion, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isWaitingForResponse) return;

    const currentQuestion = questions[currentQuestionIndex];
    setIsWaitingForResponse(true);
    
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    setFormData(prev => ({
      ...prev,
      [currentQuestion.field]: inputValue
    }));

    setInputValue('');
    setTimeout(moveToNextQuestion, 500);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const showInput = currentQuestion?.inputType === 'text' || currentQuestion?.inputType === 'select';
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const showCheckboxContinue = currentQuestion?.inputType === 'checkbox' && 
    (formData[currentQuestion.field] as string[])?.length > 0;

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/search-results');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">School Assessment Test</h1>
          
          <div className="space-y-4 mb-8 h-[500px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                  {message.options && message.type === 'bot' && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionClick(option)}
                          disabled={isWaitingForResponse}
                          className={`block w-full text-left px-4 py-3 rounded-md hover:bg-gray-200 ${
                            message.inputType === 'checkbox' &&
                            formData[message.field]?.includes(option)
                              ? 'bg-orange-100'
                              : ''
                          } ${isWaitingForResponse ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {message.inputType === 'checkbox' && (
                            <span className="mr-2">
                              {formData[message.field]?.includes(option) ? '✓' : '○'}
                            </span>
                          )}
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {showInput && (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Type your answer..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-4 py-3"
                  disabled={isWaitingForResponse}
                />
                <button
                  type="submit"
                  disabled={isWaitingForResponse}
                  className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                    isWaitingForResponse ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLastQuestion ? 'Submit' : 'Next'}
                </button>
              </div>
            </form>
          )}

          {showCheckboxContinue && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCheckboxContinue}
                disabled={isWaitingForResponse}
                className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                  isWaitingForResponse ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Continue
              </button>
            </div>
          )}

          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Assessment Submitted Successfully!
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Thank you for completing the assessment. We'll analyze your responses and provide personalized recommendations.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    View Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {isSubmitting && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-gray-700">Submitting your assessment...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolTest; 