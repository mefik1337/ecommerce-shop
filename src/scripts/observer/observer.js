const animEl = document.querySelectorAll('.anim');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const { target } = entry;
    const { dataset } = target;
    if (entry.intersectionRatio > 0)
      target.style.animation = `${dataset.anim} .5s ${dataset.delay} forwards ease-out`;
    else target.style.animation = 'none';
  });
});

animEl.forEach(anim => {
  observer.observe(anim);
});
