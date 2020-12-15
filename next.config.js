module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: `/reddit/subreddits/posts?r=earthporn`,
        permanent: true,
      },
    ];
  },
};
