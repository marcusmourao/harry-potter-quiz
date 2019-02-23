import config from '@/config/quiz';
import QuizAPI from '@/api/QuizAPI';
import QUIZ_FIXTURES from '@/test/fixtures/quiz';

describe('Unit tests for Quiz API', () => {
  it('Test if method getQuizById access config on correct index', () => {
    expect(QuizAPI.getQuizById(QUIZ_FIXTURES.quizId)).to.equal(config[QUIZ_FIXTURES.quizId]);
  });
});
