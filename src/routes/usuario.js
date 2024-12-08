/*const express = require("express");
const router = express.Router();
const multer = require('multer');
const usuarioController = require("../controllers/usuarioController"); // Certifique-se de que o caminho está correto

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
    destination: './public/assets', // Diretório onde as imagens serão salvas
    filename: (req, file, cb) => {
        const extensaoArquivo = file.originalname.split('.').pop(); // Pega a extensão do arquivo (ex: jpg, png)
        const nomeArquivo = `${Date.now()}.${extensaoArquivo}`; // Nome do arquivo = timestamp + extensão
        cb(null, nomeArquivo);
    }
});

const upload = multer({ storage });

// Rota para cadastrar um novo usuário sem imagem (apenas nome, email e senha)
router.post("/cadastrar", usuarioController.cadastrar);

// Rota para autenticar o usuário (login)
router.post("/autenticar", usuarioController.autenticar);

// Rota para cadastro de usuário com upload de imagem
router.post('/cadastrar-imagem', upload.single('foto'), usuarioController.cadastrarUsuarioComImagem);

// Exportação do roteador
module.exports = router;
*/

const express = require("express");
const router = express.Router();
const multer = require('multer');
const usuarioController = require("../controllers/usuarioController");

// Configuração de armazenamento de imagens usando multer
const storage = multer.diskStorage({
    destination: './public/assets', // Diretório onde as imagens serão salvas
    filename: (req, file, cb) => {
      const extensaoArquivo = file.originalname.split('.').pop(); // Obtém a extensão do arquivo
      const nomeArquivo = `${Date.now()}.${extensaoArquivo}`; // Nome do arquivo = timestamp + extensão
      cb(null, nomeArquivo);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limite de tamanho (5MB)
    fileFilter: (req, file, cb) => {
        const extensoesPermitidas = ['image/jpeg', 'image/png', 'image/jpg'];
        if (extensoesPermitidas.includes(file.mimetype)) {
            cb(null, true); // Aceita o arquivo
        } else {
            cb(new Error('Formato de arquivo não suportado! Use JPG ou PNG.'), false);
        }
    }
});

// 🔄 Rota para cadastro de usuário com upload de imagem
router.post('/cadastrar', upload.single('foto'), usuarioController.cadastrarUsuarioComImagem);

// 🔑 Rota para autenticar o usuário (login)
router.post("/autenticar", usuarioController.autenticar);

module.exports = router;
