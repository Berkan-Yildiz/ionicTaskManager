<template>
  <ion-page>
    <div class="mt-2">
      <h2 class="text-center text-2xl font-semibold">Yeni Görev</h2>
    </div>
    <ion-fab vertical="top" horizontal="end" slot="fixed">
      <ion-fab-button @click="$emit('close-modal')">
        <ion-icon :icon="close"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <Form class="flex flex-col justify-center h-full" @submit="gorevEkle">
      <!-- Görev Alanı -->
      <ion-item>
        <Field name="gorevField" :rules="kontrolEt" v-slot="{ field }">
          <ion-input v-bind="field" type="text" v-model="gorev" placeholder="Yeni Göreviniz"></ion-input>
        </Field>
      </ion-item>
      <ion-item lines="none">
        <ErrorMessage v-slot="{ message }" name="gorevField">
          <ion-text color="danger" v-if="message">{{ message }}</ion-text>
        </ErrorMessage>
      </ion-item>

      <!-- Tarih Alanı -->
      <ion-item>
        <ion-icon :icon="notifications" class="primary" slot="start"></ion-icon>
        <Field name="tarihField" :rules="kontrolEt" v-slot="{ field }">
          <ion-datetime v-bind="field" v-model="tarih" max="2040-12-31" presentation="date" prefer-wheel="true" locale="tr-TR" :first-day-of-week="1" placeholder="Tarih Seçiniz"></ion-datetime>
        </Field>
      </ion-item>
      <ion-item lines="none">
        <ErrorMessage v-slot="{ message }" name="tarihField">
          <ion-text color="danger" v-if="message">{{ message }}</ion-text>
        </ErrorMessage>
      </ion-item>

      <!-- Açıklama Alanı -->
      <ion-item>
        <ion-icon :icon="document" class="primary" slot="start"></ion-icon>
        <ion-textarea v-model="aciklama" placeholder="Açıklama Giriniz"></ion-textarea>
      </ion-item>

      <!-- Kategori Alanı (Açılır Menü) -->
      <ion-item @click="showDropdown = true">
        <ion-icon :icon="grid" class="primary" slot="start"></ion-icon>
        <ion-label>{{ kategori || 'Lütfen Kategori Seçiniz' }}</ion-label>
      </ion-item>

      <ion-popover :is-open="showDropdown" @didDismiss="showDropdown = false">
        <ion-content>
          <ion-list>
            <ion-item v-for="kat in kategoriler" :key="kat" @click="selectKategori(kat)">
              {{ kat }}
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-popover>

      <ion-item lines="none">
        <ErrorMessage v-slot="{ message }" name="kategoriField">
          <ion-text color="danger" v-if="message">{{ message }}</ion-text>
        </ErrorMessage>
      </ion-item>

      <div class="mt-8">
        <ion-button expand="block" type="submit"  color="success">Oluştur</ion-button>
      </div>

    </Form>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import IonComp from '../shared/IonComp';
import { close, notifications, grid, document } from "ionicons/icons";
import { Form, Field, ErrorMessage } from 'vee-validate';

import { collection, addDoc } from "firebase/firestore";
import db from '@/firebase/config';

export default defineComponent({
  components: {
    ...IonComp,
    Form,
    Field,
    ErrorMessage
  },
  setup(props, context) {
    const gorev = ref('');
    const tarih = ref('');
    const aciklama = ref('');
    const kategori = ref('');
    const showDropdown = ref(false);
    const kategoriler = ['İş', 'Müzik', 'Yolculuk', 'Ders', 'Alışveriş', 'Spor'];

    const selectKategori = (kat: string) => {
      kategori.value = kat;
      showDropdown.value = false;
    };

    const kontrolEt = (value: any) => {
      if (!value) {
        return 'Bu Alan Zorunludur';
      }
      return true;
    };

    const gorevEkle = async () => {
      try {
        await addDoc(collection(db, "gorevler"), {
          gorevAd: gorev.value,
          aciklama: aciklama.value,
          tarih: tarih.value,
          kategori: kategori.value,
          tamamlanma: false,
        }).then(() =>{
          gorev.value = '';
          aciklama.value = '';
          tarih.value = '';
          kategori.value = '';

          context.emit('close-modal');
        });
        console.log("Görev başarıyla eklendi!");
      } catch (error) {
        console.error("Görev eklenirken hata oluştu:", error);
      }
    };

    return {
      close,
      notifications,
      grid,
      document,
      gorev,
      tarih,
      aciklama,
      kategori,
      showDropdown,
      kategoriler,
      selectKategori,
      kontrolEt,
      gorevEkle
    }
}
  })
</script>
