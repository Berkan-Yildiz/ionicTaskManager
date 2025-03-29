https://v2.tailwindcss.com/docs/guides/vue-3-vite

Kodunu kullanarak tailwindi indirdik

    npx tailwindcss init -p

tailwind css yi kullanmak için ilk başta main.ts ye girip import etmek lazım.

    import './assets/tailwind.css';

---
iconlar için

    npm i ionicons

---
sağ aşşağıya sabit buton için ion-fab kullanıyoruz

    //vertical ile aşşağıda yukarda olucasğını vertical ile sağda solda olucağını ayarladık
    <ion-fab vertical="bottom" horizontal="end" >
        <ion-fab-button>
            <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
    </ion-fab>

---
Tıklayınca modal açılması için 

    <div>
        <ion-fab vertical="bottom" horizontal="end" >
            <ion-fab-button @click="modalController=true">
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        </ion-fab>
        <ion-modal :is-open="modalController" :backdrop-dismiss="false">
            <h1 class="text-2xl">Modal</h1>
        </ion-modal>
    </div>

    import {defineComponent,ref} from 'vue'
    setup() {
        const modalController = ref(false);
        return {clipboard,briefcase,headset,airplane,book,footballSharp,cardOutline,add,modalController}
    }

---
VeeValidate

veeValidate, Vue.js uygulamalarında form validasyonu (doğrulama) için kullanılan popüler bir kütüphanedir. 
Formlarınızdaki alanları doğrulamak ve hata mesajları göstermek için kullanışlı özellikler sunar.

    npm i vee-validate --save

    //impotları
    import {Form,Field,ErrorMessage} from 'vee-validate';
# ionicTaskManager
