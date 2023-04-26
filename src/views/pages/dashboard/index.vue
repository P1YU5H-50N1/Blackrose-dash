

<template>
  <div class="h-full w-full flex flex-col-reverse md:flex-row">
    <div
      class="bg-menu border-r flex md:flex-col border-r-menu-stroke w-full h-12 md:w-12 md:h-full justify-center items-center">

      <div class="hidden bg-logo md:block md:w-[20px] md:h-[20px] md:bg-cover self-center">
      </div>
      <div class="flex md:h-4/5 justify-center w-full md:flex-col items-center  gap-10">
        <div class=" h-full md:w-full md:h-min md:border-t-0 flex justify-center border-t-2 md:border-r-2 border-neon">

          <div class=" cursor-pointer my-2 bg-cover w-[20px] h-[20px] bg-neon-home">
          </div>
        </div>
        <a href="/logout" class="bg-logout cursor-pointer bg-cover w-[20px] h-[20px] hover:bg-neon-logout">
        </a>
      </div>

    </div>
    <div class="bg-dashboard text-white w-full h-full">
      <div class="w-full flex h-25 justify-center mb-6">
        <div class="w-11/12 border-b border-b-gray-600 pb-6 pt-10 pl-4">
          <span class="text-l font-semibold"> Hi Vihan</span><br />
          <span class="text-xs font-medium text-zinc-500">{{ currentDate }}</span>
        </div>
      </div>
      <div class="flex w-full h-full items-center flex-col">
        <div class="pb-4 text-sm font-semibold text-gray-300">Alpha's Performance</div>
        <div class=" bg-miniboards rounded-xl h-min px-8 py-4 w-4/5">
          <apexchart type="line" class="apex-charts" dir="ltr" height="339" :options="chartOptions" :series="series">
          </apexchart>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { useStore } from "vuex";
import { CountTo } from "vue3-count-to";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "dashboard",
  components: {
    CountTo,
    apexchart: VueApexCharts,
  },

  data: () => {
    return {
      // currentDate:"TOday",
      series: [{
        name: 'Mean Reverting',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
      }, {
        name: 'Directional',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
      }, {
        name: 'Arbitrage',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
      }],
      chartOptions: {
        chart: {
          stacked: false,
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: [0, 2, 4],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '30%'
          }
        },
        colors: ['#2DFF8E', '#ffffff', '#ffffff'],
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: true,
            shade: 'dark',
            type: "horizontal",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
        markers: {
          size: 0
        },

        xaxis: {
          type: 'datetime',
          title: {
            text: 'Date'
          }
        },
        yaxis: {
          title: {
            text: 'Points',
            color: "#ffffff"
          },
        },

        tooltip: {
          shared: true,
          theme: 'dark',
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;

            }
          }
        },
        grid: {
          borderColor: '#2DFF8E',
          strokeDashArray: 4,
          yaxis: {
            lines: {
              show: true
            }
          },
          xaxis: {
            lines: {
              show: true
            }
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          position: 'back',
        }
      }
    };
  },
  setup() {
    const store = useStore();

    const today = new Date()
    const year = today.getFullYear()
    const month = today.toLocaleString('en-US', { month: 'long' })
    const day = today.getDate()
    const currentDate = `${day} ${month}, ${year}`


    const logout = () => {
      store.dispatch("logOut");
    };
    return {
      logout,
      currentDate,
    };
  },
};
</script>


<style></style>