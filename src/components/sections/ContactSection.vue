<template><section class="section-container"><div class="contact-shell rounded-[2rem] p-6 md:p-10"><span class="section-kicker">{{ sectionState.badge }}</span><h2 class="mt-5 text-4xl font-bold">{{ sectionState.title }}</h2><p class="mt-5 text-lg text-slate-700">{{ sectionState.subtitle }}</p><router-link to="/contact" class="btn-primary mt-8">Hubungi Sekarang</router-link></div></section></template>
<script setup>
import { ref, watch, onMounted } from 'vue';
const HOME_PAGE='Home';const HOME_STORAGE_KEY=`customPageData:${HOME_PAGE}`;
/* global defineProps */
const props=defineProps({pageData:{type:Object,default:()=>({})}});
const baseSection={badge:'Kontak',title:'Konsultasi Dokter Gigi Hari Ini',subtitle:'Tim kami siap membantu jadwal perawatan Anda.',contactInfo:[]};
const sectionState=ref({...baseSection});
const getCachedHomeData=()=>{try{const raw=localStorage.getItem(HOME_STORAGE_KEY);return raw?JSON.parse(raw):null;}catch{return null;}}; const parse=(d)=>{if(!d)return null;if(typeof d==='string'){try{return JSON.parse(d);}catch{return null;}}return d;}; const getItemByTag=(tag,allData)=>{const section=allData?.[tag];if(!section)return[];const parseItem=(item)=>parse(item)||{};return Array.isArray(section)?section.map(parseItem):[parseItem(section)];};
const applyContentFromProps=()=>{const source=(props.pageData&&Object.keys(props.pageData||{}).length&&props.pageData)||getCachedHomeData()||{};const getField=(obj,k1,k2)=>(obj?obj[k1]||obj[k2]||'':'');const badgeObj=getItemByTag('contact_home_badge25',source)[0]||{};const mainObj=getItemByTag('contact_home_main25',source)[0]||{};sectionState.value={...baseSection,badge:getField(badgeObj,'title','content')||baseSection.badge,title:getField(mainObj,'title','heading')||baseSection.title,subtitle:getField(mainObj,'content','subtitle')||baseSection.subtitle};};
watch(()=>props.pageData,()=>applyContentFromProps(),{deep:true,immediate:true}); onMounted(()=>applyContentFromProps());
</script>
<style scoped>.contact-shell{border:1px solid rgba(125,211,252,.36)}</style>
