<template>
	<div class="activityDetail">
		<div class="newsImg">
             <img src="../../../assets/images/news-img.png"/>
		</div>
		<div class="detail-box">
			<div class="text-top">
				<p class="title">{{mainData.title}}</p>
				<div class="sDate">
					<flexbox>
				      <flexbox-item>发布时间：{{mainData.publishDate}}</flexbox-item>
				      <flexbox-item>浏览量：{{mainData.viewer}}</flexbox-item>
					</flexbox>
				</div>
			</div>
			<div class="detail-text">
				<p v-html="mainData.content">
					{{mainData.content}}
				</p>
			</div>
		</div>
		
	</div>
</template>
<script>
	import {Flexbox, FlexboxItem,XImg} from 'vux'

	export default{
		 mounted() {
	      this.loadDetail();
	      this.$store.commit('UPDATE_PAGE_TITLE', '活动详情');

	    },
	    data(){
	      return {
	        mainData:''
	      }
	    },
	    methods:{
	    	loadDetail(){
	    		 let self=this;
	    		 let id=this.$route.params.activityId;
		          this.baseAjax({
		            url:'../../../static/basicData/activityDetail.json',
		            showLoading:true,
		            success:function(data){
		                console.log(data.returnObject)
		                self.mainData=data.returnObject		 
		            }
		          })
	    	}	
	    },

	    components:{
	    	Flexbox, FlexboxItem,XImg
	    }
	}
</script>
<style>

 .activityDetail .newsImg{
 	height:180px;
 	overflow: hidden;
 }

.activityDetail .title{
	font-size: 16px;
	line-height: 22px;
}

.activityDetail .detail-text{
	color: #666;
	padding:10px 15px;
}

.activityDetail .detail-text p{
	text-indent: 28px;
	font-size: 14px;
	line-height: 22px;
	color: #666
}

 .activityDetail .newsImg img{
    width: 100%;
    min-height: 180px;
 }

  .activityDetail  .sDate{
		margin-top: 10px;
		font-size: 12px;
		color: #666
 }

  .activityDetail  .text-top{
		border-bottom: 1px solid #eee;
		padding: 10px 15px 15px 15px; 
 }

	
</style>