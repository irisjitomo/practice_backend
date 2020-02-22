const db = require('../database/db-config')

module.exports = {
    add,
    findById,
    findBy
}

async function add(user){
    const [id] = await db('users')
    .insert(user, 'id')

    return db('users').where({id}).first()
}

function findById(id){
    return db('users')
    .where({id})
    .first()
}

function findBy(user){
    return db('users').where(user)
}