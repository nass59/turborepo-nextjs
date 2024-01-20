import { apiRoutes } from "../constants/routes"
import { Api } from "./api"

type Props = {
  resource: string
  resourceId: string
  spaceId: string
}

const METHODS = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  delete: "DELETE",
} as const

const VISIBILITY = {
  public: "public",
  admin: "admin",
} as const

export const ApiList = ({ resource, resourceId, spaceId }: Props) => {
  const baseUrl = `${apiRoutes.spaces}/${spaceId}`

  return (
    <>
      <Api
        title={METHODS.get}
        variant={VISIBILITY.public}
        path={`${baseUrl}/${resource}`}
      />
      <Api
        title={METHODS.get}
        variant={VISIBILITY.public}
        path={`${baseUrl}/${resource}/{${resourceId}}`}
      />
      <Api
        title={METHODS.post}
        variant={VISIBILITY.admin}
        path={`${baseUrl}/${resource}`}
      />
      <Api
        title={METHODS.patch}
        variant={VISIBILITY.admin}
        path={`${baseUrl}/${resource}/{${resourceId}}`}
      />
      <Api
        title={METHODS.delete}
        variant={VISIBILITY.admin}
        path={`${baseUrl}/${resource}/{${resourceId}}`}
      />
    </>
  )
}
