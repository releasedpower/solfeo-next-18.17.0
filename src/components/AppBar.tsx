'use client'

import { Sizer } from '@/components'
import { GitHub, Logo, Menu } from '@/icons'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { Dropdown } from './Dropdown'

type NavItem = { route: string; label: string }
const navItems: NavItem[] = [
  { route: '/songs', label: 'Mianatra hira' },
  { route: '/freeplay', label: 'Milalao' },
  // TODO: launch phrases.
  // { route: '/training/phrases', label: 'Training' },
  { route: '/about', label: 'Izahay' },
]

export default function AppBar() {
  const cookies = new Cookies()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = cookies.get('token')
    setIsLoggedIn(!!token) // Set isLoggedIn to true if token exists
  }, [])

  const handleLogout = () => {
    cookies.remove('token');
    router.push('/login');
};

  return (
    <div
      className="relative flex h-[50px] min-h-[50px] flex-col justify-center bg-purple-dark"
      style={{
        // This is a hack that accounts for the sometimes present scrollbar.
        // The 100vw includes scrollbar and the 100% does not, so we padLeft the difference.
        // Credit goes to: https://aykevl.nl/2014/09/fix-jumping-scrollbar
        paddingLeft: 'calc(100vw - 100%)',
      }}
    >
      <div className="mx-auto flex w-full items-center justify-center pl-6 md:max-w-screen-lg">
        <div
          className="absolute left-5 right-5 top-1/2 z-10 -translate-y-1/2 md:hidden"
          style={{ transform: 'translateY(-50%)' }}
        >
          <SmallWindowNav />
        </div>
        <NavLink href={'/'} className="flex items-baseline text-white hover:text-purple-hover">
          <Logo height={24} width={24} className="relative top-[3px]" />
          <Sizer width={8} />
          <span className="text-2xl font-extralight"> SOLFEO</span>
        </NavLink>
        <div className="hidden flex-grow justify-evenly gap-6 whitespace-nowrap pl-16 align-baseline md:flex">
          {navItems.map((nav) => {
            return (
              <NavLink
                className="text-white hover:text-purple-hover"
                href={nav.route}
                key={nav.label}
                label={nav.label}
              />
            )
          })}
        </div>
        {isLoggedIn ? (
          <button
            className="mr-4 mt-4 block text-white hover:text-purple-hover lg:mt-0 lg:inline-block"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <NavLink
            className="mr-4 mt-4 block text-white hover:text-purple-hover lg:mt-0 lg:inline-block"
            href="/login"
            label="Login"
          />
        )}
      </div>
    </div>
  )
}

function SmallWindowNav() {
  return (
    <Dropdown target={<Menu height={24} width={24} className="block text-white" />}>
      <div className="flex flex-col bg-white">
        {navItems.map((nav, i) => {
          return (
            <div className="items-enter flex flex-col gap-4 px-3 py-3" key={i}>
              <NavLink
                href={nav.route}
                className={clsx(
                  'inline-block w-fit cursor-pointer px-6 text-2xl text-purple-dark transition hover:text-purple-hover',
                )}
                label={nav.label}
              />
            </div>
          )
        })}
      </div>
    </Dropdown>
  )
}

function NavLink(
  props: PropsWithChildren<{ href: string; className?: string; style?: any; label?: string }>,
) {
  const currentRoute = usePathname()
  return (
    <Link
      {...props}
      className={clsx(
        props.className,
        'transition',
        currentRoute === props.href && 'font-bold',
        props.label &&
          'after:invisible after:block after:h-0 after:overflow-hidden after:font-bold after:text-transparent after:content-[attr(label)]',
      )}
      data-label={props.label}
    >
      {props.label ?? props.children}
    </Link>
  )
}
