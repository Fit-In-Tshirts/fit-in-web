'use client'

import { Label } from '@/components/ui/label'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import userIcon from '../../icons/user.svg'
import Image from 'next/image'
import { JSX, useActionState, useEffect, useState } from 'react'
import { signupAction, SignupState } from './actions'
import tickIcon from '../../icons/correct.png'
import crossIcon from '../../icons/wrong.png'
import Link from 'next/link'
import password_lock from '../../icons/lock-close.svg'
import password_unlock from '../../icons/lock-open.svg'
import { Address } from '../../types/common'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { isValidEmail, isValidPhoneNumber } from '@/utils/validation'
import { Loader2Icon } from 'lucide-react'

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: Address;
  phoneNumber_mobile: string;
  phoneNumber_home: string;
}

const initialState: SignupState = {}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      houseNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      province: '',
      zipcode: ''
    },
    phoneNumber_mobile: '',
    phoneNumber_home: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(signupAction, initialState)

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }
    ));
  };

  const handleProvinceChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [fieldName]: value
      }
    }));
  };

  const SubmitButtonVisibility = () => {
    if(
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      isValidEmail(formData.email.trim()) &&
      formData.password.trim() !== '' &&
      formData.password.trim() == formData.confirmPassword.trim() &&
      formData.address.houseNumber.trim() !== '' &&
      formData.address.addressLine1.trim() !== '' &&
      formData.address.addressLine2.trim() !== '' &&
      formData.address.city.trim() !== '' &&
      formData.address.province.trim() !== '' &&
      formData.phoneNumber_mobile.trim() !== '' &&
      isValidPhoneNumber(formData.phoneNumber_mobile.trim())
    ) {
      return false;
    } else {
      return true;
    }
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    if (state.error) {
      toast.error(state.error)
    }
    if (state.success) {
      toast.success(state.success)
      setTimeout(() => {
        router.push('/home')
      }, 1500)
    }
  }, [state, router])

  useEffect(() => {
    console.log(formData);
  }, [formData])

  return (
    <div className='flex-col box-border py-10 bg-neutral-200 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4'>
      <Form action={formAction} className='flex flex-col justify-center items-center bg-white rounded-2xl shadow-2xl p-8 border border-gray-100'>
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
              autoComplete='name'
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
              autoComplete='family-name'
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
              autoComplete='email'
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
              autoComplete='new-password'
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

        <div className='flex flex-col gap-2 items-start justify-center mb-5 w-full'>
          <Label>Delivery Address *</Label>
          <div id='deliveryAddress' className='flex flex-col w-full gap-1'>
            <div className='flex flex-row justify-center items-center gap-1 w-full'>
              <p className='border rounded-md p-1 w-17 bg-neutral-50'>No.</p>
              <Input 
                type="text" 
                id="houseNumber" 
                name='houseNumber' 
                placeholder="235/2" 
                required
                value={formData.address.houseNumber}
                onChange={handleAddressChange}
                autoComplete='address-line1'
              />
            </div>
            <div className='flex flex-row justify-center items-center gap-1 w-full '>
              <p className='border rounded-md p-1 w-17 bg-neutral-50'>Line 1</p>
              <Input 
                type="text" 
                id="addressLine1" 
                name='addressLine1' 
                placeholder="York Street" 
                required
                value={formData.address.addressLine1}
                onChange={handleAddressChange}
                autoComplete='shipping address-line2'
              />
            </div>
            <div className='flex flex-row justify-center items-center gap-1 w-full'>
              <p className='border rounded-md p-1 w-17 bg-neutral-50'>Line 2</p>
              <Input 
                type="text" 
                id="addressLine2" 
                name='addressLine2' 
                placeholder="Colombo 1" 
                required
                value={formData.address.addressLine2}
                onChange={handleAddressChange}
                autoComplete='shipping address-line3'
              />
            </div>

            <div className='w-full flex flex-row justify-center items-center my-1'>
              <hr className='w-sm'/>
            </div>
            
            <div className='flex flex-row justify-center items-center gap-1 w-full'>
              <p className='border rounded-md p-1 w-35 bg-neutral-50'>Nearest City</p>
              <Input 
                type="text" 
                id="city" 
                name='city' 
                placeholder="Maharagama" 
                required
                value={formData.address.city}
                onChange={handleAddressChange}
              />
            </div>
            <div className='flex flex-row justify-center items-center gap-1 w-full'>
              <p className='border rounded-md p-1 w-35 bg-neutral-50'>Province</p>
              <Select 
                onValueChange={(value:any) => handleProvinceChange('province', value)} 
                required value={formData.address.province} name='province'>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Province" id='province'/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="central">Central</SelectItem>
                    <SelectItem value="eastern">Eastern</SelectItem>
                    <SelectItem value="north central">North Central</SelectItem>
                    <SelectItem value="north western">North Western</SelectItem>
                    <SelectItem value="northern">Northern</SelectItem>
                    <SelectItem value="sabaragamuwa">Sabaragamuwa</SelectItem>
                    <SelectItem value="southern">Southern</SelectItem>
                    <SelectItem value="uva">Uva</SelectItem>
                    <SelectItem value="western">Western</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-row justify-center items-center gap-1 w-full'>
              <p className='border rounded-md p-1 w-35 bg-neutral-50'>Zip Code</p>
              <Input 
                type="text" 
                id="zipcode" 
                name='zipcode' 
                placeholder="10200" 
                required
                value={formData.address.zipcode}
                onChange={handleAddressChange}
                autoComplete='postal-code'
              />
            </div>
          </div>
        </div>

        <div className='flex flex-row w-full mb-5 justify-between'>
          <div className='flex flex-col gap-2 items-start justify-center'>
            <Label htmlFor="phoneNumber_mobile">Phone Number(mobile) *</Label>
            <div className='flex flex-row justify-center items-center gap-1'>
              <p className='border rounded-md p-1 bg-neutral-50'>+94</p>
              <div className='relative w-full max-w-md'>
                <Input 
                  type="tel" 
                  id="phoneNumber_mobile" 
                  name='phoneNumber_mobile' 
                  placeholder="77 888 999" 
                  value={ formData.phoneNumber_mobile}
                  onChange={handleChange}
                  className='w-42'
                  maxLength={9}
                />
                {(formData.phoneNumber_mobile.trim() == '') ? null :
                  isValidPhoneNumber(formData.phoneNumber_mobile) ? (
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
          </div>
          <div className='flex flex-col gap-2 items-start justify-center'>
            <Label htmlFor="phoneNumber_home">Phone Number(home)</Label>
            <div className='flex flex-row justify-center items-center gap-1'>
              <p className='border p-1 rounded-md bg-neutral-50'>+94</p>
              <div className='relative w-full max-w-md'>
                <Input 
                  type="tel" 
                  id="phoneNumber_home" 
                  name='phoneNumber_home' 
                  placeholder="77 888 999" 
                  value={formData.phoneNumber_home}
                  onChange={handleChange}
                  className='w-42'
                  maxLength={9}
                />
                {(formData.phoneNumber_home.trim() == '') ? null :
                  isValidPhoneNumber(formData.phoneNumber_home) ? (
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
          </div>
        </div>

        <Button type='submit' variant={'default'} disabled={SubmitButtonVisibility() || isPending} className='w-sm mb-5'>
          {isPending ? 
            <><Loader2Icon className="animate-spin" />Please wait</> : 'Sign Up'}
        </Button>
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