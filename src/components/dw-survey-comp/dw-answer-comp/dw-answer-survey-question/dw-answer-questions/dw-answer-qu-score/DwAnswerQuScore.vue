<template>
  <dw-qu-score-options v-model="survey" :index="index"></dw-qu-score-options>
</template>

<script>
import DwQuScoreOptions from './components/DwQuScoreOptions.vue'
export default {
  name: 'DwAnswerQuScore',
  components: {DwQuScoreOptions},
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
