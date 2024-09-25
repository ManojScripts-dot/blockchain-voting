"use client"
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';  
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';

const AdminLogin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8000/api/admin/login', {
          email: values.email,
          password: values.password,
        });

        // Assuming the token is returned in the response
        const token = response.data.token;

        // Store token in localStorage (or cookies)
        localStorage.setItem('adminToken', token);

        // Redirect to admin dashboard
        router.push('/admin/adminPanel/candidate-details');
      } catch (error: unknown) {
        // Type-checking AxiosError
        if (axios.isAxiosError(error)) {
          // Axios error handling
          setErrorMessage(error.response?.data?.message || 'Login failed');
        } else {
          // Generic error fallback
          setErrorMessage('An unexpected error occurred');
        }
      }
    },
  });

  return (
    <div>
      <Header/>
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border ${
              formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  </div>
    
  );
};

export default AdminLogin;
