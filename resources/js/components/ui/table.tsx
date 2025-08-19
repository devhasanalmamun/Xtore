import React from 'react'

interface TableProps extends React.ComponentProps<'table'> {
  className?: string
}

export default function Table({ className, ...props }: TableProps) {
  return <div>table</div>
}
