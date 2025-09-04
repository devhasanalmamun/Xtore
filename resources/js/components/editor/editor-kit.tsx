'use client'

import { type TPlateEditor, useEditorRef } from 'platejs/react'
import { type Value, TrailingBlockPlugin } from 'platejs'

import { BlockSelectionKit } from '@/components/editor/plugins/block-selection-kit'
import { BasicBlocksKit } from '@/components/editor/plugins/basic-blocks-kit'
import { BasicMarksKit } from '@/components/editor/plugins/basic-marks-kit'
import { LineHeightKit } from '@/components/editor/plugins/line-height-kit'
import { AutoformatKit } from '@/components/editor/plugins/autoformat-kit'
import { BlockMenuKit } from '@/components/editor/plugins/block-menu-kit'
import { MarkdownKit } from '@/components/editor/plugins/markdown-kit'
import { CalloutKit } from '@/components/editor/plugins/callout-kit'
import { ToggleKit } from '@/components/editor/plugins/toggle-kit'
import { IndentKit } from '@/components/editor/plugins/indent-kit'
import { ColumnKit } from '@/components/editor/plugins/column-kit'
import { AlignKit } from '@/components/editor/plugins/align-kit'
import { MediaKit } from '@/components/editor/plugins/media-kit'
import { TableKit } from '@/components/editor/plugins/table-kit'
import { EmojiKit } from '@/components/editor/plugins/emoji-kit'
import { FontKit } from '@/components/editor/plugins/font-kit'
import { ListKit } from '@/components/editor/plugins/list-kit'
import { LinkKit } from '@/components/editor/plugins/link-kit'
import { TocKit } from '@/components/editor/plugins/toc-kit'
import { DndKit } from '@/components/editor/plugins/dnd-kit'

// import { BlockPlaceholderKit } from './plugins/block-placeholder-kit'
// import { CursorOverlayKit } from './plugins/cursor-overlay-kit'
// import { DateKit } from './plugins/date-kit'
// import { DocxKit } from './plugins/docx-kit'
// import { ExitBreakKit } from './plugins/exit-break-kit'
// import { FixedToolbarKit } from './plugins/fixed-toolbar-kit'
// import { FloatingToolbarKit } from './plugins/floating-toolbar-kit'

export const EditorKit = [
  ...BlockMenuKit,
  ...BlockSelectionKit,

  // Elements
  ...BasicBlocksKit,
  ...TableKit,
  ...ToggleKit,
  ...TocKit,
  ...MediaKit,
  ...CalloutKit,
  ...ColumnKit,
  // ...DateKit,
  ...IndentKit,
  ...LinkKit,

  // Marks
  ...BasicMarksKit,
  ...FontKit,

  // Block Style
  ...ListKit,
  ...AlignKit,
  ...LineHeightKit,

  // Editing
  ...AutoformatKit,
  // ...CursorOverlayKit,
  ...DndKit,

  ...EmojiKit,
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
