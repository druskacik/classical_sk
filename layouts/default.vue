<template>
    <div>
      <slot />
    </div>
    <div>
      <div class="container mx-auto py-8 px-4 text-center">
        <p>
          &copy; {{ new Date().getFullYear() }} classical.sk
        </p>
      </div>
    </div>
  </template>
  
<style>
#app {
  font-family: 'Lato', sans-serif;
}
</style>