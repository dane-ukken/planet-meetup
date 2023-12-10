import Card from "../components/card";

const EventCard = ({ itemList }) => {
  if (itemList.length === 0) {
    return <p>No events available.</p>;
  }

  const handleAddToCart = (id) => {
    console.log(id + " added to cart.");
  };

  return (
    <div className="event-grid">
      {itemList.map((item, index) => (
        <Card
          key={index}
          title={item.eventName}
          date={item.eventDate}
          time={item.eventTime}
          location={item.eventLocation}
          imageUrl={item.eventImgUrl}
          price={`$${item.eventPrice}`}
          iconName="add_shopping_cart"
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
          }
        }
      `}</style>
    </div>
  );
};

export default EventCard;