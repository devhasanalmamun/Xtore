import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface IProps {
  ticket_status_options: string[]
}

export default function AdminSupportTicketFilters(props: IProps) {
  function handleTicketStatusChange(status: string) {
    console.log(status)

    // TODO: Implement the logic to filter the tickets by status
  }

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={handleTicketStatusChange}>
        <SelectTrigger className="w-[160px] capitalize">
          <SelectValue placeholder="Ticket status" />
        </SelectTrigger>
        <SelectContent>
          {props.ticket_status_options.map((option) => (
            <SelectItem key={option} value={option} className="capitalize">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={handleTicketStatusChange}>
        <SelectTrigger className="w-[160px] capitalize">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest Tickets</SelectItem>
          <SelectItem value="oldest">Oldest Tickets</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
