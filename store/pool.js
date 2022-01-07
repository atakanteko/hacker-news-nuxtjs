import axios from 'axios';
import {
  SET_LOADING, SET_PAGE, SET_STORIES, REMOVE_STORY,
} from './types';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

export const state = () => ({
  isLoading: true,
  hits: [],
  query: 'vue',
  page: 0,
  nbPages: 0,
});

export const getters = {
  getIsLoading: state => state.isLoading,
  getHits: state => state.hits,
  getQuery: state => state.query,
  getPage: state => state.page,
  getNbPages: state => state.nbPages,
};

export const actions = {
  setIsLoading: (context, loadingStatus) => {
    context.commit(SET_LOADING, loadingStatus);
  },
  setHits: async context => {
    await context.dispatch('setIsLoading', true);
    try {
      const response = await axios.get(`${API_ENDPOINT}query=${context.getters.getQuery}&page=${context.getters.getPage}`);
      const { hits, nbPages: numberOfPages } = response.data;
      context.commit(SET_STORIES, hits);
      context.commit(SET_PAGE, numberOfPages);
      context.commit(SET_LOADING, false);
    } catch (error) {
      console.log(error);
    }
  },
  setPage: (context, page) => {
    context.commit(SET_PAGE, page);
  },
  handleRemove: (context, id) => {
    const filteredStories = context.getters.getHits.filter(item => item.objectID !== id);
    context.commit(REMOVE_STORY, filteredStories);
  },
};

export const mutations = {
  [SET_LOADING](state, loadingStatus) {
    state.isLoading = loadingStatus;
  },
  [SET_STORIES](state, hits) {
    state.hits = hits;
  },
  [SET_PAGE](state, page) {
    state.page = page;
  },
  [REMOVE_STORY](state, filteredStories) {
    state.hits = filteredStories;
  },
};
