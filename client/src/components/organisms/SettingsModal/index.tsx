import React, { useState } from "react";
import Image from 'next/image';

import SubmitButton from "~/components/atoms/SubmitButton";
import TaskIcon from "~/shared/icons/TaskIcon";
import { globals } from "~/shared/twin/globals.styles";
import CalendarIcon from "~/shared/icons/CalendarIcon";
import DialogBox from "~/components/templates/DialogBox";
import SwitchToggle from "~/components/atoms/SwitchToggle";
import { styles as settingsStyle } from '~/shared/twin/settings-modal.style';

const SettingsModal = ({ close }: { close: (value: boolean) => void }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [active, setActive] = useState<string>("Profile");

  const onClick = (e: any): void => {
    const value = e.target.innerText;
    setActive(value);
  }

  const menuList = ["Profile", "Security", "Notification"];

  const modalMenu = menuList.map((menu: string, index: number) => {
    return <button key={index} onClick={onClick} css={`${settingsStyle.inactive} ${active === menu && settingsStyle.active}`}>{menu}</button>
  });

  const onSubmit = (): void => {
    console.log("Integrate on submit");
    setIsSubmitting(true);
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
                  src={'/images/animated-avatar.jpg'}
                  alt="team-icon"
                  width={88}
                  height={88}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-3">
                  <button css={settingsStyle.upload}>Upload new photo</button>
                  <button css={settingsStyle.remove}>Remove photo</button>
                </div>
              </div>
              <p className="text-slate-600 text-px-12 text-left">Photos help your teammates recognize you in Slackana</p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="full-name" css={globals.form_label} className="float-left">
                  Your full name
                </label>
                <input
                  type="text"
                  name="full-name"
                  css={globals.form_control}
                  disabled={isSubmitting}
                  placeholder="john doe"
                />
              </div>
              <div >
                <label htmlFor="email" css={globals.form_label} className="float-left">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  css={globals.form_control}
                  disabled={isSubmitting}
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <SubmitButton isSubmitting={isSubmitting} submitted={onSubmit} text="Save changes" />
          </>
        )
      }
      case "Security": {
        return (
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-6">
              <div >
                <label htmlFor="current-password" css={globals.form_label} className="float-left">
                  Current password <span>*</span>
                </label>
                <input
                  type="password"
                  name="current-password"
                  css={globals.form_control}
                  disabled={isSubmitting}
                  placeholder="********"
                />
              </div>
              <div >
                <label htmlFor="new-password" css={globals.form_label} className="float-left">
                  New password <span>*</span>
                </label>
                <input
                  type="password"
                  name="new-password"
                  css={globals.form_control}
                  disabled={isSubmitting}
                  placeholder="***********"
                />
              </div>
              <div >
                <label htmlFor="confirm-password" css={globals.form_label} className="float-left">
                  Confirm new password <span>*</span>
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  css={globals.form_control}
                  disabled={isSubmitting}
                  placeholder="***********"
                />
              </div>
            </div>
            <SubmitButton isSubmitting={isSubmitting} submitted={onSubmit} text="Save changes" />
          </div>
        );
      }
      case "Notification": {
        const switchState = (value: boolean) => {
          console.log(value)
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
                <SwitchToggle value={switchState} className="mt-[3px]" state={false} />
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
