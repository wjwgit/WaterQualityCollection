<template>
  <div class="yhgl">
    <div style="margin: 0 20px">
      <div class="panel panel-default" v-if="RoleID == 3 || RoleID == 1">
        <div class="panel-body">
          <div class="block">
            <el-button type="primary" size="small" @click="addData"
              >添加</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 0 20px">
      <div class="panel panel-default">
        <!-- <div class="panel-body"> -->
        <!-- <tables :dataSource="tableData" :columns="columns" :height="268" :border="true"></tables> -->
        <el-table
          v-loading="pictLoading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
          element-loading-text="数据正在加载中"
          :data="
            tableData.slice(
              (this.page - 1) * this.size,
              (this.page - 1) * this.size + this.size
            )
          "
          :header-cell-style="{
            'background-color': '#384565',
          }"
          style="text-align: center"
          :height="tableHeight"
          stripe
          :empty-text="emptyText"
        >
          <el-table-column label="编号" align="center" prop="ID" width="100px">
          </el-table-column>
          <el-table-column label="登录账号" align="center" prop="Account">
          </el-table-column>
          <!-- <el-table-column label="报警类型" prop="Type"> </el-table-column> -->
          <el-table-column label="角色" align="center" prop="RoleName">
          </el-table-column>
          <el-table-column label="备注" align="center" prop="Remark">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="editData(scope.row)"
              >
              </el-button>

              <el-button
                v-if="RoleID == 3 || RoleID == 1"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="delData(scope.row)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageNations">
          <el-pagination
            @current-change="currentPage"
            class="pageNation"
            layout="total,sizes,prev, pager, next"
            :page-size="size"
            :page-sizes="[5, 10, 20, 30, 50]"
            @size-change="changeSize"
            :current-page="page"
            :total="total"
          >
          </el-pagination>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <!-- 模态窗 -->
    <template class="dialogBoxs">
      <el-dialog
        title="用户信息"
        :visible.sync="centerDialogVisible"
        width="60%"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        @close="closeDialog"
      >
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="form"
          status-icon
          :rules="userRule"
          ref="form"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="登录账号" prop="Account">
            <el-input v-model="form.Account"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="Pwd">
            <el-input type="password" v-model="form.Pwd"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="RoleID">
            <el-radio-group v-model="form.RoleID">
              <el-radio v-if="RoleID == 0 || RoleID == 3" :label="0"
                >普通用户</el-radio
              >
              <el-radio v-if="RoleID == 1 || RoleID == 3" :label="1"
                >管理员</el-radio
              >
              <el-radio
                v-if="RoleID == 1 || RoleID == 2 || RoleID == 3"
                :label="2"
                >运维人员</el-radio
              >
              <!-- <el-radio :label="4">超级管理员</el-radio>
                            <el-radio :label="5">反控人员</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.Remark"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')" size="small">取 消</el-button>
          <el-button type="primary" @click="userSubmitForm('form')" size="small"
            >保 存</el-button
          >
        </span>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import moment from "moment";
// import tables from "../module/tables";

import excel from "../module/excel";
import { DateTime } from "../../common/js/date.js";

