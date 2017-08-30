<template>
  <div class="activityIndex page">
    <div class="activeItem" v-for="item in itemList">
      <router-link :to="'/memberHome/activityDetail/'+item.id">
          <div class="newsImg">
             <img src="../../../assets/images/news-img.png"/>
          </div>
          <div class='sbottom'>
            <p class="title">{{item.title}}</p>
            <p class="time-line"><span  class='time'>{{item.startDate}} - {{item.endDate}}</span> 
            <span class="view"><span class="view_icon"><img src="../../../assets/images/icons/view.png"></span>{{item.viewer || 0}}人</span></p>
          </div>
        </router-link>
    </div>

  </div>
</template>
<script>
  import { Tabbar, TabbarItem ,XHeader,XButton,XImg} from 'vux'
  export default {
    mounted() {
      this.loadLatest();
      this.$store.commit('UPDATE_PAGE_TITLE', '最新活动')
    },
    data(){
      return {
        itemList:''
      }
    },
    methods:{
      loadLatest(){
          let self=this;
          this.baseAjax({
            url:'../../../static/basicData/latestActivity.json',
            showLoading:true,
            success:function(data){
                console.log(data)
                self.itemList=data.returnObject
            }
          })
      }
    },
    components: {
      Tabbar,
      TabbarItem,
      XHeader,
      XButton,
      XImg
    }
  }

</script>
<style>
  
.activityIndex .activeItem{
  margin:10px 10px 0 10px;
  position: relative;
  height: 180px;
  overflow: hidden;
  border-radius: 5px
}

.activityIndex .activeItem .sbottom{
    color: white;
    position: absolute;
    bottom: 10px;
    padding: 10px;
    width: 85%;
}s


.activityIndex .activeItem .title{
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.activityIndex .time-line{
  font-size: 14px;
  width: 100%;
  height: 20px;
}

.activityIndex .activeItem .view{
  float: right;
  font-size: 14px;
}

 .activityIndex .activeItem .newsImg img{
    width: 100%;
    min-height: 180px;
 }

 .activityIndex  .sbottom img{
       width: 16px;
    height: 12px;
    padding-right: 5px;
 }
</style>


