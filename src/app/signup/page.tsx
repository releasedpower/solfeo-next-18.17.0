'use client'

import { AppBar, MarketingFooter, Sizer } from '@/components'
import axios from 'axios'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const Signup = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
const router = useRouter()
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(false)

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else setButtonDisabled(true)
  })

  const onSignup = async () => {
    try {
      const response = await axios.post(`${url}/users-front/`, user)
      console.log(response.data)
      router.push('/login')
    } catch (error: any) {
      console.error('Signup error:', error.response.data);
      setError(error.response.data.error);
    } finally {
    }
  }

  return (
    <>
      <div className="flex h-screen w-full flex-col bg-purple-lightest">
        <AppBar />
        <div className="mx-auto flex w-full max-w-screen-lg flex-grow flex-col p-6">
          <h2 className="text-3xl">Hisoratra ho mpikambana</h2>
          <Sizer height={8} />
          <h3 className="text-base"> Become a member of SOLFEO</h3>
          <Sizer height={24} />
          <div className="flex gap-2">
            <label htmlFor="username">Username</label>
            <input
              className="p-4"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder={'Type your username'}
            />
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="p-4"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder={'Type your email'}
            />
            <input
              className="p-4"
              type='password'
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder={'Type your password'}
            />
            <button
              className={clsx(
                'hidden flex-nowrap whitespace-nowrap sm:flex',
                'items-center gap-1 rounded-md px-4 py-2',
                'bg-purple-dark text-white transition hover:bg-purple-hover',
              )}
              onClick={onSignup}
            >
              <span>{buttonDisabled ? 'Fill in' : 'Sign up'}</span>
            </button>
          </div>
          <h6 style={{color: 'red'}}> {error}</h6>
          <Link href="/login">Visit the login page</Link>
        </div>
        <Sizer height={32} />
      </div>
      <MarketingFooter />
    </>
  )
}

export default Signup
