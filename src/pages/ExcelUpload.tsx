import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

interface Institution {
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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
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
      {message && <div className="mt-4 text-blue-700">{message}</div>}
    </div>
  );
};

export default ExcelUpload; 