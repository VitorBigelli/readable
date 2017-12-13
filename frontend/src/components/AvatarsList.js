import React from 'react'; 

export const AvatarsList = ({pickedAvatar}) => {

	function onCheck(option) {
		pickedAvatar(option)
	}

	return (
		<ul className="avatar-list"> 
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/default.png') }/>
					<img src={process.env.PUBLIC_URL + "/avatars/default.png"} className="default-avatar avatar-image" /> 
			</li> 
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/rick.jpg') }/>
				<img src={process.env.PUBLIC_URL + "/avatars/rick.jpg"} className="avatar-image" /> 
			</li>
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/morty.jpg') }/>
				<img src={process.env.PUBLIC_URL + "/avatars/morty.jpg"} className="avatar-image" />
			</li>
			<li className="avatar-item">
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/summer.jpg') }/>
				<img src={process.env.PUBLIC_URL + "/avatars/summer.jpg"} className="avatar-image" /> 
			</li>
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/beth.png') }/>
				<img src={process.env.PUBLIC_URL + "/avatars/beth.png"} className="avatar-image" /> 
			</li>
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/jerry.jpg') }/>
				<img src={process.env.PUBLIC_URL + "/avatars/jerry.jpg"} className="avatar-image" /> 
			</li>
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/puppybuthole.jpg') }/>
				<img src={process.env.PUBLIC_URL + "/avatars/puppybuthole.jpg"} className="avatar-image" /> 
			</li>
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/meeseeks.png') }/>
				<img src={process.env.PUBLIC_URL + "/avatars/meeseeks.png"}  className="avatar-image" /> 
			</li>
		</ul>
	)
}
