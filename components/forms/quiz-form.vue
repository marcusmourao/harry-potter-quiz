<template>
  <div>
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
        <button type="submit">
          {{ $t('forms.submit') }}
        </button>
      </div>
    </form>
    <div v-if="formSubmitted">
      <button @click="resetForm()">
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
