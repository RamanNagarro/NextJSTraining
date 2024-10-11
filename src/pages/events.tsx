import { FC, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface eventProps {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
}

interface eventsProps {
  events: eventProps[];
}

const Events: FC<eventsProps> = ({ events }) => {
  const [eventList, setEventsList] = useState<eventProps[]>(events);
  const router = useRouter();

  const fetchSportsEvents = async () => {
    const response = await fetch(
      "http://localhost:4000/events?category=sports"
    );
    const data = await response.json();
    console.log(data);
    setEventsList(data);
    router.push("/events?category=sports", undefined, { shallow: true });
  };
  return (
    <>
      <button onClick={fetchSportsEvents}>Sports Events</button>
      <h1>List of events</h1>
      <br />
      <ul>
        {eventList.map((event) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p>{event.category}</p>

            <hr />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { category } = query;
  const queryString = category ? `?category=${category}` : "";
  const response = await fetch(`http://localhost:4000/events${queryString}`);
  const data = await response.json();

  return {
    props: {
      events: data,
    },
  };
};

export default Events;
