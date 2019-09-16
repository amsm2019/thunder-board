<template>
  <div class="container">
    <div class="bg"></div>
    <div class="bg-mask"></div>
    <div class="content">
      <img  class="avatar" src="../assets/logo.png" > 
      <div  class="info">
      <h1>全国三维雷电定位数据系统</h1>
      <br>
      <div> 
        <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" >
        <el-form-item  prop="username" >
          <el-input  
          style="width: 300px"
          placeholder="用户名"
          prefix-icon="el-icon-user"
          v-model="ruleForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input
            style="width: 300px"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.passwd"
            show-password
            @keyup.enter.native="submit('ruleForm')"
          >
          </el-input>
        </el-form-item>
        </el-form>
        <el-button type="primary"  @click="submit('ruleForm')" style="margin-right:20px" >登录</el-button> 
        <el-button @click="reset('ruleForm')" style="magrin-left:20px">重置</el-button> 
      </div>
      <br>
      <hr width="45%" size=1>          
       <div style="margin-top: 20px">
        <el-link type="info">忘记了用户名或密码？</el-link>
        <br>
        <el-link type="info">没有用户名吗？现在注册一个。</el-link>
      </div>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      ruleForm:{
        username:'',
        passwd:''
      },
      rules:{
        username:[
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, message: '长度不小于3个字符', trigger: 'blur' }
        ],
        passwd:[
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 5, message: '长度不小于5个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.username === 'test' && parseInt(this.ruleForm.passwd) === 12345) {
              this.$store.commit('login');
              this.$router.push('/');
            }
          } else {
            if(this.ruleForm.username === '' || this.ruleForm.passwd === ''){
              alert("用户名或密码不能为空")
            }
            else{ 
              alert("用户名或密码错误");
            }
            return false;  
          }
        });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>

<style>
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden; 
  line-height:180%;
}
.bg{
  position:relative;
  height: 100%;
  background:url("../assets/timg.jpg") no-repeat center;
  background-size: cover;
  filter: blur(10px);
}
.bg-mask{
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
}
.content {
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  padding-top: 25px;
  color: #ffffff;
}
.el-form-item__error{
  position:relative;
}
.avatar {
  width: 750px;
  height: 100px;
}
.info{
  font-size: 14px;
  color:black;
}
#app
{
  height:100;
}
</style>
