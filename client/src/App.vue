<template>
  <div id="app">
  
    <Main class="main" />

  </div>

</template>

<script>

////////////////////////////////////////////////////
import Main from './components/main';
import DataProvider from './DataProvider';

export default {
  name: 'App',
  components: {
    Main
  },
  mounted: function() {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.float-layer {
  position: absolute;
  z-index:999;
  width:25%;
  height:100%;

}

.left-float-layer{

  left:0px;
}

.right-float-layer{

  right:0px;
}


body {
    margin:0; 
    padding:0;
    width:100%;
    height:100%;
}

.chart-name{
    color:black; 
    margin-bottom:30px;
    border-top: 3px solid #F0B04D;
    background: rgba(255,255,255,0.1);
    padding:10px;
}

.chart-name-right{

    float:right; 
    right:10px;
    margin: 0%;
  
}


.chart-name-middle{

    position: absolute;
    left: 50%;
    margin: 0%;
    top:20px;
  
}

.chart-name-left{

    float:left; 
    left:10px; 
    margin: 0%;

}
</style>
