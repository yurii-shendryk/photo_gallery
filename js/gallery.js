import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector('button[data-action="close-lightbox"]'),
  backdrop: document.querySelector(".lightbox__overlay"),
};

let ActiveIndex;
const createGalleryItem = (galleryItem) => {
  const galleryItemRef = document.createElement("li");
  galleryItemRef.classList.add("gallery__item");

  const originalImgRef = document.createElement("a");
  originalImgRef.classList.add("gallery__link");
  originalImgRef.href = galleryItem.original;

  const previewImgRef = document.createElement("img");
  previewImgRef.classList.add("gallery__image");
  previewImgRef.src = galleryItem.preview;
  previewImgRef.setAttribute("data-source", `${originalImgRef.href}`);
  previewImgRef.alt = galleryItem.description;
  previewImgRef.setAttribute(
    "data-index",
    `${galleryItems.indexOf(galleryItem)}`
  );
  originalImgRef.append(previewImgRef);
  galleryItemRef.appendChild(originalImgRef);

  return galleryItemRef;
};

const galleryCards = galleryItems.map((galleryItem) =>
  createGalleryItem(galleryItem)
);
refs.gallery.append(...galleryCards);

const OnImageClick = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    console.log("Кликнули не по картинке");
    return;
  }
  const image = event.target;
  ActiveIndex = Number(event.target.dataset.index);
  updateImgAttributes(image);
  openModal();
};

const updateImgAttributes = (currentImg) => {
  const imgSource = currentImg.dataset.source;
  const imgDescription = currentImg.alt;
  refs.lightboxImg.src = `${imgSource}`;
  refs.lightboxImg.alt = `${imgDescription}`;
};

const openModal = () => {
  window.addEventListener("keydown", closeModalByKey);
  refs.lightbox.classList.add("is-open");
  window.addEventListener("keydown", goToNextImage);
  window.addEventListener("keydown", goToPreviousImage);
};

const onCloseBtnClick = () => {
  closeModal();
};

const closeModal = () => {
  refs.lightbox.classList.remove("is-open");
  resetImgSource(refs.lightboxImg);
  window.removeEventListener("keydown", closeModalByKey);
  window.removeEventListener("keydown", goToNextImage);
  window.removeEventListener("keydown", goToPreviousImage);
};

const resetImgSource = (currentImg) => {
  if (currentImg) {
    refs.lightboxImg.src = "";
    refs.lightboxImg.alt = "";
  }
};

const onBackdropClick = () => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const closeModalByKey = () => {
  if (event.code === "Escape") {
    closeModal();
  }
};

const goToNextImage = (key) => {
  if (key.code === "ArrowRight") {
    if (ActiveIndex === galleryItems.length - 1) {
      return;
    }
    refs.lightboxImg.src = galleryItems[(ActiveIndex += 1)].original;
  }
};

const goToPreviousImage = (key) => {
  if (key.code === "ArrowLeft") {
    if (ActiveIndex === 0) {
      return;
    }
    refs.lightboxImg.src = galleryItems[(ActiveIndex -= 1)].original;
  }
};

refs.gallery.addEventListener("click", OnImageClick);
refs.btnClose.addEventListener("click", onCloseBtnClick);
refs.backdrop.addEventListener("click", onBackdropClick);
