<script setup lang="ts">
  import { computed } from 'vue';
  import type { CocktailType } from '@/types/cocktail';
  import { getIngredients } from '@/helpers/getIngredients';

  const props = defineProps<{
    cocktail: CocktailType;
  }>();

  const ingredients = computed(() => getIngredients(props.cocktail));
</script>

<template>
  <article class="cocktail-card">
    <h3 class="cocktail-card__title">{{ cocktail.strDrink }}</h3>
    <p class="cocktail-card__description">{{ cocktail.strInstructions }}</p>

    <ul class="cocktail-card__ingredients">
      <li
        v-for="(item, index) in ingredients"
        :key="index"
        class="cocktail-card__ingredients-item"
      >
        <span class="cocktail-card__ingredients-item-name">
          {{ item.name }}
        </span>
        <span
          v-if="item.measure"
          class="cocktail-card__ingredients-item-dots"
        />
        <span
          v-if="item.measure"
          class="cocktail-card__ingredients-item-measure"
        >
          {{ item.measure }}
        </span>
      </li>
    </ul>

    <img
      :src="cocktail.strDrinkThumb"
      :alt="cocktail.strDrink"
      loading="lazy"
      class="cocktail-card__img"
    />
  </article>
</template>

<style src="./style.scss" scoped lang="scss" />
