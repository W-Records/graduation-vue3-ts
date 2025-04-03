<script setup lang="ts">
// 表格
const handleClick = () => {
    console.log('click')
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
</script>

<template>
    <div class="admin-body-main-table">
        <div class="admin-body-main-table-content">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="date" label="用户编号" width="150" />
                <el-table-column prop="name" label="用户名" width="180" />
                <el-table-column prop="state" label="手机号" width="180" />
                <el-table-column prop="city" label="房屋" width="180" />
                <el-table-column prop="address" label="车位" width="300" />
                <el-table-column prop="zip" label="注册日期" width="600" />
                <el-table-column fixed="right" label="Operations" min-width="200">
                    <template #default>
                        <el-button type="primary" size="small" @click="handleClick">
                            分配房屋并授权
                        </el-button>
                        <el-button type="primary" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="admin-body-main-table-pagination">
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>

<style scoped>
.admin-body-main-table-pagination {
    display: flex;
    align-items: center;

    height: 50px;
    padding: 10px;
    border: solid 0.8px rgb(217, 207, 207);
}
</style>
