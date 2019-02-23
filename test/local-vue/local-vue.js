import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import {createLocalVue} from '@vue/test-utils';
import LocalesPT from '@/locales/pt-br';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);

localVue.i18n = new VueI18n({
  locale: 'pt-br', // TODO change hard coded to an efficient strategy
  fallbackLocale: 'pt-br',
  messages: {
    'pt-br': LocalesPT,
  },
});

localVue.$cookies = {
  get: () => {},
  set: () => {},
};

const {i18n} = localVue;

export {localVue, i18n};
