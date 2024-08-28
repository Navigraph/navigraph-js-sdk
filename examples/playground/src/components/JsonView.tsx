import clsx from "clsx";

interface Props {
    content: any;
    onClick?: () => void;
}

export default function JsonView({ content, onClick }: Props) {
    return (
        <div className={clsx("pane overflow-auto w-full no-scrollbar", onClick && 'cursor-pointer')}>
            <pre className={clsx("text-white text-xs", onClick && 'hover:text-gray-50')}>{JSON.stringify(content, null, 2)}</pre>
        </div>
    )
}