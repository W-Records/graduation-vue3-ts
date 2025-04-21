<script setup lang="ts">
import { getHouseListService, assignHouseService } from '@/api/HouseApi'
import { onMounted, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// do not use same name with ref
const form = reactive({
    houseId: '',
    type: '',
    atTime: '',

    userId: '',
})

const onSubmit = () => {
    console.log(form.atTime)
    const id: any = route.params.id
    form.userId = id
    console.log(form)
    assignHouseService(form);

    router.push('/admin/PersonnelManagement')
}


const allHouse: any = ref([]);



onMounted(async () => {
    const id = route.params.id
    console.log('Received id:', id);


    let response: any = await getHouseListService();
    console.log(response);
    // response数组里面是一个个对象，过滤掉对象属性中userid有值得数组
    response = response.filter((item: any) => {
        return item.userid == null;
    });

    allHouse.value = response;
    console.log(allHouse.value);



})
</script>

<template>
    <div class="form-container">
        <el-form :model="form" label-width="auto" style="max-width: 600px">

            <el-form-item label="房屋">
                <el-select v-model="form.houseId" placeholder="please select your zone">
                    <!-- 遍历allHouse -->
                    <el-option v-for="item in allHouse" :key="item.id"
                        :label="'房名:' + item.name + '---地址:' + item.roomNumber" :value="item.id" />
                    <!-- <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" /> -->
                </el-select>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.type" placeholder="please select your zone">
                    <el-option label="长期持有" value="长期持有" />
                    <el-option label="短租" value="短租" />
                </el-select>
            </el-form-item>
            <el-form-item label="到期时间">
                <el-date-picker v-model="form.atTime" type="date" placeholder="Pick a date" style="width: 100%" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button @click="router.push('/admin/PersonnelManagement')">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.form-container {
    /* 添加上边距 */
    margin-top: 50px;
}
</style>
