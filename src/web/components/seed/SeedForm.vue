<template>
  <div class="text-center toCenter">
    <div class="mb-1">
      シード値({{ seedRange.min }}以上、{{
        seedRange.max
      }}以下の整数)を入力してください。
    </div>
    <span v-if="seedError && isInput" class="error">{{ seedError }}</span>
    <input
      type="number"
      v-model="seed"
      :min="seedRange.min"
      :max="seedRange.max"
      @input="isInput = true"
    />
    <button class="mt-3" type="button" @click="sendSeed">SUBMIT</button>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, defineComponent, ref } from 'vue';
import { emitter } from '../../../module/emitter';
import { apiCheckDigit, seedRange } from '../../../module/numberleConfig';
import Validation from '../../../module/Validation';
import { configApiUrl } from '../../../server/module/apiInformation';

export default defineComponent({
  setup() {
    const isInput = ref(false);
    const seed = ref<number | ''>('');
    const validation = new Validation<string>()
      .next(() => String(seed.value).length > 0, 'シード値を入力してください。')
      .next(
        () =>
          Number.isInteger(seed.value) &&
          Number(seed.value) >= seedRange.min &&
          Number(seed.value) <= seedRange.max,
        `シード値は${seedRange.min}以上、${seedRange.max}以下の整数としてください。`
      );
    const seedError = computed((): string => validation.result(''));

    const sendSeed = (): void => {
      if (seedError.value || typeof seed.value !== 'number') {
        isInput.value = true;
        return;
      }

      axios
        .post(
          `${configApiUrl}`,
          new URLSearchParams({
            seed: String(seed.value),
            checkDigit: String(apiCheckDigit(seed.value)),
          })
        )
        .then((response) => {
          if (!response.data.seedValid)
            throw new Error('シードが有効な値でありません。');

          emitter.emit('seedIsSet', Number(seed.value));
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
      seedRange,
    };
  },
});
</script>
