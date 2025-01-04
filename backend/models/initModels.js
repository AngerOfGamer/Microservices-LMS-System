import Class from './class.js';
import Absensi from './absensi.js';
import Content from './content.js';
import User from './user.js';

const models = {
  Class,
  Absensi,
  Content,
  User,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;
