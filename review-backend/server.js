import express from 'express'
import cors from 'cors' // usada para gerenciar as políticas de Cross-Origin Resource Sharing (CORS), permitindo que seu servidor aceite solicitações de diferentes origens.
import reviews from './api/reviews.route.js'

const app = express() // cria uma instância da aplicação Express que serve para configurar e gerenciar a aplicação web

app.use(cors()) // adiciona o CORS à aplicação, sem isso o navegador pode bloquear as solicitações de diferentes origens devido às politícas de segurança

app.use(express.json()) // adiciona o middleware que analisa o corpo das requisições como JSON
app.use('/api/v1/reviews', reviews) // define a rota principal e permite as todas rotas definidas no roteador reviews apartir da rota principal
app.use('*', (req, res) => res.status(404).json({error: 'not found'})) // define uma middleware 'catch all' para as rotas que não correspondam às rotas definidas e responde com um status '404'

export default app // exporta o app