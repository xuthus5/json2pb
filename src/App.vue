<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Fira Code', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

table {
    width: 100%;
    table-layout: fixed;
}

th {
    padding: 15px;
    background: #375EAB;
    text-align: center;
    color: #FFF;
    font-size: 20px;
}

td {
    width: 50%;
    vertical-align: top;
}
</style>
