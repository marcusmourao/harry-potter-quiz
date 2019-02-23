<template>
  <div class="display__form--container">
    <form @submit.prevent.stop="submitQuizAnswers()">
      <input-quiz
        v-for="(question, index) in questions"
        :key="index"
        v-model="answers[index]"
        :disabled="formSubmitted"
        :enable-validation="enableValidation"
        :question="question"
        :reset-form="resetFormData"
      />
      <div
        v-show="!formSubmitted"
        class="form__submit"
      >
        <button
          class="button__submit"
          type="submit"
        >
          {{ $t('forms.submit') }}
        </button>
      </div>
    </form>
    <div
      v-if="formSubmitted"
      class="form__result"
    >
      <button
        class="button__submit retry"
        @click="resetForm()"
      >
        {{ $t('quiz.play-again') }}
      </button>
      <span>{{ $tc('score', score) }}</span>
    </div>
  </div>
</template>

<script>
import InputQuiz from '@/components/inputs/input-quiz.vue';

export default {
  name: 'quiz-form',
  components: {InputQuiz},
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    const answers = this.questions.map(() => '');
    return {
      answers,
      enableValidation: false,
      resetFormData: false,
      formSubmitted: false,
      score: 0,
    };
  },
  methods: {
    resetForm() {
      this.enableValidation = false;
      this.resetFormData = true;
      this.formSubmitted = false;
      this.score = 0;
    },
    calculateScore(answers) {
      let score = 0;
      answers.forEach((answer) => {
        if (answer) {
          score += 1;
        }
      });
      this.score = score;
    },
    submitQuizAnswers() {
      this.resetFormData = false;
      this.enableValidation = true;
      this.formSubmitted = true;
      this.calculateScore(this.answers);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";

  @mixin transition($mode, $time) {
    -webkit-transition: $mode $time;
    -moz-transition: $mode $time;
    -ms-transition: $mode $time;
    -o-transition: $mode $time;
    transition: $mode $time;
  }
  .button__submit {
    padding: 10px;
    background-color: $success-color;
    border-radius: 10px;
    color: $white-color;
    font-family: $font;
    font-size: $font-small;
    text-align: center;
    margin: 10px;
    outline: none;
    cursor: pointer;
    align-self: center;
    border: none;
    min-width: 200px;
    @include transition(all, 0.25s);

    &:hover {
      background-color: lighten($success-color, 10%);
    }
  }
  .button__submit.retry {
    background-color: $middle-color;
    color: $white-color;
    &:hover {
      background-color: lighten($middle-color, 10%);
    }
  }
  .form__submit,.form__result {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
</style>
