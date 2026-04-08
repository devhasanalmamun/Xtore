import { create } from 'zustand/react'
import axios from 'axios'

import { INotification } from '@/types'

interface INotificationState {
  notifications: INotification[]
  unreadCount: number
  isLoading: boolean

  fetchNotifications: () => void
  markAsRead: (notification: INotification) => void
  markAllAsRead: () => void
}

const useNotifications = create<INotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true })

    try {
      const response = await axios.get(route('notifications.index'))
      const { notifications } = response.data
      set({ notifications })
      set({ unreadCount: notifications.filter((notification: INotification) => !notification.is_read).length })
    } catch (error) {
      console.error(error)
      set({ isLoading: false })
    } finally {
      set({ isLoading: false })
    }
  },

  markAsRead: async (notification: INotification) => {
    try {
      await axios.patch(route('notifications.update', notification.id))
      set((state) => ({
        notifications: state.notifications.map((n) => (n.id === notification.id ? { ...n, is_read: true } : n)),
      }))
    } catch (error) {
      console.error(error)
    }
  },

  markAllAsRead: async () => {
    try {
      await axios.patch(route('notifications.mark-all-as-read'))
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, is_read: true })),
        unreadCount: 0,
      }))
    } catch (error) {
      console.error(error)
    }
  },
}))

export default useNotifications
