import clsx from "clsx"

interface Props {
  content: unknown
  onClick?: () => void
}

/**
 * Renders any object as JSON on a scrollable pane
 */
export default function JsonView({ content, onClick }: Props) {
  return (
    <div className={clsx("pane overflow-auto w-full max-h-96", onClick && "cursor-pointer")}>
      <pre className={clsx("text-white text-xs", onClick && "hover:text-gray-50")}>
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  )
}
