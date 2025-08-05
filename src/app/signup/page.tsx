'use client'

import { Label } from '@/components/ui/label'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import userIcon from '../../icons/user.svg'
import Image from 'next/image'
import { JSX, useEffect, useState } from 'react'
import { signup } from './actions'

import tickIcon from '../../icons/correct.png'
import crossIcon from '../../icons/wrong.png'
import Link from 'next/link'
import password_lock from '../../icons/lock-close.svg'
import password_unlock from '../../icons/lock-open.svg'
import { Passero_One } from 'next/font/google'

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  deliveryAddress: string;
  phoneNumber_mobile: string;
  phoneNumber_home: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    deliveryAddress: '',
    phoneNumber_mobile: '',
    phoneNumber_home: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    return emailRegex.test(email);
  };

  const SubmitVisibility = () => {
    if(
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.password.trim() == formData.confirmPassword.trim() &&
      formData.deliveryAddress.trim() !== '' &&
      formData.phoneNumber_mobile.trim() !== ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const getPasswordStrength = (password: string): JSX.Element => {
    if (!password) return <span></span>
    if (password.length < 6) return <span className='text-red-500'>Weak</span>;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const lengthStrong = password.length >= 10;

    const score = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

    if (score >= 3 && lengthStrong) {
      return <span className='text-green-500'>Strong</span>;
    } else if (score >= 2) {
      return <span className='text-yellow-500'>Medium</span>;
    } else {
      return <span className='text-red-500'>Weak</span>;
    }
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  return (
    <div className='flex-col box-border py-10 bg-neutral-200 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4'>
      <Form action={''} className='flex flex-col justify-center items-center bg-white rounded-2xl shadow-2xl p-8 border border-gray-100'>
        <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-2'>
        <Image src={userIcon} width={40} alt={'User Lock'} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-5">Create Account</h1>

        <div className='flex flex-row w-full justify-between gap-1'>
          <div className='flex flex-col gap-2 items-start justify-center mb-5 w-auto grow-1'>
            <Label htmlFor="firstName">First Name *</Label>
            <Input 
              type="text" 
              id="firstName" 
              name='firstName' 
              placeholder="John" 
              required 
              value={formData.firstName}
              onChange={handleChange} 
            />
          </div>
          <div className='flex flex-col gap-2 items-start justify-center mb-5 w-auto grow-1'>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input 
              type="text" 
              id="lastName" 
              name='lastName' 
              placeholder="Doe" 
              required 
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='flex flex-col gap-2 items-start justify-center mb-5'>
          <Label htmlFor="email">Email *</Label>
          <div className='relative w-full max-w-md'>
            <Input 
              type="email" 
              id="email" 
              name='email' 
              placeholder="johndoe@example.com" 
              required 
              value={formData.email}
              onChange={handleChange}
              className='w-md'
            />
            {(formData.email.trim() == '') ? null :
              isValidEmail(formData.email) ? (
                <Image
                  src={tickIcon}
                  alt="tick"
                  width={17}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              ) : (
                <Image
                  src={crossIcon}
                  alt="cross"
                  width={17}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              )
            }
          </div>
        </div>
        
        <div className='flex flex-col gap-2 items-start justify-center mb-5'>
          <Label htmlFor="password">Password * {getPasswordStrength(formData.password)} </Label>
          <div className='relative w-full max-w-md'>
            <Input 
              type={showPassword ? 'text' : 'password'} 
              id="password" 
              name='password' 
              placeholder="Password" 
              required
              value={formData.password}
              onChange={handleChange}
              className='w-md'
            />
          <Image 
            onClick={togglePasswordVisibility} 
            src={ showPassword ? password_unlock : password_lock} 
            width={20} 
            alt={'show password'}
            className='absolute right-3 top-1/2 transform -translate-y-1/2'
          />
          </div>
        </div>

        <div className='flex flex-col gap-2 items-start justify-center mb-5'>
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className='relative w-full max-w-md'>
            <Input 
            type="password" 
            id="confirmPassword" 
            name='confirmPassword' 
            placeholder="Re-type password" 
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className='w-md pr-10'
          />
          {formData.password.trim() === '' ? null : (
            formData.password === formData.confirmPassword ? (
              <Image
                src={tickIcon}
                alt="tick"
                width={17}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            ) : (
              <Image
                src={crossIcon}
                alt="cross"
                width={17}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              />
            )
          )}
          </div>
        </div>

        <div className='flex flex-col gap-2 items-start justify-center mb-5'>
          <Label htmlFor="deliveryAddress">Delivery Address *</Label>
          <Input 
            type="text" 
            id="deliveryAddress" 
            name='deliveryAddress' 
            placeholder="No. 235, York Street, Colombo 5" 
            required
            value={formData.deliveryAddress}
            onChange={handleChange}
            className='w-md'
          />
        </div>

        <div className='flex flex-row w-full justify-between gap-1'>
          <div className='flex flex-col gap-2 items-start justify-center mb-5 w-auto grow-1'>
            <Label htmlFor="phoneNumber_mobile">Phone Number(mobile) *</Label>
            <div className='flex flex-row justify-center items-center gap-0'>
              <p className='border rounded-md p-1'>+94</p>
              <Input 
                type="text" 
                id="phoneNumber_mobile" 
                name='phoneNumber_mobile' 
                placeholder="77 895 668" 
                required
                value={ formData.phoneNumber_mobile}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 items-start justify-center mb-5 w-auto grow-1'>
            <Label htmlFor="phoneNumber_home">Phone Number(home)</Label>
            <div className='flex flex-row justify-center items-center gap-0'>
              <p className='border p-1 rounded-md'>+94</p>
              <Input 
                type="text" 
                id="phoneNumber_home" 
                name='phoneNumber_home' 
                placeholder="77 895 668" 
                required
                value={ formData.phoneNumber_home}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <Button formAction={signup} variant={'default'} disabled={SubmitVisibility()} className='w-sm mb-5'>Sign up</Button>
        <p className='text-center text-sm text-gray-600'>
          Already have an account? 
          <Link 
            href={'/signin'}
            className='text-blue-600 hover:text-blue-700 font-medium'
          > Sign in here</Link>
        </p>
      </Form>
    </div>
  )
}