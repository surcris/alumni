db.createUser({
    user: 'user_conversation_db_admin',
    pwd: 'admin',
    roles: [
        {
            role: 'dbOwner',
            db: 'user_conversation_db'
        }
    ],
    mechanisms: ['SCRAM-SHA-256']
})