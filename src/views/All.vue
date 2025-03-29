<!--all.vue-->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button slot="start" href="lists" class="custom-back-button">
          Geri
        </ion-button>
        <ion-icon :icon="ellipsisVertical" slot="end" class="text-2xl"></ion-icon>
      </ion-toolbar>
    </ion-header>

    <ion-content class="overflow-auto full-screen mt-2">
      <div class="text-center w-full">
        <ion-icon :icon="clipboard" size="large" class="text-blue-500 clipboard-icon"></ion-icon>
      </div>
      <div class="text-center w-full">
        <ion-card-title class="w-full text-3xl">Bütün Görevler</ion-card-title>
      </div>
      <div>
        <ion-list>
          <ion-list-header>
            <ion-label class="text-yellow-500">Gelen Yapılacaklar <span class="text-gray-500 text-base">
              {{  state.gelen.length }}
            </span></ion-label>
          </ion-list-header>

          <ion-item-sliding v-for="item in state.gelen" :key="item.id">
            <ion-item-options side="end">
              <ion-item-option @click="gorevSil(item)" color="danger" expandable>
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>

            <ion-item detail="true">
              <ion-label>
                <h2>{{  item.gorevAd }}</h2>
                <p style="color :red">{{ formatDate(item.tarih) }}</p>
              </ion-label>
            </ion-item>

            <ion-item-options side="start">
              <ion-item-option @click="gorevTamamla(item)" color="primary" expandable>
                <ion-checkbox :checked="item.tamamlanma"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>

          </ion-item-sliding>

        </ion-list>

        <ion-list>
          <ion-list-header>
            <ion-label class="text-red-500">Bugün Yapılacaklar <span class="text-gray-500 text-base">
              {{ state.bugun.length }}
            </span></ion-label>
          </ion-list-header>

          <ion-item-sliding v-for="item in state.bugun" :key="item">
            <ion-item-options side="end">
              <ion-item-option  @click="gorevSil(item)" color="danger" expandable>
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>

            <ion-item detail="true">
              <ion-label>
                <h2>{{  item.gorevAd }}</h2>
                <p style="color :red">{{ formatDate(item.tarih) }}</p>
              </ion-label>
            </ion-item>

            <ion-item-options side="start">
              <ion-item-option @click="gorevTamamla(item)"  color="primary" expandable>
                <ion-checkbox :checked="item.tamamlanma"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>

          </ion-item-sliding>

        </ion-list>

        <ion-list>
          <ion-list-header>
            <ion-label class="text-green-500">Yapılanlar <span class="text-gray-500 text-base">
              {{ state.yapilan.length }}
            </span></ion-label>
          </ion-list-header>

          <ion-item-sliding  v-for="item in state.yapilan" :key="item">
            <ion-item-options side="end">
              <ion-item-option @click="gorevSil(item)" color="danger" expandable>
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>

            <ion-item detail="true">
              <ion-label class="done">
                <h2>{{  item.gorevAd }}</h2>
                <p style="color :red">{{ formatDate(item.tarih) }}</p>
              </ion-label>
            </ion-item>

            <ion-item-options side="start">
              <ion-item-option @click="gorevTamamlama(item)" color="primary" expandable>
                <ion-checkbox :checked="item.tamamlanma"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>

          </ion-item-sliding>

        </ion-list>

        <ion-list>
          <ion-list-header>
            <ion-label class="text-gray-500">Geçen Yapılacaklar <span class="text-gray-500 text-base">
              {{ state.gecen.length }}
            </span></ion-label>
          </ion-list-header>

          <ion-item-sliding v-for="item in state.gecen" :key="item">
            <ion-item-options side="end">
              <ion-item-option @click="gorevSil(item)" color="danger" expandable>
                <ion-icon :icon="trash" size="large"></ion-icon>
              </ion-item-option>
            </ion-item-options>

            <ion-item detail="true">
              <ion-label>
                <h2>{{  item.gorevAd }}</h2>
                <p style="color :red">{{ formatDate(item.tarih) }}</p>
              </ion-label>
            </ion-item>

            <ion-item-options side="start">
              <ion-item-option  @click="gorevTamamla(item)"  color="primary" expandable>
                <ion-checkbox :checked="item.tamamlanma"></ion-checkbox>
              </ion-item-option>
            </ion-item-options>

          </ion-item-sliding>

        </ion-list>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, onMounted, computed} from 'vue'
import IonComp from "@/shared/IonComp";
import {ellipsisVertical, clipboard, trash} from 'ionicons/icons'
import {useStore} from 'vuex';

export default defineComponent({
  components: {
    ...IonComp
  },
  setup() {
    const store = useStore();

    function gorevlerGetir(){
      store.commit('gorevlerGetir')
    }
    function gorevTamamla(item: any){
      store.commit('gorevTamamla', item);
    }
    function gorevTamamlama(item: any){
      store.commit('gorevTamamlama', item);
    }
    function gorevSil(item: any){
      store.commit('gorevSil', item);
    }

    const state = computed(() => ({
      gelen: store.getters.gelen,
      bugun: store.getters.bugun,
      yapilan: store.getters.yapilan,
      gecen: store.getters.gecen,
    }));

    const formatDate = (date: string) => {
      const dateObj = new Date(date);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1; // 0-based index
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    };

    onMounted(()=>{
      gorevlerGetir();
    })

    return {ellipsisVertical, clipboard, trash, state, gorevTamamla, gorevTamamlama, gorevSil, formatDate}
  }
})
</script>

<style scoped>

.done{
  text-decoration: line-through;
}

/* Geri butonunun yüksekliğini kısaltmak için özel stil */
.custom-back-button {
  height: 32px; /* Burada yüksekliği belirliyoruz */
  font-size: 14px; /* Buton yazısının boyutunu da kısaltabiliriz */
}

/* Tam ekran yapmak için stiller */
.full-screen {
  height: 100vh; /* Yüksekliği ekranın tamamı kadar ayarlıyoruz */
  width: 100%;  /* Genişliği ekranın tamamı kadar ayarlıyoruz */
}

/* Başlık stilini düzenliyoruz */
ion-card-title {
  width: 100%;
  text-align: center;
  padding: 20px 0; /* Başlık etrafına padding ekleyebiliriz */
}

/* İçerik kutusunun tamamen ekranı kaplaması */
ion-content {
  display: block; /* Flex yerine blok yapısını kullanıyoruz */
  width: 100%; /* Genişliği 100% yapıyoruz */
  padding: 0; /* İçeriğin kenarlıklarını sıfırlıyoruz */
}

/* clipboard iconunun daha aşağıda yer almasını sağlamak için stil */
.clipboard-icon {
  margin-top: 20px; /* Üst boşluğu artırarak ikonu aşağıya alıyoruz */
}
</style>
