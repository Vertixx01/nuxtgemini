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
            <DialogPanel class="w-full max-w-md glass-effect rounded-2xl p-6">
              <DialogTitle class="text-lg font-medium leading-6 text-neon-green mb-4">
                {{ editing ? 'Edit Personality' : 'Add New Personality' }}
              </DialogTitle>

              <form @submit.prevent="savePersonality" class="space-y-4">
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
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { usePersonalitiesStore } from '~/stores/personalities'

const personalitiesStore = usePersonalitiesStore()
const isOpen = computed(() => personalitiesStore.isModalOpen)
const editing = computed(() => personalitiesStore.editingPersonality !== null)

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
</script>