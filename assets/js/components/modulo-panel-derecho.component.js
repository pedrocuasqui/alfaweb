/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerComponent("modulo-panel-derecho", {
	props: {
		usuario: {
			type: Object,
			default: () => {
				return { nombre: "Visitante", rol: "Estudiante", id: "1" };
			}
		},
		cursoEstudiante: {
			type: Object,
			required: false,
			default: () => {
				return null;
			},
			description:
				"un objeo de tipo CursoEstudiante, este objeto guarda el lúltimo tema o módulo revisado por el estudiante,  se usa en la interfaz indice de estudiante para poder redireccionar al último tema revisado  "
		},

		curso: {
			type: Object,
			required: false,
			default: () => {
				return null;
			},
			description:
				"un objeto de tipo Curso, se usa para buscar la puntuacion (intentoEvaluacion) actual del estudiante "
		},
		puntajeActual: {
			type: Number,
			default: 0
		},
		nivelActual: {
			type: Number,
			default: 0
		},
		totalNiveles: {
			type: Number,
			default: 0
		},
		medallaActual: {
			type: String,
			default: "novato"
		},
		porcentajeAvance: {
			type: Number,
			default: 0
		},
		usuariosConectados: {
			type: Array,

			default: function() {
				//comentar este bloque default cuando se pasen los datos como parámetro a este componente
				return [
					{
						nombre: "Pedro",
						apellido: "Cuasqui",
						Nivel: "4"
					},
					{
						nombre: "Emilio",
						apellido: "Pérez",
						Nivel: "5"
					}
				];
			}
		},

		adminCreandoModuloSubmodulo: {
			type: Boolean,
			required: false,
			default: () => {
				return false;
			}
		},
		objetoSeleccionado: {
			type: Object,
			// required: true,//no necesario para señalar el modulo o submodulo seleccionado en el menu lateral porque el menu ya contiene su definicion por defecto
			default: () => {
				return { id: "1" };
			} // se usa el mismo id por defecto que se usa en modulo-contenedor-curso
			// description:'parametro de barra de navegacion, tambien se usa la descripcion cuando el objeto seleccionado es un modulo o submodulo'
		}
	},
	data() {
		return {
			proximaRedireccionAContenido: false,
			intentosEvaluacion: null,
			estudiantesConSusIntentos: [],
			estudiantesConSusIntentosQuickSort: null,
			mostrarOpcionesDeUsuario: true
		};
	},
	mounted() {},

	template: /*template */ ` 
<div>

    <!------------------------------------>
    <!------------------------------------>
    <!------------------------------------>
    <!-- Modals -->
    <!------------------------------------>
    <!------------------------------------>
    <!------------------------------------>
    <!-- Ver puntuacion Historica del estudiante -->
    <div class="modal fade " id="modalPuntuacionEstudiante" tabindex="-1" role="dialog" aria-labelledby="etiquetaModalPuntuacion"
        aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="etiquetaModalPuntuacion">Puntuación histórica</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">    
                    <div class = "container">
                        <div class="row">
                            <div class="col-sm-4">
                            <!--COLUMNA DE TABLA DE PUNTUACION ACTUAL, posicion en funcion del puntaje-->
                            <div class="centrado_horizontal"> Tabla de puntuación </div>
                            <table class="table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Posición</th>
                                        <th scope="col">Estudiante</th>
                                        <th scope="col">Puntos</th>
                                        <th scope="col">Experiencia</th>
                                        <th scope="col">Nivel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(estudiante, index) in estudiantesConSusIntentosQuickSort">
                                        
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{estudiante.nombre}}</td>
                                            <td>{{estudiante.intentosEvaluacion[0].puntos}}</td>
                                            <td>{{estudiante.intentosEvaluacion[0].medalla}}</td>
                                            <td>{{estudiante.intentosEvaluacion[0].nivel}}</td>
                                        
                                    </tr>
                                </tbody>
                          </table>

														</div>
														<div class="col-sm-1">
														</div>
                            <div class="col-sm-7">
														<!--COLUMNA DE GRÁFICO DE AVANCE-->
														<div class="centrado_horizontal"> Puntuación de las últimas evaluaciones </div>
                            
                            <canvas id="graficoPuntuacionHistorica" width="1200" height="600"></canvas>

                            </div>
                        </div>
                        <div class= "row">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>

    <!------------------------------------>
    <!------------------------------------>
    <!------------------------------------>
    <!--Contenido del panel derecho-->
    <!------------------------------------>
    <!------------------------------------>
    <!------------------------------------>
		<div class="container-fluid barra-lateral">

		<div id="alerta_ultimo_tema" v-if="existeAvance" class="alert alert-info alert-dismissible fade show" role="alert">
			<strong>Último tema revisado: </strong> 
				<a  v-if="cursoEstudiante.avance.enlace"
				:href="'/contenido-alfaweb/?enlace='+cursoEstudiante.avance.enlace">{{cursoEstudiante.nombre}}</a>
				<a v-else
				:href="'/interfaz-modulos/?objetoId='+cursoEstudiante.avance.objetoId+'&tipoContenido='+cursoEstudiante.avance.tipoContenido">{{cursoEstudiante.nombre}}</a>
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	
	
	
		<div class="row usuario">
			<div class="col">
				<div class="btn-group">
					<slot>
						<!--Iconos de silenciar e imprimir-->
					</slot>
					<button type="button" class="btn btn-primary dropdown-toggle boton_formulario" data-toggle="dropdown"
						aria-haspopup="true" aria-expanded="false" @click="mostrarOpcionesUsuario()">
						{{usuario.nombre}}
					</button>
	
	
					<div id="boton_desplegable_personalizado" class="dropdown-menu">
						<a class="dropdown-item  ">Rol: {{usuario.administrador && usuario.nombre !='Visitante'? "Administrador":"Estudiante"}}</a>
						<a v-if="usuario.nombre =='Visitante'" class="dropdown-item inicia_sesion_item" href="/view-login">Inicia Sesión</a>
						<a v-else class="dropdown-item  cambiar_pass_item" href="/view-actualizar-usuario">Cambia tu contraseña</a>
						<a v-if="usuario.nombre !='Visitante'" class="dropdown-item salir_item" href="/logout">Salir</a>
						<a v-else class="dropdown-item registro_item" href="/view-registro-usuario">Regístrate</a>
						
						<div class="dropdown-divider"></div>
						<div class="container-fluid">
	
							<!-- Seccion progreso(puntos, nivel, progreso) del estudiante -->
							<div class="row progreso" v-if="!esAdmin">
								<div class="col-sm-12">
										<div class="row">
											<div class="col-sm-7">
												<span>Puntos:</span>
											</div>
											<div class="col-sm-5">
													<!--<i class="fas fa-certificate fa-stack-2x"> </i>-->
													<span>{{puntajeActual}}</span>
											</div>
										</div>
	
									<div class="row">
										<div class="col-sm-12">
											<div class="row">
												<div class="col-sm-7">
													<span>Nivel:</span>
												</div>
												<div class="col-sm-5">
													<!--<i class="fas fa-battery-empty fa-stack-2x"></i>-->
													<span >&nbsp{{nivelActual}}/{{totalNiveles}}</span>
												</div>
											</div>
											<div class="row progress" style="height: 3px;">
												<div class="progress-bar" role="progressbar" :style="{width:porcentajeAvanceNiveles+'%'}"
													:aria-valuenow="porcentajeAvanceNiveles" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
										</div>
									</div>
	
									<div class="row">
										<div class="col-sm-12">
											<div class="row">
												<div class="col-sm-7">
													<span>Progreso:</span>
												</div>
												<div class="col-sm-5 contenedor-icono">

													
														<img v-if="medallaActual=='novato'" src="/images/svg/buho_bebe.svg" :alt="medallaActual">
														<img v-else-if="medallaActual=='estudiante'" src="/images/svg/buho_original_1.svg"
															:alt="medallaActual">
														<img v-else-if="medallaActual=='estudiante destacado'" src="/images/svg/buho_original_1.svg"
															:alt="medallaActual">
														<img v-else-if="medallaActual=='egresado'" src="/images/svg/buho_sabio.svg"
															:alt="medallaActual">
														<img v-else src="/images/svg/buho_graduado.svg" :alt="medallaActual">
													
												</div>
											</div>
										
											<div class=" row progress " style="height: 3px;">
												<div class="progress-bar" role="progressbar" :style="{width:porcentajeAvance+'%'}"
													:aria-valuenow="porcentajeAvance" aria-valuemin="0" aria-valuemax="100"></div>
											</div>

										</div>


									</div>
	
								</div>
							</div>
							<!-- Seccion de evaluacion y puntaje -->
							<div v-if="!esAdmin" class="dropdown-divider"></div>
							<div class="row enlaces" v-if="!esAdmin">
								<div class="col">

									<div class="evaluacion">
										<i class="fas fa-clipboard-check"></i>
										<a @click="evaluacionIndividual()" class="estiloLink"><span> Evaluación</span></a>
									</div>
	
									<div class="tabla-puntuacion">
										<i class="fas fa-chart-bar"></i>
										<a @click="clickPuntuacion()" class="estiloLink"><span> Puntuación</span></a>
									</div>
								</div>
							</div>
							<!-- Seccion usuarios conectados -->
							<div v-if="!esAdmin" class="dropdown-divider"></div>
							<!--<div class="row usuarios-conectados" v-if="!esAdmin">
								<div class="col">
									<div><span>Últimos usuarios conectados</span></div>
									<ul>
										<li v-for="usuario in usuariosConectados">{{usuario.nombre}}</li>
									</ul>
								</div>
							</div> -->
							<!-- SeccionSoporte -->
							<div class="row soporte">
								<div class="col">
									<div><span>Soporte:</span></div>
									<p>pedro.cuasqui@epn.edu.ec</p>
								</div>
							</div>
	
						</div>
					</div>
	
				</div>
	
	
	
			</div>
	
		</div>
	
		
	</div>   
</div>`,
	methods: {
		mostrarModalPuntuacion() {
			$(() => {
				$("#modalPuntuacionEstudiante").modal("show");
			});
		},
		evaluacionIndividual(contenido) {
			if (this.adminCreandoModuloSubmodulo) {
				swal({
					icon: "info",
					tittle: "Debe crear el tema primero",
					showConfirmButton: true,
					timer: 2000
				});
			} else {
				if (this.proximaRedireccionAContenido) {
					contenido = "contenido";
					this.$emit("evaluacion-individual", contenido);
					this.proximaRedireccionAContenido = false;
				} else {
					this.$emit("evaluacion-individual", contenido);
					this.proximaRedireccionAContenido = true;
				}
			}
		},

		clickPuntuacion() {
			if (this.curso) {
				//Siempre debe existir un curso, no es posible acceder hasta esta ventana sin pasar por la seleccion de un curso
				if (this.usuario.nombre != "Visitante") {
					axios({
						url: "/puntuacion-estudiante",
						method: "get",
						params: { cursoId: this.curso.id }
					})
						.then(response => {
							// Los intentos del usuario logueado, ordenados ascendentemente por fecha de creacion
							this.intentosEvaluacion = response.data.intentosEvaluacion;
							// funcion para seleccinar solo los estudiantes que tienen evaluaciones es decir que la propiedad intentosEvaluacion tenga una longitud mayor a cero
							this.estudiantesConSusIntentos =
								response.data.estudiantesConSusIntentos;
							this.seleccionarEstudiantesConIntentos();
							this.estudiantesConSusIntentosQuickSort = this.ordenamientoQuickSort(
								this.estudiantesConSusIntentos
							);
							this.definirGraficoPuntuacion();
							this.mostrarModalPuntuacion();
						})
						.catch(err => {
							swal({
								icon: "error",
								title:
									"Error: no se puede mostrar la puntuación en este momento",
								text: `${err}`,
								showConfirmButton: true
							});
						});
				} else {
					swal({
						icon: "warning",
						title: "No puede acceder a esta información como usuario Visitante",
						showConfirmButton: true
					});
				}
			}
		},
		definirGraficoPuntuacion() {
			var labels = [];
			var datasetLabel = "Curso: " + this.curso.nombre;
			var datasetData = [];
			let contadorEvaluaciones = 0;
			let limiteEvaluaciones = 30;
			this.intentosEvaluacion.forEach(element => {
				// con un contador limitar el número de evaluaciones que se muestran, para no sobrecargar el gráfico, solo se muestran 30 evaluaciones
				contadorEvaluaciones += 1;
				if (contadorEvaluaciones <= limiteEvaluaciones) {
					// convierto la fecha de tipo Datetime a date
					let fechaUltimoAcceso = new Date(element.createdAt);
					let fecha =
						fechaUltimoAcceso.getDate() +
						"/" +
						fechaUltimoAcceso.getMonth() +
						"/" +
						fechaUltimoAcceso.getFullYear();
					// Agrego al arreglo de etiquetas, la fecha concatenada con el nombre del submodulo al uqe pertenece la evaluacion
					labels.push(fecha + " " + element.submodulo.nombreSubmodulo);
					datasetData.push(element.evaluacion.puntosObtenidos);
				}
			});
			// QUE DATA SE TOMARÁ PARA EL GRAFICO
			//OPCIONES"
			// 0) graficar el puntaje obtenido, en cada evaluacion por fecha(probado)
			// pros: facilidad de programacion, solo se lee la colecion INTENTOEVALUACION y se ordena ascendentemente
			// cons: si son muchas evaluaciones el eje x será demasiado grande,
			// cons: si el usuario solo ha realizado varias veces la misma evaluacion, el grafico mostraría informacion no tabulada, para esto serviría la opción 2
			// 1) graficar  el puntaje de la ultima evaluacion de cada submodulo
			// pros: facilidad de retorno de datos
			// cons: el eje X crecería en funcion del numero de submodulo del curso, generalmente serán varios
			// 2) graficar el historico de puntajes obtenidos por submodulo seleccionado
			// pros: se vería el grafico con las puntuaciones por cada fecha desde la mas antigua a la mas reciente,
			// cons: si el estudiante tiene pocas evaluaciones, o peor aun solo tiene una (lo mas común), la grafica no servirá de nada
			// 3) puntos obtenidos en un rango de tiempo
			// pros: se sumarian los puntos de un intervalo de tiempo, por ejemplo de cada dia, el grafico mostraria la cantidad de puntos alcanzados en cada dia desde el inicio del curso, hasta hoy y ademas se vería la frecuencia de

			var ctx = document
				.getElementById("graficoPuntuacionHistorica")
				.getContext("2d");
			new Chart(ctx, {
				// The type of chart we want to create
				type: "line",

				// The data for our dataset
				data: {
					// labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
					labels: labels,
					datasets: [
						{
							label: datasetLabel,
							backgroundColor: "rgb(255, 99, 132)",
							borderColor: "rgb(255, 99, 132)",
							data: datasetData
						}
					]
				},

				// Configuration options go here
				options: {}
			});
		},

		seleccionarEstudiantesConIntentos() {
			//se recorre el arreglo recibido del servidor con los estudiantes y sus evaluaciones
			this.estudiantesConSusIntentos.forEach(estudiante => {
				// si el estudiante no tiene evaluaciones, se añaden valores por defecto a una evaluacion ficticia para que se lo tome en cuenta
				if (estudiante.intentosEvaluacion.length == 0) {
					estudiante.intentosEvaluacion.push({
						//intento por defecto se usa para los usuario no logueados o usuarios logueados por primera vez que aún no tienen interaccion con el aplicativo
						puntos: 0,
						nivel: 0, //modulo 1
						medalla: "novato", //medalla mas basica
						tiempoMaximoPorPregunta: 30, //en segundos por defecto
						evaluacion: null
					});
				}
			});
		},
		ordenamientoQuickSort(origArray) {
			if (origArray.length <= 1) {
				return origArray;
			} else {
				var left = [];
				var right = [];
				var newArray = [];
				var estudiantePivot = origArray.pop();
				var pivot = estudiantePivot.intentosEvaluacion[0].puntos;
				var length = origArray.length;

				for (var i = 0; i < length; i++) {
					if (origArray[i].intentosEvaluacion[0].puntos >= pivot) {
						left.push(origArray[i]);
					} else {
						right.push(origArray[i]);
					}
				}

				return newArray.concat(
					this.ordenamientoQuickSort(left),
					estudiantePivot,
					this.ordenamientoQuickSort(right)
				);
			}
		},
		mostrarOpcionesUsuario() {
			this.mostrarOpcionesDeUsuario = !this.mostrarOpcionesDeUsuario;
		}
	},
	computed: {
		porcentajeAvanceNiveles() {
			let porcentaje = 0;
			if (this.nivelActual && this.totalNiveles) {
				if (this.totalNiveles != 0) {
					porcentaje = (this.nivelActual / this.totalNiveles) * 100;
				}
			}
			return porcentaje;
		},
		existeAvance() {
			let avance = false;

			if (this.cursoEstudiante) {
				if (this.cursoEstudiante.avance) {
					avance = true;
				}
			}

			return avance;
		},
		esAdmin() {
			let esadmin = false;
			//si el usuario es administrador pero no ha seleccionado el curso de informatica basica, se le da permiso de administrador

			// if ((this.usuario.administrador || this.usuario.tutor) && this.cursoInformatica == false ){
			if (this.usuario.administrador || this.usuario.tutor) {
				//usar la linea anterior para restringir el acceso al curso informatica básica al administrador
				esadmin = true;
			}
			// si el usuario es estudiante entonces se le niega el permiso de administrador, asi que hay dos opciones
			//1) seleccionó curso 'Informática báscia' --> se habilita solo el curso informática básica
			//2) seleccionó cualquier otro curso --> se habilita la última opcion de modulos que corresponde a solo visualizar el contenido creado por un administrador
			else if (this.usuario.rol == "Estudiante") {
				esadmin = false;
			} else {
				esadmin = false;
			}

			return esadmin;
		}
	}
});
