import { Tab, TabItem,XImg,dateFormat,XButton,Flexbox, FlexboxItem,InlineCalendar,Popup,XDialog} from 'vux';

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
      this.$store.commit('UPDATE_PAGE_TITLE', '团体课')
      getWeekDate(this,this.myd);  //加载一周数据
      this.loadCourses();    //加载课程列表
    },
    data(){
      let self=this;
      let data={
        showSuccess:false,
        showSorry:false,
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
           showCategory:false,
           showPurpose:false,
           showCalendar:false,
           categoryList:[
             {name:'全部',id:'1009'},
             {name:'减肥',id:'1009'},
             {name:'增肌',id:'1009'}
           ],
          purposeList:[
             {name:'全部',id:'1009'},
             {name:'健身操',id:'1009'},
             {name:'瑜伽',id:'1009'},
             {name:'动感单车',id:'1009'}
          ],
          weeksList:['日','一','二','三','四','五','六'],
          coursesQueryData:{
              categoryId:"ioio",
              date:dateFormat(new Date(), 'YYYY-MM-DD'),
              purposeId:'yuyuy',
              categoryName:"全部",
              purposeName:"全部"
           }


       }

      return data
    },
    methods:{

      // 获取团体课列表
      loadCourses(){
          let self=this;
          this.baseAjax({
            url:'../../../static/basicData/groupCourse.json',
            params:{
              categoryId:self.coursesQueryData.categoryId,
              date:self.coursesQueryData.date,
              purposeId:self.coursesQueryData.purposeId,
            },
            showLoading:true,
            success:function(data){
              console.log(data)
                self.courseList=data.returnObject;
                self.computListBar()
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

      //头部参课人数
      computListBar(){
          var self=this;
          var len=self.courseList.length;
          for(var i=0;i<len;i++){
              var widthNo=(self.courseList[i].reservation/self.courseList[i].personMax).toFixed(2);
              self.courseList[i].barWidth=widthNo*100+"%";
                if(widthNo<=0.5) {
                  self.courseList[i].bgColor="#4FCC51"
                }else if(widthNo>0.5 && widthNo!=1) {
                  self.courseList[i].bgColor="#E16F34";
                }else if(widthNo==1){
                  self.courseList[i].bgColor="#DD5858";
                }
            }
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
      },
      //预定团体课程
      makeReserve(id,idx){
        let self=this;
        if(self.courseList[idx].reservation==self.courseList[idx].personMax){
          self.showSorry=true;
          return;
        }
          this.baseAjax({
            url:'../../../static/basicData/makeReserve.json',
            get:"post",
            params:{
              courseId:id,
              memberId:"111"
            },
            showLoading:true,
            success:function(data){
              if(data.isSuccess){
                  self.courseList[idx].reservation=self.courseList[idx].reservation+1;
                  self.showSuccess=true;
                  self.computListBar();
              }
            }
          })
      },
      //目的筛选课程
      queryByPurpose(item){
        this.showCategory=false;
        this.showPurpose=false;
        this.coursesQueryData.purposeId=item.id;
        this.coursesQueryData.purposeName=item.name;
        this.loadCourses();
      },
      //类别筛选课程
      queryByCategory(item){
        this.showCategory=false;
        this.showPurpose=false;
        this.coursesQueryData.categoryId=item.id;
        this.coursesQueryData.categoryName=item.name;
        this.loadCourses();
      }
    },
    components: {
      Tab,TabItem,XImg,XButton,Flexbox, FlexboxItem,InlineCalendar,Popup,XDialog
    }
  }
