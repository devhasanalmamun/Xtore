'use client'

import { LinkPlugin } from '@platejs/link/react'

import { LinkElement } from '@/components/editor/nodes/link-node'
import { LinkFloatingToolbar } from '@/components/editor/toolbar/link-toolbar'

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
]
