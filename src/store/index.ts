import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase/init";

import { Exercise } from "../interfaces";

interface Workout {
  workoutName: string;
  workoutType: string;
  exercises: Exercise[];
}

interface AllWorkouts {
  id: Workout;
}

export const useAppStore = defineStore("appstore", () => {
  const user = ref(null);
  const allWorkouts = ref({});
  const getUser = computed(() => user.value);

  function setUser(payload) {
    user.value = payload ? payload.user : null;
  }

  async function loadWorkouts() {
    try {
      const { data: Workouts, error } = await supabase
        .from("Workouts")
        .select("*");

      if (error) throw error;

      allWorkouts.value = Workouts;

      const newObj = {};

      Workouts.forEach((workout) => {
        newObj[workout.id] = workout;
      });
    } catch (error) {
      console.warn(error.message);
    }
  }

  return { getUser, setUser, loadWorkouts };
});
