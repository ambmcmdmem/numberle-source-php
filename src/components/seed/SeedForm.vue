<template>
  <div>
    <div>シード値(数値)を入力してください</div>
    <span v-if="seedError" class="error">{{ seedError }}</span>
    <input type="number" name="seed" v-model="seed" @input="test" required />
    <button type="submit" @click="sendSeed">SUBMIT</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import axios from 'axios';
import { apiPort } from '../../api/apiInformation';

const ensure = <T>(argument: T | undefined | null): T => {
  if (argument === undefined || argument === null)
    throw new Error('引数がnullもしくはundefinedになっています。');

  return argument;
};
const doesFallForValidation = (target: {
  validation: () => boolean;
}): boolean => !target.validation();

export default defineComponent({
  setup() {
    const seed = ref<number | ''>('');
    const validationAndErrors = [
      {
        validation: () => String(seed.value).length > 0,
        error: 'シード値を入力してください。',
      },
      {
        validation: () => Number.isInteger(seed.value),
        error: 'シード値を整数としてください。',
      },
    ];
    const seedError = computed((): string =>
      validationAndErrors.some(doesFallForValidation)
        ? ensure(validationAndErrors.find(doesFallForValidation)).error
        : ''
    );

    const sendSeed = (): void => {
      if (seedError.value) return;

      axios
        .post(
          'http://localhost:' + apiPort + '/setAnswer/',
          new URLSearchParams({
            seed: String(seed.value),
          }),
          {
            withCredentials: false,
          }
        )
        .then((response) => {
          console.log(String(seed.value));
          console.log(response);
        })
        .catch((error) => console.log(error));
    };

    return {
      seed,
      sendSeed,
      seedError,
    };
  },
});
</script>
