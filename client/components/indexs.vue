<template>
    <div class="error401">
        <div class="warp">
            <div class="box">
            </div>
        </div>

    </div>
</template>
<script>
    import { DateTime } from "../common/js/date.js";

    export default {
        name: "indexs",
        data() {
            let date = new DateTime(); //调用datetime获取时间格式
            return {
                loginName: "system",
                loginPwd: "system",
            };
        },
        mounted() {
            this.goindex()
        },
        methods: {
            goindex() {
                let user = {
                    Loginedname: this.loginName,
                    RoleID: 1,
                };
                this.http
                    .get("/login", {
                        name: this.loginName,
                        pwd: this.loginPwd,
                    })
                    .then((res) => {
                        if (res == 3) {
                            this.$message({
                                message: "没有此用户",
                                type: "warning",
                                duration: 2000,
                            });
                        } else if (res == 2) {
                            this.$message.error({
                                message: "登录账号或登录密码错误",
                                duration: 2000,
                            });
                        } else if (res.RoleID != undefined&&res.RoleID != 'undefined') {
                            // console.log("res", res);
                            let user = {
                                Loginedname: this.loginName,
                                RoleID: res.RoleID,
                                appConfig: res.appConfig
                                // ssztConfig: res.ssztConfig,
                                // jclcConfig: res.jclcConfig,
                                // lcbjConfig: res.lcbjConfig,
                            };
                            this.$store.commit("LOGIN", user);
                            this.$router.push("/");
                        }
                    })
                    .catch((res) => {
                        // console.log(res);
                        this.$message.error("服务器内部错误【DBClose】");

                    });


                // this.$store.commit("LOGIN", user);
                // this.$router.push("/lct");
            }
       
       
        }
    }
</script>