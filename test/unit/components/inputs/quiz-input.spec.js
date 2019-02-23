import {stub} from 'sinon';
import {shallowMount} from '@vue/test-utils';
import {localVue, i18n} from '@/test/local-vue/local-vue';
import InputQuiz from '@/components/inputs/input-quiz.vue';
import QUIZ_FIXTURES from '@/test/fixtures/quiz';

describe('Unit tests for password input', () => {
  let wrapper = null;
  const question = QUIZ_FIXTURES.questions[0];
  beforeEach(() => {
    wrapper = shallowMount(InputQuiz, {localVue, i18n, propsData: {question}});
  });
  it('Test if component renders as expected', () => {
    expect(wrapper.classes()).to.contain('input__field');
  });
  it('Test if component renders label correct', () => {
    const label = wrapper.find('label');
    expect(label.exists()).to.equal(true);
    expect(label.isVisible()).to.equal(true);
    expect(label.text()).to.equal(wrapper.vm.question.title);
  });
  it('Test if component renders input correct', () => {
    const input = wrapper.find('input');
    expect(input.exists()).to.equal(true);
    expect(input.isVisible()).to.equal(true);
    const inputAttributes = input.attributes();
    expect(inputAttributes.type).to.equal('text');
    expect(input.element.value).to.equal(wrapper.vm.value);
  });
  it('Test if component renders answer correct', () => {
    const span = wrapper.find('span.answer');
    expect(span.exists()).to.equal(true);
    expect(span.isVisible()).to.equal(true);
    expect(span.text()).to.equal(wrapper.vm.question.answer);
  });
  it('Test if component renders tip correct', () => {
    const spanTip = wrapper.find('span.tip');
    const spanTipTrigger = wrapper.find('span.tip--trigger');
    expect(spanTip.exists()).to.equal(true);
    expect(spanTipTrigger.exists()).to.equal(true);
    expect(spanTip.isVisible()).to.equal(false);
    expect(spanTipTrigger.isVisible()).to.equal(true);
    expect(spanTipTrigger.text()).to.equal(i18n.t('questions.show-tip'));
    spanTipTrigger.trigger('click');
    expect(spanTip.text()).to.equal(wrapper.vm.question.tip);
    expect(spanTip.isVisible()).to.equal(true);
    expect(spanTipTrigger.isVisible()).to.equal(false);
  });
  it('Test if changes on value emits inputs event', () => {
    const stubComponentEmit = stub(wrapper.vm, '$emit');
    wrapper.vm.value = wrapper.vm.question.answer;
    expect(stubComponentEmit.calledOnce).to.equal(true);
    expect(stubComponentEmit.getCall(0).args[0]).to.equal('input');
    expect(stubComponentEmit.getCall(0).args[1]).to.equal(wrapper.vm.question.answer);
    wrapper.vm.value = 'wrong answer';
    expect(stubComponentEmit.calledTwice).to.equal(true);
    expect(stubComponentEmit.getCall(1).args[0]).to.equal('input');
    expect(stubComponentEmit.getCall(1).args[1]).to.equal(null);
    wrapper.vm.$emit.restore();
  });
  it('Test if change resetForm reset inputs', () => {
    expect(wrapper.vm.resetForm).to.equal(false);
    wrapper.vm.value = 'test value';
    wrapper.vm.showTip = true;
    expect(wrapper.vm.value).to.equal('test value');
    wrapper.setProps({resetForm: true});
    expect(wrapper.vm.value).to.equal('');
    expect(wrapper.vm.showTip).to.equal(false);
  });
});
