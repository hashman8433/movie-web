<template>
	<dev>
		<el-form :inline="true"	>
			<el-form-item label="影片名称" label-width="auto">
				<el-input v-model="form.fileName" label-width="60%"></el-input>
			</el-form-item>
			<el-form-item label-width="10%">
				<el-button type="primary" @click="onSubmit">搜索</el-button>
			</el-form-item>
		</el-form>
		
		<!-- ++++++++++++++++ 预览电影截图 start ++++++++++++++-->
		<el-drawer
		  title="预览图片"
		  :visible.sync="drawer"
		  size="80%"
		  append-to-body=true
		  :with-header="false">
		  <span>预览电影</span>
		  <el-table
		      :data="imgData"
		      style="width: 100%">
		      <el-table-column
		        prop="id"
		        label=""
		        width="300">
		        
		        <template slot-scope="scope">
			        <img @click="handleClick(scope.row)" style="width:80%;" 
			        	:src="scope.row.filePathWeb" />
				</template>
		      </el-table-column>
            
			</el-table>
		</el-drawer>
		<!-- ++++++++++++++++ 预览电影截图 end ++++++++++++++-->
		
		<el-table :data="tableData" ref='table'>
			<el-table-column prop="id" label="视频" min-width='40'>
				<!--<img style="width:80px;" src="../../build/logo.png" />-->
				<template slot-scope="scope">
					<img @click="toVedio(scope.row)" style="width:10%;min-width: 150px;" 
						:src="scope.row.imgPathWeb" />
				</template>
			</el-table-column>
			<el-table-column prop="name" label="文件名"  min-width='50'>
				<template slot-scope="scope">
					<el-button @click="previewVideo(scope.row)" type="text" size="small" style="max-height: 500px">
						{{scope.row.fileName}}</el-button>
				</template>
			</el-table-column>
			
		</el-table>
		
		<el-pagination
	        @size-change="handleSizeChange"
	        @current-change="handleCurrentChange"
	        :current-page="pageNo"
	        :page-sizes="[50, 100, 200, 300]"
	        :page-size="pageSize"
	        layout="total, prev, pager, next"
	        :total="totalNum"
	        pager-count="5"
	        background=true
	        small=true
	        >
	      </el-pagination>
	</dev>
</template>

<script>
	const axios = require('axios');
	
	
	export default {
		data() {
			return {
				drawer: false,
        			innerDrawer: false,
        			imgData: {},
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
				}],
				form: {
		          fileName: '',
		    	    },
		        pageSize: 20,
		        pageNo: 1,
		        totalPages: 1,
		        totalNum: 123,
			}
		},
		created() {
			console.log('beforeCreate')
			this.item()
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val;
	            	console.log(`更改页: ${val}`);
	            this.refreshItem(this.pageNo, this.pageSize)
	        },
	        
	        handleCurrentChange(val) {
	        		this.pageNo = val;
	            console.log(`当前页: ${val}`);
	            this.refreshItem(this.pageNo, this.pageSize);
//				this.$refs.table.bodyWrapper.scrollTop = 0
				window.scrollTo(0,0);

	        },
	        
	        refreshItem (pageNo, pageSize){
	        		var outThis = this;
	        		axios.post('/api/movie/videoFile/list', {
	        				pageNo : pageNo,
	        				pageSize : pageSize,
	        				fileName: outThis.form.fileName,
	        			})
					.then(function(response) {
						console.log(response.data.data.content);
						var respData = response.data.data;
						outThis._data.tableData = response.data.data.content;
						outThis._data.totalNum = respData.totalElements;
						outThis._data.totalPages = respData.totalPages;
						outThis._data.pageSize = respData.size;
					})
					.catch(function(error) {
						console.log(error);
					});
	        },
			item() {
				console.log(this._data);
				this.refreshItem(this.pageNo, this.pageSize);
			},
			toVedio(row) {
				console.log(row);
				
				let routeUrl = this.$router.resolve({
				     path: "/video1",
				     query: {
						filePathWeb: row.filePathWeb
					 }
			     });
			   	 window.open(routeUrl.href, '_blank');
			},
			previewVideo(row) {
				this.drawer = true;
				
				console.log(row.id);
				var outThis = this;
			  	axios.post('/api/movie/imgFile/list', {
			    		videoFileId: row.id
				  })
				  .then(function (response) {
				  	console.log(response.data.data);
				  	outThis._data.imgData = response.data.data
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
				  
//				this.$router.push({
//					path: '/imgList',
//					query: {
//						videoFileId: row.id
//					}
//				})
			},
			onSubmit() {
		    		console.log(this.form.fileName);
				var outThis = this;
				this.refreshItem(this.pageNo, this.pageSize);
				
		    }

		}

	}
</script>
<style scoped>
	.el-table .cell {
		white-space: pre-line;
	}
</style>