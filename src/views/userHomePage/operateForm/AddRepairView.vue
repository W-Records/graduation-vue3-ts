<script setup lang="ts">
import { addRepairService } from '@/api/RepairApi'
import { useRouter } from 'vue-router'
const router = useRouter()
import { inject } from 'vue';
// 注入父组件提供的变量和方法
const showMainContent: any = inject('showMainContent');
const setShowMainContent: any = inject('setShowMainContent');

// 示例：点击按钮修改父组件的 showMainContent
const toggleContent = () => {
    setShowMainContent(!showMainContent.value);
    router.push('/user')
};






import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
    content: '',
    userid: '',
    username: '',
    status: '未处理',
})

import { useRoute } from 'vue-router';
const route = useRoute();

const onSubmit = () => {
    console.log('submit!')
    const userId: any = route.query.userId;
    const username: any = route.query.username;
    form.userid = userId
    form.username = username
    console.log(form)
    addRepairService(form)
    toggleContent();
}


</script>

<template>
    <div class="addRepair-container">
        <div class="addRepair-form">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <!-- <el-form-item label="Activity name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Activity zone">
                    <el-select v-model="form.region" placeholder="please select your zone">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Activity time">
                    <el-col :span="11">
                        <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
                    </el-col>
                    <el-col :span="2" class="text-center">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
                    </el-col>
                </el-form-item>
                <el-form-item label="Instant delivery">
                    <el-switch v-model="form.delivery" />
                </el-form-item>
                <el-form-item label="Activity type">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox value="Online activities" name="type">
                            Online activities
                        </el-checkbox>
                        <el-checkbox value="Promotion activities" name="type">
                            Promotion activities
                        </el-checkbox>
                        <el-checkbox value="Offline activities" name="type">
                            Offline activities
                        </el-checkbox>
                        <el-checkbox value="Simple brand exposure" name="type">
                            Simple brand exposure
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Resources">
                    <el-radio-group v-model="form.resource">
                        <el-radio value="Sponsor">Sponsor</el-radio>
                        <el-radio value="Venue">Venue</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item label="报修内容">
                    <el-input v-model="form.content" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button @click="toggleContent">Cancel</el-button>
                </el-form-item>
            </el-form>
            <!-- <button @click="toggleContent">切换主内容显示</button> -->
        </div>
    </div>
</template>

<style scoped>
.addRepair-container {
    /* border: solid; */
    margin-top: 18px;
    display: flex;
    justify-content: center;
}

.addRepair-form {
    /* border: solid; */
    width: 600px;
}
</style>
