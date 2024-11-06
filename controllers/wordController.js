const Word = require('../models/Word');

exports.addWordForm = async (req, res) => {
    try {
        const totalWords = await Word.countDocuments({ approved: true });
        res.render('add', { totalWords });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario');
    }
};

exports.addWord = async (req, res) => {
    try {
        const { language, word, translation, meaning } = req.body;
        const newWord = new Word({ language, word, translation, meaning });
        await newWord.save();
        res.redirect('/add');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar la palabra');
    }
};

exports.adminView = async (req, res) => {
    try {
        const pendingWords = await Word.find({ approved: false });
        const approvedWords = await Word.find({ approved: true });
        res.render('admin', { pendingWords, approvedWords });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la vista de administración');
    }
};

exports.approveWord = async (req, res) => {
    try {
        const { id } = req.params;
        await Word.findByIdAndUpdate(id, { approved: true });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al aprobar la palabra');
    }
};

exports.deleteWord = async (req, res) => {
    try {
        const { id } = req.params;
        await Word.findByIdAndDelete(id);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la palabra');
    }
};

exports.editWordForm = async (req, res) => {
    try {
        const { id } = req.params;
        const word = await Word.findById(id);
        res.render('editWord', { word });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario de edición');
    }
};

exports.updateWord = async (req, res) => {
    try {
        const { id } = req.params;
        const { language, word: wordText, translation, meaning } = req.body;
        await Word.findByIdAndUpdate(id, { language, word: wordText, translation, meaning });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la palabra');
    }
};


exports.userView = (req, res) => {
    res.send('Perfil de usuario');
};
