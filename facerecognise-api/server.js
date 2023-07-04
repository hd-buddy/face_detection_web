
import express, { request } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import pg from 'knex';
const database = pg({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '12345',
      database : 'smart-brain'
    }
  });

const saltRounds = 10;

// database.select()
//   .table('users')
//   .then(data => {console.log(data);})

const app = express()
app.use(bodyParser.json())
app.use(cors())


// const database ={
//     user:[
//         {
//             id:'123',
//             name:'Raj',
//             email:'raj@gmail.com',
//             password:'chips',
//             entries:0,
//             joined:new Date()
//         },
//         {
//             id:'215',
//             name:'Dev',
//             email:'dev@gmail.com',
//             password:'box',
//             entries:0,
//             joined:new Date()
//         }
//     ]
// }

app.get('/',(req,res)=>{
    res.send(database.user)
})

app.post('/signin',(req,res)=>{
    database.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data=>{
        const isValid = bcrypt.compareSync(req.body.password,data[0].hash)
    
    if(isValid){
        return database.select("*").from('users')
        .where('email','=',req.body.email)
        .then(user =>{
            res.json(user[0])
        })
        .catch(err => res.status(400).json('wrong'))
    }
    else{
        res.status(400).json('wrong')
    }
    })
    .catch(err =>res.status(400).json('wrong'))
})

app.post('/register',(req,res)=>{
    const {email,name,password}=req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    database.transaction(trx=> {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return trx ('users')
            .insert({
                email:loginEmail[0].email,
                name:name,
                joined:new Date()
            })
            .returning("*")
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('user already exist'))
})

app.get('/profile/:id',(req,res)=>{
    const {id} =req.params;
    database.select('*').from('users').where({id:id})
    .then(user =>
    {
        if(user.length){
            res.json(user[0])
        }
        else{
            res.status(400).json('Not Found')
        }
    })
    .catch(err => res.status(400).json(err))

    
})

app.put('/image',(req,res)=>{
      const {id} =req.body;
      database('users').where('id','=',id)
        .increment('entries',1)
        .returning('*')
      .then(user => res.json(user[0]))
      .catch(err => res.status(400).json('some error'))
})

app.listen(3000,()=>{
    console.log('app is running on port 3000');
})




