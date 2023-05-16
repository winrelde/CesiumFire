<script setup>
    import { useRouter } from 'vue-router'
    import { ref, reactive } from 'vue';

    const router = useRouter()
    
    const ruleForm = reactive({
        username: '',
        password: '',
      })
      const ruleFormRef = ref()
      const rules = reactive({
        username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
        password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
      })

      const submitForm = () => {
            let username = ruleForm.username;
            let password = ruleForm.password;
            if(username == 'delucawu'){
                if(password == '430340'){
                    const loading = ElLoading.service({
                        lock: true,
                        text: '登录中......',
                        background: 'rgba(0, 0, 0, 0.7)',
                    })
                    window.sessionStorage.setItem('token', ruleForm.username)
                    setTimeout(() => {
                        loading.close()
                        router.push({ name: 'Home' })
                    }, 2000)
                } else {
                    ElMessage.error('密码错误!')
                    return false
                }
            } else {
                ElMessage.error('用户名错误!')
                return false
            }
            
        }
</script>

<template>
    <div class="loginWrap">
        <div class="title">WebGIS 林火蔓延系统</div>
        <div class="loginBox">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleFormRef"
                style="margin-top: 2vh;"
                >
                <el-form-item
                label=""
                prop="username"
                >
                    <el-input
                        class="inputs"
                        placeholder='用户名'
                        v-model="ruleForm.username"
                    ></el-input>
                </el-form-item>
                <el-form-item
                label=""
                prop="passWord"
                >
                    <el-input
                        class="inputs"
                        placeholder='密码'
                        v-model="ruleForm.password"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginBtn" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="register">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.loginWrap {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/login.jpg');
    background-size: cover;
    position: relative;
}
.title {
    position: absolute;
    top: 20vh;
    left: 10vw;
    font-size: 2rem;
    color: white;
    width: 20vw;
}
.loginBox {
    position: absolute;
    right: 10vw;
    top: 30vh;
    width: 15vw;
    height: 26vh;
    margin: auto;
    border: 10px;
    border-color: white;
    background-color: rgba(255, 254, 252);
    border-radius: 5%;
}
.inputs {
    margin-left: 1vw;
    width: 13vw;
    height: 5vh;
    background-color: rgba(255, 254, 252, 0.3);
}
.loginBtn {
    margin-left: 1vw;
    width: 13vw;
    height: 5vh;
    color: rgb(55, 106, 151);
    border-radius: 3px;
    background-color: rgba(255, 254, 252, 0.3);
}
.register {
    margin-left: 1vw;
    margin-top: -2vh;
    width: 13vw;
    height: 5vh;
    font-size: 0.7rem;
    color: rgb(67, 69, 71);
    border-radius: 3px;
    border-color: transparent;
    background-color: transparent;
}

</style>
