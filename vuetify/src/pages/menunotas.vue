<script>
import {ref} from 'vue';
import MenuNotas from '@/components/MenuNotas.vue'


const mostrarFormulario = ref(false);
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
      <v-btn icon @click="menu = !menu">
        <v-icon> mdi-menu </v-icon>
      </v-btn>
      <v-toolbar-title> Gestor de Notes </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="crear = !crear">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-toolbar>


  <v-container>
    <div class="d-flex align-center mb-4">
      <h1>Mis notas</h1>

      <v-spacer></v-spacer>

      <v-btn icon @click="mostrarFormulario = !mostrarFormulario">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>


    <v-card v-if="mostrarFormulario" class="mb-6">
      <v-card-title> Crear nota </v-card-title>

      <v-card-text>
        <v-text-field v-model="titulo" label="Títol" />

        <v-textarea v-model="descripcion" label="Descripció" />
      </v-card-text>

      <v-card-actions>
        <v-btn @click="mostrarFormulario = false"> Cancelar </v-btn>

        <v-btn @click="MenuNotas.crearNota()"> Crear nota </v-btn>
      </v-card-actions>
    </v-card>


    <v-list>
      <v-list-item v-for="nota in notas" :key="nota.id" class="mb-3">
        <v-card @click="abrirNota(nota.id)" class="pa-2">
          <v-card-title>
            {{ nota.title }}
          </v-card-title>

          <v-card-text>
            {{ nota.description }}
          </v-card-text>
        </v-card>
      </v-list-item>
    </v-list>
    <p v-if="notas.length === 0">No hay ninguna nota todavía.</p>
  </v-container>
</v-app>
</template>
