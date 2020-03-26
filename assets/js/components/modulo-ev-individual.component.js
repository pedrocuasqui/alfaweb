/* eslint-disable no-undef */
/*jshint esversion:6*/
parasails.registerComponent("modulo-ev-individual", {
	props: {
		submodulo: {
			type: Object
		},
		curso: {
			type: Object
		},
		usuario: {
			type: Object
		}
	},
	data() {
		return {
			tipoEvaluacion: null,
			arregloRandom: [],
			//variables para usar en Emparejamiento del lado del Estudiante
			enunciadoSeleccionado: null,
			// respuestasSeleccionadas: [],
			preguntaSeleccionadaJuegoEmparejamiento: null,
			coloresPreguntasEmparejamiento: [
				"#F31885",
				"#A39318",
				"#18F35E",
				"#18A7F3",
				"#8c726c",
				"#9318F3",
				"#F318D8",
				"#823815",
				"#268215",
				"#158280",
				"#D52FE3",
				"#F31850",
				"#D218F3",
				"#1833F3",
				"#18E9F3",
				"#33F318",
				"#F3DF18",
				"#C71585",
				"#FF4500",
				"#6A5ACD"
			],

			totalTime: null,
			descripcionActividad: "",

			tiempoRespuestaInicio: null, // almacena el valor de totalTime  al momento de dar clic en un enunciado
			tiempoRespuestaFin: null,
			erroresRespuesta: 0,
			aciertos: [],
			preguntasCuestionarioRespuestas: [],

			puntos: null, //el numero total de puntos que suma en el curso
			puntosInterpolados: 0, // puntos interpolados con tweenedTo
			nivel: null,
			medalla: null,

			apruebaEvaluacion: 0,
			presionaIntentarNuevamente: false,

			bucleCuentaRegresiva: null,
			submodulosAprobadosPorCurso: [],

			porcentajeAvanceSubmodulos: 0,
			puntosObtenidos: 0, //puntos obtenidos en la evaluacion que se acaba de realizar
			puntosOtenidosInterpolados: 0, //puntosObtenidos interpolados con tweenedto
			progreso: {},
			submoduloAprobado: false,
			finEvaluacion: false,
			indicePreguntaCuestionario: 0,
			siguientePreguntaCuestionario: true,

			respuestaAnterior: [],
			respuestaCuestionarioPreguntaPrueba: "",
			colorPregunta: null
		};
	},
	beforeMount() {
		this.tipoEvaluacion = this.submodulo.evaluacion.tipo;
		this.tiempoMaximoPorPregunta = this.submodulo.evaluacion.tiempoMaximoPorPregunta;
		this.preguntasCuestionario = [...this.submodulo.evaluacion.preguntas];
		this.preguntasCuestionario.forEach(pregunta => {
			//agrego todas las respuestas de la evaluacion al arrreglo para despues reemplazar cada pregunta por su pregunta c , este se guardará en la collection IntentoEvaluacion con respuestas
			let respuestaIntento = pregunta;
			respuestaIntento.errores = null;
			respuestaIntento.tiempoDeRespuesta = null;
			respuestaIntento.respuestaEstudiante = null;
			this.preguntasCuestionarioRespuestas.push(respuestaIntento);
		});
		//El objeto ultimo intento guarda la información de puntos, nivel y medalla para mostrar al usuario
		this.puntos = this.usuario.ultimoIntento.puntos;
		this.nivel = this.usuario.ultimoIntento.nivel;
		this.medalla = this.usuario.ultimoIntento.medalla;

		this.numeroSubmodulosCurso = this.usuario.numeroSubmodulosCurso; //numero total de submodulos por curso
		this.submodulosAprobadosPorCurso = [
			...this.usuario.submodulosAprobadosPorCurso
		];

		//se ordena aleatoriamente las respuestas de emparejamiento
		if (this.tipoEvaluacion == "Emparejamiento") {
			this.randomPreguntasEmparejamiento();
		}
	},

	mounted() {
		this.totalTime = this.tiempoMaximoPorPregunta;
		// mostrar el modal con las instrucciones para la evaluacion
		if (this.tipoEvaluacion == "Cuestionario") {
			this.descripcionActividad =
				// "<p class='mintrucciones'>Lee atentamente el enunciado y selecciona la respuesta correcta.</p><p class='mintrucciones'>Tienes <strong>" +
				// this.tiempoMaximoPorPregunta +
				// " segundos </strong> para responder todas las preguntas. <br> ¡Mientras más rápido respondas, más puntos ganas!</p>";
				`<p class='mintrucciones'>Lee atentamente el enunciado y selecciona la respuesta correcta.  <br> Tienes <strong>
				${this.tiempoMaximoPorPregunta} segundos </strong> para responder todas las preguntas. <br> ¡Mientras más rápido respondas, más puntos ganas!</p>`;
		} else if (this.tipoEvaluacion == "Emparejamiento") {
			this.descripcionActividad =
				"<p class='mintrucciones'>Primero selecciona una opción de la columna izquierda.</p><p class='mintrucciones'>Luego selecciona la respuesta correcta de la columna derecha</p>" +
				"<p class='mintrucciones'>Tienes <strong>" +
				this.tiempoMaximoPorPregunta +
				" segundos  </strong> para responder todas las preguntas. <br> ¡Mientras más rápido respondas, más puntos ganas!</p>";
		}
		this.mostrarModalInicial();

		if (this.tipoEvaluacion == "Cuestionario") {
			this.tiempoRespuestaInicio = this.totalTime;
		}

		// verificamos si la evaluacion ya ha sido aprobada con anterioridad, se almacena el valor 1 en la variable submoduloAprobado en caso de ser positivo

		this.submodulosAprobadosPorCurso.forEach(idSubmodulo => {
			if (this.submodulo.id == idSubmodulo) {
				this.submoduloAprobado = true;
			}
		});
		// empieza la evaluaci'on despues de que se cierra el modal de inicio

		// eslint-disable-next-line no-unused-vars
		$("#modalInstrucciones").on("hidden.bs.modal", e => {
			this.empezarEvaluacion();
		});
	},

	template: /*template */ `  
    <div class="">
  

<!-- Modal INICIO EVALUACION -->
<div class="modal fade" id="modalInstrucciones" tabindex="-1" role="dialog" aria-labelledby="modalInstruccionesLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalInstruccionesLabel">Instrucciones</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
        <div id="descripcion" v-html="descripcionActividad">
				</div>
				
				<img src="/images/otros/iconos_evaluacion/tenor.gif" alt="Imagen de exito" height="50px" width="auto">

				<div class="talkbubble" v-if="usuario.nombre=='Visitante'"> 
					<p class='mintrucciones'><em><b>NOTA: No estás logueado, si quieres guardar tu evaluación, debes registrarte o ingresar como estudiante</b></em>
					</p>
				</div>
				<div class="talkbubble" v-if="submoduloAprobado"> 
					<p class='mintrucciones'><em><b>NOTA: Ya aprobaste esta evaluación, los puntajes obtenidos por realizar esta evaluación no se guardarán</b></em>
					</p>
				</div>
				<div class="talkbubble" v-if="usuario.nombre!='Visitante' && !submoduloAprobado"> 
					<p class='mintrucciones'><em><b>Hemos detectado que aún no apruebas esta evaluación, puedes intentar la evaluación las veces que quieras incluso si ya la aprobaste, pero recuerda que una vez aprobada ya no guardamos el intento en nuesta base de datos
					</b></em>
					</p>
				</div>
				<div class="row">
				<div class="col-sm-3">
				<img src="/images/svg/buho_original_1.svg" alt="avatar buho" height="50px" width="auto">
				</div>
				<div class="col-sm-6">
				
				</div>
				<div class="col-sm-3"></div>

				</div>
        
      </div>
      <div class="modal-footer">
        <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Omitir evaluación</button>-->
        <button type="button" class="btn btn-primary boton_formulario" data-dismiss="modal" >Aceptar</button>
        <!--// empieza la evaluaci'on despues de que se cierra el modal de inicio, revisar en la seccion MOUNTED-->
      </div>
    </div>
  </div>
</div>



<!-- Modal FIN EVALUACION-->
<div class="modal fade" id="actividadFinalizada" tabindex="-1" role="dialog" aria-labelledby="actividadFinalizadaLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="actividadFinalizadaLabel">Fin de la evaluación</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
			
				<p v-if="this.apruebaEvaluacion" class=" mintrucciones">Evaluación aprobada  <i class="fas fa-smile"></i></p>
				<p v-else class=" mintrucciones">Evaluación reprobada <i class="fas fa-sad-tear"></i></p>
        <p class="evFinPtos mintrucciones">Aciertos: {{aciertos.length}} / {{preguntasCuestionarioRespuestas.length}} <i v-for="stars in aciertos.length" class="fas fa-star color"></i><i v-for="star in preguntasCuestionarioRespuestas.length-aciertos.length" class="fas fa-star"></i></p>
        <p class="evFinPtos mintrucciones">Puntos de la evaluación: {{puntosOtenidosAnimados}} <img class="puntos_final" src="/images/otros/iconos_evaluacion/lingote-de-oro.svg" > </p>  <!--Puntos Obtenidos:{{puntosObtenidos}}-->
        <p class="evFinPtos mintrucciones">Tus puntos acumulados son : {{puntosAnimados}} <img class="puntos_final" src="/images/otros/iconos_evaluacion/gold-ingot.svg"></p> <!--puntos-->
        <template  v-if="usuario.nombre!='Visitante'"> 
            <p class="mintrucciones" v-if="subeDeNivelComp"> Has pasado al siguiente nivel</p>
            <p class="mintrucciones" v-else>Nivel actual: {{nivel}} / {{numeroSubmodulosCurso}}</p>
            <p class="mintrucciones" v-if="porcentajeAvanceSubmodulos==100"> FELICIDADES, YA HAS COMPLETADO TODOS LOS MODULOS, ERES UN GRADUADO!!</p>
            <!--<p v-else>Eres un: {{medalla}}</p>-->
						<div>
							<p class="mintrucciones">Tu progreso del curso es : {{porcentajeAvanceSubmodulos}} %</p> 
							<div class="progress">
								<div class="progress-bar" role="progressbar" :style="'width:'+porcentajeAvanceSubmodulos+'%'" :aria-valuenow="porcentajeAvanceSubmodulos" aria-valuemin="0" aria-valuemax="100"></div>
						</div> 
					</div>
        </template>
 
        
				<div class="talkbubble" v-if="usuario.nombre=='Visitante'"> <p class='mintrucciones'><em><b>NOTA: No estás logueado, si quieres guardar tu evaluación, debes registrarte o ingresar como estudiante</b></em></p></div>
				<div class="row">
					<div class="col-sm-3">
					<img src="/images/svg/buho_original_1.svg" alt="avatar buho" height="50px" width="auto">
					</div>
					<div class="col-sm-6"></div>
					<div class="col-sm-3"></div>
				</div>


        <p></p>
      </div>
      <div class="modal-footer">
        <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Omitir evaluación</button>-->
        <button type="button" class="btn btn-primary" data-dismiss="modal" >Aceptar</button>
      </div>
    </div>
  </div>
</div>




 
<template  v-if="!finEvaluacion">
<div class="contenido-evaluacion">
    
    <!-- Tiempo restante -->
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="totalTimeProgress" aria-valuemin="0.0" aria-valuemax="100" :style="{width: totalTimeProgress+'%'}">{{totalTime}}</div>
    </div>
    
<div class="container">
    <!--CUESTIONARIO-->
    <template v-if="tipoEvaluacion=='Cuestionario'">
        <div class="row ">
						<div class="col-sm-2 centrado_vertical">
							<button v-if="noEsPrimeraPregunta" @click="clickAnteriorPregunta"  class="boton_formulario" > Atrás</button>
						</div>
						<div class="col-sm-8">
							<div class="list-group">
							<!--Enunciado-->
								<div class="d-flex w-100 justify-content-center">
												<p class="pr-2">Pregunta {{indicePreguntaCuestionario+1}} de {{preguntasCuestionarioRespuestas.length +1}}: </p><h5 class="mb-1" v-html="preguntasCuestionarioRespuestas[indicePreguntaCuestionario].enunciado"></h5>   
								</div>
								<!--opciones de respuesta-->
								<div class="form-check texto_alineado_izquierda"  v-for="(opcion,index) in opcionesRespuesta(preguntasCuestionarioRespuestas[indicePreguntaCuestionario])">
									<div class="radio-item mt-0"  >
									<input type="radio" :id="opcion.id" :value="opcion.texto" 
									v-model="preguntasCuestionarioRespuestas[indicePreguntaCuestionario].respuestaEstudiante"
									@click.stop="respuestaCuestionarioSeleccionada">
									<label :for="opcion.id">{{opcion.texto}}</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-2 centrado_vertical">
							<button v-if="esUltimaPregunta" @click="finalizarCuestionario" class="boton_formulario"> Finalizar</button>
							<button v-else @click="clickSiguientePregunta" class="boton_formulario"> Siguiente</button>
						</div>   
        </div>
    </template>






    <!-- EMPAREJAMIENTO -->
    <template v-if="tipoEvaluacion=='Emparejamiento'">
				<div class="container">
						<div  class="row justify-content-center mb-2">
						<div class="col-sm-5"><p>SELECCIONE UN ENUNCIADO</p></div>
						<div class="col-sm-7"><p>DESPUÉS SELECCIONE UNA RESPUESTA </p></div>
						</div>
            <div class="row justify-content-center">
                
								<!-- usar el siguiente codigo para el estudiante-->
								
                <div class="col-sm-5 mb-4">
                    
                    <div @click.stop="seleccionarEnunciadoEmpareja(pregunta,indexPreg)"
                        class="row"
                        :class="[enunciadoSeleccionado == indexPreg ? 'enunSelected': '' ]"
                        :id="'Preg'+indexPreg" key="indexPreg"
												v-for="(pregunta,indexPreg) in preguntasCuestionario">
												<div class="col-sm-1"><p>{{indexPreg+1}}</p></div>
												<div class="col-sm-11"> <div v-html="pregunta.enunciado"> </div>
												
                        </div>
                    </div>
                </div>
                
                <div class="col-sm-7 mb-4">
                    <div class="row"
                        @click.stop="seleccionarRespuestaEmpareja(pregunta1,indexResp)"
                        :id="'Resp'+indexResp" key="indexResp"
                        v-for="(pregunta1, indexResp) in arregloRandom">
                        <p>
                        {{pregunta1.respuesta}}
                        </p>
                    </div>
                </div>
            
            </div>
        </div>
    </template>


    </div>
    </div>
</template>

    <template v-else>
        <h5>RESULTADOS:</h5>
        <div class="container">
        <div><p>Aciertos: {{aciertos.length}} / {{preguntasCuestionarioRespuestas.length}}</p></div>
            
                
                <div class="row justify-content-center" v-for="(pregunta, index) in preguntasCuestionarioRespuestas">
																	 
										<div class="col-sm-1 centrado_vertical"><p>{{index+1}}</p></div>
                    <div class="col-sm-4" v-html="pregunta.enunciado"></div> 
                    
                    
                    <div class="col-sm-7 "> 
                        <div class="alert" :class="[pregunta.respuestaEstudiante==pregunta.respuesta ? 'alert-success' : 'alert-danger']">Tu respuesta: {{pregunta.respuestaEstudiante ? pregunta.respuestaEstudiante: 'SIN RESPUESTA'}}</div>    
                        <p>Respuesta correcta: {{pregunta.respuesta}}</p>
                    </div>   
                </div>
           

        </div>    
    </template>

    </div>`,
	watch: {
		/*  number: function(newValue) {
        TweenLite.to(this.$data, 0.5, { puntosOtenidosInterpolados: newValue });
      } */
	},
	methods: {
		opcionesRespuesta(preguntaActual) {
			//Se construye una respuesta como objeto
			let opciones = [];
			let contador = 0;
			for (let opcion in preguntaActual.opciones) {
				//obtiene los nombres de atributos: opcion1, opcion 2 ...
				contador += 1;

				if (
					preguntaActual.opciones[opcion] &&
					preguntaActual.opciones[opcion].trim() != ""
				) {
					//si la opcion tiene un valor dentro
					opciones.push({
						texto: preguntaActual.opciones[opcion].trim(),
						id: contador
					});
				}
			}
			return opciones;
		},
		clickAnteriorPregunta() {
			if (this.indicePreguntaCuestionario > 0) {
				this.indicePreguntaCuestionario -= 1;
			}
		},
		clickSiguientePregunta() {
			// La siguiente evaluacion se realiza al pulsar cada opcion de respuesta, ver el metodo respuestaCuestionarioSeleccionada
			// if (this.preguntasCuestionarioRespuestas[this.indicePreguntaCuestionario].respuestaEstudiante == this.preguntasCuestionarioRespuestas[this.indicePreguntaCuestionario].respuesta) {
			//     this.aciertos.push(this.indicePreguntaCuestionario);
			// }
			this.tiempoRespuestaFin = this.totalTime;
			this.preguntasCuestionarioRespuestas[
				this.indicePreguntaCuestionario
			].tiempoDeRespuesta =
				this.tiempoRespuestaInicio - this.tiempoRespuestaFin;

			if (
				this.indicePreguntaCuestionario <
				this.preguntasCuestionario.length - 1
			) {
				this.indicePreguntaCuestionario += 1;
			}
			//reinicia el tiempo de inicio para calcular el tiempo de respuesta de la siguiente pregunta
			this.tiempoRespuestaInicio = this.totalTime;
		},
		respuestaCuestionarioSeleccionada() {
			// Si la respuesta es equivocada:

			// this.preguntasCuestionarioRespuestas[this.indicePreguntaCuestionario].respuestaEstudiante
			// this.respuestaCuestionarioPreguntaPrueba
			if (
				// si la respuesta seleccionada es equivocada
				this.preguntasCuestionarioRespuestas[this.indicePreguntaCuestionario]
					.respuestaEstudiante !=
				this.preguntasCuestionarioRespuestas[this.indicePreguntaCuestionario]
					.respuesta
			) {
				// se aumenta en uno el numero de errores,
				this.preguntasCuestionarioRespuestas[
					this.indicePreguntaCuestionario
				].errores += 1;
				// si ya se habia seleccionado la respuesta correcta, se elimina del arreglo

				this.aciertos.forEach((indiceDePreguntaAcertada, indice) => {
					if (indiceDePreguntaAcertada == this.indicePreguntaCuestionario) {
						this.aciertos.splice(indice, 1);
					}
				});
			} else {
				//se verifica si la pregunta ya esta o no registrada
				var preguntaRegistrada = false;
				this.aciertos.forEach(indiceDePreguntaAcertada => {
					if (indiceDePreguntaAcertada == this.indicePreguntaCuestionario) {
						preguntaRegistrada = true;
					}
				});
				if (!preguntaRegistrada) {
					//si la pregunta no esta registrada se la inserta
					this.preguntasCuestionarioRespuestas[
						this.indicePreguntaCuestionario
					].respuestaEstudiante = this.preguntasCuestionarioRespuestas[
						this.indicePreguntaCuestionario
					].respuestaEstudiante; //this.respuestaCuestionarioPreguntaPrueba;
					this.aciertos.push(this.indicePreguntaCuestionario);
				}
			}
		},
		finalizarCuestionario() {
			// verifico la respuesta de la ultima pregunta
			// if (this.preguntasCuestionarioRespuestas[this.indicePreguntaCuestionario].respuestaEstudiante == this.preguntasCuestionarioRespuestas[this.indicePreguntaCuestionario].respuesta) {
			//     this.aciertos.push(this.indicePreguntaCuestionario);
			// }
			this.tiempoRespuestaFin = this.totalTime;
			this.preguntasCuestionarioRespuestas[
				this.indicePreguntaCuestionario
			].tiempoDeRespuesta =
				this.tiempoRespuestaInicio - this.tiempoRespuestaFin;

			this.calcularPuntuacion();
			clearTimeout(this.bucleCuentaRegresiva);
			this.finEvaluacion = true;
		},
		/**
		 *
		 * @param {Object} pregunta la pregunta seleccionada en la evaluacion de tipo emparejamiento
		 * @param {string | int} indexPreg el indice al que corresponde dentro del arreglo this.preguntasCuestionario
		 */
		seleccionarEnunciadoEmpareja(pregunta, indexPreg) {
			if (!this.finEvaluacion) {
				//si aún no termina la evaluación, una vez que termina la evaluacion es necesario que pulse el boton de VOLVER A INTENTAR, en lugar de deshabilitar los botones

				this.enunciadoSeleccionado = indexPreg; //aplica el estilo al enunciado seleccionado

				this.preguntaSeleccionadaJuegoEmparejamiento = pregunta; //mantiene esta pregunta para poder comparar con la respuesta que luego seleccione

				//
				this.tiempoRespuestaInicio = this.totalTime; //copia el tiempo en el que se encuentra actualmente para despues restar del tiempo final cuando responda correctamente y obtener el tiempo que se demoró en responde
				this.colorPregunta = this.getRandomColor();
				$("#Preg" + this.enunciadoSeleccionado).css({
					// "background-color": this.coloresPreguntasEmparejamiento[indexPreg],
					"background-color": this.colorPregunta,
					"border-radius": "10px"
				});

				//   reseteo valores para la siguiente pregunta
				this.erroresRespuesta = 0; // se encera porque en adelante no se permite modificar la respuesta, mientras no se presione el enunciado el usuario puede cambiar de respuesta las veces que desee

				this.respuestaAnterior = [];
				if (
					this.preguntasCuestionarioRespuestas[this.enunciadoSeleccionado]
						.respuestaEstudiante
				) {
					$(
						"#Resp" +
							this.preguntaSeleccionadaJuegoEmparejamiento
								.indiceRespuestaEstudiante
					).css({
						// "background-color": this.coloresPreguntasEmparejamiento[this.enunciadoSeleccionado],
						"background-color": this.colorPregunta,
						"border-radius": "10px"
					});
				}
			}
		},
		/**
		 *
		 * @param {Object} pregunta Objeto pregunta de la respuesta seleccionada para poder comparar con el enunciado
		 * @param {string | int} indexResp indice de la respuesta dentro del arreglo this.arregloRandom
		 */
		seleccionarRespuestaEmpareja(pregunta, indexResp) {
			//se despinta la respuesta seleccionada anteriormente para un enunciado
			if (this.respuestaAnterior.length) {
				//si existe una respuesta anterior se la despinta
				$("#Resp" + this.respuestaAnterior[0]).css({
					"background-color": "#27293d"
				});
				this.respuestaAnterior.pop();
			}
			this.respuestaAnterior.push(indexResp);
			if (this.preguntaSeleccionadaJuegoEmparejamiento) {
				//CUANDO UNA PREGUNTA HA SIDO SELECCIONADA

				if (
					this.preguntasCuestionarioRespuestas[this.enunciadoSeleccionado]
						.respuestaEstudiante
				) {
					//si la pregunta seleccionada ya tenia una respuesta, y no es la misma
					if (
						this.preguntasCuestionarioRespuestas[this.enunciadoSeleccionado]
							.respuestaEstudiante != pregunta.respuesta
					) {
						//buscar la respuesta que corresponde a la anterior respuesta y quitar su color
						$(
							"#Resp" +
								this.preguntasCuestionarioRespuestas[this.enunciadoSeleccionado]
									.indiceRespuestaEstudiante
						).css({
							"background-color": "#27293d"
						});
					}
				}

				// recorrer el arreglo de preguntasCuestionarioRespuestas
				for (
					let p = 0;
					p <= this.preguntasCuestionarioRespuestas.length - 1;
					p++
				) {
					// si la pregunta de indice p tiene respuestaEstudiante,pasa a la siguietne evalucaion if
					if (this.preguntasCuestionarioRespuestas[p].respuestaEstudiante) {
						// si la pregunta de indice p tiene una respuestaEstudiante igual a la respuesta seleccionada por el estudiante
						if (
							this.preguntasCuestionarioRespuestas[p].respuestaEstudiante ==
								pregunta.respuesta &&
							this.preguntasCuestionarioRespuestas[this.enunciadoSeleccionado]
								.indiceRespuestaEstudiante != indexResp
						) {
							// Se despinta la pregunta que estaba asociada a la respuesta seleccionada
							$("#Preg" + p).css({
								"background-color": "#27293d"
							});

							//Se establece en null la respuestaEstudiante de la pregunta de indice p
							this.preguntasCuestionarioRespuestas[
								p
							].respuestaEstudiante = null;
						}
					}
				}

				// this.respuestasSeleccionadas.push();
				//Se  pinta la respuesta  del color de la pregunta seleccionada
				$("#Resp" + indexResp).css({
					// "background-color": this.coloresPreguntasEmparejamiento[this.enunciadoSeleccionado],
					"background-color": this.colorPregunta,
					"border-radius": "10px"
				});

				this.tiempoRespuestaFin = this.totalTime;
				// SE usa el arreglo preguntasCuestionarioREspuestas que mantiene el orden de las preguntas originales, para almacenar las respuestas de emparejamiento
				this.preguntasCuestionarioRespuestas[
					this.enunciadoSeleccionado
				].tiempoDeRespuesta =
					this.tiempoRespuestaInicio - this.tiempoRespuestaFin;
				this.preguntasCuestionarioRespuestas[
					this.enunciadoSeleccionado
				].respuestaEstudiante = pregunta.respuesta;
				this.preguntasCuestionarioRespuestas[
					this.enunciadoSeleccionado
				].indiceRespuestaEstudiante = indexResp;

				if (
					pregunta.respuesta !=
					this.preguntaSeleccionadaJuegoEmparejamiento.respuesta
				) {
					// se incrementa en uno, el numero de veces que se equivoca
					this.preguntasCuestionarioRespuestas[
						this.enunciadoSeleccionado
					].errores += 1;

					// Se recore el arreglo de aciertos para verificar si ya se habia seleccionado la respuesta correcta
					for (let i = 0; i <= this.aciertos.length - 1; i++) {
						// si ya se habia seleccionado la respuesta correcta:
						if (this.aciertos[i] == this.enunciadoSeleccionado) {
							// se elimina el indice acertado del arreglo
							this.aciertos.splice(i, 1);
						}
					}
				} else {
					//la respuesta es correcta

					//se agrega el indice de la pregunta acertada
					this.aciertos.push(this.enunciadoSeleccionado);
				}

				if (this.haFinalizadoEvaluacionAntes()) {
					swal({
						icon: "success",
						title: "Bien hecho, terminaste antes de tiempo",
						showConfirmButton: true,
						timer: 2000
					});
					this.calcularPuntuacion(); //aun si es visitante se muestra el puntaje obtenido //tambien se invoca a guardar dentro de esta funcion
				}
			}
		},

		haFinalizadoEvaluacionAntes() {
			let finalizar = false;
			if (this.tipoEvaluacion == "Emparejamiento") {
				let contadorRespuestaEstudiante = 0;
				this.preguntasCuestionarioRespuestas.forEach(pregunta => {
					if (pregunta.respuestaEstudiante) {
						contadorRespuestaEstudiante += 1;
					}
				});

				if (
					contadorRespuestaEstudiante ==
					this.preguntasCuestionarioRespuestas.length
				) {
					//Ha seleccionado una respuesta para todas las preguntas
					finalizar = true;
				}
			}

			return finalizar;
		},

		/**
		 * Crea un orden aleatorio para el arreglo de respuestas
		 */
		randomPreguntasEmparejamiento() {
			//
			this.arregloRandom = [];
			this.preguntasCuestionario.forEach(pregunta => {
				let posicionAleatorio = Math.floor(Math.random() * 10); //numero aleatorio entre 0 y 10(cualquier valor entero)
				let modulo = posicionAleatorio % 2;
				//si el numero aleatorio es par, entonces añadimos la pregunta al inicio de la lista
				if (modulo == 0) {
					this.arregloRandom.unshift(pregunta);
				} else {
					// si el numero aleatorio es impar entonces el número se agrega al final de la lista
					this.arregloRandom.push(pregunta);
				}
			});
		},
		actualizaCuentaRegresiva() {
			// document.getElementById('countdown').innerHTML = totalTime;
			if (this.totalTime == 0.0) {
				swal({
					icon: "info",
					title: "Lástima!! ",
					text: "Se terminó el tiempo",
					showConfirmButton: true
				});
				if (this.tipoEvaluacion == "Cuestionario") {
					this.finalizarCuestionario();
					//desde finalizarCuestionario() se llama a calcularPuntuacion
				} else {
					// cuando la evaluacion es EMPAREJAMIENTO no existe funcion finalizarCuestionario
					this.calcularPuntuacion(); //aun si es visitante se muestra el puntaje obtenido
					//tambien se invoca a guardar dentro de esta funcion
					//se emite finaliza-evaluacion en el metodo  calcularPuntuacion
				}
			} else if (this.haFinalizadoEvaluacionAntes()) {
				// se detiene el contador
				//no es necesario hacer nada, en la linea 308 en el metodo seleccionarRespuestaEmpareja ya se  evalúa si finaliza la evaluacion y a continuacion calcula el puntaje para luego gurdar en la base de datos
			} else {
				this.totalTime -= 0.1;
				this.totalTime = this.totalTime.toFixed(1);
				this.bucleCuentaRegresiva = setTimeout(
					this.actualizaCuentaRegresiva,
					100
				);
			}
		},
		calcularPuntuacion() {
			let valorRepetir = true; // se muestra el botón para repetir la evaluacion
			this.$emit("finaliza-evaluacion", valorRepetir); // se emite el evento finaliza la evaluacion,el valor remitido activa el boton de repetir en el modulo-contenedor-curso

			//1) valorar los PUNTOS que se sumanán por sus respuestas
			//cada pregunta tiene un minimo de 100
			if (this.totalTime <= 1.0) {
				this.puntosObtenidos = 100 * this.aciertos.length * 1;
				this.puntos = Number(this.puntos) + Number(this.puntosObtenidos); //se acumulan los puntos al numero original de puntos
			} else {
				//calculo el valor
				this.puntosObtenidos = 100 * this.aciertos.length * this.totalTime;
				this.puntos = Number(this.puntos) + Number(this.puntosObtenidos); //se acumulan los puntos al numero original de puntos
				this.puntos = parseFloat(this.puntos).toFixed(0);
			}
			//2) valorar si terminó el modulo para subir al siguiente NIVEL
			//Si tiene mas del 50% de aciertos aprueba la evaluacion
			if (
				this.aciertos.length >
				this.preguntasCuestionarioRespuestas.length / 2
			) {
				this.apruebaEvaluacion = 1;
			} else {
				this.apruebaEvaluacion = 0;
			}

			// teer en cuenta que el estudiante puede realizar la evaluacion las veces que quiera
			var numeroSubmoduloAprobadosPorCurso = this.submodulosAprobadosPorCurso
				.length;
			/*sube de nivel cuando es la primera vez que se aprueba la evaluacion  y cumple con el parametro para subir de nivel*/
			if (this.apruebaEvaluacion == 1 && !this.submoduloAprobado) {
				//si aprueba la evaluacion y el submodulo no ha sido aprobado quiere decir que es la primera vez que se aprueba esta evaluacion,se guarda en el array de submodulosAprobados por tanto el numero de modulos aprobados sera uno mas

				this.submodulosAprobadosPorCurso.push(this.submodulo.id); //agrego el id sel submodulo aprobado

				numeroSubmoduloAprobadosPorCurso = this.submodulosAprobadosPorCurso
					.length;

				// if (numeroSubmoduloAprobadosPorCurso > this.nivel) { //si el porcentaje alcanzado es superior al porcentaje anterior entonces se

				this.nivel = numeroSubmoduloAprobadosPorCurso; // se incrementa el nivel de acuerdo al porcentaje alcanzado /10, es posible saltarse mas de un nivel a la vez (del 3 al 5 por ejemplo) porque depende del número de evaluaciones que tenga el curso, mientras más evaluaciones tenga el curso, mas preciso es el cálculo del nivel

				// }
			}

			//3) valorar si ya pasó el porcentaje de niveles necesario para darle medallas

			//calculo el porcentaje de avance incluyendo la evaluacion actual

			this.porcentajeAvanceSubmodulos =
				(this.nivel / this.numeroSubmodulosCurso) * 100;

			if (
				this.porcentajeAvanceSubmodulos > 0 &&
				this.porcentajeAvanceSubmodulos <= 20
			) {
				this.medalla = "novato";
			} else if (
				this.porcentajeAvanceSubmodulos > 20 &&
				this.porcentajeAvanceSubmodulos <= 80
			) {
				this.medalla = "estudiante";
			} else if (
				this.porcentajeAvanceSubmodulos > 80 &&
				this.porcentajeAvanceSubmodulos <= 95
			) {
				this.medalla = "estudiante destacado";
			} else if (
				this.porcentajeAvanceSubmodulos > 95 &&
				this.porcentajeAvanceSubmodulos <= 99
			) {
				this.medalla = "egresado";
			} else {
				this.medalla = "graduado";
			}

			//4) guardar en la base de datos

			if (this.usuario) {
				// solo se guardan los intentos hasta que se apruebe la evaluacion, por tanto si el submodulo ya fue aprobado anteriormente ya no se permite guardar
				if (this.usuario.nombre != "Visitante" && !this.submoduloAprobado) {
					this.guardarIntentoEvaluacion();

					//si el usuario es estudiante se guardan los resultados de la evaluacion
				}
			}
			//5) propagar el puntaje al componente raiz
			this.actualizaProgreso();
			//6) mostrar el modal resumen de resultados
			this.mostrarModalActividadFinalizada();

			//7)  finalizar evaluacion
			this.finEvaluacion = true;
		},

		empezarEvaluacion() {
			setTimeout(this.actualizaCuentaRegresiva, 200); //tarda doscientos milisegundos en empezar la cuenta regresiva
		},

		mostrarModalInicial() {
			this.totalTime = this.tiempoMaximoPorPregunta;
			$(() => {
				$("#modalInstrucciones").modal("show");
			});
		},
		mostrarModalActividadFinalizada() {
			$(() => {
				$("#actividadFinalizada").modal("show");
			});

			// interpolación que le permite definir los valores de destino: this.$data
			// DEBE IR AQUI PORQUE EN ESTE PUNTO YA SE SABE CUANTOS PUNTOS OBTENIDOS HAY
			TweenLite.to(this.$data, 3, {
				puntosOtenidosInterpolados: this.puntosObtenidos,
				puntosInterpolados: this.puntos
			}); //puntosObtenidosInterpolados recibe el maximo valor  que puede tener
		},
		reiniciarValores() {
			this.arregloRandom = [];
			//variables para usar en Emparejamiento del lado del Estudiante
			this.enunciadoSeleccionado = null;
			// this.respuestasSeleccionadas = [];
			this.preguntaSeleccionadaJuegoEmparejamiento = null;
			this.totalTime = this.tiempoMaximoPorPregunta;
			this.tiempoRespuestaInici = null; // almacena el valor de totalTime  al momento de dar clic en un enunciado
			this.tiempoRespuestaFin = null;
			this.erroresRespuesta = 0;
			this.aciertos = [];
			this.preguntasCuestionarioRespuestas = [];
			//los puntos actuales ya se encuentran en la variable this.puntos
			//nivel y medallas se encuentran actualizadas
			this.apruebaEvaluacion = 0;
			this.bucleCuentaRegresiva = null;
			this.preguntasCuestionario.forEach(pregunta => {
				//agrego todas las preguntas al arrreglo para despues reemplazar cada pregunta por su pregunta , este se guardará en la collection IntentoEvaluacioncon respuestas
				let respuestaIntento = pregunta;
				respuestaIntento.errores = null;
				respuestaIntento.tiempoDeRespuesta = null;
				respuestaIntento.respuestaEstudiante = null;
				this.preguntasCuestionarioRespuestas.push(respuestaIntento);

				$("[id^='Resp']").css({ "background-color": "white" });
				$("[id^='Preg']").css({ "background-color": "white" });
			});
			this.puntosObtenidos = 0;
			this.finEvaluacion = false;
			this.randomPreguntasEmparejamiento();

			this.respuestaAnterior = [];

			/*VARIABLE DE CUESTIONARIO*/
			this.indicePreguntaCuestionario = 0;
			this.siguientePreguntaCuestionario = true;
		},
		intentarNuevamente() {
			// CODIGO PARA INTENTAR NUEVAMENTE

			//Existen dos posibilidades:
			// primera: ya se guardó la evaluacion sea porque se acabó el tiempo o porque terminó la evaluacion --entonces no hacer nada
			// segunda: el usuario presionó el botón de reiniciar antes de que se guarde su evaluación --entonces parar el contador  sin guardar la evaluacion
			clearTimeout(this.bucleCuentaRegresiva);
			this.presionaIntentarNuevamente = true;

			//1 reiniciar todos los valores nuevamente
			this.reiniciarValores();
			//2 mostrar Modal Inicial
			this.mostrarModalInicial();
		},

		/**
		 * Guarda el intento de la evaluacion con su tiempo
		 */
		guardarIntentoEvaluacion() {
			//solo se guarda si el usuario es estudiante, es decir, el usuario debe estar logueado
			let evaluacionIntento = {
				tipo: this.tipoEvaluacion,
				aciertos: this.aciertos,
				preguntas: this.preguntasCuestionarioRespuestas,
				puntosObtenidos: this.puntosObtenidos
			};

			var formData = new FormData();
			formData.append("estudianteId", this.usuario.id);
			formData.append("submoduloId", this.submodulo.id);
			formData.append("cursoId", this.curso.id);
			//los siguientes valores se retornan desde la accion view-administrar-contenido, para ello se consulta la coleccion IntentoEvaluacion, luego se reemplazan estos valores por los generados en la aplicacion
			formData.append("puntos", this.puntos); //number
			formData.append("nivel", this.nivel); // number
			formData.append("medalla", this.medalla); //string
			formData.append("tiempoMaximoPorPregunta", this.tiempoMaximoPorPregunta); //number
			formData.append("apruebaEvaluacion", this.apruebaEvaluacion); //number 1 o 0
			formData.append("evaluacion", JSON.stringify(evaluacionIntento)); //json

			axios({
				method: "post",
				url: "/crear-intento-evaluacion",
				data: formData
			})
				.then(response => {
					this.usuario.ultimoIntento = response.data.intentoEvaluacionCreado;
				})
				.catch(err => {
					swal({
						icon: "error",
						title: "Error: no se puede guardar el avance en este momento",
						text: `${err}`,
						showConfirmButton: true,
						timer: 2000
					});
				});
		},
		actualizaProgreso() {
			if (this.usuario.nombre !== "Visitante") {
				this.progreso.puntos = Number(this.puntos);
				this.progreso.nivel = this.nivel;
				this.progreso.medalla = this.medalla;
				this.progreso.totalNiveles = this.numeroSubmodulosCurso;
				this.progreso.porcentajeAvance = this.porcentajeAvanceSubmodulos;
				this.$emit("actualiza-progreso", this.progreso);
			}
		},
		/**
		 * MMetodo que recibe la accion desde el modulo-contenedor-curso
		 */
		mostrarPista() {
			if (!this.finEvaluacion) {
				if (this.tipoEvaluacion == "Emparejamiento") {
					if (this.preguntaSeleccionadaJuegoEmparejamiento) {
						//ha sido seleccionada la pregunta
						swal({
							icon: "info",
							title: "Pista!!!!!",
							text: this.preguntaSeleccionadaJuegoEmparejamiento.pista,
							showConfirmButton: true
						});
					} else {
						swal({
							icon: "info",
							title: "Primero seleccione un enunciado",
							showConfirmButton: true,
							timer: 3000
						});
					}
				} else {
					swal({
						icon: "info",
						title: "Pista!!!!!",
						text: this.preguntasCuestionarioRespuestas[
							this.indicePreguntaCuestionario
						].pista,
						showConfirmButton: true
					});
				}
			}
		},
		/**
		 * Funcion para obtener un color oscuro
		 * Fuente: http://jsfiddle.net/xP5v8/
		 */
		getRandomColor() {
			var letters = "012345".split("");
			var color = "#";
			color += letters[Math.round(Math.random() * 5)];
			letters = "0123456789ABCDEF".split("");
			for (var i = 0; i < 5; i++) {
				color += letters[Math.round(Math.random() * 15)];
			}
			return color;
		}
	},
	computed: {
		totalTimeProgress() {
			let porcentaje = (this.totalTime / this.tiempoMaximoPorPregunta) * 100;
			return porcentaje;
		},
		subeDeNivelComp() {
			let retorno = this.apruebaEvaluacion == 1 && !this.submoduloAprobado;
			return retorno;
		},
		noEsPrimeraPregunta() {
			let noEs = true;
			noEs = this.indicePreguntaCuestionario > 0;

			return noEs;
		},
		esUltimaPregunta() {
			let es = false;
			es =
				this.indicePreguntaCuestionario ==
				this.preguntasCuestionario.length - 1;
			return es;
		},
		puntosOtenidosAnimados: function() {
			return this.puntosOtenidosInterpolados.toFixed(0);
		},
		puntosAnimados: function() {
			return this.puntosInterpolados.toFixed(0);
		}
	}
});

/*
pruebas a realizar
1: tiempo = 0 , evaluacion cero, reintentar
2: timpo > 0, evaluacion 1 , reintentar
*/
