<template>
  <div class="videoList">
    <h1>{{ msg }}</h1>
    <h1>{{ num }}</h1>
    <ul>
      <li v-for="value in object">
	    {{ value }}
	  </li>
    </ul>
    <ul v-for="video in videos">
      <li >
	    电影
	    {{ video.id }}
	    {{ video.name }} 
	  </li>
    </ul>
    <button v-on:click="item">获取列表</button>
  </div>
</template>

<script>
	const axios = require('axios');
	
	export default {
	  name: 'videoList',
	  data () {
	    return {
	      	msg: 'videoList',
	      	object: {
		      title: 'How to do lists in Vue',
		      author: 'Jane Doe',
		      publishedAt: '2016-04-10'
		    },
		    num: 1,
		    videos: [{"id":"2",name:"123"}]
	    }
	  },
	   methods: {
	    item() {
	    	var outThis = this;
		  	console.log(this._data.num++)
		  	console.log(this._data)
		  	axios.post('/api/movie/videoFile/list', {
			    params: {
			      ID: 12345
			    }
			  })
			  .then(function (response) {
				console.log(outThis._data.videos);
			  	console.log(response.data);
			  	outThis._data.videos = response.data.data
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
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
