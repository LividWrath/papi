const UserModel = require('../models/user');

module.exports = {
  createUser: payload => {
    return new Promise(function(resolve, reject) {
      UserModel.register(
        new UserModel({ username: payload.username, name: payload.name, email: payload.email }),
        payload.password,
        (err, user) => {
          if (err) {
            console.error('error while user register!', err);
            reject(err);
          } else {
            console.log('user registered!');
            resolve(user);
          }
        }
      );
    });
  },
  addPost: payload => {
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(payload.user._id, { $addToSet: { posts: payload.post._id } })
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  likePost: payload => {
    return new Promise((resolve, reject) => {
      UserModel.findByIdAndUpdate(payload.user._id, { $addToSet: { likedPosts: payload.post.id } })
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getUser: payload => {
    return new Promise((resolve, reject) => {
      UserModel.findById(payload.id)
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getUserPosts: payload => {
    return new Promise((resolve, reject) => {
      UserModel.findById(payload.id)
        .populate('posts')
        .then(posts => {
          resolve(posts);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getLikedPosts: payload => {
    return new Promise((resolve, reject) => {
      UserModel.findById(payload.id)
        .populate('likedPosts')
        .then(posts => {
          resolve(posts);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
