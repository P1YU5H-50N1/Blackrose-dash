<template>
  <div
    class="bg-black text-white min-h-screen flex justify-center items-center"
  >
    <form
      class="p-10 rounded-lg shadow-lg w-full sm:max-w-md"
      @submit.prevent="register"
    >
      <h2 class="text-2xl font-bold mb-6">Create an account</h2>
      <div v-if="error">{{ error }}</div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-bold mb-2"
          >Email</label
        >
        <input
          required
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
          required
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
        <div class="flex items-center">
          <span class="text-gray-600 mr-2">or</span>
        </div>
      </div>
    </form>
    <button
      @click="loginWithGoogle()"
      class="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Sign in with Google
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore, mapState } from "vuex";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  computed: mapState({
    error: (state) => state.error,
    error(state) {
      return state.error;
    },
  }),

  // methods: {
  //   loginWithGoogle() {
  //     const provider = new GoogleAuthProvider()
  //     const auth = getAuth();
  //     signInWithPopup(auth, provider)
  //       .then((result) => {
  //         // This gives you a Google Access Token. You can use it to access the Google API.
  //         const credential = GoogleAuthProvider.credentialFromResult(result);
  //         const token = credential.accessToken;
  //         // The signed-in user info.
  //         const user = result.user
  //         console.log(user,token,"OAUTH GOOGLE")
  //         // IdP data available using getAdditionalUserInfo(result)
  //         // ...
  //       })
  //       .catch((error) => {
  //       // Handle Errors here.
  //       console.log(error)
  //       // const errorCode = error.code;
  //       // const errorMessage = error.message;
  //       // // The email of the user's account used.
  //       // const email = error.customData.email;
  //       // // The AuthCredential type that was used.
  //       // const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  //   },
  // },
  setup() {
    const register_form = ref({});
    const store = useStore();
    const router = useRouter();

    const register = async () => {
      await store.dispatch("register", register_form.value);
      if (store.state.error == "Email Not Verified") {
        router.push("/login");
      }
    };
    const loginWithGoogle = async () => {
      await store.dispatch("loginWithGoogle");
      if (!store.state.error) {
        router.push("/");
      }
    };

    return {
      register_form,
      loginWithGoogle,
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
