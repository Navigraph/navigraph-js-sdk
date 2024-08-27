import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props {
    selected?: boolean;
    className?: string;
    disabled?: boolean;
    onClick: () => void;
}

export default function Button({ selected, onClick, children, className, disabled }: PropsWithChildren<Props>) {
    return (
        <button disabled={disabled} onClick={onClick} className={clsx("p-1 rounded-lg shadow-lg border-blue-gray-400 border-[1px] text-white text-sm font-semibold disabled:text-gray-200", selected ? 'bg-blue-50 enabled:hover:bg-blue-25' : 'bg-blue-gray-200  enabled:hover:bg-blue-gray-50', className)}>
            {children}
        </button>
    )
}

export function LargeButton({ onClick, children, className, disabled }: PropsWithChildren<Omit<Props, 'selected'>>) {
    return (
        <button disabled={disabled} onClick={onClick} className={clsx("p-2 rounded-lg shadow-lg text-white text-sm font-semibold disabled:text-gray-200", 'bg-blue-50 enabled:hover:bg-blue-25', className)}>
            {children}
        </button>
    )
}