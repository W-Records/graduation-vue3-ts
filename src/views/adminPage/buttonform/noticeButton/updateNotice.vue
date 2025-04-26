<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useRoute } from 'vue-router';
const route = useRoute();
import { onMounted } from 'vue'



import { reactive } from 'vue'
import { getNoticeByIdService, updateNoticeService } from '@/api/NoticeApi'


// do not use same name with ref
const form: any = ref({})

const noticeId: any = route.query.noticeId;
const onSubmit = async () => {
    console.log('submit!')
    console.log(form.value)
    // updateUserService(form)
    updateNoticeService(form.value)
    router.push('/admin/NoticeManagement')
}

onMounted(async () => {
    try {
        console.log('houseId: ', noticeId)
        // 获取初始化数据
        const res: any = await getNoticeByIdService(noticeId)
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
                <el-form-item label="标题">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="form.content" style="width: 240px" :rows="6" type="textarea"
                        placeholder="Please input" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button @click="router.push('/admin/NoticeManagement')">Cancel</el-button>
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
