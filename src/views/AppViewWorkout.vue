<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- App Message -->
    <div
      v-if="errorMsg || statusMsg"
      class="mb-10 p-4 rounded-md shadow-md bg-light-grey"
    >
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <div v-if="dataLoaded">
      <!-- General Workout Info -->
      <div
        class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative"
      >
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <div
            @click="editMode"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
          >
            <img src="../assets/images/pencil-light.png" class="h-3.5 w-auto" />
          </div>
          <div
            @click="deleteWorkout"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
          >
            <img src="../assets/images/trash-light.png" class="h-3.5 w-auto" />
          </div>
        </div>

        <img
          v-if="data.workoutType === 'cardio'"
          src="../assets/images/running-light-green.png"
          class="h-24 w-auto"
        />
        <img
          v-else
          src="../assets/images/dumbbell-light-green.png"
          class="h-24 w-auto"
        />

        <span
          class="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green rounded-lg shadow-md"
        >
          {{ data.workoutType }}
        </span>

        <div class="w-full mt-6">
          <input
            v-if="edit"
            v-model="data.workoutName"
            type="text"
            id=""
            class="p-2 w-full text-gray-500 focus:outline-none"
          />
          <h1 v-else class="text-at-light-green text-2xl text-center">
            {{ data.workoutName }}
          </h1>
        </div>
      </div>

      <!-- Exercises -->
      <div
        class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-grey shadow-md"
      >
        <!-- Strength Training -->
        <div
          v-if="data.workoutType === 'strength'"
          class="flex flex-col gap-y-4 w-full"
        >
          <div
            v-for="(item, index) in data.exercises"
            :key="index"
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label
                for="exercise-name"
                class="mb-1 text-sm text-at-light-green"
                >Exercise</label
              >
              <input
                v-if="edit"
                v-model="item.exercise"
                type="text"
                id="exercise-name"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
              <p v-else>{{ item.exercise }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-at-light-green"
                >Sets</label
              >
              <input
                v-if="edit"
                v-model="item.sets"
                type="text"
                id="sets"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
              <p v-else>{{ item.sets }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-at-light-green"
                >Reps</label
              >
              <input
                v-if="edit"
                v-model="item.reps"
                type="text"
                id="reps"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
              <p v-else>{{ item.reps }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-at-light-green"
                >Weight</label
              >
              <input
                v-if="edit"
                v-model="item.weight"
                type="text"
                id="weight"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
              <p v-else>{{ item.weight }}</p>
            </div>

            <img
              @click="deleteExercise(item.id)"
              v-if="edit"
              src="../assets/images/trash-light-green.png"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
            />
          </div>
          <button
            @click="addExercise"
            v-if="edit"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            Add Exercise
          </button>
        </div>

        <!-- Cardio -->
        <div v-else class="flex flex-col gap-y-4 w-full">
          <div
            v-for="(item, index) in data.exercises"
            :key="index"
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="cardioType" class="mb-1 text-sm text-at-light-green"
                >Type</label
              >
              <select
                v-if="edit"
                v-model="item.cardioType"
                id="cardioType"
                class="p-2 w-full text-gray-500 focus:outline-none"
              >
                <option value="">Select Exercise</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
              <p v-else>{{ item.cardioType }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="distance" class="mb-1 text-sm text-at-light-green"
                >Distance</label
              >
              <input
                v-if="edit"
                v-model="item.distance"
                type="text"
                id="distance"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
              <p v-else>{{ item.distance }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="duration" class="mb-1 text-sm text-at-light-green"
                >Duration</label
              >
              <input
                v-if="edit"
                v-model="item.duration"
                type="text"
                id="duration"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
              <p v-else>{{ item.duration }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="pace" class="mb-1 text-sm text-at-light-green"
                >Pace</label
              >
              <input
                v-if="edit"
                v-model="item.pace"
                type="text"
                id="pace"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
              <p v-else>{{ item.pace }}</p>
            </div>

            <img
              @click="deleteExercise(item.id)"
              v-if="edit"
              src="../assets/images/trash-light-green.png"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
            />
          </div>
          <button
            @click="addExercise"
            v-if="edit"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            Add Exercise
          </button>
        </div>
      </div>

      <!-- Update -->
      <button
        @click="updateWorkout"
        v-if="edit"
        type="submit"
        class="mt-10 py-2 px-6 rounded-sm text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-at-light-green hover:bg-white hover:text-at-light-green"
      >
        Update Workout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
import { useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import { useAppStore } from "../store/index";

import { Exercise } from "../interfaces";

interface Workouts {
  workoutName: string;
  workoutType: string;
  exercises: Exercise[];
}

export default {
  setup() {
    // Create data / vars
    const Store = useAppStore();
    const route = useRoute();
    const router = useRouter();
    const user = computed(() => Store.getUser);
    const data = ref<Workouts | null>(null);
    const dataLoaded = ref<null | boolean>(null);
    const errorMsg = ref<null | string>(null);
    const statusMsg = ref<null | string>(null);

    // Get current Id of route
    const currentId = route.params.workoutId;

    // Get workout data
    const getData = async () => {
      try {
        const { data: Workouts, error } = await supabase
          .from("Workouts")
          .select("*")
          .eq("id", currentId);

        if (error) throw error;

        data.value = Workouts[0];
        dataLoaded.value = true;
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    getData();

    // Delete workout
    const deleteWorkout = async () => {
      try {
        const { error } = await supabase
          .from("Workouts")
          .delete()
          .eq("id", currentId);

        if (error) throw error;

        router.push({ name: "Home" });
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    // Edit mode
    const edit = ref<null | boolean>(null);
    const editMode = () => {
      edit.value = !edit.value;
    };

    // Add exercise
    const addExercise = () => {
      if (data.value?.workoutType === "strength") {
        data.value.exercises.push({
          id: uid(),
          exercise: "",
          sets: "",
          reps: "",
          weight: "",
        });
      } else if (data.value?.workoutType === "cardio") {
        data.value.exercises.push({
          id: uid(),
          cardioType: "",
          distance: "",
          duration: "",
          pace: "",
        });
      }
    };

    // Delete exercise
    const deleteExercise = (id) => {
      if (data.value !== null && data.value.exercises.length > 1) {
        data.value.exercises = data.value.exercises.filter(
          (exercise) => exercise.id !== id
        );
      } else {
        errorMsg.value =
          "Error: Can't remove, you must have at least one exercise";
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    // Update Workout
    const updateWorkout = async () => {
      try {
        const { error } = await supabase
          .from("Workouts")
          .update({
            workoutName: data.value?.workoutName,
            exercises: data.value?.exercises,
          })
          .eq("id", currentId);

        if (error) throw error;

        edit.value = false;

        statusMsg.value = "Workout updated successfully!";
        setTimeout(() => {
          statusMsg.value = null;
        }, 5000);
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    return {
      user,
      data,
      dataLoaded,
      errorMsg,
      statusMsg,
      edit,
      editMode,
      deleteWorkout,
      addExercise,
      deleteExercise,
      updateWorkout,
    };
  },
};
</script>
