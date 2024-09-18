import React, { useState, useEffect } from 'react';


const MonreqList = function(props) {
    // This component renders a table of employees
    return (
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>ID</th>
            <th>Transportadora</th>
            <th>Origem</th>
            <th>Destino</th>
          </tr>
        </thead>
        <tbody>
          {
            props.monreqs.map((monreq, index) => {
              return (
                <tr key={index}>
                  <td>{monreq.status}</td>
                  <td>{monreq.pk}</td>
                  <td>{monreq.shipping_company}</td>
                  <td>{monreq.origin}</td>
                  <td>{monreq.destination}</td>
                 </tr>
              );
            })
          }
          </tbody>
      </table>
    );
  };

const MonreqsApplication = function() {
    // State variable to show whether we're loading data or not.
    // Defaults to "true" to show a loading screen until we get our data from the API
    const [isLoading, setIsLoading] = useState(true);
    // State variable where we'll save our list of employees
    const [monreqs, setMonreqs] = useState([]);
  
    // This effect will be called when the component mounts and fetch the data
    // from our API
    useEffect(() => {
      fetch('/api/monreqs')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('API response:', data); // Add this line
          if (Array.isArray(data)) {
            setMonreqs(data);
          } else {
            console.error('Unexpected data structure:', data);
            setMonreqs([]);
          }
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setMonreqs([]); // Set to empty array on error
          setIsLoading(false);
        });
    }, []); // this argument will prevent continually hitting the APIs on state changes.
  
    // Show a loading state if we haven't gotten data back yet
    if (isLoading) {
      return <p>Carregando SMs...</p>;
    }
    // Show an "empty" state if we have no employees
    if (!monreqs || monreqs.length === 0) {
      return <p>Nenhuma SM encontrada!</p>;
    } else {
      // Show our employee list component with the data we got back
      return <MonreqList monreqs={monreqs} />;
    }
  }
  
  export default MonreqsApplication;