export interface Institution {
  id: number;
  name: string;
  location: string;
  type: 'University' | 'Polytechnic' | 'Vocational';
  courses: string[];
  feesRange: {
    min: number;
    max: number;
    currency: string;
  };
  admissionDates: {
    start: string;
    end: string;
  };
  totalYears: number;
  accreditation: string;
  facilities: string[];
  website: string;
}

export const institutions: Institution[] = [
  {
    id: 1,
    name: "University of Ghana",
    location: "Legon, Accra",
    type: "University",
    courses: ["Medicine", "Engineering", "Business Administration", "Law", "Arts and Sciences"],
    feesRange: {
      min: 5000,
      max: 15000,
      currency: "USD"
    },
    admissionDates: {
      start: "2024-05-01",
      end: "2024-08-31"
    },
    totalYears: 4,
    accreditation: "National Accreditation Board",
    facilities: ["Library", "Sports Complex", "Medical Center", "Research Labs"],
    website: "www.ug.edu.gh"
  },
  {
    id: 2,
    name: "Kwame Nkrumah University of Science and Technology",
    location: "Kumasi",
    type: "University",
    courses: ["Engineering", "Architecture", "Computer Science", "Medicine", "Pharmacy"],
    feesRange: {
      min: 4500,
      max: 12000,
      currency: "USD"
    },
    admissionDates: {
      start: "2024-06-01",
      end: "2024-09-15"
    },
    totalYears: 4,
    accreditation: "National Accreditation Board",
    facilities: ["Tech Labs", "Innovation Hub", "Library", "Student Center"],
    website: "www.knust.edu.gh"
  },
  {
    id: 3,
    name: "Accra Technical University",
    location: "Accra",
    type: "Polytechnic",
    courses: ["Engineering", "Applied Sciences", "Business", "Fashion Design"],
    feesRange: {
      min: 2000,
      max: 6000,
      currency: "USD"
    },
    admissionDates: {
      start: "2024-07-01",
      end: "2024-10-31"
    },
    totalYears: 3,
    accreditation: "National Board for Professional and Technical Examinations",
    facilities: ["Workshops", "Computer Labs", "Design Studios"],
    website: "www.atu.edu.gh"
  },
  {
    id: 4,
    name: "Ghana Institute of Management",
    location: "East Legon, Accra",
    type: "University",
    courses: ["Business Administration", "Finance", "Marketing", "Human Resource Management"],
    feesRange: {
      min: 3500,
      max: 8000,
      currency: "USD"
    },
    admissionDates: {
      start: "2024-04-15",
      end: "2024-08-15"
    },
    totalYears: 4,
    accreditation: "National Accreditation Board",
    facilities: ["Business Center", "Conference Hall", "Library"],
    website: "www.gim.edu.gh"
  },
  {
    id: 5,
    name: "Tema Technical Institute",
    location: "Tema",
    type: "Vocational",
    courses: ["Automotive Engineering", "Electrical Installation", "Welding", "Plumbing"],
    feesRange: {
      min: 1500,
      max: 4000,
      currency: "USD"
    },
    admissionDates: {
      start: "2024-08-01",
      end: "2024-11-30"
    },
    totalYears: 2,
    accreditation: "COTVET",
    facilities: ["Technical Workshops", "Practice Labs"],
    website: "www.tti.edu.gh"
  },
  {
    id: 6,
    name: "Central University",
    location: "Miotso, Greater Accra",
    type: "University",
    courses: ["Theology", "Business", "Architecture", "Nursing"],
    feesRange: {
      min: 3000,
      max: 9000,
      currency: "USD"
    },
    admissionDates: {
      start: "2024-05-15",
      end: "2024-09-15"
    },
    totalYears: 4,
    accreditation: "National Accreditation Board",
    facilities: ["Chapel", "Library", "Health Center"],
    website: "www.central.edu.gh"
  },
  {
    id: 7,
    name: "Kumasi Technical Institute",
    location: "Kumasi",
    type: "Vocational",
    courses: ["Fashion Design", "Catering", "Electronics", "Building Construction"],
    feesRange: {
      min: 1200,
      max: 3500,
      currency: "USD"
    },
    admissionDates: {
      start: "2024-07-15",
      end: "2024-10-15"
    },
    totalYears: 2,
    accreditation: "COTVET",
    facilities: ["Workshops", "Practice Kitchens", "Design Studios"],
    website: "www.kti.edu.gh"
  },
  {
    id: 8,
    name: "Valley View University",
    location: "Oyibi, Greater Accra",
    type: "University",
    courses: ["Agriculture", "Business", "Education", "Information Technology"],
    feesRange: {
      min: 2800,
      max: 7500,
      currency: "USD"
    },
    admissionDates: {
      start: "2024-06-15",
      end: "2024-09-30"
    },
    totalYears: 4,
    accreditation: "National Accreditation Board",
    facilities: ["Farm", "Computer Labs", "Library"],
    website: "www.vvu.edu.gh"
  },
  {
    id: 9,
    name: "Ho Technical University",
    location: "Ho, Volta Region",
    type: "Polytechnic",
    courses: ["Hospitality Management", "Engineering", "Applied Sciences", "Business"],
    feesRange: {
      min: 2200,
      max: 5500,
      currency: "USD"
    },
    admissionDates: {
      start: "2024-07-01",
      end: "2024-10-31"
    },
    totalYears: 3,
    accreditation: "National Board for Professional and Technical Examinations",
    facilities: ["Workshops", "Labs", "Library"],
    website: "www.htu.edu.gh"
  },
  {
    id: 10,
    name: "Ghana Media School",
    location: "East Legon, Accra",
    type: "Vocational",
    courses: ["Journalism", "Broadcasting", "Film Production", "Digital Media"],
    feesRange: {
      min: 2500,
      max: 6000,
      currency: "USD"
    },
    admissionDates: {
      start: "2024-08-15",
      end: "2024-11-30"
    },
    totalYears: 3,
    accreditation: "National Accreditation Board",
    facilities: ["TV Studio", "Radio Station", "Editing Suites"],
    website: "www.gms.edu.gh"
  }
]; 