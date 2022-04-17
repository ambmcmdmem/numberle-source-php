<template>
  <div v-if="seed">
    <ProposedSolution
      v-for="proposedSolutionNo in maxNumberOfTries"
      :key="`proposedSolution${proposedSolutionNo}`"
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
    const seed = ref<number | null>(null);
    const numberOfTries = ref(1);
    const proposedSolutions = ref<string[][]>(
      [...Array(maxNumberOfTries)].map(() => [])
    );
    const statusOfProposedSolutions = ref<StatusOfProposedSolutionType[][]>(
      [...Array(maxNumberOfTries)].map(() => [])
    );
    const AreAllProposedSolutionCorrect = computed((): boolean =>
      statusOfProposedSolutions.value[numberOfTries.value - 1].every(
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
          proposedSolutions.value[numberOfTries.value - 1].length <
            maxNumberOfInput
        ) {
          proposedSolutions.value[numberOfTries.value - 1].push(event.key);
        } else if (
          event.key === 'Enter' &&
          proposedSolutions.value[numberOfTries.value - 1].length ===
            maxNumberOfInput
        ) {
          axios
            .post(
              `http://localhost:${apiPort}/collation`,
              new URLSearchParams({
                seed: String(seed.value),
                proposedSolution:
                  proposedSolutions.value[numberOfTries.value - 1].join(''),
              }),
              {
                withCredentials: false,
              }
            )
            .then((response): void => {
              statusOfProposedSolutions.value[numberOfTries.value - 1] =
                response.data;

              if (
                AreAllProposedSolutionCorrect.value ||
                numberOfTries.value === maxNumberOfTries
              ) {
                axios
                  .post(
                    `http://localhost:${apiPort}/getAnswer`,
                    new URLSearchParams({
                      seed: String(seed.value),
                    }),
                    {
                      withCredentials: false,
                    }
                  )
                  .then((response): void =>
                    emitter.emit('answerIsGiven', response.data)
                  )
                  .catch((error): void => console.log(error));
              } else {
                numberOfTries.value++;
              }
            })
            .catch((error): void => {
              console.log(error);
            });
        } else if (event.key === 'Backspace') {
          proposedSolutions.value[numberOfTries.value - 1].pop();
        }
      });
    });

    return {
      seed,
      numberOfTries,
      maxNumberOfTries,
      proposedSolutions,
      statusOfProposedSolutions,
    };
  },
});
</script>
