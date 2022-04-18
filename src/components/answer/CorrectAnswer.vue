<template>
  <div v-if="answer" class="mt-2" style="font-size: 1.5rem">
    Answer is "{{ answer }}"!
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { emitter } from '../../modules/emitter';

export default defineComponent({
  setup() {
    const answer = ref<number | null>(null);

    emitter.on('answerIsSent', (givenAnswer: unknown) => {
      answer.value = Number(givenAnswer);
    });

    return {
      answer,
    };
  },
});
</script>
