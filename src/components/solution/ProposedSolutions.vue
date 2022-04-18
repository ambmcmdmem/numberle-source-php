<template>
  <div v-if="seed">
    <ProposedSolution
      v-for="proposedSolutionNo in maxNumberOfTries"
      :key="`proposedSolution${proposedSolutionNo - 1}`"
      :proposedSolution="proposedSolutions[proposedSolutionNo - 1]"
      :statusOfProposedSolution="
        statusOfProposedSolutions[proposedSolutionNo - 1]
      "
    ></ProposedSolution>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import {
  maxNumberOfInput,
  maxNumberOfTries,
  StatusOfProposedSolutionType,
} from '../../modules/numberleModule';
import ProposedSolution from './ProposedSolution.vue';
import axios from 'axios';
import { emitter } from '../../modules/emitter';
import { apiPort } from '../../api/apiInformation';

export default defineComponent({
  components: {
    ProposedSolution,
  },
  setup() {
    axios.defaults.withCredentials = false;
    const seed = ref<number | null>(null);
    const numberOfTries = ref(1);
    const proposedSolutions = ref<string[][]>(
      [...Array(maxNumberOfTries)].map((): string[] => [])
    );
    const nowProposedSolution = computed(
      (): string[] => proposedSolutions.value[numberOfTries.value - 1]
    );
    const statusOfProposedSolutions = ref<StatusOfProposedSolutionType[][]>(
      [...Array(maxNumberOfTries)].map((): StatusOfProposedSolutionType[] => [])
    );
    const nowStatusOfProposedSolutions = computed({
      get: (): StatusOfProposedSolutionType[] =>
        statusOfProposedSolutions.value[numberOfTries.value - 1],
      set: (
        givenStatusOfProposedSolutions: StatusOfProposedSolutionType[]
      ): StatusOfProposedSolutionType[] =>
        (statusOfProposedSolutions.value[numberOfTries.value - 1] =
          givenStatusOfProposedSolutions),
    });
    const AreAllProposedSolutionCorrect = computed((): boolean =>
      nowStatusOfProposedSolutions.value.every(
        (statusOfProposedSolution): boolean =>
          statusOfProposedSolution === 'correct'
      )
    );

    onMounted(() => {
      emitter.on('seedIsSet', (setSeed: unknown): void => {
        seed.value = Number(setSeed);
      });
      window.addEventListener('keydown', (event): void => {
        if (!seed.value) return;
        if (
          !isNaN(Number(event.key)) &&
          nowProposedSolution.value.length < maxNumberOfInput
        ) {
          nowProposedSolution.value.push(event.key);
        } else if (event.key === 'Backspace') {
          nowProposedSolution.value.pop();
        } else if (
          event.key === 'Enter' &&
          nowProposedSolution.value.length === maxNumberOfInput
        ) {
          axios
            .post(
              `http://localhost:${apiPort}/collation`,
              new URLSearchParams({
                seed: String(seed.value),
                proposedSolution: nowProposedSolution.value.join(''),
              })
            )
            .then((response): void => {
              nowStatusOfProposedSolutions.value = response.data;

              if (
                AreAllProposedSolutionCorrect.value ||
                numberOfTries.value === maxNumberOfTries
              ) {
                axios
                  .post(
                    `http://localhost:${apiPort}/getAnswer`,
                    new URLSearchParams({
                      seed: String(seed.value),
                    })
                  )
                  .then((response): void =>
                    emitter.emit('answerIsSent', response.data)
                  )
                  .catch((error): void => console.log(error));
              } else {
                numberOfTries.value++;
              }
            })
            .catch((error): void => console.log(error));
        }
      });
    });

    return {
      seed,
      maxNumberOfTries,
      proposedSolutions,
      statusOfProposedSolutions,
    };
  },
});
</script>
