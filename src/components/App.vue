<template>
  <div>
    <SeedForm v-if="!seedInputToken"></SeedForm>
    <Character v-if="seedInputToken"></Character>
    <CorrectAnswer v-if="seedInputToken"></CorrectAnswer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SeedForm from './seed/SeedForm.vue';
import Character from './solution/Character.vue';
import CorrectAnswer from './answer/CorrectAnswer.vue';

export default defineComponent({
  components: {
    SeedForm,
    Character,
    CorrectAnswer,
  },
  setup() {
    const seedInputToken = ref(false);

    return {
      seedInputToken,
    };
  },
});
</script>
