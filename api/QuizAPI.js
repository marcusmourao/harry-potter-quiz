import config from '@/config/quiz';

class QuizAPI {
  static getQuizById(id) {
    return config[id];
  }
}

export default QuizAPI;
