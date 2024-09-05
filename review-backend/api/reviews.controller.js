import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController { // cria e exportaa classe principal para manipular as avaliações
    static async apiPostReview (req, res, next) { // metódo para adicionar uma avaliação
        try {                                                      
            const movieId = parseInt(req.body.movieId) // extrai  
            const review = req.body.review             // os dados
            const user = req.body.user                 // da requisição

            const reviewResponse = await ReviewsDAO.addReview( // e adiciona ao BD pelo metódo ReviewsDAO.addReview()
                movieId,
                user,
                review
            )
            res.json({ status: 'success' }) // e retorna a resposta com um objecto JSON com o estado 'sucess'
        } catch (e) { 
            res.status(500).json({ error: e.message}) // captura o erro e retorna o stataus 500 em formato JSON com a messagem de erro
        }
    }
    static async apiGetReview (req, res, next) { // metódo para obter uma avaliação
        try {
            let id = req.params.id || {} // extrai o id da avaliação na requisição
            let review = await ReviewsDAO.getReview(id) // executa o metódo ReviewsDAO.getReview() com o id e espera a resposta do BD
            if (!review) {
                res.status(404).json({ error: 'Not found' }) // retorna um status de erro 404 se a avaliãoçao do id enviado não for encontrada
                return
            }
            res.json(review) //  retorna a avaliação encontrada em formato JSON
        } catch (e) {
            console.log(`api, ${e}`) // imprime no console o erro ocorrido
            res.status(500).json({ error: e }) // captura o erro e retorna o stataus 500 em formato JSON com a messagem de erro
        }
    }
    static async apiUpdateReview (req, res, next) { // metódo para atualizar os dados de uma avaliação
        try {
            const reviewId = req.params.id  // extrai
            const review = req.body.review  // os dados
            const user = req.body.user      // da requisição

            const reviewResponse = await ReviewsDAO.updateReview( // envia os novos dados ao BD pelo metódo ReviewsDAO.updateReview
                reviewId,
                user,
                review
            )

            var { error } = reviewResponse // cria uma var que verifica se houve um erro na resposta do BD 
            if (error) {
                res.status(400).json({ error }) // se houver um erro, retorna um erro de status 400 em formato JSON
            }

            if (reviewResponse.modifiedCount === 0) { // verifica se houve alguma alteração no documento selecionado
                throw new Error (
                    'unable to update review', // se não houve modificação, exibe uma mensagem de erro 
                )
            }

            res.json({ status: 'sucess' }) // se alteração for bem sucedida, retorna uma mensagen em formato JSON de status sucess
        } catch (e) {
            res.status(500).json({ error: e.message }) // se ocorrer algum erro, captura e o exibe uma mensagem de status 500 em formato JSON com o erro ocorrido
        }
    }
    static async apiDeleteReview (req, res, next) { // metódo para apagar uma avaliação 
        try {
            const reviewId = req.params.id      // seleciona a id da avaliação a ser apagada pela requisição 
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId) /// executa o metódo ReviewDAO.deleteReview() com o id selecionada como parametro e espera a resposta do BD

            res.json({ status: 'sucess' }) // exibe o status sucess da operação em formato JSON
        } catch (e) {
            res.status(500).json({ error: e.message }) // se a operação não for bem sucedida, ele captura o erro e exibe o status 500 e a mensagem de erro em formato JSON
        }
    }
    static async apiGetReviews (req, res, next) { // metódo para obter as avaliações de um filme pelo id 
        try {
                let id = req.params.id || {}    // extrai da requisição o id 
                let reviews = await ReviewsDAO.getReviewsById(id)   // executa o metódo ReviewsDAO.getReviewsById() com o id do filme e espera a resposta da BD
                if (!reviews) {                                     // se não houver resposta da BD
                    res.status(404).json({ error: 'Not Found' })    //  retorna o status 404 da mensagem de erro em formato JSON
                    return
                }
                res.json(reviews)   // retorna em formato JSON as avaliações encontradas na BD
        } catch (e) {
            console.log(`api, ${e}`) // imprime no console o erro capturado
            res.status(500).json({ error: e }) // retorna o status 500 do erro capturado em formato JSON
        }
    }
}