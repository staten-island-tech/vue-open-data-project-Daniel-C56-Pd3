<template>
  <div>
    <h2> NYC Health And Mortality </h2>
    <div>
      <button
        v-for="year in years" :key="year" @click="selectedYear = year"
      > {{ year }}</button>
    </div>
    <p v-for="health in filteredData" :key="health.id">{{ health.leading_cause }} - ({{ health.year }})</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js' //AI

Chart.register(ArcElement, Tooltip, Legend) //AI
const healthData = ref([])
const years = ref([])
const selectedYear = ref('All')

const chartCanvas = ref(null) //AI
let chartInstance = null //AI
async function getData() { //AI
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/jb7j-dtam.json?$limit=50000',
    )
    const data = await response.json()
    healthData.value = data
    years.value = ['All', '2021', '2020', '2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007']
  } catch (error) {
    console.log(error)
  }
}
const filteredData = computed(() => {
  if (selectedYear.value === 'All') { return healthData.value
  }
  return healthData.value.filter(item => item.year === selectedYear.value)
})

const chartData = computed(() => { //->AI
  const map = {}

  filteredData.value.forEach(item => {
    const cause = item.leading_cause
    const deaths = Number(item.deaths || 0)

    if (!map[cause]) {
      map[cause] = 0
    }
    map[cause] += deaths
  })

  return {
    labels: Object.keys(map),
    values: Object.values(map)
  }
}) // <-AI
// 🎨 Create / Update Chart
function renderChart() {
  if (!chartCanvas.value) return

  // destroy old chart
  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'pie',
    data: {
      labels: chartData.value.labels,
      datasets: [
        {
          data: chartData.value.values,
          backgroundColor: chartData.value.labels.map(
            () => `hsl(${Math.random() * 360}, 70%, 60%)`
          )
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: `Deaths by Cause (${selectedYear.value})`
        }
      }
    }
  })
}

// Re-render when data changes
watch(chartData, () => {
  renderChart()
})
onMounted(async () => {
  await getData()
  renderChart()
})
</script>

<style>
.h2 {
  height: 100px;
  width: 100px;
  background-color: gray;
}
</style>
