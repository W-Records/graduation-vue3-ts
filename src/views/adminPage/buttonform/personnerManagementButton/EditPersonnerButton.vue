<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useRoute } from 'vue-router';
const route = useRoute();



import { reactive } from 'vue'
import { updateUserService } from '@/api/UserApi'


// do not use same name with ref
const form = reactive({
    id: '',
    password: null,
    phone: null,
})

const onSubmit = () => {
    console.log('submit!')
    const userId: any = route.query.userId;
    form.id = userId
    console.log(form)
    updateUserService(form)

    router.push('/admin/PersonnelManagement')


}
</script>

<template>
    <div class="container">
        <div>
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="密码">
                    <el-input v-model="form.password" />
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button @click="router.push('/admin/PersonnelManagement')">Cancel</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin-top: 18px;
    display: flex;
    justify-content: center;
}
</style>
