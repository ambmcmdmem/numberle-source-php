<template>
  <div class="d-flex justify-content-around">
    <Character
      v-for="characterNo in maxNumberOfInput"
      :key="`character${characterNo - 1}`"
      :character="proposedSolution[characterNo - 1] ?? ''"
      :statusOfCharacter="statusOfProposedSolution[characterNo - 1] ?? ''"
    ></Character>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Character from './Character.vue';
import { StatusOfProposedSolutionType } from '../../../module/numberleConfig';

export default defineComponent({
  props: {
    proposedSolution: {
      type: Array as PropType<string[]>,
      required: true,
    },
    statusOfProposedSolution: {
      type: Array as PropType<StatusOfProposedSolutionType[]>,
      required: true,
    },
    maxNumberOfInput: {
      type: Number,
      required: true,
    },
  },
  components: {
    Character,
  },
});
</script>
