/* eslint-disable no-undef */
/*jshint esversion:8 */

parasails.registerPage("puntaje-estudiante", {
	//  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	data: {
		//…
		estudiante: null,
		intentosEvaluacion: null,
		breadcrumb: [{ id: "", texto: "Estudiantes", enlace: "#" }],

		cursoSeleccionado: "0",
		estudiantesConSusIntentos: [],
		estudiantesConSusIntentosQuickSort: null,
		nombreCursoSeleccionado: ""
	},

	//  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
	//  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
	//  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
	beforeMount: function() {
		// Attach any initial data from the server.
		_.extend(this, SAILS_LOCALS);
		this.estudiante = SAILS_LOCALS.estudiante;
		// this.intentosEvaluacion = SAILS_LOCALS.intentosEvaluacion;
		this.estudiantesConSusIntentos = SAILS_LOCALS.estudiantesConSusIntentos;
	},
	mounted: async function() {
		//…
	},

	//  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	methods: {
		clickPuntuacion() {
			if (this.cursoSeleccionado !== "0") {
				//Siempre debe existir un curso, no es posible acceder hasta esta ventana sin pasar por la seleccion de un curso
				if (this.usuario.nombre != "Visitante") {
					axios({
						url: "/puntuacion-estudiante",
						method: "get",
						params: {
							cursoId: this.cursoSeleccionado,
							estudianteId: this.estudiante.id
						}
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
						})
						.catch(err => {
							swal({
								icon: "error",
								title: "Error!, contacto con el administrador del sistema",
								text: `${err}`,
								showConfirmButton: true,
								timer: 2000
							});
						});
				} else {
					swal({
						icon: "warning",
						title: "No puede acceder a esta información como usuario visitante",
						text: `${err}`,
						showConfirmButton: true,
						timer: 2000
					});
				}
			}
		},

		definirGraficoPuntuacion() {
			var labels = [];

			var datasetData = [];
			let contadorEvaluaciones = 0;
			let limiteEvaluaciones = 30;

			this.estudiante.cursos.forEach(curso => {
				if (curso.id == this.cursoSeleccionado) {
					this.nombreCursoSeleccionado = "Curso: " + curso.nombre;
				}
			});
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
							label: this.nombreCursoSeleccionado,
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
		devuelveFecha(fechaIntento) {
			let fi = new Date(fechaIntento);
			let fecha =
				fi.getDate() +
				"/" +
				fi.getMonth() +
				"/" +
				fi.getFullYear() +
				" " +
				fi.getHours() +
				":" +
				fi.getMinutes();
			return fecha;
		}
	},
	computed: {
		intentoEvaluacionReversa() {
			let intentosReversa = [];
			if (this.intentosEvaluacion) {
				if (this.intentosEvaluacion.length > 0) {
					intentosReversa = [...this.intentosEvaluacion.slice().reverse()];
				}
			}

			return intentosReversa;
		}
	}
});

/**
 *
 *
 *
 *
 *

      this.estudiante.cursos.forEach(curso => {
        if (curso.id == this.cursoSeleccionado) {
          datasetLabel = "Curso: " + curso.nombre;
        }
      });

      this.intentosEvaluacion.forEach(element => {
        // con un contador limitar el número de evaluaciones que se muestran, para no sobrecargar el gráfico, solo se muestran 30 evaluaciones
        if (element.curso == this.cursoSeleccionado) { // solo recorre los intentos de evaluacion del curso seleccionado
          contadorEvaluaciones += 1;
          if (contadorEvaluaciones <= limiteEvaluaciones) {
            // convierto la fecha de tipo Datetime a date
            let fechaUltimoAcceso = new Date(element.createdAt);
            let fecha = fechaUltimoAcceso.getDate() + "/" + fechaUltimoAcceso.getMonth() + "/" + fechaUltimoAcceso.getFullYear();
            // Agrego al arreglo de etiquetas, la fecha concatenada con el nombre del submodulo al uqe pertenece la evaluacion
            labels.push(fecha + " " + element.submodulo.nombreSubmodulo);
            datasetData.push(element.evaluacion.puntosObtenidos);
          }



        }

      });


 */
