<template lang="html">
    <div>
        <div class="row">
            <div class="col-sm-12">
                <div class="pull-right">
                    <el-button type="primary" @click.native="roleCreate">
                        创建角色
                    </el-button>
                </div>
            </div>
        </div>
         <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    computed: {},
    mounted() {},
    methods: {
        roleCreate: function() {
            this.$router.push('/manage/role/roleCreate')
        }
    },
    components: {

    }
}
</script>

<style lang="css">
</style>
