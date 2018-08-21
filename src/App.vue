<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: usicMusic;
  src: url('./assets/font/ClementePDae-Light.woff');
}
@font-face {
  font-family: goyang;
  src: url('./assets/font/Goyang.ttf');
}
* {
  color: #333;
  margin: 0;
  font-family: usicMusic, goyang;
  box-sizing: border-box;
}
body {
  background-color: rgb(245, 245, 245);
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li a {
  font-size: 1.2em;
}
a {
  text-decoration: none;
  cursor: pointer;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
/* 모달 */
.v--modal {
   border-radius: 5px !important;
}
#musicList .v--modal {
  margin-left: 70px !important;
  width: 430px !important;
  height: 280px !important;
}
#uploadSource .v--modal {
  width: 240px !important;
  margin-left: 180px !important;
  height: 200px !important;
}
#boardList > table .v--modal {
  margin-left: 80px !important;
  margin-top: -40px !important;
  width: 430px !important;
  height: 400px !important;
}
#boardList div[alt='aa'] .v--modal {
  margin: 0 !important;
  width: 500px !important;
  margin-left: 50px !important;
  height: 400px !important;
}
#boardList .v--modal {
  margin: 0 !important;
  width: 500px !important;
  margin-left: -142px !important;
  height: 400px !important;
}
#viewSource .v--modal {
  width: 400px !important;
  height: 280px !important;
  margin-left: 95px !important;
}
.modal-header {
  background: url('./assets/back.png');
}
.v--modal-overlay {
  background: rgba(0,0,0,.3) !important;
}
.page {
  cursor: pointer;
  line-height: 50px;
  color: rgb(236, 104, 126);
}
</style>
