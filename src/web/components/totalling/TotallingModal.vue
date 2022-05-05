<template>
  <div v-if="totallingForDisplay.length">
    <transition name="modal" appear>
      <div
        v-if="doesShowModal"
        class="modal d-block"
        tabindex="-1"
        role="dialog"
        @click.self="doesShowModal = false"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title">集計結果</div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="doesShowModal = false"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">挑戦回数</th>
                    <th scope="col">人数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="partOfTotalling in totallingForDisplay"
                    :key="`partOfTotalling-${partOfTotalling.count}`"
                  >
                    <td
                      :class="{
                        'font-weight-bold': partOfTotalling.doIInclude,
                      }"
                    >
                      {{ partOfTotalling.title }}
                    </td>
                    <td
                      :class="{
                        'font-weight-bold': partOfTotalling.doIInclude,
                      }"
                    >
                      {{ partOfTotalling.count }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, defineComponent, ref } from 'vue';
import { emitter } from '../../../module/emitter';
import {
  apiCheckDigit,
  totallingType,
  totallingForDisplayType,
} from '../../../module/numberleConfig';
import { apiUrl } from '../../../server/module/apiInformation';

export default defineComponent({
  props: {
    seed: Number,
    maxNumberOfTries: Number,
  },
  setup(props) {
    const totalling = ref<totallingType[]>([]);
    const doesShowModal = ref(true);
    const numberOfTriesWhenCleared = ref(0);

    const totallingForDisplay = computed((): totallingForDisplayType[] =>
      totalling.value.map(
        (partOfTotalling): totallingForDisplayType => ({
          title: partOfTotalling.numberOfTries
            ? partOfTotalling.numberOfTries
            : '未クリア',
          count: partOfTotalling.count,
          doIInclude:
            partOfTotalling.numberOfTries === numberOfTriesWhenCleared.value,
        })
      )
    );

    emitter.on('appIsClosed', (givenNumberOfTriesWhenCleared): void => {
      if (props.seed === undefined)
        throw new Error('シード入力済みですがシードが空です。');

      numberOfTriesWhenCleared.value = givenNumberOfTriesWhenCleared;

      axios
        .post(
          `${apiUrl}/totalling`,
          new URLSearchParams({
            seed: String(props.seed),
            checkDigit: String(apiCheckDigit(props.seed)),
          })
        )
        .then((response) => {
          if (props.maxNumberOfTries === undefined)
            throw new Error('最大入力回数の値が空です。');

          totalling.value = [...Array(props.maxNumberOfTries + 1).keys()].map(
            (numberOfTries): totallingType =>
              response.data.totalling.find(
                (partOfTotalling: totallingType): boolean =>
                  partOfTotalling.numberOfTries === numberOfTries
              ) ?? {
                numberOfTries,
                count: 0,
              }
          );
        })
        .catch((error) => console.log(error));
    });

    return {
      totallingForDisplay,
      doesShowModal,
      numberOfTriesWhenCleared,
    };
  },
});
</script>

<style lang="scss">
.modal {
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-leave-active,
.modal-enter-active {
  transition: all 0.5s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
