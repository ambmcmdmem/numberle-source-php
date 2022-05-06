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
                    v-for="(
                      oneOfTotalling, oneOfTotallingNo
                    ) in totallingForDisplay"
                    :key="`oneOfTotalling-${oneOfTotallingNo}`"
                  >
                    <td
                      :class="{
                        'font-weight-bold': oneOfTotalling.isResultOfThisTime,
                      }"
                    >
                      {{ oneOfTotalling.title }}
                    </td>
                    <td
                      :class="{
                        'font-weight-bold': oneOfTotalling.isResultOfThisTime,
                      }"
                    >
                      {{ oneOfTotalling.count }}
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
import { apiCheckDigit } from '../../../module/numberleConfig';
import { apiUrl } from '../../../server/module/apiInformation';

type totallingType = {
  count: number;
  numberOfTries: number;
};
type totallingForDisplayType = {
  isResultOfThisTime: boolean;
  title: number | '未クリア';
  count: number;
};

export default defineComponent({
  props: {
    seed: {
      type: Number,
      required: true,
    },
    maxNumberOfTries: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const totalling = ref<totallingType[]>([]);
    const doesShowModal = ref(true);
    const resultOfThisTime = ref(0);

    const totallingForDisplay = computed((): totallingForDisplayType[] =>
      totalling.value.map(
        (oneOfTotalling): totallingForDisplayType => ({
          title: oneOfTotalling.numberOfTries
            ? oneOfTotalling.numberOfTries
            : '未クリア',
          count: oneOfTotalling.count,
          isResultOfThisTime:
            oneOfTotalling.numberOfTries === resultOfThisTime.value,
        })
      )
    );

    emitter.on('appIsClosed', (givenResultOfThisTime): void => {
      resultOfThisTime.value = givenResultOfThisTime;

      axios
        .post(
          `${apiUrl}/totalling`,
          new URLSearchParams({
            seed: String(props.seed),
            checkDigit: String(apiCheckDigit(props.seed)),
          })
        )
        .then((response) => {
          totalling.value = [...Array(props.maxNumberOfTries + 1).keys()].map(
            (numberOfTries): totallingType =>
              response.data.totalling.find(
                (oneOfTotalling: totallingType): boolean =>
                  oneOfTotalling.numberOfTries === numberOfTries
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
