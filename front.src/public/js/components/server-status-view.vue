<template lang="html">
  <div id="content">

  <div class="demo-container">
    <!-- 此div要确保能确定宽度和高度 -->
    <div id="placeholder" class="demo-placeholder"></div>
  </div>
</div>
</template>

<script>
var serverStatus = require('../lib/serverstatus');

export default {

    mounted() {

        $(function() {
            var userCpu = [];
            var sysCpu = [];
            var memoryUsage = [];
            serverStatus.statusEmitter.on('status', function(status) {
                userCpu.push([userCpu.length, status.cpu.user]);
                sysCpu.push([sysCpu.length, status.cpu.sys]);
                memoryUsage.push([memoryUsage.length, status.memoryUsage]);

            });

            serverStatus.statusEmitter.on('initStatus', function(status) {
                for (let i = 0; i < status.length; i++) {
                    userCpu.push([i, status[i].cpu.user]);
                    sysCpu.push([i, status[i].cpu.sys]);
                    memoryUsage.push([i, status[i].memory]);
                }
            });

            serverStatus.initStatus();

            // Set up the control widget
            var updateInterval = 2000;

            // $.plot($("#placeholder"), data, options);
            var plot = $.plot("#placeholder", [{
                label: 'userCpu',
                data: userCpu
            }, {
                label: 'sysCpu',
                data: sysCpu
            }, {
                label: 'memory',
                data: memoryUsage
            }], {
                series: {
                    shadowSize: 0, // Drawing is faster without shadows
                    lines: {
                        show: true
                    },
                    points: {
                        show: false
                    }
                },
                yaxis: {
                    min: 0,
                    max: 100
                },
                xaxis: {
                    show: false,
                    min: 0,
                    // 显示两个小时内的服务器状况
                    max: 3600
                }
            });

            function update() {
                plot.setData([userCpu, sysCpu, memoryUsage]);

                // Since the axes don't change, we don't need to call plot.setupGrid()
                plot.draw();
                setTimeout(update, updateInterval);
            }

            update();
        })
    }
}
</script>

<style lang="css">

  #content {
  	width: 880px;
  	margin: 0 auto;
  	padding: 10px;
  }

  .demo-container {
  	box-sizing: border-box;
  	width: 850px;
  	height: 450px;
  	padding: 20px 15px 15px 15px;
  	margin: 15px auto 30px auto;
  	border: 1px solid #ddd;
  	background: #fff;
  	background: linear-gradient(#f6f6f6 0, #fff 50px);
  	background: -o-linear-gradient(#f6f6f6 0, #fff 50px);
  	background: -ms-linear-gradient(#f6f6f6 0, #fff 50px);
  	background: -moz-linear-gradient(#f6f6f6 0, #fff 50px);
  	background: -webkit-linear-gradient(#f6f6f6 0, #fff 50px);
  	box-shadow: 0 3px 10px rgba(0,0,0,0.15);
  	-o-box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  	-ms-box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  	-moz-box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  	-webkit-box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  }

  .demo-placeholder {
  	width: 100%;
  	height: 100%;
  	font-size: 14px;
  	line-height: 1.2em;
  }
</style>
