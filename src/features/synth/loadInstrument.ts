import { parseMidiJsSoundfont } from './utils'
import { SoundFont, InstrumentName } from './types'

export const soundfonts: { [key in InstrumentName]?: SoundFont } = {}
const downloading: { [key in InstrumentName]?: Promise<void> } = {}

export async function loadInstrument(instrument: InstrumentName) {
  // Already downloaded.
  if (soundfonts[instrument]) {
    return Promise.resolve()
  }
  // In-progress already.
  if (downloading[instrument]) {
    return downloading[instrument]
  }

  const sfFetch = fetch(`/soundfonts/FluidR3_GM/${instrument}-mp3.js`)

  let doneDownloadingRes: any
  downloading[instrument] = new Promise((res) => (doneDownloadingRes = res))
  try {
    let sf = await parseMidiJsSoundfont(await (await sfFetch).text())
    soundfonts[instrument] = sf
    delete downloading[instrument]
    doneDownloadingRes()
  } catch (err) {
    console.error(`Error fetching soundfont for: ${instrument}`, err)
  }
}
