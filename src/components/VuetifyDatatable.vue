<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <beat-loader :loading="loading" color="#1f79c8" size="20px"></beat-loader>
      <v-data-table v-if="!loading" :headers="headers" :items="items" :search="search"></v-data-table>
    </v-card>
  </v-container>
</template>
    

<script>
import $ from "jquery";
import Loading from "./Loading";
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'
export default {
  name: "VuetifyDatatable",
  created() {
    this.getListData();
  },
  components: {
    BeatLoader
  },
  methods: {
    getListData: function() {
      var root = "https://gis.achilov.dev/api/v1/reconstruction-objects";
      var vm = this;
      vm.loading = true;
      $.ajax({
        url: root + "/daily/2019-10-10",
        method: "GET"
      }).then(function(data) {
        var obj = data.reconstructionObjects;
        var result = Object.keys(obj).map(function(key) {
          return [Number(key), obj[key]];
        });
        var arr2 = [];
        for (var i = 0; i < result.length; i++) {
          arr2.push(result[i][1]);
        }
        for (const [key, value] of Object.entries(arr2[0])) {
          vm.headers.push({
            text: value,
            value: key
          });
        }
        arr2 = arr2.slice(1);
        vm.items = arr2;
        vm.loading = false;
      });
    }
  },
  data() {
    return {
      search: "",
      headers: [],
      items: [],
      loading: false
    };
  }
};
</script>
<style scoped>
.v-spinner{
  text-align: center;
 
}
</style>