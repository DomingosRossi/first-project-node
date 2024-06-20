const express = require('express') /*variavel criada para usar o framework express*/
const uuid = require('uuid')

const port = 3000
const app = express() /*variavel para abreviar express para app*/
app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "Not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users/', (request, response) => {
    return response.json(users)
})

app.post('/users/', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userindex
    const id = request.userId

    const updateUser = { id, name, age}



    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userindex

    users.splice(index, 1)

    return response.status(204).json()
})



/* const name = request.query.name
 const age = request.query.age 

 return response.json({name: name, age: age}) 
 Exemplo de Query params
 */


/*rota de acesso*/

app.listen(3000, () => {
    console.log('🟢 Server on')
}) /*porta criada*/

/* - Query params => meusite.com/users?name=rodolfo&age=28 // Filtros
   - Route params => /users/2    // Buscar, Deletar ou Atualizar algo Especifíco
*/

