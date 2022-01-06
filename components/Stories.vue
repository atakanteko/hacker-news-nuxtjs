<template>
  <div>
    <div v-if="getIsLoading" class="loading" />
    <h2 v-else>
      stories component
    </h2>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Stories',
  computed: {
    ...mapGetters('pool', ['getIsLoading']),
  },
  mounted() {
    this.setHits();
  },
  methods: {
    ...mapActions({
      setHits: 'pool/setHits',
    }),
  },

};
</script>
