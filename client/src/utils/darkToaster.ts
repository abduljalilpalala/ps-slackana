import toast from "react-hot-toast";

export const darkToaster = (icon: string = "", message: string = "Message here") => {
  return toast.success(message, { icon });
}
