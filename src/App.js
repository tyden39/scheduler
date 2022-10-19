import Scheduler, { DemoData, SchedulerData, ViewTypes } from './Scheduler'
import './app.css'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [viewModel, setViewModel] = useState(() => {
    let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Week)
    schedulerData.localeMoment.locale('en')
    schedulerData.setResources(DemoData.resources)
    schedulerData.setEvents(DemoData.events)
    return schedulerData
  })

  // useEffect(() => {
  //   let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Week);
  //   schedulerData.localeMoment.locale('en');
  //   schedulerData.setResources(DemoData.resources);
  //   schedulerData.setEvents(DemoData.events);
  //   setViewModel(schedulerData)
  // }, [])

  const prevClick = (schedulerData) => {
    schedulerData.prev()
    schedulerData.setEvents(DemoData.events)
    setViewModel(schedulerData)
  }

  const nextClick = (schedulerData) => {
    schedulerData.next()
    schedulerData.setEvents(DemoData.events)
    setViewModel(schedulerData)
  }

  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective)
    schedulerData.setEvents(DemoData.events)
    setViewModel(schedulerData)
  }

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date)
    schedulerData.setEvents(DemoData.events)
    setViewModel(schedulerData)
  }

  const eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`)
  }

  const ops1 = (schedulerData, event) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`)
  }

  const ops2 = (schedulerData, event) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`)
  }

  const newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (
      window.confirm(
        `Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`
      )
    ) {
      let newFreshId = 0
      schedulerData.events.forEach((item) => {
        if (item.id >= newFreshId) newFreshId = item.id + 1
      })

      let newEvent = {
        id: newFreshId,
        title: 'New event you just created',
        start: start,
        end: end,
        resourceId: slotId,
        bgColor: 'purple',
      }
      schedulerData.addEvent(newEvent)
      setViewModel(schedulerData)
    }
  }

  const updateEventStart = (schedulerData, event, newStart) => {
    if (
      window.confirm(
        `Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart)
    }
    setViewModel(schedulerData)
  }

  const updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      window.confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)
    ) {
      schedulerData.updateEventEnd(event, newEnd)
    }
    setViewModel(schedulerData)
  }

  const moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (
      window.confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end)
      setViewModel(schedulerData)
    }
  }

  const onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next()
      schedulerData.setEvents(DemoData.events)
      setViewModel(schedulerData)

      schedulerContent.scrollLeft = maxScrollLeft - 10
    }
  }

  const onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev()
      schedulerData.setEvents(DemoData.events)
      setViewModel(schedulerData)

      schedulerContent.scrollLeft = 10
    }
  }

  const onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollTop')
  }

  const onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollBottom')
  }

  const toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId)
    setViewModel(schedulerData)
    setViewModel(schedulerData)
  }

  return (
    <DndProvider backend={HTML5Backend }>
      <Scheduler
        schedulerData={viewModel}
        prevClick={prevClick}
        nextClick={nextClick}
        onSelectDate={onSelectDate}
        onViewChange={onViewChange}
        eventItemClick={eventClicked}
        viewEventClick={ops1}
        viewEventText="Ops 1"
        viewEvent2Text="Ops 2"
        viewEvent2Click={ops2}
        updateEventStart={updateEventStart}
        updateEventEnd={updateEventEnd}
        moveEvent={moveEvent}
        newEvent={newEvent}
        onScrollLeft={onScrollLeft}
        onScrollRight={onScrollRight}
        onScrollTop={onScrollTop}
        onScrollBottom={onScrollBottom}
        toggleExpandFunc={toggleExpandFunc}
      />
    </DndProvider>
  )
}

export default App
