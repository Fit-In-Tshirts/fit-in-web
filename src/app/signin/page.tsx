'use client'

import { Label } from '@/components/ui/label'
import { signin } from './actions'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import userLockIcon from '../../../public/user-lock.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData])

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      <Form action={''} className='border border-neutral-500 rounded-4xl p-5 flex flex-col justify-center items-center'>
        <div className='border border-neutral-400 p-4 rounded-full'>
        <Image src={userLockIcon} width={40} alt={'User Lock'} />
        </div>

        <div className='flex flex-col gap-2 items-start justify-center mb-5'>
          <Label htmlFor="email">Email</Label>
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
        </div>
        
        <div className='flex flex-col gap-2 items-start justify-center mb-5'>
          <Label htmlFor="password">Password</Label>
          <Input 
            type="password" 
            id="password" 
            name='password' 
            placeholder="Password" 
            required
            value={formData.password}
            onChange={handleChange}
            className='w-md'
            />
        </div>

        <Button formAction={signin} variant={'default'}>Sign in</Button>

      </Form>
    </div>
  )
}