import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Solfeo: Phrases',
}

export default function Layout({ children }: PropsWithChildren<{}>) {
  return children
}
