<template>
  <div v-if="dataLoaded" class="container mt-10 px-4">
    <!-- No Data -->
    <div v-if="data.length === 0" class="w-full flex flex-col items-center">
      <h1 class="text-2xl">Looks empty here...</h1>
      <router-link
        :to="{ name: 'Create' }"
        class="mt-6 py-2 px-6 rounded-sm text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-at-light-green hover:bg-white hover:text-at-light-green"
        >Create workout</router-link
      >
    </div>

    <!-- Data -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <router-link
        class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
        v-for="(workout, index) in data"
        :key="index"
        :to="{ name: 'View-Workout', params: { workoutId: workout.id } }"
      >
        <!-- Cardio Img -->
        <img
          v-if="workout.workoutType === 'cardio'"
          src="../assets/images/running-light-green.png"
          class="h-24 w-auto"
        />

        <!-- Strength Training -->
        <img
          v-else
          src="../assets/images/dumbbell-light-green.png"
          class="h-24 w-auto"
        />

        <p
          class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg"
        >
          {{ workout.workoutType }}
        </p>

        <h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
          {{ workout.workoutName }}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { supabase } from "../supabase/init";

interface Exercise {
  id: string;
  exercise?: string;
  sets?: string;
  reps?: string;
  weight?: string;
  cardioType?: string;
  distance?: string;
  duration?: string;
  pace?: string;
}

export default {
  components: {},
  setup() {
    // Create data / vars
    const data = ref<Exercise[]>([]);
    const dataLoaded = ref<null | boolean>(null);

    // Get data
    const getData = async () => {
      try {
        const { data: Workouts, error } = await supabase
          .from("Workouts")
          .select("*");

        if (error) throw error;

        data.value = Workouts;
        dataLoaded.value = true;
      } catch (error) {
        console.warn(error.message);
      }
    };

    // Run data function
    getData();

    const WorkoutsListen = supabase
      .from("Workouts")
      .on("*", (payload) => {
        console.log("Change received!", payload);

        data.value.forEach((workout, i) => {
          if (workout.id === payload.new.id) {
            data.value[i] = payload.new;
            return;
          }
        });
      })
      .subscribe();

    return { data, dataLoaded, WorkoutsListen };
  },
};
</script>
