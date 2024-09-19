import React from 'react';
import { createRoot } from 'react-dom/client';
import MonreqsApplication from "./App"
import { MonitoringRequestsApi } from '../../my-api-client/apis/MonitoringRequestsApi';
import { Configuration } from '../../my-api-client/runtime'
import Cookies from 'js-cookie';

const apiClient = new MonitoringRequestsApi(new Configuration(
    {
        basePath: "http://127.0.0.1:8000",
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken")
        }
    }
))

const root = createRoot(document.getElementById('root'));
root.render(<MonreqsApplication apiClient={apiClient} />);