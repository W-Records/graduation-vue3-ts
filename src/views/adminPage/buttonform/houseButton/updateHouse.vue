<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useRoute } from 'vue-router';
const route = useRoute();
import { onMounted } from 'vue'



import { reactive } from 'vue'
import { findHouseByIdService, updateHouseService } from '@/api/HouseApi'


// do not use same name with ref
const form: any = ref({})

const houseId: any = route.query.houseId;
const onSubmit = async () => {
    console.log('submit!')
    console.log(form.value)
    // updateUserService(form)
    updateHouseService(form.value)
    router.push('/admin/HouseManagement')
}

onMounted(async () => {
    try {
        console.log('houseId: ', houseId)
        // 获取初始化数据
        const res: any = await findHouseByIdService(houseId)
        console.log(res)

        form.value = res
        console.log(form.value)

    } catch (error) {
        console.error('获取房屋数据失败', error)
    }
})
</script>

<template>
    <div class="container">
        <div>
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="房屋名称">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="房间大小">
                    <el-input v-model="form.area" />
                </el-form-item>
                <el-form-item label="房间地址">
                    <el-input v-model="form.roomNumber" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button @click="router.push('/admin/HouseManagement')">Cancel</el-button>
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
