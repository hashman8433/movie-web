<template>
	<dev>
		<el-form :inline="true"	:model="formInline">
			<el-form-item label="影片名称" label-width="auto">
				<el-input v-model="form.fileName" label-width="60%"></el-input>
			</el-form-item>
			<el-form-item label-width="10%">
				<el-button type="primary" @click="onSubmit">搜索</el-button>
			</el-form-item>
		</el-form>
		
		<el-table :data="tableData">
			<el-table-column prop="id" label="视频" min-width='29'>
				<!--<img style="width:80px;" src="../../build/logo.png" />-->
				<template slot-scope="scope">
					<img @click="handleClick(scope.row)" style="width:100%;" :src="scope.row.imgPathWeb" />
				</template>
			</el-table-column>
			<el-table-column prop="name" label="路径"  min-width='70'>
				<template slot-scope="scope">
					<el-button @click="toImgPath(scope.row)" type="text" size="small" style="max-height: 500px">
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
	        layout="total, sizes, prev, pager, next"
	        :total="totalNum">
	      </el-pagination>
	</dev>
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
	            this.refreshItem(this.pageNo, this.pageSize)
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
			handleClick(row) {
				console.log(row);
				this.$router.push({
					path: '/video1',
					query: {
						filePathWeb: row.filePathWeb
					}
				})
			},
			toImgPath(row) {
				console.log(row.id);
				this.$router.push({
					path: '/imgList',
					query: {
						videoFileId: row.id
					}
				})
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