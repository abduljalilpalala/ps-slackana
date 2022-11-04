import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal: typeof Swal = withReactContent(Swal)

export const DeleteConfirmModal = (onConfirm: () => void) => {
  mySwal
    .fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        onConfirm()
      } else {
        mySwal.fire('Cancelled', 'Your file is safe :)', 'error')
      }
    })
}
