<style>
.h .h-left {
  float: left;
  margin-top: 20px;
  margin-left: 10px;
  display: inline;
}

.h .h-left .h-logo {
  float: left;
}

.h .h-left .h-title {
  float: left;
  color: #ffffff;
  font-size: 22px;
  margin-left: 20px;
  margin-top: -4px;
}

.h .h-left .h-socketInfo {
  float: left;
  color: #f4fff1;
  font-size: 14px;
  /* margin-left: 80px; */
  margin-left: 60px;
  margin-top: 1px;
  animation: change 1.5s ease infinite;
}

.h .h-right {
  float: right;
  color: #cccccc;
}

.h .h-right span {
  color: #cccccc;
}

.h .h-right ul li {
  float: left;
  margin: 0 auto;
  margin-right: 20px;
  font-size: 14px;
}

.h .h-right ul li .c-icon {
  width: 30px;
  /* height: 50px; */
  margin-top: 7px;
  cursor: pointer;
}

.h .h-right ul li.c-systemDate {
  margin-top: 7px;
  /* animation: change 1s ease infinite; */
}

.h .h-right ul li.c-systemDate .point {
  animation: change 1s ease infinite;
  margin-left: 4px;
  margin-right: 4px;
}

.h .h-right ul li.c-user {
  /* margin-top: 4px; */
  cursor: pointer;
}

.h .h-right ul li.c-quit {
  margin-top: 4px;
  cursor: pointer;
  margin-left: 4px;
}

/* .h .h-right ul li.c-quit .line {
   height: 20px;
   border: 1px solid #ccc;
   float: left;
   margin-right: 10px;
} */
/* .h .h-right ul li.c-quit a {
   float: left;
} */

.h .h-right ul li .el-button--primary {
  background-color: rgba(0, 0, 0, 0.15);
  border-color: #48556e;
  color: #cccccc;
}

.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: pink;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>

