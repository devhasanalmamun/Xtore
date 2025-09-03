import {
  BlockquotePlugin,
  BoldPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react'
import { Plate, usePlateEditor } from 'platejs/react'
import type { Value } from 'platejs'

import { H1Element, H2Element, H3Element } from '@/components/ui/heading-node'
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button'
import { Editor, EditorContainer } from '@/components/editor/editor'
import { BlockquoteElement } from '@/components/ui/blockquote-node'
import { FixedToolbar } from '@/components/ui/fixed-toolbar'
import { ToolbarButton } from '@/components/ui/toolbar'
import { useState } from 'react'

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
  const [value, setValue] = useState(initialValue)
  const editor = usePlateEditor({
    plugins: [
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      H1Plugin.withComponent(H1Element),
      H2Plugin.withComponent(H2Element),
      H3Plugin.withComponent(H3Element),
      BlockquotePlugin.withComponent(BlockquoteElement),
    ],
    value: value,
  })

  return (
    <Plate editor={editor} onChange={(e) => setValue(e.value)}>
      <FixedToolbar className="justify-start gap-1">
        <ToolbarButton onClick={() => editor.tf.h1.toggle()}>H1</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.h2.toggle()}>H2</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.h3.toggle()}>H3</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.blockquote.toggle()}>Quote</ToolbarButton>
        <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
          B
        </MarkToolbarButton>
        <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
          I
        </MarkToolbarButton>
        <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
          U
        </MarkToolbarButton>

        <div className="flex-1" />
        <ToolbarButton className="px-2" onClick={() => editor.tf.setValue(initialValue)}>
          Reset
        </ToolbarButton>
      </FixedToolbar>

      <EditorContainer>
        <Editor />
      </EditorContainer>
    </Plate>
  )
}
