<template lang="html">
  <div id="content">

  <div class="demo-container">
    <div id="placeholder" class="demo-placeholder"></div>
  </div>
</div>
</template>

<script>
export default {
    ready() {
        $(function() {

            var data = [],
                totalPoints = 300;

            function getRandomData() {

                if (data.length > 0)
                    data = data.slice(1);

                // Do a random walk

                while (data.length < totalPoints) {

                    var prev = data.length > 0 ? data[data.length - 1] : 50,
                        y = prev + Math.random() * 10 - 5;

                    if (y < 0) {
                        y = 0;
                    } else if (y > 100) {
                        y = 100;
                    }

                    data.push(y);
                }

                // Zip the generated y values with the x values

                var res = [];
                for (var i = 0; i < data.length; ++i) {
                    res.push([i, data[i]])
                }

                return res;
            }

            // Set up the control widget

            var updateInterval = 30;

            var plot = $.plot("#placeholder", [getRandomData()], {
                series: {
                    shadowSize: 0 // Drawing is faster without shadows
                },
                yaxis: {
                    min: 0,
                    max: 100
                },
                xaxis: {
                    show: false
                }
            });

            function update() {

                plot.setData([getRandomData()]);

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
