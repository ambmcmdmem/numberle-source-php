<template>
  <div v-if="answer" class="mt-2" style="font-size: 1.5rem">
    Answer is "{{ answer }}"!
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { emitter } from '../../../module/emitter';

export default defineComponent({
  setup() {
    const answer = ref<string>('');

    emitter.on('correctAnswerIsSent', (givenAnswer): void => {
      answer.value = givenAnswer;
    });

    return {
      answer,
    };
  },
});
</script>
