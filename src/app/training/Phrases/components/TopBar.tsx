import { ButtonWithTooltip } from '@/app/play/components/TopBar'
import { VolumeSliderButton } from '@/features/controls'
import { ArrowLeft, Midi } from '@/icons'
import { isMobile } from '@/utils'
import Link from 'next/link'
import React, { MouseEvent } from 'react'

type TopBarProps = {
  onClickMidi: (e: MouseEvent<any>) => void
}

export default function TopBar({ onClickMidi }: TopBarProps) {
  return (
    <div className="flex h-[50px] min-h-[50px] w-full items-center gap-4 bg-[#292929] px-8 text-2xl text-white transition">
      <ButtonWithTooltip tooltip="Back">
        <Link href="/">
          <ArrowLeft size={24} />
        </Link>
      </ButtonWithTooltip>
      <span className="absolute left-1/2 -translate-x-1/2">Mizatra</span>
      <ButtonWithTooltip tooltip="Choose a MIDI device" className="ml-auto" onClick={onClickMidi}>
        <Midi size={24} />
      </ButtonWithTooltip>
      {!isMobile() && <VolumeSliderButton />}
    </div>
  )
}
