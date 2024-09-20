import React, { useState, useEffect } from 'react';
import { 
Table, Form, Container, Card, InputGroup, Button,  } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons'

const MonreqList = function({ monreqs, onFilterChange, filter }) {
    return (
      <Container fluid className="mt-5">
        <Card>
          <Card.Header>
            <InputGroup className='w-25'>
              <Button variant='primary' type='button'>
                <Search/>
              </Button>
              <Form.Control
                className="focus-ring"
                type='text' 
                placeholder='Filtra SMs'
                value={filter}
                onChange={onFilterChange}
                style={{'--bs-focus-ring-width': '0.05rem'}}
              ></Form.Control>
            </InputGroup>
          </Card.Header>
          <Card.Body className='p-0'>
              <Table striped hover bordered>
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
                  monreqs.map((monreq, index) => {
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
              </Table>
          </Card.Body>
        </Card>
      </Container>
    );
  };

const MonreqsApplication = function({ apiClient }) {
    const [isLoading, setIsLoading] = useState(true);
    const [monreqs, setMonreqs] = useState([]);
    const [monreqsDisplayed, setMonreqsDisplayed] = useState([]);
    const [filter, setFilter] = useState('');
  
    const handleFilterChange = (e) => {
      setFilter(e.target.value);
      if (!e.target.value) {
        setMonreqsDisplayed(monreqs);
      } else {
        const filteredData = monreqs.filter((item) =>
          Object.values(item).some((val) =>
            val.toString().toLowerCase().includes(e.target.value.toLowerCase())
          )
        );    
        setMonreqsDisplayed(filteredData);
      }
    
    };

    useEffect(() => {
      apiClient.monitoringRequestsList()
        .then(data => {
          if (Array.isArray(data)) {
            setMonreqs(data);
            setMonreqsDisplayed(data);
          } else {
            console.error('Unexpected data structure:', data);
            setMonreqs([]);
            setMonreqsDisplayed([]);
          }
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setMonreqs([]);
          setMonreqsDisplayed([]);
          setIsLoading(false);
        });
    }, [apiClient]);
  
    if (isLoading) {
      return <p>Carregando SMs...</p>;
    }

    if (!monreqs || monreqs.length === 0) {
      return <p>Nenhuma SM encontrada!</p>;
    } else {
      return <MonreqList monreqs={monreqsDisplayed} onFilterChange={handleFilterChange} filter={filter} />;
    }
  }
  
export default MonreqsApplication;