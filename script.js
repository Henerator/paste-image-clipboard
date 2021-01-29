const imageElement = document.querySelector('.image');
const messageElement = document.querySelector('.message');

function setImage(src) {
  imageElement.src = src;
}

function hideMessage() {
  messageElement.classList.add('hidden');
}

function loadBlobImageSrc(blob) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (data) => {
      resolve(data.target.result);
    };
    reader.readAsDataURL(blob);
  });
}

document.body.addEventListener('paste', event => {
  const clipboardData = event.clipboardData || event.originalEvent.clipboardData;
  const imageItem = [...clipboardData.items].find(item => item.type.includes('image/'));

  if (!imageItem) {
    console.log('No image items in clipboard');
    return;
  }

  const blob = imageItem && imageItem.getAsFile();

  if (blob === null) {
    console.log('Can not get image data from clipboard item');
    return;
  }

  loadBlobImageSrc(blob).then(src => {
    hideMessage();
    setImage(src);
  });
});
