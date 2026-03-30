<script setup lang="ts">
  import { computed, onMounted, watch } from 'vue';
  import { useCocktailsStore } from '@/stores/cocktails';
  import type { CocktailCode } from '@/types/cocktail';
  import CocktailCard from '@/components/CocktailCard';

  interface Props {
    code: CocktailCode;
  }

  const props = defineProps<Props>();

  const store = useCocktailsStore();
  const { getCocktail } = store;

  const currentCocktailsList = computed(() => store.cocktails[props.code] ?? []);
  const loading = computed(() => store.isLoading(props.code));

  const loadData = () => getCocktail(props.code);

  onMounted(loadData);
  watch(() => props.code, loadData);
</script>

<template>
  <section class="cocktail-page">
    <h2 class="cocktail-page__title">{{ code }}</h2>

    <div
      v-if="loading"
      class="loading"
    >
      Loading...
    </div>
    <template v-else>
      <div
        v-if="currentCocktailsList.length"
        class="cocktails-list"
      >
        <CocktailCard
          v-for="cocktail in currentCocktailsList"
          :key="cocktail.idDrink"
          :cocktail="cocktail"
        />
      </div>
      <div v-else>Ничего не найдено</div>
    </template>
  </section>
</template>

<style src="./style.scss" scoped lang="scss" />
