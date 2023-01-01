<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" md="10">
        <!-- array of cards -->
        <v-row class="mt-5 mb-16" no-gutters>
          <v-col
            v-for="(product, index) in $store.state.products"
            :key="product.id"
            :index="index"
            cols="6"
            sm="3"
          >
            <v-card class="ma-2" max-width="300">
              <div v-if="product.inventory < 1">
                <Images
                  :height="250"
                  :src="product.image"
                  :alt="product.name"
                />
              </div>
              <div v-else>
                <router-link :to="'/detail/' + product.slug">
                  <Images
                    :height="250"
                    :src="product.image"
                    :alt="product.name"
                  />
                </router-link>
              </div>

              <v-card-title>{{ product.name }}</v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <!-- Stars -->
                  <StarRating
                    :item-id="product.id"
                    :item-rating="product.rating[0]"
                  />
                </v-row>

                <div class="my-6 subtitle-1">
                  <div v-if="product.inventory < 1">
                    <h4 class="red text-center white--text">Sold Out</h4>
                  </div>
                  <div v-else>
                    <h4>$ {{ product.price }}</h4>
                  </div>
                </div>

                <div class="hidden-sm-and-down">
                  Laborum do dolor
                </div>
              </v-card-text>

              <v-divider class="mx-4 hidden-sm-and-down"></v-divider>

              <v-card-actions class="hidden-sm-and-down">
                <div v-if="product.inventory < 1">
                  <v-btn
                    color="deep-purple lighten-2"
                    disabled
                    text
                    :to="'/detail/' + product.slug"
                  >
                    Details
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn
                    color="deep-purple lighten-2"
                    text
                    :to="'/detail/' + product.slug"
                  >
                    Details
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2">
        <!-- Filters-->
        <div id="app">
          <v-app id="inspire">
            <v-list>
              <v-list-group
                :value=true
                prepend-icon="mdi-account-circle"
              >
                <template
                  v-slot:activator>
                  <v-list-item-title>Filter</v-list-item-title>
                </template>
                <v-list-group
                  :value=true
                  no-action
                  sub-group
                >
                  <template
                    v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>Filter1</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <div id="example1">
                    <div
                      v-for="(item, index) in filtersCatalog.subFilters1"
                      :key="index"
                    >
                      <input
                        type="checkbox"
                        :id="item.name"
                        v-model="item.checked"
                      />
                      <label :for="item.name">{{ item.name }}</label>
                    </div>
                  </div>
                </v-list-group>

                <v-list-group
                  :value=true
                  no-action
                  sub-group
                >
                  <template
                    v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>Filter2</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <div id="example2">
                    <div
                      v-for="(item, index) in filtersCatalog.subFilters2"
                      :key="index"
                    >
                      <input
                        type="checkbox"
                        :id="item.name"
                        v-model="item.checked"
                      />
                      <label :for="item.name">{{ item.name }}</label>
                    </div>
                  </div>
                </v-list-group>
                <div class="text-center mt-5">
                  <v-btn
                    @click="applyFilters()"
                    rounded
                    color="deep-purple"
                    dark
                  >
                    Apply filter
                  </v-btn>
                </div>
              </v-list-group>
            </v-list>
          </v-app>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StarRating from "../components/StarRating";
import Images from "../components/Images";

export default {
  components: { StarRating, Images },

  name: "Catalog",
  data: () => ({
    filtersCatalog: {
      subFilters1: [
        { name: "filter one1", checked: false },
        { name: "filter two1", checked: false },
        { name: "filter tree1", checked: false },
      ],
      subFilters2: [
        { name: "filter one2", checked: false },
        { name: "filter two2", checked: false },
        { name: "filter tree2", checked: false },
      ],
    },
  }),
  mounted() {
    this.$store.dispatch("getProducts");
    if (localStorage.filtersCatalog)
      this.filtersCatalog =
        JSON.parse(localStorage.getItem("filtersCatalog")) || {};
  },
  methods: {
    applyFilters() {
      localStorage.setItem(
        "filtersCatalog",
        JSON.stringify(this.filtersCatalog)
      );
    },
  },
};
</script>
