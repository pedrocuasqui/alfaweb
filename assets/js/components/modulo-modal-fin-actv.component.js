parasails.registerComponent("modulo-modal-fin-actv", {
	props: ["conteoAciertos", "elementos", "actividadFinaliza"],
	data() {},

	template: /*template */ `
    <div v-show="actividadFinaliza" class="modal fade" id="actividadFinalizada" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Has finalizado, has obtenido {{conteoAciertos}} aciertos de {{elementos.length}}
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar/</button> -->
            <!-- como funciona data-dismiss: Basically it's just finding the elements that have the attribute of data-dismiss and the value of modal. Upon click it will hide these elements.
  fuente: https://stackoverflow.com/questions/34627271/understanding-how-data-dismiss-attribute-works-in-bootstrap -->
            <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
          </div>
        </div>
      </div>
    </div>`,
	methods: {}
});
