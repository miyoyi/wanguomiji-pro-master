import { EditModalType } from '@/types/global';
import { ref } from 'vue';

export default function useModal() {
  const visible = ref(false);
  const type = ref<EditModalType>('add');

  const openModal = (value?: EditModalType) => {
    if (value) {
      type.value = value;
    }
    visible.value = true;
  };

  return {
    visible,
    type,
    openModal
  };
}
