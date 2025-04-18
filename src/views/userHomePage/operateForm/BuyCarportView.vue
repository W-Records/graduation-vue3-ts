<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useRoute } from 'vue-router';
const route = useRoute();
import { inject } from 'vue';
// 注入父组件提供的变量和方法
const showMainContent: any = inject('showMainContent');
const setShowMainContent: any = inject('setShowMainContent');

// 示例：点击按钮修改父组件的 showMainContent
const toggleContent = () => {
    setShowMainContent(!showMainContent.value);
    router.push('/user')
};




import { getParkingListService, updateParkingService } from '@/api/CarApi'
import { onMounted } from 'vue';


import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
    id: '',
    type: '',
    atTime: null,
    userid: '',
})

const onSubmit = () => {
    console.log('submit!')
    const userId: any = route.query.userId;
    const username: any = route.query.username;

    form.userid = userId;
    console.log(form);

    updateParkingService(form)

    toggleContent();
}

// 可选车位信息
const CarInfoList: any = ref([]);



onMounted(async () => {
    try {
        const res: any = await getParkingListService();
        console.log(res);
        CarInfoList.value = res;
        console.log(CarInfoList.value);
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="BuyCarPort-container">
        <div class="BuyCarPort-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">

                <el-form-item label="车位">
                    <el-select v-model="form.id" placeholder="please select your zone">
                        <el-option v-for="item in CarInfoList" :key="item.id" :label="item.name" :value="item.id" />
                        <!-- <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" /> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="form.type" placeholder="please select your zone">
                        <el-option label="短租" value="短租" />
                        <el-option label="长期持有" value="长期持有" />
                    </el-select>
                </el-form-item>
                <el-form-item label="到期时间">
                    <el-date-picker v-model="form.atTime" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button @click="toggleContent">Cancel</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.BuyCarPort-container {
    margin-top: 18px;
    display: flex;
    justify-content: center;
}
</style>
