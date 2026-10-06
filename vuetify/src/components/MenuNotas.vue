<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const notas = ref([]);

const titulo = ref("");
const descripcion = ref("");
const estado = ref(false);

const mostrarFormulario = ref(false);

onMounted(() => {
  const datosGuardados = localStorage.getItem("notas");

  if (datosGuardados) {
    notas.value = JSON.parse(datosGuardados);
  }
});

function crearNota() {
  if (titulo.value === "") {
    return;
  }

  let nuevoId = 1;

  for (let i = 0; i < notas.value.length; i++) {
    if (notas.value[i].id >= nuevoId) {
      nuevoId = notas.value[i].id + 1;
    }
  }

  const nuevaNota = {
    id: nuevoId,
    title: titulo.value,
    description: descripcion.value,
    estate: estado.value,
  };

  notas.value.push(nuevaNota);

  localStorage.setItem("notas", JSON.stringify(notas.value));

  titulo.value = "";
  descripcion.value = "";
  estado.value = false;
  mostrarFormulario.value = false;
}

function abrirNota(id) {
  router.push(`/nota/${id}`);
}


</script>

