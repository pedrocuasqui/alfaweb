parasails.registerComponent("modulo-modal-ini-actv", {
	props: [
		"tituloContenido",
		"descripcionActividad",
		"enlaceSiguienteActividad"
	],
	data() {},

	template: /*template */ `<div class="modal fade" id="modalInicial" tabindex="-1" role="dialog" aria-labelledby="tituloModalInicial"
    aria-hidden="true" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="tituloModalInicial">{{tituloContenido}}</h5>

        </div>
        <div class="modal-body">
          {{descripcionActividad}}
        </div>
        <div class="modal-footer">
          <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar/</button> -->
          <a role="button" class="btn btn-secondary" :href="enlaceSiguienteActividad">Omitir actividad</a>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="empezarEvaluacion">Empezar</button>
        </div>
      </div>
    </div>
  </div>`,
	methods: {
		empezarEvaluacion() {
			this.$emit("empezar-evaluacion");
		}
	}
});
