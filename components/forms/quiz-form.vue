<template>
  <form @submit.prevent.stop="submitQuizAnswers()">
    <input-quiz
      v-for="(question, index) in questions"
      :key="index"
      v-model="answers[index]"
      :enable-validation="enableValidation"
      :question="question"
    />
    <div class="form__submit">
      <button type="submit">
        {{ $t('forms.submit') }}
      </button>
    </div>
  </form>
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
    return {answers, enableValidation: false};
  },
  methods: {
    calculateScore(answers) {
      let score = 0;
      answers.forEach((answer) => {
        if (answer) {
          score += 1;
        }
      });
      // eslint-disable-next-line
      console.log(score);
    },
    submitQuizAnswers() {
      this.enableValidation = true;
      this.calculateScore(this.answers);
    },
  },
};
</script>