<template>
  <el-container>
    <el-header>
      <div class="h">
        <div class="h-left">
          <div class="h-logo">
            <img src="../images/sdl.png" />
          </div>
          <!-- <div v-show="SoftType == 32" class="h-title">
            {{ SDL_Global.SYS.SystemNames }}
          </div>  v-show="SoftType == 21 || SoftType == 22"-->
          <div class="h-title">
            {{ SDL_Global.SYS.SystemName }}
          </div>
          <div class="h-socketInfo">{{ communication }}</div>
        </div>
        <div class="h-right">
          <ul>
            <li class="c-systemDate">
              <span style="margin-right: 10px">{{ systemDate }}</span
              >{{ hours }}<span class="point">:</span>{{ min
              }}<span class="point">:</span>{{ sec }}
            </li>
            <!-- <el-tab-pane label="系统通知" name="first">
                    <div>
                      <p style="color: black">系统通讯正常</p>
                      <p style="font-size: 12px">2021-11-05 13:25:33</p>
                      <div
                        style="
                          border-bottom: 1px solid #ccc;
                          margin-top: 10px;
                          margin-bottom: 10px;
                        "
                      ></div>
                    </div>
                  </el-tab-pane> -->
            <li
              class="c-systemDate"
              style="margin-right: 29px"
              v-if="SoftType == 32"
            >
              <el-popover
                placement="bottom-end"
                width="300"
                trigger="click"
                v-model="myVisible"
              >
                <el-tabs
                  class="messageTabs"
                  tab-position="top"
                  style="min-height: 400px"
                  v-model="noticeTabsIndex"
                  @tab-click="noticeTabsClick"
                >
                  <el-tab-pane
                    name="second"
                    id="warningContent"
                    :label="'预警通知(' + warningList.length + ')'"
                  >
                    <p v-if="warningList.length == 0">暂无通知</p>
                    <template v-for="(item, index) in warningList">
                      <div :key="index">
                        <p style="color: black; cursor: pointer">
                          <span @click="getWarningInfo(item)">
                            {{ item.Info }}
                          </span>
                          <span
                            title="忽略"
                            @click="clearInfo(item.id)"
                            style="
                              float: right;
                              margin-right: 8px;
                              margin-top: -5px;
                              cursor: pointer;
                            "
                            >×</span
                          >
                        </p>
                        <p style="font-size: 12px">
                          预警时间：{{ item.DataTime }}
                          <el-tag
                            style="float: right"
                            type="warning"
                            size="mini"
                            >{{ item.WarnTypeText }}</el-tag
                          >
                        </p>
                        <div
                          style="
                            border-bottom: 1px solid #ccc;
                            margin-top: 10px;
                            margin-bottom: 10px;
                          "
                        ></div>
                      </div>
                    </template>
                  </el-tab-pane>
                  <div
                    v-if="warningList.length > 0"
                    @click="clearWarningNotice"
                    class="warnfooter"
                  >
                    <p>全部忽略</p>
                  </div>
                </el-tabs>
                <template v-if="warningList.length > 0">
                  <el-badge
                    @click="myVisible = !myVisible"
                    slot="reference"
                    :value="warningList.length"
                    :max="99"
                    class="item"
                  >
                    <i
                      style="font-size: 20px; cursor: pointer"
                      class="el-icon-bell"
                    ></i>
                  </el-badge>
                </template>
                <template v-else-if="warningList.length == 0">
                  <el-badge
                    @click="myVisible = !myVisible"
                    slot="reference"
                    class="item"
                  >
                    <i
                      style="font-size: 20px; cursor: pointer"
                      class="el-icon-bell"
                    ></i>
                  </el-badge>
                </template>
              </el-popover>
            </li>
            <li class="c-moshi">
              <el-dropdown
                v-if="SoftType == 32"
                size="small"
                split-button
                type="primary"
                @command="handlePattern"
              >
                <!-- handlePattern(SDL_Global.PLC.YunXingMoShi) -->
                {{ SDL_Global.PLC.YunXingMoShiText }}
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">维护模式</el-dropdown-item>
                  <!-- <el-dropdown-item command="2">间歇模式</el-dropdown-item>
                  <el-dropdown-item command="4">应急模式</el-dropdown-item> -->
                  <el-dropdown-item command="8">质控模式</el-dropdown-item>
                  <el-dropdown-item command="5">定点模式</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown
                v-else
                size="small"
                split-button
                type="primary"
                @command="handlePattern"
              >
                <!-- {{ handlePattern(SDL_Global.PLC.YunXingMoShi) }} -->
                {{ SDL_Global.PLC.YunXingMoShiText }}

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">维护模式</el-dropdown-item>
                  <el-dropdown-item command="2">间歇模式</el-dropdown-item>
                  <el-dropdown-item command="4">应急模式</el-dropdown-item>
                  <el-dropdown-item command="8">质控模式</el-dropdown-item>
                  <el-dropdown-item command="5">定点模式</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li class="c-user">
              <!-- <span class="el-dropdown-link">
                <span class="iconfont icon-yonghu2">&nbsp;&nbsp;{{ userName }}</span>
              </span> -->

              <el-dropdown size="small" split-button type="primary">
                <span> {{ roleName(RoleID) }}</span>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="2">
                    <span class="iconfont icon-yonghu2" style="font-size: 14px">
                      {{ userName }}</span
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span class="line"></span>
                    <router-link to @click.native="openkey()" replace>
                      <span
                        class="iconfont icon-jianpan"
                        style="font-size: 14px"
                      >
                        打开键盘</span
                      >
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div class="c-icon" @click="click()">
                      <span
                        :class="
                          isFullscreen
                            ? 'iconfont icon-tuichuquanping'
                            : 'iconfont icon-quanping'
                        "
                        style="font-size: 14px"
                      >
                        {{ showbtn }}</span
                      >
                      <!-- class="iconfont icon-quanping" -->
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span class="line"></span>
                    <router-link to @click.native="esclogin()" replace>
                      <span
                        class="iconfont icon-qiehuanyonghu"
                        style="font-size: 14px"
                      >
                        切换用户</span
                      >
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span class="line"></span>
                    <router-link to @click.native="clearCookies()" replace>
                      <span class="el-icon-refresh" style="font-size: 14px">
                        清除缓存</span
                      >
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span class="line"></span>
                    <router-link
                      to
                      @click.native="openSoftInfoDialog()"
                      replace
                    >
                      <span class="el-icon-info" style="font-size: 14px">
                        软件信息</span
                      >
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span class="line"></span>
            

                    <router-link to @click.native="openPdfs()" replace>
                      <span class="el-icon-tickets" style="font-size: 14px">
                        问题排查</span
                      >
                    </router-link>

                    <!-- <a href="f:\水质子站系统\水质采集\Y_源代码\20200701\web\server\pdfs\wqms_question.pdf"> 问题排查</a> -->

                    <!-- <embed src="f:\水质子站系统\水质采集\Y_源代码\20200701\web\server\pdfs\wqms_question.pdf" width="100%" height="100%">问题排查
