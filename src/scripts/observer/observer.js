const animEl = document.querySelectorAll('.anim');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const { target } = entry;
    const {
      dataset: { anim, delay },
    } = target;
    if (!entry.isIntersecting) return;
    target.style.animation = `${anim} .5s ${delay} forwards ease-out`;
  });
});

animEl.forEach(anim => {
  observer.observe(anim);
});
