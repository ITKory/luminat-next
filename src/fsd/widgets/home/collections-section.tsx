import Link from "next/link"
import { collections } from "@/entities/collection/model/collections"

const aspectRatioClassNames = {
  "1:1": "responsive-img-1-1",
  "3:4": "responsive-img-3-4",
  "4:3": "responsive-img-4-3",
} as const

const [
  pendantCollection,
  wallCollection,
  floorCollection,
  trackCollection,
  outdoorCollection,
  artCollection,
] = collections

function CollectionCard({ image, aspectClass }: { image: string; aspectClass: string }) {
  return (
    <div className="collection-card">
      <img src={image} alt="" className={aspectClass} />
      <Link href="/catalog" className="btn-link-bwhite-sec">
        <p>К коллекции→</p>
      </Link>
    </div>
  )
}

export function CollectionsSection() {
  return (
    <section id="collections-section" className="collection" data-snap-section="true">
      <div className="container-fluid mt-72 df grid-12 df column-dir">
        <div className="heading col-6 offset-2 df gap-16 h-gradient">
          <h2>КОЛЛЕКЦИИ</h2>
          <h2 className="italic">СВЕТА</h2>
        </div>
        <div className="collections df gap-32">
          <div className="col-6 df gap-32">
            <div className="w-100 df column-dir gap-16">
              <CollectionCard image={pendantCollection.image} aspectClass={aspectRatioClassNames[pendantCollection.aspectRatio]} />
              <p className="text-green">Подвесные светильники</p>
            </div>
            <div className="w-100 df column-dir gap-16">
              <CollectionCard image={wallCollection.image} aspectClass={aspectRatioClassNames[wallCollection.aspectRatio]} />
              <p className="text-green">Настенные светильники</p>
            </div>
            <div className="w-100 df column-dir gap-16 text-greyge">
              <div className="caption">
                Функциональные <br />и эмоциональные объекты <br />для жилых и публичных пространств
              </div>
            </div>
          </div>
          <div className="col-2 df column-dir gap-16">
            <CollectionCard image={floorCollection.image} aspectClass={aspectRatioClassNames[floorCollection.aspectRatio]} />
            <p className="text-green">Напольные светильники</p>
          </div>
          <div className="col-4 df column-dir gap-16 pr-64">
            <CollectionCard image={trackCollection.image} aspectClass={aspectRatioClassNames[trackCollection.aspectRatio]} />
            <p className="text-green">Споты и треки светильники</p>
          </div>
        </div>
        <div className="collections df gap-32">
          <div className="col-4 offset-2 df column-dir gap-16">
            <CollectionCard image={outdoorCollection.image} aspectClass={aspectRatioClassNames[outdoorCollection.aspectRatio]} />
            <p className="text-green">Уличное освещение</p>
          </div>
          <div className="col-2 df column-dir gap-16">
            <CollectionCard image={artCollection.image} aspectClass={aspectRatioClassNames[artCollection.aspectRatio]} />
            <p className="text-green">Авторские инсталяции</p>
          </div>
          <div className="col-2 df column-dir gap-16 text-greyge">
            <div className="caption">
              Коллекции для жилых, <br /> общественных и арт-пространств
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
