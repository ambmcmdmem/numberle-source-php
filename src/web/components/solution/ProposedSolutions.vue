<template>
  <div v-if="seed" class="w-75 h-75 d-flex flex-column justify-content-between">
    <ProposedSolution
      v-for="proposedSolutionNo in maxNumberOfTries"
      :key="`proposedSolution${proposedSolutionNo - 1}`"
      :proposedSolution="proposedSolutions[proposedSolutionNo - 1]"
      :statusOfProposedSolution="
        statusOfProposedSolutions[proposedSolutionNo - 1]
      "
      :maxNumberOfInput="maxNumberOfInput"
    ></ProposedSolution>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import {
  StatusOfProposedSolutionType,
  apiCheckDigit,
} from '../../../module/numberleConfig';
import ProposedSolution from './ProposedSolution.vue';
import axios from 'axios';
import { emitter } from '../../../module/emitter';
import { apiUrl } from '../../../server/module/apiInformation';

export default defineComponent({
  components: {
    ProposedSolution,
  },
  props: {
    seed: {
      type: Number,
      required: true,
    },
    maxNumberOfTries: {
      type: Number,
      required: true,
    },
    maxNumberOfInput: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    axios.defaults.withCredentials = false;

    const keyValidation = ref(true);
    const numberOfTries = ref(1);
    const proposedSolutions = ref<string[][]>(
      [...Array(props.maxNumberOfTries)].map(() => [])
    );
    const nowProposedSolution = computed(
      (): string[] => proposedSolutions.value[numberOfTries.value - 1]
    );
    const statusOfProposedSolutions = ref<StatusOfProposedSolutionType[][]>(
      [...Array(props.maxNumberOfTries)].map(() => [])
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
    const isProposedSolutionCorrect = computed((): boolean =>
      nowStatusOfProposedSolutions.value.every(
        (statusOfProposedSolution): boolean =>
          statusOfProposedSolution === 'correct'
      )
    );
    const parametersAboutSeed = computed(
      (): {
        seed: string;
        checkDigit: string;
      } => ({
        seed: String(props.seed),
        checkDigit: String(apiCheckDigit(props.seed)),
      })
    );

    const numberOfTriesWhenCleared = computed((): number =>
      isProposedSolutionCorrect.value ? numberOfTries.value : 0
    );

    onMounted(() => {
      window.addEventListener('keydown', (event): void => {
        if (!keyValidation.value) return;

        if (
          !isNaN(Number(event.key)) &&
          nowProposedSolution.value.length < props.maxNumberOfInput
        ) {
          nowProposedSolution.value.push(event.key);
        } else if (event.key === 'Backspace') {
          nowProposedSolution.value.pop();
        } else if (
          event.key === 'Enter' &&
          nowProposedSolution.value.length === props.maxNumberOfInput
        ) {
          keyValidation.value = false;
          axios
            .post(
              `${apiUrl}/collation`,
              new URLSearchParams({
                ...parametersAboutSeed.value,
                ...{ proposedSolution: nowProposedSolution.value.join('') },
              })
            )
            .then((response): void => {
              nowStatusOfProposedSolutions.value = response.data.collation;

              if (
                isProposedSolutionCorrect.value ||
                numberOfTries.value === props.maxNumberOfTries
              ) {
                axios
                  .post(
                    `${apiUrl}/answer`,
                    new URLSearchParams({
                      ...parametersAboutSeed.value,
                      ...{
                        numberOfTries: String(numberOfTriesWhenCleared.value),
                      },
                    })
                  )
                  .then((response): void => {
                    emitter.emit(
                      'correctAnswerIsSent',
                      String(response.data.answer)
                    );
                    emitter.emit('appIsClosed', numberOfTriesWhenCleared.value);
                  })
                  .catch((error): void => console.log(error));
              } else {
                numberOfTries.value++;
                keyValidation.value = true;
              }
            })
            .catch((error): void => console.log(error));
        }
      });
    });

    return {
      proposedSolutions,
      statusOfProposedSolutions,
    };
  },
});
</script>
