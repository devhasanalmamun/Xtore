interface IProps {
  url: string
  name: string
}

export default function CardCategory(props: IProps) {
  return (
    <div className="cursor-pointer overflow-hidden rounded bg-gray-50 px-2.5 py-2 shadow-xs hover:shadow-sm">
      <img className="h-20 w-full object-cover" src="" alt={props.name} />
      <h3 className="mt-1.5 text-sm font-semibold">
        {props.name.length >= 16 ? props.name.slice(0, 14) + ' ...' : props.name}
      </h3>
    </div>
  )
}
