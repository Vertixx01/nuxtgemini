<template>
  <div class="flex-1 glass-effect ml-4 p-4 flex flex-col">
    <div v-if="activeChat" class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div v-if="!isEditingTitle" @click="startEditingTitle" class="cursor-pointer hover:text-neon-green">
          <h2 class="text-lg font-medium">{{ activeChatName }}</h2>
        </div>
        <div v-else class="flex items-center gap-2">
          <input
            v-model="editedTitle"
            @keyup.enter="saveTitle"
            @blur="saveTitle"
            ref="titleInput"
            type="text"
            class="bg-win11-hover border-gray-700 rounded-lg px-2 py-1"
          />
        </div>
        <PencilIcon 
          @click="startEditingTitle" 
          class="w-4 h-4 cursor-pointer hover:text-neon-green"
          v-if="!isEditingTitle"
        />
      </div>
      <div v-if="activePersonality" class="flex items-center gap-2">
        <img 
          v-if="activePersonality.imageUrl" 
          :src="activePersonality.imageUrl" 
          class="w-6 h-6 rounded-full"
          alt=""
        />
        <span class="text-sm text-neon-green">{{ activePersonality.name }}</span>
      </div>
    </div>

    <div v-if="!activeChat" class="flex-1 flex items-center justify-center text-gray-400">
      <p>Select or create a chat to start messaging</p>
    </div>

    <template v-else>
      <div class="flex-1 overflow-y-auto mb-4">
        <div v-for="message in chatMessages" :key="message.id" class="mb-4">
          <div class="flex items-start gap-2">
            <img 
              v-if="message.role !== 'user' && activePersonality?.imageUrl" 
              :src="activePersonality.imageUrl" 
              class="w-8 h-8 rounded-full mt-2"
              alt="Chatbot"
            />
            <div 
              :class="[
                'p-4 rounded-lg max-w-3xl', 
                message.role === 'user' ? 'ml-auto bg-win11-hover' : 'bg-win11-sidebar'
              ]"
            >
              {{ message.content }}
            </div>
            <img 
              v-if="message.role === 'user'"
              src="~/public/user.png"
              class="w-8 h-8 rounded-full mt-2"
              alt="User"
            />
          </div>
        </div>
      </div>

      <div class="flex gap-2">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type your message..."
          class="flex-1 bg-win11-hover border-gray-700 rounded-lg focus:ring-neon-green focus:border-neon-green"
        />
        <button @click="sendMessage" class="btn-primary">
          <PaperAirplaneIcon class="w-5 h-5" />
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { PaperAirplaneIcon, PencilIcon } from '@heroicons/vue/24/outline'
import { useMessagesStore } from '~/stores/messages'
import { useChatsStore } from '~/stores/chats'
import { usePersonalitiesStore } from '~/stores/personalities'

const messagesStore = useMessagesStore()
const chatsStore = useChatsStore()
const personalitiesStore = usePersonalitiesStore()

const isEditingTitle = ref(false)
const editedTitle = ref('')
const titleInput = ref(null)

const activeChat = computed(() => chatsStore.activeChat)
const activeChatName = computed(() => {
  const chat = chatsStore.chats.find(c => c.id === activeChat.value)
  return chat?.name
})

const activePersonality = computed(() => {
  const personality = personalitiesStore.personalities.find(
    p => p.id === personalitiesStore.activePersonality
  )
  return personality
})

const chatMessages = computed(() => {
  const chat = chatsStore.chats.find(c => c.id === activeChat.value)
  return chat?.messages || []
})

const newMessage = ref('')

const startEditingTitle = () => {
  editedTitle.value = activeChatName.value
  isEditingTitle.value = true
  nextTick(() => {
    titleInput.value?.focus()
  })
}

const saveTitle = () => {
  if (editedTitle.value.trim()) {
    chatsStore.updateChatTitle(activeChat.value, editedTitle.value.trim())
  }
  isEditingTitle.value = false
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || !activeChat.value) return
  
  const message = newMessage.value
  newMessage.value = ''
  
  const chat = chatsStore.chats.find(c => c.id === activeChat.value)
  if (chat) {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message
    }
    chat.messages.push(userMessage)
    
    // Generate title from first message
    if (chat.messages.length === 1) {
      chatsStore.generateChatTitle(chat.id, message)
    }
    
    try {
      const aiResponse = await messagesStore.sendMessage({
        message,
        chatHistory: chat.messages,
        personalityId: personalitiesStore.activePersonality
      })
      
      if (aiResponse) {
        chat.messages.push({
          id: Date.now() + 1,
          role: 'assistant',
          content: aiResponse
        })
      }
    } catch (error) {
      console.error('Error sending message:', error)
      chat.messages.push({
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error while generating a response. Please make sure your API key is set correctly in the settings.'
      })
    }
  }
}
</script>