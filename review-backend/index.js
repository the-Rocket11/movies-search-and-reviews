import app from './server.js'
import mongodb from 'mongodb' // importa a biblioteca MongoDB para interação com o banco de dados
import ReviewsDAO from './dao/reviewsDAO.js'


// cria a classe MongoClient que permite a conexão ao MongoDB e serve para gerenciar essa conexão
const MongoCliente = mongodb.MongoClient

// credenciais de acesso ao banco de dados
// username - variavel de ambiente para o username
const mongo_username = process.env['therocket'] 
// password - variavel de ambiente para a password
const mongo_password = process.env['thesky1103'] 
// uri (uniform resource identifier) - string usada para se conectar ao banco de dados MongoDB, ela contém informações como o protocolo, credencias de autenticação, endereço do servidor e opções de configuração
const uri = `mongodb+srv://therocket:thesky1103@cluster0.q0zhydj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// port (porta)
const port = 8000

// conexão entre a app e o servidor
MongoCliente.connect( // estabelece a conexão com a base de dados com 'uri' e as 'options' {} fornecidas
    uri,
    {
        maxPoolSize: 50, // tamanho máximo de conexões simultâneas no banco de dados
        wtimeoutMS: 2500, // tempo limte para operações de escrita
        useNewUrlParser: true
    }
) // tratamente de erros de conexão, imprimindo no console caso haja algum erro durante a conexão
.catch(err => {
    console.error(err.stack)
    process.exit(1)
}) // depois da conexão estar bem sucedida, ele executa este bloco de instruções onde inicializa o servidor Express na porta 8000 e configura a conexão com a base de dados no DAO
.then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => { // com a conexão bem sucedida, o servidor irá manter-se aberto e aguardar por requisições na porta 8000
        console.log(`listening on port ${port}`)
    })
})