import { useEffect, useState } from "react"

export const useActiveItem = (itemIds: (string | undefined)[]) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      if (id) {
        const element = document.getElementById(id)
        if (element) {
          observer.observe(element)
        }
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        if (id) {
          const element = document.getElementById(id)
          if (element) {
            observer.unobserve(element)
          }
        }
      })
    }
  }, [itemIds])

  return activeId
}
