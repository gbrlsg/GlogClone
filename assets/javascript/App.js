import React, { useState, useEffect } from 'react';
import { 
Table, Form, Container, Card, InputGroup, Button, } from 'react-bootstrap';
import { Search, SortDown, SortUp, ArrowDownUp, DashLg } from 'react-bootstrap-icons'

const SortOrder = {
    ASCENDING: 0,
    DESCENDING: 1
};

const SortKey = {
  STATUS: 0,
  ID: 1,
  SHIPPING_COMPANY: 2,
  ORIGIN: 3,
  DESTINATION: 4
}

const MonreqList = function({ monreqs, filter, onFilterChange, handleSortChange, getSortIcon }) {
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
                    <th>
                      <Button variant='link' className="w-100 p-0 text-decoration-none text-reset" onClick={() => handleSortChange(SortKey.STATUS)}>
                        <div className='d-flex justify-content-between align-items-center px-2 py-1'>
                            <span>Status</span>
                            {getSortIcon(SortKey.STATUS)}
                        </div>                        
                      </Button>
                    </th>
                    <th>
                      <Button variant='link' className="w-100 p-0 text-decoration-none text-reset" onClick={() => handleSortChange(SortKey.ID)}>
                        <div className='d-flex justify-content-between align-items-center px-2 py-1'>
                            <span>ID</span>
                            {getSortIcon(SortKey.ID)}
                        </div>
                      </Button>
                    </th>
                    <th>
                      <Button variant='link' className="w-100 p-0 text-decoration-none text-reset" onClick={() => handleSortChange(SortKey.SHIPPING_COMPANY)}>
                        <div className='d-flex justify-content-between align-items-center px-2 py-1'>
                            <span>Transportadora</span>
                            {getSortIcon(SortKey.SHIPPING_COMPANY)}
                        </div>
                      </Button>
                    </th>
                    <th>
                      <Button variant='link' className="w-100 p-0 text-decoration-none text-reset" onClick={() => handleSortChange(SortKey.ORIGIN)}>
                        <div className='d-flex justify-content-between align-items-center px-2 py-1'>
                            <span>Origem</span>
                            {getSortIcon(SortKey.ORIGIN)}
                        </div>
                      </Button>
                    </th>
                    <th>
                      <Button variant='link' className="w-100 p-0 text-decoration-none text-reset" onClick={() => handleSortChange(SortKey.DESTINATION)}>
                        <div className='d-flex justify-content-between align-items-center px-2 py-1'>
                        <span>Destino</span>
                          {getSortIcon(SortKey.DESTINATION)}
                        </div>
                      </Button>
                    </th> 
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
    const [opacities, setOpacities] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [monreqs, setMonreqs] = useState([]);
    const [monreqsDisplayed, setMonreqsDisplayed] = useState([]);
    const [filter, setFilter] = useState('');
    const [sorting, setSorting] = useState({key: null, direction: SortOrder.ASCENDING})


    const getSortIcon = (key) => {
      if (sorting.key == null){
        return <ArrowDownUp style={{opacity: opacities[key], transition: 'opacity 0.3s ease-in-out'}}/>;
      }
      if (key === sorting.key){
        if (sorting.direction === SortOrder.ASCENDING){
          return <SortUp style={{opacity: opacities[key], transition: 'opacity 0.3s ease-in-out'}}/>;
        }
        return <SortDown style={{opacity: opacities[key], transition: 'opacity 0.3s ease-in-out'}}/>;
      }
      return <DashLg style={{opacity: opacities[key], transition: 'opacity 0.3s ease-in-out'}}/>;
    };


    const handleSortChange = (triggerKey) => {
      setSorting(prevSort => {
        if (prevSort.key === triggerKey) {
          return {
            key: prevSort.direction === SortOrder.DESCENDING ? null : prevSort.key,
            direction: prevSort.direction === SortOrder.DESCENDING ? SortOrder.ASCENDING : SortOrder.DESCENDING
          };
        } else {
          return { key: triggerKey, direction: SortOrder.ASCENDING };
        }
      });
    };

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
      const newOpacities = {};
      Object.values(SortKey).forEach(value => {
        if (sorting.key === null){
          newOpacities[value] = 0.5;
        }
        else if (value === sorting.key){
          newOpacities[value] = 1;
        }else{
          newOpacities[value] = 0.3;
        }
      });
      console.log("newOpacities:", newOpacities);
      setOpacities(newOpacities);
    }, [sorting]);

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
      return <MonreqList monreqs={monreqsDisplayed} onFilterChange={handleFilterChange} handleSortChange={handleSortChange} getSortIcon={getSortIcon} filter={filter} />;
    }
  }
  
export default MonreqsApplication;