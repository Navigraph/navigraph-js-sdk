import clsx from "clsx"
import { IconType } from "react-icons"

interface Props {
    value: string
    onChange: (value: string) => void
    label: string
    icon?: IconType
    className?: string
    disabled?: boolean
}

export function TextField({ value, onChange, label, className, icon: Icon, disabled }: Props) {
    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                disabled={disabled}
                placeholder={label}
                onChange={(e) => onChange(e.target.value)}
                className={clsx("peer rounded-md bg-ng-background-300 shadow-inner border-ng-background-400 border-2 p-2 text-opacity-100 focus:border-white text-white text-sm disabled:text-gray-100", Icon && 'pl-10', className)}
            />
            {Icon && <Icon className="absolute top-1/2 left-3 -translate-y-1/2 peer-focus:text-white text-gray-200" size={15} />}
        </div>
    )
}