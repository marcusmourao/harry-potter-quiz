import {spy} from 'sinon';
import {shallowMount} from '@vue/test-utils';
import IndexPage from '@/pages/index.vue';
import QUIZ_FIXTURES from '@/test/fixtures/quiz';
import QuizAPI from '@/api/QuizAPI';

const mockQuiz = {title: QUIZ_FIXTURES.title, questions: QUIZ_FIXTURES.questions};

describe('Unit test for index page', () => {
  it('Test if page request QuizById on asyncData', () => {
    const stubGetQuizById = spy(QuizAPI, 'getQuizById');
    const data = IndexPage.asyncData();
    expect(stubGetQuizById.calledOnce).to.equal(true);
    expect(stubGetQuizById.getCall(0).args[0]).to.equal(QUIZ_FIXTURES.quizId);
    expect(data.quiz).to.eql(mockQuiz);
    QuizAPI.getQuizById.restore();
  });
  describe('Unit tests for mounted page', () => {
    let wrapper = null;
    beforeEach(() => {
      IndexPage.data = () => ({quiz: mockQuiz});
      wrapper = shallowMount(IndexPage);
    });
    it('Test if page renders correct title correct', () => {
      const h1Tag = wrapper.find('h1');
      expect(h1Tag.exists()).to.equal(true);
      expect(h1Tag.isVisible()).to.equal(true);
      expect(h1Tag.text()).to.equal(QUIZ_FIXTURES.title);
    });
    it('Test if page renders quiz form as expected', () => {
      const quizForm = wrapper.find({name: 'quiz-form'});
      expect(quizForm.exists()).to.equal(true);
      expect(quizForm.attributes().questions).to.eql(QUIZ_FIXTURES.questions);
    });
  });
});
