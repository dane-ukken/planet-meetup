import Link from "next/link";
import { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const EventCard = ({ itemList }) => {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {itemList.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.eventName}
              className="w-full object-cover h-[140px]"
              src={item.eventImgUrl}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.eventName}</b>
            <p className="text-default-500">{item.eventPrice}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default EventCard;
