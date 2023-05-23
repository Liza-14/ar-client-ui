<template>
  <div class="title">Create Survey</div>
  <div class="questionList">
    <div v-for="(q, index) in survey.questions" :key="index">
      <div class="title">{{index + 1}}) {{q.text }}</div>
      <button v-for="(o, i) in q.options" :key="i" class="btn btn-secondary" style="width: 90%;">
        {{o.text}}
      </button>
      <br/>
    </div>
  </div>
  <form class="form" v-if="survey.questions.length">
    <label for="option">Option:</label>
    <input type="text" id="option" placeholder="Option text" v-model="optionForm.text">
    <label for="match">Match with:</label>
    <input type="text" id="match" placeholder="Match parameter" v-model="optionForm.match">
    <div class="tip">
      Match parameters:
      <li>videoId (e.g 'videoId: 1')</li>
      <li>speedRate(e.g 'speedRate: 2')</li>
    </div>
    <button type="button" class="btn" @click="addOption()">Add option</button>
  </form>
  <form class="form">
    <label for="question">Question</label>
    <input type="text" id="question" placeholder="Question text" v-model="question">
    <button type="button" class="btn" @click="addQuestion()">Add</button>
  </form>
  <button type="button" class="btn" @click="createSurvey()">Create</button>
</template>

<script>
export default {
  name: 'CreateSurveyPage',
  props: ['pictureId'],
  data() {
    return {
      question: '',
      optionForm: {
        text: '', match: '',
      },
      survey: { pictureId: this.pictureId, exhibitionId: this.$route.query.exhibitionId, questions: [] },
    };
  },
  methods: {
    addQuestion() {
      this.survey.questions.push({ text: this.question, options: [] });
    },
    addOption() {
      this.survey.questions[this.survey.questions.length - 1].options.push({ text: this.optionForm.text, match: this.optionForm.match });
    },
    createSurvey() {
      this.survey.exhibitionId = this.$route.query.exhibitionId;
      this.$store.dispatch('createSurvey', this.survey)
        .then(() => this.$router.back())
        .catch((e) => this.$alert(e, 'Error'));
    },
  },
};
</script>

<style scoped>
.form {
  display: block;
  width: 85%;
  margin: 0 auto;
  margin-top: 20px;
}

.tip {
  text-align: left;
  width: 300px;
  margin: 0 auto;
  color: grey
}
</style>
