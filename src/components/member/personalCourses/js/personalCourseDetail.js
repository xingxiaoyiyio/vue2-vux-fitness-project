
import { XImg,XButton,Flexbox, FlexboxItem,XDialog,Checker, CheckerItem,Toast} from 'vux';

export default {
	mounted(){
		this.loadDetail();
		this.$store.commit('UPDATE_PAGE_TITLE', '课程预约');
	},
	computed:{
		currentDay(){
			let date=this.$route.params.date;
			let day=new Date(date).getDay();
			let cnM=['日','一','二','三','四','五','六'];
			return "周"+cnM[day]
		}
	},
	data(){
		let self=this;
		let data={
			mainData:{},
			showSuccess:false,
			showError:false,
			showMsg:false,
			currentDate:self.$route.params.date,
			checkTime:[],
			activeType:0,
			timeListArr:[[],[],[]],
			showReserveBtn:true,
			timeList:[
				{name:"上午",
				list:[],
				showList:false
				},
				{name:"下午",
				list:[],
				showList:false
				},
				{name:"晚上",
				list:[],
				showList:false
				}
			]
		}
		return data;
	},
	methods:{
		// 获取详细信息
		loadDetail(){
			let self=this;
	    	let courseId=this.$route.params.courseId;
	    	let date=this.$route.params.date;
		          this.baseAjax({
		            url:'../../../static/basicData/personalDetail.json',
		            showLoading:true,
		            params:{
		            	courseId:courseId,
		            	date:date
		            },
		            success:function(data){
		                self.mainData=data.returnObject[0];
		                self.computeTimeLost(self.mainData.scheduleTime)

		        }
		    })
		},
		// 计算时间列表
		computeTimeLost(list){
			let self=this;
			let len=list.length;
			for(let i=0;i<len;i++){
				let type=list[i].type-1;
				list[i].check=false;
				self.timeList[type].list.push(list[i]);
				self.timeListArr[type].push(list[i].time);

			}
			console.log(self.timeList)
		},
		//选中时间
		checkMyTime(idx,val,isEnable){
			if(!isEnable) return;
			if(this.activeType!=idx){
				this.checkTime=[val];
				this.activeType=idx
			}
			console.log(this.checkTime)
		},
		//预定私教课
		makeReserve(){
			if(!this.validateTime()) return;
			let self=this;
	    	let courseId=this.$route.params.courseId;
	    	let date=this.$route.params.date;
		          this.baseAjax({
		            url:'../../../static/basicData/makeReserve.json',
		            type:'get',
		            showLoading:true,
		            params:{
		            	courseId:courseId,
		            	memberId:"666",
		            	reservedTime:self.checkTime.join(","),
		            	trainerId:"999"
		            },
		            success:function(data){
		               console.log(data)
		               if(data.isSuccess){
		               		self.showSuccess=true;
		               		self.showReserveBtn=false;
		               }else{
		               		self.showError=true;
		               }
		        }
		    })
		},
		//预定私教课
		validateTime(){
			if(!this.checkTime || this.checkTime.length!=2){
				this.showMsg=true;
				return false
			}
			let type=this.activeType;
			let tlist=this.timeListArr[type];
			let t1=tlist.indexOf(this.checkTime[0]);
			let t2=tlist.indexOf(this.checkTime[1]);
			if(Math.abs(t1-t2) !=1){
				this.showMsg=true;
				return false
			}
			return true;

		}

	},
	components:{
		XImg,XButton,Flexbox, FlexboxItem,XDialog,Checker, CheckerItem,Toast
	}
}