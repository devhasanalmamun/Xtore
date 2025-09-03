'use client'

import {
  ArrowUpToLineIcon,
  BaselineIcon,
  BoldIcon,
  HighlighterIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react'
import { useEditorReadOnly } from 'platejs/react'
import { KEYS } from 'platejs'

import {
  BulletedListToolbarButton,
  NumberedListToolbarButton,
  TodoListToolbarButton,
} from '@/components/editor/toolbar/list-toolbar-button'
import { IndentToolbarButton, OutdentToolbarButton } from '@/components/editor/toolbar/indent-toolbar-button'
import { RedoToolbarButton, UndoToolbarButton } from '@/components/editor/toolbar/history-toolbar-button'
import { LineHeightToolbarButton } from '@/components/editor/toolbar/line-height-toolbar-button'
import { FontColorToolbarButton } from '@/components/editor/toolbar/font-color-toolbar-button'
import { FontSizeToolbarButton } from '@/components/editor/toolbar/font-size-toolbar-button'
import { TurnIntoToolbarButton } from '@/components/editor/toolbar/turn-into-toolbar-button'
import { ExportToolbarButton } from '@/components/editor/toolbar/export-toolbar-button'
import { ImportToolbarButton } from '@/components/editor/toolbar/import-toolbar-button'
import { InsertToolbarButton } from '@/components/editor/toolbar/insert-toolbar-button'
import { ToggleToolbarButton } from '@/components/editor/toolbar/toggle-toolbar-button'
import { AlignToolbarButton } from '@/components/editor/toolbar/align-toolbar-button'
import { EmojiToolbarButton } from '@/components/editor/toolbar/emoji-toolbar-button'
import { MediaToolbarButton } from '@/components/editor/toolbar/media-toolbar-button'
import { TableToolbarButton } from '@/components/editor/toolbar/table-toolbar-button'
import { LinkToolbarButton } from '@/components/editor/toolbar/link-toolbar-button'
import { MarkToolbarButton } from '@/components/editor/toolbar/mark-toolbar-button'
import { ToolbarGroup } from '@/components/ui/toolbar'

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly()

  return (
    <div className="flex w-full overflow-x-scroll">
      {!readOnly && (
        <>
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <ExportToolbarButton>
              <ArrowUpToLineIcon />
            </ExportToolbarButton>

            <ImportToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <InsertToolbarButton />
            <TurnIntoToolbarButton />
            <FontSizeToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <MarkToolbarButton nodeType={KEYS.bold} tooltip="Bold (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KEYS.italic} tooltip="Italic (⌘+I)">
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KEYS.underline} tooltip="Underline (⌘+U)">
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={KEYS.strikethrough} tooltip="Strikethrough (⌘+⇧+M)">
              <StrikethroughIcon />
            </MarkToolbarButton>

            <FontColorToolbarButton nodeType={KEYS.color} tooltip="Text color">
              <BaselineIcon />
            </FontColorToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <AlignToolbarButton />

            <NumberedListToolbarButton />
            <BulletedListToolbarButton />
            <TodoListToolbarButton />
            <ToggleToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <LinkToolbarButton />
            <TableToolbarButton />
            <EmojiToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <MediaToolbarButton nodeType={KEYS.img} />
            <MediaToolbarButton nodeType={KEYS.video} />
            <MediaToolbarButton nodeType={KEYS.audio} />
            <MediaToolbarButton nodeType={KEYS.file} />
          </ToolbarGroup>

          <ToolbarGroup>
            <LineHeightToolbarButton />
            <OutdentToolbarButton />
            <IndentToolbarButton />
          </ToolbarGroup>
        </>
      )}

      <div className="grow" />

      <ToolbarGroup>
        <MarkToolbarButton nodeType={KEYS.highlight} tooltip="Highlight">
          <HighlighterIcon />
        </MarkToolbarButton>
      </ToolbarGroup>
    </div>
  )
}
