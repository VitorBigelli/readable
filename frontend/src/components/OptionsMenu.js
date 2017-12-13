import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';

class OptionsMenu extends Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);

		this.state = {
			dropdownOpen: false,
		}
	}

	toggle = () => {
		this.setState( () => ({
			dropdownOpen: !this.state.dropdownOpen
		}))
	}

	render() {
		const { post = {} , comment = {} } = this.props

		const id = post ? post.id : comment.id

		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
		        <DropdownToggle caret></DropdownToggle>
	        	<DropdownMenu>
	          		<DropdownItem
	          			className="edit-post-button"
	          			onClick={ () => (this.props.openModal())}
	          		> Edit</DropdownItem>
	        		<DropdownItem 
	        			className="delete-post-button"
	        			onClick={ () => (this.props.delete(id))}
	        		> Delete</DropdownItem>
	    		</DropdownMenu>
	    	</Dropdown>


		)

	}
}

export default OptionsMenu;

OptionsMenu.propTypes = {
	post: PropTypes.object,
	comment: PropTypes.object
}