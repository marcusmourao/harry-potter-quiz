<template>
  <section class="container">
    <h1>{{ quiz.title }}</h1>
    <quiz-form :questions="quiz.questions" />
  </section>
</template>
<script>
import QuizAPI from '@/api/QuizAPI';
import QuizForm from '@/components/forms/quiz-form.vue';

export default {
  components: {QuizForm},
  asyncData() {
    const quiz = QuizAPI.getQuizById('6f65a0a0-6160-435a-adb0-14825ef210f7');
    return {quiz};
  },
};
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    margin: 0 auto;
    max-width: 500px;
  }
</style>
