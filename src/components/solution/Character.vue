<template>
  <div class="character" :class="statusOfCharacter">
    {{ character }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  props: {
    character: String,
    statusOfCharacter: String,
  },
  setup() {},
});
</script>
