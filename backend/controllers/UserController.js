const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');

const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');


module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body;

        // Validação dos campos
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório' });
        }
        if (!email) {
            return res.status(422).json({ message: 'O email é obrigatório' });
        }
        if (!phone) {
            return res.status(422).json({ message: 'O telefone é obrigatório' });
        }
        if (!password) {
            return res.status(422).json({ message: 'A senha é obrigatória' });
        }
        if (!confirmpassword) {
            return res.status(422).json({ message: 'A confirmação da senha é obrigatória' });
        }
        if (password !== confirmpassword) {
            return res.status(422).json({ message: 'A senha e a confirmação precisam ser iguais!' });
        }

        try {
            // Verifica se o usuário já existe
            const userExists = await User.findOne({ email: email });
            if (userExists) {
                return res.status(422).json({ message: 'Por favor, utilize outro e-mail!' });
            }

            // Cria o hash da senha
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            // Cria o novo usuário
            const user = new User({
                name,
                email,
                phone,
                password: passwordHash
            });

            // Salva o usuário no banco de dados
            await user.save();

            await createUserToken(user, req, res)

        } catch (error) {
            res.status(500).json({ message: 'Erro ao registrar usuário, tente novamente mais tarde.' });
        }
    }


    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            return res.status(422).json({ message: 'O email é obrigatório' });
        }

        if (!password) {
            return res.status(422).json({ message: 'A senha é obrigatório' });
        }

        // Verifica se o usuário já existe
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(422).json({ message: 'Não há usuário cadastrado com este e-mail!' });
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(422).json({ message: 'Senha inválida!' });
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)

            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findById(id).select("-password")

        if (!user) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }

        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        const id = req.params.id
        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name, email, phone, password, confirmpassword} = req.body


        if(req.file){
            user.image = req.file.filename
        }



         // Validação dos campos
         if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório' });
        }
        if (!email) {
            return res.status(422).json({ message: 'O email é obrigatório' });
        }

        const userExists = await User.findOne({email: email})

        if (user.email !== email && userExists) {
            res.status(422).json({
                message: 'Por favor, utilize outro e-mail!'
            })
            return
        }
        user.email = email

        if (!phone) {
            return res.status(422).json({ message: 'O telefone é obrigatório' });
        }

        user.phone = phone

        if (password !== confirmpassword) {
            return res.status(422).json({ message: 'A senha e a confirmação precisam ser iguais!' });
        } else if(password === confirmpassword && password != null){
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            user.password = passwordHash

        }

        try {
            const updateduser = await User.findOneAndUpdate(
                {_id: user._id},
                {$set: user},
                {new: true},
            )
            res.status(200).json({
                message: 'Usuário atualizado com sucesso!'
            })
        } catch (err) {
            res.status(500).json({message: err})
            return
        }



        if (!user) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }
    }
};
