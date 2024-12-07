import { defineStore } from 'pinia'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useSettingsStore } from './settings'
import { usePersonalitiesStore } from './personalities'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: []
  }),

  actions: {
    async sendMessage({ message, chatHistory, personalityId }) {
      const settings = useSettingsStore()
      const personalitiesStore = usePersonalitiesStore()
      
      if (!settings.apiKey) {
        throw new Error('API key not set')
      }

      try {
        const genAI = new GoogleGenerativeAI(settings.apiKey)
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-pro',
          generationConfig: {
            maxOutputTokens: settings.maxTokens,
            temperature: settings.temperature,
          }
        })

        // Get active personality
        const activePersonality = personalitiesStore.personalities.find(
          p => p.id === personalityId
        )

        // Create chat context from history
        const chatContext = chatHistory
          .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
          .join('\n')

        // Prepare prompt with personality and chat history
        let prompt = ''
        if (activePersonality) {
          // Enhanced personality context
          const personalityContext = `You are ${activePersonality.name}. ${activePersonality.description}
Your responses should consistently reflect this personality.
If asked about your name, identity, or role, always respond as ${activePersonality.name}.
${activePersonality.prompt}

Remember:
- Your name is: ${activePersonality.name}
- Your personality: ${activePersonality.description}
`
          prompt = `${personalityContext}\n\nChat History:\n${chatContext}\n\nUser: ${message}\nAssistant:`
        } else {
          prompt = `${chatContext}\n\nUser: ${message}\nAssistant:`
        }

        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()
      } catch (error) {
        console.error('Error generating response:', error)
        throw error
      }
    }
  }
})