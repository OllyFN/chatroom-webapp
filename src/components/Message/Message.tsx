import './messageStyles.css'
// This is a really simple component
// to the point where it really does NOT need to be a seperate component
// but I decided to still do it to maintain readability.
export default function Message({message}:{message:string}) {return(
	<div className="message">{message}</div>
)}