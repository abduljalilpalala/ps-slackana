import React, { FC, useState } from 'react'
import { HiCheck, HiClipboardList, HiUsers } from 'react-icons/hi'

import DialogBox from '~/components/templates/DialogBox'
import SwitchToggle from '~/components/atoms/SwitchToggle'
import { styles as settingsStyle } from '~/shared/twin/settings-modal.style'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { darkToaster } from '~/utils/darkToaster'
import { InfoIcon } from '~/shared/icons/InfoIcon'

type Props = {
  repo: string
  muteNudge: boolean
  isRepoLoading: boolean
  handleMuteNudge: () => void
  setMuteNudge: (e: boolean) => void
  setRepo: (e: string) => void
  setOpenSettings: (e: boolean) => void
  handleSubmitProjectRepo: () => void
}
const ProjectSettingsModal: FC<Props> = (props): JSX.Element => {
  const {
    repo,
    muteNudge,
    isRepoLoading,
    handleMuteNudge,
    setMuteNudge,
    setRepo,
    setOpenSettings,
    handleSubmitProjectRepo
  } = props
  const [active, setActive] = useState<string>('Nudge')
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const value = e.currentTarget.innerText
    setActive(value)
  }
  const menuList = ['Nudge', 'GitHub']
  const modalMenu = menuList.map((menu: string, index: number) => {
    return (
      <button
        key={index}
        onClick={onClick}
        css={`
          ${settingsStyle.inactive}
          ${active === menu && settingsStyle.active}
        `}
      >
        {menu}
      </button>
    )
  })

  const handleCopySigningKey = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_GITHUB_SIGNING_KEY as string)
    darkToaster('✅', 'Signing key is successfully copied')
  }

  const handleCopyPayloadURL = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BACKEND_URL as string}api/github-webhooks`
    )
    darkToaster('✅', 'Payload URL is successfully copied')
  }

  const activeComponent = (component: string) => {
    switch (component) {
      case 'Nudge': {
        return (
          <div>
            <p css={settingsStyle.p}>Turn On/Off</p>
            <div className="flex flex-col gap-3">
              <div css={settingsStyle.notification}>
                <div className="flex flex-row gap-3">
                  <HiUsers className=" h-5 w-5" />
                  <p css={settingsStyle.value}>Mute nudging for this project</p>
                </div>
                <SwitchToggle
                  callback={() => handleMuteNudge()}
                  value={setMuteNudge}
                  className="mt-[3px]"
                  state={muteNudge}
                />
              </div>
            </div>
          </div>
        )
      }

      case 'GitHub': {
        return (
          <div className="flex flex-col gap-y-5">
            <div
              className="flex rounded-lg bg-blue-100 p-4 text-sm text-blue-700 dark:bg-blue-200 dark:text-blue-800"
              role="alert"
            >
              <InfoIcon className="mr-1" />
              <div className=" text-justify">
                To enable, set your project repo below. Go to your GitHub repo then to Settings
                page. Click Webhooks. Create one and fill the details using the credentials below.
              </div>
            </div>
            <div>
              <label className="mb-3 block text-start text-sm font-medium text-gray-900 ">
                Set Repository
              </label>
              <div className="flex">
                <input
                  type="text"
                  defaultValue={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="owner/repository-name"
                  id="website-admin"
                  className="z-10 block w-full min-w-0 flex-1 rounded-none rounded-l-lg border-gray-300 p-2.5 text-sm placeholder-gray-400 focus:border-blue-500"
                />
                <button
                  onClick={() => handleSubmitProjectRepo()}
                  disabled={isRepoLoading}
                  className={`inline-flex cursor-pointer items-center rounded-r-md border border-r-0 border-green-600 bg-green-600 px-3 text-sm hover:bg-green-700 `}
                >
                  {isRepoLoading ? (
                    <Spinner className="h-5 w-5 text-white" />
                  ) : (
                    <HiCheck aria-hidden="true" className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="mb-3 block text-start text-sm font-medium text-gray-900 ">
                Payload URL
              </label>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={`${process.env.NEXT_PUBLIC_BACKEND_URL}api/github-webhooks`}
                  id="website-admin"
                  className="z-10 block w-full min-w-0 flex-1 rounded-none rounded-l-lg border-gray-300 p-2.5 text-sm placeholder-gray-400 focus:border-blue-500"
                />
                <span
                  onClick={handleCopyPayloadURL}
                  className="inline-flex cursor-pointer items-center rounded-r-md border border-r-0  bg-gray-200  px-3 text-sm "
                >
                  <HiClipboardList aria-hidden="true" className="h-5 w-5 text-slate-500" />
                </span>
              </div>
            </div>
            <div>
              <label className="mb-3 block text-start text-sm font-medium text-gray-900 ">
                Signing Key
              </label>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={`${process.env.NEXT_PUBLIC_GITHUB_SIGNING_KEY}`}
                  id="website-admin"
                  className="z-10 block w-full min-w-0 flex-1 rounded-none rounded-l-lg border-gray-300 p-2.5 text-sm placeholder-gray-400 focus:border-blue-500"
                />
                <span
                  onClick={handleCopySigningKey}
                  className="inline-flex cursor-pointer items-center rounded-r-md border border-r-0  bg-gray-200  px-3 text-sm "
                >
                  <HiClipboardList aria-hidden="true" className="h-5 w-5 text-slate-500" />
                </span>
              </div>
            </div>
          </div>
        )
      }

      default: {
        return <h1 className="text-px-18 text-rose-600">404 Error!</h1>
      }
    }
  }

  return (
    <DialogBox
      isOpen={true}
      closeModal={() => setOpenSettings(false)}
      hasMenu={true}
      menu={modalMenu}
      className="flex flex-col"
      headerTitle="Project Settings"
    >
      {activeComponent(active)}
    </DialogBox>
  )
}

export default ProjectSettingsModal
