
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'iris', password: "pass"},
        {id: 2, username: 'tristan', password: "pass"},
        {id: 3, username: 'jitomo', password: "hello"}
      ]);
};
