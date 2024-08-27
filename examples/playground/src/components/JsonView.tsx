export default function JsonView({ content }: { content: any }) {
    return (
        <div className="pane overflow-auto w-full no-scrollbar">
            <pre className="text-white text-xs">{JSON.stringify(content, null, 2)}</pre>
        </div>
    )
}