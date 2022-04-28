<template>
  <div class="text-center toCenter">
    <div class="mb-1">
      シード値(0より大きい1000以下の整数)を入力してください。
    </div>
    <span v-if="seedError && isInput" class="error">{{ seedError }}</span>
    <input type="number" v-model="seed" min="1" @input="isInput = true" />
    <button class="mt-3" type="button" @click="sendSeed">SUBMIT</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { emitter } from '../../../module/emitter';
import Validation from '../../../module/Validation';

export default defineComponent({
  setup() {
    const isInput = ref(false);
    const seed = ref<number | ''>('');
    const validation = new Validation<string>()
      .next(() => String(seed.value).length > 0, 'シード値を入力してください。')
      .next(
        () =>
          Number.isInteger(seed.value) &&
          Number(seed.value) > 0 &&
          Number(seed.value) <= 1000,
        'シード値は0より大きく、1000以下の整数としてください。'
      );
    const seedError = computed((): string => validation.result(''));

    const sendSeed = (): void => {
      if (seedError.value || typeof seed.value !== 'number') {
        isInput.value = true;
        return;
      }

      emitter.emit('seedIsSet', seed.value);
    };

    return {
      seed,
      sendSeed,
      seedError,
      isInput,
    };
  },
});
</script>
