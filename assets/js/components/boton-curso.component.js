parasails.registerComponent('boton-curso', {
    props: {

        curso: Object,
    },
    data() {
        return {
            editarCurso: false,
            formErrors:{},
        };
    },
    mounted() {
        var _this = this;
        document.getElementById(this.curso.id).addEventListener("click", abrir = function () { _this.abrirCurso(_this.curso.id); }, false);
    },
    template://html
        `  
<div>
    <button :id="curso.id" type="button" class="btnCurso list-group-item list-group-item-action flex-column align-items-start">
    <!-- @click="abrirCurso(curso.id)"> -->
    <div class="d-flex w-100 justify-content-between">
      <input :id="'input'+curso.id" v-if="editarCurso" type="text" v-model="curso.nombre" :class="[formErrors.nombre ? 'is-invalid' : '']">
      <h5 v-else class="mb-1">{{curso.nombre}}</h5>
      <div class="invalid-feedback" v-if="formErrors.nombre">El campo no puede estar vacío</div>
      <!--span hace que los contenidos se presenten en linea-->
      <span>
        <a v-if="editarCurso" @click.stop="validarCampos()" title="Editar Curso"><i
            class="fas fa-save"></i></a>
        <a v-else @click.stop="mostrarEditarCurso(curso.id)" data-placement="top" title="Editar Curso"> <i
            class="fas fa-edit"></i> </a>
        <a data-toggle="modal" data-target="#modalConfirmaEliminar"
          @click.stop="$emit('selecciona-curso-eliminar',curso)" data-placement="top" title="Eliminar Curso"><i
            class="fas fa-trash-alt"></i></a>
      </span>
    </div>
    <input v-if="editarCurso" type="text" v-model="curso.descripcion">
    <p v-else class="mb-1">{{curso.descripcion}}</p>
    <div class="invalid-feedback" v-if="formErrors.descripcion">El campo no puede estar vacío</div>
  </button>
</div>
    `,
    methods: {
        mostrarEditarCurso(cursoId) {

            console.log('COMPONENTE' + cursoId);
            this.editarCurso = true;
            // var abrir= function(){};
            console.log(document.getElementById(cursoId));
            document.getElementById(cursoId).removeEventListener("click", abrir, false);

        },
        validarCampos() {
            this.formErrors = {};

            if (this.curso.nombre == '') {
                this.formErrors.nombre = true;
            }
            if (this.curso.descripcion == '') {
                this.formErrors.descripcion = true;
            }

            if (Object.keys(this.formErrors).length > 0) {
                return false;
            } else {
                //   this.guardarCurso(curso);  
                this.editarCurso=false;
                this.$emit('guardar-curso', this.curso);
            }


        }
        ,
        abrirCurso(cursoId) {
            window.location.href = '/administrar-indice/?cursoId=' + cursoId;

        },
        seleccionaCursoEliminar(curso){
            this.$emit('selecciona-curso-eliminar', curso);
        }

    }

});