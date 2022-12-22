const jwt = require('jsonwebtoken');

// middleware para validar token (rutas protegidas)
const verifyToken = (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).json({ msg: 'Acceso denegado' });
	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next(); // continuamos
	} catch (error) {
		res.status(400).json({ error: 'token no es válido' });
	}
};

module.exports = verifyToken;
