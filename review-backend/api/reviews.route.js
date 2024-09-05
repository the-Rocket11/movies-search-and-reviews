import express from 'express'
import ReviewsCrtl from './reviews.controller.js'

const router = express.Router() // cria um objecto Router (roteador) da biblioteca express que permite definir rotas para diferentes URLs

router.route('/movie/:id').get(ReviewsCrtl.apiGetReviews) // rota que tem o Placeholder do Id q executa o metódo get() do roetador
router.route('/new').post(ReviewsCrtl.apiPostReview) // rota que executa o metódo post
router.route('/:id') // rota q executa os metódos get(), put() e delete() do roteador
    .get(ReviewsCrtl.apiGetReview)
    .put(ReviewsCrtl.apiUpdateReview)
    .delete(ReviewsCrtl.apiDeleteReview)

export default router // exporta o objecto router