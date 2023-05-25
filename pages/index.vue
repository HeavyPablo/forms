<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-fade-transition group hide-on-leave mode="out-in">
        <div v-if="!loaded" key="loading">
          <p>Cargando...</p>
        </div>

        <div v-if="loaded && found && !finished" key="loaded">
          <v-form ref="form" @submit.prevent="validate()">
            <v-card class="mb-3" color="surface">
              <v-card-title>
                {{ form.name }}
              </v-card-title>
              <v-card-subtitle>
                {{ form.descripcion }}
              </v-card-subtitle>
            </v-card>

            <DynamicForm :forms="form.form" />

            <v-card color="surface">
              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="sending"
                  :loading="sending"
                  class="white--text"
                  color="primary"
                  type="submit"
                >
                  Enviar
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-dialog
              v-model="prepareSending"
              width="500"
            >
              <v-card color="surface">
                <v-card-text class="pa-5">
                  <div v-for="(question, index) in form.form" :key="index" class="mb-5">
                    <p class="font-weight-bold mb-0">
                      {{ question.question }}
                    </p>
                    <v-divider />
                    <span v-if="question.response.value">
                      {{ question.response.value }}
                    </span>
                    <span v-else-if="Array.isArray(question.response)">
                      {{ question.response.join(', ') }}
                    </span>
                    <span v-else-if="question.response">
                      {{ question.response }}
                    </span>
                    <span v-else class="font-italic">Sin información</span>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    :disabled="sending"
                    :loading="sending"
                    color="secondary"
                    @click="prepareSending = false"
                  >
                    Cerrar
                  </v-btn>
                  <v-btn
                    :disabled="sending"
                    :loading="sending"
                    class="white--text"
                    color="primary"
                    @click.prevent="send()"
                  >
                    Confirmar y enviar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog
              v-model="sending"
              persistent
              width="300"
            >
              <v-card color="primary">
                <v-card-text>
                  Enviando, por favor espere.
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                  />
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-form>
        </div>

        <div v-if="loaded && !found && !finished" key="not_found">
          <v-card>
            <v-card-title>
              No se encontró el formulario &#128123;
            </v-card-title>
            <v-card-subtitle>
              No hemos encontrado el formulario, favor de verificar con la administración.
            </v-card-subtitle>
          </v-card>
        </div>

        <div v-if="!sending && finished" key="sent">
          <v-card color="surface">
            <v-card-title>
              &#9889; FORMULARIO ENVIADO! &#9889;
            </v-card-title>
            <v-card-subtitle>
              Hemos enviado su formulario correctamente.
            </v-card-subtitle>
          </v-card>
        </div>
      </v-fade-transition>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',

  data () {
    return {
      form: {},
      loaded: false,
      found: false,
      sending: false,
      prepareSending: false,
      finished: false
    }
  },

  created () {
    this.getForms()
  },

  methods: {
    async getForms () {
      await this.$axios.get('https://run.mocky.io/v3/6bd01347-72e9-49da-809a-d5002ca63b2c').then((response) => {
        this.form = response.data?.formulario ?? {}
        this.found = true
      }).catch(() => {
        // TODO: handler error response
        this.found = false
      }).finally(() => {
        this.loaded = true
      })
    },

    async validate () {
      const valid = await this.$refs.form.validate()

      if (valid) {
        this.prepareSending = true
      }
    },

    send () {
      this.prepareSending = false
      this.sending = true

      // TODO: send form post

      setTimeout(() => {
        this.sending = false
        this.finished = true
      }, 3000)
    }
  }
}
</script>
