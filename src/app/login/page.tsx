'use client'
import { AppBar, MarketingFooter, Sizer } from '@/components'
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { encryptData, decryptData } from '../../utils/stringEncryption'
import { Cookies } from 'react-cookie';

const LoginPage = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
  const router = useRouter();
    const [user, setUser] = React.useState({
      username: '',
      password: '',
    })
    const [error, setError] = React.useState('');
  
    const onLogin = async () => {
      try {
        const response = await axios.post(`${url}/users-front/login`, user)
        const tokenExpiration = response.data.result.userToken.expiresAt;
        const token = response.data.result.userToken.token;

        const cookies = new Cookies();
        cookies.set('token', token, {
          expires: new Date(tokenExpiration),
          path: '/', // Adjust path as needed
          sameSite: 'strict',
        })
      window.location.reload();
      } catch (error: any) {
        setError(error.response.data.error);
      } 
    }

  return (
    <>
      <div className="flex h-screen w-full flex-col bg-purple-lightest">
        <AppBar />
        <div className="mx-auto flex w-full max-w-screen-lg flex-grow flex-col p-6">
          <h2 className="text-3xl">Hiditra</h2>
          <Sizer height={8} />
          <h3 className="text-base">Login to continue</h3>
          <Sizer height={24} />
          <div className="flex gap-4">
            <input 
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder={'Username'} />
            <input 
              type='password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder={'Password'} />
            <button
              onClick={onLogin}
              className={clsx(
                'hidden flex-nowrap whitespace-nowrap sm:flex',
                'items-center gap-1 rounded-md px-4 py-2',
                'bg-purple-dark text-white transition hover:bg-purple-hover',
              )}
            >
              <span>Login</span>
            </button>
          </div>
        <h6 style={{color: 'red'}}> {error}</h6>
        <Link href="/signup">No account? Signup</Link>
        </div>
        <Sizer height={32} />
      </div>
      <MarketingFooter />
    </>
  )
}

export default LoginPage