import { ClipboardListIcon, XIcon, ZoomInIcon } from 'lucide-react'
import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

interface IProps {
  subject: string
  description: string
  attachments: string[]
}

export default function SupportTicketShowInformation(props: IProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ClipboardListIcon className="h-4 w-4" />
          Ticket Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Subject</p>
          <p className="mt-1 font-medium">{props.subject}</p>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Description</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/80">{props.description}</p>
        </div>

        <Separator />

        {props.attachments.length > 0 && (
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Attachments</p>
            <div className="mt-1.5 flex gap-2 overflow-x-auto">
              {props.attachments.map((attachment, i) => (
                <div
                  key={i}
                  onClick={() => setPreviewImage(attachment)}
                  className="group relative h-24 w-48 cursor-pointer overflow-hidden rounded-md"
                >
                  <img
                    src={attachment}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ZoomInIcon className="size-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {previewImage && <PreviewImage image={previewImage} setPreviewImage={setPreviewImage} />}
    </Card>
  )
}

interface IPreviewImageProps {
  image: string
  setPreviewImage: (image: string | null) => void
}

function PreviewImage(props: IPreviewImageProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={() => props.setPreviewImage(null)}
    >
      <Button className="absolute top-6 right-6 h-10 w-10 rounded-full" onClick={() => props.setPreviewImage(null)}>
        <XIcon className="size-5" />
      </Button>
      <img
        src={props.image}
        className="max-h-[80vh] max-w-[80vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
