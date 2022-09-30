import { useState } from 'react'
import { Switch } from '@headlessui/react'

type Props = {
  value: (value: boolean) => void;
  className?: string;
  isDisabled?: boolean;
  state: boolean
}

const SwitchToggle: React.FC<Props> = ({ value, className, isDisabled, state }) => {
  const [enabled, setEnabled] = useState(state);

  const onChange = () => {
    if (isDisabled) return;

    setEnabled(!enabled);
    value(!enabled);
  }

  return (
    <div className={className}>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${enabled ? 'bg-blue-600' : 'bg-slate-600'}
          relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
export default SwitchToggle;
