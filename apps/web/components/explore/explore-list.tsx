import { type ItemModel } from "@/lib/database/models/Item"
import { parseData } from "@/lib/utils"
import ExploreCard from "@/components/explore/explore-card"
import NoResults from "@/components/explore/no-results"

interface ExploreListProps {
  title: string
  items: ItemModel[]
}

const ExploreList: React.FC<ExploreListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ExploreCard key={item._id.toString()} data={parseData(item)} />
        ))}
      </div>
    </div>
  )
}

export default ExploreList
