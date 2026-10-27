const express = require('express');
const router = express.Router();
const associacaoController = require('../controllers/associacaoController');

router.get('/', associacaoController.listar);
router.get('/produto/:produtoId', associacaoController.porProduto);
router.get('/fornecedor/:fornecedorId', associacaoController.porFornecedor);
router.post('/', associacaoController.criar);
router.delete('/:produtoId/:fornecedorId', associacaoController.deletar);

module.exports = router;
