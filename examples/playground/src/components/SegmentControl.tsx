import clsx from "clsx"

interface Props {
    segments: (string | { label: string, disabled?: boolean })[]
    index: number,
    onChange: (index: number) => void,
    inactiveTextColor?: (index: number) => string,
    activeBackgroundColor?: (index: number) => string,
}

export default function SegmentControl({ segments, index, onChange, inactiveTextColor, activeBackgroundColor }: Props) {
    return (
        <div className="flex flex-row bg-ng-background-500 rounded-md border-2 border-ng-background-600">
            {segments.map((segment, i) => {
                const [disabled, label] = typeof segment === 'object' ? [segment.disabled ?? false, segment.label] : [false, segment];

                return (
                    <button
                        onClick={() => onChange(i)}
                        disabled={disabled}
                        className={clsx(
                            "flex-1 rounded-md font-semibold text-xs enabled:hover:shadow-lg p-1 disabled:text-gray-300",
                            index === i ? activeBackgroundColor?.(i) ?? 'bg-blue-50' : 'enabled:hover:bg-white enabled:hover:bg-opacity-5',
                            index === i || !inactiveTextColor ? 'text-white' : inactiveTextColor?.(i)
                        )}>
                        {label}
                    </button>
                )
            })}
        </div>
    );
}