import { defineStore } from 'pinia'

export const usePersonalitiesStore = defineStore('personalities', {
  state: () => ({
    personalities: [],
    isModalOpen: false,
    editingPersonality: null,
    activePersonality: null
  }),

  actions: {
    addPersonality(personality) {
      this.personalities.push(personality)
    },

    updatePersonality(personality) {
      const index = this.personalities.findIndex(p => p.id === personality.id)
      if (index !== -1) {
        this.personalities[index] = personality
      }
    },

    deletePersonality(id) {
      this.personalities = this.personalities.filter(p => p.id !== id)
      if (this.activePersonality === id) {
        this.activePersonality = null
      }
    },

    setEditingPersonality(id) {
      this.editingPersonality = id
      this.isModalOpen = true
    },

    setActivePersonality(id) {
      this.activePersonality = id
    },

    openModal() {
      this.isModalOpen = true
    },

    closeModal() {
      this.isModalOpen = false
      this.editingPersonality = null
    }
  },

  persist: true,
})