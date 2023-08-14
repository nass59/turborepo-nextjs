"use client"

import { useParams, useRouter } from "next/navigation"
import { routes } from "@/constants/routes"

import { Button, DataTable, Heading, Separator } from "@shared/ui"
import { ApiList } from "@/components/admin/api-list"
import {
  columns,
  type CategoryColumn,
} from "@/components/admin/category-columns"
import { Icons } from "@/components/icons"

interface CategoryClientProps {
  data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your space"
        />

        <Button
          onClick={() =>
            router.push(`${routes.dashboard}/${params.spaceId}/categories/new`)
          }
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Categories" />

      <Separator />

      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  )
}
