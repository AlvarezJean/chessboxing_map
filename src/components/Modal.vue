<template>
  <div class="main__container">
  </div>

  <h3>TROUVE TON CLUB!</h3>
</template>

<script>

export default {
  name: 'Modal',

  setup() {
  },
};
</script>
<style>
#map {
  width: 100%;
  height: 100vh;
  position: initial!important;
  text-transform: uppercase;
}

h3{
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-style: italic;
  position: absolute;
  top: 0;
  color: white;
  font-size: 45px;
}

.gmnoprint, .gm-control-active {
  display: none;
}
</style>
