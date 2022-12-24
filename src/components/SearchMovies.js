import React from 'react';
import { useEffect } from "react";
import { useState } from "react";

function SearchMovies() {
	const [keyword, setKeyword] = useState('');

	function handleSearchMovie() {
		document.getElementById("formulario").addEventListener("submit", e =>{
			e.preventDefault()
		})

		setKeyword(inputRef.current.value)
	}
	
	// Credenciales de API
	const apiKey = 'ce5cf6bd'; // Intenta poner cualquier cosa antes para probar

	const [movies, setMovies] = useState({
		error: false,
		data: []
	});

		 useEffect(() => {
			fetch(`http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`)
			  .then(res => res.json())
			  .then(response => {
				setMovies({
					error: response.Error ? response.Error : false ,
					data: response.Search,
				})
			});
				
		  }, [keyword])
		
		const inputRef = React.useRef(null)
		 return(
			<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
						<div className="col-12 text-center mb-3">
							<h2 className='text-center'>Películas para la palabra: {keyword}</h2>
						</div>
					<div className="col-12 mb-2 mt-3">
							{/* Buscador */}
							<form method="GET" id='formulario'>
								<div className="form-group form-group-lg">
									<label htmlFor="">Buscar por título:</label>
									<input type="text" ref={inputRef} className="form-control" />
								</div>
								<button className="btn btn-info" onClick={handleSearchMovie}>Search</button>
							</form>
						
					</div>
					<div className='d-flex row justify-content-around col-12 w-100'>
						{/* Listado de películas */}
						{
							!movies.error && movies.data.length > 0 && movies.data.map((movie, i) => {
								return (
									
										<div className="col-12 mt-2 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '200px'}} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
									
								)
							})
						}
				</div>
					{ movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy...¿PUSISTE TU APIKEY?</div>
			}
		</div>
		
		 )
		}
export default SearchMovies;

   