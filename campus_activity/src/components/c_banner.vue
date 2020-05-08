<template>
  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
      <img src="../assets/c_banner_01.jpg" alt="1">
      <div class="carousel-caption">
        1
      </div>
    </div>
    <div class="item">
      <img src="../assets/c_banner_01.jpg" alt="2">
      <div class="carousel-caption">
        2
      </div>
    </div>
    <div class="item">
      <img src="../assets/c_banner_01.jpg" alt="3">
      <div class="carousel-caption">
        3
      </div>
    </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  </div>
</template>

<script>
export default {
  name:'c_banner'
}
</script>

<style>
.carousel-inner>.item>img{
  width: 100%;
}
</style>