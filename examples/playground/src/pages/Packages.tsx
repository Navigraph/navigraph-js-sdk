import { Scope } from "@navigraph/app"
import { useQuery } from "@tanstack/react-query"
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles"
import { Link } from "react-router-dom"
import JsonView from "../components/JsonView"
import { protectedPage } from "../components/protectedPage"

const Packages = protectedPage(
  ({ fmsdata }) => {
    const { data, isLoading } = useQuery({
      queryKey: ["packages-list"],
      queryFn: () => fmsdata.listPackages(),
    })

    return (
      <div className="page-container flex flex-col items-center gap-3 px-3">
        <h1>Available Packages</h1>

        {isLoading && <SpinningCircles />}

        {data && (
          <>
            <span className="text-sm text-gray-100">
              Note that this is only a list of packages available for this client
            </span>
            <div className="flex flex-col gap-3 overflow-auto px-3 self-stretch">
              {data.map(item => (
                <Link to={item.file.url} download>
                  <JsonView onClick={() => null} content={item} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    )
  },
  [Scope.FMSDATA],
)

export default Packages
