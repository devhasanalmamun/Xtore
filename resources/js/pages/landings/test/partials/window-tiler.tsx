import { useState } from 'react'

interface IWindowTiler {
  id: number
  window_color: string
  heading_color: string
}

export default function WindowTiler() {
  const window_color = useGenerateRandomRGB()
  const heading_color = useGenerateRandomRGB()

  const [windows, setWindows] = useState<IWindowTiler[]>([])

  function addWindow() {
    const newWindow: IWindowTiler = { id: Date.now(), window_color, heading_color }
    setWindows((prev) => [...prev, newWindow])
  }

  function removeWindow(id: number) {
    setWindows((prev) => prev.filter((window) => window.id !== id))
  }

  return (
    <section className="h-[100vh] overflow-hidden p-2 text-white">
      {windows.length > 0 &&
        windows.map((window) => {
          return (
            <div key={window.id} className="h-60 w-80" style={{ backgroundColor: window.window_color }}>
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
