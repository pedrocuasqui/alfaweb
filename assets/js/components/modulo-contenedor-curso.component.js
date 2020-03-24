/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerComponent("modulo-contenedor-curso", {
	props: {
		// tituloContenido: String,

		// descripcionObjeto: [String],
		navegarAtras: {
			type: String,
			required: false,
			description: "la ruta del modulo anterior"
		},
		navegarSiguiente: {
			type: String,
			required: false,
			description: "la ruta del modulo siguiente"
		},
		breadcrumb: {
			type: Array,
			required: false
		},
		curso: {
			type: Object,
			required: true //es necesario para poder cargar el menu lateral
			// description:'parametro de barra de navegacion lateral'
		},
		objetoSeleccionado: {
			type: Object,
			// required: true,//no necesario para señalar el modulo o submodulo seleccionado en el menu lateral porque el menu ya contiene su definicion por defecto
			default: () => {
				return {
					id: "1",
					nombreModulo: "crearModulo",
					rol: "Administrador"
				};
			}
			// description:'parametro de barra de navegacion, tambien se usa la descripcion cuando el objeto seleccionado es un modulo o submodulo'
		},
		tituloTemporal: {
			type: String,
			required: false,
			default: () => {
				return "";
			}
			// description:'Se debe enviar cuando se crea un modulo o submodulo para reemplzar al titlo del modulo o submodulo'
		},
		usuario: {
			type: Object,
			default: () => {
				return { nombre: "Visitante", rol: "Estudiante", id: "1" };
			}
		},
		crearSubmodulo: false, //variable usada solo cuando se crea un nuevo submodulo para darle estilos de seleccionado
		mostrarIconoRepetir: false,

		adminCreandoModuloSubmodulo: {
			type: Boolean,
			required: false,
			default: () => {
				return false;
			}
		},
		progreso: {
			type: Object,
			default: () => {
				return {
					puntos: 0,
					nivel: 0, //modulo 1
					medalla: "novato", //medalla mas basica
					tiempoMaximoPorPregunta: 30, //en segundos por defecto
					evaluacion: null
				};
			},
			description: "puntaje, nivel y progreso (medalla) actuales"
		}
	},
	data: function() {
		return {
			campoNombre: null,
			nombre: null,
			evIndividual: false,
			mostrarPlay: true,
			pausado: false,
			sonido: null,
			silenciarGeneral: false, //el audio est'a activado,
			p: null,
			usuariosConectados: []
		};
	},
	mounted() {
		window.sonido = null;
		window.sonido = window.speechSynthesis;
		// se conecta a sockets de Sails js
		this.unirseSalaChat();
	},

	template: /*template*/ `
<div class="div-contenido container-fluid"  v-cloak>
    <div class="row" id="div-cabecera"  >
        <div class="col-sm-8" id="breadcrumbText" ref="printBreadcrumb">
            <modulo-barra-nav :breadcrumb="breadcrumb" :usuario="usuario"></modulo-barra-nav>
        </div>
    	<div class="col-sm-2">
            <img class="imagen_polhibou" src="/images/svg/iconoPolhibou.svg" alt="Logo Polhibou"  />
        </div>
        <div class="col-sm-2">

              <!--ESTE PRIMER CONTENEDOR SE USA PARA LOS SUBMODULOS-->
              <modulo-panel-derecho  v-if="objetoSeleccionado.nombreSubmodulo" :usuario="usuarioRecibido" @evaluacion-individual="evaluacionIndividual" :admin-creando-modulo-submodulo="adminCreandoModuloSubmodulo" :puntaje-actual="progreso.puntos" :nivel-actual="progreso.nivel" :total-niveles="progreso.totalNiveles" :medalla-actual="progreso.medalla" :porcentaje-avance="progreso.porcentajeAvance" :curso="curso" :objeto-seleccionado="objetoSeleccionado" :usuarios-conectados.sync="usuariosConectados">
        	 <template >
              <!--el scope de modulo-contenedor-curso funciona en el contenido que se envia dentro de modulo-panel-derecho, desde aqui no se puede acceder al scope de modulo-panel-derecho-->
              <div>
                  <a v-if="silenciarGeneral" @click="clickReproducirGeneral" title="Reproducir" ><i class="fas fa-volume-mute"></i></a>
                  <a v-else @click="clickSilenciarGeneral" title="Silenciar Todo " ><i class="fas fa-volume-up"></i></a>
                  <a @click="clickImprimir" title="Imprimir contenido"><i class="fas fa-print"></i></a>
              </div>
              </template>

          </modulo-panel-derecho>
          <!--EL SIGUIENTE CONTENEDOR SE USA PARA LOS MODULOS, solo se diferencian en que los modulos no reciben eventos de evaluacion-->
          <modulo-panel-derecho  v-else :usuario="usuarioRecibido" :admin-creando-modulo-submodulo="adminCreandoModuloSubmodulo"  :puntaje-actual="progreso.puntos" :nivel-actual="progreso.nivel" :total-niveles="progreso.totalNiveles" :medalla-actual="progreso.medalla" :porcentaje-avance="progreso.porcentajeAvance"
          :curso="curso" :usuarios-conectados.sync="usuariosConectados">
              <template >
              <!--el scope de modulo-contenedor-curso funciona en el contenido que se envia dentro de modulo-panel-derecho, desde aqui no se puede acceder al scope de modulo-panel-derecho-->
                  <div>
                  <a v-if="silenciarGeneral" @click="clickReproducirGeneral" title="Reproducir" ><i class="fas fa-volume-mute"></i></a>
                  <a v-else @click="clickSilenciarGeneral" title="Silenciar Todo" ><i class="fas fa-volume-up"></i></a>
                  <a @click="clickImprimir" title="Imprimir contenido"><i class="fas fa-print"></i></a>
                  </div>
              </template>

          </modulo-panel-derecho>



        </div>
    </div>

    <!-- Primera fila -Titulo del contenido -->
    <div class="row" id="div-body">
        <!-- columna izquierda -->
        <div class="col-sm-1 col-izquierda">
            <modulo-side-var-menu :usuario="usuarioRecibido" :curso="curso" :objeto-seleccionado="objetoSeleccionado" :crear-submodulo="crearSubmodulo" ></modulo-side-var-menu>
        </div>
        <div class="col-sm-11" id="columna-contenido-lateral">
            <div class="row fila-principal">
                <!-- Columna central -->
                <div class="col-sm-11 col-central">
                    <div class="row cabecera-contenido-central">

                        <!--"navegacion-atras"-->
                        <div class="col-auto" v-if="navegarAtras">
                            <template v-if="objetoSeleccionado.nombreModulo">
                                <a key="link" :href="navegarAtras" @click="clickStop" title="Tema anterior"> <i class="fas fa-chevron-left fa-3x"></i> </a>
                            </template>
                            <template v-else>

                                <a v-if="!evIndividual" key="link" :href="navegarAtras" @click="clickStop" title="Tema anterior"> <i class="fas fa-chevron-left fa-3x"></i> </a>
                                <a v-else  key="ev" title="Ver Contenido" @click.stop="evaluacionIndividual('contenido')"> <i class="fas fa-chevron-left fa-3x"></i> </a>
                            </template>
                        </div>


                        <div class="col" id="titulo-modulo">
                        <h2 v-if="tituloTemporal!=''">{{ tituloTemporal}}</h2>
                        <h2 v-else-if="objetoSeleccionado.nombreModulo">{{ objetoSeleccionado.nombreModulo}}</h2>
                        <h2 v-else-if="objetoSeleccionado.nombreSubmodulo">{{ objetoSeleccionado.nombreSubmodulo}}</h2>
                        </div>

                        <!--REPETIR LA EVALUACION-->
                        <div v-if="mostrarIconoRepetir" class="col-auto">
                            <a  @click="intentarNuevamente" title="Repetir reto"><i class="fas fa-redo-alt fa-3x"></i> </a>
                        </div>



                         <div id="navegarSiguiente" class="col-auto" v-if="navegarSiguiente">
                         <!--Estoy en un módulo, no se pasa a evaluación-->
                            <template v-if="objetoSeleccionado.nombreModulo">
                                <a  key="siguiente"  :href="navegarSiguiente" title="Siguiente tema" @click="clickStop" ><i class="fas fa-chevron-right fa-3x"></i> </a>
                            </template>
                            <!--Estoy en un submodulo, paso a evaluacion antes de pasar a otro tema-->
                            <template v-else>
                            <!--navegacion-siguiente-->
                                <a v-if="navegarSiguiente!='/'" key="siguiente"  :href="navegarSiguiente" title="Siguiente tema" @click="clickStop" ><i class="fas fa-chevron-right fa-3x"></i> </a>
                                <!--navegacion-evaluacion-->
                                <!--<a v-else key="evaluacion" title="Evaluación" @click.stop="evaluacionIndividual"><i class="fas fa-chevron-right fa-3x"></i> </a> --><!--por defecto se muestra este boton-->
                            </template>
                        </div>

                    </div>

                    <div class="row cuerpo-contenido-central" >


                                <div class="contenedor-slot-principal" ref="printContenidoCentral">
                                    <!--El javascript que reproduce el siguiente audio se encuentra en cada documento javascript de cada modulo y submodulo del curso informaticaBasica, tambien se puede invocar desde cuanlquier contenido dentro de este componente-->
                                    <audio id="audioMouseOver" src="/audio/mouseOverElementos/zapsplat_multimedia_game_designed_water_drip_onto_surface_004_26337.mp3"></audio>
                                    <slot></slot>
                                </div>

                    </div>
                    <div class="row pie-contenido-central" >
                        <div  id="avatar">
                                <img  @click="clickAsistenteBuho" src="/images/svg/buho_original_1.svg" alt="Avatar adulto mayor">
                                <span v-if="!evIndividual">
                                <a v-if="mostrarPlay" id="icono_play" @click="clickReproducir" title="Reproducir" class="audioTag"><i class="fas fa-play"></i></a>
                                <a v-else id="icono_pause"  @click="clickPause" title="Pausar" class="audioTag"><i class="fas fa-pause"></i></a>
                                <a id="icono_stop" @click="clickStop" title="Parar" class="audioTag"><i class="fas fa-stop"></i></a>
                                </span>
                        </div>
                      <div id="descripcion-objeto" ref="printContenidoDescripcion"  v-if="!evIndividual">
                        <h6 v-if="existeDescripcion  && tituloTemporal==''" class="typography-line"><span>{{objetoSeleccionado.descripcion}}</span></h6>
                      </div>
                    </div>

                </div>
                <!-- columna derecha -->
                <div class="col-sm-1 col-derecha" >


                </div>
            </div> <!-- fin fila de contenido central y barra lateral derecha -->
        </div> <!--fin columna contenido central y barra lateral derecha-->


    </div>

</div>


    `,

	methods: {
		clickAsistenteBuho() {
			this.$emit("click-asistente-buho");
		},
		intentarNuevamente() {
			this.$emit("intentar-nuevamente");
		},
		evaluacionIndividual(contenido) {
			//este metodo se usa para regresar desde la evaluacion hacia el contenido usando la fecla REGRESAR
			if (this.objetoSeleccionado.nombreSubmodulo) {
				if (this.objetoSeleccionado.evaluacion) {
					//Si existe evaluación
					if (contenido == "contenido") {
						//si se envia algo como par'ametro, entonces se retorna
						this.evIndividual = false;
					} else {
						//si no se pasa nada como parametro y ademas el objeto seleccionado  NO es modulo se muestra la evaluacion

						this.evIndividual = true;
					}
					this.$emit("evaluacion-individual", contenido);
				} else {
					var r = confirm(
						"No existe evaluación para este tema. \n ¿Deseas continuar al siguiente tema?"
					);
					if (r == true) {
						location.assign(this.navegarSiguiente);
						this.objetoSeleccionado.descripcion = ""; // se vacía la descripción porque ingresa  a una evaluación
					} else {
					}
				}
			} else {
				swal({
					icon: "info",
					title: "La evaluación se realiza solo en los submódulos",
					showConfirmButton: true,
					timer: 2000
				});
			}
			this.clickStop();
		},
		clickPause() {
			window.sonido.pause();
			this.pausado = true;
			window.mostrarPlay = true;
			this.mostrarPlay = true;
		},
		clickStop() {
			window.sonido.cancel();
			window.mostrarPlay = true;
			this.mostrarPlay = true;
			this.pausado = false;
		},
		clickReproducir() {
			this.mostrarPlay = false;
			if (this.pausado) {
				window.sonido.resume();
			} else {
				// var voices = window.sonido.getVoices();
				var msg = new SpeechSynthesisUtterance(
					this.objetoSeleccionado.descripcion
				);
				// msg.voice = voices[7]; // Note: some voices don't support altering params
				// msg.voice =  window.sonido.getVoices().filter(function(voice) { return voice.name == 'Whisper'; })[0];
				msg.onend = () => {
					this.clickStop();
					// console.log(
					// 	"Utterance has finished being spoken after " +
					// 		event.elapsedTime +
					// 		" milliseconds."
					// );
				};
				window.sonido.speak(msg);
			}

			// Detecta las voces soportadas por speechSynthesis

			/* speechSynthesis.getVoices().forEach(function(voice) {
        console.log(voice.name, voice.default ? voice.default : "");
      }); */
		},
		clickReproducirGeneral() {
			this.silenciarGeneral = false;
			$(".audioTag").show();
			$(".audioTag").show();
			$("#audioMouseOver").attr(
				"src",
				"/audio/mouseOverElementos/zapsplat_multimedia_game_designed_water_drip_onto_surface_004_26337.mp3"
			);
			$("#audioModalAbrir").attr(
				"src",
				"/audio/zapsplat_multimedia_game_sound_retro_blip_026_29558.mp3"
			);
			$("#audioModalCerrar").attr(
				"src",
				"/audio/zapsplat_multimedia_game_sound_retro_blip_015_29547.mp3"
			);
		},
		clickSilenciarGeneral() {
			this.silenciarGeneral = true;
			this.clickStop();
			$(".audioTag").hide();
			$(".audioTag").hide();
			$("audio").hide();
			$("audio").attr("src", "");
		},
		clickImprimir() {
			this.clickStop(); //ultima linea editada en sprint 6
			// window.print();
			//fuente de este codigo: https://www.youtube.com/watch?v=pePlEaUQEbc
			//para ver como funciona this.$refs revisar la siguiente fuente https://vuejs.org/v2/api/#ref
			var contenidoBreadcrumb = this.$refs.printBreadcrumb; //https://vuejs.org/v2/api/#ref
			var contenidoCentral = this.$refs.printContenidoCentral;
			var contenidoDescripcion = this.$refs.printContenidoDescripcion;
			var newWin = window.open(""); //abre una variable para escribir sobre ella
			newWin.document.write('<h1>Sistema "alfaweb" EPN-FIS</h1>');
			newWin.document.write("<h2>Contenido</h2>");
			newWin.document.write(contenidoBreadcrumb.outerHTML);
			newWin.document.write(contenidoCentral.outerHTML);
			newWin.document.write("<h2>Descripción</h2>");
			newWin.document.write(contenidoDescripcion.outerHTML);
			newWin.document.write(
				'<h5>Sistema "alfaweb" http://www.epn.edu.ec autor: EPN-FIS-Pedro Cuasqui</h5>'
			);
			newWin.print();
			newWin.close();
			newWin.document.write("<h6>http://www.epn.edu.ec </h6>");
		}
	},
	computed: {
		existeDescripcion() {
			var existe = false;
			if (this.objetoSeleccionado.descripcion) {
				existe = true;
			}

			return existe;
		},
		/**
		 * Se establece el tipo de usuario en caso de ser null
		 */
		usuarioRecibido() {
			var usuarioR = this.usuario;
			if (!this.usuario) {
				//si el usuario es null o undefined
				usuarioR = { nombre: "Visitante", rol: "Estudiante" };
			}
			return usuarioR;
		}
	}
});
