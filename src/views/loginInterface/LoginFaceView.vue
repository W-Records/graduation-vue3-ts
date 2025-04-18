<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { loginService, registerService } from '@/api/UserApi.ts'

const router = useRouter()

const loading = ref(false)
const loginFormRef = ref()

const formData = reactive({
    username: '',
    password: '',
    resource: '',
})

const validateUsername = (_rule: any, value: string, callback: any) => {
    if (!value) {
        callback(new Error('请输入用户名'))
    } else {
        callback()
    }
}

const validatePassword = (_rule: any, value: string, callback: any) => {
    if (!value) {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}

const rules = {
    username: [
        { validator: validateUsername, trigger: 'blur' }
    ],
    password: [
        { validator: validatePassword, trigger: 'blur' }
    ]
}

const handleLogin = async () => {
    const form = loginFormRef.value
    if (!form) return

    await form.validate(async (valid) => {
        if (valid) {
            loading.value = true
            try {
                // 这里替换为真实的登录接口调用 loginService
                // const response = await loginAPI(formData)
                // if (response.success) {
                //   // 存储 token 到 Pinia 或 localStorage
                //   router.push('/')
                // } else {
                //   ElMessage.error('登录失败，请检查账号密码')
                // }

                try {
                    const response: any = await loginService(formData)
                    console.log(response)
                    localStorage.setItem('token', response.access_token)

                    // 演示用模拟成功跳转
                    if (formData.resource == "user") {
                        ElMessage.success('普通用户_登录成功！')
                        await router.push('/user')
                    }
                    if (formData.resource == "admin") {
                        ElMessage.success('管理员_登录成功！')
                        await router.push('/admin')
                    }
                } catch (error: any) {
                    console.log(error.response.data.message)
                    ElMessage.error(error.response.data.message)
                }



            } catch (error) {
                ElMessage.error('登录失败，请检查账号密码')
            } finally {
                loading.value = false
            }
        }
    })
}


// 抽屉
const formLabelWidth = '80px'
let timer: any

const dialog = ref(false)
const loading2 = ref(false)

const form = reactive({
    username: '',
    password: '',
    phone: '',
})

const onClick = async () => {
    console.log(form)
    loading2.value = true
    await registerService(form)

    loading2.value = false
    dialog.value = false

}

const handleClose = (done: any) => {
    if (loading2.value) {
        return
    }
    ElMessageBox.confirm('Do you want to submit?')
        .then(() => {
            loading2.value = true
            timer = setTimeout(() => {
                done()
                // 动画关闭需要一定的时间
                setTimeout(() => {
                    loading2.value = false
                }, 400)
            }, 2000)
        })
        .catch(() => {
            // catch error
        })
}

const cancelForm = () => {
    loading2.value = false
    dialog.value = false
    clearTimeout(timer)
}






const handleRegister = () => {
    console.log(formData)

}

</script>

<template>
    <div class="login-container">

        <div class="logo-login">
            <img src="@/assets/loginbg1.465fc687.png" alt="logo">
        </div>

        <el-card class="box-card">
            <div slot="header" class="header">
                <span class="title">😊</span>
            </div>
            <el-form ref="loginFormRef" :model="formData" :rules="rules" label-width="0" class="login-form">
                <el-form-item prop="username">
                    <el-input v-model="formData.username" placeholder="请输入账号" size="large" clearable>
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码" type="password" size="large" clearable
                        @keyup.enter.native="handleLogin">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item label="">
                    <el-radio-group v-model="formData.resource">
                        <el-radio value="user">普通用户</el-radio>
                        <el-radio value="admin">管理员</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item>
                    <div class="button-group">
                        <el-button type="primary" style="width: 100%" :loading="loading" @click="handleLogin">登录</el-button>
                        <el-button type="primary" style="width: 100%" :loading="loading"
                            @click="dialog = true">注册</el-button>
                        <el-drawer v-model="dialog" title="注册" :before-close="handleClose" direction="ltr"
                            class="demo-drawer">
                            <div class="demo-drawer__content">
                                <el-form :model="form">
                                    <el-form-item label="名称" :label-width="formLabelWidth">
                                        <el-input v-model="form.username" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="密码" :label-width="formLabelWidth">
                                        <el-input v-model="form.password" autocomplete="off" />
                                    </el-form-item>
                                    <el-form-item label="手机号码" :label-width="formLabelWidth">
                                        <el-input v-model="form.phone" autocomplete="off" />
                                    </el-form-item>
                                </el-form>
                                <div class="demo-drawer__footer">
                                    <el-button @click="cancelForm">Cancel</el-button>
                                    <el-button type="primary" :loading="loading" @click="onClick">
                                        {{ loading ? 'Submitting ...' : 'Submit' }}
                                    </el-button>
                                </div>
                            </div>
                        </el-drawer>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style scoped>
.button-group {
    /* border: solid; */
    width: 100%;
    display: flex;
    justify-content: center;
}

.login-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #f0f2f5; */
    padding: 20px;

    /* border: solid; */
}

.logo-login {
    display: flex;
    justify-content: center;
    align-items: center;

    /* border: solid; */
}

.box-card {
    width: 360px;
    border-radius: 20px;
    box-shadow: 0 20px 30px 0 rgba(20, 112, 177, 0.1);

    /* border: solid; */
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.title {
    font-size: 24px;
    color: #303133;
}

.login-form {
    width: 100%;
}

.el-input {
    margin-bottom: 20px;
}

.el-button--primary {
    margin-top: 20px;
}

/* 图标样式 */
.el-input__prefix {
    color: #99a2aa;
    font-size: 18px;
}
</style>
