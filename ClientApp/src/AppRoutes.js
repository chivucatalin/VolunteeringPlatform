import { EventInformationPage } from "./components/EventsComponents/EventInformationPage";
import { EventsPage } from './components/EventsPage';
import {CreateEventPage} from './components/EventsComponents/CreateEventPage'
import { HomePage } from "./components/HomePage";
import { MessagesPage } from "./components/MessagesPage";

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
    path: '/chatroom',
    element: <MessagesPage/>
  }
];

export default AppRoutes;