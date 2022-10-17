import React, { useState } from "react";;

import {
  uploadPhoto,
  updatePassword,
  updateNotification,
  updateProfileDetails,
} from "~/redux/setting/settingSlice";
import toast from "react-hot-toast";
import TaskIcon from "~/shared/icons/TaskIcon";
import { darkToaster } from "~/utils/darkToaster";
import { Password, Profile } from "./SettingsType";
import { globals } from "~/shared/twin/globals.styles";
import CalendarIcon from "~/shared/icons/CalendarIcon";
import DialogBox from "~/components/templates/DialogBox";
import { getProject } from "~/redux/project/projectSlice";
import { hydrateUserState } from "~/redux/auth/authSlice";
import SwitchToggle from "~/components/atoms/SwitchToggle";
import SubmitButton from "~/components/atoms/SubmitButton";
import { useAppDispatch, useAppSelector } from "~/hooks/reduxSelector";
import { styles as settingsStyle } from '~/shared/twin/settings-modal.style';
import ReactTooltip from "react-tooltip";

const SettingsModal = ({ close }: { close: (value: boolean) => void }) => {
  const dispatch = useAppDispatch();

  const [active, setActive] = useState<string>("Profile");
  const onClick = (e: any): void => {
    const value = e.target.innerText;
    setActive(value);
  }

  const { auth: { user, isLoading: userLoading }, setting, project } = useAppSelector((state) => state) || {};
  const { name, email, avatar, id, notification } = user || {};
  const { overviewProject: { id: projectID } } = project || {};
  const { isLoading, error } = setting || {};
  const { status, content } = error || {};
  const { status: notificationStatus } = (notification ?? {})[0] || {};
  const { currentPassword, newConfirmedPassword, newPassword } = content || {};
  const isError = status === 422;

  const [profileData, setProfileData] = useState<Profile>({
    fullName: name,
    email: email
  });
  const { fullName: nameState, email: emailState } = profileData;
  const onProfileChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  const [passwordData, setPasswordData] = useState<Password>({
    currentPassword: "",
    newPassword: "",
    newConfirmedPassword: ""
  });
  const onPasswordChange = (e: { target: { value: string, name: string } }): void => {
    const value = e.target.value;
    const name = e.target.name;
    setPasswordData((prev: any) => ({ ...prev, [name]: value }))
  }

  const uploadImage = (e: any): void => {
    const files = e.target.files[0];
    toast.promise(
      dispatch(uploadPhoto(files))
        .then(((_: any) => {
          dispatch(hydrateUserState());
          dispatch(getProject(projectID));
        })),
      {
        loading: 'Uploading...',
        success: "Photo uploaded successfully!",
        error: "Something went wrong.",
      }
    );
  }

  const onSubmit = (component: string, value?: boolean): void => {
    switch (component) {
      case "profile":
        dispatch(updateProfileDetails({ id, name: nameState, email: emailState }))
          .then((res: any) => {
            if (res?.payload?.status === 422) {
              return darkToaster("❗", "Email was already exist.")
            }
            dispatch(hydrateUserState());
            dispatch(getProject(projectID));
            darkToaster("✅", "Profile updated successfully!")
          })
        break;

      case "security":
        dispatch(updatePassword(passwordData))
          .then((res: any) => {
            if (res?.payload?.status === 422) {
              return darkToaster("❗", "Please resolve the error/s.")
            }
            darkToaster("✅", "Password updated successfully!")
          });
        break;

      case "notification":
        dispatch(updateNotification({ id, status: value }))
          .then((_: any) => {
            darkToaster("✅", value ? "You can now receive notifications!" : "Your notification was muted!")
          });
        break;

      default:
        alert("No component selected");
        break;
    }
  }

  const menuList = ["Profile", "Security", "Notification"];
  const modalMenu = menuList.map((menu: string, index: number) => {
    return (
      <button
        key={index}
        onClick={onClick}
        css={`
          ${settingsStyle.inactive} 
          ${active === menu && settingsStyle.active}
        `}>
        {menu}
      </button>
    )
  });

  const activeComponent = (component: string) => {
    switch (component) {
      case "Profile": {
        return (
          <>
            <div className="flex flex-col gap-4">
              <p className="text-slate-800 text-px-12 text-left">Your photo</p>
              <div css={settingsStyle.uploadContainer}>
                <img
                  src={avatar?.url || '/images/team/qa.png'}
                  alt="team-icon"
                  className="rounded-full max-h-[88px] min-h-[88px] max-w-[88px] min-w-[88px]"
                />
                <div className="flex flex-col gap-3">
                  <input disabled={userLoading} onChange={uploadImage} type="file" className="hidden" id="upload" accept="image/png, image/gif, image/jpeg" />
                  <label css={settingsStyle.upload} htmlFor="upload" className={`flex justify-center items-center cursor-pointer ${userLoading && "!bg-gray-500 !cursor-not-allowed"}`} >
                    {userLoading ? 'Loading...' : "Upload photo"}
                  </label>
                  <button data-tip="Under development" css={settingsStyle.remove} className="hover:!text-slate-900 bg-slate-500 opacity-50 cursor-not-allowed">Remove photo</button>
                  <ReactTooltip />
                </div>
              </div>
              <p className="text-slate-600 text-px-12 text-left">Photos help your teammates recognize you in Slackana</p>
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
                  value={nameState || ""}
                  onChange={onProfileChange}
                  style={{ border: `${content?.name ? "1px solid red" : ""}` }}
                />
                {isError && <span className="text-sm text-red-600 float-left">{content?.name}</span>}
              </div>
              <div >
                <label htmlFor="email" css={globals.form_label} className="float-left">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  css={globals.form_control}
                  disabled={isLoading}
                  placeholder="name@company.com"
                  value={emailState || ""}
                  onChange={onProfileChange}
                  style={{ border: `${content?.email ? "1px solid red" : ""}` }}
                />
                {isError && <span className="text-sm text-red-600 float-left">{content?.email}</span>}
              </div>
            </div>
            <SubmitButton isSubmitting={isLoading} submitted={() => onSubmit("profile")} text="Save changes" />
          </>
        )
      }

      case "Security": {
        return (
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-6">
              <div >
                <label htmlFor="currentPassword" css={globals.form_label} className="float-left">
                  Current password <span>*</span>
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  css={globals.form_control}
                  disabled={isLoading}
                  placeholder="********"
                  onChange={onPasswordChange}
                />
                {isError && <div className="flex flex-col justify-start w-full text-left">
                  {currentPassword?.map((error: string, index: number) => {
                    return <span key={index} className="text-sm text-red-600 float-left mt-[3px]">{currentPassword.length >= 2 && "*"} {error}</span>
                  })}
                </div>}
              </div>
              <div >
                <label htmlFor="newPassword" css={globals.form_label} className="float-left">
                  New password <span>*</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  css={globals.form_control}
                  disabled={isLoading}
                  placeholder="***********"
                  onChange={onPasswordChange}
                />
                {isError && <span className="text-sm text-red-600 float-left text-left">{newPassword}</span>}
              </div>
              <div >
                <label htmlFor="newConfirmedPassword" css={globals.form_label} className="float-left">
                  Confirm new password <span>*</span>
                </label>
                <input
                  type="password"
                  name="newConfirmedPassword"
                  css={globals.form_control}
                  disabled={isLoading}
                  placeholder="***********"
                  onChange={onPasswordChange}
                />
                {isError && <span className="text-sm text-red-600 float-left text-left">{newConfirmedPassword}</span>}
              </div>
            </div>
            <SubmitButton isSubmitting={isLoading} submitted={() => onSubmit("security")} text="Save changes" />
          </div>
        );
      }

      case "Notification": {
        const switchState = (value: boolean) => {
          onSubmit("notification", value);
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
                <SwitchToggle value={switchState} className="mt-[3px]" state={notificationStatus ? true : false} />
              </div>
              {/* <div css={settingsStyle.disabled}>
                <div className="flex flex-row gap-3">
                  <CalendarIcon />
                  <p css={settingsStyle.value}>Notifications for Google Meeting reminder</p>
                </div>
                <SwitchToggle value={switchState} className="mt-[3px]" state={false} isDisabled={true} />
              </div> */}
            </div>
          </div>
        );
      }

      default: {
        return (
          <h1 className="text-px-18 text-rose-600">404 Error!</h1>
        );
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
  );
};

export default SettingsModal;
