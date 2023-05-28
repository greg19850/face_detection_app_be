const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'face_app_db'
  }
})


exports.fetchUser = (id) =>{
  return db.select('*')
  .from('users')
  .where({
    id
  })
}

exports.addUser = ( name, email) =>{
return db('users')
  .returning('*')
  .insert({
    name,
    email,
    joined: new Date,
  })
}
