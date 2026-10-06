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

const dialog = ref(false);

function changeNota() {
  const notas = JSON.parse(localStorage.getItem("notas")) || [];

  for (let i = 0; i < notas.length; i++) {
    if (notas[i].id === id) {
      notas[i].title = titulo.value;

      notas[i].description = descripcion.value;

      break;
    }
  }

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

<template>
  <v-container>
    <div v-if="nota">
      <v-card>
        <v-card-title>
          <v-text-field v-model="titulo" label="Títol" />
        </v-card-title>

        <v-card-text>
          <v-textarea v-model="descripcion" label="Descripció" />
        </v-card-text>

        <v-card-actions>
          <v-btn @click="changeNota"> Guardar canvis </v-btn>

          <v-btn @click="dialog = true"> Eliminar </v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title> ¿Eliminar nota? </v-card-title>

          <v-card-text> ¿Seguro que quieres eliminar esta nota? </v-card-text>

          <v-card-actions>
            <v-btn @click="dialog = false"> Cancelar </v-btn>

            <v-btn @click="deleteNota"> Eliminar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <p v-else>No s'ha trobat la nota.</p>
  </v-container>
</template>
