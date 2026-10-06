```vue
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const notas = ref([]);
const titulo = ref("");
const descripcion = ref("");
const estado = ref(false);
const data = ref(new Date());
const crear = ref(false);
const editar = ref(false);
const dialog = ref(false);
const dialog2 = ref(false);
const notaActual = ref(null);
const ordenAscendente = ref(false);
const menu = ref(false);

onMounted(() => {
  const datos = localStorage.getItem("notas");

  if (datos) {
    notas.value = JSON.parse(datos);
  }
});

function crearNota() {
  if (titulo.value == "") {
    return;
  }

  let id = 1;

  for (let i = 0; i < notas.value.length; i++) {
    if (notas.value[i].id >= id) {
      id = notas.value[i].id + 1;
    }
  }

  notas.value.push({
    id: id,
    title: titulo.value,
    description: descripcion.value,
    estate: estado.value,
    date: data.value,
  });

  localStorage.setItem("notas", JSON.stringify(notas.value));

  titulo.value = "";
  descripcion.value = "";
  estado.value = false;
  data.value = "";
  crear.value = false;
}

function abrirNota(nota) {
  notaActual.value = nota;
  titulo.value = nota.title;
  descripcion.value = nota.description;
  estado.value = nota.estate;
  editar.value = true;
}

function volver() {
  editar.value = false;
  titulo.value = "";
  descripcion.value = "";
  estado.value = false;
  router.push("/");
}

function guardar() {
  notaActual.value.title = titulo.value;
  notaActual.value.description = descripcion.value;
  notaActual.value.estate = estado.value;

  localStorage.setItem("notas", JSON.stringify(notas.value));

  dialog2.value = false;
  volver();
}

function eliminar() {
  for (let i = 0; i < notas.value.length; i++) {
    if (notas.value[i].id == notaActual.value.id) {
      notas.value.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("notas", JSON.stringify(notas.value));

  dialog.value = false;
  volver();
}

</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="menu">
      <v-list>
        <v-list-item> Gestor de Notes </v-list-item>
        <v-list-item @click="volver"> Mis notas </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-toolbar color="blue">
      <v-toolbar-title> Gestor de Notes </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="crear = !crear">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>


    <v-main class="fondo">
      <v-container>
        <div v-if="!editar">
          <h1 class="titulo">Mis notas</h1>
          <v-card v-if="crear">
            <v-card-title> Nueva nota </v-card-title>
            <v-card-text>
              <v-text-field v-model="titulo" label="Título"></v-text-field>
              <v-textarea v-model="descripcion" label="Descripción"></v-textarea>
              <v-select
                v-model="estado"
                label="Estado"
                :items="['Pendiente', 'Completada']"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="crear = false"> Cancelar </v-btn>
              <v-btn @click="crearNota"> Crear </v-btn>
            </v-card-actions>
          </v-card>

          <v-list class="fondo">
            <v-list-item v-for="nota in notas" :key="nota.id" class="bloc_notas">
              <v-card @click="abrirNota(nota)" class="nota">
                <v-card-title>
                  {{ nota.title }}
                </v-card-title>
                <v-card-text>
                  {{ nota.description }}
                </v-card-text>
                <v-card-text>
                  {{ nota.estate }}
                </v-card-text>
              </v-card>
            </v-list-item>
          </v-list>
          <p v-if="notas.length == 0">No hay notas.</p>
        </div>

        <div v-if="editar">
          <v-btn @click="volver"> Volver </v-btn>
          <v-card>
            <v-card-title> Editar nota </v-card-title>
            <v-card-text>
              <v-text-field v-model="titulo" label="Título"></v-text-field>
              <v-textarea v-model="descripcion" label="Descripción"></v-textarea>
              <v-select v-model="estado" label="Estado" :items="['Pendiente', 'Completada']"
              ></v-select>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="dialog2 = true">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="dialog = true">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>

        <v-dialog v-model="dialog">
          <v-card>
            <v-card-title> Eliminar nota? </v-card-title>

            <v-card-text> Seguro que quieres eliminarla? </v-card-text>

            <v-card-actions>
              <v-btn @click="dialog = false"> No </v-btn>

              <v-btn @click="eliminar"> Sí, eliminar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2">
          <v-card>
            <v-card-title> Guardar nota? </v-card-title>

            <v-card-text> Seguro que quieres guardarlo? </v-card-text>

            <v-card-actions>
              <v-btn @click="dialog2 = false"> No </v-btn>

              <v-btn @click="guardar"> Sí, guardar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.nota {
  background-color: rgb(223, 223, 198);
  box-shadow: 4px 4px 4px 2px rgba(245, 245, 220, 0.4);
}

.nota:active {
  opacity: 0.9;
  transform: scale(1.5);
}

.bloc_notas {
  background-color: rgba(214, 211, 197, 0.5);
  padding-top: 20px;
  padding-bottom: 20px;
}

.fondo {
  background-color: cadetblue;
}

.titulo {
  background-color: rgba(214, 211, 197, 0.5);
  border-color: black;
  color: white;
  padding: 0 0 0 1.5rem;
}
</style>

