import React from 'react'; 
import { withRouter, Route } from 'react-router-dom'; 

const CategoryList = withRouter(({history, categories, updateCategory, currentCategory}) => {

		const onChangeCategory = (event) => {
			event.preventDefault(); 
			const category = event.target.value
			updateCategory(history, category)
		}

		return (
			<select 
				className="categories-list"
				onChange={ (event) => onChangeCategory(event)}
				defaultValue={currentCategory}
			>
				<option key="none" value="" className="categories-list-item"> All posts </option>
			}
			{ categories && categories.map( category => {
				if (("/"+category.name) == currentCategory) {
					return (
						<option 
							key={category.name} value={category.name} 
							className="categories-list-item"
							selected
						>
								{ category.name }
						</option>	
					)		
				} else {
					return (
						<option 
							key={category.name} value={category.name} 
							className="categories-list-item"
						>
							{ category.name }
						</option>			
					)
				}
			})
			}
			</select>
		)
	}
)


export default CategoryList;