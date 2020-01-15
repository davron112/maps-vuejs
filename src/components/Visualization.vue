<template>
  <div id="visualization">
    <!-- header -->
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
          <div class="control-icon" @click="showControl = !showControl">
            <img src="../images/i6.png" width="28px" height="28px" />
          </div>
        </div>
      </div>
    </div>
    <!-- /header -->
    <!-- controller -->
<transition name="fade"  key="3">
    <div class="control" v-if="showControl">
      <div id="submenu" class="submenu">
        <div
          class="menu-items"
          v-bind:key="index"
          v-for="(item, index) in list"
          @click="showSubmenuFunc(index)"
        >
          <a class="services-icon" href="#">
            <i :class="item.icon"></i>
          </a>
          <h4 class="menu_h4">{{item.name}}</h4>
        </div>
      </div>

      <div id="sub2menu" class="submenuCommon" v-if="showMiddleMenu">
        <span id="close_sub2menu" @click="showMiddleMenu = !showMiddleMenu">
          <i class="fa fa-window-close" aria-hidden="true"></i>
        </span>
        <br />
        <h4 id="p_sub2menu">{{sub2name}}</h4>
        <hr />
        <div v-bind:key="index" v-for="(i, index) in list2">
          <i class="fa fa-chevron-circle-right"></i>
          <label class="info_label" @click="showMiddleMenuFunc(index)">{{i.name}}</label>
        </div>
      </div>

      <!-- table is shown from this menu -->
      <div id="sub3menu" class="submenuCommon" v-if="showSubmenu">
        <span id="close_sub3menu" @click="showSubmenu = !showSubmenu">
          <i class="fa fa-window-close" aria-hidden="true"></i>
        </span>
        <br />
        <h4 id="p_sub2menu">{{sub3name}}</h4>
        <hr />
        <div v-bind:key="index" v-for="(i, index) in list3" class="roundedOne">
          <div class="row">
            <div class="col-md-2">
              <v-checkbox color="info"></v-checkbox>
            </div>
            <div class="col-md-10">
              <label class="info_label" @click="showTableFunc">{{i.name}}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- table is shown from this menu -->
</transition>
    <!-- controller -->

    <l-map
      ref="map"
      v-if="showMap"
      :zoom.sync="zoom"
      v-on:update:zoom="updateZoom($event)"
      :center.sync="center"
      style="height: 100%; position: absolute; z-index: 1"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-geo-json :geojson="statesData.geojson" :options="statesData.options"></l-geo-json>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>

    <VuetifyDatatable class="data" v-if="showTable" />

    <div class="right-control">
      <div class="search">
        <!-- <div class="control-icon">
        <i class="fa fa-search"></i>
        </div>-->
        <form class="form-inline my-2 my-lg-0 sao-control">
          <input
            class="form-control form-control-sm mr-sm-2"
            type="search"
            placeholder="Поиск"
            aria-label="Search"
          />
          <button class="btn btn-outline my-2 my-sm-0" type="button">
            <i class="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div class="control-icon" v-bind:key="index" v-for="(icon, index) in rightControlIcons">
        <img v-bind:src="icon" style="opacity: 0.85;" width="28px" height="28px" />
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LGeoJson } from "vue2-leaflet";
import data from "../assets/geojson/us-states";
import VuetifyDatatable from "./VuetifyDatatable";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  name: "Visualization",
  props: {
    msg: String
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
    VuetifyDatatable
  },
  data() {
    return {
      zoom: 3,
      center: L.latLng(41.514268, 63.880766),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OzGASHKLTI</a> contributors',
      marker: L.latLng(41.289994, 69.147866),
      statesData: {},
      showMap: true,
      showControl: false,
      list2: [],
      list3: [],
      list: [
        {
          name: "Градостроительные регламенты",
          icon: "fa fa-pencil-square-o",
          sub2: [
            {
              name: "Функциональные зоны",
              sub3: [
                { name: "Генеральные планы населенных пунктов" },
                { name: "Архитектурно-планировочных организаций территорий" }
              ]
            },
            {
              name: "Красные линии",
              sub3: [{ name: "Красные линии" }]
            },
            {
              name: "Геологическое районирование",
              sub3: [{ name: "Геологическое районирование" }]
            }
          ]
        },
        { name: "Градостроительная документация", icon: "fa fa-files-o" },
        { name: "Мониторинг градостроительной", icon: "fa fa-file-text-o" },
        { name: "Базисная подоснова", icon: "fa fa-share-square" },
        { name: "Адресный реестр", icon: "fa fa-map-marker" },
        {
          name: "Реестр проектов",
          icon: "fa fa-file-text-o",
          sub2: [
            {
              name: "Зарегистрированные проекты"
            }
          ]
        },
        { name: "Реестр объектов градостроительной", icon: "fa fa-building-o" },
        {
          name: "Реестр субъектов градостроительной",
          icon: "fa fa-sort-amount-asc"
        },
        { name: "Нормативно-правовая основа", icon: "fa fa-files-o" }
      ],
      sub2name: "",
      sub3name: "",
      rightControlIcons: [
        require("../images/i1.png"),
        require("../images/i2.png"),
        require("../images/i3.png"),
        require("../images/i4.png"),
        require("../images/i5.png"),
        require("../images/i6.png"),
        require("../images/i7.png"),
        require("../images/i8.png"),
        require("../images/i9.png"),
        require("../images/i10.png")
      ],
      showSubmenu: false,
      showMiddleMenu: false,
      showTable: false,
      checked_id: false
    };
  },
  methods: {
    setZoom: function() {
      this.zoom = 6.5;
    },
    updateZoom: function(e) {
      this.zoom = e;
    },
    styleFunction(feature) {
      return {
        fillColor: this.getColor(feature.properties.OBJECTID),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.5
      };
    },
    getColor(populationDensity) {
      if (this.zoom > 10) {
        return "";
      }
      if (populationDensity === 1) {
        return "#90ed33";
      }
      if (populationDensity === 2) {
        return "#ed4886";
      }
      if (populationDensity === 3) {
        return "#e9ed2c";
      }
      if (populationDensity === 4) {
        return "#5fbfed";
      }
      if (populationDensity === 5) {
        return "#3e9eed";
      }
      if (populationDensity === 6) {
        return "#75baed";
      }
      if (populationDensity === 7) {
        return "#a6ed71";
      }
      if (populationDensity === 8) {
        return "#cc9fed";
      }
      if (populationDensity === 9) {
        return "#edb4a7";
      }
      if (populationDensity === 10) {
        return "#9eed94";
      }
      if (populationDensity === 11) {
        return "#75baed";
      }
      if (populationDensity === 12) {
        return "#42b4ed";
      } else {
        return "#cfeced";
      }
    },
    showSubmenuFunc(index) {
      this.showSubmenu = false;
      this.showMiddleMenu = false;
      this.sub3name = "";
      this.list2 = this.list[index].sub2;
      if (this.list2) {
        if (this.list2[0].sub3) {
          this.showMiddleMenu = true;
        } else {
          this.showSubmenu = true;
          this.list3 = this.list2;
          this.sub3name = this.list[index].name;
        }
      }
      this.sub2name = this.list[index].name;
    },
    showMiddleMenuFunc(index) {
      this.list3 = this.list2[index].sub3;
      this.sub3name = this.list2[index].name;
      this.showSubmenu = true;
    },
    hideSubmenu() {
      if (this.showMiddleMenu) {
        this.showSubmenu = false;
      } else {
        this.showMiddleMenu = true;
      }
    },
    showTableFunc() {
      this.showTable = !this.showTable;
    }
  },
  created() {
    this.statesData = {
      geojson: data.statesData,
      options: {
        style: feature => {
          return this.styleFunction(feature);
        }
      }
    };
    setTimeout(() => {
      this.setZoom();
    }, 2000);
  },
  watch: {
    zoom(value) {
      console.log(value);
      this.statesData = {
        geojson: data.statesData,
        options: {
          style: feature => {
            return this.styleFunction(feature);
          }
        }
      };
    }
  }
};
</script>

