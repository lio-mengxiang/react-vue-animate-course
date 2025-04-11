import { IMAGE_COUNT, IMAGE_NAMES, IMAGE_PATH, ITEM_CLASS_NAME } from '../constant';

interface IProps {
  gallery: HTMLElement | null;
}

export const createImages = ({ gallery }: IProps) => {
  if (gallery) {
    for (let i = 0; i < IMAGE_COUNT; i++) {
      const item = document.createElement('div');
      item.classList.add(ITEM_CLASS_NAME);

      const img = document.createElement('img');
      img.src = `${IMAGE_PATH}/${IMAGE_NAMES[i]}`;
      item.appendChild(img);
      gallery!.appendChild(item);
    }
  }
};