</embed> -->
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-aside
        v-bind:class="{
          elAsideZK: !isCollapse,
          elAsideZD: isCollapse,
        }"
        width=""
      >
        <!-- <div class="cjdmenu">采集端菜单</div>
        <div v-for="menu in menus" :key="menu.url" class="menus">
          <router-link
            :to="{ path: menu.url }"
            @click.native="showToggle(menu,menus)"
            exact-active-class="active"
            replace
          >
            <span class="menuIcon" :class="menu.icon"></span>
            <span class="menuName">{{menu.name}}</span>
            <span class="menuBadge" v-show="menu.alert">{{menu.alert}}</span>
          </router-link>
          <el-collapse-transition>
            <div v-show="menu.isSubShow">
              <div v-for="children in menu.children" :key="children.url">
                <router-link :to="{ path: children.url }" exact-active-class="active" replace>
                  <span class="menuName">{{children.name}}</span>
                </router-link>
              </div>
            </div>
          </el-collapse-transition>
        </div> -->
        <!-- @open="handleOpen" @close="handleClose" -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          style="border: none"
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#303a4e"
          text-color="rgba(255,255,255,.65)"
          :unique-opened="true"
          @select="selectMenu"
        >
          <template v-for="(menu, index) in menus">
            <el-menu-item
              v-if="typeof menu.children == 'undefined' && menu.isShow"
              :key="index"
              :index="menu.url"
              :class="{ active: showpath == menu.url }"
            >
              <i style="padding-right: 10px" :class="menu.icon"></i>
              <span slot="title">{{ menu.name }}</span>
            </el-menu-item>
            <!-- <el-collapse-transition> -->
            <el-submenu
              v-if="menu.children && menu.children.length > 0 && menu.isShow"
              :key="index"
              :index="menu.url"
              :class="{ active: showpath == menu.url }"
            >
              <template slot="title">
                <i style="padding-right: 10px" :class="menu.icon"></i>
                <span slot="title">{{ menu.name }}</span>
              </template>
              <el-menu-item-group
                v-for="(children, cindex) in menu.children"
                :key="cindex"
              >
                <template slot="title"></template>
                <el-menu-item
                  v-if="children.isShow"
                  :index="children.url"
                  :class="{ active: showpath == children.url }"
                  >{{ children.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- </el-collapse-transition> -->
          </template>
          <template v-show="isCollapse">
            <el-tooltip
              class="item"
              effect="dark"
              content="展开"
              placement="right"
            >
              <el-menu-item
                @click="collapse"
                v-bind:class="{
                  elAsideZD: isCollapse,
                }"
                style="position: fixed; bottom: 0px; padding-left: 19px"
              >
                <i
                  style="font-size: 14px; padding-left: 5px"
                  class="iconfont icon-menu_open"
                ></i>

                <!-- <span>收缩菜单</span> -->
              </el-menu-item>
            </el-tooltip>
          </template>
          <template v-show="!isCollapse">
            <el-tooltip
              class="item"
              effect="dark"
              content="收起"
              placement="right"
            >
              <el-menu-item
                @click="collapse"
                v-bind:class="{
                  elAsideZK: !isCollapse,
                }"
                style="position: fixed; bottom: 0px; padding-left: 19px"
              >
                <i
                  style="font-size: 14px; padding-left: 5px"
                  class="iconfont icon-menu_close"
                ></i>
              </el-menu-item>
            </el-tooltip>
          </template>
        </el-menu>
      </el-aside>

      <el-main>
        <!-- 主要内容 -->
        <transition name="fade">
          <router-view />
        </transition>
      </el-main>
      <el-dialog
        title="诊断方案"
        :visible.sync="zdfaModel"
        width="75%"
        :modal-append-to-body="false"
        class="div-dialog"
      >
        <table>
          <thead class="tabThead">
            <!-- style="font-weight: bold;background-color: #384565;" -->
            <td style="width: 40px">报警类型</td>
            <td style="width: 100px">可能原因</td>
            <td>解决方案</td>
            <td style="width: 80px">图片</td>
            <!-- class="el-table_18_column_105  is-center   is-leaf" -->
          </thead>
          <tbody class="guideclass">
            <tr class="el-table__row" v-for="(help, index) in helpData">
              <td
                style="width: 40px"
                v-if="index == 0"
                :rowspan="rowspan"
                class="el-table_1_column_1 is-center"
              >
                {{ help.GuideType }}
              </td>
              <td style="width: 100px">{{ help.ProblemDes }}</td>
              <!-- class="el-table_1_column_1 is-left " -->
              <td>{{ help.Solution }}</td>
              <td style="width: 80px">
                <span
                  v-if="help.ImgUrl != null && help.ImgUrl != ' '"
                  style="cursor: pointer; color: #4a92ff"
                  @click="selPic(help.ImgUrl)"
                >
                  查看大图
                </span>
                <span v-else> 暂无图片 </span>
              </td>
            </tr>
          </tbody>
        </table>
      </el-dialog>
      <template class="dialogBoxs">
        <el-dialog
          title="图片显示"
          :visible.sync="picdialog"
          width="60%"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
        >
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in imgPaths" :key="item">
              <!-- <el-image style="height: 100%; width: 100%" :src="item" fit="scale-down"></el-image>
             -->
              <img :src="item" style="height: 400px; width: 400px" />
            </el-carousel-item>
          </el-carousel>
        </el-dialog>
      </template>

      <el-dialog
        :visible.sync="userDialogVisible"
        width="60%"
        :modal-append-to-body="false"
        class="uesrmodel"
        :close-on-click-modal="false"
        @close="closeDialog"
      >
        <div class="logindiv">
          <div class="loginTop">
            <div class="loginTitle">
              <img src="../images/sdl.png" width="33" height="17" />
              <span>{{ SDL_Global.SYS.SystemName }}</span>
              <!-- <span v-show="SoftType == 32" >
                {{ SDL_Global.SYS.SystemNames }}
              </span> v-show="SoftType == 21 || SoftType == 22"-->
            </div>
            <div class="loginInterface">
              <p class="lit">账号登录</p>
              <el-form
                :model="ruleForm"
                status-icon
                :rules="userRule"
                ref="ruleForm"
                class="demo-ruleForm"
              >
                <el-form-item prop="loginName">
                  <el-input
                    placeholder="登录账号"
                    v-model="ruleForm.loginName"
                    autocomplete="off"
                    style="background-color: #fff"
                    @keyup.enter.native="s"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="loginPwd">
                  <el-input
                    placeholder="登录密码"
                    type="password"
                    v-model.number="ruleForm.loginPwd"
                    autocomplete="off"
                    @keyup.enter.native="keyDowns"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="formName('ruleForm')"
                    size="medium"
                    class="login_btn"
                    >登录</el-button
                  >
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="guestlogin"
                    size="medium"
                    class="login_btn"
                    >访客登录</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="loginBotom">
          <span>© 2019 - {{ SDL_Global.SYS.CompanyName }}</span>
        </div>
      </el-dialog>
      <!-- 软件信息 -->
      <el-dialog
        title="软件信息"
        :visible.sync="softInfoDialogVisible"
        width="450px"
        center
      >
        <div class="softInfoDialogVisible">
          <el-row>
            <el-col :span="5" :offset="2"> 系统类型 </el-col>
            <el-col :span="15" style="font-weight: 100">
              {{ iniConfig.ProType }}【{{ webConfig.softInfo }}】
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="2"> 系统版本 </el-col>
            <el-col :span="15" style="font-weight: 100">
              v-{{ iniConfig.Version }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="2"> 部署时间 </el-col>
            <el-col :span="15" style="font-weight: 100">
              {{
                !iniConfig.InstallDate
                  ? "--"
                  : iniConfig.InstallDate.substr(0, 10)
              }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="2"> 设备 ID </el-col>
            <el-col :span="15" style="font-weight: 100">
              {{ iniConfig.MachineCode }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="2"> 产品 ID </el-col>
            <el-col :span="15" style="font-weight: 100">
              {{ iniConfig.SoftKey }}
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5" :offset="2"> 客服电话 </el-col>
            <el-col :span="15" style="font-weight: 100">
              {{ webConfig.KeFuPhone }}
            </el-col>
          </el-row>
        </div>
      </el-dialog>

      <div id="example1"></div>
      <!-- <el-footer style="height: 50px;">© 2019 - 北京雪迪龙科技股份有限公司</el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
import moment from "moment";
import menuData from "../../server/models/menu.json";
import menuData22 from "../../server/models/menu22.json";
import menuDataFC from "../../server/models/menuFC.json";
import NewmenuData from "../../server/models/NewMenu.json";
import { DateTime } from "../common/js/date.js";
import { setInterval } from "timers";
// import menus from "../../server/models/menu.json";

import users from "../../server/models/users.json";

import zdyy from "./module/zdyy";

// import jclc from "@config/jclc";
import screenfull from "screenfull";
export default {
  name: "App",
  data() {
    let _iniConfig = this.GetIniConfigInfo();
    if (!_iniConfig.SoftKey) {
      this.$router.push("/initPage");
    }
    let _appConfig = this.GetAppConfigJson();
    let date = new DateTime(); //调用datetime获取时间格式
    let menuDatas = [];


   let _customPointName = JSON.parse(
      localStorage.getItem("clientConfigInfo")
    ).customPointName;

    if (!!JSON.parse(localStorage.getItem("softType"))) {
      if (JSON.parse(localStorage.getItem("softType")) == 32) {
        menuDatas = NewmenuData; //.filter((m) => m.isShow == true);
      } else if (localStorage.getItem("softType") == 22) {
        menuDatas = menuData22;
      } else {
      
        if (_customPointName=='龙感湖浮船站') {
          menuDatas = menuDataFC;
        } else {
          menuDatas = menuData;
        }
      }
    }

    return {
      softInfoDialogVisible: false,
      iniConfig: _iniConfig,
      webConfig: _appConfig,
      customPointName: _customPointName,
      optTime: false,
      warningList: [], //预警通知数据

      pdfurls: "",

      zdfaModel: false,
      helpData: [],
      rowspan: 0,
      picdialog: false,
      imgPaths: "",

      myVisible: false,
      noticeTabsIndex: "second",
      menus: menuDatas,
      RoleID: JSON.parse(localStorage.getItem("RoleID")),
      userName: localStorage.getItem("Loginedname"),

      SoftType: JSON.parse(localStorage.getItem("softType")),
      systemDate: date.getDate("."),
      getDateName: date.getDateWeek(),
      hours: date.getHour(),
      min: date.getMinute(),
      sec: date.getSecond(),
      communication: "", //通讯是否正常
      ms: this.socketApi.jclcConfig, //运行模式
      isCollapse: true, //折叠
      showpath: this.$route.path,
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
      SDL_Globalfun: this.socketApi.globalDataConfig,
      //CurrentPatternValue: 0,
      CurrentPatternText: "未知",
      fullscreenLoading: false,
      isFullscreen: false,
      showbtn: "退出全屏",
      userDialogVisible: false,
      ruleForm: {
        loginName: "",
        loginPwd: "",
      },
      users: users,
      userRule: {
        loginName: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
        ],
        loginPwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    "$route.path": function (newVal, oldVal) {
      if (newVal == "/login") {
        this.esclogin();
      } else if (newVal == "/401") {
      } else {
        this.showpath = newVal;
        console.log("showpath", this.showpath);
        console.log("active", this.$route.path);
      }
    },
  },
  created() {},
  mounted() {
    let $this = this;
    setInterval(() => {
      let date = new DateTime(); //调用datetime获取时间格式
      this.getDateName = date.getDateWeek();
      this.hours = date.getHour();
      this.min = date.getMinute();
      this.sec = date.getSecond();
      this.communication = this.socketApi.socketParam.info;
      this.systemDate = date.getDate(".");
    }, 1000);

    this.$store.commit("getIsCollapse", this.isCollapse);

    window.addEventListener("keydown", this.KeyDown, true); // 监听按键事件
    console.log("菜单", this.menus);
    // 折叠
    this.collapse();
    if (this.$route.path == "/401") {
      this.$router.push("/");
    }

    // document.getElementById("tid").innerHTML = this.SDL_Global.SYS.SystemName;
    this.init();
    //预警通知定时器
    if (this.SoftType == 32) {
      $this.updateNoticeList();
      setInterval(() => {
        $this.updateNoticeList();
      }, 1000 * 60 * 5);
    }
  },
  beforeDestroy() {
    this.destroy();
  },
  components: {
    zdyy,
  },
  methods: {
    openPdfs() {
      let fileName = "";
      if (this.SoftType == 32) {
        fileName =
          this.GetAppConfigJson().ImgHostName +
          this.GetAppConfigJson().wwPDFURL;
      } else {
        fileName =
          this.GetAppConfigJson().ImgHostName +
          this.GetAppConfigJson().wqPDFURL;
      }
      window.open(fileName);
    },

    openSoftInfoDialog() {
      this.softInfoDialogVisible = true;
    },
    clearCookies() {
      let $this = this;
      $this
        .$confirm("确认清除缓存后，请按[F5]刷新页面即可生效", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          $this.$message.success("缓存清除成功，请按[F5]刷新页面即可生效");
          localStorage.setItem("clientConfigInfo", "");
          localStorage.setItem("appConfig", "");
        });
    },
    //清空预警通知
    clearWarningNotice() {
      let ids = [];
      this.warningList.map(function (item) {
        ids.push(`'${item.id}'`);
      });

      let $this = this;
      $this
        .$confirm("确认忽略预警信息通知内容吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          $this.http
            .post("/updateWarningDatas", { ids: ids.join(",") })
            .then((res) => {
              // console.log("123123123=", res);
              if (res.affectedRows > 0 || res[0].affectedRows > 0) {
                // $this.addlog({
                //   content: "清空预警信息通知",
                //   params: ids.join(","),
                // });
                $this.http.addLog(
                  `${this.userName}清空预警信息通知`,
                  ids.join(",")
                );

                //明天改
                $this.updateNoticeList();
                $this.$message.success("操作成功");
              } else {
                $this.$message.error("操作失败");
              }
            })
            .catch((res) => {
              console.log("res=", res);
              $this.$message.error(res);
            });
        });
    },
    clearInfo(id) {
      let ids = [`${id}`];

      let $this = this;
      $this
        .$confirm("确认忽略预警信息通知内容吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          $this.http
            .post("/updateWarningDatas", { ids: ids.join(",") })
            .then((res) => {
              if (res.affectedRows > 0 || res[0].affectedRows > 0) {
                // $this.addlog({
                //   content: "清空预警信息通知",
                //   params: ids.join(","),
                // });
                $this.http.addLog(`${this.userName}清空预警信息通知`),
                  ids.join(",");

                //明天改
                $this.updateNoticeList();
                $this.$message.success("操作成功");
              } else {
                $this.$message.error("操作失败");
              }
            })
            .catch((res) => {
              console.log("res=", res);
              $this.$message.error(res);
            });
        });
    },
    openDetails(id) {
      alert(id);
    },
    //获取预警通知信息
    updateNoticeList() {
      let $this = this;
      if ($this.SoftType == 32) {
        $this.http
          .get("/getWarningDatas")
          .then((res) => {
            if (res.length != 0) {
              res.forEach(function (item) {
                // item.DataTime = moment(item.DataTime).format(
                //   "YYYY-MM-DD HH:mm:ss"
                // );
                item.DataTime = $this.$options.filters.dateFormat(
                  item.DataTime
                );
                switch (item.WarnType) {
                  case 0:
                    item.WarnTypeText = "试剂预警";
                    break;
                  case 1:
                    item.WarnTypeText = "运维预警";
                    break;
                  case 2:
                    item.WarnTypeText = "数据预警";
                    break;
                  case 3:
                    item.WarnTypeText = "备件预警";
                    break;
                  default:
                    item.WarnTypeText = "其他";
                }
                if (item.PolId == "w00000") {
                  item.Info = "系统：" + item.Info;
                } else {
                  item.Info =
                    pollutant.filter((m) => m.code == item.PolId)[0].name +
                    "：" +
                    item.Info;
                }
              });

              $this.warningList = res;
              console.log("最新报警数据", $this.warningList);
            } else {
              this.warningList = [];
            }
          })
          .catch((res) => {
            console.log(res);
            $this.$message.error(res);
          });
      }
    },
    //  获取报警原因
    getWarningInfo(val) {
      this.zdfaModel = true;
      let comdition = "`AlarmIDs` LIKE '%[" + val.AlarmID + "]%'";
      this.http
        .get("/gettbhelpguide", {
          comdition,
        })
        .then((res) => {
          if (res.length != 0) {
            //表格数据
            this.helpData = res;
            this.rowspan = res.length;
            // console.log("诊断数据", this.helpData);
          }
        })
        .catch((res) => {
          // console.log(res);
          setTimeout(() => {
            // this.emptyText = "暂无数据";
          }, 1000);
        });
    },
    //查看大图
    selPic(val) {
      this.picdialog = true;
      this.imgPaths = val;

      console.log(" this.imgPaths", this.imgPaths);
    },
    //弹出运维周期对话框
    openOptDialog() {
      console.log(localStorage.getItem("optTime"));
      const date1 = moment(localStorage.getItem("optTime"));
      const date2 = moment();

      let dayTimespan = date2.diff(date1, "minute");
      console.log(dayTimespan);
      if (!localStorage.getItem("optTime") || dayTimespan > 5) {
        if (!this.optTime) {
          this.optTime = true;
          this.$alert("由于您长时间没有操作系统，请点击确认后进行操作", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: false,
            showClose: false,
          }).then(() => {
            //这里写入运维周期代码
            this.$message({
              type: "success",
              message: "操作成功!",
            });
            localStorage.setItem(
              "optTime",
              moment().format("YYYY-MM-DD HH:mm:ss")
            );
            this.optTime = false;
          });
        }
      }
    },
    noticeTabsClick(e) {},
    // 监听键盘F11
    KeyDown(event) {
      if (event.keyCode === 122) {
        event.returnValue = false;
        this.click(); //触发全屏的按钮
      }
    },
    //  切换全屏状态
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: "浏览器不支持全屏",
          type: "warning",
        });
        return false;
      }

      screenfull.toggle();
    },

    change() {
      this.isFullscreen = screenfull.isFullscreen;
      if (!this.isFullscreen) {
        this.showbtn = "全屏查看";
      } else {
        this.showbtn = "退出全屏";
      }
    },
    init() {
      this.change();

      // alert(screenfull)
      if (screenfull.enabled) {
        // screenfull.toggle();

        // 默认全屏
        // screenfull.request();  默认全屏显示
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    },

    //打开小键盘
    openkey() {
      this.http
        .get("/ControlVirtualKeyBoard")
        .then((res) => {
          if (res == "200") {
            // this.$message.success("打开成功");
            // console.log("结束使用键盘");
          } else {
            // this.$message.error("打开失败");
          }
        })
        .catch((res) => {
          console.log(res);
          this.$message.error(res);
        });
    },
    //  切换用户账号
    esclogin: function () {
      this.userDialogVisible = true;

      this.ruleForm.loginName = "";
      this.ruleForm.loginPwd = "";
      // this. closeDialog()

      //首次打开无法识别验证，不清除
      if (this.$refs["ruleForm"] != undefined) {
        this.$refs["ruleForm"].resetFields();
      }
    },
    sendml(name, ml, mlstate) {
      let $this = this;
      var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;
      // $this.$message.info(data);
      console.log("PLC_Mode", data);
      if ($this.RoleID == 0) {
        $this.$message.info("该用户暂无权限，请切换其他用户");
      } else {
        $this.socketApi.sendSock(data);
      }
    },
    handlePattern(command) {
      // if (this.RoleID == 0) {
      // this.$message.info("该用户暂无权限，请切换其他用户");
      // } else {
      this.$confirm(
        "模式切换可能会导致数据丢失，请确认设备是否全部处于待机状态！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let rizhikong = false;
          let tiaoshi = false;
          // this.SDL_Global.PLC.YunXingMoShiText
          let MoShiNow = this.SDL_Globalfun.formatPLCMoShiStatusToText(
            +command
          );
          // 定点模式
          if (+command == 5) {
            command = 1;
            tiaoshi = true;
          }
          // 质控模式
          else if (+command == 8) {
            rizhikong = true;
            command = 2;
          }
          // 页面加载。。。
          this.openFullScreen1();

          if (this.SoftType == 32) {
            // 采样器去掉
            // if (this.SDL_Global.CY.MeterStatusText == "启动") {
            //  命令发送
            this.sendml(
              // this.CurrentPatternText,
              "模式切换为" + MoShiNow,
              this.SDL_Global.CMD.PLC_Mode.Format(+command, rizhikong, tiaoshi)
            );
            // } else {
            //   this.$message.error("请先启动采样器,再进行模式切换！");
            // }
          } else {
            //  命令发送
            this.sendml(
              // this.CurrentPatternText,
              "模式切换为" + MoShiNow,
              this.SDL_Global.CMD.PLC_Mode.Format(+command, rizhikong, tiaoshi)
            );
          }

          // return this.CurrentPatternText;
        })
        .catch(() => {});
    },
    openFullScreen1() {
      const loading = this.$loading({
        lock: true,
        // text: "正在加载…",
        // spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.3)",
      });
      setTimeout(() => {
        loading.close();
      }, 500);
    },

    // 用户角色
    roleName(p) {
      if (p == 0) {
        return "访客";
      } else if (p == 1) {
        return "管理员";
      } else if (p == 2) {
        return "运维人员";
      } else if (p == 3) {
        return "超级管理员";
      } else if (p == 4) {
        return "反控人员";
      }
    },
    //菜单切换
    selectMenu(index) {
      var pubMenu = [
        "/sssj",
        "/lct",
        "/lct22",
        "/lctfc",
        "/jcsj",
        "/wscx",
        "/zkcx",
        "/spjk",
        "/qxfx",
        "/bjtj",
        "/ywrl",
        "/gztj",
        "/bjsj",
        "/yjsj",
        "/rzsj",
        "/khrw",
        "/jbkz",
        "/jdbd",
        "/dtjb",
        "/xtkz",
        "/cssz",
        "/sbgl",
        "/ywjl",
        "/bbjl",
        "/jbsz",
        "/yhgl",
        "/sbsj",
        "/ckkz",
        "/spgl",
        "/bjhcgl",
        "/bjyy",
        "/sjcbtj",
        "/ywzqtj",
        "/yxsjtj",
        "/yxsctj",
        "/zjsj",
        "/dcsj",
        "/plcbfkz",
      ];
      var menu = [];
      if (this.RoleID == 0) {
        if (this.SoftType == 32) {
          menu = ["/sssj"];
        } else if (this.SoftType == 21 || this.SoftType == 23) {
          debugger;
        
          if (this.customPointName=='龙感湖浮船站') {
            menu = ["/sssj", "/lctfc"];
          } else {
            menu = ["/sssj", "/lct"];
          }
        } else if (this.SoftType == 22) {
          menu = ["/sssj", "/lct22"];
        }
      } else if (this.RoleID == 1) {
        menu = pubMenu;
      } else if (this.RoleID == 2) {
        menu = pubMenu;
      } else if (this.RoleID == 3) {
        menu = pubMenu;
      } else if (this.RoleID == 4) {
        menu = pubMenu;
      }

      // console.log(menu);
      if (index == null) {
        this.$router.push(this.$route.path);
        this.showpath = this.$route.path;
      } else if (menu.indexOf(index) < 0) {
        this.showpath = index;
        this.$router.push("/401");
      } else {
        this.$router.push(index);
        this.showpath = index;
      }

      // if (index != null) {
      //   this.show = index;
      // }
    },
    //菜单折叠
    collapse() {
      console.log(" this.isCollapse 前=", this.isCollapse);
      this.isCollapse = !this.isCollapse;
      this.$store.commit("getIsCollapse", this.isCollapse);
      console.log(" this.isCollapse 后=", this.isCollapse);
    },

    keyDowns(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.formName("ruleForm");

        this.destroyed();
      }
    },
    guestlogin() {
      // if (this.userName)
      // this.getUsers();
      (this.ruleForm.loginName = "guest"), (this.ruleForm.loginPwd = "123456");
      if (this.RoleID == 0) {
        this.$message.info("当前用户已是访客");
        this.userDialogVisible = false;
      } else {
        this.formName("ruleForm");
      }
    },
    closeDialog() {
      this.$refs["ruleForm"].resetFields();
    },
    formName(ruleForm) {
      let $this = this;
      this.$refs[ruleForm].validate((valid) => {
        // debugger;
        if (valid) {
          this.http
            .post("/postLogin", {
              name: this.ruleForm.loginName,
              pwd: this.ruleForm.loginPwd,
            })
            .then((res) => {
              if (res && res.Code == 200) {
                this.$message.success({
                  message: res.Msg,
                  duration: 2000,
                });
                let user = {
                  Loginedname: this.ruleForm.loginName,
                  RoleID: res.Data.RoleID,
                  // appConfig: res.appConfig.config,
                };
                this.http.addLog(`${this.userName}退出系统`);
                this.$store.commit("LOGOUT");
                // this.addlogs(this.userName);

                this.userName = this.ruleForm.loginName;
                this.RoleID = user.RoleID;
                this.$store.commit("LOGIN", user);
                if (this.SoftType == 32) {
                  this.$router.push("/sssj");
                } else if (this.SoftType == 21 || this.SoftType == 23) {
            
          if (this.customPointName=='龙感湖浮船站') {
           this.$router.push("/lctfc");
          } else {
            this.$router.push("/lct");
          }
                 
                } else if (this.SoftType == 22) {
                  this.$router.push("/lct22");
                }
                // this.screenMenus(user.appConfig.SoftType);

                var ml = this.SDL_Global.CMD.SYS_UserRoleID.Format(
                  res.Data.RoleID
                );

                setTimeout(function () {
                  $this.http.addLog(`${$this.userName}登录系统`);
                  // $this.addlog($this.userName);
                }, 1000);

                //后端需要
                var mlName = "当前用户";
                var data =
                  "" +
                  localStorage.getItem("Loginedname") +
                  "," +
                  mlName +
                  "," +
                  ml;
                setTimeout(function () {
                  $this.socketApi.sendSock(data);
                }, 10000);
                this.userDialogVisible = false;
              } else {
                this.$message.error({
                  message: res.Msg,
                  duration: 2000,
                });
              }
            })
            .catch((res) => {
              // console.log(res);
              this.$message.error(res);
            });
        } else {
          return false;
        }
      });
    },
    destroyed() {
      window.removeEventListener("keydowns", this.keyDowns, false);
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active,
.fade-enter-to {
  transition: opacity 0.5s;
}

.fade-enter,
  .fade-leave-to

  /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity 0s;
}

