<template>
    <div class="flex flex-col min-h-screen">
      <the-navbar />
      <div class="layout-container">
        <slot />
      </div>
      <the-footer class="mt-auto" />
    </div>
  </template>
    
  <style>

.layout-container {
  max-width: 60vw;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .layout-container {
    max-width: 100%;
    padding: 0 1rem;
  }
}
</style>