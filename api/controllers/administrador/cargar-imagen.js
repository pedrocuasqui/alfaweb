/* eslint-disable no-unused-vars */
/*jshint esversion: 8 */
module.exports = {
	friendlyName: "Cargar imagen",

	description: "",

	inputs: {
		rutaImagenActual: {
			type: "string",
			required: false
		}
	},

	exits: {
		success: {
			description: "exito al cargar imagen"
		}
	},

	fn: async function(inputs, exits) {
		//inputs y exits deben edstar declaradas aunque no se les ocupe,

		//copyfile.js
		const fs = require("fs");

		var nuevoArchivo = {};

		// Si una imágen ya está cargada, se debe pasar por parametro la ruta de la imágen que será eliminado y por medio de axios se envia la nueva imágen a cargar
		/* 	if (inputs.rutaImagenActual) {
			const path1 =
				"./assets/images/uploaded/" +
				inputs.rutaImagenActual.substring(
					inputs.rutaImagenActual.length - (8 + 4 + 4 + 4 + 12 + 3 + 5), // el cinco al final representa los guiones y punto en el string
					inputs.rutaImagenActual.length
				);

			const path2 =
				"./.tmp/public/images/uploaded/" +
				inputs.rutaImagenActual.substring(
					inputs.rutaImagenActual.length - (8 + 4 + 4 + 4 + 12 + 3 + 5), // el cinco al final representa los guiones y punto en el string
					inputs.rutaImagenActual.length
				);

			fs.unlink(path1, err => {
				if (err) {
					console.error(err);
					return;
				}
				//file removed
			});
			fs.unlink(path2, err => {
				if (err) {
					console.error(err);
					return;
				}
				//file removed
			});
		} */

		this.req.file("multimedia").upload(
			{
				//por defecto sails usa SKIPPER para recibir archivos y texto, se puede cambiar si es necesario ir a congif/http.js
				// dirname: '../../assets/images/uploaded',
				// dirname: "../../.tmp/public/images/uploaded",
				dirname: require("path").resolve(sails.config.appPath, "assets/images"),

				// don't allow the total upload size to exceed ~20MB
				maxBytes: 1024 * 1024 * 200 //20MB,
				// onProgress: status=>{

				//   console.log('ESTADO:'+status.written + '/' +status.stream.byteCount);

				//   return status;
				// }
			},
			(err, uploadedFiles) => {
				sails.log("exito al recibir");
				//  `fd` (file descriptor)

				nuevoArchivo = uploadedFiles[0];
				// nuevoArchivo.location = uploadedFiles[0].fd;
				let imageBaseUrl = sails.config.custom.imageBaseUrl;
				let rutaOriginal = uploadedFiles[0].fd.toString();
				sails.log(`ruta original: ${rutaOriginal}`);
				nuevoArchivo.location =
					imageBaseUrl +
					rutaOriginal.substring(
						rutaOriginal.length - (8 + 4 + 4 + 4 + 12 + 3 + 5), // el cinco al final representa los guiones y punto en el string
						rutaOriginal.length
					);
				sails.log(nuevoArchivo);

				// destination will be created or overwritten by default.
				fs.copyFile(
					nuevoArchivo.fd,
					nuevoArchivo.fd.replace(".tmp\\public", "assets"),
					err => {
						if (err) {
							throw err;
						}
					}
				);

				if (err) {
					this.res.statusCode = 500;
					return this.res.statusCode; //respuesta para axios ERROR DEL SERVIDOR
				}

				// If no files were uploaded, respond with an error.
				if (uploadedFiles.length == 0) {
					this.res.status = 400;
					return this.res.status; //Respuesta para axios ERROR EN EL CLIENTE
				}
				return this.res.ok(nuevoArchivo);
			}
		);
	}
};
