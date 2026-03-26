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

const healthData = ref([])
const years = ref([])
const selectedYear = ref('All')

const getData = async () => {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/jb7j-dtam.json?$limit=50000'
    )
    const data = await response.json()
    healthData.value = data
    years.value = ['All', '2021', '2020', '2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007']
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getData()
})

const filteredData = computed(() => {
  if (selectedYear.value === 'All') {
    return healthData.value
  }
  return healthData.value.filter(item => item.year === selectedYear.value)
})
</script>

<style>
.h2 {
  height: 100px;
  width: 100px;
  background-color: gray;
}
</style>
