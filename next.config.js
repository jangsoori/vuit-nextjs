module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: `/reddit/subreddits/posts?r=earthporn%2Bpics`,
        permanent: true,
      },
    ];
  },
};
