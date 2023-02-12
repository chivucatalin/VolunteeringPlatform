import * as React from 'react';
import { FilterEventBar } from './FilterComponents/FilterEventBar';
import { EventCardList } from './EventsComponents/EventCardList';
import {PageChoose} from './FilterComponents/PageChoose'
export const EventsPage=()=>{
 return (
        <div>
          <FilterEventBar/>
          <EventCardList/>
          <PageChoose/>
        </div>
      );
}