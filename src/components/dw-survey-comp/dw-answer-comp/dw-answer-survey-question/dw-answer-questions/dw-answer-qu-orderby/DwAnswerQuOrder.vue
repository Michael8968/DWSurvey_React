<template>
  <dw-qu-order-options v-model="survey" :index="index"></dw-qu-order-options>
</template>

<script>

import DwQuOrderOptions from './components/DwQuOrderOptions'

export default {
  name: 'DwAnswerQuOrder',
  components: {DwQuOrderOptions},
  model: {
    prop: 'survey',
    event: 'update-survey'
  },
  props: {
    index: {type: Number, default: 0},
    survey: {type: Object, default: () => {}},
    answer: {type: Object, default: () => {}}
  }
}
</script>
