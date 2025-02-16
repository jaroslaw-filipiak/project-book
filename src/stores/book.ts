import { defineStore } from 'pinia'
// import type { Book, BookPage, BookTemplate } from '@/types/book'

interface BookState {
  currentBook: any
  currentStep: number
  saving: boolean
}

export const useBookStore = defineStore('book', {
  state: (): BookState => ({
    currentBook: null,
    currentStep: 1,
    saving: false,
  }),

  actions: {
    nextStep() {
      this.currentStep++
    },

    prevStep() {
      console.log('prevStep book store')
      --this.currentStep
    },
  },
})
