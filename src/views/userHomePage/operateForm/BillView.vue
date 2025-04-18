<script setup lang="ts">
import {
    HomeFilled
} from '@element-plus/icons-vue'
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


import { getBillByUserIdService, updateBillStatusService } from '@/api/BillApi'

const handleClick = (id: any) => {
    console.log(id)
    updateBillStatusService(id)
    toggleContent()
}

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
    },
]


// 用户账单信息
const billList: any = ref([]);

import { onMounted } from 'vue';

onMounted(async () => {
    const userId: any = route.query.userId;
    try {
        // 查询用户的账单，状态为未缴费的账单
        const billRes: any = await getBillByUserIdService(userId);
        billList.value = billRes;
        console.log(billList.value);
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="container">
        <div class="table">
            <el-table :data="billList" style="width: 100%">
                <el-table-column fixed prop="id" label="账单编号" width="200" />
                <el-table-column prop="name" label="账单名称" width="200" />
                <el-table-column prop="price" label="价格" width="200" />

                <el-table-column fixed="right" label="Operations" min-width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleClick(scope.row.id)">
                            缴费
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-button @click="toggleContent" :icon="HomeFilled" circle style="margin-left: 21px" />
    </div>
</template>

<style scoped>
.container {
    margin-top: 18px;
    display: flex;
    justify-content: center;
}

.table {
    border: solid 0.5px rgba(151, 141, 141, 0.1);
}
</style>
