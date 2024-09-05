// Data Object Access - arquivo responsável por fornecer uma camada de acesso aos dados para interagir com as coleções em um banco de dados

import mongodb from 'mongodb'

const ObjectId = mongodb.ObjectId // cria um  identificador único para documentos no MongoDB. Ele é usado aqui para buscar, atualizar ou deletar documentos por ID.

let reviews

export default class ReviewsDAO { // classe para realizar operações CRUD (create, read, upload, delete)
    static async injectDB(conn) { // metodo para injectar a conexão do banco de dados a classe DAO. Deve ser chamado antes de qualquer operação de escrita
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db('reviews').collection('reviews') // espera a resposta (conn) da instância de conexão e seleciona a BD (reviews) ou cria uma, e seleciona também a coleção específica
        } catch (e) {
            console.error(`Unable to establish collection handle in userDAO: ${e}`) // captura o erro durante a tentativa de conexão e imprime no console
        }
    }

    static async addReview (movieId, user, review) { // metódo adicionar para uma nova avaliação à coleção 'reviews'
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }

            return await reviews.insertOne(reviewDoc) // insere 'insertOne()' o objecto reviewDoc no reviews e retorna a resposta do servidor
        } catch (e) {
            console.error(`Unable to post review: ${e}`) // captura o erro e imprime no console
            return { error: e } // e retorna o objecto de erro
        }
    }

    static async getReview (reviewId) { // metódo para obter uma avaliação pelo ID
        try{
            return await reviews.findOne({_id: ObjectId(reviewId)}) // converte o reviewId em um ObjectId e procura na BD o documento cujo _id seja igual ao Object Id e o retorna
        } catch (e) {
            console.error(`Unable to get review :${e}`) // captura o erro e imprime no console
            return { error: e} // e retorna o objecto de erro
        }
    }

    static async updateReview (reviewId, user, review) { // metódo de atualização de uma avaliação pelo ID
        try {
            const updateResponse = await reviews.updateOne( // cria uma var que seleciona o documento na BD pelo _id define os novos valores para com o $set para os campos 'user' e 'review' no documento selecionado
                {_id: ObjectId(reviewId)},
                {$set: {user: user, review: review}}
            )
            return updateResponse // e retorna o a resposta do servidor
        } catch (e) {
            console.error(`Unable to update review :${e}`) // captura o erro e imprime no console
            return { error: e} // e retorna o objecto de erro
        }
    }

    static async deleteReview (reviewId) { // metódo para apagar uma avaliação pelo ID
        try {
            const deleteResponse = await reviews.deleteOne({ // cria uam var q seleciona o documento na BD pelo e apaga este documento da coleção
                _id: ObjectId(reviewId)
            })
            return deleteResponse // retorna a resposta do servidor
        } catch (e) {
            console.error(`Unable to delete review :${e}`) // captura o erro e imprime no console
            return { error: e} // e retorna o objecto de erro
        }
    }

    static async getReviewsById (movieId) { // metódo para obter as avaliações de um filme pelo ID
        try {
            const cursor = await reviews.find({movieId: parseInt(movieId)}) // procura na coleção o movieId pelo metódo find() e retorna os documentos que encontra 
            return cursor.toArray() // transforma em um array todos os documentos encontrados em um array
        } catch (e) {
            console.error(`Unable to get review :${e}`) // captura o erro e imprime no console
            return { error: e} // e retorna o objecto de erro
        }
    }
}