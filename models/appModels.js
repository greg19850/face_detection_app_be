const knex = require('knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 3 }
})

db.raw("SELECT VERSION()").then(() =>{
  console.log("connection to db successful")
});

exports.fetchUser = (id) =>{
  return db.select('*')
  .from('users')
  .where({
    id
  })
}

exports.addUser = ( name, email, password) =>{
  const hash = bcrypt.hashSync(password, saltRounds);
  return db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
      .returning('*')
      .insert({
        name: name,
        email: loginEmail[0].email,
        joined: new Date,
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
}


exports.fetchImage = (id) => {
  return db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
}

exports.getRegisteredUser = (email,password) => {
  return db.select('email', 'hash').from('login')
  .where('email', '=', email)
  .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash)
    if(isValid){
      return db.select('*').from('users')
      .where('email', '=', email)
    }
  })
}