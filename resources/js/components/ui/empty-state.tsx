import React from 'react'

interface IProps {
  title?: string
  description?: string
}

export default function EmptyState(props: IProps) {
  return (
    <div>
      <div className="flex h-[300px] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-500">{props.title || 'No data available'}</h1>
          <p className="text-gray-400">{props.description || 'No data available for this section'}</p>
        </div>
      </div>
    </div>
  )
}
