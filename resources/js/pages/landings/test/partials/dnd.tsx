import { PlusIcon, XIcon } from 'lucide-react'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'

type Card = {
  id: number
  title: string
}

type Columns = {
  [key: string]: Card[]
}

export default function DND() {
  const [columns, setColumns] = useState<Columns>({
    todo: [{ id: 1, title: 'card 1' }],
    doing: [{ id: 2, title: 'card 2' }],
    done: [{ id: 3, title: 'card 3' }],
  })

  const [draggingCardId, setDraggingCardId] = useState<number | null>(null)
  const [dragFromColName, setDragFromColName] = useState<string | null>(null)

  function handleDragStart(columnName: string, cardId: number) {
    setDragFromColName(columnName)
    setDraggingCardId(cardId)
  }

  function handleDrop(targetColName: string) {
    if (!draggingCardId || !dragFromColName) return
    if (dragFromColName === targetColName) return

    const cardToMove = columns[dragFromColName].find((card) => card.id === draggingCardId)
    if (!cardToMove) return

    setColumns((prev) => {
      return {
        ...prev,
        [dragFromColName]: prev[dragFromColName].filter((card) => card.id !== draggingCardId),
        [targetColName]: [...prev[targetColName], cardToMove],
      }
    })
  }

  return (
    <div className="mx-auto flex max-w-7xl justify-between gap-6">
      {Object.entries(columns).map(([columnName, cards]) => {
        return (
          <div key={columnName} className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between rounded-sm bg-white p-4 shadow">
              <p className="capitalize">{columnName}</p>
              <Dialog columnName={columnName} setColumns={setColumns} />
            </div>

            {/* Cards Holder */}
            <div
              className="flex flex-col space-y-3 rounded bg-gray-100 p-4"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(columnName)}
            >
              {cards.map((card) => {
                return (
                  <div
                    key={card.id}
                    className="rounded bg-gray-50 p-4 shadow"
                    draggable
                    onDragStart={() => handleDragStart(columnName, card.id)}
                  >
                    {card.title}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

interface IDialogProps {
  columnName: string
  setColumns: React.Dispatch<SetStateAction<Columns>>
}

function Dialog(props: IDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  function handleOpen(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation()
    setIsDialogOpen(true)
  }

  return (
    <div>
      <div className="cursor-pointer rounded bg-gray-100 p-2" onClick={handleOpen}>
        <PlusIcon />
      </div>
      {isDialogOpen && (
        <div className="absolute top-0 left-0 h-full w-full bg-slate-800 opacity-30 backdrop-blur-2xl"></div>
      )}
      {isDialogOpen && (
        <CreateFormDialog
          setIsDialogOpen={setIsDialogOpen}
          columnName={props.columnName}
          setColumns={props.setColumns}
        />
      )}
    </div>
  )
}

interface ICreateFormDialogProps {
  columnName: string
  setColumns: React.Dispatch<SetStateAction<Columns>>
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>
}

function CreateFormDialog(props: ICreateFormDialogProps) {
  const [title, setTitle] = useState<string>('')
  const formRef = useRef(null)

  function handleClickOutside(e: MouseEvent) {
    if (formRef.current && !formRef.current.contains(e.target)) {
      props.setIsDialogOpen(false)
    }
  }

  function handleCreate(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (!props.columnName || !title) return

    const newCard = { id: Date.now(), title }

    props.setColumns((prev) => ({ ...prev, [props.columnName]: [...prev[props.columnName], newCard] }))
    props.setIsDialogOpen(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={formRef} className="absolute top-1/2 left-1/2 mx-auto min-w-lg -translate-1/2 rounded bg-gray-100 p-4">
      <div className="mb-px flex justify-end">
        <XIcon
          className="w-fit cursor-pointer rounded bg-gray-50 p-2"
          size="36px"
          onClick={() => props.setIsDialogOpen(false)}
        />
      </div>
      <form className="space-y-4">
        <div className="space-y-1">
          <label className="block" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="w-full rounded border px-3 py-2"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="cursor-pointer rounded bg-blue-400 px-12 py-2 text-gray-50"
            onClick={handleCreate}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}
