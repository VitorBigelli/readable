import React from 'react'; 
import { withRouter, Route } from 'react-router-dom'; 

const CategoryList = withRouter(({history, categories, updateCategory, currentPath}) => {

		console.log(currentPath.substring(1))

		const onChangeCategory = (event) => {
			event.preventDefault(); 
			const category = event.target.value
			updateCategory(history, category)
		}

		return (
			<select 
				value={currentPath.substring(1)}
				className="categories-list"
				onChange={ (event) => onChangeCategory(event)}
			>
				<option key="none" value="" className="categories-list-item"> All posts </option>
			{ categories && categories.map( category => (
				<option 
					key={category.name} value={category.name} 
					className="categories-list-item"
				>
					{ category.name }
				</option>			
				)
			)}
			</select>
		)
	}
)


export default CategoryList;