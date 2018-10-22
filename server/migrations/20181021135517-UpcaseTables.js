'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all[
      queryInterface.renameTable("posts", "Posts"),
      queryInterface.renameTable("tags", "Tags"),
      queryInterface.renameTable("post_tag", "Post_tag")]
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all[
      queryInterface.renameTable("Posts", "posts"),
      queryInterface.renameTable("Tags", "tags"),
      queryInterface.renameTable("Post_tag", "post_tag")]
  }
};
