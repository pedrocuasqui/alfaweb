/**
 * Default model settings
 * (sails.config.models)
 *
 * Your default, project-wide model settings. Can also be overridden on a
 * per-model basis by setting a top-level properties in the model definition.
 *
 * For details about all available model settings, see:
 * https://sailsjs.com/config/models
 *
 * For more general background on Sails model settings, and how to configure
 * them on a project-wide or per-model basis, see:
 * https://sailsjs.com/docs/concepts/models-and-orm/model-settings
 */

module.exports.models = {
	/***************************************************************************
	 *                                                                          *
	 * Whether the `.create()` and `.update()` model methods should ignore      *
	 * (and refuse to persist) unrecognized data-- i.e. properties other than   *
	 * those explicitly defined by attributes in the model definition.          *
	 *                                                                          *
	 * To ease future maintenance of your code base, it is usually a good idea  *
	 * to set this to `true`.                                                   *
	 *                                                                          *
	 * > Note that `schema: false` is not supported by every database.          *
	 * > For example, if you are using a SQL database, then relevant models     *
	 * > are always effectively `schema: true`.  And if no `schema` setting is  *
	 * > provided whatsoever, the behavior is left up to the database adapter.  *
	 * >                                                                        *
	 * > For more info, see:                                                    *
	 * > https://sailsjs.com/docs/concepts/orm/model-settings#?schema           *
	 *                                                                          *
	 ***************************************************************************/

	schema: false, // en FALSE cualquier otro atributo que yo defina en mi modelo podrá ser insertado en la coleccion de la base de datos seleccionada y elimina de la base de datos cualquieer campo que no se pase desde mi modelo
	// en TRUE se mantienen los campos que se hayan definido previamente en la base de datos, aun cuando los  registros creados desde sails no contengan dichos campos

	/***************************************************************************
	 *                                                                          *
	 * How and whether Sails will attempt to automatically rebuild the          *
	 * tables/collections/etc. in your schema.                                  *
	 *                                                                          *
	 * > Note that, when running in a production environment, this will be      *
	 * > automatically set to `migrate: 'safe'`, no matter what you configure   *
	 * > here.  This is a failsafe to prevent Sails from accidentally running   *
	 * > auto-migrations on your production database.                           *
	 * >                                                                        *
	 * > For more info, see:                                                    *
	 * > https://sailsjs.com/docs/concepts/orm/model-settings#?migrate          *
	 *                                                                          *
	 ***************************************************************************/
	//para problemas al llamar datos de mongo revisar : https://sailsjs.com/documentation/concepts/models-and-orm/model-settings#?migrate
	migrate: "drop", //usar alter para programar
	/*
safe	never auto-migrate my database(s). I will do it myself, by hand.
alter	auto-migrate columns/fields, but attempt to keep my existing data (experimental)
drop	wipe/drop ALL my data and rebuild models every time I lift Sails */

	/***************************************************************************
	 *                                                                          *
	 * Base attributes that are included in all of your models by default.      *
	 * By convention, this is your primary key attribute (`id`), as well as two *
	 * other timestamp attributes for tracking when records were last created   *
	 * or updated.                                                              *
	 *                                                                          *
	 * > For more info, see:                                                    *
	 * > https://sailsjs.com/docs/concepts/orm/model-settings#?attributes       *
	 *                                                                          *
	 ***************************************************************************/

	attributes: {
		// atributos comunes para todos los modelos definidos en esta aplicacion
		createdAt: { type: "number", autoCreatedAt: true },
		updatedAt: { type: "number", autoUpdatedAt: true },
		id: { type: "string", columnName: "_id" }
		//id: { type: 'number', autoIncrement: true, columnName: 'id'}, // esta fila solo se usa cuando => dontUseObjectId: true
		//--------------------------------------------------------------------------
		//  /\   Using MongoDB?
		//  ||   Replace `id` above with this instead:
		//
		// ```
		// id: { type: 'string', columnName: '_id' },
		// ```
		//
		// Plus, don't forget to configure MongoDB as your default datastore:
		// https://sailsjs.com/docs/tutorials/using-mongo-db
		//--------------------------------------------------------------------------
	},

	/******************************************************************************
	 *                                                                             *
	 * The set of DEKs (data encryption keys) for at-rest encryption.              *
	 * i.e. when encrypting/decrypting data for attributes with `encrypt: true`.   *
	 *                                                                             *
	 * > The `default` DEK is used for all new encryptions, but multiple DEKs      *
	 * > can be configured to allow for key rotation.  In production, be sure to   *
	 * > manage these keys like you would any other sensitive credential.          *
	 *                                                                             *
	 * > For more info, see:                                                       *
	 * > https://sailsjs.com/docs/concepts/orm/model-settings#?dataEncryptionKeys  *
	 *                                                                             *
	 ******************************************************************************/

	dataEncryptionKeys: {
		default: "wO8z/K8i417xPxm/Ew7wPD+4f2GzeZ/RbwPDeWm6GFg="
	},

	/***************************************************************************
	 *                                                                          *
	 * Whether or not implicit records for associations should be cleaned up    *
	 * automatically using the built-in polyfill.  This is especially useful    *
	 * during development with sails-disk.                                      *
	 *                                                                          *
	 * Depending on which databases you're using, you may want to disable this  *
	 * polyfill in your production environment.                                 *
	 *                                                                          *
	 * (For production configuration, see `config/env/production.js`.)          *
	 *                                                                          *
	 ***************************************************************************/

	cascadeOnDestroy: true

	/**dontUseObjectIds
	 * This feature is for use with the sails-mongo adapter only. */
	//dontUseObjectIds: true, // si se establece a tre tomar las siguientes consideraciones: 1) cada vez que se crea un nuevo documento(registro) se debe pasar un valor para el atributo ''id'' en la base de datos. 2) se debe configurar la propiedad id en attributes de config/models.js o en los atributos de cada modelo. 3) Lo mejor es dejar que sails use el "_id" de mongoDB como el atributo "id" de los modelos por defecto
};
