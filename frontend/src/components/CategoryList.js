import React from 'react'; 
import { Link, Route } from 'react-router-dom'; 

const CategoryList = ({categories, updateCategory}) => {

	return (
	<div defaultValue='none' className="categories-list-container">
		<select 
			className="categories-list"
		>
			<option key="none" value="none" className="categories-list-item"> All posts </option>
		{ categories && categories.map( category => (
			<option 
				key={category.name} value={category.name} 
				className="categories-list-item"
				onClick={ updateCategory(category.name) }
			>
					{ category.name }
			</option>			
		))
		}
		</select>
	</div>
	)
}

export default CategoryList;