import React, { useMemo, cloneElement, Children } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const coloredDateCellWrapper = ({ children }: any) => cloneElement(Children.only(children), {
  style: {
    background: 'lightblue',
  },
});

function EventsCalendar(props: { events: any[] }) {
  const { events } = props;

  const viewsKeys = Object.entries(Views);

  const { components, defaultDate, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: coloredDateCellWrapper,
      },
      defaultDate: new Date(),
      views: viewsKeys.map((entry) => entry[1]),
    }),
    [viewsKeys],
  );

  return (
    <div className="height600">
      {/* <Fragment> */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        showMultiDayTimes
        step={60}
        views={views}
        components={components}
        defaultDate={defaultDate}
      />
      {/* </Fragment> */}
    </div>
  );
}

export default EventsCalendar;
