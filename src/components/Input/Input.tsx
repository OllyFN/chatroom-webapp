import './inputStyles.css'
import sendIcon from '/icons/send.svg' // in public folder
import {useState} from 'react'

/*

Input handles validating and sanitizing messages,
it calls sendMessage (main.tsx) function when the user sends a message
which passes all the checks set by validateMessage function.

*/

const validateMessage = (message:string) => {
	// Make sure it isn't empty
	if (message.length==0) {return(false)}

	// Make sure the message isn't filled with spaces only
	let i;
	for(i = 0; i < message.length; i++) {
		if (message[i]!=" ") {i=-1; break}
	}
	if (i!=-1) {return(false)}

	// Message passed all checks
	return(true)
}

const sanitizeMessage = (message:string) => {
	// The website doesn't have any sensitive data so we dont need to worry about XML attacks,
	// the only thing we sanitize in the message is any trailing spaces at the beginning or end.
	
	// Find beginning
	let i=0
	while(message[i]==" ") {i++}
	const beginningOfMessage=i

	// Find end
	i=message.length-1
	while(message[i]==" ") {i--}
	const endOfMessage=i

	// Return whole string
	return(
		(beginningOfMessage==0 && endOfMessage==message.length-1) ?
		message : // we omit slicing the string incase there is no traiing spaces anywhere
		message.slice(beginningOfMessage, endOfMessage+1)
	)
}

export default function Input({sendMessage}:{sendMessage: (message:string) => void}) {
	const [message, setMessage] = useState('')

	// This function runs whenever the user clicks the send button or presses Enter
	const submitMessage = () => {
		// It checks if the message is valid
		if (validateMessage(message)) {
			// If it passes the checks, it passes the sanitized message as the argument
			sendMessage(sanitizeMessage(message))
			setMessage('')
		}else {
			alert('Invalid message.')
		}
	}

	// these are the props we pass to the input component,
	// by declaring it outside the return function we keep the code readable
	const inputProps = {
		placeholder: "Message",
		spellCheck: "false",
		value: message,
		onChange: e => setMessage(e.currentTarget.value),
		onKeyPress: e => e.key=='Enter' && submitMessage()
	}

	return(
		<div className="inputWrapper">
			<input className="input" {...inputProps} />
			<button className="sendButton" onClick={submitMessage}>
				<img className="sendIcon" src={sendIcon} aria-label='send'/>
			</button>
		</div>
	)
}