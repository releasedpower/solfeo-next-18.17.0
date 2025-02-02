'use client'

import { Modal, Sizer } from '@/components'
import { useEventListener, usePlayerState } from '@/hooks'
import { SongMetadata } from '@/types'
import Link from 'next/link'
import * as React from 'react'
import { SongScrubBar } from '../controls'
import { usePlayer } from '../player'
import PreviewIcon from './PreviewIcon'
import { SongPreview } from './SongPreview'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/navigation'

type ModalProps = {
  show: boolean
  onClose: () => void
  songMeta?: SongMetadata
}
export default function SongPreviewModal({
  show = true,
  onClose = () => {},
  songMeta = undefined,
}: ModalProps) {
  const { title, artist, id, source } = songMeta ?? {}
  const player = usePlayer()
  const playerState = usePlayerState()

  const cookies = new Cookies()
  const router = useRouter()
  const isLoggedIn = !!cookies.get('token');

  useEventListener<KeyboardEvent>('keydown', (event) => {
    if (!show) return

    if (event.key === ' ') {
      event.preventDefault()
      player.toggle()
    }
  })

  function handleClose() {
    player.stop()
    return onClose()
  }

  if (!show || !id || !source) {
    return null
  }

  return (
    <Modal show={show && !!id} onClose={handleClose} className="min-w-[min(100%,600px)]">
      <div className="flex flex-col gap-3 p-8">
        <div className="flex w-full flex-col whitespace-nowrap">
          <span className="text-2xl font-semibold">{title}</span>
          <span className="overflow-hidden text-base text-gray-500">{artist}</span>
        </div>
        <div className="flex flex-grow flex-col overflow-hidden rounded-md">
          <div className="relative">
            <div className="pointer-events-none absolute z-20 h-full w-full rounded-md" />
            <SongScrubBar height={30} />
          </div>
          <div
            style={{
              position: 'relative',
              backgroundColor: '#2e2e2e',
              height: 340, // TODO, do this less hacky
              minHeight: 340, // without height and min-height set, causes canvas re-paint on adjust instruments open
              width: '100%',
              overflow: 'hidden',
            }}
            onClick={() => player.toggle()}
          >
            <PreviewIcon
              isLoading={!playerState.canPlay}
              isPlaying={playerState.playing}
              onPlay={(e) => {
                if (isLoggedIn) {
                e.stopPropagation()
                player.play()
                }
                else router.push('/login')
              }}
            />
            {id && source && <SongPreview songId={id} source={source} />}
          </div>
          <Sizer height={16} />
          <Link
            href={isLoggedIn ? `/play?id=${id}&source=${source}` : '/login'}
            className="flex h-10 w-full items-center justify-center rounded-md border-none bg-purple-primary text-xl text-white transition hover:bg-purple-hover"
          >
            Play Now
          </Link>
        </div>
      </div>
    </Modal>
  )
}
