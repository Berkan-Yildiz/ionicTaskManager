<template>
  <div>
    <ion-page>
      <div class="flex w-full flex-col overflow-auto">
        <div class="mt-2">
          <h1 class="text-4xl pl-5 font-semibold">Görev Listesi</h1>
        </div>
        <div class="flex w-full flex-row flex-wrap justify-around mt-2">
          <ion-card class="w-3/5" href="all">
<!--            <router-link :to="{ name: 'all' }">-->
              <ion-card-header class="text-center">
                <ion-icon :icon="clipboard" class="text-blue-500" size="large"></ion-icon>
              </ion-card-header>
              <ion-card-content>
                <ion-card-title class="text-2xl">
                  Bütün Görevler
                </ion-card-title>
                <ion-card-subtitle>
                  {{state.butunGorevlerSayisi}} Tane Görev
                </ion-card-subtitle>
              </ion-card-content>
<!--            </router-link>-->
          </ion-card>

          <ion-card class="w-2/5" href="work">
            <ion-card-header class="text-center">
              <ion-icon :icon="briefcase" class="text-yellow-500" size="large"></ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">
                İş
              </ion-card-title>
              <ion-card-subtitle>
                {{ state.kategoriGorevlerSayisi('İş') }} Tane Görev
              </ion-card-subtitle>
            </ion-card-content>
          </ion-card>

          <ion-card class="w-2/5" href="music">
            <ion-card-header class="text-center">
              <ion-icon :icon="headset" class="text-red-400" size="large"></ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">
                Müzik
              </ion-card-title>
              <ion-card-subtitle>
                {{ state.kategoriGorevlerSayisi('Müzik') }} Tane Görev
              </ion-card-subtitle>
            </ion-card-content>
          </ion-card>

          <ion-card class="w-2/5" href="travel">
            <ion-card-header class="text-center">
              <ion-icon :icon="airplane" class="text-green-400" size="large"></ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">
                Yolculuk
              </ion-card-title>
              <ion-card-subtitle>
                {{ state.kategoriGorevlerSayisi('Yolculuk') }} Tane Görev
              </ion-card-subtitle>
            </ion-card-content>
          </ion-card>

          <ion-card class="w-2/5" href="study">
            <ion-card-header class="text-center">
              <ion-icon :icon="book" class="text-purple-500" size="large"></ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">
                Ders
              </ion-card-title>
              <ion-card-subtitle>
                {{ state.kategoriGorevlerSayisi('Ders') }} Tane Görev
              </ion-card-subtitle>
            </ion-card-content>
          </ion-card>

          <ion-card class="w-2/5" href="sport">
            <ion-card-header class="text-center">
              <ion-icon :icon="footballSharp" class="text-pink-400" size="large"></ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">
                Spor
              </ion-card-title>
              <ion-card-subtitle>
                {{ state.kategoriGorevlerSayisi('Spor') }} Tane Görev
              </ion-card-subtitle>
            </ion-card-content>
          </ion-card>

          <ion-card class="w-2/5" href="shopping">
            <ion-card-header class="text-center">
              <ion-icon :icon="cardOutline" class="text-gray-400" size="large"></ion-icon>
            </ion-card-header>
            <ion-card-content>
              <ion-card-title class="text-2xl">
                Alışveriş
              </ion-card-title>
              <ion-card-subtitle>
                {{ state.kategoriGorevlerSayisi('Alışveriş') }} Tane Görev
              </ion-card-subtitle>
            </ion-card-content>
          </ion-card>
        </div>
        <div>
          <ion-fab vertical="bottom" horizontal="end" >
            <ion-fab-button @click="modalController=true">
              <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
          </ion-fab>
          <ion-modal :is-open="modalController" :backdrop-dismiss="false">
            <NewTask @closeModal="modalController=false" />
          </ion-modal>
        </div>
      </div>
    </ion-page>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, computed, onMounted} from 'vue'
import IonComp from '../shared/IonComp';
import {clipboard,briefcase,headset,airplane,book,footballSharp,cardOutline,add} from "ionicons/icons";
import NewTask from "@/Components/NewTask.vue";
import {useStore} from "vuex";

export default defineComponent({
  components: {
    ...IonComp,NewTask
  },
  setup() {
    const modalController = ref(false);
    const store = useStore();
    const state = reactive({
      butunGorevlerSayisi: computed(()=>{
        return store.state.gorevler.length;
      }),
      kategoriGorevlerSayisi: (item:any) =>{
        return store.getters.kategoriyeGoreToplamGorevSayisiGetir(item)
      }
    })

    function gorevlerGetir(){
      store.commit('gorevlerGetir')
    }

    onMounted(()=>{
      gorevlerGetir()
    })

    return {clipboard,briefcase,headset,airplane,book,footballSharp,cardOutline,add,modalController,store, state}
  }
})
</script>

<style scoped>

</style>