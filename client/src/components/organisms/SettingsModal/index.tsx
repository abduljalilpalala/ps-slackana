import { X } from 'react-feather'
import toast from 'react-hot-toast'
import ReactTooltip from 'react-tooltip'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'

import {
  uploadPhoto,
  updatePassword,
  updateNotification,
  updateProfileDetails
} from '~/redux/setting/settingSlice'
import { Security } from '~/shared/types'
import TaskIcon from '~/shared/icons/TaskIcon'
import { darkToaster } from '~/utils/darkToaster'
import { Password, Profile } from './SettingsType'
import { styles } from '~/shared/twin/auth.styles'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { globals } from '~/shared/twin/globals.styles'
import { SecurityFormSchema } from '~/shared/validation'
import DialogBox from '~/components/templates/DialogBox'
import { getProject } from '~/redux/project/projectSlice'
import handleImageError from '~/helpers/handleImageError'
import { hydrateUserState } from '~/redux/auth/authSlice'
import SwitchToggle from '~/components/atoms/SwitchToggle'
import SubmitButton from '~/components/atoms/SubmitButton'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { styles as settingsStyle } from '~/shared/twin/settings-modal.style'

const SettingsModal = ({ close }: { close: (value: boolean) => void }) => {
  const dispatch = useAppDispatch()
  const [passError, setPassError]: any = useState(null)

  const [active, setActive] = useState<string>('Profile')
  const onClick = (e: any): void => {
    const value = e.target.innerText
    setActive(value)
  }

  const {
    auth: { user, isLoading: userLoading },
    setting,
    project
  } = useAppSelector((state) => state) || {}
  const { name, email, avatar, id, notification } = user || {}
  const {
    overviewProject: { id: projectID }
  } = project || {}
  const { isLoading, error } = setting || {}
  const { status, content } = error || {}
  const { status: notificationStatus } = (notification ?? {})[0] || {}
  const { currentPassword, newConfirmedPassword, newPassword } = content || {}
  const isError = status === 422

  useEffect(() => {
    setPassError(currentPassword)
  }, [content])

  const [profileData, setProfileData] = useState<Profile>({
    fullName: name,
    email: email
  })
  const { fullName: nameState, email: emailState } = profileData
  const onProfileChange = (e: any) => {
    const value = e.target.value
    const name = e.target.name
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const [passwordData, setPasswordData] = useState<Password>({
    currentPassword: '',
    newPassword: '',
    newConfirmedPassword: ''
  })
  const onPasswordChange = (e: { target: { value: string; name: string } }): void => {
    const value = e.target.value
    const name = e.target.name
    setPasswordData((prev: any) => ({ ...prev, [name]: value }))
  }

  const uploadImage = (e: any): void => {
    const files = e.target.files[0]
    toast.promise(
      dispatch(uploadPhoto(files)).then((_: any) => {
        dispatch(hydrateUserState())
        dispatch(getProject(projectID))
      }),
      {
        loading: 'Uploading...',
        success: 'Photo uploaded successfully!',
        error: 'Something went wrong.'
      }
    )
  }

  const onSubmit = (component: string, value?: boolean): void => {
    switch (component) {
      case 'profile':
        dispatch(updateProfileDetails({ id, name: nameState, email: emailState })).then(
          (res: any) => {
            if (res?.payload?.status === 422) {
              return darkToaster('❗', 'Email was already exist.')
            }
            dispatch(hydrateUserState())
            dispatch(getProject(projectID))
            darkToaster('✅', 'Profile updated successfully!')
          }
        )
        break

      case 'notification':
        dispatch(updateNotification({ id, status: value })).then((_: any) => {
          darkToaster(
            '✅',
            value ? 'You can now receive notifications!' : 'Your notification was muted!'
          )
        })
        break

      default:
        alert('No component selected')
    }
  }

  const menuList = ['Profile', 'Security', 'Notification']
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

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<Security>({
    mode: 'onTouched',
    resolver: yupResolver(SecurityFormSchema)
  })

  const activeComponent = (component: string) => {
    switch (component) {
      case 'Profile': {
        return (
          <>
            <div className="flex flex-col gap-4">
              <p className="text-px-12 text-left text-slate-800">Your photo</p>
              <div css={settingsStyle.uploadContainer}>
                <img
                  src={avatar?.url}
                  onError={(e) => handleImageError(e, '/images/avatar.png')}
                  alt="team-icon"
                  className="max-h-[88px] min-h-[88px] min-w-[88px] max-w-[88px] rounded-full"
                />
                <div className="flex flex-col gap-3">
                  <input
                    disabled={userLoading}
                    onChange={uploadImage}
                    type="file"
                    className="hidden"
                    id="upload"
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <label
                    css={settingsStyle.upload}
                    htmlFor="upload"
                    className={`flex cursor-pointer items-center justify-center ${
                      userLoading && '!cursor-not-allowed !bg-gray-500'
                    } mobile:!max-w-[120px] mobile:!text-sm`}
                  >
                    {userLoading ? 'Loading...' : 'Upload photo'}
                  </label>

                  <button
                    data-tip="Under development"
                    css={settingsStyle.remove}
                    className="cursor-not-allowed bg-slate-500 opacity-50 hover:!text-slate-900 mobile:!max-w-[120px] mobile:!text-sm"
                  >
                    Remove photo
                  </button>
                  <ReactTooltip />
                </div>
              </div>
              <p className="text-px-12 text-left text-slate-600">
                Photos help your teammates recognize you in Slackana
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="fullName" css={globals.form_label} className="float-left">
                  Your full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  css={globals.form_control}
                  disabled={isLoading}
                  placeholder="john doe"
                  value={nameState || ''}
                  onChange={onProfileChange}
                  style={{ border: `${content?.name ? '1px solid red' : ''}` }}
                />
                {isError && (
                  <span className="float-left text-sm text-red-600">{content?.name}</span>
                )}
              </div>
              <div>
                <label htmlFor="email" css={globals.form_label} className="float-left">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  css={globals.form_control}
                  disabled={isLoading}
                  placeholder="name@company.com"
                  value={emailState || ''}
                  onChange={onProfileChange}
                  style={{ border: `${content?.email ? '1px solid red' : ''}` }}
                />
                {isError && (
                  <span className="float-left text-sm text-red-600">{content?.email}</span>
                )}
              </div>
            </div>
            <SubmitButton
              isSubmitting={isLoading}
              submitted={() => onSubmit('profile')}
              text="Save changes"
            />
          </>
        )
      }

      case 'Security': {
        // This will handle Update Password Security
        const handleUpdatePassword = async (data: Security): Promise<void> => {
          const payload = {
            currentPassword: data.current_password,
            newPassword: data.new_password,
            newConfirmedPassword: data.confirm_password
          }

          const res = await dispatch(updatePassword(payload))

          if (res?.payload?.status === 422) {
            darkToaster('❗', 'Please resolve the error/s.')
            return
          }

          darkToaster('✅', 'Password updated successfully!')
          reset({
            current_password: '',
            new_password: '',
            confirm_password: ''
          })
        }

        return (
          <form className="flex flex-col gap-9" onSubmit={handleSubmit(handleUpdatePassword)}>
            {passError?.length >= 2 && (
              <div
                className={`
                  relative flex w-full flex-col items-center justify-center rounded border
                  border-rose-200 bg-rose-50 py-2 text-center text-rose-800 hover:shadow
                  hover:shadow-rose-100
                `}
              >
                {passError?.map((error: string, index: number) => {
                  return (
                    <span key={index} className="pr-5 pl-1 text-sm font-medium">
                      {passError?.length >= 2 && '*'} {error}
                    </span>
                  )
                })}
                <button
                  type="button"
                  className="absolute right-2 rounded hover:bg-rose-100"
                  onClick={() => setPassError(null)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="currentPassword" css={globals.form_label} className="float-left">
                  Current password <span>*</span>
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  css={globals.form_control}
                  {...register('current_password')}
                  disabled={isSubmitting}
                  placeholder="••••••••"
                  className={`
                    ${
                      errors?.current_password &&
                      'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                    }`}
                />
                {errors?.current_password && (
                  <span className="error">{`${errors.current_password.message}`}</span>
                )}
              </div>
              <div>
                <label htmlFor="newPassword" css={globals.form_label} className="float-left">
                  New password <span>*</span>
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...register('new_password')}
                  css={globals.form_control}
                  disabled={isSubmitting}
                  placeholder="••••••••"
                  className={`
                    ${
                      errors?.new_password &&
                      'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                    }`}
                />
                {errors?.new_password && (
                  <span className="error">{`${errors.new_password.message}`}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="newConfirmedPassword"
                  css={globals.form_label}
                  className="float-left"
                >
                  Confirm new password <span>*</span>
                </label>
                <input
                  type="password"
                  id="newConfirmedPassword"
                  {...register('confirm_password')}
                  css={globals.form_control}
                  disabled={isSubmitting}
                  placeholder="••••••••"
                  className={`
                    ${
                      errors?.confirm_password &&
                      'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                    }`}
                />
                {errors?.confirm_password && (
                  <span className="error">{`${errors.confirm_password.message}`}</span>
                )}
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} css={styles.form_submit}>
              {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Save Changes'}
            </button>
          </form>
        )
      }

      case 'Notification': {
        const switchState = (value: boolean) => {
          onSubmit('notification', value)
        }

        return (
          <div>
            <p css={settingsStyle.p}>Turn On/Off</p>
            <div className="flex flex-col gap-3">
              <div css={settingsStyle.notification}>
                <div className="flex flex-row gap-3">
                  <TaskIcon />
                  <p css={settingsStyle.value}>Notifications for Task reminder</p>
                </div>
                <SwitchToggle
                  value={switchState}
                  className="mt-[3px]"
                  state={notificationStatus ? true : false}
                />
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
      closeModal={() => close(false)}
      hasMenu={true}
      menu={modalMenu}
      className="flex flex-col"
      headerTitle="My settings"
    >
      {activeComponent(active)}
    </DialogBox>
  )
}

export default SettingsModal
