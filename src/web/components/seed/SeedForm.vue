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
import axios from 'axios';
import { computed, defineComponent, ref } from 'vue';
import { emitter } from '../../../module/emitter';
import Validation from '../../../module/Validation';
import { apiUrl } from '../../../server/module/apiInformation';

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
      if (seedError.value) {
        isInput.value = true;
        return;
      }

      axios
        .post(
          `${apiUrl}/validateSeed`,
          new URLSearchParams({
            seed: String(seed.value),
          })
        )
        .then((response) => {
          if (!response.data.seedValid)
            throw new Error('シードが有効な値でありません。');
          else if (typeof seed.value !== 'number') {
            throw new Error('シードが有効な型でありません。');
          }

          emitter.emit('seedIsSet', seed.value);
        })
        .catch((error) => {
          console.log(error);
        });
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
