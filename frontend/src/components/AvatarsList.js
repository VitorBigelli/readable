import React from 'react'; 

export const AvatarsList = ({pickedAvatar}) => {

	function onCheck(option) {
		pickedAvatar(option)
	}

	return (
		<ul className="avatar-list"> 
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/rick.jpg') }/><div className="rick-avatar avatar-image"></div> 
			</li>
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/morty.jpg') }/><div className="morty-avatar avatar-image"></div>
			</li>
			<li className="avatar-item">
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/summer.jpg') }/><div className="summer-avatar avatar-image"></div> 
			</li>
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/beth.png') }/><div className="beth-avatar avatar-image"></div> 
			</li>
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/jerry.jpg') }/><div  className="jerry-avatar avatar-image"></div> 
			</li>
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/puppybuthole.jpg') }/><div className="puppybuthole-avatar avatar-image"></div> 
			</li>
			<li className="avatar-item"> 
				<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/meeseeks.png') }/><div  className="meeseeks-avatar avatar-image"></div> 
			</li>
		</ul>
	)
}