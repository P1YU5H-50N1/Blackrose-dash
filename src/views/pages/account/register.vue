<template>
  <div
    class="bg-black text-white min-h-screen flex justify-center items-center"
  >
    <form
      class="p-10 rounded-lg shadow-lg w-full sm:max-w-md"
      @submit.prevent="register"
    >
      <h2 class="text-2xl font-bold mb-6">Create an account</h2>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-bold mb-2"
          >Email</label
        >
        <input
          type="email"
          id="email"
          class="w-full px-3 py-2 placeholder-gray-400 text-gray-200 border rounded-lg focus:outline-none focus:shadow-outline"
          placeholder="Email address"
          v-model="register_form.email"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 font-bold mb-2"
          >Password</label
        >
        <input
          type="password"
          id="password"
          class="w-full px-3 py-2 placeholder-gray-400 text-gray-200 border rounded-lg focus:outline-none focus:shadow-outline"
          placeholder="Password"
          v-model="register_form.password"
        />
      </div>
      <button
        type="submit"
        class="bg-neon-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
      <div class="flex items-center justify-between mt-6">
        <router-link
          to="/forgot-password"
          class="text-sm text-gray-600 hover:text-gray-100"
          >Forgot password?</router-link
        >
        <div class="flex items-center">
          <span class="text-gray-600 mr-2">or</span>
          <button
            class="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  name: "Register",
  setup() {
    const register_form = ref({});
    const store = useStore();

    const register = () => {
      store.dispatch("register", register_form.value);
    };

    return {
      register_form,
      register,
    };
  },
};
</script>

<style lang="postcss">
.bg-neon-green {
  background-color: #39ff14;
}

.text-neon-green {
  color: #39ff14;
}
</style>
