<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>主页</h2>
    <ul>
      
      <!--<li><router-link to="/video1" class="nav-link">video1</router-link></li>-->
      <li><router-link to="/videoUpload" class="nav-link">上传视频</router-link></li>
      <li><router-link to="/videoList" class="nav-link">视频列表</router-link></li>
    </ul>
  </div>
</template>

<script>

	
export default {
  name: 'freeMovie',
  data () {
    return {
      msg: 'freeMovie'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
