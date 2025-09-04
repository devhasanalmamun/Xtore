import { Plate, usePlateEditor } from 'platejs/react'
import type { Value } from 'platejs'
import { useState } from 'react'

import { Editor, EditorContainer } from '@/components/editor/ui/editor'
import { EditorKit } from '@/components/editor/editor-kit'
import { FixedToolbar } from './toolbar/fixed-toolbar'
import { FixedToolbarButtons } from './toolbar/fixed-toolbar-buttons'

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

export default function PlateEditor() {
  const [value, setValue] = useState(initialValue)
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: value,
  })

  return (
    <Plate editor={editor} onChange={(e) => setValue(e.value)}>
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>

      <EditorContainer>
        <Editor className="h-[550px]" />
      </EditorContainer>
    </Plate>
  )
}
