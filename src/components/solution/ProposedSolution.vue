<template>
  <div class="d-flex">
    <Character
      v-for="characterNo of maxNumberOfInput"
      :key="`character${characterNo}`"
      :character="proposedSolution[characterNo - 1] ?? ''"
      :statusOfCharacter="statusOfProposedSolution[characterNo - 1] ?? ''"
    ></Character>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Character from './Character.vue';
import { maxNumberOfInput } from '../../modules/numberleModule';
import axios from 'axios';
import { apiPort } from '../../api/apiInformation';
import { emitter } from '../../modules/emitter';

export default defineComponent({
  components: {
    Character,
  },
  props: {
    isActive: Boolean,
    seed: Number,
  },
  setup(props) {
    const proposedSolution = ref<string[]>([]);
    const statusOfProposedSolution = ref<string[]>([]);

    onMounted(() => {
      window.addEventListener('keydown', (event): void => {
        if (!props.isActive) return;
        if (
          !isNaN(Number(event.key)) &&
          proposedSolution.value.length < maxNumberOfInput
        ) {
          proposedSolution.value.push(event.key);
        } else if (
          event.key === 'Enter' &&
          proposedSolution.value.length === maxNumberOfInput
        ) {
          axios
            .post(
              `http://localhost:${apiPort}/collation`,
              new URLSearchParams({
                seed: String(props.seed),
                proposedSolution: proposedSolution.value.join(''),
              }),
              {
                withCredentials: false,
              }
            )
            .then((response) => {
              statusOfProposedSolution.value = response.data;
              emitter.emit('proposedSolutionIsSent');
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (event.key === 'Backspace') {
          proposedSolution.value.pop();
        }
      });
    });

    return {
      maxNumberOfInput,
      proposedSolution,
      statusOfProposedSolution,
    };
  },
});
</script>
