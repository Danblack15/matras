<template>
    <button 
        :class="['btn', {
            'btn--white': white
        }]"
        :disabled="disabled"    
    >
        <slot></slot>
    </button>
</template>
  
<script>
export default {
    name: 'ButtonUI',
    props: {
        white: Boolean,
        disabled: Boolean
    }
}
</script>
  
<style lang="sass">
@import '@/assets/_variables.sass'
.btn
    cursor: pointer
    background: $black
    color: $white
    padding: 12px 18px
    font-size: 14px
    font-weight: 600
    text-transform: uppercase
    border-radius: 5px
    transition: $trs

    &:hover
        background: $grey

    &:disabled
        pointer-events: none

    &--white
        background: $white
        color: $black
        border: 1px solid transparent

        &:hover
            border-color: $white
            background: transparent
            color: $white
            
</style>