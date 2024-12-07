import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    apiKey: '',
    maxTokens: 1000,
    safetyLevel: 'safe',
    temperature: 0.7
  }),

  persist: true,
})