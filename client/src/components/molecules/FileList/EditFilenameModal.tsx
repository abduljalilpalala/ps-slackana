import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal: typeof Swal = withReactContent(Swal)

export const EditFilenameModal = (title: string, message: string, callback: Function) => {
  mySwal
    .fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, rename it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        callback(result.isConfirmed)
      } else {
        mySwal.fire('Cancelled', '', 'info')
      }
    })
}
