import React from 'react'; 
import { Link, Route } from 'react-router-dom'; 

const CategoryList = ({categories}) => {

	return (
	<div className="categories-list-container">
		<ul className="categories-list">
		{ categories && categories.map( category => (
			<Link key={category.name}  to={"/" + category.path}>
				<li className="categories-list-item">
					{ category.name }
				</li>

			</Link>
				
		))
		}
		</ul>
	</div>
	)
}

export default CategoryList;