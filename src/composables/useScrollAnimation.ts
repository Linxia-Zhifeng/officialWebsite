import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollAnimation() {
  const observer = ref<IntersectionObserver | null>(null)

  const initObserver = () => {
    if (typeof window === 'undefined') return

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    elements.forEach((el) => {
      observer.value?.observe(el)
    })
  }

  const observeNewElements = () => {
    if (!observer.value) return
    const elements = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible), .reveal-scale:not(.visible)')
    elements.forEach((el) => {
      observer.value?.observe(el)
    })
  }

  onMounted(() => {
    initObserver()
    window.addEventListener('scroll', observeNewElements)
  })

  onUnmounted(() => {
    observer.value?.disconnect()
    window.removeEventListener('scroll', observeNewElements)
  })

  return {
    observeNewElements
  }
}
