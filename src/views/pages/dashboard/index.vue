<template>
  Dashboard
  <a href="/logout"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Logout
</a>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "dashboard",
  setup() {
    const store = useStore();

    const logout = () => {
      store.dispatch("logOut");
    };
    return {
      logout,
    };
  },
};
</script>

<style>
</style>