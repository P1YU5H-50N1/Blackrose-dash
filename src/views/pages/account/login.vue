<template>
  <div class="h-full w-full bg-public-bg bg-no-repeat bg-center blur-2xl bg-black text-white "
    :style="{ backgroundSize: 'cover' }">
    <div class="h-full w-full " :style="{
      background: 'linear-gradient(303.08deg, #2DFF8E -198.89%, #F5F5F5 48.6%)',
      mixBlendMode: 'color'
    }">


    </div>
  </div>
  <!-- <div class="flex justify-center items-center h-screen">
    <form class="p-10 bg-black rounded-lg shadow-xl" @submit.prevent="login">
      <h1 class="text-white text-3xl mb-6">Log In</h1>
      <div class="mb-4">
        <div v-if="error">{{ error }}</div>
        <label class="block text-white text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          v-model="login_form.email"
          required
          class="appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label class="block text-white text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          required
          class="appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
          v-model="login_form.password"
          id="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          value="Login"
        >
          Log In
        </button>
      </div>
      <div class="mt-4">
        <p class="text-white text-center">or</p>
      </div>
      <div class="flex justify-center mt-2">
        <button
          @click="loginWithGoogle()"
          class="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          type="button"
        >
          Sign In with Google
        </button>
        <router-link to="/register">
          <button
            class="bg-green-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            type="button"
          >
            Register
          </button>
        </router-link>
      </div>
    </form>
  </div> -->
</template>

<script>
import { ref } from "vue";
import { useStore, mapState } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "login",
  computed: mapState({
    error: (state) => state.error,
    error(state) {
      return state.error;
    },
  }),
  setup() {
    const login_form = ref({});
    const store = useStore();
    const router = useRouter();

    const login = async () => {
      await store.dispatch("logIn", login_form.value);
      if (await store.getters["emailVerified"]) {
        router.push("/");
      }
    };
    const loginWithGoogle = async () => {
      await store.dispatch("loginWithGoogle");
      if (!store.state.error) {
        router.push("/");
      }
    };
    return {
      login_form,
      login,
      loginWithGoogle,
    };
  },
};
</script>

<style scoped>
/* body {
  background-color: black;
}
button {
  cursor: pointer;
} */
</style>
