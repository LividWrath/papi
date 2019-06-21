const userService = require('./userservice');
const PostModel = require('../models/post');

module.exports = {
  createPost: payload => {
    return new Promise((resolve, reject) => {
      const post = new PostModel({
        text: payload.post.text,
        imageUrl: payload.post.imageurl,
        owner: payload.user._id
      });
      post
        .save()
        .then(savedPost => {
          userService
            .addPost({ user: payload.user, post: savedPost })
            .then(user => {
              resolve(savedPost);
            })
            .catch(err => {
              console.error(err);
              PostModel.findByIdAndDelete(savedPost._id)
                .then(data => {
                  reject(Error('unable to save post'));
                })
                .catch(error => {
                  console.error(error);
                  reject(error);
                });
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getPost: payload => {
    return new Promise((resolve, reject) => {
      PostModel.findById(payload.id)
        .then(post => {
          resolve(post);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  likePost: payload => {
    return new Promise((resolve, reject) => {
      PostModel.findByIdAndUpdate(payload.post.id, { $addToSet: { likes: payload.user._id } })
        .then(post => {
          userService
            .likePost(payload)
            .then(user => resolve(post))
            .catch(err => {
              console.error(err);
              PostModel.findByIdAndUpdate(payload.post.id, { $pull: { likes: payload.user._id } })
                .then(updatedPost => {
                  reject(updatedPost);
                })
                .catch(error => reject(error));
            });
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  getPostFeed: () => {
    return new Promise((resolve, reject) => {
      PostModel.find({})
        .sort({ createdAt: -1 })
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
};
