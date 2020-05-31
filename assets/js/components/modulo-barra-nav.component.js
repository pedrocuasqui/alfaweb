/*jshint esversion:8 */
parasails.registerComponent("modulo-barra-nav", {
	props: {
		breadcrumb: {
			type: Array,
			required: true,
			default: () => {
				return [{ nombreModulo: "", id: 1, enlace: "" }];
			}
		},
		usuario: {
			type: Object,
			required: false,
			default: () => {
				return { nombre: "Visitante", id: 1, rol: "Estudiante" };
			}
		}
	},
	data() {
		return {
			isAlfaWeb: false,
			cursoAlfaWeb: Object,
			breadcrumbTieneValores: true
		};
	},
	beforeMount() {
		if (this.breadcrumb[0].nombre) {
			// si existe la propiedad nombre significa que se ha pasado un objeto al breadcrumb
			if (this.breadcrumb[0].nombre != "") {
				//verifica si el objeto tiene valores
				this.breadcrumbTieneValores = true;
				if (this.breadcrumb[0].nombre == "Alfabetización informática") {
					//el primer elemento siempre sera el curso, por tanto se verifica si el curso es alfabetizacion informatica
					this.isAlfaWeb = true;
					this.cursoAlfaWeb = this.breadcrumb.shift(); //retorna el curso alfaweb
				}
			}
		} else {
			//if (this.breadcrumb[0].enlace==''){
			this.breadcrumbTieneValores = false;
		}
	},
	mounted() {},

	template: /*template */ `  
    <div id="breadcrumb">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
        <!--EL PRIMER ELEMENTO DEL BREADCRUMB ES SIEMPRE EL HOME-->
          <template v-if="esAdmin">  <!--si esta logueado ADMIN-->
            <li  key="homeAdmin" class="breadcrumb-item"><a href="/administrar-home" title="Home"><a class="textoOculto"  href="/administrar-home">home</a><i class="fas fa-home fa-lg" > </i></a></li>
          </template>
          <template v-else > <!--si esta logueado cualquier OTRO USUARIO-->
            <li v-if="breadcrumbTieneValores" key="homeEst" class="breadcrumb-item"><a href="/" title="Home"><a class="textoOculto"  href="/inicio">home</a><i class="fas fa-home fa-lg" > </i></a></li>

            <li v-else key="homeEst" class="breadcrumb-item"><a href="/" title="Home"><a class="textoOculto"  href="/inicio">home</a><i class="fas fa-home fa-lg" > </i></a></li>
					</template>
					<!--A CONTINUACION SE INSERTAN LOS ELEMENTOS ENVIADOS COMO BREADCRUMB-->
          <template v-if="isAlfaWeb" > <!-- el curso es alfaweb -->
            <li  key="rutaAlfaweb" class="breadcrumb-item"> <a :href="'/indice-estudiante/?cursoId='+cursoAlfaWeb.id"> {{cursoAlfaWeb.nombre}}</a></li>
            <li v-if="breadcrumbTieneValores" class="breadcrumb-item" v-for="item in breadcrumb" key="breadAlfa">
              <a v-if="item.nombre"  key="inicio" :href="item.nombre=='Cursos'? '/inicio': item.enlace">{{item.nombre}}</a>
              <a v-if="item.nombreModulo"  key="moduloAlfa" :href="'/contenido-alfaweb/?enlace='+item.enlace">{{item.nombreModulo}}</a>
              <a v-if="item.nombreSubmodulo" key="submoduloAlfa" :href="'/contenido-alfaweb/?enlace='+item.enlace">{{item.nombreSubmodulo}}</a>
            </li>
          </template>
          <template v-else-if="esAdmin" > <!-- el curso es alfaweb -->
              <li v-if="breadcrumbTieneValores" class="breadcrumb-item" v-for="item in breadcrumb" key="breadAdmin">
                <a v-if="item.nombre && !item.nombreModulo && !item.nombreSubmodulo"  key="inicio" :href="item.nombre=='Cursos'? '/inicio': '/administrar-indice/?cursoId='+item.id">{{item.nombre}}</a>
                <!--<a v-if="item.nombreCurso"  key="cursoAdmin" :href="'/administrar-indice/?cursoId='+item.id">{{item.nombreCurso}}</a>-->
                <a v-if="item.nombreModulo"  key="moduloAdmin" :href="'/administrar-contenido/?objetoId='+item.id+'&tipoContenido=Modulo'">{{item.nombreModulo}}</a>
                <a v-if="item.nombreSubmodulo" key="submodulo" :href="'/administrar-contenido/?objetoId='+item.id+'&tipoContenido=Submodulo'">{{item.nombreSubmodulo}}</a>
            </li>
          </template>
          <template v-else> <!--el curso es cualquier otro curso -->
            <li v-if="breadcrumbTieneValores" class="breadcrumb-item" v-for="item in breadcrumb" key="breadEstudiante">
                <a v-if="item.nombre && !item.nombreModulo && !item.nombreSubmodulo"  key="inicio" :href="item.nombre=='Cursos'? '/inicio': item.enlace">{{item.nombre }}</a>
                <!--<a v-if="item.nombreCurso"  key="curso" :href="'/indice-estudiante/?cursoId='+item.id">{{item.nombreCurso}}</a>-->
                <a v-if="item.nombreModulo"  key="modulo" :href="'/interfaz-modulos/?objetoId='+item.id+'&tipoContenido=Modulo'">{{item.nombreModulo}}</a>
                <a v-if="item.nombreSubmodulo" key="submodulo" :href="'/interfaz-modulos/?objetoId='+item.id+'&tipoContenido=Submodulo'">{{item.nombreSubmodulo}}</a>
              </li>
          </template>
        </ol>
      </nav>
    </div>`,
	methods: {},
	computed: {
		esAdmin() {
			let esadmin = false;
			//si el usuario es administrador pero no ha seleccionado el curso de informatica basica, se le da permiso de administrador
			if (
				(this.usuario.administrador || this.usuario.tutor) &&
				this.isAlfaWeb == false
			) {
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
