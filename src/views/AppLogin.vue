<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Login -->
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
    >
      <h1 class="text-3xl text-at-light-green mb-4">Login</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green"
          >Email</label
        >
        <input
          v-model="email"
          type="email"
          required
          id="email"
          class="p-2 text-gray-500 focus:outline-none"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green"
          >Password</label
        >
        <input
          v-model="password"
          type="password"
          required
          id="password"
          class="p-2 text-gray-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-at-light-green hover:bg-white hover:text-at-light-green"
      >
        Login
      </button>

      <router-link class="text-sm mt-6 text-center" :to="{ name: 'Register' }"
        >Don't have an account?
        <span class="text-at-light-green">Register</span></router-link
      >
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";

export default {
  setup() {
    // Create data / vars
    const router = useRouter();

    const email = ref<string>("");
    const password = ref<string>("");
    const errorMsg = ref(null);

    // Login function
    const login = async () => {
      errorMsg.value = null;

      try {
        const { error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });

        if (error) throw error;

        router.push({ name: "Home" });
      } catch (error) {
        errorMsg.value = error.message;
      }
    };

    return { email, password, errorMsg, login };
  },
};
</script>
