/**
 * TUTORIAL SOURCE
 * Mongoose Crash Course - Beginner Through Advanced
 * https://www.youtube.com/watch?v=DZBGEVgL2eE
 * Web Dev Simplified
 */

const mongoose = require('mongoose');
const User = require('./User');

mongoose.set('strictQuery', true); // suppress deprecation warnings
mongoose.connect(
  "mongodb://localhost/testdb",
  () => console.log('mongodb connected successfully'),
  (err) => console.log(err)
);

// // promise syle
// const user = new User({ name: "Joey", age: 12 });
// user.save().then(() => { console.log('User saved'); })

// // async style
// async function run() {
//   const user = await User.create({ name: "Joey", age: 12 });
//   // // amend and save the user
//   // user.name = 'Helga';
//   // await user.save();
//   console.log('User saved\n', user);
// }

// async style
async function run() {
  // prefer User.findById('xxx').save() 
  // as model validation ONLY works on SAVE and CREATE
  try {
    const user = await User.create({
      name: "Joey",
      age: 12,
      hobbies: ['Run', 'Jump'],
      email: 'james@gmail.com',
      address: {
        street: 'Downing Street',
        city: 'London',
      }
    });
    // // immutable fiels will not be affected
    // user.createdAt = 5;
    // await user.save();
    console.log('User saved\n', user);
  } catch (err) {
    // console.log(err.errors.age); // more details here
    console.log(err.message);
  }
}
// run();

// async function mongoQuery() {
//   const user = await User
//     .where('name').equals("Joey")
//     .where('age').gt(1).lt(13)
//     .limit(1)
//     .select('hobbies');
//   user[0].bestfriend = '639f7f338d198a8169c06e7a';
//   await user[0].save();
//   console.log('FOUND \n', user);
// }
// mongoQuery();


async function mongoQuery() {
  const user = await User
    .where('bestfriend').exists()
    .limit(1)
    .populate('bestfriend');
  console.log('FOUND \n', user);
}
mongoQuery();