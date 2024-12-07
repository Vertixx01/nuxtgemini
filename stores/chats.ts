import { defineStore } from 'pinia'

export const useChatsStore = defineStore('chats', {
  state: () => ({
    chats: [],
    activeChat: null
  }),

  actions: {
    addChat(chat) {
      this.chats.push(chat)
    },

    deleteChat(id) {
      this.chats = this.chats.filter(chat => chat.id !== id)
      if (this.activeChat === id) {
        this.activeChat = null
      }
    },

    setActiveChat(id) {
      this.activeChat = id
    },

    updateChatTitle(id, title) {
      const chat = this.chats.find(c => c.id === id)
      if (chat) {
        chat.name = title
      }
    },

    generateChatTitle(id, firstMessage) {
      const chat = this.chats.find(c => c.id === id)
      if (chat) {
        // Generate a concise title based on the first message
        const title = firstMessage.length > 30 
          ? firstMessage.substring(0, 30) + '...'
          : firstMessage
        chat.name = title
      }
    }
  },

  persist: true,
})