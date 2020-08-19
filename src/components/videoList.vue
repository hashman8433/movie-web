<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
      	
        prop="id"
        label="视频"
        width="150">
        <!--<img style="width:80px;" src="../../build/logo.png" />-->
        <template slot-scope="scope">
	        <img @click="handleClick(scope.row)" style="width:150px;" 
	        	:src="scope.row.imgPathWeb" />
		</template>
      </el-table-column>
      <el-table-column
      	
      	prop="name"
        label="文件名"
        width="250">
        <template slot-scope="scope">
	        <el-button @click="toImgPath(scope.row)" type="text" size="small" style="max-height: 500px">
	        	{{scope.row.fileName}}</el-button>
	    </template>
      </el-table-column>
      
    </el-table>
</template>

<script>
  	
  	const axios = require('axios');
    export default {
      data() {
        return {
          tableData: [{
            id: '2016-05-02',
            name: '王小虎',
            filePath: '../../build/logo.png'
          }, {
            id: '2016-05-04',
            name: '王小虎',
            filePath: '../../build/logo.png'
          }, {
            id: '2016-05-01',
            name: '王小虎',
            filePath: '../../build/logo.png'
          }]
        }
      },
      created () {
		    console.log('beforeCreate')
      		this.item()
		},
      methods: {
      	item() {
	    	var outThis = this;
		  	console.log(this._data)
		  	axios.post('/api/movie/videoFile/list', {
			    params: {
			      ID: 12345
			    }
			  })
			  .then(function (response) {
			  	console.log(response.data.data);  	
			  	outThis._data.tableData = response.data.data
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
		},
		handleClick(row) {
        	console.log(row);
        	this.$router.push({path:'/video1',query: {filePathWeb:row.filePathWeb}})
        },
        toImgPath(row) {
       		console.log(row.id);
       		this.$router.push({path:'/imgList',
        		query: {videoFileId: row.id}})
        }
       
	  }
	    
    }
</script>
<style scoped>
.el-table .cell {
  white-space: pre-line;
}
</style>