<template>
  <div>
    <v-card v-for="(question, index) in forms" :key="index" class="mb-3" color="surface">
      <v-col cols="12">
        <v-select
          v-if="question.type === 'SELECT'"
          v-model="question.response"
          :label="question.question"
          :items="question.items"
          :item-text="item => (item.value)"
          :item-value="item => (item.id)"
          :multiple="!!question.multiple"
        />

        <v-autocomplete
          v-if="question.type === 'AUTOCOMPLETE'"
          v-model="question.response"
          :label="question.question"
          :items="question.items"
          :item-text="item => (item.value)"
          :item-value="item => (item.id)"
          item-color="surface"
          :multiple="!!question.multiple"
        />

        <v-combobox
          v-if="question.type === 'COMBOBOX'"
          v-model="question.response"
          :label="question.question"
          :items="question.items"
          :item-text="item => (item.value)"
          :item-value="item => (item.id)"
          :multiple="!!question.multiple"
          chips
        />

        <v-text-field
          v-if="question.type === 'INPUT'"
          v-model="question.response"
          :label="question.question"
        />

        <v-textarea
          v-if="question.type === 'TEXTAREA'"
          v-model="question.response"
          :label="question.question"
        />

        <v-container
          v-if="question.type === 'CHECKBOX'"
        >
          <p class="text-justify">
            {{ question.question }}
          </p>
          <v-checkbox
            v-for="(item) in question.items"
            :key="item"
            v-model="question.response"
            :label="item"
            :value="item"
          />
        </v-container>

        <v-container v-if="question.type === 'RADIOBUTTON'" class="px-0" fluid>
          <p class="text-justify">
            {{ question.question }}
          </p>
          <v-radio-group
            v-model="question.response"
          >
            <v-radio
              v-for="(item) in question.items"
              :key="item"
              v-model="question.response"
              :label="item"
              :value="item"
            />
          </v-radio-group>
        </v-container>

        <v-switch
          v-if="question.type === 'SWITCH'"
          v-model="question.response"
          :label="question.question"
        />
      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'DynamicForm',

  props: {
    forms: {
      type: Array,
      required: true
    }
  }
}
</script>
