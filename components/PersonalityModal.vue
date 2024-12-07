<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md sm:max-w-2xl lg:max-w-4xl glass-effect rounded-2xl p-6">
              <DialogTitle class="text-lg font-medium leading-6 text-neon-green mb-4">
                Personality Manager
              </DialogTitle>

              <!-- Section Switch Buttons -->
              <div class="flex justify-between mb-4 gap-12">
                <button @click="activeSection = 'add'" :class="{'bg-neon-green text-black font-semibold': activeSection === 'add'}" class="px-4 py-2 rounded-md bg-[#4B5563] font-semibold">Add Personality</button>
                <button @click="activeSection = 'marketplace'" :class="{'bg-neon-green text-black font-semibold': activeSection === 'marketplace'}" class="px-4 py-2 rounded-md bg-[#4B5563] font-semibold">Personality Marketplace</button>
              </div>

              <form @submit.prevent="savePersonality" class="space-y-4" v-if="activeSection === 'add'">
                <div>
                  <label class="block text-sm font-medium mb-1">Personality Name</label>
                  <input v-model="form.name" type="text" required class="w-full bg-win11-hover border-gray-700 rounded-lg" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Description</label>
                  <textarea v-model="form.description" required class="w-full bg-win11-hover border-gray-700 rounded-lg" rows="3"></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Image URL</label>
                  <input v-model="form.imageUrl" type="url" class="w-full bg-win11-hover border-gray-700 rounded-lg" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">AI Personality Prompt</label>
                  <textarea v-model="form.prompt" required class="w-full bg-win11-hover border-gray-700 rounded-lg" rows="4"></textarea>
                </div>

                <div class="flex justify-end gap-2">
                  <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" class="btn-primary">
                    {{ editing ? 'Update' : 'Add' }} Personality
                  </button>
                  <button v-if="editing" @click="exportPersonality" type="button" class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
                    Export
                  </button>
                  <button v-if="!editing" @click="importPersonality" type="button" class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg">
                    Import
                  </button>
                </div>
              </form>

              <!-- Marketplace Section -->
              <div v-if="activeSection === 'marketplace'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="personality in personalities" :key="personality.id" class="bg-[#1F242B] border border-green-500 rounded-lg p-4">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-lg font-bold text-neon-green">{{ personality.personality_name }}</h3>
                    <span class="text-sm text-gray-500">by {{ personality.username }}</span>
                  </div>
                  <p class="text-sm mb-2">{{ personality.personality_description }}</p>
                  <img :src="personality.personality_image_url" alt="" class="w-full h-32 object-cover rounded-lg mb-2">
                  <div class="bg-[#191E2A] text-gray-300 text-xs rounded px-2 py-1 mb-2 prompt-container">
                    Prompt:
                    <p class="text-xs text-white mb-4">{{ personality.personality_prompt }}</p>
                  </div>
                  <button class="px-4 mt-2 py-2 bg-green-600 hover:bg-green-700 text-black font-semibold rounded" @click="addPersonalityToSidebar(personality)">Use Personality</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
  .prompt-container {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
    max-height: 3em; /* Adjust based on line height */
  }
  .prompt-container:hover {
    max-height: 100vh; /* Expand to fit content */
  }
</style>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { usePersonalitiesStore } from '~/stores/personalities'
import { ref, computed, reactive, watch, onMounted } from 'vue'
import axios from 'axios'

const personalitiesStore = usePersonalitiesStore()
const isOpen = computed(() => personalitiesStore.isModalOpen)
const editing = computed(() => personalitiesStore.editingPersonality !== null)
const activeSection = ref('add')
const personalities = ref([])

const form = reactive({
  name: '',
  description: '',
  imageUrl: '',
  prompt: ''
})

// Load existing personality data when editing
watch(() => personalitiesStore.editingPersonality, (newId) => {
  if (newId) {
    const personality = personalitiesStore.personalities.find(p => p.id === newId)
    if (personality) {
      Object.assign(form, personality)
    }
  }
})

const fetchPersonalities = async () => {
  try {
    const response = await axios.get('/api/personalities')
    personalities.value = response.data
  } catch (error) {
    console.error('Error fetching personalities:', error)
  }
}

onMounted(() => {
  fetchPersonalities()
})

const closeModal = () => {
  personalitiesStore.closeModal()
  Object.assign(form, {
    name: '',
    description: '',
    imageUrl: '',
    prompt: ''
  })
}

const savePersonality = () => {
  if (editing.value) {
    personalitiesStore.updatePersonality({
      id: personalitiesStore.editingPersonality,
      ...form
    })
  } else {
    personalitiesStore.addPersonality({
      id: Date.now().toString(),
      ...form
    })
  }
  closeModal()
}

const exportPersonality = () => {
  const dataStr = JSON.stringify(form, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const fileName = form.name ? `${form.name}.json` : 'personality.json'
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const importPersonality = async () => {
  const [fileHandle] = await window.showOpenFilePicker({
    types: [{
      description: 'JSON Files',
      accept: { 'application/json': ['.json'] }
    }]
  })
  const file = await fileHandle.getFile()
  const text = await file.text()
  const importedData = JSON.parse(text)
  Object.assign(form, importedData)
}

const addPersonalityToSidebar = (personality) => {
  personalitiesStore.addPersonality({
    id: personality.id,
    name: personality.personality_name,
    description: personality.personality_description,
    imageUrl: personality.personality_image_url,
    prompt: personality.personality_prompt,
    username: personality.username
  })
  closeModal()
}
</script>