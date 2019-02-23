<template>
  <section>
    <h1>{{ quiz.title }}</h1>
  </section>
</template>
<script>
import QuizAPI from '@/api/QuizAPI';

export default {
  asyncData() {
    const quiz = QuizAPI.getQuizById('6f65a0a0-6160-435a-adb0-14825ef210f7');
    return {quiz};
  },
};
</script>
