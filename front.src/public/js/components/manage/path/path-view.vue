<template lang="html">
    <div  class='col-sm-6'>
        <el-tree class='tree-div'
          :data="treeData"
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          >
        </el-tree>
    </div>
</template>

<script>
export default {

    data() {
        var treeData = [];
        this.$http.get('/api/path/tree/').then(response => {
            if (response.body.ok) {
                console.log(response.body.data);
                treeData.push(...response.body.data);
            }
        }, response => {

        });
        return {
            treeData: treeData,
            props: {
                label: 'name',
                children: 'children'
            }
        }
    },
    computed: {},
    mounted() {},
    methods: {
        loadNode(node, resolve) {

            this.$http.get('/api/path/tree/' + node.data.id).then(response => {
                if (response.body.ok) {
                    console.log(response.body.data);
                    resolve(response.body.data)
                }
            }, response => {

            });
        }
    },
    components: {}
}
</script>

<style lang="css">
    .tree-div {
        min-height: 150px;
    }
</style>
