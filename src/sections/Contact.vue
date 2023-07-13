<template>
  <PageSectionWrapper :id="contactData.id" :title="contactData.title" :subtitle="contactData.subtitle" :is-dark-section="true">
    <form id="contact-form" @submit.prevent="submitForm">
      <div class="row align-items-stretch mb-3">
        <div class="col-md-6">
          <div class="form-group">
            <!-- Name input-->
            <input class="form-control" id="name" type="text" :placeholder="contactData.placeholders.name" v-model="name" required/>
          </div>

          <div class="form-group">
            <!-- Email address input-->
            <input class="form-control" id="email" type="email" :placeholder="contactData.placeholders.email" v-model="email" required/>
          </div>

          <div class="form-group mb-md-0">
            <!-- Subject input-->
            <input class="form-control" id="subject" type="text" :placeholder="contactData.placeholders.subject" v-model="subject" required/>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group form-group-textarea mb-md-0">
            <!-- Message input-->
            <textarea class="form-control" id="message" :placeholder="contactData.placeholders.message" v-model="message" required></textarea>
          </div>
        </div>
      </div>

      <div class="text-center">
        <XLButton :label="contactData.button.label" :type="'submit'" :icon="contactData.button.icon"></XLButton>
      </div>
      <div v-if="messageStatus" class="message-status" :class="{success: messageStatus === 'Success', error: messageStatus === 'Error'}">{{ messageStatus }}</div>
    </form>
  </PageSectionWrapper>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import agencyData from '../data/agency.json'
import PageSectionWrapper from "../components/PageSectionWrapper.vue"
import XLButton from "../components/XLButton.vue";
const contactData = agencyData.contact

let name = ref(''),
    email = ref(''),
    subject = ref(''),
    message = ref(''),
    messageStatus = ref('');

const submitForm = () => {
  axios.post('https://formspree.io/f/xaygylvk', {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value
  })
  .then(() => {
    messageStatus.value = 'Mensaje Enviado Correctamente';
    name.value = '';
    email.value = '';
    subject.value = '';
    message.value = '';
  })
  .catch(() => {
    messageStatus.value = 'Error';
  });
}
</script>

<style scoped>
.message-status {
  margin-top: 1em;
  padding: 1em;
  border-radius: 5px;
}

.success {
  color: #4F8A10;
  background-color: #DFF2BF;
}

.error {
  color: #D8000C;
  background-color: #FFBABA;
}
</style>

<style scoped lang="scss">
@import "../scss/_theming.scss";

.form-group {
  margin-bottom: 1rem;

  input,
  textarea {
    padding: 1.25rem;
  }

  input.form-control {
    background-color: $dark;
    border-color: $gray-700;
    border-width: 2px;
    color: white;
    height: 30px;

    @include media-breakpoint-up(md) {
      height: auto;
    }

    &:focus {
      border-color: $primary;
    }
  }
}

.form-group-textarea {
  height: 100%;

  textarea {
    background-color: $dark;
    border-color: $gray-700;
    border-width: 2px;
    color: white;
    height: 100%;
    min-height: 10rem;

    &:focus {
      border-color: $primary;
    }
  }
}

p.help-block {
  margin: 0;
}

.form-control:focus {
  border-color: $dark;
  box-shadow: none;
}

::-webkit-input-placeholder {
  color: $gray-700;
  font-size: 0.9rem;
  font-weight: bold;
}

:-moz-placeholder {
  color: $gray-500;
}

::-moz-placeholder {
  color: $gray-500;
}

:-ms-input-placeholder {
  color: $gray-500;
}
</style>