export default {
  name: "yhgl",
  // components: { excel, tables },
  data() {
    //验证
    var PwdVerify = (rule, value, callback) => {
      if (!isValidPW(value)) {
        return callback(new Error("长度应为6位数字"));
      }
      callback();
    };
    return {
      emptyText: "暂无数据",
      centerDialogVisible: false,
      labelPosition: "right",
      RoleID: localStorage.getItem("RoleID"),
      form: {
        Account: "",
        Pwd: "",
        RoleID: localStorage.getItem("RoleID"),
        RoleName: "",
        Remark: "",
      },
      userRule: {
        Account: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
        ],
        Pwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, message: "长度在不少于6个字符", trigger: "blur" },
        ],
        // RoleID: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
      tableData: [],
      total: 0,
      page: 1,
      size: 10,
      pictLoading: false,
      tableHeight: null,
    };
  },
  mounted() {
    // this.inquire();
    this.getData();
    this.getHeight();
    // this.http
    //   .post("/postLogin", {
    //     name: "admin",
    //     pwd: "123456",
    //   })
    //   .then((res) => {
    //     debugger;
    //   })
    //   .catch((res) => {
    //     // console.log(res);
    //     this.$message.error(res);
    //   });

    // this.http
    //   .get("/getUserList", {
    //     RoleID: 3,
    //     Account: "admin",
    //   })
    //   .then((res) => {
    //     debugger;
    //   })
    //   .catch((res) => {
    //     // console.log(res);
    //     this.$message.error(res);
    //   });
  },
  created() {
    window.addEventListener("resize", this.getHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  methods: {
    getHeight() {
      this.tableHeight = window.innerHeight - 226;
    },
    getData() {
      this.http
        .get("/getUserList", {
          RoleID: this.RoleID,
          Account: localStorage.getItem("Loginedname"),
        })
        .then((res) => {
          this.pictLoading = false;
          this.tableData = res;
          this.total = res.length;
        })
        .catch((res) => {
          // console.log(res);
          this.$message.error(res);
        });
    },
    //
    // inquire() {
    //   this.tableData = [];
    //   let condition = "RoleID NOT IN('3','4')";
    //   this.pictLoading = true;
    //   this.emptyText = " ";
    //   this.http
    //     .comMethod("*", "tbuser", condition)
    //     .then((res) => {
    //       // setTimeout(() => {
    //       this.pictLoading = false;
    //       // }, 1000);
    //       if (res.length != 0) {
    //         this.total = res.length;
    //         //表格数据
    //         this.tableData = res;
    //       } else {
    //         this.total = 0;
    //         this.emptyText = "暂无数据";
    //       }
    //     })
    //     .catch((res) => {
    //       setTimeout(() => {
    //         this.pictLoading = false;
    //         this.emptyText = "暂无数据";
    //       }, 1000);
    //       // console.log(res);
    //     });
    // },

    closeDialog() {
      this.$refs["form"].resetFields();
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.centerDialogVisible = false;
    },
    // 添加日志
    addlog(operator) {
      let date = new DateTime(); //调用datetime获取时间格式
      let time =
        date.getDate("-") +
        date.getHour() +
        ":" +
        date.getMinute() +
        ":" +
        date.getSecond();
      this.http
        .post("/addlog", {
          OPTIME: time,
          username: localStorage.getItem("Loginedname"),
          operator: operator,
          cmdargs: operator,
        })
        .then((res) => {
          let ml = "日志上传=" + operator;
          this.Sendml("日志上传", ml);
        })
        .catch((res) => {
          // console.log(res);
          this.$message.error(res);
        });
    },
    //发送命令
    Sendml(name, ml) {
      var data = localStorage.getItem("Loginedname") + "," + name + "," + ml;

      // this.$message.info(data);

      this.socketApi.sendSock(data, true);
    },
    addData() {
      this.centerDialogVisible = true;

      this.form.ID = "";
      this.form.Account = "";
      this.form.Pwd = "";
      this.form.RoleID = 0;
      this.form.RoleName = "普通用户";
      this.form.Remark = "";
      this.form.RoleName = "";
      // this.$refs['form'].clearValidate()
    },

    editData(val) {
      this.centerDialogVisible = true;
      // this.$refs['form'].clearValidate()

      this.form.ID = val.ID;
      this.form.Account = val.Account;
      this.form.Pwd = val.Pwd;
      this.form.RoleID = val.RoleID;
      // this.form.RoleName = val.RoleName;
      this.form.Remark = val.Remark;
      if (val.RoleID == "0") {
        this.form.RoleName = "普通用户";
      } else if (val.RoleID == "1") {
        this.form.RoleName = "管理员";
      } else if (val.RoleID == "2") {
        this.form.RoleName = "运维人员";
      } else if (val.RoleID == "3") {
        this.form.RoleName = "超级管理员";
      } else if (val.RoleID == "4") {
        this.form.RoleName = "反控人员";
      } else {
        this.form.Used = "";
      }
      // this.$refs.form.clearValidate();
    },
    //添加/编辑用户
    userSubmitForm(form) {
      this.$refs[form].validate((valid) => {
        // console.log("id", this.form.ID);
        if (this.form.RoleID == "0") {
          this.form.RoleName = "普通用户";
        } else if (this.form.RoleID == "1") {
          this.form.RoleName = "管理员";
        } else if (this.form.RoleID == "2") {
          this.form.RoleName = "运维人员";
        } else if (this.form.RoleID == "3") {
          this.form.RoleName = "超级管理员";
        } else if (this.form.RoleID == "4") {
          this.form.Used = "反控人员";
        } else {
          this.form.Used = "";
        }
        if (this.form.ID == "") {
          let condition = " Account='" + this.form.Account + "'";
          if (valid) {
            this.http
              .comMethod("*", "tbuser", condition)
              .then((res) => {
                if (res.length != 0) {
                  this.$message.error("用户已存在");
                  return;
                } else {
                  this.http
                    .post("/addUser", {
                      Account: this.form.Account,
                      Pwd: this.form.Pwd,
                      RoleID: this.form.RoleID,
                      RoleName: this.form.RoleName,
                      Remark: this.form.Remark,
                      Status: 0,
                    })
                    .then((res) => {
                      // setTimeout(() => {
                      this.pictLoading = false;
                      // }, 1000);
                      if (res.affectedRows > 0) {
                        this.$message.success("添加成功");
                        this.getData();
                        let operator = "添加用户" + this.form.Account;
                        this.addlog(operator);
                        this.centerDialogVisible = false;
                      } else {
                        this.$message.error("添加失败");
                      }
                    })
                    .catch((res) => {
                      // console.log(res);
                      this.$message.error(res);
                    });
                }
              })
              .catch((res) => {
                setTimeout(() => {
                  this.pictLoading = false;
                }, 1000);
                this.$message.error("服务端错误");

                // console.log(res);/
              });
          } else {
            // console.log("error submit!!");
            return false;
          }
        } else {
          let condition = " Account='" + this.form.Account + "'";
          if (valid) {
            let acctid = false;
            let $this = this;
            this.tableData.forEach((r) => {
              if (
                r["Account"] == $this.form.Account &&
                r["ID"] != $this.form.ID
              ) {
                acctid = true;
              }
            });
            if (acctid == true) {
              this.$message.error("用户已存在");
            } else {
              this.http
                .post("/updateUser", {
                  Account: this.form.Account,
                  Pwd: this.form.Pwd,
                  RoleID: this.form.RoleID,
                  RoleName: this.form.RoleName,
                  Remark: this.form.Remark,
                  Status: 0,
                  ID: this.form.ID,
                })
                .then((res) => {
                  // setTimeout(() => {
                  this.pictLoading = false;
                  // }, 1000);
                  if (res.affectedRows > 0) {
                    this.$message.success("修改成功");
                    this.getData();
                    let operator = "修改了用户" + this.form.Account;
                    this.addlog(operator);
                    this.centerDialogVisible = false;
                  } else {
                    this.$message.error("修改失败");
                  }
                })
                .catch((res) => {
                  setTimeout(() => {
                    this.pictLoading = false;
                  }, 1000);
                  // console.log(res);
                  this.$message.error(res);
                });
            }
          } else {
            // console.log("error submit!!");
            return false;
          }
        }
      });
    },
    //删除用户
    delData(val) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.http
            .post("/delUser", {
              ID: val.ID,
            })
            .then((res) => {
              if (res.affectedRows > 0) {
                this.$message.success("删除成功");
                this.getData();
                let operator = "删除用户" + val.Account;
                this.addlog(operator);
                this.centerDialogVisible = false;
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((res) => {
              // console.log(res);
              this.$message.error(res);
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    currentPage(val) {
      this.page = val;
    },
    changeSize(val) {
      this.size = val;
    },
  },
};
//验证6位密码
function isValidPW(pw) {
  let reg = /^[0-9]{6}$/;
  return reg.test(pw);
}
</script>
<style scoped>
/* 角色颜色 */
.el-radio {
  color: #cccccc;
}

.yhgl .el-form {
  margin: 20px;
  text-align: left;
}

/* 模态框 */
.el-dialog__footer {
  text-align: center !important;
}
</style>