"use client"

import { useParams } from "next/navigation"

import { useOrigin } from "@/hooks/use-origin"
import { ApiAlert } from "@/components/admin/api-alert"

interface ApiListProps {
  entityName: string
  entityIdName: string
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

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  const params = useParams()
  const origin = useOrigin()

  const baseUrl = `${origin}/api/spaces/${params.spaceId}`

  return (
    <>
      <ApiAlert
        title={METHODS.get}
        variant={VISIBILITY.public}
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title={METHODS.get}
        variant={VISIBILITY.public}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title={METHODS.post}
        variant={VISIBILITY.admin}
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title={METHODS.patch}
        variant={VISIBILITY.admin}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title={METHODS.delete}
        variant={VISIBILITY.admin}
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  )
}