.el-container {
  height: 100%;
  background-color: rgba(37, 48, 68);
  overflow: hidden;
}

.el-header {
  height: 64px;
  width: 100%;
  background: #303a4e;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  z-index: 10;
  position: relative;
}

.el-aside {
  height: calc(100vh - 116px);
  background: white;
  overflow-x: hidden;
  /* border-right: 1px solid #d5dadb; */
}

.el-main {
  height: 100%;
  padding: 0;
  overflow: auto;
  background-color: #263044;
}

.el-footer {
  border-top: 1px solid #e4eaec;
  line-height: 50px;
  color: #656565;
  font-size: 13px;
}

body > .el-container {
  margin-bottom: 40px;
}

/* .clock {
    margin-right: 50px;
  }

  .clock ul {
    margin: 5px auto;
    padding: 0px;
    text-align: center;
  }

  .clock ul li {
    display: inline;
    font-size: 1.6em;
    text-align: center;
    font-family: "BebasNeueRegular", Arial, Helvetica, sans-serif;
    text-shadow: 0 0 5px #00c6ff;
    color: #fff;
  }

  .clock .point {
    position: relative;
    animation: change 1s ease infinite;
    padding-left: 10px;
    padding-right: 10px;
  } */

.titleMenu {
  margin-right: 40px;
}

