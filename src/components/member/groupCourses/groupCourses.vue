<template>
  <div class="groupCourses">
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
       <div class="selectGroup">
          <div class="purpose">
              <div class="purpose-name group-head" @click="showPurpose=!showPurpose">
                <flexbox>
                   <flexbox-item :span="2"><div class="purpose-icon"><img src="../../../assets/images/icons/purpose_icon.png"></div></flexbox-item>
                   <flexbox-item ><div>目的-{{coursesQueryData.purposeName}}</div></flexbox-item>
                   <flexbox-item :span="2"><div class="arrow-icon"><x-icon type="ios-arrow-down" size="20"></x-icon></div></flexbox-item>
                </flexbox>
              </div>
              <div class="purpose-items group-items" v-show="showPurpose">
                   <p v-for="item in purposeList" @click="queryByPurpose(item)">{{item.name}}</p>
              </div>
          </div>
          <div class="categoryName">
              <div class="category-name group-head" @click="showCategory=!showCategory">
                <flexbox>
                   <flexbox-item :span="2"><div class="purpose-icon"><img src="../../../assets/images/icons/category_icon.png"></div></flexbox-item>
                   <flexbox-item ><div>分类-{{coursesQueryData.categoryName}}</div></flexbox-item>
                   <flexbox-item :span="2"><div class="arrow-icon"><x-icon type="ios-arrow-down" size="20"></x-icon></div></flexbox-item>
                </flexbox>
              </div>
              <div class="category-items group-items" v-show="showCategory">
                  <p v-for="item in categoryList" @click="queryByCategory(item)">{{item.name}}</p>
              </div>
          </div>
       </div>
    </div>
    <div class="classItems">
      <div class="activeItem" v-for="(item,index) in courseList" :key="index">
          <img src="../../../assets/images/news-img.png"/>
          <div class='sbottom'>
            <p class="title">{{item.title}}</p>
            <p class="time-line"><span  class='time'>{{item.startTime}} - {{item.endTime}}</span> 
            <span class="view">{{item.viewer}}</span></p>
          </div>
          <div class="qtyProgress">
            <div class='qbar' v-bind:style="{ width: item.barWidth,background:item.bgColor}">
            </div>
            <div class="qty"><span>{{item.reservation}}</span> / <span>{{item.personMax}}</span></div>
          </div>
          <div class="bookBtn">
              <x-button  mini type="warn"  action-type='button'  @click.native="makeReserve(item.id,index)">预约</x-button>
              <!-- <x-button  mini  action-type='button' type="default">已预约</x-button> -->
          </div>
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
    <div>
        <x-dialog v-model="showSuccess" class="d-box" @click="showSuccess=false">
             <div @click="showSuccess=false">
               <div class="d-icon">
                  <img src="../../../assets/images/dialog-success.png">
               </div>
               <p class="d-title">预约成功，记得准时签到噢！</p>
             </div>
        </x-dialog>
        <x-dialog v-model="showSorry" class="d-box" >
            <div @click="showSorry=false">
              <div class="d-icon">
                    <img src="../../../assets/images/dialog-sorry.png">
                 </div>
                 <p class="d-title">人数已满，下次记得早点预约噢！</p>
            </div>
        </x-dialog>
    </div>

  </div>
</template>
<script>
  import groupCourses  from  "./js/groupCourses.js"
  export default groupCourses
</script>

<style>
  .groupCourses .vux-tab .vux-tab-item{
    line-height: 20px;
  }
  
  .groupCourses .pickDate
  {
    color:#DD5858;
    font-size: 16px;
  }

  .groupCourses .classItems{
     margin-top: 145px;
  }

  .groupCourses .left-calendar{
    margin-left:5px;
    border-radius: 5px;
    background: #eee;
  }

  .groupCourses .vux-tab{
    height: 46px
  }

  .groupCourses .activeItem img{
    width: 100%
 }

 .groupCourses .activeItem{
  margin:10px 10px 0 10px;
  position: relative;
  height: 180px;
  overflow: hidden;
  border-radius: 5px
}

.groupCourses .topDate{
   position: absolute;
   top: 52px;
   z-index: 10;
   width: 100%;
}

.groupCourses .activeItem .sbottom{
  color: white;
  position: absolute;
  bottom: 10px;
  padding:10px;
  width: 85%
}


.groupCourses .activeItem .title{
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.groupCourses .time-line{
  font-size: 14px;
  width: 100%;
  height: 20px;
}

.groupCourses .activeItem .view{
  float: right;
  font-size: 14px;
}

 .groupCourses .activeItem img{
    width: 100%
 }

 .groupCourses .vux-tab .vux-tab-item.vux-tab-disabled {
    color: #666;
}

.groupCourses .vux-tab .vux-tab-item.vux-tab-selected{
  color:#DD5858;
  border-width: 3px !important;
  border-bottom: 3px solid #DD5858;
}
.groupCourses .bookBtn{
    position: absolute;
    bottom: 20px;
    right: 20px;
}
.groupCourses button.weui-btn_mini{
    width: 65px;
    padding: 0;
}

.groupCourses .selectGroup{
  background: #fff
}

.groupCourses .group-head{
    padding: 10px 0 5px 0;
    font-size: 14px;
    border-bottom: 1px solid #eee
}

.groupCourses .purpose-icon, .groupCourses .category-icon{
  text-align: right;
  padding-right: 10px
}
.groupCourses .purpose-icon img{
    height:20px;
 }

 .groupCourses .arrow-icon{
  text-align: right;
  padding-right: 15px;
 }

  .groupCourses .group-items{
    padding:0 30px;
    border-bottom: 1px solid #eee
 }
 .groupCourses .group-items p{
      overflow: hidden;
      text-align: center;
      font-size: 14px;
      height: 30px;
      line-height:30px;
      color: #666;

   }

 .groupCourses .vux-tab .vux-tab-item.vux-tab-notSelected{
      border-bottom:1px solid #eee;
      color: #666
   }

   .groupCourses .inline-calendar td.current > span.vux-calendar-each-date {
    background-color: #DD5858;
  }

   .groupCourses .inline-calendar td.is-today{
    color:#DD5858;
  }

  .groupCourses .qtyProgress{
    width: 70px;
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    background: #666;
    color: #fff
  }

  .groupCourses .qbar{
    border-radius: 10px;
    position: absolute;
    height: 100%;
    top: 0
  }

  .groupCourses .qty{
    text-align: center;
    width: 100%;
    border-radius: 10px;
    position: absolute;
    height: 100%;
    top: 0
  }

  .groupCourses .d-box .d-title{
      margin-bottom:15px;
  }

  .groupCourses .d-box  .weui-dialog{
     max-width: 240px;
  }

   .groupCourses .d-icon{
      text-align: center;
      padding:10px;
   }

  .groupCourses .d-icon img{
      height: 70px;
      margin:15px auto;
  }

</style>
