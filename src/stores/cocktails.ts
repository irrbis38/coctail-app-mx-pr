import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchCocktail } from '@/api/index'
import type { CocktailsState, CocktailCode } from '@/types/cocktail'

export const useCocktailsStore = defineStore('cocktails', () => {
  const state = ref<CocktailsState>({
    data: {},
    loading: {},
    error: {}
  })

  const cocktails = computed(() => state.value.data)

  const isLoading = computed(() => (code: CocktailCode) =>
    state.value.loading[code] || false
  )

  const getCocktail = async (code: CocktailCode) => {
    if (state.value.loading[code]) {
      return
    }

    if (code in state.value.data) {
      return state.value.data[code]
    }

    state.value.loading[code] = true
    state.value.error[code] = null

    try {

      const data = await fetchCocktail(code)
      state.value.data[code] = data

      return data

    } finally {
      state.value.loading[code] = false
    }
  }

  return {
    cocktails,
    isLoading,
    getCocktail
  }
})
