<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="12"
      >
      <!-- array of cards -->
        <v-row class="mt-5 mb-16" no-gutters>
          <v-col
            v-for="(product, index) in $store.state.products"
            :key="product.id"
            :index="index"
            cols="6"
            sm="3"
          >
            <v-card
              class="ma-2"
              max-width="300"
            >
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
                <v-row
                  align="center"
                  class="mx-0"
                >
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
                </div>
              </v-card-text>

            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StarRating from '../components/StarRating'
import Images from '../components/Images'

export default {
  components: { StarRating, Images },

  name: 'Home',

  mounted () {
    this.$store.dispatch('getProducts')
  }
}
</script>
