import { TextField } from "@mui/material";
import { EventInformationPage } from "./components/EventsComponents/EventInformationPage";
import { EventsPage } from './components/EventsPage';
import {CreateEventPage} from './components/EventsComponents/CreateEventPage'
import { HomePage } from "./components/HomePage";

//tinem toate rutele aplicatiei aici
const AppRoutes = [
  {
    index: true,
    element: <HomePage />
  },
  {
    path: '/event-page',
    element: <EventsPage />
  },
  {
    path: `/event-page/:id`,
    element: <EventInformationPage />
  },
  {
    path:   `/create-event`,
    element: <CreateEventPage />
  },
  {
    path: '/counter',
    element:<TextField/>
  },
  {
    path: '/fetch-data',
    element: <TextField/>
  }
];

export default AppRoutes;