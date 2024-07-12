import { useSong } from '@/features/data'
import { usePlayer } from '@/features/player'
import { getHandSettings, SongVisualizer } from '@/features/SongVisualization'
import { SongSource } from '@/types'
import { useEffect } from 'react'
import { getDefaultSongSettings } from '../SongVisualization/utils'

interface SongPreviewProps {
  songBytes?: ArrayBuffer
  songId: string
  source: SongSource
}

function SongPreview({ songId, source }: SongPreviewProps) {
  const { data: song, error } = useSong(songId, source)
  const player = usePlayer()

  useEffect(() => {
    if (!song) {
      return
    }
    player.setSong(song, getDefaultSongSettings(song))
  }, [song, player])

  const songConfig = getDefaultSongSettings(song)
  return (
    <SongVisualizer
      song={song}
      config={songConfig}
      getTime={() => player.getTime()}
      hand="both"
      handSettings={getHandSettings(songConfig)}
    />
  )
}

export type { SongPreviewProps }
export { SongPreview }
