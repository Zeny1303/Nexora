export default function EventPopup({event}){

return(

<div className="text-black">

<h3 className="font-bold text-lg">
{event.title}
</h3>

<p>{event.college}</p>

<p className="text-sm text-gray-600">
{event.date}
</p>

<button className="mt-2 text-orange-500 text-sm">
View Event →
</button>

</div>

)

}