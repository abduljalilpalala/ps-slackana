import toast from 'react-hot-toast'
import { Howl } from 'howler'

import handleImageError from '~/helpers/handleImageError'

export const nudgeMember = (avatar: string, projectTitle: string, name: string) => {
  const sound = new Howl({
    src: '/sounds/notification-nudge.mp3',
    html5: true
  })
  sound.play()
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
      >
        <div className="w-0 flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={avatar}
                onError={(e) => handleImageError(e, '/images/avatar.png')}
                alt="user-icon"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="w-full max-w-[150px] truncate text-sm font-medium text-gray-900">
                {name}
              </p>
              <p className="mt-1 text-sm text-gray-500">Nudging you from {projectTitle}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              toast.dismiss(t.id)
              sound.stop()
            }}
            className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:text-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ),
    { duration: sound.duration() }
  )
}
