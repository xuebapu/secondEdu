<template>
  <div>
    <div v-html="payGateWay">
    
    </div>
  </div>
</template>

<script>
  export default {
    data(){return{
      payGateWay:''
    }},
     mounted () {
            let form = this.$route.query.htmlData
            this.payGateWay = form
            console.log(this.payGateWay)
            this.$nextTick(()=> {
             document.forms[0].submit()
            })
        }

  }
</script>

<style scoped>

</style>