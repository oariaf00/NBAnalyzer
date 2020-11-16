<template>
    <div>
        <div class="contenido">
            <div class="imagenes">
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide class="swiper-slide" v-for="(imagen,j) in imagenes" :key="j">
                        <img :src="`/pisos/${imagen.url}`"/>
                    
                
                    <div class="tono-claro">
                            <div id="caracteristicas">
                                <div id="habitaciones">
                                    <div id="iconos">
                                        <i class="fas fa-bed fa-2x" style="color:white;line-height: 56px;"></i>
                                    </div>
                                    <div id="icono-dato">
                                        <strong>{{ piso.habitaciones }}</strong> habs
                                    </div>
                                </div>
                                <div id="banos">
                                    <div id="iconos">
                                        <i class="fas fa-bath fa-2x" style="color:white;line-height: 56px;"></i>
                                    </div>
                                    <div id="icono-dato">
                                        <strong>{{ piso.baños }}</strong> baños
                                    </div>
                                </div>
                                <div id="metros">
                                    <div id="iconos">
                                        <i class="fas fa-ruler-combined fa-2x" style="color:white;line-height: 56px;"></i>
                                    </div>
                                    <div id="icono-dato" style="line-height: 50px;">
                                        <strong>{{ piso.metros }}</strong> m<sup>2</sup>
                                    </div>
                                </div>
                            </div>
                            <div class="tono-oscuro">
                                <span class="precio">{{ piso.precio }}€</span>
                            </div>
                            <div id="titulo">
                                {{ piso.titulo }}
                            </div>
                            <div id="ubicacion">
                                <i class="fas fa-map-marker-alt fa-2x" style="margin-right: 7px;"></i> C/ {{piso.calle}} {{piso.portal}} {{piso.piso}}º{{piso.letra}}, {{piso.ciudad}}
                            </div>

                            <div class="cuadro_enlace">
                                <router-link :to="'/visualizacion/'+ piso.idpiso">
                                    <label class="enlace">Ver más</label>
                                </router-link>
                            </div>
                    </div> 
                    </swiper-slide>    
                     <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'Rectangulos',
    props: {
        piso: Object,
        imagenes: Array
    },
    components: {
        Swiper,
        SwiperSlide
    },
    data(){
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar'
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        }
    },
}
</script>
<style src="@/assets/styles/pisosRectangulo.css" scoped></style>

<style scoped>
/***Swiper***/
.swiper-container
{
    width: 100%;
    position: relative;
    margin-left: auto;
    max-width:100%;
    height: 100%;
}
.swiper-slide img
{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.swiper-button-next
{
    display: block !important;
    --swiper-theme-color: #000;
    z-index: 5 !important;
}
.swiper-button-prev
{
    display: block !important;
    --swiper-theme-color: #000;
    z-index: 5 !important;
}
.swiper-button-next:hover
{
    display: block !important;
}
.swiper-button-prev:hover
{
    display: block !important;
}
.swiper-pagination-bullet-active
{
    --swiper-theme-color: #fff;
}
</style>