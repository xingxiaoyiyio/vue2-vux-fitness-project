<template>
  <div class="personalCourses">
    <div class="topDate">
       <tab :animate=false :line-width="1">
          <tab-item disabled>
              <div class='left-calendar' @click="openCalendar()" >
                <p class="pickDate">{{pickDate}}</p>
                <p class="pickMonth">{{pickMonth}}月</p>
              </div>
          </tab-item>
          <tab-item @on-item-click="dateHandler(index)" v-for="(date,index) in dateList" :key="index" v-bind:class="{'vux-tab-selected': index==selectIndex ,'vux-tab-notSelected': index!=selectIndex}">
                <p>{{date.week}}</p>
                <p>{{date.date}}</p>
          </tab-item>
       </tab>
    </div>
    <div class="classItems">
    	<div class="item-box" v-for="(item,index) in courseList" :key="index">
    		 <flexbox>
                   <flexbox-item :span="3">
                   		<div class="item-icon">
                   			<img src="../../../assets/images/timg.png"/>
                   		</div>
                   </flexbox-item>
                   <flexbox-item>
                   		<div class="top-name">
                   			<flexbox>
          								<flexbox-item>
          									<div>{{item.name}}</div>
          									<p class="item-desc">{{item.description}}</p>
          								</flexbox-item>
          								<flexbox-item :span="4">
                            <router-link :to="'/memberHome/personalCourseDetail/'+item.id+'/'+coursesQueryData.date" v-show="item.status==1" >
                               <x-button mini type="warn"  action-type='button' >预约</x-button>
                            </router-link>
                            <x-button mini type="default" v-show="item.status==2"  action-type='button' >已预约</x-button>
          								</flexbox-item>
          	            </flexbox>
                             		</div>
                             		<div class="bottom-cer">
          		                   	<span>{{item.certification}}</span>
          		                </div>
                          </flexbox-item>
          </flexbox>
    	</div>
    </div>

    <div>
      <popup v-model="showCalendar">
        <inline-calendar
          @on-change="calendarChange"
          class="my-inline-calendar"
          v-model="calendarDate"
          :weeks-list="weeksList"
          >
        </inline-calendar>
      </popup>
    </div>

  </div>
</template>
<script>
  import personalCourses  from  "./js/personalCourses.js"
  export default personalCourses
</script>

<style>
  .personalCourses .vux-tab .vux-tab-item{
    line-height: 20px;
  }
  
  .personalCourses .pickDate
  {
    color:#DD5858;
    font-size: 16px;
  }

  .personalCourses .classItems{
     margin-top: 60px;
  }

  .personalCourses .left-calendar{
    margin-left:5px;
    border-radius: 5px;
    background: #eee;
  }

  .personalCourses .vux-tab{
    height: 46px
  }

  .personalCourses .activeItem img{
    width: 100%
 }

 .personalCourses .activeItem{
  margin:10px 10px 0 10px;
  position: relative;
  height: 180px;
  overflow: hidden;
  border-radius: 5px
}

.personalCourses .topDate{
   position: absolute;
   top: 52px;
   z-index: 10;
   width: 100%;
}

.personalCourses .activeItem .sbottom{
  color: white;
  position: absolute;
  bottom: 10px;
  padding:10px;
  width: 85%
}


.personalCourses .activeItem .title{
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.personalCourses .time-line{
  font-size: 14px;
  width: 100%;
  height: 20px;
}

.personalCourses .activeItem .view{
  float: right;
  font-size: 14px;
}

 .personalCourses .activeItem img{
    width: 100%
 }

 .personalCourses .vux-tab .vux-tab-item.vux-tab-disabled {
    color: #666;
}

.personalCourses .vux-tab .vux-tab-item.vux-tab-selected{
  color:#DD5858;
  border-width: 3px !important;
  border-bottom: 3px solid #DD5858;
}

 .personalCourses .vux-tab .vux-tab-item.vux-tab-notSelected{
      border-bottom:1px solid #eee;
      color: #666
   }

   .personalCourses .inline-calendar td.current > span.vux-calendar-each-date {
    background-color: #DD5858;
  }

   .personalCourses .inline-calendar td.is-today{
    color:#DD5858;
  }

  .personalCourses  .item-box .item-icon{
		height: 60px;
		text-align: center;
		overflow: hidden;
  }

   .personalCourses  .item-box .item-icon img{
		height: 100%;
		border-radius: 50%
   }

   .personalCourses  .item-box {
   		border-bottom:1px solid #eee;
   		background: #fff;
   }

   .personalCourses  .top-name{
   	   border-bottom:1px solid #eee;
   	   padding: 10px 0;
   	   margin-right: 10px;
   }

   .personalCourses  .item-desc{
   	    font-size:12px;
   	    line-height: 20px;
   	    color: #666
   }

   .personalCourses .bottom-cer{
   		padding:10px 0;
   		font-size:12px;
   	    color: #666
   }
   .personalCourses .bottom-cer span{
   	    padding: 5px;
	    border-radius: 5px;
	    background: #eee;
	    margin: 5px;
   }

   .personalCourses button.weui-btn_mini{
    width: 65px;
    padding: 0;
}


</style>
