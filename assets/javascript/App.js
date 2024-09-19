import React, { useState, useEffect } from 'react';

const MonreqList = function(props) {
    return (
      <table className="table table-striped table-hover table-bordered table-light">
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
                  <td>{monreq.statusDisplay}</td>
                  <td>{monreq.pk}</td>
                  <td>{monreq.shippingCompany}</td>
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

const MonreqsApplication = function({ apiClient }) {
    // State variable to show whether we're loading data or not.
    // Defaults to "true" to show a loading screen until we get our data from the API
    const [isLoading, setIsLoading] = useState(true);
    // State variable where we'll save our list of employees
    const [monreqs, setMonreqs] = useState([]);
  
    // This effect will be called when the component mounts and fetch the data
    // from our API
    useEffect(() => {
      apiClient.monitoringRequestsList()
        .then(data => {
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
          setMonreqs([]);
          setIsLoading(false);
        });
    }, [apiClient]);
  
    // Show a loading state if we haven't gotten data back yet
    if (isLoading) {
      return <p>Carregando SMs...</p>;
    }
    // Show an "empty" state if we have no employees
    if (!monreqs || monreqs.length === 0) {
      return <p>Nenhuma SM encontrada!</p>;
    } else {
      return <MonreqList monreqs={monreqs} />;
    }
  }
  
export default MonreqsApplication;