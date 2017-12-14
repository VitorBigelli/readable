import React from 'react'; 
import PropTypes from 'prop-types';
export const AvatarsList = ({pickedAvatar}) => {

	function onCheck(option) {
		pickedAvatar(option)
	}

	const avatarNames = [ 'default.png', 'rick.jpg', 'morty.jpg', 'beth.png', 'summer.jpg', 'jerry.jpg', 'puppybuthole.jpg', 'meeseeks.png' ]

	return (
		<ul className="avatar-list"> 
			{ avatarNames.map( avatar => (
				<li className="avatar-item" key={avatar} > 
					<input name="avatar" type="radio" className="avatar-checkbox" onChange={ () => onCheck('/avatars/'+avatar) }/>
						<img alt={avatar} src={process.env.PUBLIC_URL + "/avatars/" + avatar} className="default-avatar avatar-image" /> 
				</li> 
			))}
		</ul>
	)
}

AvatarsList.propTypes = {
	pickedAvatar: PropTypes.func.isRequired
}