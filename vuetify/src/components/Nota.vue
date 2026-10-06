<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const notas = JSON.parse(localStorage.getItem("notas")) || [];
const nota = notas.find((nota) => nota.id === id);
const titulo = ref(nota ? nota.title : "");
const descripcion = ref(nota ? nota.description : "");
const estado = ref(false);
const dialog = ref(false);
const dialog2 = ref(false);

function changeNota() {
  const notas = JSON.parse(localStorage.getItem("notas")) || [];

  for (let i = 0; i < notas.length; i++) {
    if (notas[i].id === id) {
      notas[i].title = titulo.value;
      notas[i].description = descripcion.value;
      notas[i].estate = estado.value
      break;
    }
  }
  dialog2.value = false;
  localStorage.setItem("notas", JSON.stringify(notas));
  router.push("/");
}

function deleteNota() {
  const notas = JSON.parse(localStorage.getItem("notas")) || [];
  for (let i = 0; i < notas.length; i++) {
    if (notas[i].id === id) {
      notas.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("notas", JSON.stringify(notas));
  dialog.value = false;
  router.push("/");
}
</script>