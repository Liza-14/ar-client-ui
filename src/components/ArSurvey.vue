<template>
  <div class="survey-container">
    <div class="survey">
      <div class="survey-task" v-if="questions.length">
        <div class="survey-task-text">{{questions[0].text}}</div>
        <button
          v-for="(o, k) in questions[0].options" :key="k"
          class="btn btn-secondary"
          @click="applyMatchParameter(o.match)">
            {{o.text}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArSurvey',
  props: ['id', 'survey'],
  emits: ['complete'],
  data() {
    return {
      matchParameters: {},
      questions: [],
    };
  },
  created() {
    this.questions = [...this.survey.questions];
  },
  methods: {
    applyMatchParameter(matchParameter) {
      const index = matchParameter.indexOf(':');

      if (index !== -1) {
        const paramName = matchParameter.substring(0, index);
        const paramValue = Number.parseInt(matchParameter.substring(index + 1).trim(), 10);
        this.matchParameters[paramName] = paramValue;
      }

      this.questions.shift();

      if (this.questions.length === 0) {
        this.$emit('complete', this.matchParameters);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.survey-container {
  position: absolute;
  z-index: 3;
  left: 0;
  right: 0;
  bottom: 50px;
  margin: 0 auto;
  padding: 25px;
}
.survey {
  margin: 0 auto;
  background-color: whitesmoke;
  border-radius: 20px;
  padding: 20px;
}

.survey-task-text{
  font-size: 18pt;
}
</style>
