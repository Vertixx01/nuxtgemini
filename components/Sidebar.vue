<template>
  <div class="w-80 glass-effect p-4 flex flex-col gap-4">
    <div class="flex items-center gap-2 mb-6">
      <img src="~/public/logo.png" alt="Nuxt AI Chat Logo" class="w-10 h-10">
      <h1 class="text-xl font-semibold text-neon-green text-center">NuxtGemini</h1>
    </div>

    <!-- Sections -->
    <div class="flex flex-col gap-6 flex-1">
      <!-- Chats Section -->
      <div>
        <h2 class="text-lg font-medium mb-2">Chats</h2>
        <div class="flex flex-col gap-2">
          <button @click="createNewChat" class="btn-primary flex items-center gap-2">
            <PlusIcon class="w-5 h-5" />
            New Chat
          </button>
          <div class="flex flex-col gap-1 mt-2">
            <div 
              v-for="chat in chats" 
              :key="chat.id" 
              :class="['sidebar-item flex justify-between items-center', 
                      chat.id === activeChat ? 'bg-win11-hover' : '']"
              @click="setActiveChat(chat.id)"
            >
              <span>{{ chat.name }}</span>
              <TrashIcon @click.stop="deleteChat(chat.id)" class="w-5 h-5 text-red-400 hover:text-red-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- Personalities Section -->
      <div>
        <h2 class="text-lg font-medium mb-2">Personalities</h2>
        <div class="flex flex-col gap-2">
          <button @click="openPersonalityModal" class="btn-primary flex items-center gap-2">
            <UserPlusIcon class="w-5 h-5" />
            Add Personality
          </button>
          <div class="flex flex-col gap-1 mt-2">
            <div 
              v-for="personality in personalities" 
              :key="personality.id" 
              :class="['sidebar-item flex justify-between items-center',
                      personality.id === activePersonality ? 'bg-win11-hover' : '']"
              @click="setActivePersonality(personality.id)"
            >
              <div class="flex items-center gap-2">
                <img 
                  v-if="personality.imageUrl" 
                  :src="personality.imageUrl" 
                  class="w-6 h-6 rounded-full"
                  alt=""
                />
                <span>{{ personality.name }}</span>
              </div>
              <div class="flex gap-2">
                <PencilIcon @click.stop="editPersonality(personality.id)" class="w-5 h-5 text-neon-green hover:text-neon-green/80" />
                <TrashIcon @click.stop="deletePersonality(personality.id)" class="w-5 h-5 text-red-400 hover:text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Section -->
      <div>
        <h2 class="text-lg font-medium mb-2">Settings</h2>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Gemini API Key</label>
            <input type="password" v-model="settings.apiKey" class="w-full bg-win11-hover border-gray-700 rounded-lg focus:ring-neon-green focus:border-neon-green" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Max Output Tokens</label>
            <input type="number" v-model="settings.maxTokens" class="w-full bg-win11-hover border-gray-700 rounded-lg focus:ring-neon-green focus:border-neon-green" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Safety Settings</label>
            <select v-model="settings.safetyLevel" class="w-full bg-win11-hover border-gray-700 rounded-lg focus:ring-neon-green focus:border-neon-green">
              <option value="safe">Safe</option>
              <option value="moderate">Moderate</option>
              <option value="risky">Risky</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Temperature: {{ settings.temperature }}</label>
            <input type="range" v-model="settings.temperature" min="0" max="1" step="0.1" class="w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon, TrashIcon, UserPlusIcon, PencilIcon } from '@heroicons/vue/24/outline'
import { useSettingsStore } from '~/stores/settings'
import { useChatsStore } from '~/stores/chats'
import { usePersonalitiesStore } from '~/stores/personalities'

const settings = useSettingsStore()
const chatsStore = useChatsStore()
const personalitiesStore = usePersonalitiesStore()

const chats = computed(() => chatsStore.chats)
const personalities = computed(() => personalitiesStore.personalities)
const activeChat = computed(() => chatsStore.activeChat)
const activePersonality = computed(() => personalitiesStore.activePersonality)

const createNewChat = () => {
  const chatName = `Chat ${chats.value.length + 1}`
  const newChat = {
    id: Date.now().toString(),
    name: chatName,
    messages: []
  }
  chatsStore.addChat(newChat)
  chatsStore.setActiveChat(newChat.id)
}

const setActiveChat = (id) => {
  chatsStore.setActiveChat(id)
}

const deleteChat = (id) => chatsStore.deleteChat(id)
const deletePersonality = (id) => personalitiesStore.deletePersonality(id)
const editPersonality = (id) => personalitiesStore.setEditingPersonality(id)
const openPersonalityModal = () => personalitiesStore.openModal()
const setActivePersonality = (id) => personalitiesStore.setActivePersonality(id)
</script>