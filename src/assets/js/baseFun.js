
import Vue from 'vue'
import stores from '../../store/store'
import { AjaxPlugin,AlertPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(AjaxPlugin)

// 用于全局的ajax请求
const baseAjax=function(param){
    let defaultParam={
        data:param.data || {},
        params:param.params||{},
        url:param.url,
        type:param.type || 'get',
        timeout: param.timeout || 5000,
        showLoading:false
    }

    if(param.showLoading){
        stores.commit('UPDATE_LOADING', true)
    }

    AjaxPlugin.$http.request({
      baseURL: defaultParam.baseURL,
      method:defaultParam.type,
      url:defaultParam.url,
      data:defaultParam.data,
      params:defaultParam.params,
      timeout:defaultParam.timeout,
      headers: defaultParam.headers
    }).then(function(response) {
        stores.commit('UPDATE_LOADING', false)
        
      param.success(response.data)
    }).catch(function(erro){
        stores.commit('UPDATE_LOADING', false)
        console.log(erro)    
    })
}

// 用于全局的公共函数
const baseFun={
	   // 本地存储
        localSet(obj,key){
            var newObj = obj;
            var str = JSON.stringify(newObj);
            localStorage.setItem(key,str);
        },
        localGet(key){
            var str = localStorage.getItem(key);
            return JSON.parse(str);
        },
        localClear(key){
            localStorage.removeItem(key);
        },

        getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }
}


//导出模块
export default {
	baseFun,
	baseAjax
}


