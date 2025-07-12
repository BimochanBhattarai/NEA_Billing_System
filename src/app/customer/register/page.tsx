
'use client';
import React, { useState } from 'react';
import FormInput from '@/components/FormInput';

const CustomerRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    mobileNo: '',
    citizenshipNo: '',
    dob: '',
    demandType: '',
    nearestBranch: '',
  });

  const [citizenshipDoc, setCitizenshipDoc] = useState<File | null>(null);
  const [propertyDoc, setPropertyDoc] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form:', formData, citizenshipDoc, propertyDoc);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-xl w-full p-8 rounded-xl shadow-lg bg-gray-800">
        <h1 className="text-3xl font-bold mb-6">Customer Registration</h1>
        <form onSubmit={handleSubmit}>
          <FormInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
          <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} />
          <FormInput label="Mobile No." name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
          <FormInput label="Citizenship No." name="citizenshipNo" value={formData.citizenshipNo} onChange={handleChange} />
          <FormInput label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
          <FormInput label="Demand Type" name="demandType" value={formData.demandType} onChange={handleChange} />
          <FormInput label="Nearest Branch" name="nearestBranch" value={formData.nearestBranch} onChange={handleChange} />

          <div className="mb-4">
            <label className="block font-medium mb-1 text-white">Citizenship Document</label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleFileChange(e, setCitizenshipDoc)}
              className="block w-full text-white bg-gray-700 border border-gray-600 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1 text-white">Property Document</label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) => handleFileChange(e, setPropertyDoc)}
              className="block w-full text-white bg-gray-700 border border-gray-600 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegistrationForm;