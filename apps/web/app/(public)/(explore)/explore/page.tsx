import { ContentContainer } from "@/components/content-container"
import { Billboard } from "@/features/explore/ui/billboard"
import { List } from "@/features/explore/ui/list"
import { getBillboard } from "@/features/explore/utilities/billboard"
import { getItems } from "@/features/explore/utilities/item"

export default async function Page() {
  const billboard = await getBillboard()
  const items = await getItems()

  return (
    <>
      {billboard && <Billboard data={billboard} />}
      <ContentContainer>
        <List title="Featured News" items={items} />
      </ContentContainer>
    </>
  )
}
