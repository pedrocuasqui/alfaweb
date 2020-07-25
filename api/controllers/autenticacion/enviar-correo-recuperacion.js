/*jshint esversion:8 */
module.exports = {
	friendlyName: "Enviar correo recuperacion",

	description: "",

	inputs: {
		correoRecuperacion: {
			type: "string",
			required: true,
		},
	},

	exits: {
		success: {
			statusCode: 200,
			message: "logueado correctamente",
		},
	},

	fn: async function (inputs, exits) {
		var res = this.res;
		var usuarioRecuperacion = null;
		var passwordTemporalPlano = null;
		var usuarioEs = null;
		/*SE DEFINE LA FUNCION QUE envia correo de confirmacion de cuenta con nodemailer */
		const nodemailer = require("nodemailer");
		// async..await is not allowed in global scope, must use a wrapper
		async function enviarCorreo(generatePassword) {
			// se crea el transporter con la cuenta de gmail
			let transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					// previo a general el password para especific- app es necesario configurar la autenticacion en dos pasos de gmail
					user: "pedro.cuasqui@gmail.com", // usuario
					pass: "mtggfotrvzxcfmfd", // password para una app especifica, esta configuracion se realiza en la cuenta de google
				},
			});

			// send mail with defined transport object
			await transporter.sendMail({
				from: "pedro.cuasqui@gmail.com", // sender address
				to: inputs.correoRecuperacion.toLowerCase(), // list of receivers
				subject: '"alfaweb" - Restauración de contraseña" 🔐', // Subject line
				html: `<div style="background-color:#27293d; color:#c0c1c2; font-size:2em;"><h1>Hola, ${usuarioRecuperacion.nombre},</h1><h3>Hemos recibido una solicitud para reestablecer tu cuenta <b>alfaweb</b>, si no fuiste tú ignora este mensaje, de lo contrario ingresa con la siguiente contraseña temporal: ${generatePassword}</h3> `, // html body
			});

			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		}
		/**
		 * la funcion genera un password aleatorio que será enviado por correo y que actualizará el password del usuario
		 */
		function generatePassword() {
			var length = 6;
			var charset = "0123456789";
			var retVal = "";
			for (var i = 0, n = charset.length; i < length; ++i) {
				retVal += charset.charAt(Math.floor(Math.random() * n));
			}
			return retVal;
		}
		passwordTemporalPlano = generatePassword();
		// passwordTemporalEncriptada = await sails.helpers.hashPassword(
		// 	passwordTemporalPlano
		// );
		try {
			usuarioRecuperacion = await Estudiante.findOne({
				email: inputs.correoRecuperacion,
			});
			usuarioEs = "Estudiante";
			if (!usuarioRecuperacion) {
				usuarioRecuperacion = await Profesor.findOne({
					email: inputs.correoRecuperacion,
				});
				usuarioEs = "Profesor";
			}

			if (!usuarioRecuperacion) {
				return res.status(409).send();
			} else {
				if (usuarioEs == "Estudiante") {
					await Estudiante.update({ id: usuarioRecuperacion.id }).set({
						codigoRecuperacion: passwordTemporalPlano,
					});
				} else if (usuarioEs == "Profesor") {
					await Profesor.update({ id: usuarioRecuperacion.id }).set({
						codigoRecuperacion: passwordTemporalPlano,
					});
				} else {
					return res.status(500).send();
				}
				enviarCorreo(passwordTemporalPlano).catch(console.error);
			}
		} catch (err) {
			return res.status(500).send({ err });
		}

		// pendiente buscar el correo en la base de datos
		// despues enviar el correo
		return exits.success();
	},
};
