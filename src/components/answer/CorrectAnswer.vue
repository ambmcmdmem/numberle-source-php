<template>
  <div v-if="answer">{{ answer }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { emitter } from '../../modules/emitter';

export default defineComponent({
  setup() {
    const answer = ref<number | null>(null);

    emitter.on('answerIsGiven', (givenAnswer: unknown) => {
      answer.value = Number(givenAnswer);
    });

    return {
      answer,
    };
  },
});
</script>

<style lang="scss"></style>
