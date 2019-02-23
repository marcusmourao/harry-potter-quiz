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
    >{{ $t('forms.answer') }}: {{ question.answer }}</span>
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
    resetForm: {
      type: Boolean,
      default: false,
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
    resetForm() {
      if (this.resetForm) {
        this.value = '';
        this.showTip = false;
      }
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

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";
  .input__field {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    label {
      margin: 5px;
    }

    input {
      outline: none;
      display: block;
      border-radius: 10px;
      background-color: $white-color;
      border: solid 2px $grey-color;
      resize: vertical;
      padding: 5px 10px;
      font-family: $font;
      font-size: $font-small;
      color: $dark-color;
      line-height: 1.5;
      box-sizing: border-box;
      height: auto;
      transition: 0.25s;
      width: 100%;

      &:focus {
        border: solid 2px $standard-color;
      }
    }

    span.answer {
      margin: 5px;
      font-size: $font-x-small;
    }
    span.tip {
      color: $grey-color;
      font-size: $font-x-small;
    }
  }
  .input__field.invalid {
    @extend .input__field;
    input {
      border: 2px solid $error-color;
    }
    label, span.answer {
      color: $error-color;
    }
  }
  .input__field.valid {
    @extend .input__field;
    input {
      border: 2px solid $success-color;
    }
    label, span.answer {
      color: $success-color;
    }
  }

  .question__tips--container {
    display: flex;
    justify-content: flex-end;
    span {
      color: $grey-color;
      font-family: $font;
      font-size: $font-x-small;
      margin: 5px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .input__field.valid,
  .input__field.invalid {
    .question__tips--container {
      display: none;
    }
  }
</style>
