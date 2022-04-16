<template>
  <div>
    <SeedForm v-if="!seed"></SeedForm>
    <template v-if="seed">
      <ProposedSolution
        v-for="proposedSolutionNo in maxNumberOfInput"
        :key="`proposedSolution${proposedSolutionNo}`"
        :isActive="proposedSolutionNo === numberOfTries"
        :seed="seed"
      ></ProposedSolution>
    </template>
    <CorrectAnswer v-if="seed"></CorrectAnswer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import SeedForm from './seed/SeedForm.vue';
import ProposedSolution from './solution/ProposedSolution.vue';
import CorrectAnswer from './answer/CorrectAnswer.vue';
import { emitter } from '../modules/emitter';
import { maxNumberOfInput } from '../modules/numberleModule';

export default defineComponent({
  components: {
    SeedForm,
    ProposedSolution,
    CorrectAnswer,
  },
  setup() {
    const seed = ref<number | null>(null);
    const numberOfTries = ref(1);

    onMounted(() => {
      emitter.on('seedIsSet', (setSeed: unknown): void => {
        seed.value = Number(setSeed);
      });
      emitter.on('proposedSolutionIsSent', (): void => {
        numberOfTries.value++;
      });
    });

    return {
      seed,
      maxNumberOfInput,
      numberOfTries,
    };
  },
});
</script>
