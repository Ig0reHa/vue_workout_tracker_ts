<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- Status message -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 bg-light-grey rounded-md shadow-lg"
    >
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <!-- Create -->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!-- Form -->
      <form
        @submit.prevent="createWorkout"
        class="flex flex-col gap-y-5 w-full"
      >
        <h1 class="text-2xl text-at-light-green">Record Workout</h1>

        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-light-green"
            >Workout Name</label
          >
          <input
            v-model="workoutName"
            type="text"
            required
            id="workout-name"
            class="p-2 text-gray-500 focus:outline-none"
          />
        </div>

        <!-- Workout Type -->
        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-at-light-green"
            >Workout Type</label
          >
          <select
            @change="workoutChange"
            v-model="workoutType"
            required
            id="workout-type"
            class="p-2 text-gray-500 focus:outline-none"
          >
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <!-- Strength Training Inputs -->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div
            v-for="(item, index) in exercises"
            :key="index"
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
          >
            <div class="flex flex-col md:w-1/3">
              <label
                for="exercise-name"
                class="mb-1 text-sm text-at-light-green"
                >Exercise</label
              >
              <input
                v-model="item.exercise"
                type="text"
                required
                id="exercise-name"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green"
                >Sets</label
              >
              <input
                v-model="item.sets"
                type="text"
                required
                id="sets"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green"
                >Reps</label
              >
              <input
                v-model="item.reps"
                type="text"
                required
                id="reps"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green"
                >Weight (KG's)</label
              >
              <input
                v-model="item.weight"
                type="text"
                required
                id="weight"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
            </div>

            <img
              @click="deleteExercise(item.id)"
              src="../assets/images/trash-light-green.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer"
            />
          </div>

          <button
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            Add Exercise
          </button>
        </div>

        <!-- Cardio Training Inputs -->
        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div
            v-for="(item, index) in exercises"
            :key="index"
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green"
                >Type</label
              >
              <select
                v-model="item.cardioType"
                required
                id="cardio-type"
                class="p-2 w-full text-gray-500 focus:outline-none"
              >
                <option value="#">Select Exercise</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green"
                >Distance</label
              >
              <input
                v-model="item.distance"
                type="text"
                required
                id="distance"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green"
                >Duration</label
              >
              <input
                v-model="item.duration"
                type="text"
                required
                id="duration"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green"
                >Pace</label
              >
              <input
                v-model="item.pace"
                type="text"
                required
                id="pace"
                class="p-2 w-full text-gray-500 focus:outline-none"
              />
            </div>

            <img
              @click="deleteExercise(item.id)"
              src="../assets/images/trash-light-green.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer"
            />
          </div>

          <button
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            Add Exercise
          </button>
        </div>

        <button
          type="submit"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-at-light-green hover:bg-white hover:text-at-light-green"
        >
          Record Workout
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { uid } from "uid";
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
  setup() {
    // Create data
    const workoutName = ref<string>("");
    const workoutType = ref<string>("select-workout");
    const exercises = ref<Exercise[]>([]);
    const statusMsg = ref<null | string>(null);
    const errorMsg = ref<null | string>(null);

    // Add exercise
    const addExercise = () => {
      if (workoutType.value === "strength") {
        exercises.value.push({
          id: uid(),
          exercise: "",
          sets: "",
          reps: "",
          weight: "",
        });
      } else if (workoutType.value === "cardio") {
        exercises.value.push({
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
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter(
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

    // Listens for chaging of workout type input
    const workoutChange = () => {
      exercises.value = [];
      addExercise();
    };

    // Create workout
    const createWorkout = async () => {
      try {
        const { error } = await supabase.from("Workouts").insert([
          {
            workoutName: workoutName.value,
            workoutType: workoutType.value,
            exercises: exercises.value,
          },
        ]);
        if (error) throw error;

        statusMsg.value = "Workout created successfully!";
        setTimeout(() => {
          statusMsg.value = null;
        }, 5000);

        workoutName.value = "";
        workoutType.value = "select-workout";
        exercises.value = [];
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    return {
      workoutName,
      workoutType,
      exercises,
      statusMsg,
      errorMsg,
      addExercise,
      workoutChange,
      deleteExercise,
      createWorkout,
    };
  },
};
</script>
