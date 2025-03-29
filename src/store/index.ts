// index.ts
import { createStore } from 'vuex';
import { collection, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import db from '@/firebase/config';

const store = createStore({
    state: {
        gorevler: [] as any[],
    },

    mutations: {
        setGorevler(state, gorevler) {
            state.gorevler = gorevler;
        },

        gorevlerGetir(state) {
            const gorevlerRef = collection(db, 'gorevler');
            onSnapshot(gorevlerRef, (snapshot) => {
                state.gorevler = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    gorevAd: doc.data().gorevAd,
                    aciklama: doc.data().aciklama,
                    kategori: doc.data().kategori,
                    tarih: new Date(doc.data().tarih),
                    tamamlanma: doc.data().tamamlanma,
                }));
            });
        },

        // Add these mutations
        gorevTamamla(state, payload) {
            const index = state.gorevler.findIndex(gorev => gorev.id === payload.id);
            if (index !== -1) {
                state.gorevler[index].tamamlanma = true;

                // Firestore veritabanını güncelle
                const gorevRef = doc(db, 'gorevler', payload.id);
                updateDoc(gorevRef, {
                    tamamlanma: true
                });
            }
        },

        gorevTamamlama(state, payload) {
            const index = state.gorevler.findIndex(gorev => gorev.id === payload.id);
            if (index !== -1) {
                state.gorevler[index].tamamlanma = false;

                // Firestore veritabanını güncelle
                const gorevRef = doc(db, 'gorevler', payload.id);
                updateDoc(gorevRef, {
                    tamamlanma: false
                }).catch((error) => {
                    console.error("Görev güncellenirken hata oluştu:", error);
                });
            }
        },

        gorevSil(state, payload) {
            state.gorevler = state.gorevler.filter(gorev => gorev.id !== payload.id);

            // Firestore'dan görevi sil
            const gorevRef = doc(db, 'gorevler', payload.id);
            deleteDoc(gorevRef);
        }
    },

    actions: {
        async gorevlerGetir({ commit }) {
            const gorevlerRef = collection(db, 'gorevler');

            onSnapshot(gorevlerRef, (snapshot) => {
                const gorevler = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    gorevAd: doc.data().gorevAd,
                    aciklama: doc.data().aciklama,
                    kategori: doc.data().kategori,
                    tarih: new Date(doc.data().tarih),
                    tamamlanma: doc.data().tamamlanma,
                }));
                commit('setGorevler', gorevler);
            });
        },

        async gorevTamamla({ commit }, payload) {
            if (!payload.tamamlanma) {
                const gorevRef = doc(db, 'gorevler', payload.id);
                await updateDoc(gorevRef, { tamamlanma: true });
                commit('gorevTamamla', payload);
            }
        },

        async gorevTamamlama({ commit }, payload) {
            if (payload.tamamlanma) {
                const gorevRef = doc(db, 'gorevler', payload.id);
                await updateDoc(gorevRef, { tamamlanma: false });
                commit('gorevTamamlama', payload);
            }
        },

        async gorevSil({ commit }, payload) {
            const gorevRef = doc(db, 'gorevler', payload.id);
            await deleteDoc(gorevRef);
            commit('gorevSil', payload);
        },
    },

    getters: {
        gelen: (state) => state.gorevler.filter((gorev) => !gorev.tamamlanma),

        bugun: (state) => {
            const simdikiTarih = new Date();
            return state.gorevler.filter((gorev) => {
                const gorevTarihi = new Date(gorev.tarih);
                return (
                    gorevTarihi.getDate() === simdikiTarih.getDate() &&
                    gorevTarihi.getMonth() === simdikiTarih.getMonth() &&
                    gorevTarihi.getFullYear() === simdikiTarih.getFullYear()
                );
            });
        },

        yapilan: (state) => state.gorevler.filter((gorev) => gorev.tamamlanma),

        gecen: (state) => {
            const simdikiTarih = new Date();
            return state.gorevler.filter((gorev) => {
                const gorevTarihi = new Date(gorev.tarih);
                return gorevTarihi < simdikiTarih && !gorev.tamamlanma;
            });
        },

        kategoriyeGoreGorevGetir: (state) => (kategori: any) => {
            return state.gorevler.filter((item: any) =>
                item.kategori?.toLowerCase() === kategori?.toLowerCase()
            );
        },
        kategoriyeGoreToplamGorevSayisiGetir: (state)=>{
            return (kategori: any) => state.gorevler.filter((item: any) =>{
                return item.kategori==kategori;
            }).length;
        }
    },
});

export default store;