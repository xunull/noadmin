<template lang="html">
    <div class="row">
        <div class="col-sm-5 col-sm-offset-2">
            <el-form ref="form" label-width="80px">
              <el-form-item label="网址">
                <el-input v-model='websiteUrl' placeholder='请输入目标网址'></el-input>
              </el-form-item>
              <el-form-item label="url格式">
                <el-input v-model='urlPattern' placeholder='请输入匹配的路径'></el-input>
            </el-form-item>
            <el-form-item label='保存位置'>
                <el-input v-model='savePath' placeholder='请输入保存地址'></el-input>
            </el-form-item>
            <el-form-item label='拉取内容'>
                <el-radio-group v-model="grabContent">
                    <el-radio-button label='img' >图片</el-radio-button>
                    <el-radio-button label='article' >文章</el-radio-button>
                    <el-radio-button label='single' >单页</el-radio-button>
                    <el-radio-button label='custom' >自定义</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <div v-if="custom">
                <el-form-item label="拉取内容">
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox label='a'>html</el-checkbox>
                      <el-checkbox label='script'>js</el-checkbox>
                      <el-checkbox label='img'>img</el-checkbox>
                      <el-checkbox label='link' >css</el-checkbox>
                      <el-checkbox label='other' >字体等</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>

              <el-form-item>
                <el-button @click.native='start' type="primary">开始</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {

        return {
            websiteUrl: null,
            savePath: null,
            urlPattern: null,
            grabContent:'img',
            checkList: ['a', 'script', 'img', 'link', 'other']
        }

    },
    computed:{
        custom:function() {
            if('custom'===this.grabContent) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        start: function() {

            this.$http.post('/yuwang/start', this.$data).then(function(response) {
                console.log(response);
            }, function(response) {
                console.log(response);
            });

        }
    },
}
</script>

<style lang="css">
</style>
