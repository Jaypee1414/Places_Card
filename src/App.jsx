import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {fetchDataplaces,handleUserDataPlaces} from './FetchData.js'
import Error from './Error.jsx';

function App() {
  const selectedPlace = useRef();
  const [loading , setLoading] = useState(false)
  const [userPlaces, setUserPlaces] = useState([]);
  const [error, setError] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(()=>{
    async function fetchData(){
      setLoading(true)
      try {
        const places = await handleUserDataPlaces()
        setUserPlaces(places)
      } catch (error) {
        error({message: "Failed to fetch Data places. Please try again later ..." || error.message})
      }
      setLoading(false)
    }
    fetchData()
  },[])
  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      const data = await fetchDataplaces([selectedPlace, ...userPlaces]) 
    } catch (error) {
      setError({message: 'Failed to insert a new data places, Please Try again Later.'})
      setUserPlaces(userPlaces)
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
    try {
      await fetchDataplaces(userPlaces.filter((places) => places.id !== selectedPlace.current.id))
    } catch (error) {
      setUserPlaces(userPlaces)
      error({message: "Failed to delete the data places" || error.message})
    }
    setModalIsOpen(false);
  }, []);

  function handleError(){
    setError(null)
  }
  return (
    <>
      <Modal open={error} onClose={handleError}>
        {error &&
        <Error
          title="An Error Occurred!"
          message={error.message}
          onConfirm={handleError}
        />}
      </Modal>
      
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <Error title="An error Occured" message={error.message}/>}
        {!error && 
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          isLoading={loading}
          loadingtext="Fetching Data Places ..."
          onSelectPlace={handleStartRemovePlace}
        />}
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
