export default function EventMarker({event,onClick}){

return(

<div
onClick={()=>onClick(event)}
className="w-4 h-4 bg-orange-500 rounded-full shadow-lg cursor-pointer hover:scale-110 transition"
/>

)

}