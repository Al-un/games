import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import VueRouter from 'vue-router';

import LayoutPage from '@/layouts/LayoutPage.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

let wrapper: Wrapper<LayoutPage>;

describe('LayoutPage', () => {
  beforeEach(() => {
    wrapper = shallowMount(LayoutPage, { localVue, router });
  });

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('has a #page-container', () => {
    const test = wrapper.find('#page-container');
    expect(test.exists()).toBeTruthy();
  });

  test('has a #page-container > #main-header', () => {
    const test = wrapper.find('#page-container > #main-header');
    expect(test.exists()).toBeTruthy();
  });

  test('has a #page-container > main with .container', () => {
    const test = wrapper.find('#page-container > main');
    expect(test.exists()).toBeTruthy();
    expect(test.find('.container').exists()).toBeTruthy();
  });
  
  test('has a #page-container > #main-footer', () => {
    const test = wrapper.find('#page-container > #main-footer');
    expect(test.exists()).toBeTruthy();
  });
});
