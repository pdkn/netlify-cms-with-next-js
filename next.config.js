module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      '/admin': { page: '/admin' },
    };
  },
};
