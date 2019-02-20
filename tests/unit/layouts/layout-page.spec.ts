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

  test('has a #main-container', () => {
    const test = wrapper.find('#main-container');
    expect(test.exists()).toBeTruthy();
  });

  test('has a #main-container > #main-header', () => {
    const test = wrapper.find('#main-container > #main-header');
    expect(test.exists()).toBeTruthy();
  });

  test('has a #main-container > main with .container', () => {
    const test = wrapper.find('#main-container > main');
    expect(test.exists()).toBeTruthy();
    expect(test.find('.container').exists()).toBeTruthy();
  });
  
  test('has a #main-container > #main-footer', () => {
    const test = wrapper.find('#main-container > #main-footer');
    expect(test.exists()).toBeTruthy();
  });
});
