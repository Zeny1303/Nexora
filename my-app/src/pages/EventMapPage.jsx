import SidebarFilters from "../components/SidebarFilters"
import MapView from "../components/MapView"

export default function EventMapPage() {

  return (
    <div className="h-screen w-full flex bg-black">

      <SidebarFilters />

      <div className="flex-1 relative">
        <MapView />
      </div>

    </div>
  )

}