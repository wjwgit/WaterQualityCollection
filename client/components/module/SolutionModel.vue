<template>
  <div>
    <el-dialog
      :title="Name"
      :visible.sync="dialogSolutionVisible"
      width="900px"
      :modal-append-to-body="false"
      class="div-dialog"
    >
      <div style="height: 485px;margin-top:18px ;">
        <div class="contentimg">
          <el-carousel
            indicator-position="none"
            v-if="imgPaths.length>0"
            :autoplay="false"
          >
            <el-carousel-item v-for="item in imgPaths" :key="item">
              <!-- <el-image style="height: 390px; width:648px" :src="item" :preview-src-list="imgPaths"></el-image> -->
              <div>
                <img :src="item" style="width:366px;height:450px" />
              </div>
            </el-carousel-item>
          </el-carousel>
           <img v-else src="../../images/NotImg.png" class='imgs' style="width:366px;height:450px"/>
        </div>
        <div class="contentspan">
          <h3 size="small" class="h3s"> 查看步骤</h3>
          <hr class="hr" />
          <div>
          <span class='fontcontent' v-html="SolutionInfo" size="small"></span>

          </div>
        </div>
        <!-- <div
          class="bjinfos"
          v-else
          style="color: rgba(255, 255, 255, 0.65) !important"
        >
          <span size="small"> 解决方案：</span>
          <span v-html="SolutionInfo" size="small"></span>
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>
<script >
export default {
  props: {
    // dialogParam: {
    Name: String,
    solutionVisible: {
      //是否带有纵向边框
      type: Boolean,
      default: () => false,
    },
    imgPaths: {
      type: Array,
      default: () => [],
    },
    SolutionInfo: String,

    // },
  },
  data() {
    return {
      SDL_Global: this.socketApi.globalDataConfig.SDL_Global,
    };
  },

  computed: {
    dialogSolutionVisible: {
      // getter
      get: function () {
        return this.solutionVisible;
      },
      // setter
      set: function (newVal) {
        if (!newVal) {
          this.$emit("update:solutionVisible", false); //触发 input 事件，并传入新值
        }
      },
    },
  },
  methods: {},
};
</script>
<style scoped>

.contentimg{
    /* background-color: pink; */
    /* display: inline-block; */
    width:380px;
    /* height: 100%; */

    float: left;
    margin-left:25px;
    margin-right:40px;
}
.contentspan{
    /* background-color: pink; */
    /* display: inline-block; */
    width:380px;
    height: 100%;
    float: left;
    color: #fff;
    text-align: left;
}
.h3s{
font-size: 26px;
margin-top: 0;
margin-bottom: 10px;
    color: rgb(238, 231, 231) !important;

}
.fontcontent{
font-size: 18px ;
      color: rgb(238, 231, 231) !important;


}
.hr{
width: 30px;

/* text-align: left; */
margin-left:0px
}
.imgs{
    background-color: #495a80;
}
.body-footer {
  color: #cccccc;
  height: 46px;
  line-height: 46px;
  margin-left: 20px;
  font-size: 14px;
  text-align: left;
}
</style>