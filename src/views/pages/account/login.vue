<template>
  <div class="h-full w-full bg-public-bg bg-no-repeat absolute bg-center blur-2xl bg-black text-white "
    :style="{ backgroundSize: 'cover' }">
    <div class="h-full w-full absolute mix-blend-color bg-green-overlay">
    </div>
  </div>


  <div class="text-white text-4xl absolute h-full w-full flex justify-center">
    <div class=" w-full md:w-4/5 h-full p-2 flex justify-center md:justify-between">

      <div
        class="self-center justify-self-center min-w-300 w-4/5 md:w-1/3 h-4/5 border text-center flex flex-col border-gray-700 p-3 justify-center shadow-gray-card bg-gray-card rounded-xl">

        <div class="font-semibold mb-4">
          Login
        </div>

        <div class="text-xs text-black h-6 flex gap-2 justify-center mt-3 mb-3">
          <div v-if="error && error != 'Loading'" class="bg-white rounded-md p-1 animate-shake">
            {{ error }}
          </div>
          <div v-if="error && error == 'Loading'">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            </span>
          </div>
        </div>

        <form @submit.prevent="login" class="flex flex-col text-base">

          <div class="relative mb-5" data-te-input-wrapper-init>
            <input v-model="login_form.email" type="email" required
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 border-b-white border-b-2 "
              id="email" placeholder="Form control lg" />
            <label for="exampleFormControlInput2"
              v-bind:class="{ '-translate-y-[1.15rem] scale-[0.8] text-primary': login_form.email }"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary ">
              Email
            </label>
          </div>
          <div class="relative mb-3" data-te-input-wrapper-init>
            <input type="password" required v-model="login_form.password"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 border-b-white border-b-2 "
              id="exampleFormControlInput2" placeholder="Form control lg" />
            <label for="exampleFormControlInput2"
              v-bind:class="{ '-translate-y-[1.15rem] scale-[0.8] text-primary': login_form.password }"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary ">
              Password
            </label>
          </div>
          <div class="w-4/5 self-center pt-2">
            <button type="submit" value="Login" class="rounded bg-button-gray
                            w-full
                            px-6 pb-2 pt-2.5 text-sm 
                            font-medium leading-normal
                             text-white 
                             shadow-[0_4px_3px_-3px_gray] 
                             transition duration-300 ease-in-out hover:bg-primary-600
                            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_0px_4px_0_#2DFF8E] 
                            active:shadow-[0_8px_9px_-4px_gray,0_4px_18px_0_rgba(59,113,202,0.2)] ">
              Login
            </button>
          </div>
        </form>
        <div class="w-4/5 mt-4 self-center pt-2">
          <router-link to="/register">

            <button type="button" class="rounded bg-button-gray
                w-full
                px-6 pb-2 pt-2.5 text-sm 
                font-medium leading-normal
                text-white 
                             shadow-[0_4px_3px_-3px_gray] 
                             transition duration-300 ease-in-out hover:bg-primary-600
                             hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_0px_4px_0_#2DFF8E] 
                             active:shadow-[0_8px_9px_-4px_gray,0_4px_18px_0_rgba(59,113,202,0.2)] ">
              Register
            </button>
          </router-link>
        </div>
        <div class="max-w-4/5 mt-1 self-center pt-2">

          <button type="button" @click="loginWithGoogle()" class="rounded-full bg-white
                          max-w-10
                          px-6 pb-2 pt-2.5 text-sm 
                          font-medium leading-normal
                          text-gray-800
                          shadow-[0_4px_3px_-3px_gray] 
                          transition duration-300 ease-in-out hover:bg-primary-600
                          gap-5
                          hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_0px_4px_0_#2DFF8E] flex 
                          active:shadow-[0_8px_9px_-4px_gray,0_4px_18px_0_rgba(59,113,202,0.2)] ">
            <div class="bg-g-login w-[21px] h-[21px] "></div>
            <p>
              Login With Google
            </p>
          </button>
        </div>
      </div>

      <div class="hidden md:flex flex-col pt-16 items-end gap-6">
        <div class="flex justify-center items-center gap-4 mb-8 font-bold">
          <div>
            Blackrose
          </div>
          <div class="bg-logo bg-cover h-[73px] w-[70px]">
          </div>
        </div>

        <div class="text-right leading-relaxed">
          <div class="font-semibold text-5xl mb-2">Track Your Alphas</div>
          <div class="text-xl font-bold">Made By <span class="text-neon">Misfits</span></div>
        </div>

      </div>
    </div>
  </div>
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
