import { BaseBasicBlocksKit } from '@/components/editor/plugins/basic-blocks-base-kit'
import { BaseBasicMarksKit } from '@/components/editor/plugins/basic-marks-base-kit'
import { BaseLineHeightKit } from '@/components/editor/plugins/line-height-base-kit'
import { BaseCodeBlockKit } from '@/components/editor/plugins/code-block-base-kit'
import { BaseCalloutKit } from '@/components/editor/plugins/callout-base-kit'
import { BaseColumnKit } from '@/components/editor/plugins/column-base-kit'
import { BaseToggleKit } from '@/components/editor/plugins/toggle-base-kit'
import { BaseAlignKit } from '@/components/editor/plugins/align-base-kit'
import { BaseMediaKit } from '@/components/editor/plugins/media-base-kit'
import { BaseTableKit } from '@/components/editor/plugins/table-base-kit'
import { BaseDateKit } from '@/components/editor/plugins/date-base-kit'
import { BaseFontKit } from '@/components/editor/plugins/font-base-kit'
import { BaseLinkKit } from '@/components/editor/plugins/link-base-kit'
import { BaseListKit } from '@/components/editor/plugins/list-base-kit'
import { MarkdownKit } from '@/components/editor/plugins/markdown-kit'
import { BaseTocKit } from '@/components/editor/plugins/toc-base-kit'

export const BaseEditorKit = [
  ...BaseBasicBlocksKit,
  ...BaseCodeBlockKit,
  ...BaseTableKit,
  ...BaseToggleKit,
  ...BaseTocKit,
  ...BaseMediaKit,
  ...BaseCalloutKit,
  ...BaseColumnKit,
  ...BaseDateKit,
  ...BaseLinkKit,
  ...BaseBasicMarksKit,
  ...BaseFontKit,
  ...BaseListKit,
  ...BaseAlignKit,
  ...BaseLineHeightKit,
  ...MarkdownKit,
]
