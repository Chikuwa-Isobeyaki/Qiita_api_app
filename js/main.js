const app = Vue.createApp({
  data: () =>({
    items: null,
    keyword: '',
    message: ''
  }),

  watch: {
    keyword: function(newKeyword, oldKeyword) {
      console.log(newKeyword)
      this.message = "Waiting for you stop typing..."
      // lodash.jsのdebounceメソッドでkeywordが変化する度にリクエストを送るのを防ぐ
      this.debouncedGetAnswer()
    }

  },

  mounted: function() {
    // this.keyword = 'JavaScript'
    // this.getAnswer()
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
  },

  methods: {
    getAnswer: function() {

      if(this.keyword === '') {
        this.items = null
        return
      }

      this.message = 'Loading...'
      const vm = this
      const params = { page: 1, per_page: 20, query: this.keyword}
      axios.get('https://qiita.com/api/v2/items', { params })

      // thenはサーバーからデータが帰ってきた際に呼び出されるメソッドである
      .then(function(response){
        // console.log(response)
        vm.items = response.data
      })

      .catch(function(error) {
        vm.message = 'Error' + error
      })

      .finally(function() {
        vm.message = ''
      })


    }

  }
})

app.mount('#app')


