//import 数据 from ''	这里面可以获取数据
import * as data from './data'

export default{

	UPDATE_HEAD:({commit})=>{
		commit(data.UPDATE_HEAD);
	},
	UPDATE_LOADING:({commit})=>{
		commit(data.UPDATE_LOADING);
	},
	UPDATE_FOOTER:({commit})=>{
		commit(data.UPDATE_FOOTER)
	},
	UPDATE_PAGE_TITLE:({commit})=>{
		commit(data.UPDATE_PAGE_TITLE)
	}
}
