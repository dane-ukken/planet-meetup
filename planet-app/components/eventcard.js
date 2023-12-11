import Card from "../components/card";
import { addEventToCart } from "../store/features/user/userSlice";
import { useDispatch } from 'react-redux';

const EventCard = ({ itemList }) => {
  const dispatch = useDispatch();

  if (itemList.length === 0) {
    return <p>No events available.</p>;
  }

  const handleAddToCart = (id) => {
    console.log(id + " added to cart.");
    dispatch(addEventToCart(id));
  };

  return (
    <div className="event-grid">
      {itemList.map((item, index) => ( 
        <Card
          key={index}
          id={item._id}
          title={item.eventName}
          date={item.eventDate}
          time={item.eventTime}
          location={item.eventLocation}
          imageUrl={item.eventImgUrl}
          price={`$${item.eventPrice}`}
          spotsLeft={item.spotsLeft}
          isCancelled={item.eventStatus === "cancelled"}
          iconName="add"
          onIconClick={(e) => {
            e.stopPropagation();
            handleAddToCart(item._id);
          }}
          onClickLink={`/events/${item._id}`}
        />
      ))}

      <style jsx>{`
        .event-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          padding: 0rem;
        }
        @media (max-width: 600px) {
          .event-grid {
            grid-template-columns: 1fr;
            justify-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default EventCard;
