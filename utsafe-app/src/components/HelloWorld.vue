<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <h1>UTSafe Insurance</h1>
      <v-row>
        <v-col cols="12" md="6">
          <v-form v-model="isValid">
            <h2>Get a Quote</h2>
            <v-card>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="Name"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">

                    <v-text-field
                      v-model="carModel"
                      label="Car Model"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-select
                      v-model="age"
                      :items="ageRange"
                      label="Age"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6">

                    <v-select
                      v-model="drivingExpYrs"
                      :items="ageRange"
                      label="Year of Driving Experience"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!isValid"
                  :loading="loading"
                  color="primary"
                  @click="submit"
                >Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
        <v-col cols="12" md="6">
          <v-card
            v-if="yourQuote"
          >
            <v-card-title>
              Your Quote:
            </v-card-title>
            <v-list lines="one">
              <v-list-item
                :title="'Rate :: $' + yourQuote.quoteRate"
                :subtitle="'Car Model :: ' + yourQuote.carModel"
              />
            </v-list>
          </v-card>

          <v-card
            v-if="bestThree.length"
            class="mt-3"
          >
            <v-card-title>
              Best Three
            </v-card-title>
              <v-list lines="one">
                <v-list-item
                  v-for="(quote, index) in bestThree"
                  :key="index"
                  :title="'Rate :: $' + quote.quoteRate"
                  :subtitle="'Car Model :: ' + quote.carModel"
                />
              </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { getRate, getTopThree } from '@/service/quote'
const ageRange = [...Array(100).keys()]
const name = ref("")
const age = ref(20)
const carModel = ref("")
const drivingExpYrs = ref(5)
const loading = ref(false)

const isValid = ref(false)

const yourQuote = ref()

const bestThree = ref([])
const error = ref()

const nameRules = [
  value => {
    if (value) return true

    return 'Field is required.'
  },
  value => {
    if (value?.length >= 2) return true

    return 'Field must be more than 2 characters.'
  },
]

async function submit() {
  loading.value = true
  try {
    const [quote, topThree] = await Promise.all([
    getRate({
      name: name.value,
      age: age.value,
      carModel: carModel.value,
      drivingExpYrs: drivingExpYrs.value
    }),
    getTopThree(),
    ])
    bestThree.value = topThree
    yourQuote.value = quote
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>
