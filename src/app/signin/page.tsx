'use client'

import { Label } from '@/components/ui/label'
import { signinAction, SigninState } from './actions'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import userIcon from '../../icons/user.svg'
import Image from 'next/image'
import { useActionState, useEffect, useState } from 'react'
import tickIcon from '../../icons/correct.png'
import crossIcon from '../../icons/wrong.png'
import password_lock from '../../icons/lock-close.svg'
import password_unlock from '../../icons/lock-open.svg'
import Link from 'next/link'
import { isValidEmail } from '@/common/methods'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader2Icon } from 'lucide-react'

const initialState: SigninState = {}

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(signinAction, initialState);

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const SubmitVisibility = () => {
    if(
      formData.email.trim() !== '' &&
      isValidEmail(formData.email.trim()) &&
      formData.password.trim() !== ''
    ) {
      return false;
    } else {
      return true;
    }
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
        <h1 className="text-2xl font-bold text-gray-900 mb-5">Signin to Account</h1>

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
          <Label htmlFor="password">Password *</Label>
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

        <Button type='submit' variant={'default'} disabled={SubmitVisibility()} className='w-sm mb-5'>
           {isPending ? 
            <><Loader2Icon className="animate-spin" />Please wait</> : 'Sign in'}
        </Button>
        <p className='text-center text-sm text-gray-600'>
          Don't have an account? 
          <Link 
            href={'/signup'}
            className='text-blue-600 hover:text-blue-700 font-medium'
          > Sign up here</Link>
        </p>
      </Form>
    </div>
  )
}