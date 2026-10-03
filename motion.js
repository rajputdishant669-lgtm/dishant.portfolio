if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
 document.querySelectorAll('.section-heading,.about h2,.about-subtitle,.about-copy,.principles article,.contact-top').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
}
// Keep the face at the same visual height when the preview width changes.
const heroPortrait = document.querySelector('.hero > .portrait');
const heroPhoto = heroPortrait?.querySelector('img');
if (heroPortrait && heroPhoto) {
  function framePortrait() {
    const width = heroPortrait.clientWidth;
    const height = heroPortrait.clientHeight;
    if (!width || !height) return;
    const scale = Math.max(width / 1200, height / 1600);
    const renderedWidth = 1200 * scale;
    const renderedHeight = 1600 * scale;
    const mobile = width <= 700;
    const targetX = width * (mobile ? 0.68 : 0.78);
    const targetY = height * (mobile ? 0.25 : 0.36);
    const position = (target, focal, rendered, container) => {
      const overflow = rendered - container;
      return overflow < 1 ? 50 : Math.max(0, Math.min(100, (focal * rendered - target) / overflow * 100));
    };
    heroPhoto.style.objectPosition = `${position(targetX, 0.71, renderedWidth, width)}% ${position(targetY, 0.405, renderedHeight, height)}%`;
  }
  framePortrait();
  heroPhoto.addEventListener('load', framePortrait);
  if ('ResizeObserver' in window) new ResizeObserver(framePortrait).observe(heroPortrait);
  else window.addEventListener('resize', framePortrait);
}
