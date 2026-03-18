<template>
  <div>
    <h2> NYC Health And Mortality </h2>
    <p v-for="healthData in healthData">{{ healthData.leading_cause }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const healthData = ref([])
const years = ref([])

async function getData() {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/jb7j-dtam.json?$limit=50000',
    )
    const data = await response.json()
    healthData.value = data
    years.value = ['All', '2021', '2020', '2019']
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getData()
})

  
</script>

<style>
.h2 {
  height: 100px;
  width: 100px;
  background-color: gray;
}
</style>
