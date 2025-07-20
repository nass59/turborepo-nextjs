import { Separator } from "@workspace/ui"
import { ApiList } from "@/features/admin/common/ui/api-list"
import { ListHeading } from "@/features/admin/common/ui/list-heading"
import { COURSE_LABELS } from "@/features/admin/course/constants/course"

type Props = {
  params: {
    spaceId: string
  }
}

export default async function Page({ params }: Props) {
  const { list: listLabels, api: apiLabels, resource } = COURSE_LABELS
  return (
    <>
      <ListHeading labels={listLabels} value={0} path={`/${resource}/new`} />
      <Separator />
      <ApiList
        resource={resource}
        resourceId={apiLabels.resourceId}
        spaceId={params.spaceId}
      />
    </>
  )
}