.titleMenu ul li {
  display: inline-block;
}

.titleMenu a {
  /* color: #fff; */
  margin: 0 20px 0 20px;
}

.titleMenu a:hover {
  color: #919da8;
}

@keyframes change {
  0% {
    opacity: 1;
    text-shadow: 0 0 20px #00c6ff;
  }

  50% {
    opacity: 0;
    text-shadow: none;
  }

  100% {
    opacity: 1;
    text-shadow: 0 0 20px #00c6ff;
  }
}

.logoImg {
  margin: 18px 5px 0 20px;
}

.title {
  font-size: 25px;
  color: white;
  margin-top: 13px;
}

/*菜单样式*/
.menus {
  cursor: pointer;
  width: 100%;
  height: auto;
  line-height: 45px;
  letter-spacing: 0.025em;
  font-weight: normal;
  box-sizing: border-box;
}

.cjdmenu {
  font-size: 10px;
  color: #919da8;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-top: 3px;
}

.menus a {
  width: 100%;
  position: relative;
}

.active {
  color: #fff !important;
  background: #4a92ff !important;
}

.is-active {
  color: rgba(255, 255, 255, 0.65) !important;
}

.menuName {
  margin-left: 70px;
}

.menuIcon {
  position: absolute;
  left: 30px;
}

