export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export function openModal () {
  return {
    type: OPEN_MODAL,
    payload: {
      newPostModalOpen: true,
    }
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
    payload: {
      newPostModalOpen: false,
    }
  }
}
