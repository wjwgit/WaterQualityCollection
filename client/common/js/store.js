
import Vue from 'vue';
import Vuex from 'vuex';

import http from './method.js' //调取服务(相当于ajax)

Vue.use(Vuex)

const state = {
    // 登录状态为没登录
    logined: false,
    // 用户信息数据
    Loginedname: 123,
    //折叠
    isCollapse: true,
    //版本
    softType: ''
}

var mutations = {
    getStorage(key) {
        return localStorage.getItem(key);
    },
    setStorage(state, obj) {
        return localStorage.setItem(obj.key, JSON.stringify(obj.value));
    },

    LOGIN(state, user) {
        // 登录
        // 先让登录状态变为登录了
        // 若只是改变state里的值，在强制刷新后会丢失，数据添加到localStorage里
        localStorage.setItem("Loginedname", user.Loginedname)
        localStorage.setItem("logined", true)
        localStorage.setItem("RoleID", JSON.stringify(user.RoleID))
        // localStorage.setItem("softType", user.appConfig.SoftType)
        // localStorage.setItem("appConfig", JSON.stringify(user.appConfig))
        // localStorage.setItem("ssztConfig", JSON.stringify(user.ssztConfig))
        // localStorage.setItem("jclcConfig", JSON.stringify(user.jclcConfig))
        // localStorage.setItem("lcbjConfig", JSON.stringify(user.lcbjConfig))
        state.Loginedname = user.Loginedname
        state.logined = true
        // state.softType = user.appConfig.SoftType

    },
    // 退出
    LOGOUT(state) {

        // 这个同理
        localStorage.removeItem("Loginedname")
        localStorage.removeItem("logined")
        localStorage.removeItem("RoleID")
        // localStorage.removeItem("appConfig")
        // localStorage.removeItem("ssztConfig")
        // localStorage.removeItem("jclcConfig")
        // localStorage.removeItem("lcbjConfig")
        // state.Loginedname = ''
        // state.logined = false
        // state.softType = ''

    },
    getIsCollapse(state, val) {

        state.isCollapse = val
    }
}
var getters = {

    isLogin(state) {
        if (!state.logined) {
            state.logined = localStorage.getItem('logined');   //从localStorage中读取状态
            state.Loginedname = localStorage.getItem('Loginedname');
        }
        return state.logined
        // return !!localStorage.getItem('logined');
    },
    getIsCollapse: state => state.isCollapse,
}
export default new Vuex.Store({
    getters,
    state,
    mutations
})