.communication {
  margin-top: -12px;
  margin-left: 20px;
  font-size: 12px;
  color: white;
}

.elAsideZK {
  width: 185px;
  background-color: #303a4e;
}

.elAsideZD {
  width: 64px;
  background-color: #303a4e;
}

@media screen and (max-width: 1024px) {
  .elAsideZK {
    width: 160px;
    background-color: #303a4e;
  }

  .elAsideZD {
    width: 60px;
    background-color: #303a4e;
  }

  .h .h-left .h-socketInfo {
    display: none;
  }
}

/* .content {
  width: 84%;
  height: 703px;
  background-color: rgb(245, 247, 250);
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
} */

.logindiv {
  width: 320px;
  height: 345px;
  margin: 0px auto;
  padding-top: 30px;
}

.loginTop {
  width: 100%;
  height: 345px;
}

.loginTitle {
  width: 100%;
  height: 47px;
  background: rgb(58, 63, 81);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: #fff;
  text-align: center;
  font-size: 18px;
  line-height: 47px;
}

.loginTitle img {
  margin-top: -3px;
  vertical-align: middle;
}

.loginInterface {
  width: 100%;
  height: 298px;
  background-color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.loginInterface .el-form {
  width: 290px;
  margin: 0 auto;
}

.lit {
  padding-top: 25px;
  padding-bottom: 10px;
  color: #656565;
  font-size: 14px;
  text-align: center;
}

p {
  margin: 0 0 10.5px;
}

.login_btn {
  width: 100%;
  height: 33px;
}

.loginBotom {
  width: 100%;
  height: 50px;
  color: #656565;
  line-height: 50px;
  text-align: center;
  font-size: 13px;
}

.uesrmodel .el-dialog__header {
  background-color: #fff;
}

.uesrmodel .el-dialog__body {
  background-color: #fff;
}

.uesrmodel .el-dialog__headerbtn .el-dialog__close {
  color: #000;
}

.messageTabs .el-tabs__active-bar {
  width: 56px !important;
}

.messageTabs .el-tabs__item.is-active {
  color: #409eff !important;
}

#warningContent {
  overflow: auto;
  height: 350px;
}

