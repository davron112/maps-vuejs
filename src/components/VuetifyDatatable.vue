<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :search="search"></v-data-table>
    </v-card>
  </v-container>
</template>
    

<script>
import $ from 'jquery'
export default {
  name: "VuetifyDatatable",
  created() {
    this.getListData();
  },
  methods: {
    getListData: function() {
      var root = "https://mygov.achilov.dev/development-architectural-planning-v2/rest-api";
      var vm = this;

      $.ajax({
        url: root + "/get-task?id=5682001",
        method: "GET"
      }).then(function(data) {
        var result = data.entities.DevelopmentArchitecturalPlanning;
        
        vm.items = result;
        console.log(vm.items)
      });
    }
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "id",
          align: "left",
          filterable: false,
          value: "id"
        },
        { text: "authority_id", value: "authority_id" },
        { text: "legal_entity_tin", value: "legal_entity_tin" },
        { text: "legal_entity_name", value: "legal_entity_name" },
        { text: "legal_entity_email", value: "legal_entity_email" },
        { text: "legal_entity_address", value: "legal_entity_address" }
      ],
      items: []
    };
  }
};
</script>