import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function App() {
  const list = [
    {
      title: "Orange",
      img: "/images/xmas.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/xmas.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/xmas.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/xmas.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/xmas.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/xmas.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/xmas.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/xmas.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
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
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
