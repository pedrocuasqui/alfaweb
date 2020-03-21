/* eslint-disable no-undef */
/*jshint esversion:8 */
parasails.registerComponent("modulo-side-var-menu", {
	props: {
		objetoSeleccionado: {
			type: Object,
			default: () => {
				return {
					id: "1",
					nombreModulo: "crearModulo",
					rol: "Administrador"
				};
			}
		},
		curso: {
			type: Object,
			required: true
		},
		usuario: {
			type: Object,
			default: () => {
				return { nombre: "Admin", rol: "Administrador" };
			}
		},
		posicionSeleccionada: null,
		crearSubmodulo: false
	},
	data() {
		return {
			cursoInformatica: false,
			moduloEvaluacion: "", //nombre del modulo que se pasa como parametro a la funcion de mostrar modal
			indiceModulo: 0, //el indice del modulo que se pasa como parametro a la funcion de mostrar modal,
			mostrarTexto: false
		};
	},
	mounted() {
		if (this.curso.nombre == "Alfabetización informática") {
			this.cursoInformatica = true;
		}
	},
	//html
	template: /*template */ `  
    <div >
  
  <!-- Modals -->
    <!-- Lista de evaluaciones -->
    <div class="modal fade " id="modalEnlaceEvaluacion" tabindex="-1" role="dialog" aria-labelledby="etiquetaModalEnlaceEvaluacion"
        aria-hidden="true">
        <div class="modal-dialog modal-l" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="etiquetaModalEnlaceEvaluacion">Evaluación {{moduloEvaluacion}}</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">    
                    <div class = "container">
                        
                        <div class="list-group">
                      	 		<!--Para curso informática básica-->
                            <template v-if="cursoInformatica">
															<template v-for="submodulo in curso.modulos[indiceModulo].submodulos">
															<a v-if="submodulo.evaluacion"  :href="'/contenido-alfaweb/?enlace='+submodulo.enlace+'&mostrarEvaluacion=true'" :key="submodulo.id" class="list-group-item list-group-item-action flex-column align-items-start ">
															
																	<div class="d-flex w-100 justify-content-between">
																		<h6 class="mb-1">{{submodulo.nombreSubmodulo}}</h6>
																	</div>
																	<p class="mb-1" v-if="submodulo.evaluacion.tipo =='Cuestionario'"><small>Tipo: {{submodulo.evaluacion.tipo}} (Lea la pregunta y escoja la respuesta correcta)</small></p>
																	<p class="mb-1" v-else="submodulo.evaluacion.tipo =='Emparejamiento'"><small>Tipo: {{submodulo.evaluacion.tipo}} (Empareje el término con el concepto correcto)</small></p>
																	<p class="mb-1" ><small>Ultima evaluación: {{ultimaEvaluacion(submodulo.id)}}</small></p>
																	<p class="mb-1" ><small>Aprobada: {{apruebaUltimaEvaluacion(submodulo.id)}}</small></p>
															</a> 
															<a v-else :key="submodulo.id" class="list-group-item list-group-item-action flex-column align-items-start ">   
																	<div class="d-flex w-100 justify-content-between">
																			<h6 class="mb-1">{{submodulo.nombreSubmodulo}}</h6>
																	</div>
																	<p class="mb-1" >Evaluación no disponible</p>
															</a> 
															</template>
                            </template>
														<!--para curso que no es informatica basica-->
                            <template v-else-if="curso.modulos.length !=0">
															<template v-for="submodulo in curso.modulos[indiceModulo].submodulos">
															<a v-if="submodulo.evaluacion"  :href="'/interfaz-modulos/?objetoId='+submodulo.id+'&tipoContenido=Submodulo&mostrarEvaluacion=true'" :key="submodulo.id" class="list-group-item list-group-item-action flex-column align-items-start " :class="[{evaluacion_deshabilitada:!submodulo.evaluacion.publicada}]">  
																	<div class="d-flex w-100 justify-content-between">
																		<h6 class="mb-1">{{submodulo.nombreSubmodulo}}</h6>
																	</div>
																	<p class="mb-1" v-if="submodulo.evaluacion.tipo =='Cuestionario'"><small>Tipo: {{submodulo.evaluacion.tipo}} (Lea la pregunta y escoja la respuesta correcta)</small></p>
																	<p class="mb-1" v-else="submodulo.evaluacion.tipo =='Emparejamiento'"><small>Tipo: {{submodulo.evaluacion.tipo}} (Empareje el término con el concepto correcto)</small></p>
																	<p class="mb-1" ><small>Ultima evaluación: {{ultimaEvaluacion(submodulo.id)}}</small></p>
																	<p class="mb-1" ><small>Aprobada: {{apruebaUltimaEvaluacion(submodulo.id)}}</small></p>
																	<p v-if="!submodulo.evaluacion.publicada"> EVALUACIÓN DESHABILITADA </p>
															</a> 
															<a v-else :key="submodulo.id" class="list-group-item list-group-item-action flex-column align-items-start ">   
																	<div class="d-flex w-100 justify-content-between">
																			<h6 class="mb-1">{{submodulo.nombreSubmodulo}}</h6>
																	</div>
																	<p class="mb-1" >Evaluación no disponible</p>
															</a> 
															</template>
                            </template>
                        </div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

<!--BARRA LATERAL-->

    <div id="sidebar-menu"   @mouseover="desplegarSidebar()" @mouseleave="ocultarSidebar()">
				
		<div id="menuContenidos" >
			
        <span class="titulo_sidebar"><h6 class="col "> <img src="/images/otros/polibuho_transparent_icono.png" alt="polibuho"> <span :class="{ 'mostrar-texto':mostrarTexto}"> {{curso.nombre}}</span></h6>   
          
        </span>
			 <div v-if="esAdmin && !cursoInformatica">
        <!--PUBLICAR Y OCULTAR CURSO-->
            <a v-if="curso.publicado" @click.stop="ocultarCurso(curso.id)" data-placement="top" title="Ocultar Curso"> <i class="fas fa-lock-open pl-4"></i> </a>
            <a v-else @click.stop="publicarCurso(curso.id)" data-placement="top" title="Publicar Curso"> <i class="fas fa-lock pl-4"></i> </a> 
			 </div>
			<hr>
			 <!--dropdownModulo      : contenedor individual del modulo y sus submodulos-->
            <!--dropbtn-modulo      : el boton que contiene el nombre del modulo -->
            <!--dropdown-submodulo  : contenedor individual del submodulo -->
            <div v-for="(modulo, index) in curso.modulos" class="dropdownModulo" :key="modulo.id" >
                <!--MODULOS-->
                <!--ES ADMIN, PUEDE CREAR CURSO Y MODIFICARLOS, EXCEPTO EL CURSO INFORMATICA BASICA-->
                <a v-if="esAdmin" key="admin" class="btn btn-primary centrado_vertical dropbtn-modulo" :class="{'modulo-seleccionado':perteneceObjeto(modulo.id)}" :href="'/administrar-contenido/?objetoId='+modulo.id+'&tipoContenido=Modulo'" :style="colorModulo(modulo.id)"><i class="fas fa-cubes px-3"></i> <span :class="{ 'mostrar-texto':mostrarTexto}"> {{modulo.nombreModulo}}</span></a>
                <!--ES CURSO INFORMATICA, TODOS PUEDEN ACCEDER A EL PERO NADIE, NI EL ADMINISTRADOR ni ESTUDIANTE PUEDEn EDITARLO-->
                <a v-else-if="cursoInformatica" key="informatica" class="btn btn-primary centrado_vertical dropbtn-modulo" :class="{'modulo-seleccionado':perteneceObjeto(modulo.id)}" :href="'/contenido-alfaweb/?enlace='+modulo.enlace" :style="colorModulo(modulo.id)"> <i class="fas fa-cubes px-3"></i> <span :class="{ 'mostrar-texto':mostrarTexto}"> {{modulo.nombreModulo}}</span></a>
                <!--ES ESTUDIANTE Y HA INGRESADO A OTRO CURSO  QUE NO SEA INFORMATICA BASICA-->
                <a v-else key="estudiante" class="btn btn-primary centrado_vertical dropbtn-modulo" :class="{'modulo-seleccionado':perteneceObjeto(modulo.id)}" :href="'/interfaz-modulos/?objetoId='+modulo.id+'&tipoContenido=Modulo'" :style="colorModulo(modulo.id)"> <i class="fas fa-cubes px-3"></i><span :class="{ 'mostrar-texto':mostrarTexto}"> {{modulo.nombreModulo}}</span></a>

                <div :class="[perteneceObjeto(modulo.id) ? 'dropdown-submodulo':'dropdown-submodulo-deselect' ]">
                <!--SUBMODULOS-->
                    <template v-if="esAdmin"> 	
                        <div key="esAdmin">
                            <a  v-for="submodulo in modulo.submodulos" :href="'/administrar-contenido/?objetoId='+submodulo.id+'&tipoContenido=Submodulo'" :key="submodulo.id" :class="[submodulo.id==objetoSeleccionado.id? 'submodulo-seleccionado':'submodulo-deseleccionado']"><i class="fas fa-cube px-2"></i> <span :class="{ 'mostrar-texto':mostrarTexto}"> {{submodulo.nombreSubmodulo}}</span></a>
                         </div>
                    </template>
                    <template v-else-if="cursoInformatica">
                        <div key="esCursoInformatica">
                            <a  v-for="submodulo in modulo.submodulos" :href="'/contenido-alfaweb/?enlace='+submodulo.enlace" :key="submodulo.id" :class="[submodulo.id==objetoSeleccionado.id? 'submodulo-seleccionado':'submodulo-deseleccionado']"><i class="fas fa-cube px-2"></i><span :class="{ 'mostrar-texto':mostrarTexto}"> {{submodulo.nombreSubmodulo}}</span></a>
                            <a type="button" v-if="modulo.submodulos.length>0" @click="onClickShowModalEvaluacion(modulo.nombreModulo, index)" > <i class="fas fa-clipboard-check px-2"></i><span :class="{ 'mostrar-texto':mostrarTexto}"> Evaluación</span></a>
                         </div>
                    </template >
                    <template v-else >
                        <div key="noEsCursoInformatica">
                            <a  v-for="submodulo in modulo.submodulos"  :href="'/interfaz-modulos/?objetoId='+submodulo.id+'&tipoContenido=Submodulo'" :key="submodulo.id" :class="[submodulo.id==objetoSeleccionado.id? 'submodulo-seleccionado':'submodulo-deseleccionado']"> <i class="fas fa-cube px-2"></i><span :class="{ 'mostrar-texto':mostrarTexto}"> {{submodulo.nombreSubmodulo}}</span></a>
                            <a type="button" v-if="modulo.submodulos.length>0" @click="onClickShowModalEvaluacion(modulo.nombreModulo, index)" ><i class="fas fa-clipboard-check px-2"></i><span :class="{ 'mostrar-texto':mostrarTexto}"> Evaluación</span></a>
                        </div>
                    </template >
                    				<a type="button" v-if="habilitarEdicion" :href="'/view-crear-submodulo/?moduloId='+modulo.id" :class="[crearSubmodulo? 'submodulo-seleccionado':'']"><i class="fas fa-plus-circle px-2"></i><span :class="{ 'mostrar-texto':mostrarTexto}"> Agregar Submódulo</span> </a>
                </div>
            </div>
          <div v-if="habilitarEdicion" class="dropdownModulo" >
                <a type="button" class="btn btn-primary dropbtn-modulo" :href="'/view-crear-modulo/?cursoId='+curso.id" ><i class="fas fa-plus-circle px-3" ></i> <span :class="{ 'mostrar-texto':mostrarTexto}"> Agregar Módulo</span></a>
            </div> 
        </div> 

  
        
    </div>
    </div>`,
	methods: {
		onClickShowModalEvaluacion(moduloNombre, indice) {
			this.moduloEvaluacion = moduloNombre;
			this.indiceModulo = indice;
			$(() => {
				$("#modalEnlaceEvaluacion").modal("show");
			});
		},

		perteneceObjeto(moduloId) {
			var pertenece = false;
			if (
				this.objetoSeleccionado.id == moduloId ||
				this.objetoSeleccionado.modulo == moduloId
			) {
				pertenece = true;
			}
			return pertenece;
		},
		colorModulo(moduloId) {
			var estilo = {};
			if (
				this.objetoSeleccionado.id == moduloId ||
				this.objetoSeleccionado.modulo == moduloId
			) {
				estilo = { backgroundColor: "#d3b8d370" };
			}
			return estilo;
		},
		objetoPerteneceModulo() {
			let valor = false;
			//primera parte, se evalua que el objeto seleccionado sea un modulo y que sea el modulo del arreglo
			//la segunda parte se evalua si el objetoSeleccionado es un submodulo y su propiedad modulo corresponda con el modulo actual
			if (
				this.moduloId == this.objetoSeleccionado.id ||
				this.moduloId == this.objetoSeleccionado.modulo
			) {
				valor = true;
			}

			return valor;
		},
		publicarCurso(cursoId) {
			axios({
				url: `/publicar-curso/${cursoId}`,
				method: "PUT",
				data: { publicar: true }
			})
				.then(() => {
					this.curso.publicado = true;
					swal({
						icon: "success",
						title: "Curso publicado correctamente",

						showConfirmButton: true,
						timer: 2000
					});
				})
				.catch(err => {
					swal({
						icon: "error",
						title: "Error: no se ha podido publicar el curso",
						text: `${err}`,
						showConfirmButton: true,
						timer: 2000
					});
				});
		},
		ocultarCurso(cursoId) {
			this.curso.publicado = false;
			axios({
				url: `/publicar-curso/${cursoId}`,
				method: "PUT",
				data: { publicar: false }
			})
				.then(() => {
					this.curso.publicado = false;
					swal({
						icon: "info",
						title: "Se ha ocultado el curso a los estudiantes",
						showConfirmButton: true,
						timer: 2000
					});
				})
				.catch(err => {
					swal({
						icon: "error",
						title: "Error: intente más tarde",
						text: `${err}`,
						showConfirmButton: true
					});
				});
		},
		ultimaEvaluacion(submoduloId) {
			var fecha = "No realizada";
			let submodulo = null;
			if (this.usuario.ultimasEvaluaciones) {
				submodulo = this.usuario.ultimasEvaluaciones.find(submodulor => {
					return submodulor.id === submoduloId;
				});
				if (submodulo) {
					if (submodulo.intentosEvaluacion.length > 0) {
						let fechaUltimaEv = "01-01-1970";
						fechaUltimaEv = new Date(submodulo.intentosEvaluacion[0].createdAt);
						// let fecha= fechaUltimaEv.toString();
						fecha =
							fechaUltimaEv.getDate() +
							"/" +
							(fechaUltimaEv.getMonth() + 1) +
							"/" +
							fechaUltimaEv.getFullYear();
					}
				}
			}

			return fecha;
		},
		apruebaUltimaEvaluacion(submoduloId) {
			let submodulo = null;
			let aprueba = "NO";
			if (this.usuario.ultimasEvaluaciones) {
				submodulo = this.usuario.ultimasEvaluaciones.find(submodulor => {
					return submodulor.id === submoduloId;
				});
				if (submodulo) {
					if (submodulo.intentosEvaluacion.length > 0) {
						//Los intentos evaluacion estan ordenados en orden descendente por tanto la última evaluacion estará en la posicion 0
						if (submodulo.intentosEvaluacion[0].apruebaEvaluacion == 1) {
							aprueba = "SI";
						}
					} else {
						aprueba = "No aplica";
					}
				}
			}

			return aprueba;
		},
		numeroIntentosEvaluacion(submoduloId) {
			let submodulo = null;
			if (this.usuario.ultimasEvaluaciones) {
				submodulo = this.usuario.ultimasEvaluaciones.find(submodulor => {
					return submodulor.id === submoduloId;
				});

				return submodulo.intentosEvaluacion.length;
			} else {
				return 0;
			}
		},
		desplegarSidebar() {
			this.mostrarTexto = true;
		},
		ocultarSidebar() {
			this.mostrarTexto = false;
		}
	},
	computed: {
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
		},
		habilitarEdicion() {
			let edicionHabilitada = false;
			//si el usuario es administrador pero no ha seleccionado el curso de informatica basica, se le da permiso de administrador

			if (
				(this.usuario.administrador || this.usuario.tutor) &&
				this.cursoInformatica == false
			) {
				// if ((this.usuario.administrador || this.usuario.tutor) ) { //usar la linea anterior para restringir el acceso al curso informatica básica al administrador
				edicionHabilitada = true;
			}
			// si el usuario es estudiante entonces se le niega el permiso de administrador, asi que hay dos opciones
			//1) seleccionó curso 'Informática báscia' --> se habilita solo el curso informática básica
			//2) seleccionó cualquier otro curso --> se habilita la última opcion de modulos que corresponde a solo visualizar el contenido creado por un administrador
			else if (this.usuario.rol == "Estudiante") {
				edicionHabilitada = false;
			} else {
				edicionHabilitada = false;
			}

			return edicionHabilitada;
		},
		esAlfaweb() {}
	}
});
