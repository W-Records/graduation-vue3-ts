<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useRoute } from 'vue-router';
const route = useRoute();
import { onMounted } from 'vue'



import { reactive } from 'vue'
import { updateCarportService } from '@/api/CarApi'


// do not use same name with ref
const form: any = ref({})

const carId: any = route.query.carId;
const onSubmit = async () => {
    console.log('submit!')
    form.value.id = carId
    console.log(form.value)
    // updateUserService(form)
    updateCarportService(form.value)
    // win刷新页面
    // window.location.reload()
    router.push('/admin/carManagement')
}

onMounted(async () => {
    try {
        console.log('carId: ', carId)
    } catch (error) {
        console.error('获取房屋数据失败', error)
    }
})
</script>

<template>
    <div class="container">
        <div>
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="车位名称">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button @click="router.push('/admin/carManagement')">Cancel</el-button>
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
