<template>
  <div
    class="character toCenter font-weight-bold"
    :class="statusOfCharacter"
    style="font-size: 1.3rem"
  >
    {{ character }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    character: {
      type: String,
      required: true,
    },
    statusOfCharacter: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>
