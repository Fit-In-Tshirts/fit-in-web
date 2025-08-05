'use client'

import React from 'react';
import { Mail, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const EmailConfirmationPage = () => {
  // const handleResendEmail = () => {
  //   // Implement resend logic here
  //   console.log('Resending confirmation email to:', email);
  // };

  // const handleBackToLogin = () => {
  //   // Navigate back to login page - replace with your actual route
  //   if (typeof window !== 'undefined') {
  //     window.location.href = '/signup';
  //   }
  // };

  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 text-center">
          {/* Email Icon */}
          <div className="relative mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4 relative">
              <Mail className="w-10 h-10 text-yellow-600" />
              {/* @ Symbol */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">@</span>
              </div>
            </div>
            {/* Success checkmark */}
            <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Check Your Email
          </h1>

          {/* Description */}
          <div className="text-gray-600 mb-6 space-y-2">
            <p>
              We've sent a confirmation email to:
            </p>
            <div className="bg-gray-50 rounded-lg p-3 border">
              <p className="font-medium text-gray-900 break-all">
                { email || 'your email address'}
              </p>
            </div>
            <p className="text-sm">
              Please check your inbox and click the confirmation link to verify your account.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-blue-900 mb-2">What to do next:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Check your inbox for our confirmation email</li>
              <li>• Don't forget to check your spam/junk folder</li>
              <li>• Click the confirmation link in the email</li>
              <li>• Return here to sign in to your account</li>
            </ul>
          </div>

          {/* <div className="space-y-3">
            
            <Button
              
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <RefreshCw className="w-4 h-4" />
              Resend Confirmation Email
            </Button>

           
            <Button
              
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Button>
          </div> */}

          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Didn't receive the email? Check your spam folder. 
            </p>
          </div>

          {/* <div className="mt-4">
            <p className="text-xs text-gray-500">
              Still having trouble?{' '}
              <a href="/support" className="text-blue-600 hover:text-blue-700 underline">
                Contact Support
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationPage;