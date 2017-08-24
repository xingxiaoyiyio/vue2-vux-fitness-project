import { Tab, TabItem,XImg,dateFormat,XButton,Flexbox, FlexboxItem,InlineCalendar,Popup} from 'vux';

  let cnM=['一','二','三','四','五','六','七','八','九','十','十一','十二'];

  // 获取一周的日期
  // 获取当前星期的星期一的日期，返回的是一个Date对象。
  function getMonDate(dd){    //config为日期 例如：2016-04-19
      let d=new Date(dd);
      let day=d.getDay();
      let date=d.getDate();
      if(day==1)
      return d;
      if(day==0)
      d.setDate(date-6);
      else
      d.setDate(date-day+1);
      return d;
  }

  //获取一周的日期;
  function getWeekDate(self,confg){
      let d=getMonDate(confg);
      let wkd=new Date(confg).getDay();
      self.selectIndex=wkd==0?6:wkd-1
      for(var i=0;i<7;i++){
          self.dateList[i].date = d.getDate();
          self.dateList[i].configDate=dateFormat(new Date(d), 'YYYY-MM-DD');
          d.setDate(d.getDate()+1);
     }
  }

  export default {
    mounted() {
      this.$store.commit('UPDATE_PAGE_TITLE', '私教课')
      getWeekDate(this,this.myd);  //加载一周数据
      this.loadCourses();    //加载课程列表
    },
    data(){
      let self=this;
      let data={
          calendarDate:"",
          dateList :[
            {week:'周一',date:'',configDate:'',limit:false},
            {week:'周二',date:'',configDate:'',limit:false},
            {week:'周三',date:'',configDate:'',limit:false},
            {week:'周四',date:'',configDate:'',limit:false},
            {week:'周五',date:'',configDate:'',limit:false},
            {week:'周六',date:'',configDate:'',limit:false},
            {week:'周日',date:'',configDate:'',limit:false}
          ],
          myd:dateFormat(new Date(), 'YYYY-MM-DD'),
          pickMonth:cnM[new Date().getMonth()],
          pickDate:new Date().getDate(),
          selectIndex:null,
          courseList:'',
          showCalendar:false,
          weeksList:['日','一','二','三','四','五','六'],
          coursesQueryData:{
              date:dateFormat(new Date(), 'YYYY-MM-DD'),
           }


       }

      return data
    },
    methods:{

      // 获取团体课列表
      loadCourses(){
          let self=this;
          this.baseAjax({
            url:'../../../static/basicData/personalCourse.json',
            params:{
              date:self.coursesQueryData.date
            },
            showLoading:true,
            success:function(data){
              console.log(data)
                self.courseList=data.returnObject;
            }
          })
      },
      //选择日期
      calendarChange(date){
          if(date==this.coursesQueryData.date) return;
          getWeekDate(this,date);
          this.coursesQueryData.date=date;
          this.showCalendar=false;
          this.loadCourses();
      },

      //日期点击事件
      dateHandler(idx){
        this.selectIndex=idx;
        this.coursesQueryData.date=this.dateList[idx].configDate;
        this.loadCourses();
      },

      //打开日期控件
      openCalendar(){
        this.showCalendar=true;
      }
    },
    components: {
      Tab,TabItem,XImg,XButton,Flexbox, FlexboxItem,InlineCalendar,Popup
    }
  }
