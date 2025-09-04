'use client'

import { type TPlateEditor, useEditorRef } from 'platejs/react'
import { type Value, TrailingBlockPlugin } from 'platejs'

import { BasicBlocksKit } from '@/components/editor/plugins/basic-blocks-kit'
import { BasicMarksKit } from '@/components/editor/plugins/basic-marks-kit'
import { AutoformatKit } from '@/components/editor/plugins/autoformat-kit'
import { AlignKit } from '@/components/editor/plugins/align-kit'
// import { BlockMenuKit } from './plugins/block-menu-kit'

// import { BlockPlaceholderKit } from './plugins/block-placeholder-kit'
import { CalloutKit } from '@/components/editor/plugins/callout-kit'
// import { CodeBlockKit } from './plugins/code-block-kit'
// import { ColumnKit } from './plugins/column-kit'
// import { CursorOverlayKit } from './plugins/cursor-overlay-kit'
// import { DateKit } from './plugins/date-kit'
// import { DndKit } from './plugins/dnd-kit'
// import { DocxKit } from './plugins/docx-kit'
// import { EmojiKit } from './plugins/emoji-kit'
// import { ExitBreakKit } from './plugins/exit-break-kit'
// import { FixedToolbarKit } from './plugins/fixed-toolbar-kit'
// import { FloatingToolbarKit } from './plugins/floating-toolbar-kit'
// import { FontKit } from './plugins/font-kit'
// import { LineHeightKit } from './plugins/line-height-kit'
// import { LinkKit } from './plugins/link-kit'
// import { ListKit } from './plugins/list-kit'
import { MarkdownKit } from './plugins/markdown-kit'
import { MediaKit } from '@/components/editor/plugins/media-kit'
// import { SlashKit } from './plugins/slash-kit'
// import { TableKit } from './plugins/table-kit'
// import { TocKit } from './plugins/toc-kit'
// import { ToggleKit } from './plugins/toggle-kit'

export const EditorKit = [
  // ...BlockMenuKit,

  // Elements
  ...BasicBlocksKit,
  // ...CodeBlockKit,
  // ...TableKit,
  // ...ToggleKit,
  // ...TocKit,
  ...MediaKit,
  ...CalloutKit,
  // ...ColumnKit,
  // ...DateKit,
  // ...LinkKit,

  // Marks
  ...BasicMarksKit,
  // ...FontKit,

  // Block Style
  // ...ListKit,
  ...AlignKit,
  // ...LineHeightKit,

  // Collaboration
  // ...DiscussionKit,
  // ...CommentKit,

  // Editing
  // ...SlashKit,
  ...AutoformatKit,
  // ...CursorOverlayKit,
  // ...DndKit,
  // ...EmojiKit,
  // ...ExitBreakKit,
  TrailingBlockPlugin,

  // Parsers
  // ...DocxKit,
  ...MarkdownKit,

  // UI
  // ...BlockPlaceholderKit,
  // ...FixedToolbarKit,
  // ...FloatingToolbarKit,
]

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>

export const useEditor = () => useEditorRef<MyEditor>()
