<template>
  <dw-qu-radio-options v-model="survey" :index="index"></dw-qu-radio-options>
</template>

<script>
import DwQuRadioOptions from './components/DwQuRadioOptions'
export default {
  name: 'DwAnswerQuRadio',
  components: {DwQuRadioOptions},
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