.warnfooter {
  height: 46px;
  border-top: 1px solid #cccccc;
}

.warnfooter p {
  margin-top: 20px;
  margin-left: 40%;
  cursor: pointer;
}

/* 诊断方案 */
.div-dialog table {
  width: 100%;
  text-align: center;
  color: #cccccc;
  border-collapse: collapse;
}

.div-dialog table tr {
  background-color: #35415a;
  height: 32px;
  line-height: 32px;
}

.div-dialog table tr:nth-child(odd) {
  background-color: #293244;
}

.div-dialog table tr td {
  /* width: 200px; */
  border-right: 1px solid #3c4860;
}

.div-dialog-more table tr td {
  /* width: 200px; */
  border-right: 1px solid #3c4860;
  text-align: left;
  padding-left: 10px;
}

.tabThead td {
  font-weight: bold;
  background-color: rgb(56, 69, 101);
  height: 48px;
  text-align: left;
  padding-left: 10px;
}

.guideclass td {
  background-color: #364055;
  color: seashell;
  border: 1px solid #303a4c;
  text-align: left;
  padding-left: 10px;
}

.softInfoDialogVisible {
  color: #fff;
}

.softInfoDialogVisible .el-row {
  margin-bottom: 20px;
}

.softInfoDialogVisible .el-row:last-child {
  margin-bottom: 0;
}

.softInfoDialogVisible .el-row:first-child {
  margin-top: 0;
}
</style>