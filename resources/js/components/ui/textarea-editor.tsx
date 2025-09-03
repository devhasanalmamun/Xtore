import { BoldPlugin, ItalicPlugin, UnderlinePlugin } from '@platejs/basic-nodes/react'
import { Plate, usePlateEditor } from 'platejs/react'
import type { Value } from 'platejs'

import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button'
import { Editor, EditorContainer } from '@/components/editor/editor'
import { FixedToolbar } from '@/components/ui/fixed-toolbar'

const initialValue: Value = [
  {
    type: 'p',
    children: [
      { text: 'Style your ' },
      { text: 'product', bold: true },
      { text: ', ' },
      { text: 'description ', italic: true },
      { text: 'here', underline: true },
    ],
  },
]

export default function TextareaEditor() {
  const editor = usePlateEditor({
    plugins: [BoldPlugin, ItalicPlugin, UnderlinePlugin],
    value: initialValue,
  })

  return (
    <Plate editor={editor}>
      <FixedToolbar className="justify-start gap-1">
        <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
          B
        </MarkToolbarButton>
        <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
          I
        </MarkToolbarButton>
        <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
          U
        </MarkToolbarButton>
      </FixedToolbar>

      <EditorContainer>
        <Editor />
      </EditorContainer>
    </Plate>
  )
}
