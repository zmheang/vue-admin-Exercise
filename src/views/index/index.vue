<template>
    <div class="index-container">
        <h1>777</h1>
        <h1>777</h1>
        <h1>777</h1>
        <h1>777</h1>
        <h1>777</h1>
        <h1>777</h1>
        <h1>777</h1>
        <h1>777</h1>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss" scoped>
    .index-container {
        padding: 0 !important;
        margin: 0 !important;
        background: #f5f7f8 !important;

        ::v-deep {
            .el-alert--info.is-light {
                min-height: 82px;
                margin-bottom: 15px;
                color: #909399;
                background-color: $base-color-white;
                border: 1px solid #ebeef5;
            }

            .el-card__body {
                .echarts {
                    width: 100%;
                    height: 140px;
                }
            }
        }
    }

</style>