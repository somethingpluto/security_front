<template>
  <div class="login-container">
    <div class="header" />
    <div class="body">
      <el-card class="login-card" shadow="hover">
        <div>
          <h3>欢迎使用xxx系统</h3>
        </div>
        <el-tabs v-model="activeTab" stretch>
          <el-tab-pane label="登录" name="login">
            <el-form ref="loginForm" style="width: 100%" :rules="loginRules" :model="loginForm" label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" style="width: 100%" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" style="width: 100%" type="password" />
              </el-form-item>
            </el-form>
            <div style="display: flex;justify-content: center;align-items: center">
              <el-button type="primary" style="width: 80%" @click="handleLogin">立即登录</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="注册" name="second">
            <el-form style="width: 100%" :rules="registerRules" :model="registerForm" label-width="80px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username" style="width: 100%" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" style="width: 100%" type="password" />
              </el-form-item>
              <el-form-item label="确认密码" prop="password">
                <el-input v-model="passwordAgain" style="width: 100%" type="password" />
              </el-form-item>
            </el-form>
            <div style="display: flex;justify-content: center;align-items: center">
              <el-button type="primary" style="width: 80%">立即注册</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <div class="foot">
      所有产权归@湖北大学所拥有
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername, message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword, message: '请输入密码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      activeTab: 'login',
      registerForm: {
        username: '',
        password: ''
      },
      passwordAgain: '',
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername, message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword, message: '请输入密码' }],
        passwordAgain: [{ required: true, trigger: 'blur', validator: validateUsername, message: '请确认密码' }]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  width: 100%;
  height: 100%;
  .header{
    height: 12%;
    background-color: black;
  }
  .body{
    height: 76%;
    display: flex;
    justify-content: right;
    align-items: center;
    background-color:#f7f7f7;
    .login-card{
      width: 400px;
      height:  450px;
      border-radius: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0px;
    }
  }
  .foot{
    height: 12%;
    background-color: #20a0ff;
  }
}

.el-card ::v-deep .el-card__body {
  width: 100%;
}
.foot{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
