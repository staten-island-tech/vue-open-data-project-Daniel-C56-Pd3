<template>
  <div>
    <p v-for="healthData in healthData">{{ healthData.leading_cause }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const healthData = ref([])

async function getData() {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/jb7j-dtam.json?$limit=50000',
    )
    const data = await response.json()
    healthData.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getData()
})
</script>

<style scoped></style>
