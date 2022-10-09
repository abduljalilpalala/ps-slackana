import React, { useEffect, useState } from "react";
import Image from 'next/image';

import SubmitButton from "~/components/atoms/SubmitButton";
import TaskIcon from "~/shared/icons/TaskIcon";
import { globals } from "~/shared/twin/globals.styles";
import CalendarIcon from "~/shared/icons/CalendarIcon";
import DialogBox from "~/components/templates/DialogBox";
import SwitchToggle from "~/components/atoms/SwitchToggle";
import { styles as settingsStyle } from '~/shared/twin/settings-modal.style';
import { useAppDispatch, useAppSelector } from "~/hooks/reduxSelector";
import { removePhoto, updateNotification, updatePassword, updateProfileDetails, uploadPhoto } from "~/redux/setting/settingSlice";
import { filterProjects, getProject, memberRefresher, resetRefresher } from "~/redux/project/projectSlice";
import { hydrateUserState } from "~/redux/auth/authSlice";

const SettingsModal = ({ close }: { close: (value: boolean) => void }) => {
  const dispatch = useAppDispatch();

  const { auth: { user, isLoading: userLoading }, setting, project } = useAppSelector((state) => state) || {};
  const { name, email, avatar, id, notification } = user || {};
  const { overviewProject: { id: projectID } } = project || {};
  const { isLoading, error } = setting || {};
  const { status, content } = error || {};
  const { status: notificationStatus } = (notification ?? {})[0] || {};
  const { currentPassword, newConfirmedPassword, newPassword } = content || {};
  const isError = status === 422;

  const [nameState, setNameState] = useState<any>(name);
  const nameOnChange = (e: any) => {
    const value = e.target.value;
    setNameState(value);
  }

  const [emailState, setEmailState] = useState<any>(email);
  const emailOnChange = (e: any) => {
    const value = e.target.value;
    setEmailState(value);
  }

  const [active, setActive] = useState<string>("Profile");
  const onClick = (e: any): void => {
    const value = e.target.innerText;
    setActive(value);
  }

  const menuList = ["Profile", "Security", "Notification"];
  const modalMenu = menuList.map((menu: string, index: number) => {
    return <button key={index} onClick={onClick} css={`${settingsStyle.inactive} ${active === menu && settingsStyle.active}`}>{menu}</button>
  });

  const [passwordData, setPasswordData] = useState<{ currentPassword: string, newPassword: string, newConfirmedPassword: string }>({
    currentPassword: "",
    newPassword: "",
    newConfirmedPassword: ""
  });
  const onPasswordChange = (e: any): void => {
    const value = e.target.value;
    const name = e.target.name;

    setPasswordData((prev: any) => ({ ...prev, [name]: value }))
  }

  const uploadImage = (e: any): void => {
    const files = e.target.files[0];

    dispatch(uploadPhoto(files))
      .then(((_: any) => {
        dispatch(hydrateUserState());
        dispatch(getProject(projectID));
      }));
  }

  const onSubmit = (component: string, value?: boolean): void => {
    switch (component) {
      case "profile":
        dispatch(updateProfileDetails({ id, name: nameState, email: emailState }))
          .then((_: any) => {
            isError || close(false);
            dispatch(hydrateUserState());
            console.log("toastify here");
          });
        break;
      case "security":
        dispatch(updatePassword(passwordData))
          .then((_: any) => {
            isError || close(false);
            console.log("toastify here");
          });
        break;
      case "notification":
        dispatch(updateNotification({ id, status: value }))
          .then((_: any) => {
            console.log("toastify here");
          });
        break;

      default:
        alert("No component selected");
        break;
    }
  }

  const activeComponent = (component: string) => {
    switch (component) {
      case "Profile": {
        return (
          <>
            <div className="flex flex-col gap-4">
              <p className="text-slate-800 text-px-12 text-left">Your photo</p>
              <div css={settingsStyle.uploadContainer}>
                <Image
                  src={userLoading ? '/images/avatar.png' : avatar?.url || '/images/team/qa.png'}
                  alt="team-icon"
                  width={88}
                  height={88}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-3">
                  <input disabled={userLoading} onChange={uploadImage} type="file" className="hidden" id="upload" accept="image/png, image/gif, image/jpeg" />
                  <label css={settingsStyle.upload} htmlFor="upload" className={`flex justify-center items-center cursor-pointer ${userLoading && "!bg-gray-500 !cursor-not-allowed"}`} >
                    {userLoading ? 'Loading...' : "Upload photo"}
                  </label>
                  <button css={settingsStyle.remove} disabled={true} className="hover:!text-slate-900 bg-slate-500 opacity-50 cursor-not-allowed">Remove photo</button>
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
                  onChange={nameOnChange}
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
                  onChange={emailOnChange}
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
                  {currentPassword?.map((error: string) => {
                    return <span className="text-sm text-red-600 float-left mt-[3px]">{currentPassword.length >= 2 && "*"} {error}</span>
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
              <div css={settingsStyle.disabled}>
                <div className="flex flex-row gap-3">
                  <CalendarIcon />
                  <p css={settingsStyle.value}>Notifications for Google Meeting reminder</p>
                </div>
                <SwitchToggle value={switchState} className="mt-[3px]" state={false} isDisabled={true} />
              </div>
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
