import React from 'react';

export const SortBy = ({sortBy}) => {

	function handleChange(e) {
		e.preventDefault(); 
		sortBy(e.target.value)
	}

	return (
		<select className="sort-posts" onChange={ (event) => handleChange(event)}>
			<option name="date_newest" value="newest"> Date (newest first) </option>
			<option name="date_oldest" value="oldest"> Date (oldest first) </option>
			<option name="score_highest" value="highest"> Vote score (highest first) </option>
			<option name="score_lowest" value="lowest"> Vote score (lowest first) </option>
		</select>
	)
}