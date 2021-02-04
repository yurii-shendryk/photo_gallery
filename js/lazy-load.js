import "./gallery.js";
const imgRef = document.querySelectorAll(".gallery__image");
const options = {
  rootMargin: "100px",
};
const onEntry = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const image = entry.target;
      const src = image.dataset.source;
      image.src = src;
      image.classList.add("appear");
      observer.unobserve(image);
    }
  });
};

const io = new IntersectionObserver(onEntry, options);
imgRef.forEach((img) => io.observe(img));
