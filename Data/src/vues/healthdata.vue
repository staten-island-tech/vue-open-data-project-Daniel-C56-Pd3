<template>
  <div class="container">
    <header>
      <RouterLink to="/" class="back-btn">← Back to Year Selection</RouterLink>
      <h1>NYC Health Data for {{ $route.params.year }}</h1>
    </header>

    <div v-if="error" class="error-msg">{{ error }}</div>

    <div v-if="loading" class="loading">Gathering data...</div>

    <div v-else class="content">
      <div class="chart-row">
        <div class="chart-box">
          <h3>Top 5 Leading Causes</h3>
          <Bar :data="barChartData" />
        </div>

        <div class="chart-box">
          <h3>Deaths by Gender</h3>
          <Pie :data="pieChartData" />
        </div>
      </div>

      <div class="data-list">
        <h3>Full Report</h3>
        <p v-for="(item, index) in rawData.slice(0, 10)" :key="index">
          <strong>{{ item.leading_cause }}:</strong> {{ item.deaths }} deaths
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Bar, Pie } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, 
  CategoryScale, LinearScale, ArcElement 
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const route = useRoute()
const rawData = ref([])
const loading = ref(true)
const error = ref(null)

const getYearlyData = async () => {
  try {
    const year = route.params.year 
    const response = await fetch(`https://data.cityofnewyork.us/resource/jb7j-dtam.json?year=${year}`)
    
    if (!response.ok) throw new Error("Failed to load NYC data")
    
    const data = await response.json()
    rawData.value = data.sort((a, b) => Number(b.deaths) - Number(a.deaths))
    loading.value = false
  } catch (err) {
    error.value = "Oops! We couldn't fetch the data for " + route.params.year
    loading.value = false
  }
}

onMounted(() => {
  getYearlyData()
})


const barChartData = computed(() => {
  const topFive = rawData.value.slice(0, 5)
  return {
    labels: topFive.map(d => d.leading_cause.substring(0, 15) + '...'),
    datasets: [{
      label: 'Deaths',
      backgroundColor: '#42b983',
      data: topFive.map(d => Number(d.deaths))
    }]
  }
})

const pieChartData = computed(() => {
  const maleTotal = rawData.value
    .filter(d => d.sex === 'Male')
    .reduce((acc, curr) => acc + Number(curr.deaths), 0)
    
  const femaleTotal = rawData.value
    .filter(d => d.sex === 'Female')
    .reduce((acc, curr) => acc + Number(curr.deaths), 0)

  return {
    labels: ['Male', 'Female'],
    datasets: [{
      backgroundColor: ['#36A2EB', '#FF6384'],
      data: [maleTotal, femaleTotal]
    }]
  }
})
</script>

<style scoped>
.chart-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}
.chart-box {
  flex: 1;
  min-width: 300px;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 12px;
}
.back-btn {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}
.error-msg { color: red; font-weight: bold; }
</style>