<template lang="html">
    <div >
        <el-tabs class='eltabs'>
           <el-tab-pane label="信息查询">
               <whois-search></whois-search>
           </el-tab-pane>
           <el-tab-pane label="域名搜索">
               <domain-search></domain-search>
           </el-tab-pane>
           <el-tab-pane label='信息搜索历史'>
               <whois-history></whois-history>
           </el-tab-pane>
           <el-tab-pane label='域名搜索历史'>
               <domain-history></domain-history>
           </el-tab-pane>
           <el-tab-pane label='whois server查看'>
               <whois-server></whois-server>
           </el-tab-pane>
         </el-tabs>
    </div>
</template>

<script>
import domainHistory from './domainHistory.vue'
import domainSearch from './domainSearch.vue'
import whoisHistory from './whoisHistory.vue'
import whoisSearch from './whoisSearch.vue'
import whoisServer from './whoisServer.vue'

export default {
    components:{
        domainHistory,
        domainSearch,
        whoisHistory,
        whoisSearch,
        whoisServer
    }
}
</script>

<style lang="css">
</style>
