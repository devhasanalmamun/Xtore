'use client'

import { EmojiInputPlugin, EmojiPlugin } from '@platejs/emoji/react'
import emojiMartData from '@emoji-mart/data'

import { EmojiInputElement } from '@/components/editor/nodes/emoji-node'

export const EmojiKit = [
  EmojiPlugin.configure({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: { data: emojiMartData as any },
  }),
  EmojiInputPlugin.withComponent(EmojiInputElement),
]
