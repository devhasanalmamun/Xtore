import { Plate, usePlateEditor } from 'platejs/react'
import { Value } from 'platejs'

import { FixedToolbarButtons } from '@/components/editor/toolbar/fixed-toolbar-buttons'
import { FixedToolbar } from '@/components/editor/toolbar/fixed-toolbar'
import { Editor, EditorContainer } from '@/components/editor/ui/editor'
import { EditorKit } from '@/components/editor/editor-kit'
import { MarkdownPlugin } from '@platejs/markdown'

interface IProps {
  onChange?: (value: string) => void
  value?: string
}

export default function PlateEditor(props: IProps) {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: (editor) => (props.value ? editor.getApi(MarkdownPlugin).markdown.deserialize(props.value) : undefined),
  })

  function parseToMarkdown(value: Value) {
    const parsed = editor.api.markdown.serialize({ value })

    if (props.onChange) {
      props.onChange(parsed)
    }
  }

  return (
    <Plate editor={editor} onChange={({ value }) => parseToMarkdown(value)}>
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>

      <EditorContainer>
        <Editor className="h-[550px]" />
      </EditorContainer>
    </Plate>
  )
}
