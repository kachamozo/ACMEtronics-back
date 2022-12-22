const { Op } = require('sequelize');
const { User } = require('../connection/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = async (req, res, next) => {
	const { name } = req.query;
	try {
		const where = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
		const { count, rows } = await User.findAndCountAll({ where });

		if (!rows.length > 0)
			return res.status(404).json({ msg: 'Usuario no encontrado' });

		res.status(200).json({ count: count, users: rows });
	} catch (error) {
		next(error);
	}
};

const getById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!id) return res.status(400).json({ msg: 'Id no provisto' });
		const user = await User.findByPk(id);
		if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
		res.status(200).json({ msg: 'Usuario encontrado', user });
	} catch (error) {
		next(error);
	}
};

const create = async (req, res, next) => {
	const {
		userName,
		email,
		password,
		name,
		lastName,
		age,
		country,
		city,
		phone,
		address,
	} = req.body;
	try {
		if (!userName)
			return res.status(400).json({ msg: 'Username de usuario no provisto' });
		if (!email)
			return res.status(400).json({ msg: 'Email de usuario no provisto' });
		if (!password)
			return res.status(400).json({ msg: 'Password de usuario no provisto' });

		// const findUser = await User.findOne({ where: { userName } });
		// if (findUser) {
		// 	return res
		// 		.status(200)
		// 		.json({ msg: 'El usuario ya existe en la base de datos' });
		// }

		const findEmail = await User.findOne({ where: { email } });
		if (findEmail) {
			return res.status(200).json({ msg: 'Email ya registrado', findEmail });
		}

		// hash contraseña
		const salt = await bcrypt.genSalt(10);
		const passwordBcrypt = await bcrypt.hash(password, salt);

		const [user, created] = await User.findOrCreate({
			where: {
				userName: userName,
				email: email,
				password: passwordBcrypt,
			},
			defaults: {
				name,
				lastName,
				age,
				country,
				city,
				phone,
				address,
			},
		});

		if (!created)
			return res.status(200).json({ msg: 'Usuario encontrado ', user });
		res.status(201).json({ msg: 'Usuario creado', user });
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	const { id } = req.params;
	const {
		email,
		password,
		name,
		lastName,
		age,
		country,
		city,
		phone,
		address,
	} = req.body;

	try {
		if (!id) return res.status(400).json({ msg: 'Id no provisto' });
		const user = await User.findByPk(id);
		if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

		const updateUser = await user.update({
			email: email || user.email,
			password: password || user.password,
			name: name || user.name,
			lastName: lastName || user.lastName,
			age: age || user.age,
			country: country || user.country,
			city: city || user.city,
			phone: phone || user.phone,
			address: address || user.address,
		});

		if (!updateUser)
			return res.status(200).json({ msg: 'No se pudo actualizar el usuario' });
		res.status(201).json({ msg: 'Usuario actualizado', usuario: updateUser });
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		if (!email)
			return res.status(400).json({ msg: 'Email de usuario no provisto' });
		if (!password)
			return res.status(400).json({ msg: 'Password de usuario no provisto' });

		const user = await User.findOne({ where: { email } });
		if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res.status(400).json({ msg: 'contraseña no válida' });

		// create token
		const token = jwt.sign(
			{
				userName: user.userName,
				id: user.id,
				admin: user.admin,
			},
			process.env.TOKEN_SECRET,
			{ expiresIn: '1d' }
		);

		res.status(200).header('auth-token', token).json({
			data: { token },
		});
	} catch (error) {
		next(error);
	}
};

const deleteById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!id) return res.status(400).json({ msg: 'Id no provisto' });
		const user = await User.findByPk(id);
		if (!user) return res.status(404).json({ msg: 'Usuario no encotrado' });
		const deleteUser = await user.destroy();
		if (!deleteUser)
			return res.status(200).json({ msg: 'No se pudo eliminar el usuario' });
		res.status(201).json({ msg: 'Usuario eliminado', user });
	} catch (error) {
		next(error);
	}
};

const createBulk = async (req, res, next) => {
	const { users } = req.body;
	try {
		if (!users.length > 0)
			return res.status(400).json({ msg: 'Lista de usuarios no provistas' });

		const { count, rows } = await User.findAndCountAll();
		if (count > 0) return res.status(200).json({ count: count, users: rows });

		const newUsers = await User.bulkCreate(users);
		if (!newUsers.length > 0)
			return res
				.status(200)
				.json({ msg: 'No se pudo crear la lista de usuarios' });
		res.status(201).json({ msg: 'Lista de usuarios creadas', users: newUsers });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	login,
	deleteById,
	createBulk,
};
