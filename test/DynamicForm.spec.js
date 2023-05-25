import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import DynamicForm from '@/components/DynamicForm.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()

describe('DynamicForm', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('renderiza correctamente dependiendo de la cantidad de preguntas del formulario', () => {
    const wrapper = mount(DynamicForm, {
      localVue,
      vuetify,
      propsData: {
        forms: [
          {
            question: '¿Es importante trabajar en Kuantas?',
            type: 'SELECT',
            items: [
              { id: 1, value: 'SI' },
              { id: 2, value: 'NO' },
              { id: 3, value: 'QUIZAS' }
            ],
            response: ''
          },
          {
            question: '¿Por qué deberiamos contratarte?',
            type: 'INPUT',
            response: ''
          },
          {
            question: '¿Por qué deberiamos contratarte?',
            type: 'CHECKBOX',
            items: ['SI', 'No'],
            response: ''
          }
        ]
      }
    })

    const items = wrapper.findAllComponents('.mb-3.v-card.surface')
    expect(items).toHaveLength(3)
  })
})
