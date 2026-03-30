<template>
  <div class="home">
    <h1>NYC Mortality Data Explorer</h1>
    <p>Select a year to view the health visualizations:</p>
    
    <div class="button-grid">
      <RouterLink 
        v-for="year in years" 
        :key="year" 
        :to="'/healthdata/' + year" 
        class="year-button"
        >
        View {{ year }} Data
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
const years = ['2021', '2020', '2019', '2018', '2017', '2016']
</script>

<style scoped>
.year-button {
  display: inline-block;
  padding: 20px;
  margin: 10px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}
</style>