<style scoped lang="scss">
@import "~leaflet/dist/leaflet.css";
input:not([disabled]):focus,
select:not([disabled]):focus,
textarea:not([disabled]):focus,
button:not([disabled]):focus,
iframe:focus,
[href]:focus,
[tabindex]:focus,
[contentEditable="true"]:focus,
:focus {
  outline: none;
  outline-offset: 0;
}

.btn.focus,
.btn:focus {
  outline: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.form-control:focus {
  box-shadow: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
#visualization {
  position: relative;
  height: 100vh;
}
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
.sao-control .form-control-sm {
  //height: 22px;
  line-height: 22px;
}
.sao-control .btn {
  border: 1px solid #ced4da;
  height: 32px;
  padding: 0 10px;
}
.control {
  position: fixed;
  background-color: #ffffff;
  opacity: 1;
  z-index: 3333;
  background: rgba(255, 255, 255, 0.65);
  padding: 10px;
  border-radius: 8px;
  top: 250px;
  left: 10px;
  min-width: 372px;
  line-height: 10px;
  min-height: 385px;
  transition: 0.2s;
  font-size: medium;
  font-weight: 100;
}
.submenu h4 {
  font-size: 17px;
  line-height: 20px;
  cursor: pointer;
  font: Tahoma, Verdana, sans-serif;
}
.services-icon {
  color: #444;
  display: inline-block;
  font-size: 23px;
  line-height: 23px;
  margin-right: 5px;
  margin-top: 8px;
  width: 27px;
  text-align: center;
  margin-left: 2px;
}
.menu-items h4 {
  display: inline-block;
}
.right-control {
  position: absolute;
  right: 15px;
  z-index: 1000;
  top: 20px;
  text-align: -webkit-right;
}
.control-icon {
  width: 50px;
  height: 50px;
  text-align: center;
  padding-top: 10px;
  background: rgba(255, 255, 255, 0.97);
  border-radius: 10px;
  box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  margin-bottom: 5px;
}
.data {
  position: relative;
  z-index: 2;
  margin-left: 22%;
}
.submenuCommon {
  border-left: 2px solid rgba(31, 121, 200, 0.4);
  padding: 10px;
  position: absolute;
  top: 0;
  background: #fff;
  right: 0;
  width: 88%;
  height: 100%;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}

#close_sub2menu {
  cursor: pointer;
  float: right;
  font-size: 16px;
}
#close_sub3menu {
  cursor: pointer;
  float: right;
  font-size: 16px;
  color: red;
}
#sub2menu .fa-chevron-circle-right {
  margin-right: 10px;
  font-size: 20px;
}
.info_label {
  cursor: pointer;
  line-height: 24px;
}
#sub3menu .info_label {
  margin-left: -25px;
}
.coloredText,
i {
  color: rgb(31, 121, 200);
}
.v-input--selection-controls {
  margin-top: 0;
}
.search {
  background: #fff;
  display: block;
  padding: 9px;
  background: rgba(255, 255, 255, 0.97);
  border-radius: 10px;
  -webkit-box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.25);
  z-index: -1;
  margin-bottom: 10px;
}
</style>
