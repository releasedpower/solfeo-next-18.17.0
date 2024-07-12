import { cn } from '@/utils'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import Sizer from './Sizer'

function FooterHeader({ children }: any) {
  return (
    <h3 className="fontleading-6 flex gap-2 whitespace-nowrap text-base font-medium text-foreground">
      {children}
    </h3>
  )
}

function FooterCol({ children, className }: any) {
  return <div className={cn('flex h-full shrink-0 flex-col gap-4', className)}>{children}</div>
}

function FooterLink({ href, children }: any) {
  return (
    <Link
      className="whitespace-nowrap font-light text-muted-foreground transition hover:text-foreground hover:underline hover:underline-offset-4"
      href={href}
    >
      {children}
    </Link>
  )
}
function MaxWidthWrapper(props: PropsWithChildren<{ as?: any; className?: string }>) {
  const className = (props.className ?? '') + ' max-w-screen-lg mx-auto px-8'
  const Component = props.as ?? 'div'
  return <Component className={className}>{props.children}</Component>
}

export function MarketingFooter() {
  return (
    <footer
      className="w-full border-t border-border bg-foreground/[0.02] dark:bg-foreground/[0.01]"
      aria-labelledby="footer-heading"
    >
      <Sizer height={24} />
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <MaxWidthWrapper className="mx-auto flex h-full max-w-prose flex-col items-center">
        <Sizer height={16} />
        <div className="grid auto-cols-max grid-cols-2 items-center gap-8 sm:gap-16 md:gap-32">
          <FooterCol>
            <FooterHeader>Solfeo</FooterHeader>
            <FooterLink href="/songs">Mianatra</FooterLink>
            <FooterLink href="/freeplay">Milalao</FooterLink>
            <FooterLink href="/about">Izahay</FooterLink>
          </FooterCol>
          <FooterCol>
            <FooterHeader>Rohy ivelany</FooterHeader>
            <FooterLink href="https://zaramozika.art">
              webradio
            </FooterLink>
          </FooterCol>
        </div>
        <Sizer height={32} />
        <span className="text-xs text-muted-foreground">
          Solfeo 2024
        </span>

        <Sizer height={24} />
      </MaxWidthWrapper>
    </footer>
  )
}
