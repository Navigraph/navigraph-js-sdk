import React from "react"

export default function Button(props: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-black dark:bg-white text-white dark:text-black py-2 px-4 font-semibold rounded-md"
      {...props}
    />
  )
}
