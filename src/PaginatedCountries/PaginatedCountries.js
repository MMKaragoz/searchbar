import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './PaginatedCountries.scss';


const perPage = 5;

export default function PaginatedCountries() {

    const [currentPage, setCurrentPage] = useState([]);
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    
    const searchCountry = (search) => {
        
        search = search.length > 0 ? search[0].toUpperCase() + search.slice(1) : search;
        
        const updateFilteredCountries = countries.filter((country) => {
            
            return country.name.indexOf(search) !== -1;
            
        })
             
        setFilteredCountries(updateFilteredCountries);

    }


    function handlePageClick({ selected: selectedPage }) {

        setCurrentPage(selectedPage);

    }

    const offset = currentPage * perPage;
    
    const countriesForPages = filteredCountries.map((country) => country.name)
    
    const currentPageCountries = countriesForPages
        .slice(offset, offset + perPage);
    
    const pageCount = Math.ceil(filteredCountries.length / perPage);
    
    useEffect(() => {

        fetch("https://restcountries.eu/rest/v2/all")
        .then((response) => response.json())
        .then((data) => {

            const allCountries = data.map((data) => {
                // return {name: data.name, region: data.region}

                return data
            })
            
            setCountries(allCountries)
    
        }, console.error)
        
    }, [])

    return (

        <div className="container">
            <div className = "search-bar">
                <div className = "countries-box">
                    <label htmlFor="country">
                            <input id="country"
                                className="search"
                                placeholder = "Country"
                                onChange = {event => searchCountry(event.target.value)}
                            /> 
                    </label>
                    <div className="country-box-wrapper">
                    {currentPageCountries.map((c) => ( 
                        <div className="country-box">
                            <span className={`incountry`}>
                                {c} 
                            </span>
                        </div>
                    ))}
                    </div>  
                </div>
            </div>
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →    "}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination-link"}
                nextLinkClassName={"pagination-link"}
                disabledClassName={"pagination-link-disabled"}
                activeClassName={"pagination-link-active"}
            />
        </div>
    )
    
}
