import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

interface Institution {
  id?: string;
  name: string;
  location: string;
  courses: string[];
  feesRange: { min: number; max: number; currency: string };
  website: string;
  type: string;
  admissionDates: { start: string; end: string };
  totalYears: number;
  accreditation: string;
  facilities: string[];
}

const ExcelUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'excel' | 'manual' | 'list'>('excel');
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Manual entry form state
  const [formData, setFormData] = useState<Institution>({
    name: '',
    location: '',
    courses: [],
    feesRange: { min: 0, max: 0, currency: 'GHS' },
    website: '',
    type: '',
    admissionDates: { start: '', end: '' },
    totalYears: 0,
    accreditation: '',
    facilities: []
  });
  const [currentCourse, setCurrentCourse] = useState('');
  const [currentFacility, setCurrentFacility] = useState('');

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'institutions'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Institution[];
      setInstitutions(data);
    } catch (error) {
      setMessage('Error fetching institutions: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json: any[] = XLSX.utils.sheet_to_json(worksheet);

      for (const row of json) {
        const institution: Institution = {
          name: row['Institution Name'] || '',
          location: row['Location'] || '',
          courses: row['Courses Offered'] ? String(row['Courses Offered']).split(',').map((c: string) => c.trim()) : [],
          feesRange: parseFees(row['Fees Range (GHS)']),
          website: row['Website'] || '',
          type: mapType(row['Institution Type']),
          admissionDates: { start: '', end: '' },
          totalYears: 0,
          accreditation: '',
          facilities: [],
        };
        await addDoc(collection(db, 'institutions'), institution);
      }
      setMessage('Upload complete!');
    } catch (error) {
      setMessage('Error uploading data: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setMessage(null);
    try {
      await addDoc(collection(db, 'institutions'), formData);
      setMessage('Institution added successfully!');
      // Reset form
      setFormData({
        name: '',
        location: '',
        courses: [],
        feesRange: { min: 0, max: 0, currency: 'GHS' },
        website: '',
        type: '',
        admissionDates: { start: '', end: '' },
        totalYears: 0,
        accreditation: '',
        facilities: []
      });
    } catch (error) {
      setMessage('Error adding institution: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const addCourse = () => {
    if (currentCourse.trim()) {
      setFormData(prev => ({
        ...prev,
        courses: [...prev.courses, currentCourse.trim()]
      }));
      setCurrentCourse('');
    }
  };

  const addFacility = () => {
    if (currentFacility.trim()) {
      setFormData(prev => ({
        ...prev,
        facilities: [...prev.facilities, currentFacility.trim()]
      }));
      setCurrentFacility('');
    }
  };

  function parseFees(fees: string): { min: number; max: number; currency: string } {
    if (!fees) return { min: 0, max: 0, currency: 'GHS' };
    const lower = fees.toLowerCase();
    if (lower.includes('free') || lower.includes('fully funded')) return { min: 0, max: 0, currency: 'GHS' };
    const match = fees.match(/([\d,]+)\s*-\s*([\d,]+)/);
    if (match) {
      const min = parseInt(match[1].replace(/,/g, ''), 10);
      const max = parseInt(match[2].replace(/,/g, ''), 10);
      return { min, max, currency: 'GHS' };
    }
    const single = fees.match(/([\d,]+)/);
    if (single) {
      const value = parseInt(single[1].replace(/,/g, ''), 10);
      return { min: value, max: value, currency: 'GHS' };
    }
    return { min: 0, max: 0, currency: 'GHS' };
  }

  function mapType(type: string): string {
    if (!type) return '';
    const lower = type.toLowerCase();
    if (lower.includes('university')) return 'University';
    if (lower.includes('polytechnic')) return 'Polytechnic';
    if (lower.includes('vocational')) return 'Vocational';
    if (lower.includes('entrepreneurship')) return 'Entrepreneurship Program';
    return type;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('excel')}
          className={`px-4 py-2 rounded ${activeTab === 'excel' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          Excel Upload
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={`px-4 py-2 rounded ${activeTab === 'manual' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          Manual Entry
        </button>
        <button
          onClick={() => {
            setActiveTab('list');
            fetchInstitutions();
          }}
          className={`px-4 py-2 rounded ${activeTab === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          View All Schools
        </button>
      </div>

      {activeTab === 'excel' ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Upload Institutions Excel File</h2>
          <label htmlFor="excel-upload" className="block mb-2 font-medium">Select Excel File</label>
          <input id="excel-upload" type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="mb-4" title="Upload Excel file" />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload to Firestore'}
          </button>
        </div>
      ) : activeTab === 'manual' ? (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Manual Institution Entry</h2>
          
          <div>
            <label className="block mb-1 font-medium">Institution Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Courses</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentCourse}
                onChange={(e) => setCurrentCourse(e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
                placeholder="Add a course"
              />
              <button
                type="button"
                onClick={addCourse}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.courses.map((course, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 rounded">
                  {course}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      courses: prev.courses.filter((_, i) => i !== index)
                    }))}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Minimum Fees (GHS)</label>
              <input
                type="number"
                value={formData.feesRange.min}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  feesRange: { ...prev.feesRange, min: parseInt(e.target.value) }
                }))}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Maximum Fees (GHS)</label>
              <input
                type="number"
                value={formData.feesRange.max}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  feesRange: { ...prev.feesRange, max: parseInt(e.target.value) }
                }))}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Institution Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="University">University</option>
              <option value="Polytechnic">Polytechnic</option>
              <option value="Vocational">Vocational</option>
              <option value="Entrepreneurship Program">Entrepreneurship Program</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Admission Start Date</label>
              <input
                type="date"
                value={formData.admissionDates.start}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  admissionDates: { ...prev.admissionDates, start: e.target.value }
                }))}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Admission End Date</label>
              <input
                type="date"
                value={formData.admissionDates.end}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  admissionDates: { ...prev.admissionDates, end: e.target.value }
                }))}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Total Years</label>
            <input
              type="number"
              value={formData.totalYears}
              onChange={(e) => setFormData(prev => ({ ...prev, totalYears: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Accreditation</label>
            <input
              type="text"
              value={formData.accreditation}
              onChange={(e) => setFormData(prev => ({ ...prev, accreditation: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Facilities</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentFacility}
                onChange={(e) => setCurrentFacility(e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
                placeholder="Add a facility"
              />
              <button
                type="button"
                onClick={addFacility}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.facilities.map((facility, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 rounded">
                  {facility}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      facilities: prev.facilities.filter((_, i) => i !== index)
                    }))}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {uploading ? 'Submitting...' : 'Submit Institution'}
          </button>
        </form>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Schools</h2>
            <div className="text-lg font-semibold text-gray-600">
              Total Schools: {institutions.length}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading schools...</p>
            </div>
          ) : institutions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No schools found. Add some schools using the Excel upload or manual entry.
            </div>
          ) : (
            <div className="space-y-4">
              {institutions.map((institution) => (
                <div key={institution.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{institution.name}</h3>
                      <p className="text-gray-600">{institution.location}</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                      {institution.type}
                    </span>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Courses</p>
                      <p className="text-gray-900">{institution.courses.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fees Range</p>
                      <p className="text-gray-900">
                        {institution.feesRange.currency} {institution.feesRange.min.toLocaleString()} - {institution.feesRange.max.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="text-gray-900">{institution.totalYears} years</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Website</p>
                      <a 
                        href={institution.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {institution.website}
                      </a>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-gray-500 text-sm">Facilities</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {institution.facilities.map((facility, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {message && (
        <div className={`mt-4 p-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ExcelUpload; 