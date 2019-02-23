<template>
  <form @submit.prevent.stop="submitQuizAnswers()">
    <input-quiz
      v-for="(question, index) in questions"
      :key="index"
      v-model="answers[index]"
      :question="question"
    />
    <div class="form__submit">
      <button @click="submitQuizAnswers()">
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
    return {answers};
  },
  methods: {
    submitQuizAnswers() {},
  },
};
</script>
