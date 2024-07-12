import { AppBar, MarketingFooter, Sizer } from '@/components'
import Link from 'next/link'
import React from 'react'
import { FeaturedSongsPreview } from './home/FeaturedSongsPreview'

export default function Home() {
  const overlappingHeight = 250
  return (
    <div className="relative flex min-h-[800px,100vh] w-full flex-col text-white">
        <AppBar />
        <div className="flex flex-col items-center bg-purple-primary p-8 text-center">
          <h1 className="text-reponsive2Xl font-bold">Mahazoa tsirony mianatra mozika!</h1>
          <Sizer height={8} />
          <h3 className="text-reponsiveXl">
            Atsatoy ny clavier usb, dia raikitra!
          </h3>
          <Sizer height={overlappingHeight} />
        </div>
        <FeaturedSongsPreview marginTop={-overlappingHeight} />
        <div className="mt-auto flex min-h-[200px] flex-col items-center gap-6 bg-background pt-[42px]">
          <h3 className="text-black" style={{ fontSize: 'clamp(1rem, 1rem + 1vw, 2rem)' }}>
            Manomboka mianatra
          </h3>
          <div
            className="grid w-full justify-center gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min-content, 150px))' }}
          >
            <Link href={'/songs'}> 
              <Button className="bg-purple-primary text-white hover:bg-purple-hover">
                Mianatra hira
              </Button>
            </Link>
            <Link href={'/freeplay'}>
              <Button className="border border-purple-primary bg-white text-purple-primary hover:bg-purple-light">
                Milalao naoty
              </Button>
            </Link>
          </div>
        </div>
        <Sizer height={16} />
        <MarketingFooter />
      </div>
  )
}

function Button({
  children,
  style,
  className,
}: {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <button
      className={className}
      style={{
        transition: 'background-color 150ms',
        cursor: 'pointer',
        fontSize: 'clamp(0.875rem, 0.875rem + 0.5vw, 1.2rem)',
        padding: '10px 16px',
        borderRadius: 15,
        fontWeight: 700,
        minWidth: 'max-content',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
