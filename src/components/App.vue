<template>
  <div class="appContainer toCenter">
    <SeedForm v-if="!seedInputToken"></SeedForm>
    <ProposedSolutions v-show="seedInputToken"></ProposedSolutions>
    <CorrectAnswer v-if="seedInputToken"></CorrectAnswer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import SeedForm from './seed/SeedForm.vue';
import ProposedSolutions from './solution/ProposedSolutions.vue';
import CorrectAnswer from './answer/CorrectAnswer.vue';
import { emitter } from '../modules/emitter';

export default defineComponent({
  components: {
    SeedForm,
    ProposedSolutions,
    CorrectAnswer,
  },
  setup() {
    const seedInputToken = ref(false);

    onMounted(() => {
      emitter.on('seedIsSet', (): void => {
        seedInputToken.value = true;
      });
    });

    return {
      seedInputToken,
    };
  },
});
</script>

<style lang="scss">
.appContainer {
  height: 100vh;
}
</style>
