<template>
  <div class="stories">
    <div v-if="getIsLoading" class="loading" />
    <section v-for="(item, index) in storyInfo" v-else :key="index">
      <article class="story">
        <h4 class="title">
          {{ item.title }}
        </h4>
        <p class="info">
          {{ item.points }} points by <span>{{ item.author }} | </span> {{ item.numberOfComments }}
          comments
        </p>
        <div>
          <a
            :href="item.url"
            class="read-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            read more
          </a>
          <button
            class="remove-btn"
          >
            remove
          </button>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Stories',
  data() {
    return {
      storyInfo: null,
    };
  },
  computed: {
    ...mapGetters('pool', ['getHits', 'getIsLoading']),
  },
  watch: {
    getHits() {
      this.storyInfo = this.getHits.map(item => ({
        id: item.objectID,
        title: item.title,
        numberOfComments: item.num_comments,
        url: item.url,
        points: item.points,
        author: item.author,
      }));
    },
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
