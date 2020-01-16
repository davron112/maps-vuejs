<template>
    <div class="main">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <img
              class="logo"
              src="https://ucarecdn.com/c31be959-f604-4eb4-bdc5-cd28db8c8da8/logo.png"
            />
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-12 mb-2">
                <span class="logo-text coloredText">
                  ГЕОПОРТАЛ ГГК
                  <br />Республики Узбекистан
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="control-icon" id="height" @click="changeValue">
            <img src="../images/i6.png" width="35px" height="35px" />
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import $ from "jquery";

export default {
  name: 'Header',
  // To use props, they must be declared
  data() {
    return {
       isOpen: this.showControl
    }
  },
  created() {
    console.log(this.showControl);
  },
  props: ['showControl'],
   methods: {
    changeValue(){
      this.isOpen= !this.isOpen;
      if(!this.isOpen){
          $('#height').css('margin-top', '300px');
      }else{
          $('#height').css('margin-top', '5px');
      }
      this.$emit('clicked-show-control', this.isOpen)
    }
  },
}
</script>
<style scoped>
.main {
  position: fixed;
  background-color: #ffffff;
  opacity: 1;
  z-index: 3333;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  top: 5px;
  left: 10px;
  min-width: 372px;
  line-height: 10px;
  height: 66px;
  transition: 0.2s;
  font-size: medium;
  font-weight: 100;
}
.logo {
  width: 100%;
  height: 100%;
  object-fit: none;
}
.logo-text {
  color: rgba(0, 0, 0, 0.65);
  font-weight: bold;
  line-height: 18px;
  font-size: 16px;
}
.control-icon {
  width: 50px;
  height: 50px;
  text-align: center;
  padding-top: 7px;
  background: #1f79c8;
  border-radius: 50%;
  -webkit-box-shadow: 1px 2px 6px 0 rgba(0,0,0,.25);
  box-shadow: 1px 2px 6px 0 rgba(0,0,0,.25);
  cursor: pointer;
  margin-bottom: 5px;
}
</style>