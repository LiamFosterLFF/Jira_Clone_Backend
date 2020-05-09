const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  mongoose.connection
  .once('open', () => { done(); })
  .on('error', (error) => {
    console.warn('Warning', error);
  });
});

beforeEach((done) => {
  const { users, projects, issues } = mongoose.connection.collections;
  users.drop(() => {
    projects.drop(() => {
      issues.drop(() =>{
        done();
      });
    });
  });
});
