import {stub} from 'sinon';
import {shallowMount} from '@vue/test-utils';
import {localVue, i18n} from '@/test/local-vue/local-vue';
import QuizForm from '@/components/forms/quiz-form.vue';
import QUIZ_FIXTURES from '@/test/fixtures/quiz';

describe('Unit tests for quiz-form', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallowMount(QuizForm, {
      localVue,
      i18n,
      propsData: {questions: QUIZ_FIXTURES.questions},
    });
  });
  it('Test if component has correct props', () => {
    expect(wrapper.vm.questions).to.eql(QUIZ_FIXTURES.questions);
  });
  it('Test if component render questions correct', () => {
    const questions = wrapper.findAll({name: 'input-quiz'});
    expect(questions.length).to.equal(wrapper.vm.questions.length);
    for (let i = 0; i < questions.length; i += 1) {
      expect(questions.at(i).vm.question).to.eql(wrapper.vm.questions[i]);
    }
  });
  it('Test if form submit calls submitQuizAnswers', () => {
    const stubSubmitAnswer = stub(wrapper.vm, 'submitQuizAnswers');
    wrapper.trigger('submit');
    expect(stubSubmitAnswer.calledOnce).to.equal(true);
    wrapper.vm.submitQuizAnswers.restore();
  });
  it('Test if component renders submit button correct', () => {
    const button = wrapper.find('.form__submit button');
    expect(button.exists()).to.equal(true);
    expect(button.text()).to.equal(i18n.t('forms.submit'));
  });
  it('Test if submit button calls submitQuizAnswers', () => {
    const stubSubmitAnswer = stub(wrapper.vm, 'submitQuizAnswers');
    const button = wrapper.find('.form__submit button');
    button.trigger('click');
    expect(stubSubmitAnswer.calledOnce).to.equal(true);
    wrapper.vm.submitQuizAnswers.restore();
  });
  it('Test if data \'answers\' is generated as expected', () => {
    wrapper.vm.questions.forEach((question, index) => {
      expect(wrapper.vm.answers[index]).to.equal('');
    });
  });
  it('Test if each input-question bind answer correct', () => {
    const inputFields = wrapper.findAll({name: 'quiz-input'});
    for (let i = 0; i < inputFields.length; i += 1) {
      expect(wrapper.vm.answers[i]).to.equal('');
      inputFields.at(i).vm.$emit('input', i);
      expect(wrapper.vm.answers[i]).to.equal(`${i}`);
    }
  });
  it('Test if method submitQuizAnswers enables validation', () => {
    expect(wrapper.vm.enableValidation).to.equal(false);
    wrapper.vm.submitQuizAnswers();
    expect(wrapper.vm.enableValidation).to.equal(true);
  });
  it('Test if method submitQuizAnswers calls calculateScore', () => {
    const stubCalculateScore = stub(wrapper.vm, 'calculateScore');
    wrapper.vm.submitQuizAnswers();
    expect(stubCalculateScore.calledOnce).to.equal(true);
    expect(stubCalculateScore.getCall(0).args[0]).to.equal(wrapper.vm.answers);
    wrapper.vm.calculateScore.restore();
  });
  it('Test if method calculateScore return expected value', () => {
    expect(wrapper.vm.calculateScore([])).to.equal(0);
    expect(wrapper.vm.calculateScore([null, null, null])).to.equal(0);
    expect(wrapper.vm.calculateScore([null, 'correct', null])).to.equal(1);
  });
  it('Test if method resetForm set correct data', () => {
    wrapper.vm.enableValidation = true;
    wrapper.vm.resetFormData = false;
    wrapper.vm.formSubmitted = true;
    wrapper.vm.formSubmitted = 5;
    wrapper.vm.resetForm();
    expect(wrapper.vm.enableValidation).to.equal(false);
    expect(wrapper.vm.resetFormData).to.equal(true);
    expect(wrapper.vm.formSubmitted).to.equal(false);
    expect(wrapper.vm.score).to.equal(0);
  });
});
