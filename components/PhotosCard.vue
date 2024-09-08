<template>
  <v-card>
    <v-container>
      <v-row class="tw-flex tw-flex-1">
        <v-col v-for="n in 9" :key="n" cols="12" md="4" class="tw-my-6">
          <v-img
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
            aspect-ratio="1"
            class="bg-grey-lighten-2 hover:tw-scale-110 hover:tw-opacity-40"
            cover
          >
            <template v-slot:placeholder>
              <v-row align="center" class="tw-h-full" justify="center">
                <v-progress-circular
                  color="grey-lighten-5"
                  indeterminate
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts"></script>

<style scoped></style>
