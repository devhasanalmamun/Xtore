import { useRef, useState } from 'react'

interface IWindowTiler {
  id: number
  window_color: string
  heading_color: string
  offset_top: number
  offset_left: number
}

export default function WindowTiler() {
  const window_color = useGenerateRandomRGB()
  const heading_color = useGenerateRandomRGB()

  const [windows, setWindows] = useState<IWindowTiler[]>([])
  const viewportRef = useRef(null)

  // Global consts
  const window_tile_height = 240
  const window_tile_width = 320

  function addWindow() {
    if (!viewportRef.current) return

    const offset_left = Math.floor(Math.random() * (viewportRef.current.clientWidth - window_tile_width))
    const offset_top = Math.floor(Math.random() * (viewportRef.current.clientHeight - window_tile_height))

    const newWindow: IWindowTiler = { id: Date.now(), window_color, heading_color, offset_left, offset_top }
    setWindows((prev) => [...prev, newWindow])
  }

  function removeWindow(id: number) {
    setWindows((prev) => prev.filter((window) => window.id !== id))
  }

  return (
    <section ref={viewportRef} className="relative h-[100vh] overflow-hidden bg-slate-800 p-2 text-white">
      {windows.map((window) => {
        return (
          <div
            key={window.id}
            className="absolute"
            style={{
              height: window_tile_height,
              width: window_tile_width,
              backgroundColor: window.window_color,
              left: window.offset_left,
              top: window.offset_top,
            }}
          >
            <div
              className="flex items-center justify-between border-b p-2"
              style={{ backgroundColor: window.heading_color }}
            >
              <p>Window</p>
              <button className="cursor-pointer rounded text-xl font-bold" onClick={() => removeWindow(window.id)}>
                x
              </button>
            </div>
          </div>
        )
      })}

      <button
        className="absolute right-0 bottom-0 m-1 cursor-pointer rounded bg-blue-400 px-2 text-3xl text-gray-50 transition-all hover:bg-blue-500"
        onClick={addWindow}
      >
        +
      </button>
    </section>
  )
}

function useGenerateRandomRGB() {
  const red = Math.floor(Math.random() * 255)
  const green = Math.floor(Math.random() * 255)
  const blue = Math.floor(Math.random() * 255)

  return `rgb(${red}, ${green}, ${blue})`
}
