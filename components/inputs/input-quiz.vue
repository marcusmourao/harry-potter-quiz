<template>
  <div
    :class="{'invalid': showInvalidClass, 'valid': showCorrectClass}"
    class="input__field"
  >
    <label :for="_uid">{{ question.title }}</label>
    <input
      :id="_uid"
      v-model="value"
      v-bind="$attrs"
      :name="_uid"
      type="text"
    >
    <span
      v-show="showInvalidClass || showCorrectClass"
      class="answer"
    >{{ question.answer }}</span>
    <div class="question__tips--container">
      <span
        v-show="showTip"
        class="tip"
      >{{ question.tip }}</span>
      <span
        v-show="!showTip"
        class="tip--trigger"
        @click="showQuestionTip()"
      >
        {{ $t('questions.show-tip') }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'input-quiz',
  props: {
    enableValidation: {
      type: Boolean,
      default: true,
    },
    question: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      value: '',
      showTip: false,
    };
  },
  computed: {
    showInvalidClass() {
      return this.enableValidation && !this.isAnswerCorrect;
    },
    showCorrectClass() {
      return this.enableValidation && this.isAnswerCorrect;
    },
    isAnswerCorrect() {
      return this.value === this.question.answer;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: 'emitInputValue',
    },
  },
  methods: {
    showQuestionTip() {
      this.showTip = true;
    },
    emitInputValue() {
      if (this.isAnswerCorrect) {
        this.$emit('input', this.value);
      } else {
        this.$emit('input', null);
      }
    },
  },
};
</script>
