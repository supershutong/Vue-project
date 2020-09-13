const intersect = {
  inserted(el, binding) {
    const value = binding.value
    const { handler, options = {} } = value

    // IntersectionObserver API可异步观察目标元素与其祖先元素或顶级文档视窗交叉状态。祖先元素与视窗viewport被成为根root
    const observer = new IntersectionObserver((entries = [], observer) => {
      if (!el._observe) return

      // if (handler && el._observe.init) {
      const isIntersecting = Boolean(
        entries.find(entry => entry.isIntersecting)
      )

      if (isIntersecting) {
        handler(entries, observer, isIntersecting)
      }
      // }

      el._observe.init = true
    }, options)

    el._observe = { init: false, observer }

    observer.observe(el)
  },
  unbind(el) {
    if (!el._observe) return

    el._observe.observer.unobserve(el)
    delete el._observe
  }
}

export default intersect
