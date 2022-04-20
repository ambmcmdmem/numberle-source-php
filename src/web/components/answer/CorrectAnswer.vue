<template>
  <div v-if="answer" class="mt-2" style="font-size: 1.5rem">
    Answer is "{{ answer }}"!
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { emitter } from '../../../module/emitter';
import { maxNumberOfInput } from '../../../module/numberleModule';

export default defineComponent({
  setup() {
    const answer = ref<string>('');

    emitter.on('correctAnswerIsSent', (givenAnswer): void => {
      if (givenAnswer.length !== maxNumberOfInput)
        throw new Error(
          'APIから受け取った回答の文字列長が指定されたものと一致しません。'
        );
      answer.value = givenAnswer;
    });

    return {
      answer,
    };
  },
});
</script>
